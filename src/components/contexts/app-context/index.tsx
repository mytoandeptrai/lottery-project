'use client';

import { useTrackingStore } from '@/stores/tracking-store';
import { type ReactNode, createContext, useContext, useEffect } from 'react';
import { useAccount } from 'wagmi';

interface AppContextProps {
  triggerRefresh: () => void;
}

const AppContext = createContext<AppContextProps>({
  triggerRefresh: () => {},
});

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppContextProvider');
  }
  return context;
};

interface AppContextProviderProps {
  children: ReactNode;
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const { address } = useAccount();
  const { shouldRefresh } = useTrackingStore();

  useEffect(() => {
    if (address) {
      shouldRefresh();
    }
  }, [address, shouldRefresh]);

  const value = {
    triggerRefresh: shouldRefresh,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
