# Adventskalender

Eine Seite mit Anmeldung, sechs Kalendern und je 24 Türchen. Sie läuft komplett im Browser und braucht keinen Server, also passt sie zu GitHub Pages.

## Veröffentlichen mit GitHub Pages

1. Auf GitHub ein neues Repository anlegen.
2. Alle Dateien und den Ordner `fonts` hochladen (`index.html`, `style.css`, `app.js`, `config.js`, `fonts/`).
3. Im Repository unter **Settings → Pages** bei **Source** „Deploy from a branch“ wählen, Branch `main` und Ordner `/ (root)`.
4. Nach einer Minute ist die Seite unter `https://DEIN-NAME.github.io/REPOSITORY/` erreichbar.

## Anpassen

Alles Wichtige steht in `config.js`:

- Kalender umbenennen, Farben ändern, Untertitel setzen.
- Türchen füllen: Titel, Text, optional Bild und Link.
- Bilder in einen Ordner `bilder/` legen und dort verlinken (`image: "bilder/tuerchen-1.jpg"`).

## Zugänge

Der Demo-Zugang ist `gast` mit dem Passwort `Tuerchen2026`. Ersetze ihn vor dem Veröffentlichen.

Neuen Hash erzeugen (der Benutzername wird klein geschrieben):

```
node -e "console.log(require('crypto').createHash('sha256').update('adventskalender-v1:anna:meinPasswort').digest('hex'))"
```

Den Hash trägst du bei `users` in `config.js` ein. Mehrere Zugänge sind möglich.

## Die Anmeldung ist keine echte Sicherheit

GitHub Pages liefert nur fertige Dateien aus. Die Anmeldung läuft deshalb im Browser, und `config.js` ist für jeden lesbar, der die Seite aufruft. Passwörter sind zwar nur als Hash hinterlegt, aber die Türchen-Inhalte stehen offen in der Datei.

Das reicht als Türsteher für ein Geschenk oder eine kleine Runde. Für wirklich vertrauliche Inhalte brauchst du einen Dienst mit Server-Prüfung, zum Beispiel Cloudflare Access oder Netlify mit Passwortschutz.

## Türchen testen

Im Oktober sind alle Türchen noch zu. Hänge `?vorschau` an die Adresse, um alle freizuschalten:

```
https://DEIN-NAME.github.io/REPOSITORY/?vorschau
```

Lokal testen:

```
python3 -m http.server 8000
```

Dann `http://localhost:8000/?vorschau` öffnen.

## Gut zu wissen

- Türchen öffnen sich ab dem 1. bis 24. Dezember des aktuellen Jahres.
- Welche Türchen geöffnet wurden, merkt sich der Browser pro Benutzer. Auf einem anderen Gerät beginnt der Stand von vorn.
- Die Schriften liegen im Ordner `fonts`, es werden keine Daten an Google übertragen.
