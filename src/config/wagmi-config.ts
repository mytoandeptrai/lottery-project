import { cookieStorage, createConfig, createStorage, http } from 'wagmi';
import { bscTestnet, sepolia } from 'wagmi/chains';
import { metaMask } from 'wagmi/connectors';

export const config = createConfig({
  chains: [sepolia, bscTestnet],
  transports: {
    [sepolia.id]: http(
      'https://morning-patient-owl.ethereum-sepolia.quiknode.pro/020a955f0da5bbc7fd4b54e9e20d30628ac51f5d/'
    ),
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
