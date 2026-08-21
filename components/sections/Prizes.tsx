import { inr, prizePool, prizes } from '@/content/prizes';

export function Prizes() {
  return (
    <section className="sec" id="prizes">
      <img
        className="drift drift--rocket"
        src="/assets/opt/lego-rocket.webp"
        alt=""
        width={240}
        height={414}
        loading="lazy"
        decoding="async"
      />
      <div className="wrap">
        <p className="tag" data-reveal>
          06 — Salvage
        </p>
        {/* Derived from content/prizes.ts — editing a tier updates this total. */}
        <h2 className="h2 h2--wide" data-reveal>
          {inr(prizePool)} pool.
        </h2>
        <p className="sub" data-reveal>
          Plus internship shortlists, cloud credits and hardware kits from our partners.
        </p>

        <div className="prizes">
          {prizes.map((p) => (
            <article key={p.label} data-reveal>
              <em>{p.label}</em>
              <b>{inr(p.amount)}</b>
              <p>{p.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
