import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
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

interface DrawResult {
  drawId: number;
  winningTicket: number;
  winnerAddress: string;
  date: Date;
}

type DrawResultEvent = {
  drawId: bigint;
  winningTicket: bigint;
  winner: `0x${string}`;
};

type DrawResultLog = {
  address: `0x${string}`;
  args: DrawResultEvent;
  blockNumber: number;
  eventName: 'DrawResult';
  logIndex: number;
  transactionHash: `0x${string}`;
};

export const useWheel = () => {
  const { isConnected, isConnecting } = useAccount();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
  const [isPerformingDraw, setIsPerformingDraw] = useState(false);

  const { data: currentPrize } = useReadContract({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    functionName: 'getCurrentPrize',
    query: {
      refetchInterval: REFRESH_INTERVAL,
    },
  });

  const { writeContractAsync: performDraw, data: hash, isPending: isPerformingDrawPending } = useWriteContract();

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
        const drawId = Number(log.args.drawId);
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

  const handleSpinClick = async () => {
    if (isSpinning || isPerformingDraw) return;

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
    setSelectedTicket(prizeNumber + 1);

    toast.success('Draw Completed', {
      description: `Ticket ${prizeNumber + 1} has been selected as the winner!`,
    });
    setIsPerformingDraw(false);
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
    selectedTicket,
    prizeNumber,
    isPerformingDraw: isPerformingDraw || isPerformingDrawPending || isConfirming,
    handleSpinClick,
    handleStopSpinning,
  };
};
