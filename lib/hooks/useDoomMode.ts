'use client';

import { useCallback, useEffect, useSyncExternalStore } from 'react';

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
const ATTR = 'data-doom';

/* ---------------------------------------------------------------------
   Shared store.

   Doom Mode has more than one consumer — the roster arms it when you pick a
   villain, and the footer toggle both sets and reflects it. If each caller
   kept its own useState they would drift apart: picking a villain would not
   light up the toggle.

   So the DOM attribute is the single source of truth and this is a tiny
   external store on top of it. Every consumer reads the same value and
   re-renders together.
   --------------------------------------------------------------------- */

const listeners = new Set<() => void>();

function isOn() {
  return globalThis.document?.documentElement.hasAttribute(ATTR) ?? false;
}

function emit() {
  for (const l of listeners) l();
}

function write(on: boolean) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (on) {
    root.setAttribute(ATTR, '');
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* private mode — the mode still works, it just will not persist */
    }
  } else {
    root.removeAttribute(ATTR);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }
  emit();
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Keyboard triggers are global, so they attach once for the whole page. */
let keysBound = false;
function bindKeys() {
  if (keysBound || typeof window === 'undefined') return;
  keysBound = true;

  let konami = 0;
  let typed = '';

  addEventListener('keydown', (e: KeyboardEvent) => {
    // never hijack typing in a field
    const el = e.target as HTMLElement | null;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(el?.tagName ?? '') || el?.isContentEditable) return;

    konami = e.key === KONAMI[konami] ? konami + 1 : e.key === KONAMI[0] ? 1 : 0;
    if (konami === KONAMI.length) {
      konami = 0;
      write(!isOn());
      return;
    }

    if (e.key.length === 1) {
      typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
      if (typed === WORD) {
        typed = '';
        write(!isOn());
      }
    }
  });
}

/**
 * Doom Mode — a palette takeover armed four ways:
 *
 *   1. the footer toggle,
 *   2. picking a villain from the roster,
 *   3. the Konami code,
 *   4. typing "doom".
 *
 * It flips `data-doom` on <html>, and every visual change is a token swap in
 * styles/tokens.css. No asset is fetched and nothing below re-renders except
 * the components that actually read this hook.
 */
export function useDoomMode() {
  const doom = useSyncExternalStore(
    subscribe,
    isOn,
    () => false, // server snapshot — the attribute only exists in the browser
  );

  useEffect(() => {
    bindKeys();
    // restore a previous choice
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1' && !isOn()) write(true);
    } catch {
      /* ignore */
    }
  }, []);

  return {
    doom,
    arm: useCallback(() => write(true), []),
    disarm: useCallback(() => write(false), []),
    toggle: useCallback(() => write(!isOn()), []),
  };
}
