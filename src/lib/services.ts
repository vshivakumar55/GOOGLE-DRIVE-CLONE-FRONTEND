const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${apiUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
}