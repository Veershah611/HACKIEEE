'use client';

import { useRef } from 'react';
import { schedule } from '@/content/schedule';
import { useDragScroll } from '@/lib/hooks/useDragScroll';

export function Timeline() {
  const road = useRef<HTMLDivElement>(null);
  useDragScroll(road);

  return (
    <section className="sec sec--timeline" id="timeline">
      <div className="wrap">
        <p className="tag" data-reveal>
          04 — Build sequence
        </p>
        <h2 className="h2 h2--wide" data-reveal>
          Six checkpoints to the demo.
        </h2>
      </div>

      <div className="road" id="road" ref={road}>
        <div className="road__run">
          {schedule.map((s) => (
            <article className="stop" key={s.n} data-reveal>
              {s.art && (
                <img
                  src={s.art.src}
                  alt=""
                  width={s.art.width}
                  height={s.art.height}
                  loading="lazy"
                  decoding="async"
                />
              )}
              <span className="stop__n">{s.n}</span>
              <h3>{s.title}</h3>
              <time>{s.when}</time>
              <p>{s.detail}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="wrap">
        <p className="road__hint" aria-hidden="true">
          drag <b>{'//'}</b> scroll sideways
        </p>
      </div>
    </section>
  );
}
