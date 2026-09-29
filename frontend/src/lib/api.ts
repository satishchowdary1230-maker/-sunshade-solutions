export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || '';

export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = BACKEND_URL ? `${BACKEND_URL}${path}` : path;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
    return await res.json();
  } catch (error) {
    // If backend direct call fails and BACKEND_URL was set, try relative Next.js fallback
    if (BACKEND_URL) {
      try {
        const fallbackRes = await fetch(path, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {}),
          },
        });
        return await fallbackRes.json();
      } catch {
        throw error;
      }
    }
    throw error;
  }
}
