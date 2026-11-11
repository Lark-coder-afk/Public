/*
  Zugänge zur Seite.
 
  Der Hash wird aus  SALT:benutzername:passwort  gebildet
  (SALT steht in data/settings.js, der Benutzername wird klein geschrieben).
 
  Neuen Hash erzeugen (Node.js):
    node -e "console.log(require('crypto').createHash('sha256').update('adventskalender-v1:anna:meinPasswort').digest('hex'))"
 
  Demo-Zugang zum Ausprobieren:  gast  /  Tuerchen2026
  Ersetze ihn, bevor du die Seite weitergibst.
 
  Hinweis: Die Prüfung läuft im Browser. Sie hält Neugierige draußen,
  schützt aber keine vertraulichen Inhalte (siehe README).
*/
export const users = [
  {
    name: "gast",
    display: "Gast",
    hash: "5c736eeef9a3d247614e8e9b30c2eed8623b2920048a839ad347557611352b42"
  },
  {
    name: "ipsi",
    display: "Ipsi",
    hash: "200d30998d43512e9cf8b6f1fa360a85da120af7197fb43db7d029962d69e5da"
  }
];
 
