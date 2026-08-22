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
 * Alt text describes the figures rather than naming the characters, which
 * pairs with the trademark disclaimer in the footer.
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
    id: 'armour',
    name: 'The Engineer',
    line: 'Builds the suit, then funds the workshop.',
    track: 'Fintech',
    side: 'hero',
    src: '/assets/opt/lego-ironman.webp',
    width: 620,
    height: 949,
    alt: 'Red and gold armoured minifigure',
  },
  {
    id: 'surgeon',
    name: 'The Surgeon',
    line: 'Steady hands, impossible odds.',
    track: 'Healthcare',
    side: 'hero',
    src: '/assets/opt/lego-strange.webp',
    width: 573,
    height: 622,
    alt: 'Cloaked sorcerer minifigure',
  },
  {
    id: 'panther',
    name: 'The Steward',
    line: 'Guards the resource nobody else can replace.',
    track: 'Sustainability',
    side: 'hero',
    src: '/assets/opt/lego-blackp.webp',
    width: 620,
    height: 777,
    alt: 'Black-suited panther minifigure',
  },
  {
    id: 'fists',
    name: 'The Defender',
    line: 'Ten rings, zero unpatched ports.',
    track: 'Cyber Security',
    side: 'hero',
    src: '/assets/opt/lego-shang.webp',
    width: 201,
    height: 214,
    alt: 'Martial artist minifigure with glowing rings',
  },
  {
    id: 'storm',
    name: 'The Storm',
    line: 'Wildcard. Picks a track at the last possible minute.',
    track: null,
    side: 'hero',
    src: '/assets/opt/lego-thor.webp',
    width: 620,
    height: 655,
    alt: 'Hammer-wielding minifigure',
  },
  {
    id: 'webs',
    name: 'The Mentor',
    line: 'Swings between tables at 3 a.m. so you do not have to.',
    track: null,
    side: 'hero',
    src: '/assets/opt/lego-spiderman.webp',
    width: 620,
    height: 611,
    alt: 'Web-slinging builder minifigure',
  },
  {
    id: 'doom',
    name: 'The Monarch',
    line: 'Hell answers to me… for I. AM. DOOM.',
    track: null,
    side: 'villain',
    src: '/assets/opt/lego-doom.webp',
    width: 620,
    height: 716,
    alt: 'Armoured monarch minifigure',
  },
  {
    id: 'titan',
    name: 'The Titan',
    line: 'Believes your scope is perfectly balanced. It is not.',
    track: null,
    side: 'villain',
    src: '/assets/opt/lego-thanos.webp',
    width: 620,
    height: 658,
    alt: 'Large armoured titan minifigure',
  },
  {
    id: 'trickster',
    name: 'The Trickster',
    line: 'Social engineering is a valid attack surface.',
    track: null,
    side: 'villain',
    src: '/assets/opt/lego-loki.webp',
    width: 620,
    height: 835,
    alt: 'Horned trickster minifigure',
  },
];

export const rosterCopy = {
  tag: 'Assemble',
  heading: 'Pick your builder.',
  sub: 'Nine figures on the shelf. Choose one — it decides nothing official, but it does decide your card.',
  villainWarning: 'You picked a villain. The site noticed.',
};
