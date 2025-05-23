"use client";

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, bsc } from 'wagmi/chains';
import { injected } from '@wagmi/connectors';

export const wagmiConfig = createConfig({
  chains: [mainnet, polygon, bsc],
  connectors: [
    injected(),
  ],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});