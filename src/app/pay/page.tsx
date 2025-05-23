"use client";

import { useState, useEffect } from 'react';
import { useAccount, useSendTransaction, useContractWrite } from 'wagmi';
import { getFirestore, doc, getDoc, addDoc, collection, onSnapshot, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WalletConnectButton from "@/components/WalletConnectButton";
import QrCodeGenerator from "@/components/QrCodeGenerator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearchParams } from 'next/navigation';
import { parseUnits } from 'viem';
import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';

const tokenContracts = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
};

const erc20ABI = [
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
];

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface PaymentRequest {
  merchant: string;
  amount: number;
  token: string;
  status: 'pending' | 'completed' | 'failed';
}

interface Transaction {
  id: string;
  amount: number;
  token: string;
  status: 'pending' | 'completed' | 'failed';
  transactionHash?: string;
}

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const merchant = searchParams.get('merchant');
  const amount = searchParams.get('amount');
  const token = searchParams.get('token') || 'USDT';
  const { address, isConnected } = useAccount();
  const { sendTransaction, isPending: isSendingNative } = useSendTransaction();
  const { writeContract, isPending: isSendingERC20 } = useContractWrite();
  const [usdValue, setUsdValue] = useState(0);
  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null);
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPaymentRequest = async () => {
    if (!merchant || !amount || !token) return;
    setIsLoading(true);
    try {
      const paymentRef = doc(db, `merchants/${merchant}/paymentRequests`, `${merchant}-${amount}-${token}`);
      const paymentSnap = await getDoc(paymentRef);
      if (paymentSnap.exists()) {
        setPaymentRequest(paymentSnap.data() as PaymentRequest);
      }
    } catch (error) {
      console.error('Error fetching payment request:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTokenPrice = async () => {
    try {
      const tokenId = token.toLowerCase() === 'usdt' ? 'tether' : token.toLowerCase() === 'eth' ? 'ethereum' : 'binancecoin';
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd`
      );
      const data = await response.json();
      const price = data[tokenId].usd;
      setUsdValue(Number(amount) * price);
    } catch (error) {
      console.error('Error fetching token price:', error);
    }
  };

  const handlePayment = async () => {
    if (!isConnected || !merchant || !amount) return;
    try {
      let txId: string;
      if (token === 'ETH') {
        const { transactionHash } = await sendTransaction({
          to: merchant,
          value: parseUnits(amount, 18),
        });
        txId = transactionHash;
      } else if (token === 'USDT') {
        const { transactionHash } = await writeContract({
          address: tokenContracts.USDT,
          abi: erc20ABI,
          functionName: 'transfer',
          args: [merchant, parseUnits(amount, 6)],
        });
        txId = transactionHash;
      } else {
        throw new Error('Unsupported token');
      }

      const docRef = await addDoc(collection(db, `merchants/${merchant}/transactions`), {
        amount: Number(amount),
        token,
        status: 'pending',
        timestamp: new Date().toISOString(),
        payer: address,
        transactionHash: txId,
      });
      setTransaction({ id: docRef.id, amount: Number(amount), token, status: 'pending' });
    } catch (error) {
      console.error('Payment failed:', error);
      setTransaction({ id: '', amount: Number(amount), token, status: 'failed' });
    }
  };

  useEffect(() => {
    fetchPaymentRequest();
    fetchTokenPrice();

    if (isConnected && merchant && address) {
      const q = query(
        collection(db, `merchants/${merchant}/transactions`),
        where('payer', '==', address),
        where('amount', '==', Number(amount)),
        where('token', '==', token)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' || change.type === 'modified') {
            setTransaction({ id: change.doc.id, ...change.doc.data() } as Transaction);
          }
        });
      });
      return () => unsubscribe();
    }
  }, [merchant, amount, token, isConnected, address]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md mx-auto"
        >
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
                Pay with Crypto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <WalletConnectButton className="w-full" />
              {isConnected && merchant && amount ? (
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      Pay to: <span className="font-mono">{merchant.slice(0, 6)}...{merchant.slice(-4)}</span>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Amount: {amount} {token}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      USD Value: ${usdValue.toFixed(2)}
                    </p>
                  </div>
                  <QrCodeGenerator
                    value={`ethereum:${merchant}?amount=${amount}&token=${token}`}
                    size={200}
                    isLoading={isLoading}
                  />
                  {transaction && (
                    <Alert
                      variant={transaction.status === 'completed' ? 'default' : transaction.status === 'pending' ? 'default' : 'destructive'}
                    >
                      {transaction.status === 'completed' && (
                        <CheckCircle2 className="h-4 w-4" />
                      )}
                      {transaction.status === 'pending' && (
                        <Clock className="h-4 w-4" />
                      )}
                      {transaction.status === 'failed' && (
                        <AlertCircle className="h-4 w-4" />
                      )}
                      <AlertTitle>
                        {transaction.status === 'completed' ? 'Payment Confirmed' : transaction.status === 'pending' ? 'Payment Pending' : 'Payment Failed'}
                      </AlertTitle>
                      <AlertDescription>
                        {transaction.status === 'completed' && transaction.transactionHash ? (
                          <a
                            href={`https://etherscan.io/tx/${transaction.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline"
                          >
                            View on Etherscan
                          </a>
                        ) : transaction.status === 'pending' ? (
                          'Waiting for blockchain confirmation...'
                        ) : (
                          'An error occurred. Please try again.'
                        )}
                      </AlertDescription>
                    </Alert>
                  )}
                  <Button
                    onClick={handlePayment}
                    disabled={isSendingNative || isSendingERC20 || !paymentRequest || isLoading || (transaction && transaction.status === 'completed')}
                    className="w-full"
                  >
                    {isSendingNative || isSendingERC20 ? 'Processing...' : 'Pay with Wallet'}
                  </Button>
                </div>
              ) : (
                <p className="text-center text-gray-600 dark:text-gray-300">
                  Please connect your wallet to proceed with the payment.
                </p>
              )}
            </CardContent>
          </Card>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}