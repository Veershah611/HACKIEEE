'use client';

import { type RefObject, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/**
 * The walking minifigure — paces the bottom edge as you scroll.
 *
 * Scroll progress maps to horizontal position, and the figure flips to face
 * whichever way you are travelling. It only "walks" while the page is
 * actually moving; after a short idle it stands still.
 *
 * Channel discipline (the same rule as the hero planes):
 *   - this hook writes `translate` on the wrapper,
 *   - the flip is `scale` on the inner image,
 *   - the step bob is `transform` on that same image.
 * Three independent CSS properties, so nothing overwrites anything else.
 *
 * Everything is skipped under `prefers-reduced-motion`, and the element is
 * `pointer-events: none` so it can never eat a tap.
 */
export function useWalker(wrap: RefObject<HTMLElement | null>, fig: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const w = wrap.current;
    const f = fig.current;
    if (!w || !f || prefersReducedMotion()) return;

    let raf = 0;
    let idle: ReturnType<typeof setTimeout> | undefined;
    let last = scrollY;
    let facingLeft = false;

    const apply = () => {
      raf = 0;

      const max = document.documentElement.scrollHeight - innerHeight;
      const p = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;

      // pace the full width, minus the figure and a gutter at each end
      const span = Math.max(innerWidth - w.offsetWidth - 32, 0);
      w.style.translate = `${(16 + p * span).toFixed(1)}px 0`;

      const delta = scrollY - last;
      if (Math.abs(delta) > 1) {
        const goingLeft = delta < 0;
        if (goingLeft !== facingLeft) {
          facingLeft = goingLeft;
          // scale, not transform — the bob keyframes own transform
          f.style.scale = facingLeft ? '-1 1' : '1 1';
        }
        w.classList.add('walking');
        clearTimeout(idle);
        idle = setTimeout(() => w.classList.remove('walking'), 180);
      }
      last = scrollY;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    apply();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      clearTimeout(idle);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [wrap, fig]);
}

/**
 * Fades the walker out while the footer is on screen.
 *
 * Without this it stands on top of the footer links and the trademark line —
 * the one place a fixed element at the bottom edge genuinely gets in the way.
 */
export function useHideNearFooter(wrap: RefObject<HTMLElement | null>, selector = '.foot') {
  useEffect(() => {
    const w = wrap.current;
    const foot = document.querySelector(selector);
    if (!w || !foot || !('IntersectionObserver' in window)) return;

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e) w.classList.toggle('gone', e.isIntersecting);
      },
      { threshold: 0.01 },
    );
    io.observe(foot);
    return () => io.disconnect();
  }, [wrap, selector]);
}
