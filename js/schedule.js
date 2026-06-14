/* ═══════════════════════════════════════════════════════════════════════
   Live schedule — pulls upcoming sessions straight from UpperHand on load.
   The UpperHand API is CORS-open and needs no key, just an X-Customer-Id
   header, so this runs entirely in the browser on a static host. If the live
   fetch fails (offline / API change) it falls back to data/schedule.json.
   ═══════════════════════════════════════════════════════════════════════ */
(function () {
  var S = window.STSA || {};
  var UH = S.upperhand || { api: 'https://api.upperhand.io/api', customerId: '1830', tz: 'America/Chicago' };
  var TZ = UH.tz || 'America/Chicago';
  var icon = window.icon || function () { return ''; };

  var mount = document.getElementById('scheduleMount');
  var metaEl = document.getElementById('scheduleMeta');
  if (!mount) return;

  function headers() { return { 'Accept': 'application/json', 'X-Customer-Id': String(UH.customerId) }; }
  function jget(path) {
    return fetch(UH.api + path, { headers: headers() }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status); return r.json();
    });
  }

  /* ── Load: try live, else fallback snapshot ───────────────────────── */
  function loadLive() {
    return jget('/events?per_page=100').then(function (d) {
      var events = (d.events || []).filter(function (e) { return e.status === 'active'; });
      if (!events.length) return { sessions: [], live: true };
      return Promise.all(events.map(function (e) {
        return jget('/sessions?event_ids%5B%5D=' + e.id + '&per_page=100')
          .then(function (sd) {
            return (sd.sessions || []).map(function (s) {
              return { eventId: e.id, title: e.title, url: e.url, price: e.price,
                       singlePrice: e.single_session_price, start: s.starts_at, end: s.ends_at,
                       spots: s.spots_remaining, status: s.status };
            });
          }).catch(function () { return []; });
      })).then(function (lists) {
        return { sessions: [].concat.apply([], lists), live: true };
      });
    });
  }
  function loadFallback() {
    return fetch('data/schedule.json').then(function (r) { return r.json(); })
      .then(function (d) { return { sessions: d.sessions || [], live: false, generatedAt: d.generatedAt }; });
  }

  mount.innerHTML = '<div class="sched-loading">Loading the latest schedule…</div>';
  loadLive().catch(function () { return loadFallback(); }).then(render).catch(function (err) {
    mount.innerHTML = '<div class="sched-empty"><p>We couldn’t load the live schedule right now.</p>' +
      '<a class="btn btn-gold" href="' + (S.bookUrl || '#') + '" target="_blank" rel="noopener">See all offerings on UpperHand ' + icon('arrow') + '</a></div>';
  });

  /* ── Formatters (always render in the academy's timezone) ─────────── */
  var fDate = new Intl.DateTimeFormat('en-US', { timeZone: TZ, weekday: 'long', month: 'short', day: 'numeric' });
  var fTime = new Intl.DateTimeFormat('en-US', { timeZone: TZ, hour: 'numeric', minute: '2-digit' });
  var fKey  = new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' });
  function cat(title) {
    var t = (title || '').toLowerCase();
    if (t.indexOf('clinic') > -1) return 'Clinic';
    if (t.indexOf('camp') > -1) return 'Camp';
    if (t.indexOf('lesson') > -1) return 'Lesson';
    return 'Session';
  }
  function todayKey() { return fKey.format(new Date()); }
  function relLabel(key) {
    // days between today and key (both 'YYYY-MM-DD')
    var a = new Date(todayKey() + 'T00:00:00'), b = new Date(key + 'T00:00:00');
    var diff = Math.round((b - a) / 86400000);
    if (diff === 0) return 'Today';
    if (diff === 1) return 'Tomorrow';
    if (diff > 1 && diff <= 7) return 'This week';
    return '';
  }

  function render(data) {
    var now = Date.now();
    var sessions = (data.sessions || []).filter(function (s) {
      return s.start && new Date(s.end || s.start).getTime() >= now;
    });
    sessions.sort(function (a, b) { return new Date(a.start) - new Date(b.start); });

    // status pill
    if (metaEl) {
      metaEl.innerHTML =
        '<span class="sched-live"><span class="dot' + (data.live ? '' : ' stale') + '"></span>' +
          (data.live ? 'Live from our booking system' : 'Showing a saved schedule') + '</span>' +
        '<span>Times shown in Central (CT)</span>' +
        '<span>' + sessions.length + ' upcoming session' + (sessions.length === 1 ? '' : 's') + '</span>';
    }

    if (!sessions.length) {
      mount.innerHTML = '<div class="sched-empty"><p>No sessions are on the calendar right now — new camps and clinics post here as soon as they open.</p>' +
        '<a class="btn btn-gold" href="' + (S.bookUrl || '#') + '" target="_blank" rel="noopener">Browse all offerings ' + icon('arrow') + '</a></div>';
      return;
    }

    // group by day (in TZ)
    var groups = [], byKey = {};
    sessions.forEach(function (s) {
      var d = new Date(s.start), k = fKey.format(d);
      if (!byKey[k]) { byKey[k] = { key: k, date: d, rows: [] }; groups.push(byKey[k]); }
      byKey[k].rows.push(s);
    });

    mount.innerHTML = groups.map(function (g) {
      var rel = relLabel(g.key);
      var head = '<div class="sched-date"><span class="dow">' + fDate.format(g.date).split(',')[0] + '</span>' +
        '<span>' + fDate.format(g.date).split(', ').slice(1).join(', ') + '</span>' +
        (rel ? '<span class="rel">' + rel + '</span>' : '') + '</div>';
      var rows = g.rows.map(function (s) {
        var time = fTime.format(new Date(s.start)) + ' – ' + fTime.format(new Date(s.end));
        var low = (typeof s.spots === 'number' && s.spots <= 12);
        var badge = (typeof s.spots === 'number')
          ? '<span class="sbadge ' + (low ? 'low' : 'open') + '">' + (low ? s.spots + ' spots left' : 'Open') + '</span>'
          : '<span class="sbadge open">Open</span>';
        return '<div class="srow"><div class="stime">' + time + '</div>' +
          '<div><div class="sprog">' + s.title + '</div><div class="scat">' + cat(s.title) + '</div></div>' +
          badge +
          '<a class="sreg" href="' + s.url + '" target="_blank" rel="noopener">Register ' + icon('arrow') + '</a></div>';
      }).join('');
      return '<div class="sched-day reveal in">' + head + rows + '</div>';
    }).join('');
  }
})();
