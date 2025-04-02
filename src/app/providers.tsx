'use client';

import QueryClientProvider from '@/components/providers/QueryClientProvider';
import ThemeProvider from '@/components/providers/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { config } from '@/config/wagmi-config';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import type { ReactNode } from 'react';
import { WagmiProvider } from 'wagmi';

export interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config} reconnectOnMount>
      <QueryClientProvider>
        <ThemeProvider>
          <>{children}</>
          <ProgressBar height='4px' color='#a12d23' options={{ showSpinner: false }} shallowRouting />
          <Toaster />
        </ThemeProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default Providers;
