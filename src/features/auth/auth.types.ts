export type AuthLoginPayload = {
  publicKey: string;
  signature: string;
  message: string;
};

export type AuthUser = {
  id: string;
  walletAddress: string;
  role: "user" | "admin";
};

export type AuthSession = {
  authenticated: boolean;
  user: AuthUser | null;
};
