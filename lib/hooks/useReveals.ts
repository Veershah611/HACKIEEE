'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/**
 * Reveals `[data-reveal]` on scroll by adding `.in`.
 *
 * The hide half lives in CSS as `.js [data-reveal]:not(.in){opacity:0}`.
 * Both halves of that rule are load-bearing:
 *
 * - `:not(.in)`, never a bare hide rule. A plain hide rule can outrank the
 *   reveal rule on specificity and strand the element invisible forever.
 * - `.js` gating. The class is added by an inline script in <head>. If the
 *   bundle never loads, no hide rule matches and the page renders fully.
 *
 * Siblings get a staggered transition delay, capped at 350ms.
 */
export function useReveals() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    if (!items.length) return;

    if (prefersReducedMotion()) {
      for (const n of items) n.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' },
    );

    const seen = new Map<Node, number>();
    for (const n of items) {
      const p = n.parentNode;
      if (p) {
        const i = seen.get(p) ?? 0;
        n.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
        seen.set(p, i + 1);
      }
      io.observe(n);
    }
    return () => io.disconnect();
  }, []);
}

/** Hero entrance: the dock plus each `[data-stage]` element, 90ms apart. */
export function useStageIn() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    document.getElementById('nav')?.classList.add('in');
    const timers = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]')).map((n, i) =>
      setTimeout(() => n.classList.add('in'), reduced ? 0 : 90 * i),
    );
    return () => timers.forEach(clearTimeout);
  }, []);
}
