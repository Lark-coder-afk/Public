# Adventskalender

Eine Seite mit Anmeldung, sechs Kalendern und je 24 Türchen. Sie läuft komplett im Browser und braucht keinen Server, also passt sie zu GitHub Pages.

## Aufbau

```
index.html            Gerüst der Seite
style.css             Aussehen
fonts/                Schriften (lokal, es wird nichts von Google geladen)
modules/              Programmcode, normalerweise musst du hier nichts ändern
  main.js             Einstieg, verbindet alles mit der Adressleiste
  auth.js             Anmeldung und Sitzung
  dates.js            Wann sich welches Türchen öffnet
  progress.js         Merkt sich geöffnete Türchen
  shuffle.js          Gemischte, feste Reihenfolge der Türchen
  dialog.js           Fenster mit dem Inhalt eines Türchens
  toast.js            Kurzer Hinweis am unteren Rand
  view.js             Umschalten zwischen den Ansichten
  dom.js              Kleine Helfer
  views/              Login, Übersicht, Kalender
data/                 Alles, was du anpasst
  settings.js         Salt und Anzahl der Türchen
  users.js            Zugänge
  calendars/
    index.js          Liste und Reihenfolge der Kalender
    geschichten.js    Ein Kalender pro Datei
    …
    _vorlage.js       Vorlage für einen neuen Kalender
```

## Veröffentlichen mit GitHub Pages

1. Alle Dateien und Ordner in ein öffentliches Repository hochladen. `index.html` muss im obersten Ordner liegen.
2. Unter **Settings → Pages** bei **Source** „Deploy from a branch“ wählen, Branch `main` und Ordner `/ (root)`.
3. Nach ein bis zwei Minuten ist die Seite erreichbar.

## Inhalte anpassen

- **Türchen füllen:** Die Datei des Kalenders in `data/calendars/` öffnen und bei `doors` Titel und Text eintragen. Bilder legst du in einen Ordner `bilder/` und verlinkst sie mit `image: "bilder/tuerchen-1.jpg"`.
- **Kalender umbenennen oder umfärben:** In derselben Datei `title`, `subtitle`, `color` und `ink` ändern.
- **Neuen Kalender hinzufügen:** `_vorlage.js` kopieren, umbenennen und ausfüllen, dann in `data/calendars/index.js` importieren und in die Liste eintragen.
- **Zugänge ändern:** `data/users.js`.

## Zugänge

Der Demo-Zugang ist `gast` mit dem Passwort `Tuerchen2026`. Ersetze ihn vor dem Weitergeben.

Neuen Hash erzeugen (der Benutzername wird klein geschrieben):

```
node -e "console.log(require('crypto').createHash('sha256').update('adventskalender-v1:anna:meinPasswort').digest('hex'))"
```

Den Hash trägst du in `data/users.js` ein. Mehrere Zugänge sind möglich.

## Die Anmeldung ist keine echte Sicherheit

GitHub Pages liefert nur fertige Dateien aus. Die Anmeldung läuft deshalb im Browser, und alles im Ordner `data` ist für jeden lesbar, der die Seite aufruft. Passwörter sind zwar nur als Hash hinterlegt, aber die Türchen-Inhalte stehen offen in den Dateien.

Das reicht als Türsteher für ein Geschenk oder eine kleine Runde. Für wirklich vertrauliche Inhalte brauchst du einen Dienst mit Server-Prüfung, zum Beispiel Cloudflare Access oder Netlify mit Passwortschutz.

## Türchen testen

Im Oktober sind alle Türchen noch zu. Hänge `?vorschau` an die Adresse, um alle freizuschalten. Es muss **vor** dem `#` stehen:

```
https://DEIN-NAME.github.io/REPOSITORY/?vorschau#/k/basteln
```

Lokal testen geht nur über einen kleinen Server, weil Browser Module nicht von `file://` laden:

```
python3 -m http.server 8000
```

Dann `http://localhost:8000/?vorschau` öffnen.

## Gut zu wissen

- Türchen öffnen sich ab dem 1. bis 24. Dezember des aktuellen Jahres.
- Welche Türchen geöffnet wurden, merkt sich der Browser pro Benutzer. Auf einem anderen Gerät beginnt der Stand von vorn.
- Die alten Dateien `config.js` und `app.js` aus der ersten Version werden nicht mehr gebraucht und können gelöscht werden.
