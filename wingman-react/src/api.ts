const API = 'https://api-staging-wingman.nurox.ai';

export async function apiGet(path: string) {
  const res = await fetch(`${API}${path}`, {
    method: 'GET',
    credentials: 'include',
    headers: { Accept: 'application/json' },
  });
  if (res.status === 401 || res.status === 403) {
    throw new Error(
      'Not authorized. Open the API URL in a browser tab and sign in via Cloudflare Access.'
    );
  }
  const contentType = res.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? res.json() : res.text();
}
