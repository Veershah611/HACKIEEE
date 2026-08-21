# Hackify — LEGO × Doomsday Hackathon Website

> **Theme**: LEGO toy aesthetic meets post-apocalyptic doomsday — chunky plastic bricks, nuclear explosions, minifigures, rubble, all rendered in a high-quality 3D isometric toy style. Every asset is isolated with **transparent PNG background** so it can be independently animated on the web.

---

## Style Reference

![Doomsday LEGO Reference](doomsday_reference.png)

Key visual traits extracted from the reference:
- **3D isometric LEGO render** — all objects look like real toy sets
- **Warm apocalyptic palette**: deep charcoal, neon orange-red fire, hazard yellow, brick brown
- **White/transparent isolation** — each element is cleanly cut out, no backgrounds
- **Scale contrast** — small minifigures vs huge mushroom clouds (creates drama)
- **Debris scatter** — individual flying LEGO bricks add dynamism
- **Rusted/burned material texture** on vehicles and buildings

---

## 🎨 Design System

### Color Palette
| Token | Hex | Usage |
|---|---|---|
| `--clr-void` | `#0A0A0F` | Page background |
| `--clr-ash` | `#1A1A24` | Card backgrounds |
| `--clr-ember` | `#FF4E00` | Primary accent / CTA |
| `--clr-lava` | `#FF8C00` | Glow, highlights |
| `--clr-hazard` | `#FFD600` | Warning yellow |
| `--clr-radiation` | `#39FF14` | Neon green radiation |
| `--clr-brick-dark` | `#2C2C3A` | Dark brick tiles |
| `--clr-brick-mid` | `#4A3728` | Brown brick pieces |
| `--clr-smoke` | `#3D3D4F` | Smoke/cloud tones |
| `--clr-text` | `#F0EDE8` | Body text |

### Typography
- **Display / Headings**: `"Boogaloo"` or `"Fredoka One"` — rounded, playful LEGO feel
- **Subheadings**: `"Space Grotesk"` bold — techy contrast
- **Body**: `"Inter"` — clean readability
- **Mono / Code**: `"JetBrains Mono"` — for countdowns, IDs, data
- **Texture**: All hero headings get a **3D brick emboss CSS text-shadow** effect

### Brick Grid
The entire layout uses a subtle **LEGO stud grid** as a background pattern — dark gray repeating circles/dots on near-black, giving the impression of a baseplate.

---

## 📄 Pages

1. **Hero / Landing** (`index.html`)
2. **About / Story** (`about.html`)
3. **Timeline** (`timeline.html`)
4. **Tracks** (`tracks.html`)
5. **Speakers** (`speakers.html`)
6. **Sponsors** (`sponsors.html`)
7. **Contact / Register** (`contact.html`)

---

## 🖼️ ASSET LIBRARY — Complete with Generation Prompts

> All prompts follow this rule: **pure white or transparent background, isolated object, no scene/floor, no drop shadow**. Generate as PNG with transparency.

---

### 🏗️ SECTION 1: HERO SCENE LAYERS
*These are layered front-to-back like parallax depth planes*

---

#### ASSET H-01 — Mushroom Cloud (Background Layer)
**Animation**: Slow pulse scale + upward drift + glow flicker
```
LEGO style 3D rendered nuclear mushroom cloud explosion, made entirely of LEGO stud bricks and round bumpy LEGO cloud pieces, glowing neon orange and red core, dark gray-black smoke ball cap, dramatic cinematic lighting from within, isolated on perfectly transparent background, no floor, no ground, no scene, front-facing slightly isometric view, ultra high detail, photorealistic toy render
```

---

#### ASSET H-02 — Fire / Lava Ground Glow (Midground Layer)
**Animation**: Flickering opacity + hue shift between orange and red
```
LEGO style 3D rendered ground-level fire and lava glow spread, flat circular ring of flames and embers, made of LEGO flame pieces in orange and yellow, glowing molten cracks between dark gray LEGO base plate tiles, isolated on transparent background, top-down isometric view, no minifigures, ultra high detail
```

---

#### ASSET H-03 — Ruined LEGO Skyscraper LEFT
**Animation**: Subtle sway + dust particle emission from top
```
Single tall destroyed LEGO skyscraper building, dark gray and charcoal LEGO bricks, partially collapsed with broken floors and exposed rebar made of LEGO pieces, glowing orange light from within gaps, right side more intact than left, isolated on perfectly transparent background, isometric 3/4 view slightly tilted right, no ground plane visible, LEGO toy aesthetic, photorealistic render
```

---

#### ASSET H-04 — Ruined LEGO Skyscraper RIGHT
**Animation**: Subtle opposite-phase sway from H-03
```
Single tall destroyed LEGO skyscraper building leaning slightly, dark gray LEGO bricks, asymmetric collapse with large brick chunks breaking off mid-air, fire glow from base, isolated on perfectly transparent background, isometric 3/4 view slightly tilted left to mirror a left building, LEGO toy aesthetic, photorealistic render, no ground
```

---

#### ASSET H-05 — Crashed Rusted LEGO Jeep / SUV
**Animation**: Idle wheel spin + headlight flicker
```
Single destroyed rusted LEGO off-road jeep SUV, chunky LEGO toy vehicle style, heavily weathered with rust and burn marks, yellow accent bar lights on roof, cracked windshield, one wheel off, isolated on perfectly transparent background, isometric front-right 3/4 view, ultra detailed LEGO toy photorealistic render, no ground or floor
```

