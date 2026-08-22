'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { type Track, tracks } from '@/content/tracks';
import { asset } from '@/lib/asset';
import { useParallax } from '@/lib/hooks/useParallax';

/**
 * Unit direction vectors for the detonate burst, one per layer index.
 * Fixed rather than random so the burst reads the same every time — a card
 * that scatters differently on each click feels broken rather than physical.
 */
const BURST: readonly (readonly [number, number])[] = [
  [-1, -0.3],
  [1, -0.55],
  [-0.75, 0.55],
  [0.9, 0.4],
];

/**
 * One track card — its own mini diorama. Cards track only their own bounds
 * (unlike the hero, which follows the window) and run a 1.4× depth multiplier
 * so the effect still reads at card size.
 *
 * Clicking the stage detonates it: the planes burst outward and spring back.
 * The stage is a real <button> so this is reachable by keyboard, not just a
 * click handler bolted onto a decorative element.
 */
function TrackCard({ track }: { track: Track }) {
  const card = useRef<HTMLElement>(null);
  const [boom, setBoom] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useParallax(card, { selector: '.tl', scale: 1.4, track: 'self' });

  /*
    animationend clears the burst, but it cannot be the only thing that does.
    Under prefers-reduced-motion the keyframes are `animation: none`, so the
    event never fires at all — and a backgrounded tab can swallow it too. Left
    to that alone the card stays stuck in `detonating` and can never fire
    again. This timeout is the floor; whichever lands first wins, and both are
    idempotent.
  */
  const fire = useCallback(() => {
    setBoom(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBoom(false), 700);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <article
      className={`track${boom ? ' detonating' : ''}`}
      ref={card}
      data-reveal
      style={{ '--c': track.accent } as React.CSSProperties}
    >
      <button
        type="button"
        className="track__stage"
        aria-label={`Detonate the ${track.title} diorama`}
        onClick={fire}
        /*
          Only the layer animation clears the state. animationend bubbles, and
          the stage flash on ::after runs for the same 620ms — letting either
          one reset the class means whichever finishes a tick earlier cuts the
          other short and the planes snap back mid-flight.
        */
        onAnimationEnd={(e) => {
          if (e.animationName === 'detonate') {
            clearTimeout(timer.current);
            setBoom(false);
          }
        }}
      >
        {track.layers.map((l, i) => (
          <img
            key={l.src}
            className={`tl${l.variant ? ` tl--${l.variant}` : ''}`}
            data-depth={l.depth}
            style={
              {
                // mirrored for CSS: the burst throws each plane by its own depth
                '--d': l.depth,
                '--bx': BURST[i % BURST.length]?.[0] ?? 0,
                '--by': BURST[i % BURST.length]?.[1] ?? 0,
              } as React.CSSProperties
            }
            src={asset(l.src)}
            alt=""
            width={l.width}
            height={l.height}
            loading="lazy"
            decoding="async"
          />
        ))}
        {track.scan && <span className="track__scan" aria-hidden="true" />}
      </button>
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
