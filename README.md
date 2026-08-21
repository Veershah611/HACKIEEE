# HackIEEE 2026 — Event Site

**LEGO × Doomsday.** Landing page for the hackathon run by the **IEEE Nirma University Student Branch** — the **Computer Society (CS)**, **Intelligent Transportation Systems Society (ITSS)** and **Signal Processing Society (SPS)** chapters.

Static site. No build step, no dependencies, no framework.

```bash
python -m http.server 5173
```

Then open <http://localhost:5173>. `file://` will not work — the CSS and JS won't load.

---

## Performance — the thing that shaped every decision

The source renders total **48.8 MB**. Shipped as-is, the hero alone would have been ~18 MB. After the pipeline:

| | Before | After |
| --- | --- | --- |
| All 35 renders | 48.84 MB | **2.21 MB** (95.5% smaller) |
| Initial view (measured) | — | **509 KB across 20 requests** |

Initial-view breakdown: fonts 176 KB · WebP 190 KB · logo PNG 103 KB · CSS 28 KB · HTML 20 KB · JS 13 KB.

Three things keep it there:

- **`tools/optimize-assets.py`** trims transparent margins, resizes to a per-role cap, and exports WebP q80. Re-run it after adding or replacing any render:
  ```bash
  python tools/optimize-assets.py
  ```
  Originals in `assets/` are never touched; output goes to `assets/opt/`. Use `--report` to preview sizes without writing.
- **No CSS 3D anywhere.** No `perspective`, no `preserve-3d`. Depth is faked with stacked 2D planes, which is dramatically cheaper on low-end phones. The previous brick geometry (hundreds of DOM nodes per brick) is gone entirely.
- **Everything below the fold is `loading="lazy"`**, and every `<img>` carries explicit `width`/`height` so there is no layout shift.

> **One easy win left:** `assets/logos/itss_nirma.png` is a 500×500 PNG at 103 KB — a fifth of the initial payload for one small logo. Converting it to WebP would cut it to roughly 10 KB.

---

## Design system

### Palette

Merged from the implementation plan's doomsday palette with the LEGO brick colours already in use.

| Token | Hex | Use |
| --- | --- | --- |
| `--void` | `#0A0A0F` | Page ground |
| `--ash` / `--ash-2` | `#14141C` / `#1C1C28` | Cards, panels |
| `--ember` | `#FF4E00` | Primary accent, nav brick, CTAs |
| `--lava` | `#FF8C00` | Glow, gradients |
| `--hazard` | `#FFD600` | Warning yellow, tape, numbers |
| `--radiation` | `#39FF14` | Cyber track accent |
| `--ink` | `#F0EDE8` | Body text |

The page ground is near-black with a **LEGO stud grid** (a 24px repeating radial-gradient) plus three fixed ember/lava/radiation washes, so it reads as a lit baseplate rather than flat black.

### Type — unchanged, as requested

| Role | Font |
| --- | --- |
| Headings, hero, numbers | **Pixelify Sans** |
| Small uppercase labels | **Silkscreen** |
| Track names | **Bangers** |
| Doom's line | **Cinzel Decorative** |
| Newsprint accents | **Special Elite** |
| Body copy | **Archivo** |

Hero headings get a chunky plastic emboss via stacked `text-shadow` rather than an image.

---

## How the parallax works

Two systems, one engine, in `js/main.js`:

- **Hero diorama** — eight transparent planes (`lava-ground-glow`, `lego-cloud`, both skyscrapers, `rubble-ground`, `hazmat-scientist`, `leaking-barrel`, `flying-bricks`), each with a `data-depth` from 6 to 52. Deeper planes move further, so pointer movement produces real depth. Max shift is ~23px — noticeable without being nauseating.
- **Track cards** — each card is its own mini diorama with 3–4 planes and a 1.4× multiplier, tracking only its own bounds.

Two rules make this robust:

1. **Parallax writes to the `translate` property, not `transform`.** The planes already use `transform` for their idle keyframes (sway, bob, tumble). These are separate CSS properties that compose, so the two never fight.
2. **Base positioning avoids centring transforms.** Hero planes use `left: (100 - width) / 2` rather than `left:50%; transform:translateX(-50%)`, which keeps `transform` free for the animations.

