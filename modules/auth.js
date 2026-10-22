// Anmeldung. Läuft im Browser und ist kein echter Schutz (siehe README).

import { SALT } from '../data/settings.js';
import { users } from '../data/users.js';

const SESSION_KEY = 'advent-user';

let current = null;
try {
  current = sessionStorage.getItem(SESSION_KEY);
} catch (e) {
  // Speicher nicht verfügbar: Anmeldung gilt nur, bis die Seite neu lädt
}

export function findUser(name) {
  if (!name) return null;
  return users.find((u) => u.name.toLowerCase() === name.toLowerCase()) || null;
}

export const currentUser = () => findUser(current);

export const supportsCrypto = () => Boolean(window.crypto && crypto.subtle);

async function sha256(text) {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer), (b) => b.toString(16).padStart(2, '0')).join('');
}

// Gibt den Benutzer zurück oder null, wenn die Angaben nicht stimmen.
export async function authenticate(name, password) {
  const login = name.trim().toLowerCase();
  const hash = await sha256(`${SALT}:${login}:${password}`);
  return users.find((u) => u.name.toLowerCase() === login && u.hash === hash) || null;
}

export function startSession(name) {
  current = name;
  try {
    sessionStorage.setItem(SESSION_KEY, name);
  } catch (e) {
    // ignorieren
  }
}

export function endSession() {
  current = null;
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch (e) {
    // ignorieren
  }
}
