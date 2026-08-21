import { WebBackdrop } from '@/components/ui/WebBackdrop';
import { WebSlingerFigure } from '@/components/ui/WebSlingerFigure';

export function Bugle() {
  return (
    <section className="sec sec--bugle" id="bugle">
      <WebBackdrop />
      <div className="wrap bugle">
        <div className="bugle__body">
          <p className="tag" data-reveal>
            05 — The Daily Build
          </p>
          <p className="bugle__masthead" data-reveal>
            The Daily Build
          </p>
          <p className="bugle__dek" data-reveal>
            Late edition · Ahmedabad · Campus bureau
          </p>
          <h2 className="bugle__h" data-reveal>
            Menace? No — mentors.
          </h2>
          <p className="bugle__lead" data-reveal>
            Reports of masked figures swinging between tables at 3 a.m. have been confirmed. They
            are our mentors, and they are here to help.
          </p>
          <div className="bugle__cols">
            <p data-reveal>
              Mentor rounds run every four hours across all four tracks — systems, security, signals
              and product. If you are stuck, put the little flag up on your table and someone will
              drop in.
            </p>
            <p data-reveal>
              Pre-event workshops cover the basics for each track, the hardware shelf is open all
              weekend, and the floor never actually closes. With great uptime comes great
              responsibility.
            </p>
          </div>
        </div>
        <div className="bugle__fig" data-reveal>
          <WebSlingerFigure />
        </div>
      </div>
    </section>
  );
}
