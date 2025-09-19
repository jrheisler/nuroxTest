const API = 'https://api-staging-wingman.nurox.ai';
export const ACCESS_SIGN_IN_INSTRUCTIONS =
  'Visit https://api-staging-wingman.nurox.ai in a browser tab and sign in via Cloudflare Access.';

export async function apiGet(path: string) {
  let res: Response;
  try {
    res = await fetch(`${API}${path}`, {
      method: 'GET',
      credentials: 'include',
      headers: { Accept: 'application/json' },
    });
  } catch (err) {
    if (
      err instanceof TypeError ||
      (err instanceof Error && /Failed to fetch/i.test(err.message))
    ) {
      throw new Error(ACCESS_SIGN_IN_INSTRUCTIONS);
    }
    throw err;
  }
  if (res.status === 401 || res.status === 403) {
    throw new Error(`Not authorized. ${ACCESS_SIGN_IN_INSTRUCTIONS}`);
  }
  const contentType = res.headers.get('content-type') ?? '';
  return contentType.includes('application/json') ? res.json() : res.text();
}
