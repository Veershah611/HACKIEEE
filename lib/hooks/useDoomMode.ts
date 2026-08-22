'use client';

import { useCallback, useEffect, useState } from 'react';

const KONAMI = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

const WORD = 'doom';
const STORAGE_KEY = 'hackieee:doom';

/**
 * Doom Mode — a palette takeover armed three ways:
 *
 *   1. the Konami code,
 *   2. typing "doom" anywhere,
 *   3. picking a villain from the roster.
 *
 * It flips `data-doom` on <html>, and every visual change is a token swap in
 * styles/tokens.css. Nothing re-renders and no asset is fetched, so the whole
 * feature costs one attribute write.
 *
 * The choice persists in localStorage — if someone found the easter egg, they
 * should not lose it on reload.
 */
export function useDoomMode() {
  const [doom, setDoom] = useState(false);

  // restore before the first paint the user can perceive
  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY) === '1') setDoom(true);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (doom) {
      root.setAttribute('data-doom', '');
      localStorage.setItem(STORAGE_KEY, '1');
    } else {
      root.removeAttribute('data-doom');
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [doom]);

  useEffect(() => {
    let konami = 0;
    let typed = '';

    const onKey = (e: KeyboardEvent) => {
      // never hijack typing in a field
      const el = e.target as HTMLElement | null;
      if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;

      konami = e.key === KONAMI[konami] ? konami + 1 : e.key === KONAMI[0] ? 1 : 0;
      if (konami === KONAMI.length) {
        konami = 0;
        setDoom((v) => !v);
        return;
      }

      if (e.key.length === 1) {
        typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
        if (typed === WORD) {
          typed = '';
          setDoom((v) => !v);
        }
      }
    };

    addEventListener('keydown', onKey);
    return () => removeEventListener('keydown', onKey);
  }, []);

  const arm = useCallback(() => setDoom(true), []);
  const disarm = useCallback(() => setDoom(false), []);

  return { doom, arm, disarm, toggle: () => setDoom((v) => !v) };
}
