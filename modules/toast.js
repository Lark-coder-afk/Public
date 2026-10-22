// Kurzer Hinweis am unteren Rand.

import { $ } from './dom.js';

let timer = null;

export function toast(message) {
  const box = $('#toast');
  box.textContent = message;
  box.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => box.classList.remove('show'), 3200);
}
