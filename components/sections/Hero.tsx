'use client';

import { useRef } from 'react';
import { event } from '@/content/event';
import { heroPlanes } from '@/content/hero';
import { useCountdown } from '@/lib/hooks/useCountdown';
import { useParallax } from '@/lib/hooks/useParallax';

export function Hero() {
  const diorama = useRef<HTMLDivElement>(null);
  // The hero tracks the whole window, not just its own box, so the diorama
  // keeps responding as the pointer moves across the copy beside it.
  useParallax(diorama, { selector: '.pl', track: 'window' });

  const left = useCountdown(event.startsAt);

  return (
    <section className="hero">
      <div className="hero__glowfield" aria-hidden="true" />

      <div className="hero__copy">
        <p className="eyebrow" data-stage="1">
          IEEE Nirma University &nbsp;·&nbsp; CS &nbsp;·&nbsp; ITSS &nbsp;·&nbsp; SPS
        </p>
        <h1 className="hero__title" data-stage="2">
          <span className="hero__line">BUILD.</span>
          <span className="hero__line hero__line--break">BREAK.</span>
          <span className="hero__line hero__line--survive">SURVIVE.</span>
        </h1>
        <p className="hero__sub" data-stage="3">
          <b>{event.name}</b> — {event.durationHours} hours, four broken worlds, and however many
          bricks it takes to put one back together.
        </p>
        <div className="hero__cta" data-stage="4">
          <a className="btn btn--ember btn--lg" href="#register">
            Register your squad
          </a>
          <a className="btn btn--ghost btn--lg" href="#tracks">
            Pick a track
          </a>
        </div>
        <div className="countdown" id="countdown" data-stage="5">
          <div>
            <b>{left.d}</b>
            <em>days</em>
          </div>
          <div>
            <b>{left.h}</b>
            <em>hrs</em>
          </div>
          <div>
            <b>{left.m}</b>
            <em>min</em>
          </div>
          <div>
            <b>{left.s}</b>
            <em>sec</em>
          </div>
        </div>
      </div>

      {/*
        Eight transparent planes at depths 6–52. Deeper planes travel further,
        which is what reads as depth. Strictly 2D — no perspective anywhere.
      */}
      <div className="diorama" id="diorama" ref={diorama} aria-hidden="true">
        {heroPlanes.map((p, i) => (
          <img
            // two planes share flying-bricks.webp, so src alone is not a key
            key={`${p.key}-${i}`}
            className={`pl pl--${p.key}`}
            data-depth={p.depth}
            src={p.src}
            alt=""
            width={p.width}
            height={p.height}
            fetchPriority={p.priority ? 'high' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
