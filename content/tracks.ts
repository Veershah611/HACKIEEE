/**
 * The four tracks. Each card is a layered diorama: `layers` are drawn in
 * order (back to front) and each is parallaxed by its own `depth`.
 * Adding a layer needs no component change — just add an entry here.
 *
 * `accent` drives the card's --c custom property.
 */
export type TrackLayer = {
  src: string;
  depth: number;
  width: number;
  height: number;
  /** extra class on the layer: 'mid' | 'fg' | 'float' */
  variant?: 'mid' | 'fg' | 'float';
};

export type Track = {
  n: string;
  hero: string;
  title: string;
  blurb: string;
  tag: string;
  accent: string;
  /** cyber track gets the scan sweep */
  scan?: boolean;
  layers: TrackLayer[];
};

export const tracks: Track[] = [
  {
    n: '01',
    hero: 'Captain America',
    title: 'Cyber Security',
    blurb:
      'Threat detection, privacy-preserving pipelines and secure-by-default tooling. Break it, then build the thing that stops it.',
    tag: 'The firewall already failed',
    accent: '#39FF14',
    scan: true,
    layers: [
      {
        src: '/assets/opt/destroyed-server-rack.webp',
        depth: 8,
        width: 380,
        height: 572,
      },
      {
        src: '/assets/opt/cyber-hacker-minifig.webp',
        depth: 26,
        width: 330,
        height: 495,
        variant: 'fg',
      },
      {
        src: '/assets/opt/flying-cyber-bricks.webp',
        depth: 44,
        width: 520,
        height: 339,
        variant: 'float',
      },
    ],
  },
  {
    n: '02',
    hero: 'Iron Man',
    title: 'Fintech',
    blurb:
      'Payments, credit access, fraud signals and financial literacy for the next billion users. Money is a protocol — improve it.',
    tag: 'The exchange is on fire',
    accent: '#FFD600',
    layers: [
      {
        src: '/assets/opt/fintech-crash-ticker-board.webp',
        depth: 8,
        width: 520,
        height: 345,
      },
      {
        src: '/assets/opt/lego-bank-vault.webp',
        depth: 16,
        width: 400,
        height: 268,
        variant: 'mid',
      },
      {
        src: '/assets/opt/fintech-minifigure.webp',
        depth: 26,
        width: 330,
        height: 498,
        variant: 'fg',
      },
      {
        src: '/assets/opt/fintech-coins.webp',
        depth: 44,
        width: 520,
        height: 349,
        variant: 'float',
      },
    ],
  },
  {
    n: '03',
    hero: 'Wolverine',
    title: 'Healthcare',
    blurb:
      'Diagnostics, triage and medical signal processing in low-resource settings. Latency here is measured in lives, not milliseconds.',
    tag: 'The ward never closed',
    accent: '#FF3B3B',
    layers: [
      {
        src: '/assets/opt/lego-hospital-background.webp',
        depth: 8,
        width: 520,
        height: 362,
      },
      {
        src: '/assets/opt/healthcare-dna.webp',
        depth: 16,
        width: 330,
        height: 536,
        variant: 'mid',
      },
      {
        src: '/assets/opt/healthcare-minifig.webp',
        depth: 26,
        width: 330,
        height: 518,
        variant: 'fg',
      },
      {
        src: '/assets/opt/lego-healthcare-floaters.webp',
        depth: 44,
        width: 520,
        height: 356,
        variant: 'float',
      },
    ],
  },
  {
    n: '04',
    hero: 'The Hulk',
    title: 'Sustainability',
    blurb:
      'Climate telemetry, circular supply chains and energy-aware systems — the plumbing that makes green infrastructure measurable.',
    tag: 'The ground is cracking',
    accent: '#7CD64A',
    layers: [
      {
        src: '/assets/opt/sustainability-background-broken-earth.webp',
        depth: 8,
        width: 520,
        height: 302,
      },
      {
        src: '/assets/opt/lego-sustainability-minifigure.webp',
        depth: 26,
        width: 380,
        height: 260,
        variant: 'fg',
      },
      {
        src: '/assets/opt/lego-sustainability-floaters.webp',
        depth: 44,
        width: 520,
        height: 346,
        variant: 'float',
      },
    ],
  },
];
