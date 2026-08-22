'use client';

import { useRef } from 'react';
import { asset } from '@/lib/asset';
import { useHideNearFooter, useWalker } from '@/lib/hooks/useWalker';

/**
 * A hazmat scientist pacing the bottom edge of the page.
 *
 * Decorative only — `aria-hidden`, `pointer-events: none`, and skipped
 * entirely under reduced motion.
 */
export function Walker() {
  const wrap = useRef<HTMLDivElement>(null);
  const fig = useRef<HTMLImageElement>(null);

  useWalker(wrap, fig);
  useHideNearFooter(wrap);

  return (
    <div className="walker" ref={wrap} aria-hidden="true">
      <img
        className="walker__fig"
        ref={fig}
        src={asset('/assets/opt/hazmat-scientist.webp')}
        alt=""
        width={245}
        height={338}
        /* Not lazy: the walker is fixed and always in the viewport, and a
           lazy image never resolved for it — it stayed invisible forever.
           It is 14 KB, so eager at low priority keeps it off the hero's
           critical path without risking that. */
        loading="eager"
        fetchPriority="low"
        decoding="async"
      />
    </div>
  );
}