---

#### ASSET H-06 — Overturned LEGO Emergency Barricade / Truck
**Animation**: Slow rocking on its side
```
Overturned LEGO toy emergency barricade truck tipped on its side, red and white striped hazard markings, chunky LEGO vehicle aesthetic, tire visible, isolated on perfectly transparent background, isometric 3/4 side view, photorealistic LEGO toy render, no floor or ground, ultra high detail
```

---

#### ASSET H-07 — LEGO Satellite Dish Pole (Broken)
**Animation**: Slow lean oscillation left-right
```
Broken LEGO satellite dish on a tilted metal pole, gray LEGO bricks, dish partially cracked and bent, wires hanging loose made of thin LEGO elements, isolated on perfectly transparent background, isometric side view, LEGO toy style photorealistic render, no ground, ultra detail
```

---

#### ASSET H-08 — LEGO Minifigure: Hero Hacker (CENTER FRONT)
**Animation**: Idle breathing bob, cape flutter (CSS), slow look-around
```
Single LEGO minifigure character, back view facing forward into distance, wearing dark tactical jacket with a bright red flowing cape/scarf, curly brown hair piece, military backpack with gadgets attached, isolated on perfectly transparent background, centered, no ground or scene, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET H-09 — LEGO Minifigure: Hazmat Scientist
**Animation**: Idle breathing bob, slightly offset timing from H-08
```
Single LEGO minifigure character, 3/4 view facing slightly right, wearing full bright yellow hazmat suit with clear visor helmet, radiation symbol on back of suit, holding a black walkie-talkie in one hand, isolated on perfectly transparent background, no floor, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET H-10 — Flying LEGO Brick Debris (Set of 8 bricks)
**Animation**: Each brick has unique random float trajectory + rotation
```
Eight individual LEGO 2x4 stud bricks scattered and tumbling through air, various colors: orange, red, dark gray, brown, yellow, each at different rotation angles as if caught mid-explosion, isolated on perfectly transparent background, no ground, photorealistic 3D LEGO render, ultra detail, all bricks clearly separated with space between them
```

> **Split this into 8 separate single-brick assets** for independent animation control. Repeat prompt with: `single LEGO 2x4 brick, [COLOR], tumbling mid-air, tilted [ANGLE]deg, isolated transparent background`

---

#### ASSET H-11 — Rubble Ground Mound (BASE PLATFORM)
**Animation**: Static base, particles float upward from it
```
Circular mound of LEGO rubble and destroyed bricks, dark gray and brown LEGO pieces piled up with yellow road marking stripes visible between them, center flattened as if a path, isometric top-down slightly angled view, isolated on perfectly transparent background, no characters, ultra high detail photorealistic LEGO render
```

---

### 🧱 SECTION 2: NAVIGATION & UI ELEMENTS

---

#### ASSET N-01 — LEGO Brick Logo Badge
**Animation**: Hover: 3D tilt + glow pulse
```
LEGO style logo badge/emblem, chunky 3D extruded plastic toy letters spelling "HACKIFY" on a dark charcoal colored LEGO base plate, neon orange glow outline around letters, 4 LEGO studs visible on top surface of each letter, isometric front view, isolated transparent background, photorealistic LEGO toy render
```

---

#### ASSET N-02 — LEGO Brick Navigation Button (Base)
**Animation**: Hover: press down (translateY), release pop
```
Single large LEGO 4x2 flat tile piece as a button, dark charcoal gray color, smooth top surface with recessed text area, 3D depth with visible bottom extrusion, isolated on transparent background, front-facing view slightly isometric, photorealistic LEGO render, no text on it
```

---

#### ASSET N-03 — LEGO Radiation Warning Sign
**Animation**: Rotate 360deg slow, glow pulse
```
LEGO style radiation warning sign, triangular yellow warning sign shape built from LEGO pieces, black radiation trefoil symbol on face, mounted on a gray LEGO pole, chunky plastic toy aesthetic, glowing slightly yellow, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render
```

---

### 💣 SECTION 3: SECTION DIVIDERS & DECORATIVE

---

#### ASSET D-01 — LEGO Brick Wall Divider (Horizontal)
**Animation**: Slide in from left on scroll
```
Horizontal row of LEGO bricks forming a wall divider, 12 bricks wide 2 bricks tall, alternating dark gray and charcoal colors, visible studs on top, 3D depth and plastic sheen, isolated on transparent background, perfectly straight front view, photorealistic LEGO render
```

---

#### ASSET D-02 — LEGO Cog / Gear
**Animation**: Continuous slow rotation
```
Single large LEGO technic gear/cog piece, dark gunmetal gray, chunky circular gear with teeth, center axle hole, isolated on transparent background, front facing perfectly, photorealistic LEGO toy render, ultra detail
```

---

#### ASSET D-03 — LEGO Flame Torch Pillar
**Animation**: Flicker scale + opacity, warm glow cast on surroundings via CSS shadow
```
Single LEGO torch/flame pillar, dark gray LEGO brick base column with a bright orange and yellow LEGO flame element on top, glowing warm light effect on surface, isolated on perfectly transparent background, front isometric view, photorealistic LEGO toy render
```

---

