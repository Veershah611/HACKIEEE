import type { ReactNode } from 'react';
import type { Figure as FigureData } from '@/content/figures';

/**
 * Renders a character as a render if `content/figures.ts` supplies one, and
 * falls back to the vector otherwise. Keeping the choice here means swapping
 * a figure never touches a section component.
 *
 * `className` carries the sizing/animation rule (`fig--doom`, `fig--web`), so
 * both branches land in the same box.
 */
export function Figure({
  figure,
  className,
  fallback,
}: {
  figure: FigureData;
  className: string;
  fallback: ReactNode;
}) {
  if (!figure.image) return <>{fallback}</>;

  return (
    <img
      className={`fig ${className}`}
      src={figure.image}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
      loading="lazy"
      decoding="async"
    />
  );
}
