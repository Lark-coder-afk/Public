// Umschalten zwischen den drei Ansichten.

import { $ } from './dom.js';

const VIEWS = ['login', 'home', 'calendar'];
let firstRender = true;

export function showView(name) {
  for (const view of VIEWS) {
    $('#view-' + view).hidden = view !== name;
  }
}

// Setzt den Fokus auf die Überschrift, damit Screenreader den Wechsel mitbekommen.
// Beim allerersten Laden bleibt der Fokus unangetastet.
export function focusHeading(selector) {
  if (firstRender) return;
  const heading = $(selector);
  if (heading) heading.focus({ preventScroll: true });
}

export function markRendered() {
  firstRender = false;
}
