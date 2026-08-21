import { event, stats } from '@/content/event';

export function Brief() {
  return (
    <section className="sec" id="brief">
      <img
        className="drift drift--torch"
        src="/assets/opt/lego-torch.webp"
        alt=""
        width={240}
        height={384}
        loading="lazy"
        decoding="async"
      />
      <img
        className="drift drift--rock"
        src="/assets/opt/lego-asteroid.webp"
        alt=""
        width={280}
        height={188}
        loading="lazy"
        decoding="async"
      />

      <div className="wrap">
        <p className="tag" data-reveal>
          01 — The brief
        </p>
        <div className="grid2">
          <h2 className="h2" data-reveal>
            The world broke. You get {event.durationHours} hours and a bin of bricks.
          </h2>
          <div className="prose">
            <p data-reveal>
              HackIEEE is the flagship hackathon of the <b>{event.organiser}</b>, run jointly by the
              Computer Society, the Intelligent Transportation Systems Society and the Signal
              Processing Society.
            </p>
            <p data-reveal>
              Four tracks, each a different kind of collapse. Pick one, build something that
              actually runs, and demo it on the main stage before the clock hits zero.
            </p>
          </div>
        </div>

        <div className="stats" data-reveal>
          {stats.map((s) => (
            <div key={s.label}>
              <b data-count={s.count} data-suffix={'suffix' in s ? s.suffix : undefined}>
                0
              </b>
              <em>{s.label}</em>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
