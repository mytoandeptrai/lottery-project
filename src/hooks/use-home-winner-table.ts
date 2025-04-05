import { useTrackingStore } from '@/stores/tracking-store';
import type { LotteryWinner } from '@/types/lottery';
import { DEFAULT_POLLING_INTERVAL } from '@/utils/const';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useWinnersStorage } from './use-winners-storage';

export const useHomeWinnerTable = () => {
  const { isConnected, isConnecting } = useAccount();
  const [winners, setWinners] = useState<LotteryWinner[]>([]);
  const { refreshNumber } = useTrackingStore();
  const { getWinners } = useWinnersStorage();

  useEffect(() => {
    const loadWinnersFromStorage = () => {
      try {
        const storedWinners = getWinners();
        setWinners(storedWinners);
      } catch (error) {
        console.error('Error loading winners from storage:', error);
        setWinners([]);
      }
    };

    loadWinnersFromStorage();

    // Load data every 10 seconds
    const interval = setInterval(loadWinnersFromStorage, DEFAULT_POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [refreshNumber]);

  return {
    winners,
    isLoading: isConnecting,
    isConnected,
  };
};
