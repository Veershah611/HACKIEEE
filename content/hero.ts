/**
 * Hero diorama planes, back to front. `depth` (6–52) is the parallax factor:
 * deeper planes travel further, which is what produces the sense of depth.
 * Max shift is ~23px — noticeable without being nauseating.
 *
 * Adding a plane needs no component change; add an entry and a `.pl--<key>`
 * rule in styles/sections/hero.css for its position.
 */
export type Plane = {
  /** maps to the .pl--<key> class that positions it */
  key: string;
  src: string;
  depth: number;
  width: number;
  height: number;
  /** above-the-fold planes that should not wait */
  priority?: boolean;
};

export const heroPlanes: Plane[] = [
  {
    key: 'glow',
    src: '/assets/opt/lava-ground-glow.webp',
    depth: 6,
    width: 453,
    height: 338,
    priority: true,
  },
  {
    key: 'cloud',
    src: '/assets/opt/lego-cloud.webp',
    depth: 10,
    width: 432,
    height: 360,
    priority: true,
  },
  {
    key: 'bldgL',
    src: '/assets/opt/left-skyscraper.webp',
    depth: 18,
    width: 301,
    height: 359,
  },
  {
    key: 'bldgR',
    src: '/assets/opt/right-skyscraper.webp',
    depth: 18,
    width: 244,
    height: 350,
  },
  {
    key: 'rubble',
    src: '/assets/opt/rubble-ground.webp',
    depth: 26,
    width: 501,
    height: 321,
    priority: true,
  },
  {
    key: 'hazmat',
    src: '/assets/opt/hazmat-scientist.webp',
    depth: 34,
    width: 245,
    height: 338,
  },
  {
    key: 'barrel',
    src: '/assets/opt/leaking-barrel.webp',
    depth: 40,
    width: 225,
    height: 316,
  },
  {
    key: 'debrisL',
    src: '/assets/opt/flying-bricks.webp',
    depth: 52,
    width: 564,
    height: 310,
  },
  {
    key: 'debrisR',
    src: '/assets/opt/flying-bricks.webp',
    depth: 46,
    width: 564,
    height: 310,
  },
];
