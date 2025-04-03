import { DEFAULT_POLLING_INTERVAL } from '@/utils/const';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export interface Winner {
  address: string;
  ticketId: number;
  date: Date;
  prizePool: string;
}

const SAMPLE_WINNERS: Winner[] = [
  {
    address: '0x8901234567890123456789012345678901234567',
    ticketId: 1,
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    prizePool: '0.32',
  },
  {
    address: '0x3456789012345678901234567890123456789012',
    ticketId: 2,
    date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    prizePool: '0.28',
  },
  {
    address: '0x6789012345678901234567890123456789012345',
    ticketId: 3,
    date: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    prizePool: '0.18',
  },
];

export const useHomeWinnerTable = () => {
  const { isConnected } = useAccount();
  const [winners, setWinners] = useState<Winner[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWinnersFromStorage = () => {
      try {
        const storageData = localStorage.getItem('lottery_winners');
        if (storageData) {
          const parsedData = JSON.parse(storageData);
          // Convert date strings back to Date objects
          const formattedData = parsedData.map((winner: any) => ({
            ...winner,
            date: new Date(winner.date),
          }));
          setWinners(formattedData);
        } else {
          setWinners(SAMPLE_WINNERS);
        }
      } catch (error) {
        console.error('Error loading winners from storage:', error);
        setWinners(SAMPLE_WINNERS);
      } finally {
        setIsLoading(false);
      }
    };

    // Load data immediately
    loadWinnersFromStorage();

    // Set up polling every 4 seconds
    const interval = setInterval(loadWinnersFromStorage, DEFAULT_POLLING_INTERVAL);

    // Cleanup interval on unmount
    return () => clearInterval(interval);
  }, []);

  return {
    winners,
    isLoading,
    isConnected,
  };
};
