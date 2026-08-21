# Contributing

## Setup

```bash
npm install
npm run dev
```

Node 20.9+ (see `.nvmrc`). That's the whole setup — no global tools to install.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on :5173 with hot reload |
| `npm run build` | Static export into `out/` |
| `npm run lint` | Biome — formatting **and** lint, one command |
| `npm run format` | Biome, but fixes what it can |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run assets` | Re-run the image pipeline after adding renders |

CI runs `lint`, `typecheck` and `build` on every PR. All three must pass.

---

## Where things live

```
content/       ← copy, dates, prizes, tracks, FAQ. Typed data, no markup.
components/
  sections/    ← one file per page section
  ui/          ← shared pieces and the inline SVG figures
lib/hooks/     ← one file per interaction behaviour
styles/
  tokens.css   ← palette, type stack, spacing. Change colours HERE.
  base.css     ← reset, typography, buttons, reveal gating
  sections/    ← one file per section, matching components/sections/
public/assets/ ← what actually ships
assets/*.png   ← source renders, never shipped
```

**The rule that keeps us out of each other's way:** copy changes go in
`content/`, look changes go in `styles/`, behaviour changes go in
`components/` or `lib/`. Three people can work on the same section
simultaneously and touch three different files.

---

## Common tasks

**Change a date, prize, track blurb or FAQ answer** — edit the matching file in
`content/`. No component knowledge needed. The prize pool headline is computed
from the tiers, so changing an amount updates the total automatically.

**Add a track** — append to `content/tracks.ts`. The card renders itself.

**Add a plane to the hero diorama** — append to `content/hero.ts` and add a
`.pl--<key>` rule in `styles/sections/hero.css` positioning it. No JS change:
parallax reads `data-depth` off the DOM.

**Add or replace a render** — drop the PNG in `assets/`, run `npm run assets`,
then reference `/assets/opt/<kebab-name>.webp`. Never reference `assets/*.png`
directly; those are 48 MB of source that must not ship.

**Replace a character figure with a render** — Doom and the web-slinger are
hand-drawn flat SVG, which reads as a different medium from the photoreal LEGO
renders. Swapping in a render is a one-line change in `content/figures.ts`:

1. Drop the transparent PNG in `assets/`, run `npm run assets`.
2. Uncomment and set `image` (plus `width`/`height` from the optimiser output).

`components/ui/Figure.tsx` renders the image when `image` is set and falls back
to the vector otherwise, so no section component changes.

**Add a new character** — same as above: add an entry to `content/figures.ts`,
render it with `<Figure>`, and give it a `.fig--<name>` sizing rule.

---

## Things that will bite you

**Pixelify Sans has a broken `fl` ligature.** It renders `fl` as one blank-ish
glyph, so "floor" came out as "Aoor". Every pixel-set selector is listed in a
`font-variant-ligatures:none` rule at the top of `styles/tokens.css`. **If you
add a new heading in the pixel face, add its selector to that rule** — otherwise
any word containing `fl`, `fi` or `ffi` may break.

The wordmark is split for the same reason: "IEEE" in Pixelify reads as gibberish
at nav size, so it's `Hack` in pixel plus `IEEE` in spaced Silkscreen.

**Never write a bare hide rule for reveals.** The pattern is
`.js [data-reveal]:not(.in){opacity:0}`. Both halves matter:

- `:not(.in)` — a plain hide rule can outrank the reveal rule on specificity and
  strand an element invisible forever. `:not(.in)` simply stops matching.
- `.js` — added by an inline script in `<head>`. If the bundle fails to load,
  no hide rule matches and the page renders fully visible instead of blank.

**Parallax writes to `translate`, not `transform`.** The planes already use
`transform` for their idle keyframes (sway, bob, tumble). These are separate CSS
properties that compose. If you switch parallax to `transform`, the idle
animations will fight it and the planes will jitter.

For the same reason, **do not centre a plane with `left:50%; transform:translateX(-50%)`.**
Use `left: (100 - width) / 2` so `transform` stays free.

**No CSS 3D anywhere.** No `perspective`, no `preserve-3d`. Depth is faked with
stacked 2D planes because that is dramatically cheaper on low-end phones, which
is most of our audience. Please keep it that way.

**Section CSS is global, not CSS Modules.** `styles/sections/*.css` are imported
in page order in `app/layout.tsx` and the cascade depends on that order. If you
add a section stylesheet, insert the import in the right position.

**Watch specificity when adding element selectors.** A blanket
`.decree__art img` rule (0,1,1) silently outranked `.decree__bomb` (0,1,0) and
sized the bomb at 80% of its box instead of 36%, burying the figure next to it
for months. Prefer a class on the element over a descendant element selector.

**Breakpoints are 900 / 640 / 420.** 900 drops to single column and swaps the
nav for the drawer; 640 is the phone pass; 420 is small phones. Test at 375px —
that is where the type scale is tightest. Section headings must stay larger
than the card titles and figures they introduce.

---

## Two lint rules are off on purpose

- `performance/noImgElement` — we use `<img>`, not `next/image`, because
  `tools/optimize-assets.py` already trims transparent margins (which
  `next/image` cannot do) and exports WebP q80. Every `<img>` carries explicit
  `width`/`height`, so there is no layout shift left to solve.
- `correctness/useUniqueElementIds` — section ids are the nav's anchor targets,
  and SVG gradient ids are referenced by `url(#id)` inside the same
  single-instance figure. `useId()` would break both.

---

## Conventions

Branches: `feat/…`, `fix/…`, `content/…`, `chore/…`.
Commits: conventional-ish (`feat:`, `fix:`, `content:`, `chore:`).
Open a PR against `main`; don't push to `main` directly.
