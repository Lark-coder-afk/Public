// Einstiegspunkt: verbindet Anmeldung, Ansichten und Adressleiste.

import { $ } from './dom.js';
import { currentUser, endSession } from './auth.js';
import { calendars } from '../data/calendars/index.js';
import { initDialog } from './dialog.js';
import { markRendered } from './view.js';
import { initLogin, showLogin, focusLogin } from './views/login.js';
import { showHome } from './views/home.js';
import { initCalendar, showCalendar } from './views/calendar.js';

function route() {
  const user = currentUser();
  if (!user) {
    showLogin();
    return;
  }

  const match = location.hash.match(/^#\/k\/([\w-]+)$/);
  const calendar = match && calendars.find((c) => c.id === match[1]);

  if (calendar) showCalendar(user, calendar);
  else showHome(user);

  window.scrollTo(0, 0);
  markRendered();
}

const clearHash = () => history.replaceState(null, '', location.pathname + location.search);

initDialog();
initCalendar();
initLogin(() => {
  clearHash();
  route();
});

$('#logout').addEventListener('click', () => {
  endSession();
  clearHash();
  route();
  focusLogin();
});

window.addEventListener('hashchange', route);
route();
