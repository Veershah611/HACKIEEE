# HackIEEE 2026 — Event Site

**LEGO × Doomsday.** Site for the hackathon run by the **IEEE Nirma University
Student Branch** — the **Computer Society (CS)**, **Intelligent Transportation
Systems Society (ITSS)** and **Signal Processing Society (SPS)** chapters.

Next.js 15 (App Router) + TypeScript, exported as a **fully static site**.
No server, no database — `npm run build` emits a plain folder of HTML/CSS/JS.

```bash
npm install
npm run dev
```

New here? Read **[CONTRIBUTING.md](CONTRIBUTING.md)** — it covers where things
live and the handful of gotchas that will bite you.

---

## Why it is structured this way

The site started as one 504-line `index.html`, one 578-line `style.css` and one
342-line `main.js`. That was well-built, but it did not survive more than one
person: every change landed in the same three files, and every string was welded
into markup so no non-developer could touch the copy.

The structure now separates the three things that different people change:

| You want to change | You edit | You need to know |
| --- | --- | --- |
| Copy, dates, prizes, tracks, FAQ | `content/*.ts` | Nothing. Typed data files. |
| How it looks | `styles/` | CSS |
| How it behaves | `components/`, `lib/` | React |

Three people can work on the same section at once and touch three different
files. That is the entire point of the reorganisation.

```
app/
  layout.tsx           # metadata, fonts, style imports, the .js gate
  page.tsx             # section order — the whole page composition
components/
  sections/            # one file per page section
  ui/                  # Figure, the Bugle web backdrop
  SiteEffects.tsx      # page-wide reveal/counter/anchor effects
content/               # <- all copy and data
lib/
  hooks/               # one file per behaviour
  media.ts             # reduced-motion / pointer probes
styles/
  tokens.css           # palette, type stack, spacing
  base.css             # reset, typography, buttons, reveal gating
  sections/            # one file per section, imported in page order
  responsive.css
public/assets/
  opt/*.webp           # optimised — what the page loads
  logos/
assets/*.png           # source renders — never shipped
tools/optimize-assets.py
```

---

## Payload — read this before adding dependencies

The original hand-written site shipped **~20 KB gzipped** of HTML+CSS+JS.
This one ships **~165 KB gzipped**. That difference is React and the Next
runtime, and it is the price of the structure above.

| | Original | Now |
| --- | --- | --- |
| HTML | 7.9 KB | 12.0 KB |
| CSS + JS | 12.0 KB | 152.5 KB |
| **Code total (gzip)** | **19.9 KB** | **164.6 KB** |

Images still dominate: 37 source renders totalling 51.3 MB compress to
**2.31 MB**, and the measured initial view on the original was **509 KB across
20 requests**. The new initial view is roughly **650 KB**.