#### ASSET D-04 — LEGO Radioactive Barrel
**Animation**: Float up-down slow, slight tilt oscillation
```
Single LEGO radioactive waste barrel, chunky toy style, dark olive green or yellow barrel body with radiation symbol sticker, LEGO stud on top lid, oozing green glow from cracks, isolated on perfectly transparent background, isometric 3/4 front view, photorealistic LEGO toy render
```

---

#### ASSET D-05 — Floating LEGO Asteroid / Rock
**Animation**: Slow drift + rotation in 3D CSS
```
Single LEGO built asteroid / space rock, dark gray and brown LEGO bricks assembled into an irregular boulder shape, visible studs on all sides, orange molten glow in cracks, isolated on perfectly transparent background, isometric 3/4 view, photorealistic LEGO toy render
```

---

#### ASSET D-06 — LEGO Caution Tape Strip
**Animation**: Horizontal scroll loop (marquee)
```
LEGO style caution tape strip, flat horizontal band of interlocking yellow and black LEGO tile pieces forming diagonal hazard stripe pattern, 3D plastic look, isolated on transparent background, perfectly straight top-down view, photorealistic LEGO render
```

---

### 👤 SECTION 4: SPEAKER / JUDGE CARDS

---

#### ASSET S-01 — Speaker Card Frame
**Animation**: Hover: lift + border glow
```
LEGO style photo frame / card border, rectangular frame made of dark gray LEGO bricks with studs on all sides, orange corner accent LEGO pieces, 3D depth, inner area completely empty/transparent for placing a photo inside, front facing view, isolated on transparent background, photorealistic LEGO toy render
```

---

#### ASSET S-02 — LEGO Name Plate Tag
**Animation**: Wiggle on hover
```
LEGO minifigure style name plate tag, small rectangular dark tile piece with recessed label area, white surface with space for text, LEGO stud hole at top for hanging, isolated on transparent background, front facing view, photorealistic LEGO toy render
```

---

### 🏆 SECTION 5: PRIZES & TRACKS

---

#### ASSET P-01 — LEGO Trophy Cup
**Animation**: Spin Y-axis slow, gold shimmer pulse
```
Single LEGO trophy cup, built from gold/yellow LEGO pieces, classic cup shape with handles on sides, studs visible on surface, LEGO star piece on top, glowing gold shimmer, isolated on perfectly transparent background, front isometric view, photorealistic LEGO toy render, ultra detail
```

---

#### ASSET P-02 — LEGO Prize Chest / Box
**Animation**: Lid flips open on hover revealing glow
```
Single LEGO treasure chest box, dark brown LEGO bricks with gold latch piece, closed lid with LEGO studs, glowing orange light leaking from seams, isolated on perfectly transparent background, isometric 3/4 front view, photorealistic LEGO toy render
```

---

#### ASSET P-03 — LEGO Medal / Badge
**Animation**: Swing pendulum on CSS string
```
Single LEGO medal/award badge, circular gold LEGO plate piece with a star pressed in center, hanging from a short LEGO chain/rope element, ribbon in orange and red, isolated on perfectly transparent background, front facing view, photorealistic LEGO toy render
```

---

### ⏱️ SECTION 6: COUNTDOWN TIMER

---

#### ASSET C-01 — LEGO Digital Display Panel
**Animation**: Number flip animation per digit
```
LEGO style digital display panel, rectangular dark gray LEGO brick frame, inner face resembling a retro LED screen with segmented display area, orange neon glow border, studs on outer frame, isolated on perfectly transparent background, front facing view, photorealistic LEGO toy render, ultra detail
```

---

#### ASSET C-02 — LEGO Detonator / Bomb (Decorative)
**Animation**: Wire oscillate, red light blink
```
LEGO cartoon bomb with a round black ball body, LEGO studs on surface, bright red countdown display on side, a lit fuse on top with orange glow tip, isolated on perfectly transparent background, isometric 3/4 front view, photorealistic LEGO toy render, slightly cute not scary
```

---

### 📅 SECTION 7: TIMELINE

---

#### ASSET T-01 — LEGO Minifig Holding Flag (Checkpoint Marker)
**Animation**: Flag wave on CSS, marker bounce on scroll reveal
```
Single LEGO minifigure, front view, simple dark outfit, holding up a bright orange triangular flag on a stick, neutral face, isolated on perfectly transparent background, front facing slightly isometric, photorealistic LEGO toy render
```

---

#### ASSET T-02 — LEGO Road / Path Tile
**Animation**: Draw-on left to right on scroll
```
Single LEGO road baseplate tile section, dark gray with yellow center line markings, top-down view, 3D depth with brick bottom, isolated on perfectly transparent background, perfect top-down isometric view, photorealistic LEGO toy render
```

---

### 📬 SECTION 8: CONTACT / REGISTER CTA

---

#### ASSET R-01 — LEGO Laptop / Computer
**Animation**: Screen glow pulse, typing fingers wiggle
```
Single LEGO built laptop computer, open lid with a glowing screen showing code lines in green, dark gray LEGO brick body, keyboard made of flat LEGO tile pieces, isolated on perfectly transparent background, isometric 3/4 front view, photorealistic LEGO toy render
```

---

#### ASSET R-02 — LEGO Register Button (Big CTA)
**Animation**: Hover: press down 4px + orange glow burst
```
Large single LEGO button element, dark charcoal LEGO base with a big bright orange-red flat LEGO tile on top as button surface, 3D pressed-in depth visible, studs on surface, isolated on transparent background, slightly isometric front view, photorealistic LEGO toy render, ultra detail
```

---

