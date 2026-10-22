// Merkt sich pro Benutzer und Kalender, welche Türchen schon offen waren.

const cache = {};
const storageKey = (user, calendar) => `advent:${user}:${calendar}`;

export function getOpened(user, calendar) {
  const key = storageKey(user, calendar);
  if (!cache[key]) {
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
      // Speicher nicht verfügbar: nur für diese Sitzung merken
    }
    cache[key] = Array.isArray(list) ? list : [];
  }
  return cache[key];
}

export function markOpened(user, calendar, n) {
  const list = getOpened(user, calendar);
  if (list.includes(n)) return;
  list.push(n);
  try {
    localStorage.setItem(storageKey(user, calendar), JSON.stringify(list));
  } catch (e) {
    // Speicher nicht verfügbar: nur für diese Sitzung merken
  }
}
