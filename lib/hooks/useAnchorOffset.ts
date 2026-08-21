'use client';

import { useEffect } from 'react';
import { prefersReducedMotion } from '@/lib/media';

/** Offset for the floating dock, so an anchored heading is not hidden under it. */
const DOCK_OFFSET = 78;

/**
 * Intercepts in-page anchor clicks and scrolls with the dock offset applied.
 * Delegated from document, so links rendered later need no registration.
 */
export function useAnchorOffset() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]');
      if (!a) return;

      const id = a.getAttribute('href');
      if (!id || id.length < 2) return;
      const t = document.querySelector<HTMLElement>(id);
      if (!t) return;

      e.preventDefault();
      scrollTo({
        top: t.getBoundingClientRect().top + scrollY - DOCK_OFFSET,
        behavior: prefersReducedMotion() ? 'auto' : 'smooth',
      });
    };

    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
}
