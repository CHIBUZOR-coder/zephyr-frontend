// // src/features/users/useUserProfile.ts
// import { useQuery } from "@tanstack/react-query";
// import { authFetch } from "../../core/query/authClient";
// import type { UserProfile } from "./user.types";

// type UserProfileResponse = {
//   success: boolean;
//   user: UserProfile;
// };

// /**
//  * Fetches a user profile for a given walletAddress.
//  * Query is only enabled if walletAddress exists.
//  */
// import { useAuthStore, useAuthReady } from "../auth/auth.store";

// export function useUserProfile(walletAddress?: string) {
//   const authenticated = useAuthStore((s) => s.authenticated);
//   const hydrated = useAuthReady();

//   return useQuery<UserProfile, Error>({
//     queryKey: ["user-profile", walletAddress],
//     queryFn: async () => {
//       if (!walletAddress) throw new Error("No wallet address provided");

//       const response = await authFetch<UserProfileResponse>(
//         `/api/users/${walletAddress}`,
//       );

//       return response.user;
//     },
//     enabled: !!walletAddress && authenticated && hydrated,
//   });
// }
// src/features/users/useUserProfile.ts
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../../core/query/authClient";
import type { UserProfile } from "./user.types";
import { useAuthStore, useAuthReady } from "../auth/auth.store";

type UserProfileResponse = {
  success: boolean;
  user: UserProfile;
};

/**
 * Fetches a user profile for a given walletAddress.
 * Query is only enabled if walletAddress exists.
 */
export function useUserProfile(walletAddress?: string) {
  const authenticated = useAuthStore((s) => s.authenticated);
  const hydrated = useAuthReady();

  return useQuery<UserProfile, Error>({
    queryKey: ["user-profile", walletAddress],

    // ✅ revised queryFn (no throw, relies on `enabled`)
    queryFn: async () => {
      const response = await authFetch<UserProfileResponse>(
        `/api/users/${walletAddress!}`,
      );
      return response.user;
    },

    enabled: !!walletAddress && authenticated && hydrated,
  });
}