Adding a plane needs no JS change — drop in an `<img class="pl" data-depth="N">`.

Parallax is skipped entirely on touch devices and under `prefers-reduced-motion`.

---

## Gotcha: Pixelify Sans has a broken `fl` ligature

It renders `fl` as a single blank-ish glyph, so "floor" came out as "Aoor". Measured: `fl` is 23px with ligatures on vs 30px off. Every pixel-set element therefore carries:

```css
font-variant-ligatures:none;font-feature-settings:"liga" 0,"clig" 0;
```

If you add a new heading in the pixel face, add its selector to that rule near the top of `css/style.css` — otherwise any word containing `fl`, `fi` or `ffi` may break.

The wordmark splits for the same reason: "IEEE" in Pixelify reads as gibberish at nav size, so it is `Hack` in pixel + `IEEE` in spaced Silkscreen.

---

## Content states

Every element that animates in is hidden by CSS and revealed when script adds `.in`. Both halves are gated:

```css
.js [data-reveal]:not(.in){opacity:0}
```

- **`:not(.in)`, never a bare hide rule.** A plain hide rule can outrank the reveal rule on specificity and strand the element invisible forever. `:not(.in)` means the hide rule simply stops matching.
- **`.js` gating.** `<head>` runs `document.documentElement.classList.add('js')`. If the script fails, no hide rules match and the page renders fully visible.

The dock studs are generated from the dock's width via a `ResizeObserver`, so the count keeps LEGO's real gap-to-stud ratio (~0.67) at any size — 26 studs at 1280px, 8 at 375px.

---

## Structure

```
├── index.html            # single long-scroll page
├── css/style.css         # tokens, layout, animation
├── js/main.js            # parallax, reveals, countdown, nav, rail
├── tools/
│   └── optimize-assets.py
└── assets/
    ├── *.png             # source renders (never shipped)
    ├── opt/*.webp        # optimised, what the page actually loads
    └── logos/            # itss_nirma.png · cs.png and sps.png pending
```

Sections: hero → hazard tape → brief → **decree** (Doom) → tracks → timeline → **the daily build** (web-slinger) → prizes → organisers → FAQ → register.

---

## Placeholders to replace

- **Dates** — 21–23 Dec 2026. Note **21 Dec 2026 is a Monday**, so this runs Mon–Wed, not a weekend; the hero says "build sprint" rather than "weekend" for that reason. The 36-hour window is exact: Mon 19:00 + 36h = Wed 07:00 freeze. The registration-open (02 Nov) and shortlist (07 Dec) dates are invented. Tagged with `data-field` — `grep -n 'data-field' index.html`.
- **Prizes** — dummy figures that balance exactly: 75,000 + 40,000 + 20,000 + (4 × 10,000) = **₹1,75,000**. If you change a tier, update the pool headline.
- **CS and SPS logos** — drop `cs.png` and `sps.png` into `assets/logos/` and the "pending" placeholders disappear automatically.
- **Registration and rulebook links** — the buttons in `#register` point at `#`.
- **Partner slots**, **contact email**, **social links**.

---

## Decisions taken from the implementation plan

The plan was written for a different project ("Hackify", 7 pages, 5 tracks). What was adopted and what was not:

| Plan said | Built | Why |
| --- | --- | --- |
| 7 separate pages | **One long-scroll page** | Faster, one payload, better for a landing page. Splitting later is easy. |
| 5 tracks incl. "Custom" | **4 tracks** | Your four tracks, and no assets exist for a fifth. |
| Per-track `<canvas>` particle systems | **Not built** | Five always-running canvases is exactly the cost you asked to avoid. CSS scan sweeps give similar energy for free. |
| `perspective: 800px` card containers | **2D layers only** | Same visual depth, no 3D compositing cost. |
| Name "Hackify" | **HackIEEE** | Your event. |
| Boogaloo / Fredoka / Inter | **Existing fonts kept** | You asked to keep them. |

---

## Note on trademarks

A student-run event site. **Not affiliated with, endorsed by or sponsored by the LEGO Group or Marvel / The Walt Disney Company.** The footer disclaimer should stay.
