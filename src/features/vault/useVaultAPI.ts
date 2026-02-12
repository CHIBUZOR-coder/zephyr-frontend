// src/features/vault/useVaultAPI.ts

/**
 * Vault API Hooks - React Query hooks for vault operations
 * Day 11, Milestone 2
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "../../core/query/authClient";
import type {
  VaultInitializeRequest,
  VaultInitializeResponse,
  VaultConfirmRequest,
  VaultConfirmResponse,
  VaultsListResponse,
  VaultDetailsResponse,
  UserVaultsResponse,
  Vault,
} from "./vault.types";

// ============================================
// 1. INITIALIZE VAULT (Step 1 of vault creation)
// ============================================
export function useVaultInitialize() {
  return useMutation<VaultInitializeResponse, Error, VaultInitializeRequest>({
    mutationFn: async (params) => {
      console.log("🔄 Initializing vault with params:", params);

      const response = await authFetch<VaultInitializeResponse>(
        "/api/vaults/initialize",
        {
          method: "POST",
          body: JSON.stringify(params),
        },
      );

      console.log("✅ Vault initialized:", response);
      return response;
    },
  });
}

// ============================================
// 2. CONFIRM VAULT (Step 2 - after blockchain tx)
// ============================================
export function useVaultConfirm() {
  const queryClient = useQueryClient();

  return useMutation<VaultConfirmResponse, Error, VaultConfirmRequest>({
    mutationFn: async (params) => {
      console.log("🔄 Confirming vault:", params);

      const response = await authFetch<VaultConfirmResponse>(
        "/api/vaults/confirm",
        {
          method: "POST",
          body: JSON.stringify(params),
        },
      );

      console.log("✅ Vault confirmed:", response);
      return response;
    },
    onSuccess: () => {
      // Invalidate vault queries to refresh data
      queryClient.invalidateQueries({ queryKey: ["vaults"] });
      queryClient.invalidateQueries({ queryKey: ["user-vaults"] });
    },
  });
}

// ============================================
// 3. LIST ALL VAULTS (with optional filters)
// ============================================
export function useVaultsList(params?: {
  copier?: string;
  master?: string;
  limit?: number;
  offset?: number;
}) {
  const queryParams = new URLSearchParams();
  if (params?.copier) queryParams.set("copier", params.copier);
  if (params?.master) queryParams.set("master", params.master);
  if (params?.limit) queryParams.set("limit", params.limit.toString());
  if (params?.offset) queryParams.set("offset", params.offset.toString());

  const queryString = queryParams.toString();
  const url = `/api/vaults${queryString ? `?${queryString}` : ""}`;

  return useQuery<Vault[]>({
    queryKey: ["vaults", params],
    queryFn: async () => {
      const response = await authFetch<VaultsListResponse>(url);
      return response.vaults;
    },
  });
}

// ============================================
// 4. GET VAULT DETAILS
// ============================================
export function useVaultDetails(vaultAddress?: string) {
  return useQuery<Vault>({
    queryKey: ["vault", vaultAddress],
    queryFn: async () => {
      const response = await authFetch<VaultDetailsResponse>(
        `/api/vaults/${vaultAddress}`,
      );
      return response.vault;
    },
    enabled: !!vaultAddress,
  });
}

// ============================================
// 5. GET USER'S VAULTS (as copier & master)
// ============================================
export function useUserVaults(walletAddress?: string) {
  return useQuery<UserVaultsResponse>({
    queryKey: ["user-vaults", walletAddress],
    queryFn: async () => {
      const response = await authFetch<UserVaultsResponse>(
        `/api/users/${walletAddress}/vaults`,
      );
      return response;
    },
    enabled: !!walletAddress,
  });
}
