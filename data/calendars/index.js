/*
  Liste aller Kalender. Die Reihenfolge hier ist die Reihenfolge auf der Übersicht.

  Neuen Kalender hinzufügen:
    1. Datei _vorlage.js kopieren und umbenennen, z. B. neu.js
    2. id, Titel, Farben und Türchen anpassen
    3. Unten importieren und in die Liste eintragen
*/
import universum from "./universum.js";
import mensch from "./mensch.js";
import placebo from "./placebo.js";
import meinungen from "./meinungen.js";
import kugelblitze from "./kugelblitze.js";
import schlaf from "./schlaf.js";

export const calendars = [
  universum,
  mensch,
  meinungen,
  placebo,
  kugelblitze,
  schlaf
];
