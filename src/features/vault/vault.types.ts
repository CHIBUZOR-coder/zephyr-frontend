// src/features/vault/vault.types.ts

/**
 * Vault Types - Matching Backend API
 * Day 11, Milestone 2
 */

// ============================================
// USER TYPES (from API)
// ============================================
export type UserPublic = {
  id: string;
  walletAddress: string;
  displayName: string;
  bio: string | null;
  avatar: string | null;
  createdAt: string;
  updatedAt: string;
};

// ============================================
// VAULT REQUEST TYPES
// ============================================
export type VaultInitializeRequest = {
  masterAddress: string;
  maxLossPct: number;
  maxTradeSizePct: number;
  maxDrawdownPct: number;
};

export type VaultConfirmRequest = {
  vaultAddress: string;
  signature: string;
  customName?: string;
};

// ============================================
// VAULT RESPONSE TYPES
// ============================================
export type VaultInitializeResponse = {
  success: boolean;
  data: {
    vaultAddress: string;
    bump: number;
    copierAddress: string;
    masterAddress: string;
    riskParams: {
      maxLossPct: number;
      maxTradeSizePct: number;
      maxDrawdownPct: number;
    };
  };
  message?: string;
};

export type VaultPnL = {
  pnl: string; // Lamports (string for BigInt)
  pnlPercentage: number; // Percentage as number
};

export type Vault = {
  id: string;
  vaultAddress: string;
  copierId: string;
  balance: string; // Lamports
  totalDeposited: string; // Lamports
  maxLossPct: number;
  maxTradeSizePct: number;
  maxDrawDownPct: number; // Note: API uses 'maxDrawDownPct' (capital D)
  isPaused: boolean;
  copier: UserPublic;
  master: UserPublic;
  pnl: VaultPnL;
};

export type VaultConfirmResponse = {
  success: boolean;
  vault: Vault;
  signature: string;
};

export type VaultsListResponse = {
  success: boolean;
  vaults: Vault[];
  pagination: {
    limit: number;
    offset: number;
  };
  total: number;
};

export type VaultDetailsResponse = {
  success: boolean;
  vault: Vault;
};

export type UserVaultsResponse = {
  success: boolean;
  vaultsAsCopier: Vault[];
  vaultsAsMaster: Vault[];
};

// ============================================
// UTILITY TYPES & HELPERS
// ============================================
export type RiskParams = {
  maxLossPct: number;
  maxTradeSizePct: number;
  maxDrawdownPct: number;
};

// Conversion helpers
export const lamportsToSOL = (lamports: string | number): number => {
  return Number(lamports) / 1e9;
};

export const SOLToLamports = (sol: number): string => {
  return (sol * 1e9).toString();
};
