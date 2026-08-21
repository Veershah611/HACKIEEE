/* =====================================================================
   HackIEEE 2026 — interaction layer
   Vanilla JS, no dependencies, no build step.

   Everything here is deliberately 2D. Parallax writes to the `translate`
   property rather than `transform`, so it composes with the CSS keyframe
   transforms (sway, bob, tumble) instead of fighting them.
   ===================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Change this to the real kickoff. Format: YYYY-MM-DDTHH:mm:ss+05:30
  var EVENT_START = new Date('2026-12-21T16:00:00+05:30');

  /* =====================================================================
     DOCK STUDS
     Count is derived from width so the gap-to-stud ratio stays near LEGO's
     real 0.67 at any size — a fixed count leaves 90px gaps on desktop.
     ===================================================================== */
  function dockStuds() {
    var row = $('.dock__studs');
    if (!row) return;

    function fill() {
      var w = row.getBoundingClientRect().width;
      if (!w) return;                       // not laid out yet — RO will call back
      var pitch = innerWidth < 560 ? 36 : 43;
      var n = Math.max(4, Math.round(w / pitch));
      if (+row.dataset.n === n) return;
      row.dataset.n = n;
      row.textContent = '';
      var frag = document.createDocumentFragment();
      for (var i = 0; i < n; i++) frag.appendChild(document.createElement('i'));
      row.appendChild(frag);
    }

    // A plain init call can run before the dock has been laid out, and then
    // the zero-width guard would leave the brick permanently bald. Observing
    // the row means it fills itself the moment it has a real width, and
    // re-fills on every resize, with no polling.
    if ('ResizeObserver' in window) {
      new ResizeObserver(fill).observe(row);
    } else {
      addEventListener('load', fill);
      addEventListener('resize', fill, { passive: true });
    }
    fill();
  }

  /* =====================================================================
     PARALLAX
     One shared pointer listener drives every layer. Depth comes from each
     element's data-depth, so adding a plane needs no JS change.
     ===================================================================== */
  function parallax() {
    if (!fine || reduced) return;

    var groups = [
      { root: $('#diorama'), layers: $$('#diorama .pl'), scale: 1 },
    ];
    $$('.track').forEach(function (card) {
      groups.push({ root: card, layers: $$('.tl', card), scale: 1.4 });
    });

    groups.forEach(function (g) {
      if (!g.root || !g.layers.length) return;

      var raf = 0, tx = 0, ty = 0;

      function apply() {
        raf = 0;
        g.layers.forEach(function (el) {
          var d = (parseFloat(el.dataset.depth) || 10) / 100;
          el.style.translate = (tx * d * g.scale) + 'px ' + (ty * d * g.scale * 0.55) + 'px';
        });
      }

      function onMove(e) {
        var r = g.root.getBoundingClientRect();
        tx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2) * 42;
        ty = (e.clientY - (r.top + r.height / 2)) / (r.height / 2) * 26;
        if (!raf) raf = requestAnimationFrame(apply);
      }

      function onLeave() {
        tx = ty = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      }

      // the hero tracks the whole window; cards only track themselves
      var target = g.root.id === 'diorama' ? window : g.root;
      target.addEventListener('mousemove', onMove, { passive: true });
      g.root.addEventListener('mouseleave', onLeave, { passive: true });
    });
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
    }, { threshold: .12, rootMargin: '0px 0px -6% 0px' });

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
     HERO STAGE-IN
     ===================================================================== */
  function stageIn() {
    $('#nav').classList.add('in');
    $$('[data-stage]').forEach(function (n, i) {
      setTimeout(function () { n.classList.add('in'); }, reduced ? 0 : 90 * i);
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
     COUNTDOWN
     ===================================================================== */
  function countdown() {
    var root = $('#countdown');
    if (!root) return;
    var f = {
      d: $('[data-cd="d"]', root), h: $('[data-cd="h"]', root),
      m: $('[data-cd="m"]', root), s: $('[data-cd="s"]', root)
    };
    var pad = function (v) { return String(v).padStart(2, '0'); };

    function tick() {
      var diff = EVENT_START - Date.now();
      if (diff <= 0) { for (var k in f) f[k].textContent = '00'; return; }
      var s = Math.floor(diff / 1000);
      f.d.textContent = pad(Math.floor(s / 86400));
      f.h.textContent = pad(Math.floor(s / 3600) % 24);
      f.m.textContent = pad(Math.floor(s / 60) % 60);
      f.s.textContent = pad(s % 60);
    }
    tick();
    setInterval(tick, 1000);
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

    // Spy from cached offsets — pure arithmetic per scroll event, so instant
    // jumps (anchor clicks, hash loads) can never miss a threshold.
    var links = $$('.dock__links a');
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
     TIMELINE RAIL — drag to scroll
     ===================================================================== */
  function road() {
    var el = $('#road');
    if (!el) return;
    var down = false, startX = 0, startLeft = 0;

    el.addEventListener('pointerdown', function (e) {
      down = true; startX = e.clientX; startLeft = el.scrollLeft;
      el.classList.add('drag'); el.setPointerCapture(e.pointerId);
    });
    el.addEventListener('pointermove', function (e) {
      if (!down) return;
      el.scrollLeft = startLeft - (e.clientX - startX);
    });
    ['pointerup', 'pointercancel'].forEach(function (evt) {
      el.addEventListener(evt, function (e) {
        down = false; el.classList.remove('drag');
        try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      });
    });
    // vertical wheel scrolls sideways while the rail still has runway
    el.addEventListener('wheel', function (e) {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      var max = el.scrollWidth - el.clientWidth;
      var next = el.scrollLeft + e.deltaY;
      if (next > 0 && next < max) { e.preventDefault(); el.scrollLeft = next; }
    }, { passive: false });
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
    $$('.chip[data-fallback]').forEach(function (box) {
      var img = $('img', box);
      if (!img) return;
      var fail = function () { box.classList.add('empty'); };
      img.addEventListener('error', fail);
      if (img.complete && img.naturalWidth === 0) fail();  // already failed, no event coming
    });
  }

  /* =====================================================================
     ANCHORS — offset for the floating dock
     ===================================================================== */
  function anchors() {
    $$('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var id = a.getAttribute('href');
        if (id.length < 2) return;
        var t = $(id);
        if (!t) return;
        e.preventDefault();
        scrollTo({ top: t.getBoundingClientRect().top + scrollY - 78, behavior: reduced ? 'auto' : 'smooth' });
      });
    });
  }

  function init() {
    dockStuds();
    stageIn();
    parallax();
    reveals();
    counters();
    countdown();
    nav();
    road();
    faq();
    logoFallbacks();
    anchors();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
