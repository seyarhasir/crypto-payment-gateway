Crypto Payment Gateway
A crypto payment processor allowing merchants to accept payments in USDT, ETH, BNB, etc., with a merchant dashboard, customer payment page, and transaction tracking.
Project Structure
crypto-payment-gateway
├── /app                    # Next.js App Router
│   ├── /dashboard          # Merchant dashboard
│   │   ├── page.tsx        # Main dashboard page
│   │   └── layout.tsx      # Dashboard layout
│   ├── /pay                # Customer payment page
│   │   ├── page.tsx        # Payment page with QR code and WalletConnect
│   │   └── layout.tsx      # Payment page layout
│   ├── /api                # API routes
│   │   ├── /webhooks       # Webhook endpoints for transaction updates
│   │   │   └── route.ts
│   ├── globals.css         # Global TailwindCSS styles
│   └── layout.tsx          # Root layout
├── /components             # Reusable React components
│   ├── ui                  # shadcn/ui components
│   ├── WalletConnectButton.tsx  # Wallet connection component
│   ├── QrCodeGenerator.tsx      # QR code for payments
│   ├── TransactionTable.tsx      # Transaction history table
│   └── PaymentForm.tsx          # Customer payment form
├── /lib                    # Utility functions and integrations
│   ├── firebase.ts         # Firebase config and initialization
│   ├── moralis.ts         # Moralis Streams for transaction monitoring
│   ├── coingecko.ts       # CoinGecko API for token prices
│   ├── walletUtils.ts     # Wallet connection and payment logic
│   └── types.ts           # TypeScript types and interfaces
├── /firebase               # Firebase Cloud Functions
│   └── functions           # Cloud Functions for backend logic
│       ├── index.js       # Main Cloud Functions entry
│       ├── transactionMonitor.js  # Monitor wallet transactions
│       └── webhookHandler.js     # Handle webhook notifications
├── /public                 # Static assets
│   ├── favicon.ico
│   └── logo.png
├── /styles                 # Additional CSS (if needed)
│   └── tailwind.css
├── tailwind.config.js      # TailwindCSS configuration
├── next.config.js          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies and scripts
├── .env.local              # Environment variables (Firebase, Moralis, CoinGecko)
└── README.md               # Project documentation

Setup Instructions

Clone the Repository:
git clone <repository-url>
cd crypto-payment-gateway


Install Dependencies:
npm install


Install shadcn/ui Components:
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input table


Set Up Environment Variables:Create a .env.local file:
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_MORALIS_API_KEY=your-moralis-api-key
NEXT_PUBLIC_COINGECKO_API_KEY=your-coingecko-api-key


Set Up Firebase:

Create a Firebase project at console.firebase.google.com.
Enable Firestore and Authentication.
Deploy Cloud Functions:cd firebase/functions
npm install
firebase deploy --only functions




Run the Development Server:
npm run dev



Key Features

Merchant Dashboard: Connect wallet, generate payment links, view transaction history.
Payment Page: Customer-facing page with QR code and WalletConnect for payments.
Transaction Monitoring: Uses Moralis Streams to track wallet transactions.
Token Pricing: Fetches real-time prices via CoinGecko API.
Webhooks: API endpoints for transaction status updates.

Tech Stack

Frontend: Next.js, TailwindCSS, Wagmi, WalletConnect
Backend: Firebase (Firestore, Authentication, Cloud Functions)
Blockchain: Moralis Streams for transaction monitoring
Pricing: CoinGecko API
UI Components: shadcn/ui

Next Steps

Implement /app/pay/page.tsx for customer payment page.
Add Firebase Cloud Function for transaction monitoring.
Set up webhook handling for real-time updates.
Integrate CoinGecko for token pricing.

