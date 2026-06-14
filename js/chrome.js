/* ═══════════════════════════════════════════════════════════════════════
   Shared chrome — injects nav + footer, wires interactions, icon library.
   Every page: <body data-page="programs"> ... include config.js then this.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var S = window.STSA || {};

  /* ── Icon library (stroke, inherits currentColor) ─────────────────── */
  var I = {
    target:   '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>',
    calendar: '<rect x="3" y="4.5" width="18" height="16" rx="2"/><path d="M3 9h18M8 2.5v4M16 2.5v4"/>',
    users:    '<path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19"/><circle cx="10" cy="8" r="3.2"/><path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15 5.2a3.2 3.2 0 0 1 0 6"/>',
    home:     '<path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9.5h12V10"/>',
    check:    '<path d="m5 12.5 4.5 4.5L19 7"/>',
    pin:      '<path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z"/><circle cx="12" cy="10" r="2.6"/>',
    clock:    '<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 2"/>',
    mail:     '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6 8.5-6"/>',
    star:     '<path d="m12 3 2.6 5.7 6.2.7-4.6 4.2 1.3 6.1L12 16.8 6.5 19.7l1.3-6.1L3.2 9.4l6.2-.7Z"/>',
    arrow:    '<path d="M5 12h14M13 6l6 6-6 6"/>',
    bolt:     '<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/>',
    trophy:   '<path d="M7 4h10v3a5 5 0 0 1-10 0V4Z"/><path d="M7 5H4v1a3 3 0 0 0 3 3M17 5h3v1a3 3 0 0 1-3 3M9 14.5h6M12 11v3.5M8.5 20h7M10 17h4"/>',
    ball:     '<circle cx="12" cy="12" r="9"/><path d="M4.5 8.5C8 9 10 11 10.5 14.5M19.5 8.5C16 9 14 11 13.5 14.5"/>',
    facebook: '<path d="M14 8.5h2.2V5.4h-2.6c-2 0-3.4 1.3-3.4 3.6V11H8v3h2.2v7h3.1v-7h2.3l.4-3h-2.7V9.4c0-.6.3-.9 1-.9Z" fill="currentColor" stroke="none"/>',
    instagram:'<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17" cy="7" r="1.1" fill="currentColor" stroke="none"/>',
    dumbbell: '<path d="M6.5 6.5v11M3.5 9v6M17.5 6.5v11M20.5 9v6M6.5 12h11"/>',
    sparkle:  '<path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>'
  };
  function icon(name, cls) {
    return '<svg class="' + (cls || '') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' +
      'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (I[name] || '') + '</svg>';
  }
  window.icon = icon;

  /* ── Nav links ────────────────────────────────────────────────────── */
  var LINKS = [
    { href: 'index.html',       label: 'Home',        key: 'home' },
    { href: 'programs.html',    label: 'Programs',    key: 'programs' },
    { href: 'schedule.html',    label: 'Schedule',    key: 'schedule' },
    { href: 'lessons.html',     label: 'Lessons',     key: 'lessons' },
    { href: 'memberships.html', label: 'Memberships', key: 'memberships' },
    { href: 'facility.html',    label: 'Facility',    key: 'facility' },
    { href: 'about.html',       label: 'About',       key: 'about' },
    { href: 'contact.html',     label: 'Contact',     key: 'contact' }
  ];

  var page = (document.body && document.body.getAttribute('data-page')) || 'home';

  /* ── Render nav ───────────────────────────────────────────────────── */
  function navHTML() {
    var links = LINKS.map(function (l) {
      return '<a href="' + l.href + '"' + (l.key === page ? ' class="active"' : '') + '>' + l.label + '</a>';
    }).join('');
    return '' +
    '<nav class="nav" id="nav"><div class="container">' +
      '<a class="nav-brand" href="index.html">' +
        '<img src="assets/logo.png" alt="Small Town Sports Academy logo" />' +
        '<span><span class="nb-name">Small Town</span><br><span class="nb-sub">Sports Academy</span></span>' +
      '</a>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Toggle menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<div class="nav-links" id="navLinks">' + links +
        '<span class="nav-cta"><a class="btn btn-primary btn-sm" href="' + (S.bookUrl || '#') + '" target="_blank" rel="noopener">Register</a></span>' +
      '</div>' +
    '</div></nav>';
  }

  /* ── Render footer ────────────────────────────────────────────────── */
  function footerHTML() {
    var c = S.contact || {};
    var progLinks = (S.programs || []).map(function (p) {
      return '<a href="programs.html">' + p.name + '</a>';
    }).join('');
    return '' +
    '<footer class="footer"><div class="container">' +
      '<div class="footer-grid">' +
        '<div class="footer-about">' +
          '<div class="footer-brand"><img src="assets/logo.png" alt="logo"/>' +
            '<span><span class="fb-name">Small Town</span><br><span class="fb-sub">Sports Academy</span></span></div>' +
          '<p>' + (S.blurb || '') + '</p>' +
          '<div class="footer-social">' +
            '<a href="' + (c.facebook || '#') + '" target="_blank" rel="noopener" aria-label="Facebook">' + icon('facebook') + '</a>' +
            '<a href="mailto:' + (c.email || '') + '" aria-label="Email">' + icon('mail') + '</a>' +
          '</div>' +
          (S.sister ? '<a href="' + S.sister.url + '" target="_blank" rel="noopener" style="display:inline-block;margin-top:20px;font-family:var(--font-cond);text-transform:uppercase;letter-spacing:.07em;font-size:.72rem;color:var(--gold)">Part of the family — visit ' + S.sister.name + ' →</a>' : '') +
        '</div>' +
        '<div class="footer-col"><h5>Explore</h5>' +
          '<a href="programs.html">Programs</a><a href="schedule.html">Schedule</a>' +
          '<a href="lessons.html">Lessons</a><a href="memberships.html">Memberships</a>' +
          '<a href="facility.html">Facility</a><a href="coaches.html">Coaches</a><a href="about.html">About</a>' +
        '</div>' +
        '<div class="footer-col"><h5>Programs</h5>' + progLinks + '</div>' +
        '<div class="footer-col"><h5>Visit & Contact</h5>' +
          '<p>' + (c.address || '') + '</p>' +
          '<a href="mailto:' + (c.email || '') + '">' + (c.email || '') + '</a>' +
          '<p style="margin-top:14px">' + (c.owner || '') + '<br><span style="color:rgba(255,255,255,.45)">' + (c.ownerRole || '') + '</span></p>' +
          '<a class="btn btn-primary btn-sm" style="margin-top:8px" href="' + (S.bookUrl || '#') + '" target="_blank" rel="noopener">Register Now</a>' +
        '</div>' +
      '</div>' +
      '<div class="footer-bottom">' +
        '<span>© ' + 2026 + ' Small Town Sports Academy · Stephenville, Texas</span>' +
        '<span>Online registration powered by UpperHand</span>' +
      '</div>' +
    '</div></footer>';
  }

  /* ── Inject ───────────────────────────────────────────────────────── */
  function mount() {
    var navMount = document.getElementById('site-nav');
    var footMount = document.getElementById('site-footer');
    if (navMount) navMount.outerHTML = navHTML();
    if (footMount) footMount.outerHTML = footerHTML();
    wire();
  }

  /* ── Interactions: scroll nav, mobile toggle, reveal, count-up ────── */
  function wire() {
    var nav = document.getElementById('nav');
    var onScroll = function () { if (nav) nav.classList.toggle('scrolled', window.scrollY > 24); };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

    var toggle = document.getElementById('navToggle');
    var links = document.getElementById('navLinks');
    if (toggle && links) {
      toggle.addEventListener('click', function () {
        var open = links.classList.toggle('open');
        toggle.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      links.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () { links.classList.remove('open'); toggle.classList.remove('open'); });
      });
    }

    // Reveal on scroll
    var revs = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && revs.length) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
      revs.forEach(function (el) { io.observe(el); });
    } else { revs.forEach(function (el) { el.classList.add('in'); }); }

    // Count-up
    var counters = document.querySelectorAll('[data-count]');
    if ('IntersectionObserver' in window && counters.length) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    } else { counters.forEach(function (el) { el.textContent = el.getAttribute('data-count'); }); }
  }

  function countUp(el) {
    var target = parseInt(el.getAttribute('data-count'), 10) || 0;
    var raw = el.getAttribute('data-raw') === '1';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1400, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = Math.round(target * eased);
      el.innerHTML = (raw ? val : val.toLocaleString()) + (suffix ? '<span class="suffix">' + suffix + '</span>' : '');
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
