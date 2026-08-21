'use client';

import { useEffect, useState } from 'react';

/**
 * Highlights the nav link for the section currently under the reading line
 * (35% down the viewport).
 *
 * Spies from cached offsets rather than an IntersectionObserver: this is pure
 * arithmetic per scroll event, so instant jumps — anchor clicks, hash loads —
 * can never miss a threshold the way an observer can.
 */
export function useScrollSpy(hrefs: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    let bounds: { id: string; top: number; bottom: number }[] = [];

    const measure = () => {
      bounds = hrefs
        .map((h) => document.querySelector<HTMLElement>(h))
        .filter((s): s is HTMLElement => Boolean(s))
        .map((s) => ({
          id: s.id,
          top: s.offsetTop,
          bottom: s.offsetTop + s.offsetHeight,
        }));
    };

    const pick = (line: number) => {
      for (const b of bounds) if (line >= b.top && line < b.bottom) return b.id;
      let last: string | null = null;
      for (const b of bounds) if (line >= b.top) last = b.id;
      return last;
    };

    const spy = () => setActive(pick(scrollY + innerHeight * 0.35));
    const onResize = () => {
      measure();
      spy();
    };

    measure();
    spy();
    addEventListener('scroll', spy, { passive: true });
    addEventListener('resize', onResize, { passive: true });
    addEventListener('load', onResize);
    return () => {
      removeEventListener('scroll', spy);
      removeEventListener('resize', onResize);
      removeEventListener('load', onResize);
    };
  }, [hrefs]);

  return active;
}

/** True once the page has scrolled past the dock's float threshold. */
export function useStuck(threshold = 40) {
  const [stuck, setStuck] = useState(false);
  useEffect(() => {
    const onScroll = () => setStuck(scrollY > threshold);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [threshold]);
  return stuck;
}
