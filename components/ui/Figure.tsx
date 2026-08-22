import type { Figure as FigureData } from '@/content/figures';
import { asset } from '@/lib/asset';

/**
 * A character render. `className` carries the sizing and idle animation
 * (`fig--doom`, `fig--web`); the intrinsic width/height come from the content
 * file so the box is reserved before the image arrives.
 */
export function Figure({ figure, className }: { figure: FigureData; className: string }) {
  return (
    <img
      className={`fig ${className}`}
      src={asset(figure.src)}
      alt={figure.alt}
      width={figure.width}
      height={figure.height}
      loading="lazy"
      decoding="async"
    />
  );
}
