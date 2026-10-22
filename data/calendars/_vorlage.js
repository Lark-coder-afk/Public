/*
  Vorlage für einen Kalender. Kopieren, umbenennen und ausfüllen.

  Felder je Türchen:
    title      Überschrift
    text       Text (Absätze mit einer Leerzeile trennen)
    image      Pfad zu einem Bild, z. B. "bilder/tuerchen-1.jpg"
    imageAlt   Beschreibung des Bildes
    link       { url: "https://…", label: "Zum Video" }

  Türchen ohne Eintrag zeigen einen Platzhalter.
  Die id darf nur Buchstaben, Zahlen und Bindestriche enthalten.
*/
export default {
  id: "meine-id",
  title: "Titel des Kalenders",
  subtitle: "Kurze Beschreibung",
  color: "#C2415D", // Farbe der Türchen
  ink: "#FFFFFF",   // Schriftfarbe auf der Farbe: hell oder dunkel, je nach Kontrast
  doors: {
    1: { title: "", text: "" },
    2: { title: "", text: "" },
    3: { title: "", text: "" },
    4: { title: "", text: "" },
    5: { title: "", text: "" },
    6: { title: "", text: "" },
    7: { title: "", text: "" },
    8: { title: "", text: "" },
    9: { title: "", text: "" },
    10: { title: "", text: "" },
    11: { title: "", text: "" },
    12: { title: "", text: "" },
    13: { title: "", text: "" },
    14: { title: "", text: "" },
    15: { title: "", text: "" },
    16: { title: "", text: "" },
    17: { title: "", text: "" },
    18: { title: "", text: "" },
    19: { title: "", text: "" },
    20: { title: "", text: "" },
    21: { title: "", text: "" },
    22: { title: "", text: "" },
    23: { title: "", text: "" },
    24: { title: "", text: "" }
  }
};
