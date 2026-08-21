/**
 * Prize tiers. PLACEHOLDER figures.
 *
 * The pool headline is DERIVED from these entries, so changing a tier can no
 * longer desync the total the way it could when both were hardcoded in HTML.
 */
export type Prize = {
  label: string;
  /** rupees, per award */
  amount: number;
  /** how many awards at this tier */
  count: number;
  detail: string;
};

export const prizes: Prize[] = [
  {
    label: 'Winner',
    amount: 75_000,
    count: 1,
    detail: 'Cash, internship shortlist and hardware kits.',
  },
  {
    label: 'Runner-up',
    amount: 40_000,
    count: 1,
    detail: 'Cash and partner cloud credits.',
  },
  {
    label: 'Third',
    amount: 20_000,
    count: 1,
    detail: 'Cash and partner goodies.',
  },
  {
    label: 'Best in track ×4',
    amount: 10_000,
    count: 4,
    detail: 'One award per problem track.',
  },
];

/** Indian digit grouping: 1,75,000 not 175,000. */
export const inr = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const prizePool = prizes.reduce((sum, p) => sum + p.amount * p.count, 0);
