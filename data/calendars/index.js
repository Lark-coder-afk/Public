/*
  Liste aller Kalender. Die Reihenfolge hier ist die Reihenfolge auf der Übersicht.

  Neuen Kalender hinzufügen:
    1. Datei _vorlage.js kopieren und umbenennen, z. B. neu.js
    2. id, Titel, Farben und Türchen anpassen
    3. Unten importieren und in die Liste eintragen
*/
import geschichten from "./geschichten.js";
import rezepte from "./rezepte.js";
import raetsel from "./raetsel.js";
import musik from "./musik.js";
import basteln from "./basteln.js";
import aufmerksamkeiten from "./aufmerksamkeiten.js";

export const calendars = [
  geschichten,
  rezepte,
  raetsel,
  musik,
  basteln,
  aufmerksamkeiten
];