#### ASSET R-03 — LEGO Rocket Ship (Decorative Footer)
**Animation**: Float up-down + exhaust particle trail
```
Single LEGO rocket ship, built from gray and orange LEGO bricks, pointed nose cone, small LEGO flame exhaust at bottom in orange and yellow, fins on sides, isolated on perfectly transparent background, isometric front view tilted slightly, photorealistic LEGO toy render
```

---

### 🎯 SECTION 9: TRACK SCENE ASSETS — 5 Tracks × 4 Depth Layers

> Each track card on `tracks.html` is its own **mini parallax diorama** — 4 separate transparent PNGs stacked in CSS `position: absolute` layers inside a `perspective` container. On hover, each layer shifts at a different rate, creating real 3D depth. A dedicated canvas particle system emits track-specific particles continuously.

---

## 🔐 TRACK 1: CYBERSECURITY
*Palette: neon green `#00FF41`, electric blue `#00C2FF`, dark void black*
*Concept: A LEGO hacker has breached a destroyed server tower — binary rain, cracked firewalls, a glowing terminal in the rubble*

---

#### ASSET TR1-BG — Cybersecurity Background: Cracked Firewall Wall
**Layer**: Z-1 (farthest back) | **Parallax factor**: ×0.04
**Animation**: Slow horizontal scan line sweep (CSS linear-gradient animation), neon green glow pulse on cracks, matrix code rain effect overlaid in CSS
```
Destroyed LEGO firewall / server wall, tall rectangular structure made of dark gray and black LEGO bricks, massive glowing neon green cracks running diagonally through the wall as if hacked open, green binary code numbers embossed into the brick surface, dramatic neon green rim lighting from within the cracks, isolated on perfectly transparent background, front-facing slightly isometric 3/4 view, photorealistic LEGO toy render, ultra high detail, no floor or ground
```

---

#### ASSET TR1-MID — Cybersecurity Midground: Destroyed LEGO Server Rack
**Layer**: Z-2 | **Parallax factor**: ×0.10
**Animation**: Flickering LED light blink on rack units (CSS step animation), occasional spark flash (CSS pseudo-element), slow forward lean sway
```
Single destroyed LEGO server rack tower, tall rectangular dark gray LEGO brick structure, multiple horizontal rack unit slots visible with tiny glowing LED lights (some green, some red, some dark), exposed wiring hanging as thin LEGO bar elements, one side blown open revealing glowing circuit interior, isolated on perfectly transparent background, isometric 3/4 front view, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET TR1-FG — Cybersecurity Foreground: Hooded Hacker Minifigure
**Layer**: Z-3 | **Parallax factor**: ×0.20
**Animation**: Idle breathing bob (translateY 4px loop 3s), hoodie strings flutter (CSS rotate), green screen glow on face from laptop, typing hand micro-wiggle
```
Single LEGO minifigure hacker character, front view, wearing dark black hoodie with hood up, glowing green light reflected on face from below, holding a tiny LEGO laptop/tablet piece, smirking expression, isolated on perfectly transparent background, centered, no ground or scene, neon green rim light on edges, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET TR1-FLOAT — Cybersecurity Floating Details: Binary Brick Fragments
**Layer**: Z-4 (closest) | **Parallax factor**: ×0.35
**Animation**: Each fragment independently drifts on a unique CSS path with rotation, some blink on/off like corrupted data
```
Six individual small LEGO 1x1 flat tile pieces, each engraved with the number 0 or 1 (binary digits), scattered floating mid-air at various angles, bright neon green surface, dark edges, isolated on perfectly transparent background, each tile clearly separated, no ground, photorealistic LEGO render, ultra detail
```

> **Split into 6 individual tile assets.** Prompt each: `Single LEGO 1x1 tile piece, neon green with engraved binary digit [0 or 1], tumbling mid-air at [ANGLE]deg rotation, isolated perfectly transparent background, photorealistic LEGO render`

---

## 💳 TRACK 2: FINTECH
*Palette: gold `#FFD700`, deep green `#00A550`, charcoal black*
*Concept: A LEGO stock exchange is in ruins — crashed ticker boards, an exploded gold vault, gold coins raining like debris*

---

#### ASSET TR2-BG — FinTech Background: Crashed Stock Ticker Board
**Layer**: Z-1 | **Parallax factor**: ×0.04
**Animation**: CSS ticker scroll (numbers animate left-to-right), red glow flicker on falling numbers, screen static flicker effect
```
Destroyed LEGO stock exchange ticker board wall, large flat dark screen structure built from LEGO panels, displaying giant red downward arrow made of LEGO bricks, cracked screen surface with exposed orange glow behind it, numbers and graph lines embossed in red and green on the surface, dramatically lit from within, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail, no floor
```

---

