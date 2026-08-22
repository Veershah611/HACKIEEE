'use client';

import { useState } from 'react';
import { chapters, partners } from '@/content/organisers';
import { asset } from '@/lib/asset';

/**
 * A chapter logo that degrades to its lettermark if the file is missing.
 * cs.png and sps.png are still pending; dropping them into
 * public/assets/logos/ makes the placeholder disappear with no code change.
 */
function ChapterLogo({ src, alt, fallback }: { src: string; alt: string; fallback?: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`chip${failed ? ' empty' : ''}`} data-fallback={fallback}>
      <img
        src={asset(src)}
        alt={alt}
        width={74}
        height={74}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export function Chapters() {
  return (
    <section className="sec" id="chapters">
      <div className="wrap">
        <p className="tag" data-reveal>
          07 — Organisers
        </p>
        <h2 className="h2 h2--wide" data-reveal>
          Three chapters, one build floor.
        </h2>

        <div className="chapters">
          {chapters.map((c) => (
            <article key={c.name} data-reveal>
              <ChapterLogo
                src={c.logo}
                alt={c.alt}
                fallback={'fallback' in c ? c.fallback : undefined}
              />
              <h3>{c.name}</h3>
              <p>{c.blurb}</p>
            </article>
          ))}
        </div>

        <div className="partners" data-reveal>
          <p className="tag">Partners</p>
          <div className="partners__row">
            {partners.map((p) => (
              <span key={p}>{p}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
