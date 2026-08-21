'use client';

import { useRef } from 'react';
import { schedule } from '@/content/schedule';
import { useDragScroll } from '@/lib/hooks/useDragScroll';

export function Timeline() {
  const road = useRef<HTMLDivElement>(null);
  const { ratio, visible, scrollable } = useDragScroll(road);

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

      {/*
        The rail hides its native scrollbar to keep the road surface clean,
        which left no cue that it slides. This is that cue: a brick-style track
        with a thumb sized to the visible fraction. Hidden entirely when
        everything already fits, so it never lies about being scrollable.
      */}
      <div className="wrap road__foot">
        {scrollable && (
          <div className="railbar" aria-hidden="true">
            <span
              className="railbar__thumb"
              style={{
                width: `${visible * 100}%`,
                // travel across the leftover track, not the whole width
                left: `${ratio * (1 - visible) * 100}%`,
              }}
            />
          </div>
        )}
        <p className="road__hint">
          drag <b>{'//'}</b> scroll sideways
        </p>
      </div>
    </section>
  );
}
