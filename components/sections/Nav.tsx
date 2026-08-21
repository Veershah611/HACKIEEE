'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '@/content/event';
import { useDockStuds } from '@/lib/hooks/useDockStuds';
import { useScrollSpy, useStuck } from '@/lib/hooks/useScrollSpy';

const HREFS = nav.map((l) => l.href);

export function Nav() {
  const studs = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const stuck = useStuck();
  const active = useScrollSpy(HREFS);

  useDockStuds(studs);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    addEventListener('keydown', onKey);
    return () => {
      removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <header className={`dock${stuck ? ' stuck' : ''}`} id="nav">
        <span className="dock__studs" ref={studs} aria-hidden="true" />
        <div className="dock__body">
          <a className="brand" href="#top">
            <img src="/assets/logos/itss_nirma.png" alt="" width={34} height={34} />
            {/*
              Split on purpose: "IEEE" set in Pixelify reads as gibberish at nav
              size, so the wordmark pairs pixel "Hack" with spaced Silkscreen.
            */}
            <span className="brand__txt">
              <b>Hack</b>
              <i>IEEE</i>
            </span>
          </a>
          <nav className="dock__links" aria-label="Primary">
            {nav.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={active === l.href.slice(1) ? 'active' : undefined}
              >
                {l.label}
              </a>
            ))}
          </nav>
          {/* Scrolls to the on-page CTA section, which is where the real
              registration link lives — not straight out to it. */}
          <a className="dock__cta" href="#register">
            Register
          </a>
          <button
            type="button"
            className="burger"
            id="burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div id="drawer" className={`drawer${open ? ' open' : ''}`} aria-hidden={!open}>
        {nav.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
        {/* biome-ignore lint/a11y/useValidAnchor: real in-page navigation to
            #register; the handler only dismisses the drawer on the way. */}
        <a className="btn btn--ember" href="#register" onClick={() => setOpen(false)}>
          Register
        </a>
      </div>
    </>
  );
}
