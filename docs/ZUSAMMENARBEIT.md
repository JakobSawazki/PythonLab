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
- XP aus Lektionen, Aufgaben, Befehlen und Struktogrammen summieren; seit 0.14.0
  muss die Summe exakt 6800 ergeben (die Fibonacci-Anwendungsaufgabe bringt
  200 XP). Der Wert im Punktedialog wird zusätzlich zur Laufzeit aus den
  Inhalten berechnet (`totalAvailableXp()`); bei neuen Aufgaben diesen Zielwert
  hier mitführen.
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

## Letzte Übergaben

### 0.14.0 – Claude Code (Opus 4.8)

- **Geänderte Dateien:** `content.js` (Fibonacci-Aufgabe), `app.js`
  (`difficultyLabel` + Filter für `extra`), `styles.css` (`.difficulty-extra`
  hell/dunkel), `index.html` (eigenes Struktogramm-SVG statt Lucide-`workflow`,
  XP-Fallback 6800, Versionsparameter `?v=0.14.0`), `python-worker.js`-Verweis
  in `app.js` auf `?v=0.14.0`; Doku in `README.md`, `TASKS.md`,
  `UEBERGABE_Codex.md`, dieser Datei.
- **Fachliche Entscheidung:** Neue Aufgabenkategorie **Anwendung**
  (`difficulty: "extra"`, Label „Anwendung", violetter Akzent) für motivierende
  Praxisbeispiele, die zeigen, wofür Python einsetzbar ist. Erste Aufgabe ist
  Fibonacci (Wunsch des Lehrers, Quelle OneNote „5. Grundlagen der
  Programmierung“). Das Kopfzeilen-Icon zeigt jetzt ein eigenes,
  hus-/struktogramm-nahes SVG im grünen Stroke-Stil der übrigen Symbole.
- **Tests:** Fibonacci-Musterlösung lokal und real über Pyodide bestanden
  (`fibonacci(0..10)`); Filter „Anwendung", Icon-Farbe/-Größe, grüner
  Lernzielkasten (Light+Dark), XP-Summe 6800 und 27 Aufgaben im Browser geprüft;
  kein horizontaler Überlauf bei 1280 und 390 px; Browserkonsole fehlerfrei.
- **Offene Punkte:** Kategorie Anwendung mit weiteren J1-Aufgaben füllen
  (TASKS Punkt 9); Screenshots erneuern (Preview-Screenshots in der
  Agent-Umgebung nicht verfügbar). Der zuvor von Codex gemeldete gelbe
  Lernzielkasten ist bereits grün; ein gelber Eindruck stammt aus einem
  veralteten/gecachten Browserstand.
- **Git-Status bei Übergabe:** `main`, ein Release-Commit 0.14.0, nach
  `origin/main` gepusht, GitHub-Pages-Build geprüft.
