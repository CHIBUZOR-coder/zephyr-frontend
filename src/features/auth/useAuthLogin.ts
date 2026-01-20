import { useMutation } from "@tanstack/react-query";
// import { authFetch } from "../../core/query/authClient";
import type { AuthLoginPayload, AuthUser } from "./auth.types";
import { useAuthStore } from "./auth.store";

// export function useAuthLogin() {
//   const setAuth = useAuthStore((s) => s.setAuth);

//   return useMutation({
//     mutationFn: async (payload: AuthLoginPayload) => {
//       return authFetch<{ user: AuthUser }>("/auth/login", {
//         method: "POST",
//         body: JSON.stringify(payload),
//       });
//     },

//     onSuccess: (data) => {
//       setAuth(data.user);
//     },
//   });
// }
export function useAuthLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: async (payload: AuthLoginPayload) => {
      await new Promise((r) => setTimeout(r, 500));
      const mockUser: AuthUser = {
        id: "mock-user-id",
        walletAddress: payload.publicKey,
        role: "user",
      };
      return { user: mockUser };
    },
    onSuccess: (data) => {
      setAuth(data.user);
    },
  });
}
