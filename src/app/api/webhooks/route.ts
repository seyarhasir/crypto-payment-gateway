import { NextRequest, NextResponse } from 'next/server';
import { getFirestore, doc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { createHmac } from 'crypto';

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const signature = req.headers.get('x-signature');

    // Verify webhook signature
    const secret = process.env.MORALIS_WEBHOOK_SECRET;
    if (!secret || !signature) {
      return NextResponse.json({ error: 'Missing signature or secret' }, { status: 401 });
    }

    const computedSignature = createHmac('sha256', secret)
      .update(JSON.stringify(body))
      .digest('hex');

    if (computedSignature !== signature) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Process Moralis Streams webhook
    const { confirmed, txs } = body;
    if (!txs || txs.length === 0) {
      return NextResponse.json({ message: 'No transactions' }, { status: 200 });
    }

    for (const tx of txs) {
      const { fromAddress, toAddress, value, tokenAddress, hash } = tx;

      // Find matching transaction in Firestore
      const q = query(
        collection(db, `merchants/${toAddress}/transactions`),
        where('payer', '==', fromAddress),
        where('status', '==', 'pending')
      );
      const querySnapshot = await getDocs(q);

      for (const docSnap of querySnapshot.docs) {
        const txData = docSnap.data();
        const expectedAmount = txData.amount;
        const token = txData.token.toLowerCase();
        const isNative = token === 'eth' || token === 'bnb';
        const isTokenMatch = isNative
          ? !tokenAddress
          : tokenAddress?.toLowerCase() === tokenContracts[token.toUpperCase()]?.toLowerCase();

        if (isTokenMatch && confirmed) {
          await updateDoc(doc(db, `merchants/${toAddress}/transactions`, docSnap.id), {
            status: 'completed',
            transactionHash: hash,
            updatedAt: new Date().toISOString(),
          });
        }
      }
    }

    return NextResponse.json({ message: 'Webhook processed' }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

const tokenContracts = {
  USDT: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
};