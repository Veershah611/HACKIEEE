/**
 * The three organising chapters.
 *
 * `fallback` is the two/three-letter mark shown if the logo file is missing —
 * cs.png and sps.png are still pending. Drop them into public/assets/logos/
 * and the placeholder disappears on its own; no code change needed.
 */
export const chapters = [
  {
    name: 'Computer Society',
    logo: '/assets/logos/cs.png',
    alt: 'IEEE Computer Society, Nirma University',
    fallback: 'CS',
    blurb: 'Systems, security and AI — the software backbone of the branch.',
  },
  {
    name: 'ITSS',
    logo: '/assets/logos/itss_nirma.png',
    alt: 'IEEE ITSS, Nirma University',
    blurb: 'Mobility, sensing and smart infrastructure research.',
  },
  {
    name: 'Signal Processing Society',
    logo: '/assets/logos/sps.png',
    alt: 'IEEE Signal Processing Society, Nirma University',
    fallback: 'SPS',
    blurb: 'Audio, vision and biomedical signals.',
  },
] as const;

/** PLACEHOLDER — replace slots with real partner names/logos as they sign. */
export const partners = ['Slot 01', 'Slot 02', 'Slot 03', 'Slot 04', 'Slot 05'];
