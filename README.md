# HackIEEE 2026 — Event Site

Landing page for **HackIEEE 2026**, the hackathon run by the **IEEE Nirma University Student Branch** — the **Computer Society (CS)**, **Intelligent Transportation Systems Society (ITSS)** and **Signal Processing Society (SPS)** chapters.

Static site. No build step, no dependencies, no framework.

---

## Dates and prizes — both are placeholder values

**Dates run 21–23 December 2026.** Worth knowing: **21 Dec 2026 is a Monday**, so the event falls Monday–Wednesday, not on a weekend. The hero copy was reworded from "build weekend" to "build sprint" to match. The 36-hour window works out exactly — Mon 21 Dec 19:00 + 36h = Wed 23 Dec 07:00, which is the judging freeze.

| Step | Date |
| --- | --- |
| Registration opens | Mon 02 Nov 2026 |
| Shortlist announced | Mon 07 Dec 2026 |
| Check-in and kickoff | Mon 21 Dec, 16:00 |
| Build window opens | Mon 21 Dec, 19:00 |
| Freeze and judging | Wed 23 Dec, 07:00 |
| Demo and awards | Wed 23 Dec, 15:00 |

The registration-open and shortlist dates are invented — pick your own.

**Prize amounts are dummy figures that add up exactly:**

| Award | Amount |
| --- | --- |
| Winner | ₹75,000 |
| Runner-up | ₹40,000 |
| Third | ₹20,000 |
| Best in track × 4 | ₹10,000 each |
| **Pool** | **₹1,75,000** |

75,000 + 40,000 + 20,000 + (4 × 10,000) = 1,75,000. If you change any tier, update the pool headline so the arithmetic still holds.

Everything above is tagged for quick editing:

```bash
grep -n 'data-field' index.html
```

---

## Running it

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>. Opening `index.html` over `file://` will not work — the CSS and JS won't load.

---

## Design

