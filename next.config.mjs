/** @type {import('next').NextConfig} */

// GitHub Pages serves project repos at /<repo>/, so we need a basePath.
// Set PAGES_BASE_PATH="" when developing locally (or omit it entirely).
const basePath = process.env.PAGES_BASE_PATH ?? '';

const nextConfig = {
  // Static export: `next build` emits a plain folder of HTML/CSS/JS in `out/`,
  // deployable to any static host exactly like the old hand-written site.
  // Drop this line the day the site needs server routes (registration, admin).
  output: 'export',

  // The renders are already trimmed and re-encoded to WebP by
  // tools/optimize-assets.py, which next/image cannot replicate (it does not
  // crop transparent margins). Every <img> carries explicit width/height, so
  // there is no layout shift to solve either.
  images: { unoptimized: true },

  trailingSlash: true,

  // basePath/assetPrefix only cover Next's own `_next/*` output. Plain
  // <img src="/assets/…"> is left alone, so lib/asset.ts prefixes those and
  // needs the value at runtime — NEXT_PUBLIC_* is inlined at build time.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // Only set basePath/assetPrefix when building for GitHub Pages.
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
};

export default nextConfig;
