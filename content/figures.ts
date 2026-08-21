/**
 * The two character figures.
 *
 * Both currently render as hand-drawn flat SVG (`components/ui/*Figure.tsx`),
 * which reads as a different medium from the photoreal LEGO renders used
 * everywhere else on the page. Replacing them with renders is a one-line
 * change per figure and needs no component edit:
 *
 *   1. Drop the source PNG into `assets/` (transparent background).
 *   2. Run `npm run assets` — it trims, resizes and exports WebP to
 *      `public/assets/opt/<kebab-name>.webp`.
 *   3. Set `image` below to that path and fill in `width`/`height` from the
 *      optimiser's output (it prints the final dimensions).
 *
 * Leave `image` undefined to keep the vector fallback.
 */
export type Figure = {
  /** set to a /assets/opt/*.webp path to use a render instead of the SVG */
  image?: string;
  /** intrinsic size of the render — required when `image` is set, to prevent layout shift */
  width?: number;
  height?: number;
  /** describes the figure for screen readers, in both the SVG and image cases */
  alt: string;
};

export const figures: Record<'doom' | 'webSlinger', Figure> = {
  doom: {
    // image: '/assets/opt/doom-minifig.webp',
    alt: 'Armoured monarch minifigure',
  },
  webSlinger: {
    // image: '/assets/opt/web-slinger-minifig.webp',
    alt: 'Web-slinging builder minifigure',
  },
};