| Source | What was taken |
| --- | --- |
| [LEGO Classic Space](https://legospace.tilda.ws/classicspace) | The slow assembly opening, brick geometry, motion vocabulary |
| Marvel-flavoured sections | A villain-side brief and a hero-side newsroom, with original artwork |

### Palette — LEGO Marvel characters

The **only** hues used site-wide, taken from the character list you gave:

| Character | LEGO colours | Where it appears |
| --- | --- | --- |
| **Iron Man** | Bright Red `#C91A09`, Bright Yellow `#F2CD37`, Metallic Gold `#DBAC34` | Fintech track, buttons, section tags |
| **Captain America** | Bright Blue `#0055BF`, White `#F2F3F2`, Bright Red | Cyber Security track, body text |
| **The Hulk** | Bright Green `#4B9F4A`, Bright Purple `#6C2C9C`, Dark Blue `#0A3463` | Sustainability track, The Decree, page ground |
| **Spider-Man** | Bright Red, Bright Blue | The Daily Build figure |
| **Wolverine** | Bright Yellow, Bright Blue, Bright Red | Healthcare track |

Two working notes:

- **Each base has a lighter tint** (`--red-lt`, `--blue-lt`, `--green-lt`). The saturated originals are too dark to read as text on a dark ground — Bright Blue only reaches 2.54:1 and Bright Red 3.02:1, both below the 4.5:1 accessibility minimum. So **bases fill shapes, tints carry type**. Every piece of text on the site now passes WCAG AA.
- **The background was flat, so it has been rebuilt.** It is now Dark Blue with four character-coloured washes (red, blue, green, purple), a faint stud grid, and a vertical gradient — fixed-attachment, so the lighting stays put while content scrolls. It reads as a lit baseplate rather than flat navy.

### Track ↔ character mapping

| Track | Character | Why |
| --- | --- | --- |
| Sustainability | **The Hulk** | Bright green, and *"smash the problem, not the planet"* |
| Cyber Security | **Captain America** | The shield — defence, holding the line |
| Fintech | **Iron Man** | Stark Industries; build the suit, fund the workshop |
| Healthcare | **Wolverine** | The healing factor |

Spider-Man carries The Daily Build section instead, so all five characters appear.

---

## Fonts

Main headings use a **pixel face**, and the small uppercase labels use a bitmap face built for small sizes. JetBrains Mono has been **removed entirely** from the project.

| Role | Font | Where |
| --- | --- | --- |
| **Every main heading** | **Pixelify Sans** | Hero title, all section headings, stat numbers, prize amounts, Decree heading, Daily Build masthead, final CTA |
| **All small labels** | **Silkscreen** | Section tags, eyebrow, hero meta, schedule times, prize labels, partners, footer, intro counter |
| Track character names | Bangers | The Hulk / Captain America / Iron Man / Wolverine |
| Doom's line | Cinzel Decorative | The pull-quote only |
| Newsprint body | Special Elite | Daily Build dek and lead paragraph |
| Body copy | Archivo | Paragraphs — kept readable at length |

Two notes on making pixel type work:

- **Silkscreen, not scaled Pixelify, for the small stuff.** Silkscreen is a bitmap face designed for ~10px; a pixel font scaled down blurs.
- **Sizes came down and negative tracking was removed.** Pixel glyphs are wider than the Archivo they replaced, so headings dropped from 52px to 40px (hero from 104px to 78px) and every `letter-spacing:-0.025em` went to `0`. Without that, headings overflowed on mobile.

Everything still passes WCAG AA contrast, and there is no horizontal overflow at 1280px or 375px.

### About FontSpace

You originally asked for fonts from **fontspace.com/category/marvel**. I did not use them:

1. **The site is behind bot verification**, which I won't work around.
2. **That category is fan-made recreations of trademarked logos**, almost all licensed **Personal Use Only**. A public university event page is not personal use, and they are unauthorised derivatives of Marvel trademarks on top of that.

All faces used here are SIL OFL. **If you license a font you want instead**, it is a one-line swap — the faces are behind CSS variables at the top of `css/style.css`:

```css
--f-pixel:'Pixelify Sans',system-ui,sans-serif;   /* ← change this */
```

Add an `@font-face` for your file and repoint the variable. Nothing else changes.

---

## Character artwork

The two minifigures — the armoured monarch in **The Decree** and the web-slinger in **The Daily Build** — are **original inline SVG that I drew for this site**. They are not downloaded, traced or derived from any LEGO or Marvel asset.

Both were redrawn to proper minifigure proportions: an oversized rounded-square head with a stud on top, a short neck, a trapezoid torso that widens at the waist, angled arms ending in real **C-clip hands** (stroked arcs, not rounded rectangles), a hip block, and two split legs with foot lines. The web-slinger's suit mesh is an SVG `<pattern>` reused across head and chest, with large white outlined eyes; the monarch has a gold riveted faceplate with eye slits and a mouth grille, under a green hood that casts a shadow on his forehead.

I did not fetch real LEGO Marvel character images, because those are copyrighted by both the LEGO Group and Marvel/Disney and can't be redistributed on a public site.

The Marvel references are therefore **thematic** — a masked head of state issuing impossible briefs, a newspaper insisting the masked figures are menaces. That carries the theme without shipping anyone's IP. The footer disclaimer should stay.

They live inline in `index.html` (search for `decree__fig` and `bugle__fig`) so they inherit theme colours and cost no extra requests.

---

## The nav dock

The top nav is a floating LEGO brick: a rounded slab with a lit top edge and an inset lip along the bottom, with studs poking up from behind it. It seats itself 6px tighter to the top once you scroll.

The stud count is **computed from the dock's width**, not hardcoded. Real LEGO spacing puts a gap of roughly two thirds of a stud between studs; a fixed count left 96px gaps on a desktop dock, which read as scattered dots rather than a brick. `dockStuds()` in `js/main.js` divides the available width by a stud pitch and redraws on resize — 26 studs at 1280px, 9 at 375px, with the gap-to-stud ratio landing at 0.69 and 0.64 against LEGO's real 0.67.

Studs cycle the four track colours (red, yellow, blue, green) via `:nth-child(4n+…)`, and lift 2px on hover.

The centring uses the `translate` property rather than `transform`, leaving `transform` free for the entrance animation — they are separate CSS properties and compose without fighting.

---

## The 3D bricks

The bricks are **real 3D geometry built from CSS transforms** — not images, not WebGL.

Each brick is a six-faced cuboid. Each stud is a short cylinder made from a circular top plus an 8-segment wall. Faces are shaded from a single implied light source using `color-mix()`.

Geometry is generated in `js/main.js`, so bricks are declared as data:

```js
// bottom → top; x/z are offsets in stud pitches
var HERO_SPEC = [
  { cols: 6, rows: 3, color: '#0A3463', x: 0,    z: 0   },  // Dark Blue
  { cols: 4, rows: 2, color: '#C91A09', x: -0.5, z: 0.5 },  // Bright Red
  ...
];
```

Brick height is `1.2 ×` the stud pitch, matching real LEGO. Studs hidden underneath the brick above are skipped, keeping the hero stack near 230 DOM nodes.

To change the model, edit `HERO_SPEC`. To recolour a track brick, edit `--c` on that `.track` in `index.html`.

---

## The opening animation

Rebuilt to match the reference's motion vocabulary. Inspecting the LEGO site shows it favours **one long slow move** — a 3-second `zoomin` on the hero, with elements drifting 700–1500px over 1–2 seconds — rather than quick sequential pops.

So the intro is now a single continuous shot:

1. The camera opens tight on the baseplate at `1.75×` and pulls back for 3.7s straight.
2. Bricks drift in from ~600px out, each from its own direction, with rotation. Entries are **1300ms long and only 210ms apart**, so they overlap heavily and read as one flowing motion.
3. The model turns from `-96°` to `-34°` across the whole build.
4. The scrim lifts as the last brick lands — while the camera is still moving — and the hero copy staggers in underneath.
5. The camera settles into the layout slot and hands over to a slow idle sway.

Timing constants are at the top of the intro block in `hero()`: `STAGGER`, `FLIGHT`, `CAMERA`.

### Robustness

The final resting state of the model lives in **CSS and inline styles, never in the animations**. Every animation uses `fill: 'backwards'`, so it is a purely transient departure from a correct resting state. Sequencing is driven by `Animation.finished` promises rather than `setTimeout`, because the two drift apart whenever the browser throttles the document timeline.

There is a `settle()` safety net that force-finishes everything, plus an upfront skip when the tab starts hidden or Web Animations is unavailable. Net effect: if the timeline stalls for any reason, the page lands on the fully built model instead of a blank hero.

---

## Project structure

```
├── index.html          # all content + the two character SVGs
├── css/style.css       # tokens, layout, 3D brick styles, section themes
├── js/main.js          # brick geometry, intro, scroll behaviour
├── assets/
│   ├── itss_nirma.png  # ITSS chapter logo (supplied)
│   └── logos/          # ← CS and SPS logos go here
└── .claude/launch.json # local dev server config
```

Page order: hero → about → tracks → **decree** → schedule → **daily build** → prizes → organisers → FAQ → register.

---

## Adding the CS and SPS logos

The two missing chapter logos render as labelled `pending` placeholders. Drop the files in:

```
assets/logos/cs.png
assets/logos/sps.png
```

No code change needed — the placeholders disappear once the files resolve. White or light monochrome marks on transparent backgrounds will match the ITSS logo.

---

## Before launch

- [ ] **Dates** — placeholder 21–23 Dec 2026; registration-open and shortlist dates invented
- [ ] **Prize amounts** — dummy ₹1,75,000 pool split 75k / 40k / 20k / 4×10k
- [ ] **Registration + rulebook links** — the buttons in `#register` point at `#`
- [ ] **Contact email** — currently `ieee@nirmauni.ac.in`
- [ ] **Social links** — Instagram and LinkedIn point at `#`
- [ ] **Partner slots** — five empty placeholders
- [ ] **CS and SPS logos**

---

## Accessibility and support

Modern evergreen browsers. Uses CSS 3D transforms, `color-mix()`, `clamp()`, `IntersectionObserver` and the Web Animations API.

- Full `prefers-reduced-motion` support — intro, sway and reveals all resolve to static states.
- Content is never hidden by CSS alone; reveal states are applied by script, so a JS failure degrades to a fully readable page.
- Keyboard-navigable nav, drawer (Escape closes) and native `<details>` FAQ.
- Both character SVGs carry `role="img"` and an `aria-label`.

---

## Deploying

Static — push it anywhere. **GitHub Pages:** Settings → Pages → deploy from `main` / root.

---

## Note on trademarks

This is a student-run event site. It is **not affiliated with, endorsed by, or sponsored by the LEGO Group or Marvel / The Walt Disney Company**. No LEGO or Marvel logos, wordmarks, fonts or artwork are used — the brick geometry, colour palette and character illustrations are all original work. A disclaimer to this effect is in the site footer; please keep it there.
