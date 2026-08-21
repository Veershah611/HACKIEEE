/**
 * Media-query probes. These must be read at runtime, never at module scope —
 * with static export the module also evaluates during prerender where
 * `matchMedia` does not exist.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** True only for real pointers. Parallax is skipped on touch. */
export const hasFinePointer = () =>
  typeof window !== 'undefined' && matchMedia('(hover: hover) and (pointer: fine)').matches;
