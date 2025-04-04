import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { useTrackingStore } from '@/stores/tracking-store';
import { parseContractError } from '@/utils/common';
import { REFRESH_INTERVAL } from '@/utils/const';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { formatEther } from 'viem';
import {
  type BaseError,
  useAccount,
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from 'wagmi';

export const useWheel = () => {
  const { isConnected, isConnecting, address } = useAccount();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPerformingDraw, setIsPerformingDraw] = useState(false);
  const [isNoWinner, setIsNoWinner] = useState(false);
  const { shouldRefresh } = useTrackingStore();

  /** Read contract */
  const { data: currentPrize } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getCurrentPrize',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const { data: participantCount } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getParticipantCount',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const { data: isOwner } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'isOwner',
    args: [address],
    query: {
      enabled: !!address && isConnected,
    },
  });

  /** Write contract */
  const { writeContractAsync: performDraw, data: hash, isPending: isPerformingDrawPending } = useWriteContract();

  /** Confirm transaction */
  const { isLoading: isConfirming, error: confirmError } = useWaitForTransactionReceipt({
    hash,
  });

  // Listen for DrawResult event
  useWatchContractEvent({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    eventName: 'DrawResult',
    onLogs(logs: any) {
      if (logs && logs.length > 0) {
        const log = logs[0];
        const winningTicket = Number(log.args.winningTicket);
        const winner = log.args.winner;

        const storageData = localStorage.getItem('lottery_winners');
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          const formattedData = [
            ...parsedData,
            {
              address: winner,
              ticketId: winningTicket,
              date: new Date(),
              prizePool: currentPrize ? formatEther(currentPrize as bigint) : '0',
            },
          ];
          localStorage.setItem('lottery_winners', JSON.stringify(formattedData));
        }

        setMustSpin(true);
        setIsSpinning(true);
        setPrizeNumber(winningTicket);
      }
    },
  });

  useWatchContractEvent({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    eventName: 'NoWinner',
    onLogs(logs: any) {
      if (logs && logs.length > 0) {
        const log = logs[0];
        const winningTicket = Number(log.args.winningTicket);
        setMustSpin(true);
        setIsSpinning(true);
        setPrizeNumber(winningTicket);
        setIsNoWinner(true);
      }
    },
  });

  const handleSpinClick = async () => {
    if (isSpinning || isPerformingDraw) return;

    if (!participantCount || Number(participantCount) < 5) {
      toast.error('Not enough participants to perform a draw', {
        description: 'Please wait for more participants to join the lottery',
      });
      return;
    }

    setIsPerformingDraw(true);
    try {
      await performDraw({
        address: ADDRESS_CONTRACT,
        abi: ABI,
        functionName: 'performDraw',
      });
    } catch (error) {
      console.error('Error in handleSpinClick:', error);
    }
  };

  const handleStopSpinning = () => {
    setMustSpin(false);
    setIsSpinning(false);
    setIsPerformingDraw(false);
    if (isNoWinner) {
      toast.success('Draw Completed', {
        description: `No winner this time, please try another time!`,
      });
      setIsNoWinner(false);
    } else {
      toast.success('Draw Completed', {
        description: `Ticket ${prizeNumber} has been selected as the winner!`,
      });
    }
    shouldRefresh();
  };

  useEffect(() => {
    if (confirmError) {
      toast.error(parseContractError(confirmError as BaseError), {
        description: 'Please try again',
      });
      setIsPerformingDraw(false);
    }
  }, [confirmError]);

  return {
    mustSpin,
    isSpinning,
    isConnected,
    isConnecting,
    prizeNumber,
    isPerformingDraw: isPerformingDraw || isPerformingDrawPending || isConfirming,
    isOwner: Boolean(isOwner),
    handleSpinClick,
    handleStopSpinning,
  };
};
