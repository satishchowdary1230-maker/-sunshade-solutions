export const BACKEND_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function apiRequest(path: string, options: RequestInit = {}) {
  const url = `${BACKEND_URL}${path}`;
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
    // If backend direct call fails, try relative Next.js fallback
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
}
