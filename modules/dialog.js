// Das Fenster mit dem Inhalt eines Türchens.

import { $, el, REDUCED_MOTION } from './dom.js';

let dialog = null;

export function initDialog() {
  dialog = $('#door-dialog');
  $('#d-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

function entryFor(calendar, n) {
  const entry = calendar.doors && calendar.doors[n];
  return entry || {
    title: `Türchen ${n}`,
    text: 'Für dieses Türchen ist noch nichts hinterlegt. Trage Titel und Text im Ordner data ein.'
  };
}

function fill(calendar, n) {
  const entry = entryFor(calendar, n);
  dialog.style.setProperty('--c', calendar.color);
  $('#d-badge').textContent = String(n);
  $('#d-title').textContent = entry.title || `Türchen ${n}`;

  const text = $('#d-text');
  text.replaceChildren();
  (entry.text || '')
    .split(/\n{2,}/)
    .filter(Boolean)
    .forEach((paragraph) => text.append(el('p', '', paragraph)));

  const media = $('#d-media');
  media.replaceChildren();
  if (entry.image) {
    const img = el('img');
    img.src = entry.image;
    img.alt = entry.imageAlt || '';
    media.append(img);
  }

  const linkWrap = $('#d-link-wrap');
  if (entry.link && entry.link.url) {
    const link = $('#d-link');
    link.href = entry.link.url;
    link.textContent = entry.link.label || 'Mehr dazu';
    linkWrap.hidden = false;
  } else {
    linkWrap.hidden = true;
  }
}

// animated: beim ersten Öffnen kurz warten, bis die Tür aufgeschwungen ist.
export function showDoor(calendar, n, { animated = false } = {}) {
  fill(calendar, n);
  const open = () => {
    if (!dialog.open) dialog.showModal();
  };
  if (animated && !REDUCED_MOTION) setTimeout(open, 450);
  else open();
}
