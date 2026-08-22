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

/**
 * Hero entrance: each `[data-stage]` element, 90ms apart.
 *
 * The dock is deliberately NOT handled here. Adding `.in` with classList only
 * survives while React never rewrites that element's className, and React
 * rewrites it whenever the rendered value changes. The dock's className is a
 * template that flips with `stuck`, so an imperative `.in` was destroyed on
 * the first scroll and the dock went invisible while still catching clicks.
 * Nav owns its own reveal state instead.
 *
 * The elements below are safe because their classNames are static strings —
 * React skips the DOM write when the value is unchanged. Any element that
 * gains a state-dependent className must move its reveal into React too.
 */
export function useStageIn() {
  useEffect(() => {
    const reduced = prefersReducedMotion();
    const timers = Array.from(document.querySelectorAll<HTMLElement>('[data-stage]')).map((n, i) =>
      setTimeout(() => n.classList.add('in'), reduced ? 0 : 90 * i),
    );
    return () => timers.forEach(clearTimeout);
  }, []);
}
