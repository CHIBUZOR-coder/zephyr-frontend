// import { useQuery } from "@tanstack/react-query";
// import { useEffect } from "react";
// import { authFetch } from "../../core/query/authClient";
// import type { AuthSession } from "./auth.types";
// import { useAuthStore } from "./auth.store";

// export function useAuthSession() {
//   const setAuth = useAuthStore((s) => s.setAuth);
//   const logout = useAuthStore((s) => s.logout);

//   const query = useQuery<AuthSession>({
//     queryKey: ["auth-session"],
//     queryFn: () => authFetch<AuthSession>("/auth/session"),
//     retry: false,
//     staleTime: 1000 * 60, // 1 minute
//   });

//   // ✅ SIDE EFFECTS LIVE HERE (v5 pattern)
//   useEffect(() => {
//     if (query.data) {
//       if (query.data.authenticated && query.data.user) {
//         setAuth(query.data.user);
//       } else {
//         logout();
//       }
//     }
//   }, [query.data, setAuth, logout]);

//   useEffect(() => {
//     if (query.error) {
//       logout();
//     }
//   }, [query.error, logout]);

//   return query;
// }



import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { authFetch } from "../../core/query/authClient";
import type { AuthSession } from "./auth.types";
import { useAuthStore } from "./auth.store";

export function useAuthSession() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const logout = useAuthStore((s) => s.logout);

  const query = useQuery<AuthSession>({
    queryKey: ["auth-session"],
    queryFn: () => authFetch<AuthSession>("/auth/session"),
    retry: false,
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!query.data) return;

    if (query.data.authenticated && query.data.user) {
      setAuth(query.data.user);
    } else {
      logout();

      // ✅ hard redirect to home
      window.location.replace("/");
    }
  }, [query.data, setAuth, logout]);

  useEffect(() => {
    if (query.error) {
      logout();

      // ✅ hard redirect to home
      window.location.replace("/");
    }
  }, [query.error, logout]);

  return query;
}
