'use client';

import { useState } from 'react';
import { faq } from '@/content/faq';

/**
 * Accordion, one open at a time. State lives here rather than in a `toggle`
 * listener on each <details>, so closing a sibling can never re-enter the
 * handler and fight itself.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="sec" id="faq">
      <div className="wrap">
        <p className="tag" data-reveal>
          08 — FAQ
        </p>
        <h2 className="h2 h2--wide" data-reveal>
          The manual.
        </h2>
        <div className="faq" id="faqList">
          {faq.map((item, i) => (
            <details
              key={item.q}
              data-reveal
              open={open === i}
              onToggle={(e) => {
                const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                setOpen(isOpen ? i : (cur) => (cur === i ? null : cur));
              }}
            >
              <summary>
                {item.q}
                <i />
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
