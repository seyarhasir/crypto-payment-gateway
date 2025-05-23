const { functions, initializeApp, getFirestore } = require('firebase-admin');
const Moralis = require('moralis').default;

initializeApp();
const db = getFirestore();

exports.monitorTransactions = functions.https.onRequest(async (req, res) => {
  try {
    // Initialize Moralis (replace with your Moralis API key)
    await Moralis.start({
      apiKey: process.env.MORALIS_API_KEY,
    });

    // Get merchant address from request (or query Firestore for active merchants)
    const { merchantAddress } = req.body;
    if (!merchantAddress) {
      return res.status(400).json({ error: 'Merchant address required' });
    }

    // Create a Moralis Stream to monitor the merchant's wallet
    const streamConfig = {
      chains: ['eth', 'polygon', 'bsc'], // Support Ethereum, Polygon, BNB Chain
      description: `Monitor payments for ${merchantAddress}`,
      tag: `merchant-${merchantAddress}`,
      address: merchantAddress,
      webhookUrl: `${process.env.FUNCTIONS_URL}/webhookHandler`, // Your webhook endpoint
      includeNativeTxs: true, // Monitor native token transfers (ETH, BNB)
      includeContractLogs: true, // Monitor ERC-20 transfers (e.g., USDT)
    };

    const stream = await Moralis.Streams.add(streamConfig);

    // Store stream ID in Firestore for reference
    await db.collection('merchants').doc(merchantAddress).set(
      {
        streamId: stream.id,
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );

    res.status(200).json({ message: 'Stream created', streamId: stream.id });
  } catch (error) {
    console.error('Error setting up stream:', error);
    res.status(500).json({ error: 'Failed to set up transaction monitoring' });
  }
});

exports.webhookHandler = functions.https.onRequest(async (req, res) => {
  try {
    const { confirmed, txs } = req.body;
    if (!confirmed || !txs || !txs.length) {
      return res.status(400).json({ error: 'Invalid webhook data' });
    }

    // Process each transaction
    for (const tx of txs) {
      const { to, value, tokenAddress } = tx;
      const merchantAddress = to.toLowerCase();
      const amount = parseFloat(value) / 1e18; // Convert from wei (adjust for token decimals if ERC-20)
      const token = tokenAddress ? 'USDT' : 'ETH'; // Simplify for now; extend for other tokens

      // Find matching payment request in Firestore
      const paymentRequestsRef = db.collection(`merchants/${merchantAddress}/paymentRequests`);
      const query = await paymentRequestsRef
        .where('amount', '==', amount)
        .where('token', '==', token)
        .where('status', '==', 'pending')
        .get();

      if (!query.empty) {
        const paymentRequest = query.docs[0];
        // Update transaction status
        await db.collection(`merchants/${merchantAddress}/transactions`).add({
          amount,
          token,
          status: 'completed',
          timestamp: new Date().toISOString(),
          txHash: tx.hash,
          payer: tx.from,
        });

        // Update payment request status
        await paymentRequest.ref.update({ status: 'completed' });
      }
    }

    res.status(200).json({ message: 'Webhook processed' });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Failed to process webhook' });
  }
});