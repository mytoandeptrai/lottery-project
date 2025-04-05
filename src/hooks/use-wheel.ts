import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { MIN_PARTICIPANTS, TOAST_MESSAGES } from '@/constants/lottery';
import { useWinnersStorage } from '@/hooks/use-winners-storage';
import { useTrackingStore } from '@/stores/tracking-store';
import type { WheelState } from '@/types/lottery';
import { parseContractError } from '@/utils/common';
import { NUMBER_OF_BLOCK_CONFIRMATION, REFRESH_INTERVAL } from '@/utils/const';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { type BaseError, useAccount, usePublicClient, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useContractRead } from './use-contract-read';

interface ILatestDrawResult {
  drawId: string;
  winningTicket: string;
  winnerAddress: string;
  hasWinner: boolean;
}

type LotteryState = 'NOT_STARTED' | 'READY_FOR_NEW_DRAW' | 'WAITING_FOR_PRIZE_CLAIM' | string;

const GAS_LIMIT = BigInt(1000000);

export const useWheel = () => {
  // Hooks
  const publicClient = usePublicClient();
  const { isConnected, isConnecting, address } = useAccount();
  const { shouldRefresh } = useTrackingStore();
  const { saveWinner } = useWinnersStorage();

  // State management
  const [state, setState] = useState<WheelState>({
    mustSpin: false,
    isSpinning: false,
    prizeNumber: 0,
    isPerformingDraw: false,
    isNoWinner: false,
  });

  // Contract reads
  const { data: currentPrize } = useContractRead({
    functionName: 'getCurrentPrize',
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: participantCount } = useContractRead({
    functionName: 'getParticipantCount',
    refetchInterval: REFRESH_INTERVAL,
  });

  const { data: isOwner } = useContractRead({
    functionName: 'isOwner',
    args: [address],
    enabled: !!address && isConnected,
  });

  const { data: lotteryState } = useContractRead({
    functionName: 'getLotteryState',
    refetchInterval: REFRESH_INTERVAL,
  });

  // Contract writes
  const { writeContractAsync: performDraw, data: hash, isPending: isPerformingDrawPending } = useWriteContract();

  // Transaction confirmation
  const { isLoading: isConfirming, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  // Validation
  const validateDrawConditions = useCallback((): boolean => {
    if (!participantCount || Number(participantCount) < MIN_PARTICIPANTS) {
      toast.error(TOAST_MESSAGES.NOT_ENOUGH_PARTICIPANTS.title, {
        description: TOAST_MESSAGES.NOT_ENOUGH_PARTICIPANTS.description,
      });
      return false;
    }

    if (['NOT_STARTED', 'READY_FOR_NEW_DRAW'].includes(lotteryState as LotteryState)) {
      toast.error(TOAST_MESSAGES.NOT_START_DRAW.title, {
        description: TOAST_MESSAGES.NOT_START_DRAW.description,
      });
      return false;
    }

    if (lotteryState === 'WAITING_FOR_PRIZE_CLAIM') {
      toast.error(TOAST_MESSAGES.WAITING_FOR_PRIZE_CLAIM.title, {
        description: TOAST_MESSAGES.WAITING_FOR_PRIZE_CLAIM.description,
      });
      return false;
    }

    return true;
  }, [participantCount, lotteryState]);

  // Function handlers
  const handleStopSpinning = useCallback(() => {
    setState((prev) => ({
      ...prev,
      mustSpin: false,
      isSpinning: false,
      isPerformingDraw: false,
    }));

    if (state.isNoWinner) {
      toast.success(TOAST_MESSAGES.DRAW_COMPLETED_NO_WINNER.title, {
        description: TOAST_MESSAGES.DRAW_COMPLETED_NO_WINNER.description,
      });
      setState((prev) => ({ ...prev, isNoWinner: false }));
    } else {
      const prizeNumber = state.prizeNumber + 1;
      toast.success(TOAST_MESSAGES.DRAW_COMPLETED_WINNER(prizeNumber).title, {
        description: TOAST_MESSAGES.DRAW_COMPLETED_WINNER(prizeNumber).description,
      });
    }

    shouldRefresh();
  }, [state.isNoWinner, state.prizeNumber, shouldRefresh]);

  // Contract interactions
  const fetchLatestDrawResult = async (): Promise<ILatestDrawResult | null> => {
    try {
      return (await publicClient.readContract({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'getLatestDrawResult',
      })) as ILatestDrawResult;
    } catch (error) {
      console.error('Error fetching latest draw result:', error);
      return null;
    }
  };

  const handleSpinClick = async () => {
    if (state.isSpinning || state.isPerformingDraw || !lotteryState) return;
    if (!validateDrawConditions()) return;

    setState((prev) => ({ ...prev, isPerformingDraw: true }));

    try {
      const hash = await performDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'performDraw',
        gas: GAS_LIMIT,
      });

      await publicClient.waitForTransactionReceipt({ hash, confirmations: NUMBER_OF_BLOCK_CONFIRMATION });
      const drawResult = await fetchLatestDrawResult();

      if (!drawResult) return;
      const { winningTicket, winnerAddress, hasWinner } = drawResult;
      const latestWinningTicket = Number(winningTicket) - 1;
      if (hasWinner) {
        saveWinner(winnerAddress, Number(winningTicket), currentPrize as bigint);
      }

      setState((prev) => ({
        ...prev,
        mustSpin: true,
        isSpinning: true,
        prizeNumber: latestWinningTicket,
        isNoWinner: !hasWinner,
      }));
    } catch (error) {
      console.error('Error in handleSpinClick:', error);
      setState((prev) => ({ ...prev, isPerformingDraw: false }));
    }
  };

  // Error handling
  useEffect(() => {
    if (confirmError) {
      toast.error(parseContractError(confirmError as BaseError), {
        description: TOAST_MESSAGES.ERROR.description,
      });
      setState((prev) => ({ ...prev, isPerformingDraw: false }));
    }

    if (isPerformingDrawPending) {
      toast.info(TOAST_MESSAGES.WAITING_CONFIRMATION);
    }
  }, [confirmError, isPerformingDrawPending]);

  return {
    ...state,
    isConnected,
    isConnecting,
    isPerformingDraw: state.isPerformingDraw || isPerformingDrawPending || isConfirming,
    isIndexingScan: isPerformingDrawPending || isConfirming,
    isOwner: Boolean(isOwner),
    handleSpinClick,
    handleStopSpinning,
  };
};
