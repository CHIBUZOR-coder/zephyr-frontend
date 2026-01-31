// // import { useQuery } from "@tanstack/react-query";
// // import { authFetch } from "../../core/query/authClient";
// // import type { UserProfile } from "./user.types";
// // import { useAuthReady, useAuthStore } from "../auth/auth.store";
// // // import { useAuthStore, useAuthReady } from "../auth/auth.store";

// // type UserProfileResponse = {
// //   success: boolean;
// //   user: UserProfile;
// // };

// /**
//  * Fetches a user profile for a given walletAddress.
//  * Query is only enabled if walletAddress exists.
//  */
// // export function useUserProfile(walletAddress?: string) {
// //   const authenticated = useAuthStore((s) => s.authenticated);
// //   const hydrated = useAuthReady();

// //   console.log("wal:", walletAddress);

// //   return useQuery<UserProfile, Error>({
// //     queryKey: ["user-profile", walletAddress],

// //     queryFn: async () => {
// //       const response = await authFetch<UserProfileResponse>(
// //         `/api/users/${walletAddress!}`,
// //       );

// //       // Add logging to see what you're actually getting
// //       console.log("API Response:", response);

// //       // Handle both possible response structures
// //       if ("user" in response) {
// //         return response.user;
// //       }

// //       // If authFetch already unwrapped it
// //       return response as unknown as UserProfile;
// //     },

// //     enabled: !!walletAddress && authenticated && hydrated,
// //   });
// // }
// import { useQuery } from "@tanstack/react-query";
// import { authFetch } from "../../core/query/authClient";
// import type { UserProfile } from "./user.types";
// import { useAuthStore, useAuthReady } from "../auth/auth.store";

// type UserProfileResponse = {
//   success: boolean;
//   user: UserProfile;
// };

// export function useUserProfile() {
//   const token = useAuthStore((s) => s.accessToken);
//   const hydrated = useAuthReady();

//   const enabled = Boolean(token && hydrated);

//   return useQuery<UserProfile, Error>({
//     queryKey: ["user-profile", token],

//     queryFn: async () => {
//       console.log("🔥 QUERY FN RUNNING");

//       const response = await authFetch<UserProfileResponse>("/api/auth/me");

//       return response.user;
//     },

//     enabled,
//     retry: false,
//   });
// }


import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../../core/query/authClient";
import type { UserProfile } from "./user.types";
import { useAuthStore, useAuthReady } from "../auth/auth.store";

type UserProfileResponse = {
  success: boolean;
  user: UserProfile;
};

export function useUserProfile(walletAddress?: string) {
  const authReady = useAuthReady();
  const token = useAuthStore((s) => s.accessToken);

  return useQuery<UserProfile>({
    queryKey: ["user-profile", walletAddress],
    queryFn: async () => {
      const res = await authFetch<UserProfileResponse>(
        `/api/users/${walletAddress!}`,
      );
      return res.user;
    },
    enabled: authReady && !!walletAddress && !!token,
    retry: false,
  });
}

