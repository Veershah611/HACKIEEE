'use client';

import { useEffect, useRef, useState } from 'react';
import { nav } from '@/content/event';
import { asset } from '@/lib/asset';
import { useDockStuds } from '@/lib/hooks/useDockStuds';
import { useScrollSpy, useStuck } from '@/lib/hooks/useScrollSpy';

const HREFS = nav.map((l) => l.href);

export function Nav() {
  const studs = useRef<HTMLSpanElement>(null);
  const [open, setOpen] = useState(false);
  const stuck = useStuck();
  const active = useScrollSpy(HREFS);

  /*
    The entrance reveal has to be React state, not a classList.add from a hook.
    This header's className is a template that changes when `stuck` flips, and
    React rewrites className whenever the rendered value changes — which
    silently destroyed an imperatively added `.in`. The dock then matched
    `.js .dock:not(.in){opacity:0}` and went invisible on first scroll, while
    staying in the layout and still catching clicks.
  */
  const [revealed, setRevealed] = useState(false);
  useEffect(() => setRevealed(true), []);

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
      <header className={`dock${revealed ? ' in' : ''}${stuck ? ' stuck' : ''}`} id="nav">
        <span className="dock__studs" ref={studs} aria-hidden="true" />
        <div className="dock__body">
          <a className="brand" href="#top">
            <img src={asset('/assets/logos/itss_nirma.png')} alt="" width={34} height={34} />
            {/*
              One wordmark, one face. Ligatures are disabled for .brand__txt in
              tokens.css, which is what made "IEEE" legible in the pixel face.
            */}
            <span className="brand__txt">
              Hack<i>IEEE</i>
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
