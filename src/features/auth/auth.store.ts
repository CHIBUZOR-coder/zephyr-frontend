// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import type { AuthUser } from "./auth.types";

// type AuthState = {
//   authenticated: boolean;
//   user: AuthUser | null;
//   accessToken: string | null;
//   hydrated: boolean;
//   setAuth: (user: AuthUser, accessToken?: string) => void;
//   logout: () => void;
// };

// export const useAuthStore = create<AuthState>()(
//   persist(
//     (set) => ({
//       authenticated: false,
//       user: null,
//       accessToken: null,
//       hydrated: false,

//       setAuth: (user, accessToken) =>
//         set((state) => ({
//           authenticated: true,
//           user,
//           // ✅ FIX: Keep existing accessToken if new one not provided
//           accessToken:
//             accessToken !== undefined ? accessToken : state.accessToken,
//         })),

//       logout: () =>
//         set({
//           authenticated: false,
//           user: null,
//           accessToken: null,
//         }),
//     }),
//     {
//       name: "auth-storage",
//       // ✅ Add partialize to ensure accessToken is persisted
//       partialize: (state) => ({
//         authenticated: state.authenticated,
//         user: state.user,
//         accessToken: state.accessToken,
//       }),
//       onRehydrateStorage: () => (state) => {
//         if (state) {
//           state.hydrated = true;
//         }
//       },
//     },
//   ),
// );

// export const useAuthReady = () => useAuthStore((s) => s.hydrated);



import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "./auth.types";

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
export const useAuthReady = () =>
  useAuthStore((s) => s.hydrated && s.authResolved);
