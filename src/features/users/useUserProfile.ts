
import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../../core/query/authClient";
import type { UserProfile } from "./user.types";
import { useAuthStore } from "../auth/auth.store";
import { useAuthReady } from "../auth/useAuthReady";

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
        `/api/auth/me`,
      );
      return res.user;
    },
    enabled: authReady && !!walletAddress && !!token,
    retry: false,
  });
}