#### ASSET TR2-MID — FinTech Midground: Blown-Open LEGO Bank Vault
**Layer**: Z-2 | **Parallax factor**: ×0.10
**Animation**: Vault door swings open on hover (CSS rotateY), gold glow floods out, coins bounce out (JS spring animation on hover)
```
Single LEGO bank vault, heavy circular door built from gold and dark gray LEGO bricks, door is blast-open revealing glowing gold interior light, large LEGO combination wheel on door, scorched and cracked edges, isolated on perfectly transparent background, isometric 3/4 front view, no floor, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET TR2-FG — FinTech Foreground: Businessman Minifigure Holding Smashed Phone
**Layer**: Z-3 | **Parallax factor**: ×0.20
**Animation**: Idle bob, phone screen glitch (CSS animation on overlaid element), tie flap in wind
```
Single LEGO minifigure character, slightly panicked expression, wearing dark suit with red tie, holding up a cracked LEGO smartphone piece showing a red downward graph, other hand on head in distress, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail, no ground
```

---

#### ASSET TR2-FLOAT — FinTech Floating Details: Gold Coin LEGO Tiles
**Layer**: Z-4 | **Parallax factor**: ×0.35
**Animation**: Rain downward with random horizontal drift + rotation, each coin tumbles at different speed
```
Seven individual round LEGO coin/medal pieces, bright gold color, each with a simple dollar sign or coin face embossed, falling mid-air at various tumbling angles, isolated on perfectly transparent background, each clearly separated, no ground, photorealistic LEGO render, ultra detail
```

> **Split into 7 individual coin assets.** Prompt each: `Single round gold LEGO coin piece, shiny gold with embossed currency symbol, tumbling mid-air at [ANGLE]deg, isolated perfectly transparent background, photorealistic LEGO render`

---

## 🏥 TRACK 3: HEALTHCARE & SUSTAINABILITY
*Palette: medical white `#F0F0F0`, biohazard green `#39FF14`, emergency red `#FF2222`*
*Concept: A LEGO field hospital in a broken world — makeshift medical tent, a cracked DNA helix, biohazard barrels, a determined doctor minifig*

---

#### ASSET TR3-BG — Healthcare Background: Crumbling Hospital Building
**Layer**: Z-1 | **Parallax factor**: ×0.04
**Animation**: Red cross sign flickers (CSS), dust particles drift down from cracked top, faint heartbeat line pulses across building (CSS SVG overlay)
```
Destroyed LEGO hospital building, white and gray LEGO bricks, large red cross emblem built into the front facade, upper floors partially collapsed, windows glowing faint green from within, cracks running through walls, isolated on perfectly transparent background, isometric 3/4 front view, no floor or ground, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET TR3-MID — Healthcare Midground: LEGO DNA Double Helix
**Layer**: Z-2 | **Parallax factor**: ×0.10
**Animation**: Slow continuous rotateY 360° spin (3D CSS perspective), each node glows alternately (pulse animation staggered), helix bobs slightly upward
```
Single LEGO built DNA double helix structure, two intertwined spiral columns made from alternating red, white, and green LEGO brick rungs and rods, glowing softly from within each rung, elegant sci-fi toy aesthetic, isolated on perfectly transparent background, front-facing slightly angled view, photorealistic LEGO toy render, ultra high detail, no base or floor
```

---

#### ASSET TR3-FG — Healthcare Foreground: Doctor Minifigure
**Layer**: Z-3 | **Parallax factor**: ×0.20
**Animation**: Idle bob, stethoscope sway (CSS rotate on child element), coat flutter
```
Single LEGO minifigure doctor character, front view, wearing white lab coat with red cross on pocket, stethoscope around neck as a LEGO accessory piece, holding a small LEGO clipboard, determined confident expression, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail, no ground
```

---

#### ASSET TR3-FLOAT — Healthcare Floating Details: Medical Supply Capsule Bricks
**Layer**: Z-4 | **Parallax factor**: ×0.35
**Animation**: Spiral upward drift pattern (CSS animation path), pill capsules slowly rotate, cross tiles gently pulse glow
```
Five individual floating LEGO medical items: two LEGO oval capsule pill pieces (one red half, one white half), one LEGO 1x1 tile with red cross, one LEGO syringe bar element, one LEGO heart-shaped piece, each isolated floating mid-air at different angles, isolated on perfectly transparent background, each element clearly separated, photorealistic LEGO render, ultra detail
```

> **Split into 5 individual assets.** Prompt each: `Single LEGO [capsule pill / red cross tile / syringe bar / heart piece], medical white and red colors, floating mid-air slightly tilted, isolated perfectly transparent background, photorealistic LEGO render`

---

## ♻️ TRACK 4: SUSTAINABILITY
*Palette: dying green `#4CAF50` fading to brown, solar gold, smoke gray*
*Concept: A LEGO eco-station struggles to survive — a half-burned tree, a cracked solar panel, a wind turbine twisted by disaster, a nature-warrior minifig*

---

#### ASSET TR4-BG — Sustainability Background: Cracked Earth / Dead Landscape
**Layer**: Z-1 | **Parallax factor**: ×0.04
**Animation**: Heat shimmer distortion (CSS blur + translateY oscillate), orange lava glow pulses in cracks, smoke wisps drift upward via CSS
```
Destroyed LEGO landscape background, flat cracked earth platform made from dark brown and gray LEGO base plate pieces, deep glowing orange cracks running through the surface, patches of dried-up brown LEGO grass pieces, dead barren atmosphere, isolated on perfectly transparent background, top-down isometric slightly angled view, photorealistic LEGO toy render, ultra high detail, no sky or horizon
```

---

#### ASSET TR4-MID — Sustainability Midground: Broken Solar Panel + Twisted Wind Turbine
**Layer**: Z-2 | **Parallax factor**: ×0.10
**Animation**: Turbine blade still slowly rotates (CSS rotateZ, damaged erratic speed), solar panel flickers dim glow, both sway slightly in CSS wind
```
Two LEGO structures side by side: LEFT — a cracked LEGO solar panel on a tilted pole, dark blue panel surface shattered with glowing orange fractures, gray LEGO brick mounting base; RIGHT — a twisted LEGO wind turbine tower, white LEGO bricks, three bent blades at askew angles, one blade snapped off, isolated on perfectly transparent background, isometric 3/4 view, photorealistic LEGO toy render, ultra high detail, no ground
```

