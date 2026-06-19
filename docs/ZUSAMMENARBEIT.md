# Zusammenarbeit in PythonLab

Stand: 19. Juni 2026

PythonLab wird gemeinsam von Jakob Sawazki als fachlichem und gestalterischem
Entscheider sowie Claude Code und Codex als umsetzenden Agenten weiterentwickelt.
Wichtig ist eine nachvollziehbare Übergabe, damit jeder Beteiligte sicher auf
dem letzten Stand weiterarbeiten kann.

## Verbindlicher Einstieg

1. `git status --short --branch` und `git log -5 --oneline` prüfen.
2. `README.md`, `TASKS.md`, `UEBERGABE_Codex.md` und diese Datei lesen.
3. Vorhandene uncommittete Änderungen als Arbeit des Teams behandeln und nicht
   ungefragt verwerfen oder überschreiben.
4. Bei fachlichen Inhalten zuerst die lokalen BPE5-Quellen unter `resources/`
   lesen. Dieser Ordner bleibt privat und wird nicht veröffentlicht.
5. Den Stand von `origin/main` und anschließend die tatsächlich ausgelieferte
   GitHub-Pages-Version prüfen; beides kann zeitweise hinter dem lokalen Stand liegen.

## Zuständigkeiten im Code

- Inhalte, Lernziele, Aufgaben, XP und Struktogramm-Beispiele: `content.js`
- Rendering, Routing, Lernstand und Prüfungen: `app.js`
- Design, Farben und responsive Regeln: `styles.css`
- App-Shell und Dialoge: `index.html`
- fachliche und technische Entscheidungen: `docs/`

`resources/` und `implementations/` sind lokale Referenzablagen. Sie dürfen nie
pauschal gestagt oder veröffentlicht werden.

## Qualitätsprüfung vor einer Übergabe

- JavaScript-Syntax von `app.js`, `content.js` und `python-worker.js` prüfen.
- Beziehungen zwischen Lektionen und Aufgaben sowie eindeutige IDs prüfen.
- XP aus Lektionen, Aufgaben, Befehlen und Struktogrammen summieren; seit 0.12.0
  muss die Summe exakt 6000 ergeben.
- `git diff --check` ausführen.
- betroffene Ansichten im Browser in Dark Mode prüfen; bei Designänderungen
  zusätzlich Light Mode sowie Desktop und 390 Pixel Breite testen.
- Browserkonsole auf Fehler kontrollieren.
- Versionen in `README.md`, `TASKS.md`, `index.html` und beim Python-Worker
  gemeinsam aktualisieren.

## Aktuelle Gestaltungsentscheidungen

- Dark Mode bleibt für neue Profile Standard.
- Grün ist die ruhige Grundfarbe. Vertiefung und Plus nutzen abgestufte Blautöne.
- Lernzielkästen sollen motivierend, nicht warnend wirken; Standard ist ein
  hochwertiges Grün, nicht Gelb.
- Karten-Hover nutzt einen gleichmäßigen Rahmen, Schatten und kleinen Lift ohne
  separaten oberen Farbstreifen.
- Zweiseitige Struktogramm-Alternativen orientieren sich am hus Struktogrammer:
  gemeinsamer Mittelpunkt der Diagonalen, Bedingung mit `?`, Zweige `Ja`/`Nein`.

## Übergabe und Veröffentlichung

Eine Übergabe nennt kurz: geänderte Dateien, fachliche Entscheidung, ausgeführte
Tests, offene Punkte und Git-Status. Nach einem Push wird die GitHub-Pages-Seite
mit einem Cache-Buster geöffnet und auf die aktuelle Asset-Version geprüft.
