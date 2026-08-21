'use client';

import { useRef } from 'react';
import { type Track, tracks } from '@/content/tracks';
import { useParallax } from '@/lib/hooks/useParallax';

/**
 * One track card — its own mini diorama. Cards track only their own bounds
 * (unlike the hero, which follows the window) and run a 1.4× depth multiplier
 * so the effect still reads at card size.
 */
function TrackCard({ track }: { track: Track }) {
  const card = useRef<HTMLElement>(null);
  useParallax(card, { selector: '.tl', scale: 1.4, track: 'self' });

  return (
    <article
      className="track"
      ref={card}
      data-reveal
      style={{ '--c': track.accent } as React.CSSProperties}
    >
      <div className="track__stage">
        {track.layers.map((l) => (
          <img
            key={l.src}
            className={`tl${l.variant ? ` tl--${l.variant}` : ''}`}
            data-depth={l.depth}
            src={l.src}
            alt=""
            width={l.width}
            height={l.height}
            loading="lazy"
            decoding="async"
          />
        ))}
        {track.scan && <span className="track__scan" aria-hidden="true" />}
      </div>
      <div className="track__info">
        <p className="track__n">{track.n}</p>
        <p className="track__hero">{track.hero}</p>
        <h3>{track.title}</h3>
        <p>{track.blurb}</p>
        <span className="track__tag">{track.tag}</span>
      </div>
    </article>
  );
}

export function Tracks() {
  return (
    <section className="sec" id="tracks">
      <div className="wrap">
        <p className="tag" data-reveal>
          03 — Tracks
        </p>
        <h2 className="h2 h2--wide" data-reveal>
          Four collapses. Pick one.
        </h2>
        <p className="sub" data-reveal>
          Your track is locked at check-in and your whole build snaps onto it.
        </p>
      </div>

      <div className="wrap tracks">
        {tracks.map((t) => (
          <TrackCard key={t.n} track={t} />
        ))}
      </div>
    </section>
  );
}
