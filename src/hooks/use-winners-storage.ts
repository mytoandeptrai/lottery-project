import { LOCAL_STORAGE_KEY } from '@/constants/lottery';
import type { LotteryWinner } from '@/types/lottery';
import { formatEther } from 'viem';

export const useWinnersStorage = () => {
  const saveWinner = (winner: string, ticketId: number, prizePool: bigint | undefined) => {
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    const newWinner: LotteryWinner = {
      address: winner,
      ticketId,
      date: new Date(),
      prizePool: prizePool ? formatEther(prizePool) : '0',
    };

    if (storageData) {
      const parsedData: LotteryWinner[] = JSON.parse(storageData);
      const formattedData = [...parsedData, newWinner];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formattedData));
    } else {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([newWinner]));
    }
  };

  const getWinners = (): LotteryWinner[] => {
    const storageData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storageData ? JSON.parse(storageData) : [];
  };

  return {
    saveWinner,
    getWinners,
  };
};