---

#### ASSET TR4-FG — Sustainability Foreground: Eco-Warrior Minifigure
**Layer**: Z-3 | **Parallax factor**: ×0.20
**Animation**: Idle bob, raised fist pulses (CSS scale 1.0→1.05 loop), leaf elements drift from hand upward
```
Single LEGO minifigure eco-warrior character, front view, wearing dark green jacket with recycling symbol patch, one fist raised defiantly upward, other hand holding a small LEGO sapling tree piece with green leaves, determined heroic expression, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail, no ground
```

---

#### ASSET TR4-FLOAT — Sustainability Floating Details: Leaf and Spark Fragments
**Layer**: Z-4 | **Parallax factor**: ×0.35
**Animation**: Leaves spiral upward in a swirl (CSS animation with rotate + translateY), embers drift downward, alternate between hopeful and apocalyptic feel
```
Six individual floating LEGO elements: three LEGO leaf pieces in faded green and brown (wilting), two tiny LEGO 1x1 round plates in orange-red as embers, one LEGO water drop piece in pale blue, each floating mid-air at various tilted angles, isolated on perfectly transparent background, each clearly separated, photorealistic LEGO render
```

> **Split into 6 individual assets.** Prompt each: `Single LEGO [green leaf / brown wilted leaf / orange ember dot / blue water drop] piece, floating mid-air at [ANGLE]deg, isolated perfectly transparent background, photorealistic LEGO render`

---

## 🔮 TRACK 5: CUSTOM / OPEN INNOVATION
*Palette: ALL COLORS — rainbow spectrum, pure chaos, neon multicolor*
*Concept: A LEGO explosion of pure creativity — every color brick flying outward from a single glowing mystery box, an inventor minifig with wild hair, gears and sparks everywhere*

---

#### ASSET TR5-BG — Custom Background: Exploding LEGO Idea Vault
**Layer**: Z-1 | **Parallax factor**: ×0.04
**Animation**: Rays rotate slowly (CSS rotateZ), colors cycle through rainbow hue-rotate, glow pulses in and out like a breathing light source
```
Destroyed LEGO mystery vault / idea box exploding outward, large open LEGO crate or chest with rainbow light rays bursting from inside in every direction, walls of the vault made from dark gray LEGO bricks now blown apart, colorful energy beams in red, blue, yellow, green, purple emanating from center, spectacular cinematic explosion of creativity, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail
```

---

#### ASSET TR5-MID — Custom Midground: Giant LEGO Question Mark Structure
**Layer**: Z-2 | **Parallax factor**: ×0.10
**Animation**: Slow rotateY 360° with perspective, glow color-cycles through rainbow (CSS hue-rotate filter), bobs up and down
```
Single giant LEGO question mark symbol built from colorful LEGO bricks, each brick a different bright color (red, blue, yellow, green, orange, purple), 3D extruded chunky toy construction, glowing from within with white light, dramatic and bold, isolated on perfectly transparent background, front-facing slightly isometric view, photorealistic LEGO toy render, ultra high detail, no base or floor
```

---

#### ASSET TR5-FG — Custom Foreground: Inventor Minifigure with Wild Hair
**Layer**: Z-3 | **Parallax factor**: ×0.20
**Animation**: Idle bob, hair piece vibrates (CSS scale + rotate fast loop), lightbulb in hand glows pulse, gear on belt spins
```
Single LEGO minifigure mad inventor character, front view, wild crazy rainbow-tipped hair piece sticking out in all directions, wearing a mismatched colorful patchwork jacket with gears and tools hanging off it, holding up a glowing LEGO lightbulb piece above their head, excited wide-eyed expression, isolated on perfectly transparent background, front-facing isometric view, photorealistic LEGO toy render, ultra high detail, no ground
```

---

#### ASSET TR5-FLOAT — Custom Floating Details: Rainbow Brick Burst
**Layer**: Z-4 | **Parallax factor**: ×0.35
**Animation**: Each brick erupts outward from a center point on card load (CSS keyframes translateX+Y from 0,0), then slowly orbit in perpetual circular paths at different radii
```
Eight individual LEGO 2x2 stud bricks, each a completely different bright color: red, cobalt blue, lime green, hot pink, bright orange, purple, white, and yellow, tumbling mid-air at extreme varied rotation angles, scattered with energy as if caught in an explosion, isolated on perfectly transparent background, each brick clearly separated, photorealistic LEGO toy render, ultra high detail
```

> **Split into 8 individual brick assets.** Prompt each: `Single LEGO 2x2 stud brick in [COLOR], bright saturated toy plastic, tumbling mid-air at [ANGLE]deg rotation, isolated perfectly transparent background, photorealistic LEGO render, ultra detail`

---

## 🎬 ANIMATION PLAN

### Global Layer System — Hero
The hero section uses a **multi-layer parallax compositor**:

