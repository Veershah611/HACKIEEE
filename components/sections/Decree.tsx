import { DoomFigure } from '@/components/ui/DoomFigure';
import { Figure } from '@/components/ui/Figure';
import { figures } from '@/content/figures';

const EDICTS = [
  ['I', 'The brief stays sealed until the opening ceremony.'],
  ['II', 'One track per team. Choose it and live with it.'],
  ['III', 'A demo that does not run is a demo that does not count.'],
  ['IV', 'Doom does not accept excuses. Neither do the judges.'],
] as const;

export function Decree() {
  return (
    <section className="sec sec--decree" id="decree">
      <div className="wrap decree">
        <div className="decree__art" data-reveal>
          <Figure figure={figures.doom} className="fig--doom" fallback={<DoomFigure />} />
          <img
            className="decree__bomb"
            src="/assets/opt/lego-bomb.webp"
            alt=""
            width={420}
            height={375}
            loading="lazy"
            decoding="async"
          />
          <span className="decree__fuse" aria-hidden="true" />
        </div>
        <div className="decree__body">
          <p className="tag" data-reveal>
            02 — The decree
          </p>
          <h2 className="h2" data-reveal>
            The problems are not suggestions.
          </h2>
          <blockquote className="quote" data-reveal>
            Hell answers to me… for <b>I. AM. DOOM.</b>
          </blockquote>
          <p className="prose-p" data-reveal>
            Problem statements drop at kickoff and not one minute earlier. They are deliberately
            harder than you want them to be — that is the point.
          </p>
          <ol className="edicts">
            {EDICTS.map(([numeral, text]) => (
              <li key={numeral} data-reveal>
                <em>{numeral}</em>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
