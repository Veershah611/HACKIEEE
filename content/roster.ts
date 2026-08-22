/**
 * The roster — every LEGO character render, pickable as your builder.
 *
 * This is the "pick the characters" interaction from the Classic Space
 * reference, adapted to whole-figure renders rather than swappable parts.
 *
 * `width`/`height` are the optimiser's output dimensions and must be kept in
 * sync with `npm run assets` — they are what stops the grid reflowing while
 * the images load.
 *
 * `side: 'villain'` is load-bearing, not decoration: picking a villain arms
 * Doom Mode (see lib/hooks/useDoomMode.ts).
 *
 * Note: these use the real character names at the organisers' request. The
 * footer trademark disclaimer covers this and must stay.
 *
 * Shang-Chi is deliberately absent — the supplied render only has 201x214 of
 * actual content, roughly a third the resolution of the others. The source
 * PNG is still in assets/, so re-exporting it larger and adding an entry here
 * is all it takes to bring him back.
 */
export type Fighter = {
  id: string;
  /** shown on the card and in the picker */
  name: string;
  /** one line of flavour, shown when selected */
  line: string;
  /** which track this builder leans towards, or null for the wildcards */
  track: string | null;
  side: 'hero' | 'villain';
  src: string;
  width: number;
  height: number;
  alt: string;
};

export const roster: Fighter[] = [
  {
    id: 'ironman',
    name: 'Iron Man',
    line: 'Builds the suit, then funds the workshop.',
    track: 'Fintech',
    side: 'hero',
    src: '/assets/opt/lego-ironman.webp',
    width: 620,
    height: 949,
    alt: 'Iron Man LEGO minifigure',
  },
  {
    id: 'strange',
    name: 'Doctor Strange',
    line: 'Steady hands, impossible odds.',
    track: 'Healthcare',
    side: 'hero',
    src: '/assets/opt/lego-strange.webp',
    width: 573,
    height: 622,
    alt: 'Doctor Strange LEGO minifigure',
  },
  {
    id: 'blackpanther',
    name: 'Black Panther',
    line: 'Guards the resource nobody else can replace.',
    track: 'Sustainability',
    side: 'hero',
    src: '/assets/opt/lego-blackp.webp',
    width: 620,
    height: 777,
    alt: 'Black Panther LEGO minifigure',
  },
  {
    id: 'thor',
    name: 'Thor',
    line: 'Wildcard. Picks a track at the last possible minute.',
    track: null,
    side: 'hero',
    src: '/assets/opt/lego-thor.webp',
    width: 620,
    height: 655,
    alt: 'Thor LEGO minifigure',
  },
  {
    id: 'spiderman',
    name: 'Spider-Man',
    line: 'Swings between tables at 3 a.m. so you do not have to.',
    track: null,
    side: 'hero',
    src: '/assets/opt/lego-spiderman.webp',
    width: 620,
    height: 611,
    alt: 'Spider-Man LEGO minifigure',
  },
  {
    id: 'doom',
    name: 'Doctor Doom',
    line: 'Hell answers to me… for I. AM. DOOM.',
    track: null,
    side: 'villain',
    src: '/assets/opt/lego-doom.webp',
    width: 620,
    height: 716,
    alt: 'Doctor Doom LEGO minifigure',
  },
  {
    id: 'thanos',
    name: 'Thanos',
    line: 'Believes your scope is perfectly balanced. It is not.',
    track: null,
    side: 'villain',
    src: '/assets/opt/lego-thanos.webp',
    width: 620,
    height: 658,
    alt: 'Thanos LEGO minifigure',
  },
  {
    id: 'loki',
    name: 'Loki',
    line: 'Social engineering is a valid attack surface.',
    track: 'Cyber Security',
    side: 'villain',
    src: '/assets/opt/lego-loki.webp',
    width: 620,
    height: 835,
    alt: 'Loki LEGO minifigure',
  },
];

export const rosterCopy = {
  tag: 'Assemble',
  heading: 'Pick your builder.',
  sub: 'Eight figures on the shelf. Choose one — it decides nothing official, but it does decide your card.',
  villainWarning: 'You picked a villain. The site noticed.',
};
