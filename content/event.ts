/**
 * Event facts. Dates marked PLACEHOLDER are invented and must be confirmed
 * before launch — see README "Placeholders to replace".
 *
 * Note: 21 Dec 2026 is a Monday, so this runs Mon–Wed, not a weekend. Copy
 * says "build sprint" rather than "weekend" for that reason.
 * The 36-hour window is exact: Mon 19:00 + 36h = Wed 07:00 freeze.
 */
export const event = {
  name: 'HackIEEE 2026',
  tagline: 'Build. Break. Survive.',
  durationHours: 36,

  /** Kickoff. Drives the hero countdown. Format: YYYY-MM-DDTHH:mm:ss+05:30 */
  startsAt: '2026-12-21T16:00:00+05:30',

  organiser: 'IEEE Nirma University Student Branch',
  chapters: ['CS', 'ITSS', 'SPS'],
  location: 'Ahmedabad, India',
  email: 'ieee@nirmauni.ac.in',

  /** PLACEHOLDER — both buttons in #register point at '#' until these are real. */
  registerUrl: '#',
  rulebookUrl: '#',

  /** PLACEHOLDER */
  registrationClosesLabel: '07 December 2026',

  social: [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
  ],
} as const;

/** PLACEHOLDER — set to the real production origin before launch.
 *  Used to resolve the absolute og:image URL. */
export const siteUrl = 'https://hackieee.example.org';

export const seo = {
  title: 'HackIEEE 2026 — Build. Break. Survive.',
  description:
    'HackIEEE 2026 — a 36-hour hackathon by the IEEE Nirma University Student Branch. Computer Society, ITSS and SPS. Four tracks, one broken world, 36 hours to rebuild it.',
  ogDescription: '36 hours. 4 tracks. One broken world.',
  ogImage: '/assets/opt/doomsday-image.webp',
  themeColor: '#0A0A0F',
} as const;

export const nav = [
  { href: '#brief', label: 'Brief' },
  { href: '#decree', label: 'Decree' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#bugle', label: 'Bugle' },
  { href: '#prizes', label: 'Prizes' },
  { href: '#faq', label: 'FAQ' },
] as const;

export const stats = [
  { count: 36, label: 'hours' },
  { count: 4, label: 'tracks' },
  { count: 300, suffix: '+', label: 'builders' },
  { count: 3, label: 'chapters' },
] as const;
