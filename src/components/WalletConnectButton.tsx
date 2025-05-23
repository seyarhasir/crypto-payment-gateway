// src/components/WalletConnectButton.tsx

"use client";

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from "@/components/ui/button";

export default function WalletConnectButton() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const walletConnectConnector = connectors.find(
    (connector) => connector.id === 'walletConnect'
  );

  if (isConnected) {
    return (
      <Button
        onClick={() => disconnect()}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Disconnect ({address?.slice(0, 6)}...{address?.slice(-4)})
      </Button>
    );
  }

  return (
    <Button
      onClick={() => walletConnectConnector && connect({ connector: walletConnectConnector })}
      className="bg-primary text-primary-foreground hover:bg-primary/90"
    >
      Connect Wallet
    </Button>
  );
}