| Z-Layer | Assets | Movement |
|---|---|---|
| Layer 0 (bg) | Brick grid pattern (CSS) | Mouse parallax ×0.02 |
| Layer 1 | Mushroom cloud H-01 | Mouse ×0.05 + scale pulse |
| Layer 2 | Buildings H-03, H-04 | Mouse ×0.10 + sway |
| Layer 3 | Fire glow H-02 | Mouse ×0.12 + flicker |
| Layer 4 | Vehicles H-05, H-06 | Mouse ×0.18 |
| Layer 5 | Rubble base H-11 | Static |
| Layer 6 | Minifigures H-08, H-09 | Mouse ×0.25 + bob |
| Layer 7 (fg) | Debris bricks H-10 | Mouse ×0.35 + rotate |

---

### Track Card Deep Animation System
Each track card is a **CSS `perspective: 800px` container** with 4 `position: absolute` image layers. On `mousemove` over the card, JS calculates cursor offset and applies `translate3d` to each layer at its unique factor. On `mouseleave`, spring-eases back to origin.

#### Track Card DOM Structure
```html
<div class="track-card" data-track="cyber">
  <div class="track-layer track-bg"    style="--pf: 0.04"> <!-- TR1-BG  -->
  <div class="track-layer track-mid"   style="--pf: 0.10"> <!-- TR1-MID -->
  <div class="track-layer track-fg"    style="--pf: 0.20"> <!-- TR1-FG  -->
  <div class="track-layer track-float" style="--pf: 0.35"> <!-- TR1-FLOAT ×6 -->
  <canvas class="track-particles"></canvas>               <!-- per-track canvas -->
  <div class="track-info">  <!-- title, description, CTA -->
</div>
```

#### Per-Track Depth Animation Breakdown

| Track | BG Layer (×0.04) | MID Layer (×0.10) | FG Layer (×0.20) | Float Layer (×0.35) | Particle System |
|---|---|---|---|---|---|
| **CyberSecurity** | Scan line sweep + crack pulse | LED blink + spark flash | Hoodie bob + typing wiggle | Binary tiles drift + blink | Matrix rain green dots falling |
| **FinTech** | Ticker scroll + red flicker | Vault door open on hover | Panic bob + screen glitch | Gold coins rain down | Gold sparkle dust upward |
| **Healthcare** | Heartbeat pulse + red flicker | DNA helix rotateY 360° | Doctor bob + coat flutter | Pill capsules spiral up | Red cross motes drift |
| **Sustainability** | Heat shimmer + crack glow | Turbine erratic spin + sway | Fist pulse + leaf drift | Leaves swirl + embers fall | Green leaf + ash particles |
| **Custom** | Rays rotate + hue cycle | Question mark rotateY + bob | Hair vibrate + bulb glow | Bricks orbit center point | Rainbow confetti explosion |

#### Shared Card Hover Lifecycle
```
mouseenter → card scales 1.02, shadow deepens, particle emitter activates
mousemove  → parallax offset calculated per layer using cursor delta
click      → card press-down (translateZ -20px) + all floats burst outward
mouseleave → spring-ease all layers back to origin over 600ms, particles fade
```

#### Per-Track Particle Canvas Configs
| Track | Particle Type | Count | Color | Behavior |
|---|---|---|---|---|
| CyberSecurity | Matrix `0` `1` characters | 30 | `#00FF41` | Fall downward, random column |
| FinTech | Circle coins | 20 | `#FFD700` | Rain + bounce at bottom |
| Healthcare | `+` cross symbols | 25 | `#FF2222` | Float upward and fade |
| Sustainability | Leaf + ember mix | 30 | `#4CAF50` / `#FF6600` | Leaves up, embers down |
| Custom | Colored squares | 40 | Rainbow cycle | Orbit center, random speed |

---

### Full Animation Type Reference
| Animation | CSS/JS Method | Assets |
|---|---|---|
| **Float bob** | `@keyframes` translateY loop | Minifigures, barrel, asteroid |
| **Parallax** | `mousemove` → `translate3d` | All hero + all track layers |
| **Glow pulse** | `@keyframes` box-shadow + filter:blur | Mushroom cloud, fire, logo, DNA, Q-mark |
| **Flicker** | `@keyframes` opacity random steps | Torch, fire, countdown, server LEDs |
| **Sway** | `@keyframes` rotate(-2deg, 2deg) | Buildings, satellite dish, turbine |
| **Spin** | `@keyframes` rotateY 360 | Trophy, gear, medal, DNA helix, Q-mark |
| **Scroll reveal** | Intersection Observer + translateY | All section elements |
| **Counter flip** | JS digit flip animation | Countdown timer |
| **Brick press** | CSS :active transform translateY | All buttons |
| **Marquee** | CSS animation translateX infinite | Caution tape |
| **Orbit** | `@keyframes` translateX + rotateZ | Custom track float bricks |
| **Hue rotate** | CSS `filter: hue-rotate` loop | Custom track ray background |
| **Spring ease** | JS `lerp()` on mouseleave | All track card layer resets |
| **Erratic spin** | JS random speed variation per frame | Sustainability turbine blades |
| **Scan line** | CSS `linear-gradient` translateY loop | CyberSecurity BG layer |
| **Glitch** | JS random translate + clip-path bursts | FinTech phone screen |

### Particle Systems (JS Canvas)
**Global hero canvas emits:**
- **Orange embers** — float upward from the ground with fade-out
- **Dust motes** — slow horizontal drift  
- **LEGO brick particles** — tiny brick silhouettes tumbling outward on page load

**Per-track canvases** (5 separate `<canvas>` elements, one per card) emit contextual particles as listed in the table above — pointer-events: none, z-index above all layers.

