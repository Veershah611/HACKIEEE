'use client';

import { useEffect, useRef } from 'react';
import { hasFinePointer, prefersReducedMotion } from '@/lib/media';

/** Pool size. Enough for a few overlapping bursts, small enough to be free. */
const POOL = 12;
/** Studs thrown per click. */
const PER_BURST = 5;

/**
 * Brick crumbs — small studs pop and fall where you click.
 *
 * The pool is allocated once and recycled round-robin. Nothing is created or
 * destroyed per click, so a burst costs a few style writes and nothing else;
 * idle cost is zero because the crumbs carry no animation until fired.
 *
 * Skipped entirely on touch and under reduced motion — on a phone this would
 * fire on every tap, which is noise rather than delight.
 */
export function BrickCrumbs() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = host.current;
    if (!root || !hasFinePointer() || prefersReducedMotion()) return;

    const crumbs: HTMLSpanElement[] = [];
    for (let i = 0; i < POOL; i++) {
      const s = document.createElement('span');
      s.className = 'crumb';
      root.appendChild(s);
      crumbs.push(s);
    }

    let next = 0;

    const onClick = (e: MouseEvent) => {
      // ignore synthetic clicks with no real position (keyboard activation)
      if (!e.clientX && !e.clientY) return;

      for (let i = 0; i < PER_BURST; i++) {
        const c = crumbs[next % POOL];
        next++;
        if (!c) continue;

        // spread the burst across a half-circle pointing up
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.2;
        const power = 40 + Math.random() * 55;

        c.style.left = `${e.clientX}px`;
        c.style.top = `${e.clientY}px`;
        c.style.setProperty('--dx', `${Math.cos(angle) * power}px`);
        c.style.setProperty('--dy', `${Math.sin(angle) * power}px`);
        c.style.setProperty('--rot', `${(Math.random() - 0.5) * 540}deg`);
        c.style.setProperty('--hue', String(Math.floor(Math.random() * 4)));

        // restart the animation on a recycled node: cancelling is enough,
        // and avoids the classic reflow-hack
        for (const a of c.getAnimations()) a.cancel();
        c.classList.remove('pop');
        void c.offsetWidth;
        c.classList.add('pop');
      }
    };

    addEventListener('click', onClick, { passive: true });
    return () => {
      removeEventListener('click', onClick);
      for (const c of crumbs) c.remove();
    };
  }, []);

  return <div className="crumbs" ref={host} aria-hidden="true" />;
}
