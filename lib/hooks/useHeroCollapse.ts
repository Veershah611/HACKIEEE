'use client';

import { type RefObject, useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/**
 * The demolition scroll — the skyline topples as the hero leaves the viewport.
 *
 * Writes a single 0..1 progress value to `--cl` on the diorama; every visual
 * consequence lives in CSS (styles/sections/hero.css). One custom property is
 * far cheaper than touching nine elements per frame.
 *
 * Channel discipline matters here. The planes already use:
 *   - `transform` for their idle keyframes (sway, bob, tumble)
 *   - `translate` for pointer parallax
 * so the collapse takes `rotate` and `scale`, which are still free. These are
 * independent CSS properties and compose rather than overwrite.
 *
 * Upgrade path: this is exactly what `animation-timeline: view()` is for, and
 * it would move the whole effect onto the compositor. Safari does not support
 * it yet, so the JS stays until it does.
 */
export function useHeroCollapse(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;

    let raf = 0;

    const apply = () => {
      raf = 0;
      const hero = el.closest('section');
      if (!hero) return;
      const h = hero.getBoundingClientRect();
      // 0 while the hero fills the screen, 1 once it has fully left
      const p = Math.min(Math.max(-h.top / Math.max(h.height * 0.75, 1), 0), 1);
      el.style.setProperty('--cl', p.toFixed(3));
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
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}
