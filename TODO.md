# TODO — the "crazy mode" backlog

Ideas for making the site feel more alive, with an honest note on cost for
each. The constraint that shaped all of these: **the site has to stay fast
under traffic**, so anything here that costs idle CPU or extra bytes for
people who never trigger it is called out as such.

Branches: `feat/crazy-mode`, then `feat/detonate-and-crumbs`.

---

## Already built

Do not rebuild these — they are on `feat/crazy-mode` already.

| Feature | Commit | Notes |
| --- | --- | --- |
| **Demolition scroll** | `c374f06` | Skyline topples as the hero exits. `lib/hooks/useHeroCollapse.ts` writes a 0..1 `--cl`; every consequence lives in `styles/sections/hero.css`. |
| **Roster picker** | `c374f06` | Eight characters, shareable PNG card via `lib/squadCard.ts`. |
| **Doom Mode** | `c374f06`, `a37ab0f` | Footer toggle + Konami + typing `doom` + picking a villain. Shared store in `lib/hooks/useDoomMode.ts`. |
| **`content-visibility`** | `c374f06` | Below-fold sections skip paint until near the viewport. |
| **Track detonate** | `feat/detonate-and-crumbs` | Click a card's diorama; planes burst by depth. Required moving `.tl` centring off `transform` — see the note below. |
| **Brick crumbs** | `feat/detonate-and-crumbs` | Studs pop on click. Pool of 12, recycled; allocates nothing on touch. |
| **Walking minifigure** | (this commit) | Paces the bottom edge, flips with direction, steps only while scrolling. `lib/hooks/useWalker.ts`. Fades out over the footer. |

> **Channel discipline — read before adding any animation to the hero.**
> The diorama planes already use `transform` for idle keyframes and
> `translate` for pointer parallax. The collapse takes `rotate`, `scale` and
> `opacity`. These are independent CSS properties that compose; if you write
> to one that is already taken, you will silently clobber the other effect.
> There are no free channels left on `.pl` — anything new needs a wrapper.
>
> Track layers (`.tl`) are the same story: `transform` is the detonate burst,
> `translate` is the parallax. Centring uses `margin-inline: auto` precisely so
> it needs neither.

---

## Pending

### 1. Tape reacts to scroll velocity
Marquee speeds up, slows, or reverses with scroll direction and speed, so the
page feels physical rather than looping on a timer.

- **Where:** `components/sections/Tape.tsx`, `styles/sections/tape.css`
- **How:** one `scroll` listener tracking delta over time; write
  `animation-duration` and `animation-direction` on `.tape__run`. Do not
  animate `transform` from JS — let the existing CSS animation keep running
  and only change its rate.
- **Cost:** one passive listener. No new bytes.
- **Watch:** clamp the rate, and reset to the base duration after ~150ms of no
  scrolling or it will feel jittery.

### 2. Opt-in sound
Brick click on nav, snap on register. **Muted by default**, with a speaker
toggle beside the Doom toggle in the footer.

- **Cost:** ~20 KB, and only fetched after the user opts in — load the sprite
  lazily on first unmute, never on page load.
- **Needs from you:** the audio sprite. Nothing else here is blocked.
- **Watch:** persist the preference like Doom Mode does; never autoplay.

### 3. Sealed problem statements
A Doom-sealed panel that cannot open until kickoff, then reveals.

- **Where:** new section, gated on `event.startsAt` (already in
  `content/event.ts`)
- **How:** reuse `useCountdown`; swap the panel at zero.
- **Cost:** negligible.
- **Watch:** this is theatre, not security — the statements would ship in the
  page source. Either keep the sealed content genuinely trivial, or fetch it
  at reveal time from somewhere else.

### 4. Live damage report
Registrations / teams / bricks-remaining counters.

- **How:** a GitHub Action on a cron writes `public/stats.json`; the page
  fetches it. Stays fully static — no backend.
- **Cost:** one small fetch.
- **Needs from you:** where the numbers come from (a form export, a sheet, the
  registration platform's API).

### 5. Red-alert countdown state
Under 24 hours to kickoff the site shifts: tape goes red, ember glow
intensifies.

- **How:** a time-derived class on `<html>`, exactly like `data-doom`. Add the
  variant to `styles/tokens.css` so it is a token swap, not new CSS.
- **Cost:** free.

---

## Performance upgrade worth doing before the rest

**CSS scroll-driven animations** (`animation-timeline: view()`) would move the
demolition scroll — and items 1 and the walker — onto the compositor and off the
main thread entirely. That would let the site do *more* animation for *less*
CPU than it spends today.

Safari still needs the JS fallback, so this is progressive enhancement rather
than a replacement: keep the hooks, add the CSS path, and let browsers that
support it skip the listener.

---

## Blocked on you

- **Real registration URL.** `registerUrl` in `content/event.ts` is still `#`.
  The shareable card is built for sharing but currently has no link to act on —
  this is the single highest-value thing outstanding.
- **Shang-Chi render.** Dropped from the roster: the supplied PNG has only
  201x214 of actual content, about a third the resolution of the others. The
  source is still in `assets/` — re-export it larger, run `npm run assets`,
  add one entry to `content/roster.ts`.
- **Audio sprite** for item 2 (opt-in sound).
- **Stats source** for item 4 (live damage report).

See also the placeholder list in `README.md` — dates, prize figures, CS and
SPS logos, partner slots.
