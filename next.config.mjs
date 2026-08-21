/** @type {import('next').NextConfig} */
const nextConfig = {
	// Static export: `next build` emits a plain folder of HTML/CSS/JS in `out/`,
	// deployable to any static host exactly like the old hand-written site.
	// Drop this line the day the site needs server routes (registration, admin).
	output: "export",

	// The renders are already trimmed and re-encoded to WebP by
	// tools/optimize-assets.py, which next/image cannot replicate (it does not
	// crop transparent margins). Every <img> carries explicit width/height, so
	// there is no layout shift to solve either.
	images: { unoptimized: true },

	trailingSlash: true,
};

export default nextConfig;
