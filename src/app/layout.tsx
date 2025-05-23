// src/app/layout.tsx

import './globals.css';
import { ThemeProvider } from 'next-themes';
   import '@/app/globals.css';
   import WagmiClientProvider from '@/app/WagmiClientProvider';

   export const metadata = {
     title: 'CryptoPay',
     description: 'A secure crypto payment gateway',
   };

   export default function RootLayout({ children }) {
     return (
       <html lang="en" suppressHydrationWarning>
         <body>
           <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
             <WagmiClientProvider>{children}</WagmiClientProvider>
           </ThemeProvider>
         </body>
       </html>
     );
   }