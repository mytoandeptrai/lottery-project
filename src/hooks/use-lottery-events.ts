import { ABI, ADDRESS_CONTRACT } from '@/config/smart-contract';
import { POLLING_INTERVAL_EVENTS } from '@/constants/lottery';
import type { DrawResultEvent, NoWinnerEvent } from '@/types/lottery';
import { useCallback } from 'react';
import { useWatchContractEvent } from 'wagmi';
import { useWinnersStorage } from './use-winners-storage';

interface UseLotteryEventsProps {
  onDrawResult: (winningTicket: number) => void;
  onNoWinner: (winningTicket: number) => void;
  currentPrize?: bigint;
}

export const useLotteryEvents = ({ onDrawResult, onNoWinner, currentPrize }: UseLotteryEventsProps) => {
  const { saveWinner } = useWinnersStorage();

  const handleDrawResult = useCallback(
    (logs: any[]) => {
      console.log('logss DrawResult', logs);
      if (logs && logs.length > 0) {
        const log = logs[0];
        const { winningTicket, winner } = log.args as DrawResultEvent;

        saveWinner(winner, winningTicket, currentPrize);
        onDrawResult(Number(winningTicket));
      }
    },
    [currentPrize, onDrawResult, saveWinner]
  );

  const handleNoWinner = useCallback(
    (logs: any[]) => {
      console.log('logss NoWinner', logs);
      if (logs && logs.length > 0) {
        const log = logs[0];
        const { winningTicket } = log.args as NoWinnerEvent;
        onNoWinner(Number(winningTicket));
      }
    },
    [onNoWinner]
  );

  useWatchContractEvent({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    eventName: 'DrawResult',
    pollingInterval: POLLING_INTERVAL_EVENTS,
    batch: true,
    onLogs: handleDrawResult,
  });

  useWatchContractEvent({
    address: ADDRESS_CONTRACT,
    abi: ABI,
    eventName: 'NoWinner',
    pollingInterval: POLLING_INTERVAL_EVENTS,
    batch: true,
    onLogs: handleNoWinner,
  });
};
