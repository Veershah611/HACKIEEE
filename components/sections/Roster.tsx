'use client';

import { useEffect, useRef, useState } from 'react';
import { event } from '@/content/event';
import { type Fighter, roster, rosterCopy } from '@/content/roster';
import { asset } from '@/lib/asset';
import { useDoomMode } from '@/lib/hooks/useDoomMode';
import { renderSquadCard } from '@/lib/squadCard';

/**
 * "Pick your builder" — the Classic Space character picker, adapted.
 *
 * Selecting a villain arms Doom Mode, which is why this section owns the hook.
 * The card is drawn on demand rather than up front: nothing is rendered until
 * someone actually asks for it.
 */
export function Roster() {
  const [picked, setPicked] = useState<Fighter | null>(null);
  const [cardUrl, setCardUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const { arm, disarm } = useDoomMode();

  // a blob URL per card would leak; keep only the current one alive
  const lastUrl = useRef<string | null>(null);
  useEffect(() => {
    if (lastUrl.current && lastUrl.current !== cardUrl) URL.revokeObjectURL(lastUrl.current);
    lastUrl.current = cardUrl;
  }, [cardUrl]);
  useEffect(
    () => () => {
      if (lastUrl.current) URL.revokeObjectURL(lastUrl.current);
    },
    [],
  );

  function choose(f: Fighter) {
    setPicked(f);
    setCardUrl(null);
    if (f.side === 'villain') arm();
    else disarm();
  }

  async function makeCard() {
    if (!picked || busy) return;
    setBusy(true);
    try {
      setCardUrl(await renderSquadCard(picked, event.datesLabel));
    } catch {
      setCardUrl(null);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="sec sec--roster" id="roster">
      <div className="wrap">
        <p className="tag" data-reveal>
          {rosterCopy.tag}
        </p>
        <h2 className="h2 h2--wide" data-reveal>
          {rosterCopy.heading}
        </h2>
        <p className="sub" data-reveal>
          {rosterCopy.sub}
        </p>

        <div className="roster" data-reveal>
          {roster.map((f) => (
            <button
              type="button"
              key={f.id}
              className={`fighter${picked?.id === f.id ? ' picked' : ''}${
                f.side === 'villain' ? ' villain' : ''
              }`}
              onClick={() => choose(f)}
              aria-pressed={picked?.id === f.id}
            >
              <span className="fighter__art">
                <img
                  src={asset(f.src)}
                  alt={f.alt}
                  width={f.width}
                  height={f.height}
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <span className="fighter__name">{f.name}</span>
              {f.track && <span className="fighter__track">{f.track}</span>}
            </button>
          ))}
        </div>

        {picked && (
          <div className="pickout" data-reveal>
            <p className="pickout__line">
              {picked.side === 'villain' ? rosterCopy.villainWarning : picked.line}
            </p>
            <div className="pickout__actions">
              <button type="button" className="btn btn--ember" onClick={makeCard} disabled={busy}>
                {busy ? 'Building…' : 'Build my card'}
              </button>
              {cardUrl && (
                <a className="btn btn--ghost" href={cardUrl} download={`hackieee-${picked.id}.png`}>
                  Download PNG
                </a>
              )}
            </div>
            {cardUrl && <img className="pickout__card" src={cardUrl} alt={`${picked.name} card`} />}
          </div>
        )}
      </div>
    </section>
  );
}
