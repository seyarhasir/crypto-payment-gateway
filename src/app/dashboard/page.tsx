"use client";

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import WalletConnectButton from "@/components/WalletConnectButton";
import { motion } from 'framer-motion';
import { ShoppingCart, DollarSign, Clock, BarChart } from 'lucide-react';

interface Transaction {
  id: string;
  amount: number;
  token: string;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
}

export default function MerchantDashboard() {
  const { address, isConnected } = useAccount();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentLink, setPaymentLink] = useState('');
  const [amount, setAmount] = useState('');
  const [token, setToken] = useState('USDT');
  const [timeRange, setTimeRange] = useState('30 Days');
  const [totalOrders, setTotalOrders] = useState(0);
  const [volume, setVolume] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);

  const app = initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  });
  const db = getFirestore(app);

  const fetchTransactions = async () => {
    if (!address) return;
    const q = query(collection(db, `merchants/${address}/transactions`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const txs: Transaction[] = [];
      snapshot.forEach((doc) => txs.push({ id: doc.id, ...doc.data() } as Transaction));
      setTransactions(txs);

      // Calculate metrics
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      setTotalOrders(txs.length);
      setVolume(txs.reduce((sum, tx) => sum + tx.amount, 0));
      setTodayOrders(txs.filter(tx => new Date(tx.timestamp) >= today).length);
    });
    return unsubscribe;
  };

  const generatePaymentLink = async () => {
    if (!address || !amount) return;
    const link = `${window.location.origin}/pay?merchant=${address}&amount=${amount}&token=${token}`;
    setPaymentLink(link);

    await addDoc(collection(db, `merchants/${address}/paymentRequests`), {
      amount: parseFloat(amount),
      token,
      status: 'pending',
      timestamp: new Date().toISOString(),
    });
  };

  useEffect(() => {
    if (isConnected && address) {
      const unsubscribe = fetchTransactions();
      return () => unsubscribe && unsubscribe();
    }
  }, [address, isConnected]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-64 bg-white dark:bg-gray-800 p-6 shadow-lg h-[calc(100vh-64px)] fixed"
        >
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Menu</h3>
            <nav className="space-y-2">
              <Button variant="ghost" className="w-full justify-start text-purple-600 bg-purple-50 dark:bg-purple-900/50">
                <span className="mr-2">📊</span> Dashboard
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📦</span> Orders
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">💳</span> Wallet
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">👨‍💻</span> Developers
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📃</span> Invoice
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">⚙️</span> Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">🔧</span> Integration
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <span className="mr-2">📞</span> Contact Us
              </Button>
            </nav>
            <div className="mt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Ahmad</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">ahmadseyarha...</p>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="ml-64 p-6 flex-1">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          >
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Dashboard</h1>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">Test Mode</Button>
                <input
                  type="text"
                  placeholder="Search"
                  className="p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
                />
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Hi Ahmad, welcome to your dashboard.</p>

            {/* Step Guide */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">Step 1: Create Wallet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Navigate to the wallet section and create a wallet to facilitate smooth transactions in the developer section.
                </p>
                <Button className="bg-purple-600 text-white hover:bg-purple-700">Continue</Button>
              </CardContent>
            </Card>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalOrders}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">0.00% vs last 7 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Volume (USD)
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">${volume.toFixed(2)}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">0.00% vs last 7 days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Today's Orders
                  </CardTitle>
                  <ShoppingCart className="h-4 w-4 text-purple-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{todayOrders}</div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">0.00% vs last day</p>
                </CardContent>
              </Card>
            </div>

            {/* Order Statistics */}
            <Card>
              <CardHeader className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  Order Statistics
                </CardTitle>
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select time range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12 Months">12 Months</SelectItem>
                    <SelectItem value="30 Days">30 Days</SelectItem>
                    <SelectItem value="7 Days">7 Days</SelectItem>
                  </SelectContent>
                </Select>
              </CardHeader>
              <CardContent>
                {/* Placeholder for chart */}
                <div className="h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400">
                  Chart placeholder (implement with chart tool)
                </div>
              </CardContent>
            </Card>

            {/* Promotional Section */}
            <Card className="mt-6">
              <CardContent className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-lg">
                <h3 className="text-xl font-bold mb-2">Why your business should accept crypto payments?</h3>
                <p className="text-sm mb-4">
                  Unlock global markets, reduce fees, and enhance security with CryptoPay.
                </p>
                <Button variant="secondary" className="mt-2">Learn More</Button>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    </div>
  );
}