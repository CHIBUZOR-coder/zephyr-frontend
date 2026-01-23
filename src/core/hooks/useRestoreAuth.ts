import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useAuthStore } from "../../features/auth/auth.store"; 

export function useRestoreAuth() {
  const { connected, publicKey } = useWallet();
  const { user, authenticated, hydrated, setAuth } = useAuthStore();

  useEffect(() => {
    if (!hydrated) return;
    if (!connected || !publicKey) return;
    if (authenticated) return;

    if (user?.walletAddress === publicKey.toBase58()) {
      setAuth(user);
    }
  }, [hydrated, connected, publicKey, authenticated, user, setAuth]);
}
