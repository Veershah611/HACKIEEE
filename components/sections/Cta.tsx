import { event } from '@/content/event';

export function Cta() {
  return (
    <section className="cta" id="register">
      <img
        className="drift drift--laptop"
        src="/assets/opt/lego-laptop.webp"
        alt=""
        width={300}
        height={284}
        loading="lazy"
        decoding="async"
      />
      <div className="wrap cta__inner">
        <p className="tag" data-reveal>
          Final call
        </p>
        <h2 className="cta__h" data-reveal>
          Snap it together.
        </h2>
        <p className="sub" data-reveal>
          Registration closes <b>{event.registrationClosesLabel}</b>.
        </p>
        <div className="cta__btns" data-reveal>
          <a className="btn btn--ember btn--lg" href={event.registerUrl}>
            Register your squad
          </a>
          <a className="btn btn--ghost btn--lg" href={event.rulebookUrl}>
            Download rulebook
          </a>
        </div>
      </div>
    </section>
  );
}
