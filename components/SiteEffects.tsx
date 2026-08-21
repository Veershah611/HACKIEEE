'use client';

import { useAnchorOffset } from '@/lib/hooks/useAnchorOffset';
import { useCounters } from '@/lib/hooks/useCounters';
import { useReveals, useStageIn } from '@/lib/hooks/useReveals';

/**
 * Page-wide interaction effects that observe the DOM rather than owning it.
 * Renders nothing. Section-local behaviour lives in its own component instead.
 */
export function SiteEffects() {
  useStageIn();
  useReveals();
  useCounters();
  useAnchorOffset();
  return null;
}
