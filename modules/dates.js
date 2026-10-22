// Wann sich welches Türchen öffnet.

// Mit ?vorschau in der Adresse sind alle Türchen freigeschaltet.
export const PREVIEW = new URLSearchParams(location.search).has('vorschau');

export const unlockDate = (n) => new Date(new Date().getFullYear(), 11, n);

export const isUnlocked = (n) => PREVIEW || new Date() >= unlockDate(n);

const longFormat = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'long' });
const shortFormat = new Intl.DateTimeFormat('de-DE', { day: 'numeric', month: 'numeric' });

export const formatLong = (n) => longFormat.format(unlockDate(n));
export const formatShort = (n) => shortFormat.format(unlockDate(n));
