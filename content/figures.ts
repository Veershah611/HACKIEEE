/**
 * The two character figures.
 *
 * These are photoreal renders exported by `tools/optimize-assets.py`, matching
 * the medium of every other asset on the page. `width`/`height` are the
 * optimiser's output dimensions and must be kept in sync with it — they are
 * what stops the layout shifting while the image loads.
 *
 * To replace one: drop the transparent PNG in `assets/`, run `npm run assets`,
 * then update the path and dimensions here. No component changes.
 *
 * The alt text deliberately describes the figures rather than naming the
 * characters, which pairs with the trademark disclaimer in the footer.
 */
export type Figure = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const figures: Record<'doom' | 'webSlinger', Figure> = {
  doom: {
    src: '/assets/opt/lego-doom.webp',
    width: 620,
    height: 716,
    alt: 'Armoured monarch minifigure',
  },
  webSlinger: {
    src: '/assets/opt/lego-spiderman.webp',
    width: 620,
    height: 611,
    alt: 'Web-slinging builder minifigure',
  },
};
