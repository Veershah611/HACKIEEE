/** Six checkpoints on the timeline rail. Dates tagged PLACEHOLDER are invented. */
export type Stop = {
  n: string;
  title: string;
  /** PLACEHOLDER where noted — confirm before launch */
  when: string;
  detail: string;
  /** only the first stop carries the flag-holder minifig */
  art?: { src: string; width: number; height: number };
};

export const schedule: Stop[] = [
  {
    n: '01',
    title: 'Registration opens',
    when: 'Mon 02 Nov 2026', // PLACEHOLDER
    detail: 'Team up — two to four members. Submit a short abstract.',
    art: {
      src: '/assets/opt/minifig-flagholder.webp',
      width: 120,
      height: 201,
    },
  },
  {
    n: '02',
    title: 'Shortlist announced',
    when: 'Mon 07 Dec 2026', // PLACEHOLDER
    detail: 'Selected teams are notified and track allocation locks.',
  },
  {
    n: '03',
    title: 'Check-in & kickoff',
    when: 'Mon 21 Dec · 16:00',
    detail: 'Badge pickup, keynote and the problem-statement reveal.',
  },
  {
    n: '04',
    title: 'Build window',
    when: 'Mon 21 Dec · 19:00',
    detail: '36 hours on the clock, mentor rounds every four hours.',
  },
  {
    n: '05',
    title: 'Freeze & judging',
    when: 'Wed 23 Dec · 07:00',
    detail: 'Repos lock, then round-one judging at the tables.',
  },
  {
    n: '06',
    title: 'Demo & awards',
    when: 'Wed 23 Dec · 15:00',
    detail: 'Eight-minute demos, live jury Q&A, then prizes.',
  },
];
