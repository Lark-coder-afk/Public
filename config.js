/*
  Hier stellst du alles ein: Zugänge und die sechs Kalender mit ihren Türchen.

  ZUGÄNGE
  Der Hash wird aus  salt:benutzername:passwort  gebildet (Benutzername klein geschrieben).
  Neuen Hash erzeugen (Node.js):
    node -e "console.log(require('crypto').createHash('sha256').update('adventskalender-v1:anna:meinPasswort').digest('hex'))"

  Demo-Zugang zum Ausprobieren:  gast  /  Tuerchen2026
  Ersetze ihn, bevor du die Seite veröffentlichst.

  TÜRCHEN
  Pro Kalender gibt es 24 Türchen. Trage nur die ein, die schon Inhalt haben.
  Mögliche Felder je Türchen:
    title      Überschrift
    text       Text (Absätze mit einer Leerzeile trennen)
    image      Pfad zu einem Bild, z. B. "bilder/tuerchen-1.jpg"
    imageAlt   Beschreibung des Bildes
    link       { url: "https://…", label: "Zum Video" }
*/
window.ADVENT_CONFIG = {
  salt: "adventskalender-v1",

  users: [
    {
      name: "gast",
      display: "Gast",
      hash: "5c736eeef9a3d247614e8e9b30c2eed8623b2920048a839ad347557611352b42"
    }
  ],

  calendars: [
    {
      id: "geschichten",
      title: "Wintergeschichten",
      subtitle: "Eine kurze Geschichte pro Tag",
      color: "#C2415D",
      ink: "#FFFFFF",
      doors: {
        1: {
          title: "Der erste Schnee",
          text: "Hier steht die Geschichte für das erste Türchen. Ersetze diesen Text in config.js durch deinen eigenen."
        },
        24: {
          title: "Heiligabend",
          text: "Das letzte Türchen. Zeit für etwas Besonderes."
        }
      }
    },
    {
      id: "rezepte",
      title: "Plätzchen & Punsch",
      subtitle: "Rezepte zum Nachbacken",
      color: "#2E7D6B",
      ink: "#FFFFFF",
      doors: {
        1: {
          title: "Vanillekipferl",
          text: "Trage hier Zutaten und Zubereitung ein.\n\nMit einer Leerzeile beginnt ein neuer Absatz."
        },
        24: {
          title: "Heißer Apfelpunsch",
          text: "Zum Anstoßen am Heiligabend."
        }
      }
    },
    {
      id: "raetsel",
      title: "Winterrätsel",
      subtitle: "Knobeln, bis die Kerzen brennen",
      color: "#D6A23A",
      ink: "#1B1E3A",
      doors: {
        1: {
          title: "Wer bin ich?",
          text: "Ich falle vom Himmel, bin leise und schmelze in deiner Hand. Was bin ich?"
        },
        24: {
          title: "Das große Finale",
          text: "Ein letztes Rätsel wartet hier."
        }
      }
    },
    {
      id: "musik",
      title: "Lieder zum Advent",
      subtitle: "Ein Lied für jeden Tag",
      color: "#6FA3D8",
      ink: "#1B1E3A",
      doors: {
        1: {
          title: "Das erste Lied",
          text: "Beschreibe das Lied und verlinke es.",
          link: { url: "https://example.org", label: "Lied anhören" }
        },
        24: {
          title: "Stille Nacht",
          text: "Zum Abschluss etwas Ruhiges."
        }
      }
    },
    {
      id: "basteln",
      title: "Bastelideen",
      subtitle: "Kleine Projekte für lange Abende",
      color: "#A98BE0",
      ink: "#1B1E3A",
      doors: {
        1: {
          title: "Papiersterne",
          text: "Beschreibe die Bastelidee oder füge ein Bild hinzu."
        },
        24: {
          title: "Ein Geschenk verpacken",
          text: "Das letzte Projekt vor der Bescherung."
        }
      }
    },
    {
      id: "aufmerksamkeiten",
      title: "Kleine Überraschungen",
      subtitle: "Eine Aufgabe oder ein Gutschein pro Tag",
      color: "#E2703A",
      ink: "#1B1E3A",
      doors: {
        1: {
          title: "Gutschein: Ein Abend deiner Wahl",
          text: "Löse diesen Gutschein ein, wann du möchtest."
        },
        24: {
          title: "Gutschein: Das große Geschenk",
          text: "Der Überraschungs-Gutschein zum Schluss."
        }
      }
    }
  ]
};