That is a real regression on a metric this project cared about. It is
recoverable — see [Open questions](#open-questions) — but in the meantime:

- **Do not add a UI library, animation library or icon package.** The CSS
  already does all of it.
- Keep `"use client"` to the sections that genuinely need it. Right now that is
  Nav, Hero, Tracks, Timeline, Faq and Chapters. Brief, Decree, Bugle, Prizes,
  Cta, Tape and Footer are server components and ship no JS of their own.

### The image pipeline is unchanged and still required

`tools/optimize-assets.py` trims transparent margins, resizes to a per-role cap
and exports WebP q80. Re-run it after adding or replacing any render:

```bash
npm run assets
```

Originals in `assets/` are never touched; output goes to `public/assets/opt/`.
Use `npm run assets:report` to preview sizes without writing.

`next/image` is deliberately **not** used — it cannot crop transparent margins,
which is where most of the 95.5% saving comes from. Every `<img>` carries
explicit `width`/`height`, so there is no layout shift to solve either.

> **One easy win left:** `public/assets/logos/itss_nirma.png` is a 500x500 PNG
> at 103 KB — a fifth of the image payload for one small logo. Converting it to
> WebP would cut it to roughly 10 KB.

---

## Design system

### Palette — `styles/tokens.css`

| Token | Hex | Use |
| --- | --- | --- |
| `--void` | `#0A0A0F` | Page ground |
| `--ash` / `--ash-2` | `#14141C` / `#1C1C28` | Cards, panels |
| `--ember` | `#FF4E00` | Primary accent, nav brick, CTAs |
| `--lava` | `#FF8C00` | Glow, gradients |
| `--hazard` | `#FFD600` | Warning yellow, tape, numbers |
| `--radiation` | `#39FF14` | Cyber track accent |
| `--ink` | `#F0EDE8` | Body text |

The page ground is near-black with a **LEGO stud grid** (a 24px repeating
radial-gradient) plus three fixed ember/lava/radiation washes, so it reads as a
lit baseplate rather than flat black.

### Type

| Role | Font |
| --- | --- |
| Headings, hero, numbers | **Pixelify Sans** |
| Small uppercase labels | **Silkscreen** |
| Track names | **Bangers** |
| Doom's line | **Cinzel Decorative** |
| Newsprint accents | **Special Elite** |
| Body copy | **Archivo** |

Hero headings get a chunky plastic emboss via stacked `text-shadow` rather than
an image.

**Pixelify Sans has a broken `fl` ligature** and every pixel-set selector must
be listed in the ligature rule at the top of `styles/tokens.css`. See
[CONTRIBUTING.md](CONTRIBUTING.md).

---

## How the parallax works

Two systems, one hook — `lib/hooks/useParallax.ts`:

- **Hero diorama** (`content/hero.ts`) — nine transparent planes with a depth
  from 6 to 52. Deeper planes move further, so pointer movement produces real
  depth. Max shift is ~23px. Tracks the whole window.
- **Track cards** (`content/tracks.ts`) — each card is its own mini diorama with
  3-4 planes and a 1.4x multiplier, tracking only its own bounds.

Parallax writes to the **`translate`** property, not `transform`, so it composes
with the idle keyframes instead of fighting them. It is skipped entirely on
touch devices and under `prefers-reduced-motion`.

Adding a plane needs no code change — add an entry to the content file.

---

## Content states

Every element that animates in is hidden by CSS and revealed when script adds
`.in`. The gating rule is `.js [data-reveal]:not(.in){opacity:0}` and **both
halves are load-bearing** — see CONTRIBUTING for why.

The dock studs are generated from the dock width via a `ResizeObserver`, so the
count keeps the real LEGO gap-to-stud ratio (~0.67) at any size — 26 studs at
1280px, 8 at 375px.

---

## Placeholders to replace

Everything below lives in `content/` and is marked PLACEHOLDER in-file.

- **`content/event.ts`** — `siteUrl` (currently `hackieee.example.org`, used to
  resolve the og:image), `registerUrl` and `rulebookUrl` (both `#`),
  `registrationClosesLabel`, and the social links.
- **`content/schedule.ts`** — the registration-open (02 Nov) and shortlist
  (07 Dec) dates are invented. The rest are real: **21 Dec 2026 is a Monday**,
  so this runs Mon-Wed, not a weekend — the hero says "build sprint" for that
  reason — and the 36-hour window is exact (Mon 19:00 + 36h = Wed 07:00 freeze).
- **`content/prizes.ts`** — dummy figures totalling **Rs 1,75,000**. The pool
  headline is now computed from the tiers, so changing an amount can no longer
  desync the total.
- **`content/organisers.ts`** — partner slots. Also **CS and SPS logos**: drop
  `cs.png` and `sps.png` into `public/assets/logos/` and the lettermark
  placeholders disappear automatically.

---

## Open questions

**Payload.** If this stays a marketing site and never grows a registration flow
or an organiser dashboard, **Astro would be the better fit** — same component
structure and the same `content/` split, but it ships zero JS by default and
hydrates only the interactive islands, which would land close to the original
20 KB. Next was chosen to keep the door open for the app half. If that half is
never happening, the choice is worth revisiting.

**Fonts.** Still loaded from Google Fonts via `<link>` (176 KB, unchanged from
the original). `next/font` would self-host and remove the extra connection, but
it changes how the faces load and the Pixelify ligature workaround would need
re-verifying afterwards. Not done as part of this migration.

---

## Note on trademarks

A student-run event. **Not affiliated with, endorsed by or sponsored by the LEGO
Group or Marvel / The Walt Disney Company.** The footer disclaimer should stay.
