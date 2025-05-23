import type { Metadata } from 'next';
   import Home from './home';

   export const metadata: Metadata = {
     title: 'CryptoPay - Secure Crypto Payment Gateway',
     description: 'Accept USDT, ETH, BNB, and more with CryptoPay, the secure and user-friendly crypto payment gateway for merchants worldwide.',
     openGraph: {
       title: 'CryptoPay - Secure Crypto Payment Gateway',
       description: 'Streamline your business with CryptoPay’s fast, secure, and multi-token payment solutions.',
       url: 'https://your-domain.com',
       siteName: 'CryptoPay',
       images: [
         {
           url: 'https://your-domain.com/og-image.jpg',
           width: 1200,
           height: 630,
           alt: 'CryptoPay Banner',
         },
       ],
       locale: 'en_US',
       type: 'website',
     },
     twitter: {
       card: 'summary_large_image',
       title: 'CryptoPay - Secure Crypto Payment Gateway',
       description: 'Accept crypto payments with ease using CryptoPay’s advanced blockchain solutions.',
       images: ['https://your-domain.com/og-image.jpg'],
     },
   };

   export default function Root() {
     return <Home />;
   }