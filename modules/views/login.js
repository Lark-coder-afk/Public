// Anmeldeseite mit der Tür.

import { $, sleep, REDUCED_MOTION } from '../dom.js';
import { authenticate, startSession, supportsCrypto } from '../auth.js';
import { showView } from '../view.js';

export function showLogin() {
  showView('login');
}

export function focusLogin() {
  $('#user').focus();
}

function showError(message) {
  const box = $('#login-error');
  box.textContent = message;
  box.hidden = false;
}

// onSuccess wird aufgerufen, sobald die Tür offen ist.
export function initLogin(onSuccess) {
  const form = $('#login-form');
  const button = $('#login-btn');
  const stage = $('#stage');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    $('#login-error').hidden = true;

    const name = $('#user').value;
    const password = $('#pw').value;

    if (!name.trim() || !password) {
      showError('Gib Benutzername und Passwort ein.');
      return;
    }
    if (!supportsCrypto()) {
      showError('Die Anmeldung funktioniert nur über https oder localhost.');
      return;
    }

    button.disabled = true;
    const [user] = await Promise.all([authenticate(name, password), sleep(350)]);

    if (!user) {
      showError('Benutzername oder Passwort stimmt nicht. Prüfe beides und versuche es noch einmal.');
      button.disabled = false;
      $('#pw').select();
      return;
    }

    startSession(user.name);
    $('#pw').value = '';
    stage.classList.add('is-open');
    await sleep(REDUCED_MOTION ? 0 : 1000);

    onSuccess();
    stage.classList.remove('is-open');
    button.disabled = false;
  });
}