---

## 🗂️ FILE STRUCTURE

```
Hackify/
├── index.html
├── about.html
├── timeline.html
├── tracks.html
├── speakers.html
├── sponsors.html
├── contact.html
├── assets/
│   ├── css/
│   │   ├── reset.css
│   │   ├── tokens.css         ← Design tokens (colors, fonts, spacing)
│   │   ├── layout.css
│   │   ├── components.css
│   │   ├── animations.css
│   │   └── style.css          ← Main import file
│   ├── js/
│   │   ├── parallax.js        ← Mouse parallax engine
│   │   ├── particles.js       ← Canvas ember/dust system
│   │   ├── countdown.js       ← Countdown timer with flip
│   │   ├── scroll-reveal.js   ← Intersection observer animations
│   │   └── main.js
│   └── img/
│       ├── hero/              ← H-01 through H-11 transparent PNGs
│       ├── nav/               ← N-01, N-02, N-03
│       ├── decorative/        ← D-01 through D-06
│       ├── speakers/          ← S-01, S-02 + speaker photos
│       ├── prizes/            ← P-01, P-02, P-03
│       ├── countdown/         ← C-01, C-02
│       ├── timeline/          ← T-01, T-02
│       ├── register/          ← R-01, R-02, R-03
│       └── tracks/
│           ├── cyber/         ← TR1-BG, TR1-MID, TR1-FG, TR1-FLOAT×6
│           ├── fintech/       ← TR2-BG, TR2-MID, TR2-FG, TR2-FLOAT×7
│           ├── healthcare/    ← TR3-BG, TR3-MID, TR3-FG, TR3-FLOAT×5
│           ├── sustain/       ← TR4-BG, TR4-MID, TR4-FG, TR4-FLOAT×6
│           └── custom/        ← TR5-BG, TR5-MID, TR5-FG, TR5-FLOAT×8
```

---

## 📐 PAGE SECTIONS BREAKDOWN

### `index.html` — Hero
1. **Navbar** — LEGO brick logo (N-01) + transparent brick nav items, sticky
2. **Hero Stage** — Full-viewport layered scene with all H-xx assets
3. **Headline** — `"BUILD. BREAK. SURVIVE."` in Boogaloo with 3D brick shadow
4. **Subheadline** — Event name, date, location in Space Grotesk
5. **CTA Buttons** — Register (R-02 styled) + Learn More
6. **Countdown** — C-01 display panel + C-02 bomb decor
7. **Floating debris bricks** — H-10 set drifting across viewport

### `about.html` — Story
1. **Section header** with caution tape (D-06) divider
2. **Isometric LEGO diorama** — small scene built from D-xx assets
3. **Story text** with fire torch (D-03) accent
4. **Stats** (participants, prizes, hours) in LEGO display panels

### `timeline.html`
1. **Horizontal scrolling road** of T-02 tiles with checkpoints
2. **Minifig flag markers** (T-01) at each event milestone
3. **Event cards** in LEGO brick frame style
4. **Gear (D-02)** decorating the timeline rail

### `tracks.html`
1. **5 Track cards** — each is a full `perspective` parallax diorama container
2. **4 depth layers per card** — BG, MID, FG, FLOAT PNGs at different Z-depths
3. **Per-track particle canvas** emitting unique contextual particles
4. **Card hover system** — 3D tilt + layer parallax + particle burst on click
5. **Radioactive barrels** (D-04) and caution tape (D-06) as section separators
6. **Scroll-reveal** — cards enter staggered from bottom with spring easing

#### Track Cards Order & Color Accent
| # | Track | Accent Color | Minifig |
|---|---|---|---|
| 1 | 🔐 CyberSecurity | `#00FF41` neon green | TR1-FG hooded hacker |
| 2 | 💳 FinTech | `#FFD700` gold | TR2-FG panicked banker |
| 3 | 🏥 Healthcare | `#FF2222` medical red | TR3-FG doctor |
| 4 | ♻️ Sustainability | `#4CAF50` eco green | TR4-FG eco-warrior |
| 5 | 🔮 Custom | Rainbow hue-rotate | TR5-FG inventor |

### `speakers.html`
1. **Speaker cards** using S-01 frame around real photo
2. **Name plates** S-02 below each photo
3. **Trophy** P-01 beside section header

### `sponsors.html`
1. **Sponsor tier cards** styled as LEGO brick tiers (bigger bricks = higher tier)
2. **Logo slots** on LEGO tiles

### `contact.html`
1. **LEGO laptop** R-01 beside contact form
2. **Big CTA register button** R-02
3. **Rocket** R-03 floating beside form
4. **LEGO brick input fields** — dark tile aesthetic with stud accents

---

## ✅ Open Questions / Decisions Needed

> [!IMPORTANT]
> **Event Details**: What is the hackathon name (Hackify?), date, venue, and theme tagline? This affects all text assets.

> [!IMPORTANT]
> **Pages needed**: Do you need all 7 pages or a single long-scroll landing page?

> [!WARNING]
> **Speakers/Sponsors**: Do you have real speaker photos and sponsor logos yet? S-01 frame requires real photos inside.

> [!NOTE]
> **Registration**: Is there a form/backend for registration, or just a link to Devfolio/Unstop/Google Form?

> [!NOTE]
> **IEEE branding**: Should IEEE, ITSS, SPS logos appear? If yes, they'll need to coexist with the LEGO theme without clashing.
