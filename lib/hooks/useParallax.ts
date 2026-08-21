'use client';

import { type RefObject, useEffect } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';

/**
 * Pointer parallax over a set of 2D planes. Deliberately no CSS 3D anywhere —
 * no perspective, no preserve-3d — which is dramatically cheaper on low-end
 * phones than real geometry.
 *
 * Two rules keep this robust:
 *
 * 1. It writes to the `translate` property, NOT `transform`. The planes already
 *    use `transform` for their idle keyframes (sway, bob, tumble). These are
 *    separate CSS properties that compose, so the two never fight.
 * 2. Base positioning must avoid centring transforms — hero planes use
 *    `left: (100 - width) / 2` rather than `left:50%; transform:translateX(-50%)`,
 *    which keeps `transform` free for the animations.
 *
 * Depth is read from each element's `data-depth`, so adding a plane needs no
 * change here.
 *
 * @param selector  layer selector, scoped to `ref`
 * @param scale     depth multiplier — hero is 1, track cards 1.4
 * @param track     'window' makes the hero follow the whole viewport;
 *                  'self' makes a card track only its own bounds
 */
export function useParallax(
  ref: RefObject<HTMLElement | null>,
  {
    selector,
    scale = 1,
    track = 'self',
  }: { selector: string; scale?: number; track?: 'window' | 'self' },
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (!hasFinePointer() || prefersReducedMotion()) return;

    const layers = Array.from(root.querySelectorAll<HTMLElement>(selector));
    if (!layers.length) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      raf = 0;
      for (const el of layers) {
        const d = (Number.parseFloat(el.dataset.depth ?? '') || 10) / 100;
        el.style.translate = `${tx * d * scale}px ${ty * d * scale * 0.55}px`;
      }
    };

    const onMove = (e: MouseEvent) => {
      const r = root.getBoundingClientRect();
      tx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * 42;
      ty = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * 26;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const target: Window | HTMLElement = track === 'window' ? window : root;
    target.addEventListener('mousemove', onMove as EventListener, {
      passive: true,
    });
    root.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      target.removeEventListener('mousemove', onMove as EventListener);
      root.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref, selector, scale, track]);
}
