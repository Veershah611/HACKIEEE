'use client';

import { type RefObject, useEffect, useState } from 'react';

export type ScrollProgress = {
  /** 0-1, how far along the rail is scrolled */
  ratio: number;
  /** 0-1, visible fraction of the rail — drives the thumb's width */
  visible: number;
  /** false when everything already fits and no indicator is warranted */
  scrollable: boolean;
};

/**
 * Drag-to-scroll for the horizontal timeline rail, plus vertical-wheel-to-
 * sideways translation, plus the scroll position the indicator renders from.
 *
 * The rail hides its native scrollbar (`scrollbar-width: none`) to keep the
 * LEGO road surface clean, which left no visual cue that it slides at all.
 * The returned progress drives an explicit indicator instead.
 *
 * The wheel handler only claims the event while the rail still has runway in
 * that direction, so reaching either end hands scrolling back to the page
 * instead of trapping it.
 */
export function useDragScroll(ref: RefObject<HTMLElement | null>): ScrollProgress {
  const [progress, setProgress] = useState<ScrollProgress>({
    ratio: 0,
    visible: 1,
    scrollable: false,
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let down = false;
    let startX = 0;
    let startLeft = 0;

    const report = () => {
      const max = el.scrollWidth - el.clientWidth;
      setProgress({
        ratio: max > 0 ? el.scrollLeft / max : 0,
        visible: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
        scrollable: max > 1,
      });
    };

    const onDown = (e: PointerEvent) => {
      down = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add('drag');
      el.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    };

    const onUp = (e: PointerEvent) => {
      down = false;
      el.classList.remove('drag');
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* pointer already released */
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      const max = el.scrollWidth - el.clientWidth;
      const next = el.scrollLeft + e.deltaY;
      if (next > 0 && next < max) {
        e.preventDefault();
        el.scrollLeft = next;
      }
    };

    el.addEventListener('pointerdown', onDown);
    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerup', onUp);
    el.addEventListener('pointercancel', onUp);
    el.addEventListener('wheel', onWheel, { passive: false });
    el.addEventListener('scroll', report, { passive: true });

    // Card widths are clamped against the viewport, so a resize changes how
    // much of the rail is visible and the thumb has to be re-measured.
    // The window listener backs up the observer: some environments do not
    // deliver resize records to a backgrounded document, and a stale thumb
    // width misreports how much of the rail is left.
    const ro = new ResizeObserver(report);
    ro.observe(el);
    addEventListener('resize', report, { passive: true });
    report();

    return () => {
      el.removeEventListener('pointerdown', onDown);
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerup', onUp);
      el.removeEventListener('pointercancel', onUp);
      el.removeEventListener('wheel', onWheel);
      el.removeEventListener('scroll', report);
      removeEventListener('resize', report);
      ro.disconnect();
    };
  }, [ref]);

  return progress;
}
