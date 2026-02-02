// const API_BASE = "http://localhost:4000"; // mock for now

// export async function authFetch<T>(
//   path: string,
//   options?: RequestInit,
// ): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     credentials: "include", // cookies / session
//     headers: {
//       "Content-Type": "application/json",
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     throw new Error("Auth request failed");
//   }

//   return res.json();
// }

// const API_BASE = "http://localhost:3000"; // mock for now

// export async function authFetch<T>(
//   path: string,
//   options: RequestInit = {},
// ): Promise<T> {
//   const res = await fetch(`${API_BASE}${path}`, {
//     credentials: "include", // 🔐 JWT cookie (required)
//     headers: {
//       "Content-Type": "application/json",
//       ...(options.headers || {}),
//     },
//     ...options,
//   });

//   if (!res.ok) {
//     throw new Error(`Auth request failed: ${res.status}`);
//   }

//   return res.json();
// }

// core/query/authClient.ts

// ✅ Change this to your production backend when ready
// core/query/authClient.ts
import { useAuthStore } from "../../features/auth/auth.store";

// ✅ Production backend
export const API_BASE = "https://0e14cca7cfb4.ngrok-free.app";

export async function authFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  // 🔐 Read JWT directly from Zustand (safe outside React)
  const accessToken = useAuthStore.getState().accessToken;
  console.log("tok:", accessToken);
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": "true",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}), // ← Move this to the end
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth request failed (${res.status}): ${text}`);
  }
  // const data = await res.json();
  // console.log("data:", data);
  return res.json() as Promise<T>;
}
