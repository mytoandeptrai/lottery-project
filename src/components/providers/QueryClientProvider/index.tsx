'use client';

import { AppContextProvider } from '@/components/contexts/app-context';
import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { type ReactNode, useEffect, useState } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000,
      retry: false,
    },
  },
});

interface ProvidersProps {
  children: ReactNode;
}

const QueryClientProvider = ({ children }: ProvidersProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Provider client={queryClient}>
      <AppContextProvider>
        <>{isMounted ? children : <></>}</>
      </AppContextProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools buttonPosition='bottom-left' initialIsOpen={false} />
      )}
    </Provider>
  );
};

export default QueryClientProvider;
