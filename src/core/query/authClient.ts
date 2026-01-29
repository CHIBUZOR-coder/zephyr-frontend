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
export const API_BASE = "https://da0f423465dd.ngrok-free.app";

export async function authFetch<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  // 🔐 Read JWT directly from Zustand (safe outside React)
  const token = useAuthStore.getState().token;

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Auth request failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}
