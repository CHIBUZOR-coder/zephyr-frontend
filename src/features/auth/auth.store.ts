import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth.types";

type AuthState = {
  authenticated: boolean;
  user: AuthUser | null;
  setAuth: (user: AuthUser) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      authenticated: false,
      user: null,

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
      name: "auth-storage", // 👈 localStorage key
    },
  ),
);
