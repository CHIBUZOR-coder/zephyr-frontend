import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authFetch } from "../../core/query/authClient";
import type { AuthUser } from "./auth.types";
import { useAuthStore } from "./auth.store";

type AuthMeResponse = {
  authenticated: boolean;
  user: AuthUser | null;
};

export function useAuthSession() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const query = useQuery<AuthMeResponse>({
    queryKey: ["auth-me"],
    queryFn: () => authFetch<AuthMeResponse>("/api/auth/me"),
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (!query.data) return;

    if (query.data.authenticated && query.data.user) {
      setAuth(query.data.user);
    }
    // ❗ DO NOT logout here automatically
  }, [query.data, setAuth]);

  useEffect(() => {
    if (!query.error) return;

    // ✅ Only logout on explicit 401
    const message = (query.error as Error).message;
    if (message.includes("401")) {
      logout();
    }
  }, [query.error, logout]);

  return query;
}
