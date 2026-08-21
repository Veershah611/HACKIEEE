import { event } from '@/content/event';

export function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot__top">
          <div>
            <img src="/assets/logos/itss_nirma.png" alt="" width={46} height={46} loading="lazy" />
            <p>
              {event.name} is organised by the {event.organiser} — Computer Society, ITSS and SPS.
            </p>
          </div>
          <div className="foot__links">
            <a href={`mailto:${event.email}`}>{event.email}</a>
            {event.social.map((s) => (
              <a key={s.label} href={s.href}>
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="foot__bottom">
          <span>© 2026 {event.organiser}</span>
          <span>{event.location}</span>
        </div>
        {/* Trademark disclaimer — this line should stay. */}
        <p className="foot__note">
          A student-run event. Not affiliated with, endorsed by or sponsored by the LEGO Group or
          Marvel / The Walt Disney Company.
        </p>
      </div>
    </footer>
  );
}
