import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth.types";
import { useEffect } from "react";

type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;

  hydrated: boolean;
  authResolved: boolean;

  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      accessToken: null,

      hydrated: false,
      authResolved: false,

      setAuth: (user, token) =>
        set({
          authenticated: true,
          user,
          accessToken: token,
          authResolved: true,
        }),

      logout: () =>
        set({
          authenticated: false,
          user: null,
          accessToken: null,
          authResolved: true,
        }),
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hydrated = true;
        }
      },
    },
  ),
);

// helpers



export function useRestoreAuth() {
  const { accessToken, authResolved } = useAuthStore();

  useEffect(() => {
    if (authResolved) return;

    if (!accessToken) {
      // ❗ VERY IMPORTANT
      useAuthStore.setState({ authResolved: true });
      return;
    }

    // if token exists, backend will validate via /auth/me
    useAuthStore.setState({ authResolved: true });
  }, [accessToken, authResolved]);
}
