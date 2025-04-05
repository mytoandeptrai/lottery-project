import { useTrackingStore } from '@/stores/tracking-store';
import { DEFAULT_POLLING_INTERVAL } from '@/utils/const';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export interface Winner {
  address: string;
  ticketId: number;
  date: Date;
  prizePool: string;
}

export const useHomeWinnerTable = () => {
  const { isConnected, isConnecting } = useAccount();
  const [winners, setWinners] = useState<Winner[]>([]);
  const { refreshNumber } = useTrackingStore();

  useEffect(() => {
    const loadWinnersFromStorage = () => {
      try {
        const storageData = localStorage.getItem('lottery_winners');
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          const formattedData = parsedData.map((winner: Winner) => ({
            ...winner,
            date: new Date(winner.date),
          }));
          setWinners(formattedData);
        }
      } catch (error) {
        console.error('Error loading winners from storage:', error);
        setWinners([]);
      }
    };

    // Load data immediately
    loadWinnersFromStorage();

    const interval = setInterval(loadWinnersFromStorage, DEFAULT_POLLING_INTERVAL);

    return () => clearInterval(interval);
  }, [refreshNumber]);

  return {
    winners,
    isLoading: isConnecting,
    isConnected,
  };
};
