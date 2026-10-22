// Ein Kalender mit seinen 24 Türchen.

import { $, el } from '../dom.js';
import { DOORS } from '../../data/settings.js';
import { PREVIEW, isUnlocked, formatLong, formatShort } from '../dates.js';
import { getOpened, markOpened } from '../progress.js';
import { doorOrder } from '../shuffle.js';
import { showDoor } from '../dialog.js';
import { toast } from '../toast.js';
import { showView, focusHeading } from '../view.js';

let context = null; // { user, calendar } der gerade offenen Ansicht

function updateCount() {
  const { user, calendar } = context;
  $('#cal-count').textContent = `${getOpened(user.name, calendar.id).length} von ${DOORS} geöffnet`;
}

function syncDoor(button, n) {
  const { user, calendar } = context;
  const opened = getOpened(user.name, calendar.id).includes(n);
  const unlocked = isUnlocked(n);

  button.classList.toggle('open', opened);
  button.classList.toggle('locked', !unlocked);
  button.setAttribute(
    'aria-label',
    opened
      ? `Türchen ${n}, geöffnet. Noch einmal ansehen`
      : unlocked
        ? `Türchen ${n} öffnen`
        : `Türchen ${n}, öffnet sich am ${formatLong(n)}`
  );
}

function buildDoor(n) {
  const button = el('button', 'door-btn');
  button.type = 'button';
  button.dataset.n = String(n);

  const inside = el('span', 'door-in', '✦');
  inside.setAttribute('aria-hidden', 'true');

  const front = el('span', 'door-front');
  front.setAttribute('aria-hidden', 'true');
  front.append(el('span', 'door-n', String(n)));
  if (!isUnlocked(n)) front.append(el('span', 'when', formatShort(n)));

  button.append(inside, front);
  syncDoor(button, n);

  const item = el('li');
  item.append(button);
  return item;
}

function onDoorClick(event) {
  const button = event.target.closest('.door-btn');
  if (!button || !context) return;

  const n = Number(button.dataset.n);
  const { user, calendar } = context;

  if (!isUnlocked(n)) {
    toast(`Türchen ${n} öffnet sich am ${formatLong(n)}.`);
    button.classList.remove('shake');
    void button.offsetWidth; // Animation neu starten
    button.classList.add('shake');
    return;
  }

  const firstTime = !getOpened(user.name, calendar.id).includes(n);
  if (firstTime) {
    markOpened(user.name, calendar.id, n);
    syncDoor(button, n);
    updateCount();
  }

  showDoor(calendar, n, { animated: firstTime });
}

export function initCalendar() {
  $('#doors').addEventListener('click', onDoorClick);
}

export function showCalendar(user, calendar) {
  context = { user, calendar };

  const view = $('#view-calendar');
  view.style.setProperty('--c', calendar.color);
  view.style.setProperty('--ink', calendar.ink);

  $('#cal-title').textContent = calendar.title;
  $('#cal-sub').textContent = calendar.subtitle || '';
  $('#preview-note').hidden = !PREVIEW;
  updateCount();

  const grid = $('#doors');
  grid.replaceChildren(...doorOrder(calendar.id).map(buildDoor));

  showView('calendar');
  focusHeading('#cal-title');
}
