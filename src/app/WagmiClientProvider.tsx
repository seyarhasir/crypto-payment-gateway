// src/app/WagmiClientProvider.tsx

'use client';

   import { WagmiProvider, createConfig, http } from 'wagmi';
   import { mainnet, sepolia } from 'wagmi/chains';
   import { injected, metaMask } from '@wagmi/connectors';
   import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

   const queryClient = new QueryClient();

   const config = createConfig({
     chains: [mainnet, sepolia],
     transports: {
       [mainnet.id]: http(),
       [sepolia.id]: http(),
     },
     connectors: [
       injected(),
       metaMask(),
     ],
   });

   export default function WagmiClientProvider({ children }) {
     return (
       <QueryClientProvider client={queryClient}>
         <WagmiProvider config={config}>{children}</WagmiProvider>
       </QueryClientProvider>
     );
   }