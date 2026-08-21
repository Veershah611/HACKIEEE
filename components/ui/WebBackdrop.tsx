/** Concentric web backdrop behind The Daily Build. Inherits colour from its parent. */
export function WebBackdrop() {
  return (
    <div className="bugle__web" aria-hidden="true">
      <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M300 0 V600 M0 300 H600 M88 88 L512 512 M512 88 L88 512" />
          <path d="M300 60 L455 145 L455 455 L300 540 L145 455 L145 145 Z" />
          <path d="M300 120 L405 175 L405 425 L300 480 L195 425 L195 175 Z" />
          <path d="M300 185 L358 212 L358 388 L300 415 L242 388 L242 212 Z" />
          <path d="M300 245 L330 262 L330 338 L300 355 L270 338 L270 262 Z" />
        </g>
      </svg>
    </div>
  );
}
