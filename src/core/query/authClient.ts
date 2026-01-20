const API_BASE = "http://localhost:4000"; // mock for now

export async function authFetch<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // cookies / session
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error("Auth request failed");
  }

  return res.json();
}
