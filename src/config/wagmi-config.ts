import { http, createConfig, createStorage, cookieStorage } from 'wagmi';
import { bscTestnet, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia, bscTestnet],
  transports: {
    [sepolia.id]: http(),
    [bscTestnet.id]: http(),
  },
  connectors: [
    // injected(),
    metaMask(),
    // coinbaseWallet(),
    // walletConnect({ projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID }),
  ],
  storage: createStorage({
    storage: cookieStorage,
  }),
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
