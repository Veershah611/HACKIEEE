'use client';

import { useDoomMode } from '@/lib/hooks/useDoomMode';

/**
 * The visible way into Doom Mode.
 *
 * A client island inside the otherwise-static footer, so the footer itself
 * stays a server component. State comes from the shared store in
 * useDoomMode, which means this stays in sync with the roster — arming Doom
 * Mode by picking a villain lights this up too.
 */
export function DoomToggle() {
  const { doom, toggle } = useDoomMode();

  return (
    <button
      type="button"
      className={`doomtoggle${doom ? ' on' : ''}`}
      onClick={toggle}
      aria-pressed={doom}
      title={doom ? 'Restore the normal palette' : 'Let Doom take over'}
    >
      <span className="doomtoggle__mask" aria-hidden="true">
        {/* an iron mask, drawn rather than fetched */}
        <svg viewBox="0 0 24 28" fill="none" aria-hidden="true" focusable="false">
          <path
            d="M12 1c5 0 8 3 8 8v9c0 5-3 9-8 9s-8-4-8-9V9c0-5 3-8 8-8Z"
            fill="currentColor"
            opacity=".22"
          />
          <path
            d="M12 1c5 0 8 3 8 8v9c0 5-3 9-8 9s-8-4-8-9V9c0-5 3-8 8-8Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <rect x="7" y="10" width="4" height="2.6" rx="1" fill="currentColor" />
          <rect x="13" y="10" width="4" height="2.6" rx="1" fill="currentColor" />
          <path d="M8.5 19h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M10 19v2.4M12 19v2.4M14 19v2.4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </span>
      <span className="doomtoggle__label">{doom ? 'Doom reigns' : 'Doom mode'}</span>
    </button>
  );
}
