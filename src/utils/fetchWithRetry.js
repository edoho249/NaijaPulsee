// src/utils/fetchWithRetry.js
export async function fetchWithRetry(url, retries = 5, delay = 1000) {
  try {
    const res = await fetch(url);
    if (res.status === 429) {
      const retryAfter = res.headers.get("Retry-After");
      const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : delay;
      console.warn(`429 rate limit. Retrying in ${waitTime / 1000}s`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    if (retries > 0) {
      console.warn(`Error: ${err.message}. Retrying...`);
      await new Promise((resolve) => setTimeout(resolve, delay));
      return fetchWithRetry(url, retries - 1, delay * 2);
    }
    throw err;
  }
}
