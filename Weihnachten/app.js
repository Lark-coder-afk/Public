(() => {
  'use strict';

  const CFG = window.ADVENT_CONFIG;
  const DOORS = 24;
  const PREVIEW = new URLSearchParams(location.search).has('vorschau');
  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (sel, root = document) => root.querySelector(sel);
  const el = (tag, cls, text) => {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  };
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  /* ---------- Sitzung ---------- */

  let currentUser = null;
  try { currentUser = sessionStorage.getItem('advent-user'); } catch (e) { /* ignorieren */ }

  const findUser = (name) =>
    name ? CFG.users.find((u) => u.name.toLowerCase() === name.toLowerCase()) : null;

  function setSession(name) {
    currentUser = name;
    try {
      if (name) sessionStorage.setItem('advent-user', name);
      else sessionStorage.removeItem('advent-user');
    } catch (e) { /* ignorieren */ }
  }

  async function sha256(text) {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
  }

  /* ---------- Geöffnete Türchen merken ---------- */

  const cache = {};
  const storeKey = (user, cal) => `advent:${user}:${cal}`;

  function getOpened(user, cal) {
    const k = storeKey(user, cal);
    if (!cache[k]) {
      let list = [];
      try { list = JSON.parse(localStorage.getItem(k) || '[]'); } catch (e) { /* ignorieren */ }
      cache[k] = Array.isArray(list) ? list : [];
    }
    return cache[k];
  }

  function markOpened(user, cal, n) {
    const list = getOpened(user, cal);
    if (list.includes(n)) return;
    list.push(n);
    try { localStorage.setItem(storeKey(user, cal), JSON.stringify(list)); } catch (e) { /* ignorieren */ }
  }

  /* ---------- Datum ---------- */

  const unlockDate = (n) => new Date(new Date().getFullYear(), 11, n);
  const isUnlocked = (n) => PREVIEW || new Date() >= unlockDate(n);
  const dateFmt = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' });
  const shortFmt = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'numeric' });

  /* ---------- Feste, gemischte Reihenfolge pro Kalender ---------- */

  function seeded(seed) {
    let h = 1779033703 ^ seed.length;
    for (let i = 0; i < seed.length; i++) {
      h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return () => {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      h ^= h >>> 16;
      return (h >>> 0) / 4294967296;
    };
  }

  function doorOrder(seed) {
    const rand = seeded(seed);
    const list = Array.from({ length: DOORS }, (_, i) => i + 1);
    for (let i = list.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [list[i], list[j]] = [list[j], list[i]];
    }
    return list;
  }

  /* ---------- Ansichten ---------- */

  let ctx = null; // { user, cal } der geöffneten Kalenderansicht
  let firstRender = true;

  function show(name) {
    for (const v of ['login', 'home', 'calendar']) {
      $('#view-' + v).hidden = v !== name;
    }
  }

  function focusHeading(id) {
    if (firstRender) return;
    const h = $(id);
    if (h) h.focus({ preventScroll: true });
  }

  function route() {
    const user = findUser(currentUser);
    if (!user) {
      ctx = null;
      show('login');
      return;
    }
    const m = location.hash.match(/^#\/k\/([\w-]+)$/);
    const cal = m && CFG.calendars.find((c) => c.id === m[1]);
    if (cal) showCalendar(user, cal);
    else showHome(user);
    window.scrollTo(0, 0);
    firstRender = false;
  }

  function showHome(user) {
    ctx = null;
    $('#home-title').textContent = `Hallo ${user.display || cap(user.name)}`;

    const list = $('#tiles');
    list.replaceChildren();

    for (const cal of CFG.calendars) {
      const opened = getOpened(user.name, cal.id);
      const li = el('li');
      const a = el('a', 'tile');
      a.href = `#/k/${cal.id}`;
      a.style.setProperty('--c', cal.color);
      a.style.setProperty('--ink', cal.ink);

      const dots = el('span', 'dots');
      dots.setAttribute('aria-hidden', 'true');
      for (let n = 1; n <= DOORS; n++) {
        dots.append(el('i', opened.includes(n) ? 'on' : ''));
      }

      a.append(
        dots,
        el('span', 'tile-title', cal.title),
        el('span', 'tile-sub', cal.subtitle || ''),
        el('span', 'tile-count', `${opened.length} von ${DOORS} geöffnet`)
      );
      li.append(a);
      list.append(li);
    }

    show('home');
    focusHeading('#home-title');
  }

  function updateCount(user, cal) {
    $('#cal-count').textContent = `${getOpened(user.name, cal.id).length} von ${DOORS} geöffnet`;
  }

  function syncDoor(btn, user, cal, n) {
    const opened = getOpened(user.name, cal.id).includes(n);
    const unlocked = isUnlocked(n);
    btn.classList.toggle('open', opened);
    btn.classList.toggle('locked', !unlocked);
    btn.setAttribute(
      'aria-label',
      opened
        ? `Türchen ${n}, geöffnet. Noch einmal ansehen`
        : unlocked
          ? `Türchen ${n} öffnen`
          : `Türchen ${n}, öffnet sich am ${dateFmt.format(unlockDate(n))}`
    );
  }

  function showCalendar(user, cal) {
    ctx = { user, cal };
    const view = $('#view-calendar');
    view.style.setProperty('--c', cal.color);
    view.style.setProperty('--ink', cal.ink);

    $('#cal-title').textContent = cal.title;
    $('#cal-sub').textContent = cal.subtitle || '';
    $('#preview-note').hidden = !PREVIEW;
    updateCount(user, cal);

    const grid = $('#doors');
    grid.replaceChildren();

    for (const n of doorOrder(cal.id)) {
      const li = el('li');
      const btn = el('button', 'door-btn');
      btn.type = 'button';
      btn.dataset.n = String(n);

      const inner = el('span', 'door-in', '✦');
      inner.setAttribute('aria-hidden', 'true');

      const front = el('span', 'door-front');
      front.setAttribute('aria-hidden', 'true');
      front.append(el('span', 'door-n', String(n)));
      if (!isUnlocked(n)) front.append(el('span', 'when', shortFmt.format(unlockDate(n))));

      btn.append(inner, front);
      li.append(btn);
      grid.append(li);
      syncDoor(btn, user, cal, n);
    }

    show('calendar');
    focusHeading('#cal-title');
  }

  /* ---------- Türchen öffnen ---------- */

  const dialog = $('#door-dialog');
  let toastTimer = null;

  function toast(message) {
    const t = $('#toast');
    t.textContent = message;
    t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 3200);
  }

  function entryFor(cal, n) {
    const entry = cal.doors && cal.doors[n];
    return entry || {
      title: `Türchen ${n}`,
      text: 'Für dieses Türchen ist noch nichts hinterlegt. Trage Titel und Text in config.js ein.'
    };
  }

  function fillDialog(cal, n) {
    const entry = entryFor(cal, n);
    dialog.style.setProperty('--c', cal.color);
    $('#d-badge').textContent = String(n);
    $('#d-title').textContent = entry.title || `Türchen ${n}`;

    const text = $('#d-text');
    text.replaceChildren();
    (entry.text || '').split(/\n{2,}/).filter(Boolean).forEach((p) => text.append(el('p', '', p)));

    const media = $('#d-media');
    media.replaceChildren();
    if (entry.image) {
      const img = el('img');
      img.src = entry.image;
      img.alt = entry.imageAlt || '';
      media.append(img);
    }

    const wrap = $('#d-link-wrap');
    if (entry.link && entry.link.url) {
      const a = $('#d-link');
      a.href = entry.link.url;
      a.textContent = entry.link.label || 'Mehr dazu';
      wrap.hidden = false;
    } else {
      wrap.hidden = true;
    }
  }

  function onDoorClick(event) {
    const btn = event.target.closest('.door-btn');
    if (!btn || !ctx) return;
    const n = Number(btn.dataset.n);
    const { user, cal } = ctx;

    if (!isUnlocked(n)) {
      toast(`Türchen ${n} öffnet sich am ${dateFmt.format(unlockDate(n))}.`);
      btn.classList.remove('shake');
      void btn.offsetWidth;
      btn.classList.add('shake');
      return;
    }

    const firstTime = !getOpened(user.name, cal.id).includes(n);
    if (firstTime) {
      markOpened(user.name, cal.id, n);
      syncDoor(btn, user, cal, n);
      updateCount(user, cal);
    }

    fillDialog(cal, n);
    const openIt = () => { if (!dialog.open) dialog.showModal(); };
    if (firstTime && !REDUCED) setTimeout(openIt, 450);
    else openIt();
  }

  /* ---------- Anmeldung ---------- */

  const form = $('#login-form');
  const errorBox = $('#login-error');
  const loginBtn = $('#login-btn');
  const stage = $('#stage');

  function showError(message) {
    errorBox.textContent = message;
    errorBox.hidden = false;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorBox.hidden = true;

    const name = $('#user').value.trim().toLowerCase();
    const pw = $('#pw').value;

    if (!name || !pw) {
      showError('Gib Benutzername und Passwort ein.');
      return;
    }
    if (!(window.crypto && crypto.subtle)) {
      showError('Die Anmeldung funktioniert nur über https oder localhost.');
      return;
    }

    loginBtn.disabled = true;
    const hash = await sha256(`${CFG.salt}:${name}:${pw}`);
    await sleep(350);
    const user = CFG.users.find((u) => u.name.toLowerCase() === name && u.hash === hash);

    if (!user) {
      showError('Benutzername oder Passwort stimmt nicht. Prüfe beides und versuche es noch einmal.');
      loginBtn.disabled = false;
      $('#pw').select();
      return;
    }

    setSession(user.name);
    $('#pw').value = '';
    stage.classList.add('is-open');
    await sleep(REDUCED ? 0 : 1000);

    history.replaceState(null, '', location.pathname + location.search);
    route();
    stage.classList.remove('is-open');
    loginBtn.disabled = false;
  });

  $('#logout').addEventListener('click', () => {
    setSession(null);
    history.replaceState(null, '', location.pathname + location.search);
    route();
    $('#user').focus();
  });

  /* ---------- Start ---------- */

  $('#doors').addEventListener('click', onDoorClick);
  $('#d-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
  window.addEventListener('hashchange', route);

  route();
})();
