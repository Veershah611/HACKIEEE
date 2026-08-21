'use client';

import { useEffect, useState } from 'react';

const pad = (v: number) => String(v).padStart(2, '0');
const ZERO = { d: '00', h: '00', m: '00', s: '00' } as const;

export type Remaining = { d: string; h: string; m: string; s: string };

/**
 * Time left until `startsAt`, ticking every second.
 *
 * It deliberately starts at 00:00:00:00 and fills in on the first client tick.
 * The page is statically prerendered, so computing a real value during render
 * would bake build-time numbers into the HTML and then hydrate to different
 * ones — a guaranteed mismatch. Zeroes are correct in both passes.
 */
export function useCountdown(startsAt: string): Remaining {
  const [left, setLeft] = useState<Remaining>(ZERO);

  useEffect(() => {
    const target = new Date(startsAt).getTime();

    const tick = () => {
      const diff = target - Date.now();
      if (diff <= 0) return setLeft(ZERO);
      const s = Math.floor(diff / 1000);
      setLeft({
        d: pad(Math.floor(s / 86400)),
        h: pad(Math.floor(s / 3600) % 24),
        m: pad(Math.floor(s / 60) % 60),
        s: pad(s % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startsAt]);

  return left;
}
