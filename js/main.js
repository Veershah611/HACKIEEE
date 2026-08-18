/* =====================================================================
   HackIEEE 2026 — interaction layer
   Vanilla JS, no dependencies.

   The centrepiece is a real 3D LEGO brick built from CSS transforms:
   six faces forming a cuboid, plus studs made of a top disc and a
   segmented cylinder wall. Geometry is generated here so bricks can be
   described declaratively as {cols, rows, colour, level}.
   ===================================================================== */
(function () {
  'use strict';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* =====================================================================
     BRICK GEOMETRY
     ===================================================================== */

  var BRICK_H = 1.2;   // brick height in stud pitches (real LEGO ratio)
  var STUD_D  = 0.62;  // stud diameter
  var STUD_H  = 0.20;  // stud height
  var SEGMENTS = 8;    // sides used to fake each stud cylinder

  function el(cls, css) {
    var n = document.createElement('div');
    n.className = cls;
    if (css) n.style.cssText = css;
    return n;
  }

  /**
   * Build one brick as a six-faced cuboid with studs on top.
   * @param {object} spec  {cols, rows, color, u, skipStuds:[{x,z,w,d}]}
   * @returns {HTMLElement} positioned at its own centre
   */
  function makeBrick(spec) {
    var u = spec.u;
    var w = spec.cols * u;          // x
    var d = spec.rows * u;          // z
    var h = BRICK_H * u;            // y

    var brick = el('brick');
    brick.style.setProperty('--c', spec.color);

    // ---- six faces -------------------------------------------------
    var faces = [
      ['front',  w, h, 'translateZ(' + (d / 2) + 'px)'],
      ['back',   w, h, 'rotateY(180deg) translateZ(' + (d / 2) + 'px)'],
      ['right',  d, h, 'rotateY(90deg) translateZ(' + (w / 2) + 'px)'],
      ['left',   d, h, 'rotateY(-90deg) translateZ(' + (w / 2) + 'px)'],
      ['top',    w, d, 'rotateX(90deg) translateZ(' + (h / 2) + 'px)'],
      ['bottom', w, d, 'rotateX(-90deg) translateZ(' + (h / 2) + 'px)']
    ];

    faces.forEach(function (f) {
      brick.appendChild(el(
        'face face--' + f[0],
        'width:' + f[1] + 'px;height:' + f[2] + 'px;' +
        'transform:translate(-50%,-50%) ' + f[3] + ';'
      ));
    });

    // ---- studs -----------------------------------------------------
    var sd = STUD_D * u, sh = STUD_H * u, rad = sd / 2;
    var segW = (2 * Math.PI * rad / SEGMENTS) * 1.08;   // slight overlap hides seams

    for (var c = 0; c < spec.cols; c++) {
      for (var r = 0; r < spec.rows; r++) {
        var sx = (c - (spec.cols - 1) / 2) * u;
        var sz = (r - (spec.rows - 1) / 2) * u;

        // skip studs that the next brick up sits on — they are invisible
        if (isCovered(sx, sz, spec.skipStuds)) continue;

        var stud = el('stud', 'transform:translate3d(' + sx + 'px,' + (-h / 2) + 'px,' + sz + 'px);');

        stud.appendChild(el(
          'stud__top',
          'width:' + sd + 'px;height:' + sd + 'px;' +
          'transform:translate(-50%,-50%) translateY(' + (-sh) + 'px) rotateX(90deg);'
        ));

        var wall = el('stud__wall');
        for (var i = 0; i < SEGMENTS; i++) {
          wall.appendChild(el('seg',
            'width:' + segW + 'px;height:' + sh + 'px;' +
            'transform:translate(-50%,-50%) translateY(' + (-sh / 2) + 'px) ' +
            'rotateY(' + (i * 360 / SEGMENTS) + 'deg) translateZ(' + rad + 'px);'
          ));
        }
        stud.appendChild(wall);
        brick.appendChild(stud);
      }
    }

    return brick;
  }

  function isCovered(x, z, boxes) {
    if (!boxes) return false;
    for (var i = 0; i < boxes.length; i++) {
      var b = boxes[i];
      if (x > b.x - b.w / 2 - 0.01 && x < b.x + b.w / 2 + 0.01 &&
          z > b.z - b.d / 2 - 0.01 && z < b.z + b.d / 2 + 0.01) return true;
    }
    return false;
  }

  /**
   * Stack several bricks, bottom level first, and return their elements.
   * Each spec: {cols, rows, color, x, z} where x/z are stud-pitch offsets.
   */
  function buildStack(host, specs, u) {
    host.innerHTML = '';
    var h = BRICK_H * u;
    var levels = specs.length;
    var made = [];

    specs.forEach(function (s, i) {
      var above = specs[i + 1];
      var skip = above ? [{
        x: (above.x || 0) * u,
        z: (above.z || 0) * u,
        w: above.cols * u,
        d: above.rows * u
      }] : null;

      var brick = makeBrick({
        cols: s.cols, rows: s.rows, color: s.color, u: u, skipStuds: skip
      });

      // level 0 sits at the bottom; the whole stack is centred on the origin.
      // CSS +Y points down, so level 0 takes the largest positive offset.
      var ty = (levels * h) / 2 - (i + 0.5) * h;
      var tx = (s.x || 0) * u;
      var tz = (s.z || 0) * u;
      var t = 'translate3d(' + tx + 'px,' + ty + 'px,' + tz + 'px)';

      brick.style.transform = t;
      brick.dataset.rest = t;
      host.appendChild(brick);
      made.push(brick);
    });

    return made;
  }

  /* =====================================================================
     HERO STACK + INTRO
     ===================================================================== */

  // bottom → top. Colours are the LEGO Marvel character palette.
  var HERO_SPEC = [
    { cols: 6, rows: 3, color: '#0A3463', x: 0,    z: 0 },   // Dark Blue
    { cols: 4, rows: 2, color: '#C91A09', x: -0.5, z: 0.5 }, // Bright Red
    { cols: 3, rows: 2, color: '#F2CD37', x: 0.5,  z: -0.5 },// Bright Yellow
    { cols: 2, rows: 2, color: '#0055BF', x: -0.5, z: 0 },   // Bright Blue
    { cols: 2, rows: 2, color: '#4B9F4A', x: 1,    z: 0.5 }  // Bright Green
  ];

  function heroUnit() {
    var w = innerWidth;
    if (w < 560) return 22;
    if (w < 900) return 28;
    if (w < 1200) return 30;
    return 36;
  }

  function hero() {
    var stack = $('#stack'), stage = $('#stage'), intro = $('#intro');
    if (!stack) return;

    var bricks = buildStack(stack, HERO_SPEC, heroUnit());

    // rebuild on resize so the stack scales with the layout
    var rw = innerWidth;
    addEventListener('resize', function () {
      if (Math.abs(innerWidth - rw) < 60) return;
      if (document.body.classList.contains('intro-active')) return;  // don't cut the build short
      rw = innerWidth;
      buildStack(stack, HERO_SPEC, heroUnit());
      stack.classList.add('live');
    }, { passive: true });

    // Skip the intro outright when it cannot be shown properly: reduced
    // motion, no Web Animations support, or a tab that starts hidden
    // (browsers freeze the document timeline there, so the choreography
    // would otherwise queue up and replay at the wrong moment on focus).
    if (reduced || !intro || document.hidden || typeof stage.animate !== 'function') {
      finish();
      return;
    }

    document.body.classList.add('intro-active', 'staged');

    var stepEl = $('#introStep'), barEl = $('#introBar');

    /* ------------------------------------------------------------------
       Choreography follows the Classic Space site's motion vocabulary:
       one long, slow camera move (its hero uses a 3s zoom) while pieces
       drift in from a long way off and settle. Nothing snaps or ticks —
       the entries overlap heavily so it reads as a single flowing shot.
       ------------------------------------------------------------------ */
    var SOFT = 'cubic-bezier(.16,1,.3,1)';   // long, heavily eased settle
    var STAGGER = 210;                       // gap between brick entries
    var FLIGHT  = 1300;                      // one brick's travel time
    var CAMERA  = 3700;                      // full zoom-out
    var LANDED  = (bricks.length - 1) * STAGGER + FLIGHT;

    // where the stack has to sit for the build, vs its layout slot
    var r = stage.getBoundingClientRect();
    var dx = (innerWidth / 2) - (r.left + r.width / 2);
    var dy = (innerHeight / 2) - (r.top + r.height / 2);
    var near = innerWidth < 900 ? 1.35 : 1.75;   // opening zoom level

    stage.classList.add('building');

    /* Every animation below uses fill:'backwards', never 'both'. The
       finished state of the model is its ordinary CSS/inline state, so the
       animations are a purely transient departure from it. If the document
       timeline is ever stalled or interrupted — a backgrounded tab during
       load, say — the page still settles on the fully built model rather
       than being stuck on an invisible first keyframe. */

    // camera: start close on the baseplate, pull back the whole time, then
    // glide across to the layout position on the same curve
    var cam = stage.animate([
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + near + ')', easing: SOFT, offset: 0 },
      { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(1.05)', easing: 'cubic-bezier(.6,0,.3,1)', offset: .66 },
      { transform: 'translate(0px,0px) scale(1)', offset: 1 }
    ], { duration: CAMERA, fill: 'backwards' });

    // the model turns towards the viewer as it is assembled, finishing on
    // exactly the angle .stack rests at, so the handover to the idle sway
    // is seamless
    var turn = stack.animate([
      { transform: 'rotateX(-4deg) rotateY(-96deg)' },
      { transform: 'rotateX(-22deg) rotateY(-34deg)' }
    ], { duration: CAMERA * .86, easing: SOFT, fill: 'backwards' });

    // each brick arrives from its own direction, from a long way out
    var VECTORS = [
      { x: -640, y: -230, z: -260, rz: -18, ry:  46 },
      { x:  600, y: -330, z: -180, rz:  15, ry: -40 },
      { x: -500, y: -430, z: -220, rz: -12, ry:  32 },
      { x:  540, y: -390, z: -160, rz:  11, ry: -28 },
      { x:  -70, y: -580, z: -300, rz:  -6, ry:  20 }
    ];

    var flights = bricks.map(function (b, i) {
      var rest = b.dataset.rest;
      var v = VECTORS[i % VECTORS.length];

      var a = b.animate([
        { offset: 0, opacity: 0,
          transform: rest + ' translate3d(' + v.x + 'px,' + v.y + 'px,' + v.z + 'px)' +
                     ' rotateZ(' + v.rz + 'deg) rotateY(' + v.ry + 'deg)' },
        { offset: .35, opacity: 1 },
        { offset: .88, opacity: 1,
          transform: rest + ' translate3d(0,-9px,0) rotateZ(0deg) rotateY(0deg)' },
        { offset: 1, opacity: 1, transform: rest }
      ], { duration: FLIGHT, delay: i * STAGGER, easing: SOFT, fill: 'backwards' });

      // instruction-booklet counter, driven by the animation rather than
      // the clock so it always matches what is actually on screen
      a.finished.then(function () {
        if (stepEl) stepEl.textContent = String(i + 1).padStart(2, '0');
        if (barEl) barEl.style.width = ((i + 1) / bricks.length * 100) + '%';
      }).catch(function () {});

      return a;
    });

    /* Sequencing follows the animations' own timeline, not wall-clock
       timers — the two drift apart whenever the timeline is throttled.
       `settle` is idempotent and force-finishes everything, so the safety
       net below can always land the page on the finished model. */
    var everything = flights.concat([cam, turn]);
    var settled = false;

    function settle() {
      if (settled) return;
      settled = true;
      everything.forEach(function (a) { try { a.finish(); } catch (e) {} });
      finish();
    }

    // lift the scrim once the model is complete, while the camera is
    // still pulling back — the page arrives underneath a moving shot
    Promise.all(flights.map(function (a) { return a.finished; })).then(function () {
      if (settled) return;
      intro.classList.add('done');
      document.body.classList.remove('intro-active');
      $('#nav').classList.add('in');
      $$('[data-stage]').forEach(function (n, i) {
        setTimeout(function () { n.classList.add('in'); }, 120 * i);
      });
    }).catch(function () {});

    // hand the model over to the idle sway once the camera settles
    cam.finished.then(settle).catch(function () {});

    // safety net: if the timeline never advances, land on the built model
    setTimeout(settle, CAMERA + LANDED + 2000);

    function finish() {
      if (intro) intro.classList.add('done');
      document.body.classList.remove('intro-active');
      stage.classList.remove('building');
      stack.classList.add('live');
      $('#nav').classList.add('in');
      $$('[data-stage]').forEach(function (n) { n.classList.add('in'); });
    }
  }

  /* =====================================================================
     TRACK BRICKS — one small 3D brick per track card
     ===================================================================== */
  function trackBricks() {
    $$('.track').forEach(function (card, i) {
      var host = $('.track__brick', card);
      if (!host) return;

      var color = getComputedStyle(card).getPropertyValue('--c').trim() || '#C91A09';
      var wrap = el('stack');
      wrap.style.setProperty('--ry', (-34 + i * 5) + 'deg');
      host.appendChild(wrap);

      buildStack(wrap, [{ cols: 4, rows: 2, color: color, x: 0, z: 0 }], innerWidth < 560 ? 17 : 20);
    });
  }

  /* =====================================================================
     DOCK STUDS
     The nav brick has to keep real LEGO stud spacing at any width — a
     fixed count leaves 96px gaps on desktop and reads as dots, not a
     brick. Real spacing puts a gap of roughly two thirds of a stud
     between studs, so the count is derived from the dock's width.
     ===================================================================== */
  function dockStuds() {
    var row = $('.dock__studs');
    if (!row) return;

    function fill() {
      var w = row.getBoundingClientRect().width;
      if (!w) return;
      var pitch = innerWidth < 560 ? 36 : 43;   // stud + gap
      var n = Math.max(4, Math.round(w / pitch));
      if (+row.dataset.n === n) return;         // nothing to redraw

      row.dataset.n = n;
      row.textContent = '';
      var frag = document.createDocumentFragment();
      for (var i = 0; i < n; i++) frag.appendChild(document.createElement('i'));
      row.appendChild(frag);
    }

    fill();
    addEventListener('resize', fill, { passive: true });
  }

  /* =====================================================================
     SCROLL REVEALS
     ===================================================================== */
  function reveals() {
    var items = $$('[data-reveal]');
    if (!('IntersectionObserver' in window) || reduced) {
      items.forEach(function (n) { n.classList.add('in'); });
      return;
    }
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { threshold: .14, rootMargin: '0px 0px -6% 0px' });

    var seen = new Map();
    items.forEach(function (n) {
      var p = n.parentNode;
      var i = seen.get(p) || 0;
      n.style.transitionDelay = Math.min(i * 70, 350) + 'ms';
      seen.set(p, i + 1);
      io.observe(n);
    });
  }

  /* =====================================================================
     STAT COUNTERS
     ===================================================================== */
  function counters() {
    var nums = $$('[data-count]');
    if (!nums.length) return;

    var settle = function (n) { n.textContent = n.dataset.count + (n.dataset.suffix || ''); };
    if (!('IntersectionObserver' in window) || reduced) { nums.forEach(settle); return; }

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var n = e.target;
        io.unobserve(n);

        var target = parseFloat(n.dataset.count), suffix = n.dataset.suffix || '';
        var t0 = performance.now(), dur = 1300, done = false;

        // if rAF never runs, land on the final value anyway
        var guard = setTimeout(function () { if (!done) settle(n); }, dur + 500);

        requestAnimationFrame(function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          n.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(step);
          else { done = true; clearTimeout(guard); }
        });
      });
    }, { threshold: .5 });

    nums.forEach(function (n) { io.observe(n); });
  }

  /* =====================================================================
     NAV — sticky, drawer, scroll spy
     ===================================================================== */
  function nav() {
    var bar = $('#nav'), burger = $('#burger'), drawer = $('#drawer');

    addEventListener('scroll', function () {
      bar.classList.toggle('stuck', scrollY > 40);
    }, { passive: true });

    if (burger && drawer) {
      var toggle = function (open) {
        burger.setAttribute('aria-expanded', String(open));
        drawer.classList.toggle('open', open);
        drawer.setAttribute('aria-hidden', String(!open));
        document.body.style.overflow = open ? 'hidden' : '';
      };
      burger.addEventListener('click', function () {
        toggle(burger.getAttribute('aria-expanded') !== 'true');
      });
      $$('a', drawer).forEach(function (a) {
        a.addEventListener('click', function () { toggle(false); });
      });
      addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && drawer.classList.contains('open')) toggle(false);
      });
    }

    // Scroll spy from cached offsets — pure arithmetic per scroll event,
    // so instant jumps (anchor clicks, hash loads) can't miss a threshold.
    var links = $$('.nav__links a');
    var sections = links.map(function (a) { return $(a.getAttribute('href')); }).filter(Boolean);
    if (!sections.length) return;

    var bounds = [];
    function measure() {
      bounds = sections.map(function (s) {
        return { id: s.id, top: s.offsetTop, bottom: s.offsetTop + s.offsetHeight };
      });
    }
    function pick(line) {
      for (var i = 0; i < bounds.length; i++) {
        if (line >= bounds[i].top && line < bounds[i].bottom) return bounds[i].id;
      }
      var last = null;
      for (var j = 0; j < bounds.length; j++) if (line >= bounds[j].top) last = bounds[j].id;
      return last;
    }
    function spy() {
      var cur = pick(scrollY + innerHeight * 0.35);
      links.forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('href') === '#' + cur);
      });
    }

    addEventListener('scroll', spy, { passive: true });
    addEventListener('resize', function () { measure(); spy(); }, { passive: true });
    addEventListener('load', function () { measure(); spy(); });
    measure(); spy();
  }

  /* =====================================================================
     FAQ — one open at a time
     ===================================================================== */
  function faq() {
    var list = $$('#faqList details');
    list.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        list.forEach(function (o) { if (o !== d) o.open = false; });
      });
    });
  }

  /* =====================================================================
     LOGO PLACEHOLDERS — CS and SPS marks arrive later
     ===================================================================== */
  function logoFallbacks() {
    $$('.chapter__logo[data-fallback]').forEach(function (box) {
      var img = $('img', box);
      if (!img) return;
      var fail = function () { box.classList.add('empty'); };
      img.addEventListener('error', fail);
      if (img.complete && img.naturalWidth === 0) fail();   // already failed, no event coming
    });
  }

  /* =====================================================================
     ANCHORS — offset for the fixed nav
     ===================================================================== */
  function anchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = $(id);
        if (!t) return;
        e.preventDefault();
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 70, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  function init() {
    hero();
    dockStuds();
    trackBricks();
    reveals();
    counters();
    nav();
    faq();
    logoFallbacks();
    anchors();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
