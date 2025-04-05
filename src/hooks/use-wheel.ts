import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { MIN_PARTICIPANTS, TOAST_MESSAGES } from '@/constants/lottery';
import { useTrackingStore } from '@/stores/tracking-store';
import type { WheelState } from '@/types/lottery';
import { parseContractError } from '@/utils/common';
import { REFRESH_INTERVAL } from '@/utils/const';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { type BaseError, useAccount, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { useContractRead } from './use-contract-read';
import { useLotteryEvents } from './use-lottery-events';

export const useWheel = () => {
  const { isConnected, isConnecting, address } = useAccount();
  const { shouldRefresh } = useTrackingStore();

  // State management
  const [state, setState] = useState<WheelState>({
    mustSpin: false,
    isSpinning: false,
    prizeNumber: 0,
    isPerformingDraw: false,
    isNoWinner: false,
  });

  /** Read contract */
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

  /** Write contract */
  const { writeContractAsync: performDraw, data: hash, isPending: isPerformingDrawPending } = useWriteContract();

  /** Confirm transaction */
  const { isLoading: isConfirming, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  // Event handlers
  const handleDrawResult = useCallback((winningTicket: number) => {
    setState((prev) => ({
      ...prev,
      mustSpin: true,
      isSpinning: true,
      prizeNumber: winningTicket,
    }));
  }, []);

  const handleNoWinner = useCallback((winningTicket: number) => {
    setState((prev) => ({
      ...prev,
      mustSpin: true,
      isSpinning: true,
      prizeNumber: winningTicket,
      isNoWinner: true,
    }));
  }, []);

  // Contract events
  useLotteryEvents({
    onDrawResult: handleDrawResult,
    onNoWinner: handleNoWinner,
    currentPrize: currentPrize as bigint | undefined,
  });

  // Actions
  const handleSpinClick = async () => {
    if (state.isSpinning || state.isPerformingDraw) return;

    if (!participantCount || Number(participantCount) < MIN_PARTICIPANTS) {
      toast.error(TOAST_MESSAGES.NOT_ENOUGH_PARTICIPANTS.title, {
        description: TOAST_MESSAGES.NOT_ENOUGH_PARTICIPANTS.description,
      });
      return;
    }

    setState((prev) => ({ ...prev, isPerformingDraw: true }));

    try {
      await performDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'performDraw',
      });
    } catch (error) {
      console.error('Error in handleSpinClick:', error);
      setState((prev) => ({ ...prev, isPerformingDraw: false }));
    }
  };

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
      toast.success(TOAST_MESSAGES.DRAW_COMPLETED_WINNER(state.prizeNumber).title, {
        description: TOAST_MESSAGES.DRAW_COMPLETED_WINNER(state.prizeNumber).description,
      });
    }

    shouldRefresh();
  }, [state.isNoWinner, state.prizeNumber, shouldRefresh]);

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
