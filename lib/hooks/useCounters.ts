'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/**
 * Counts `[data-count]` up from zero on first view, eased out cubic.
 * A guard timer settles the final value if a rAF frame is ever dropped, so a
 * backgrounded tab can never leave a stat stuck mid-count.
 */
export function useCounters() {
  useEffect(() => {
    const nums = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
    if (!nums.length) return;

    const settle = (n: HTMLElement) => {
      n.textContent = (n.dataset.count ?? '') + (n.dataset.suffix ?? '');
    };

    if (prefersReducedMotion()) {
      for (const n of nums) settle(n);
      return;
    }

    const timers = new Set<ReturnType<typeof setTimeout>>();

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const n = e.target as HTMLElement;
          io.unobserve(n);

          const target = Number.parseFloat(n.dataset.count ?? '0');
          const suffix = n.dataset.suffix ?? '';
          const t0 = performance.now();
          const dur = 1300;
          let done = false;

          const guard = setTimeout(() => {
            if (!done) settle(n);
          }, dur + 500);
          timers.add(guard);

          requestAnimationFrame(function step(now: number) {
            const p = Math.min((now - t0) / dur, 1);
            n.textContent = Math.round(target * (1 - (1 - p) ** 3)) + (p === 1 ? suffix : '');
            if (p < 1) requestAnimationFrame(step);
            else {
              done = true;
              clearTimeout(guard);
              timers.delete(guard);
            }
          });
        }
      },
      { threshold: 0.5 },
    );

    for (const n of nums) io.observe(n);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);
}
