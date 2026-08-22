/**
 * Prefix a site-root path with the deployment basePath.
 *
 * Next rewrites its own `_next/*` URLs for `basePath` automatically, but it
 * does NOT touch plain `<img src="/assets/…">` — those stay root-absolute and
 * 404 on a GitHub Pages project site served from `/HACKIEEE/`.
 *
 * `NEXT_PUBLIC_BASE_PATH` is inlined at build time (see next.config.mjs), so
 * this works identically in server and client components.
 *
 *   asset('/assets/opt/lego-cloud.webp')
 *     → '/assets/opt/lego-cloud.webp'           locally
 *     → '/HACKIEEE/assets/opt/lego-cloud.webp'  on Pages
 *
 * Absolute URLs and data: URIs are passed through untouched.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}

export { BASE_PATH };
