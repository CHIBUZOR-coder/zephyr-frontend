import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth.types";

type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
  hydrated: boolean;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,
      hydrated: false,

      setAuth: (user) =>
        set({
          authenticated: true,
          user,
        }),

      logout: () =>
        set({
          authenticated: false,
          user: null,
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

// ✅ selector helper (Day 9)
export const useAuthReady = () =>
  useAuthStore((s) => s.hydrated);