// src/features/vault/vault.store.ts

/**
 * Vault Store - Zustand store for vault state
 * Day 11, Milestone 2
 */

import { create } from "zustand";
import type { Vault } from "./vault.types";

type VaultState = {
  // Selected vault for viewing details
  selectedVault: Vault | null;
  setSelectedVault: (vault: Vault | null) => void;

  // Vault creation flow state
  isCreatingVault: boolean;
  setIsCreatingVault: (isCreating: boolean) => void;

  // Clear all state
  reset: () => void;
};

export const useVaultStore = create<VaultState>((set) => ({
  selectedVault: null,
  setSelectedVault: (vault) => set({ selectedVault: vault }),

  isCreatingVault: false,
  setIsCreatingVault: (isCreating) => set({ isCreatingVault: isCreating }),

  reset: () =>
    set({
      selectedVault: null,
      isCreatingVault: false,
    }),
}));
