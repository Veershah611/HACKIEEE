'use client';

import { type RefObject, useEffect } from 'react';

/**
 * Fills the nav brick with studs, count derived from width so the
 * gap-to-stud ratio stays near LEGO's real 0.67 at any size — a fixed count
 * leaves 90px gaps on desktop. 26 studs at 1280px, 8 at 375px.
 *
 * A plain init call can run before the dock has been laid out, and then the
 * zero-width guard would leave the brick permanently bald. Observing the row
 * means it fills itself the moment it has a real width, with no polling.
 */
export function useDockStuds(ref: RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    const row = ref.current;
    if (!row) return;

    const fill = () => {
      const w = row.getBoundingClientRect().width;
      if (!w) return; // not laid out yet — the observer will call back
      const pitch = innerWidth < 560 ? 36 : 43;
      const n = Math.max(4, Math.round(w / pitch));
      if (Number(row.dataset.n) === n) return;
      row.dataset.n = String(n);
      row.textContent = '';
      const frag = document.createDocumentFragment();
      for (let i = 0; i < n; i++) frag.appendChild(document.createElement('i'));
      row.appendChild(frag);
    };

    const ro = new ResizeObserver(fill);
    ro.observe(row);
    fill();
    return () => ro.disconnect();
  }, [ref]);
}
