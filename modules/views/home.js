// Übersicht mit den Kalender-Feldern.

import { $, el, capitalize } from '../dom.js';
import { DOORS } from '../../data/settings.js';
import { calendars } from '../../data/calendars/index.js';
import { getOpened } from '../progress.js';
import { showView, focusHeading } from '../view.js';

export function showHome(user) {
  $('#home-title').textContent = `Hallo ${user.display || capitalize(user.name)}`;

  const list = $('#tiles');
  list.replaceChildren();

  for (const calendar of calendars) {
    const opened = getOpened(user.name, calendar.id);

    const link = el('a', 'tile');
    link.href = `#/k/${calendar.id}`;
    link.style.setProperty('--c', calendar.color);
    link.style.setProperty('--ink', calendar.ink);

    const dots = el('span', 'dots');
    dots.setAttribute('aria-hidden', 'true');
    for (let n = 1; n <= DOORS; n++) {
      dots.append(el('i', opened.includes(n) ? 'on' : ''));
    }

    link.append(
      dots,
      el('span', 'tile-title', calendar.title),
      el('span', 'tile-sub', calendar.subtitle || ''),
      el('span', 'tile-count', `${opened.length} von ${DOORS} geöffnet`)
    );

    const item = el('li');
    item.append(link);
    list.append(item);
  }

  showView('home');
  focusHeading('#home-title');
}
