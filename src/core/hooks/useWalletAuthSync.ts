// src/core/hooks/useWalletAuthSync.ts
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAuthStore } from "../../features/auth/auth.store";

export function useWalletAuthSync() {
  const { connected, publicKey } = useWallet();
  const { authenticated, setAuth } = useAuthStore();

  useEffect(() => {
    if (!connected || !publicKey) return;

    if (!authenticated) {
      setAuth({
        id: "mock-user-id",
        walletAddress: publicKey.toBase58(),
        role: "user",
      });
    }
  }, [connected, publicKey, authenticated, setAuth]);
}
