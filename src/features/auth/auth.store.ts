import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth.types";

type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  hydrated: boolean;
  setAuth: (user: AuthUser, token?: string) => void; // 🔧 token optional
  logout: () => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      token: null, // ✅ ADD
      hydrated: false,

      setAuth: (user, token) =>
        set({
          authenticated: true,
          user,
          token, // ✅ STORE JWT
        }),

      logout: () =>
        set({
          authenticated: false,
          user: null,
          token: null, // ✅ CLEAR JWT
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

// ✅ selector helper (unchanged)
export const useAuthReady = () => useAuthStore((s) => s.hydrated);
