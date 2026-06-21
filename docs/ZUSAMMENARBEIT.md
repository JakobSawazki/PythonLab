# Zusammenarbeit in PythonLab

Stand: 21. Juni 2026

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
- XP aus Lektionen, Aufgaben, Befehlen und Struktogrammen summieren; seit 0.16.0
  muss die Summe exakt 7200 ergeben (Fibonacci und Primzahlen bilden die ersten
  drei Aufgaben der Kategorie Anwendung). Der Wert im Punktedialog wird zusätzlich zur Laufzeit
  aus den Inhalten berechnet (`totalAvailableXp()`); bei neuen Aufgaben diesen
  Zielwert hier mitführen.
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

### 0.17.1 – Claude Code (Opus 4.8)

- **Entscheidung KI-Aktivierung:** Auf Wunsch des Lehrers den kostenlosen,
  schlüssellosen Direkt-Dienst (pollinations.ai) geprüft und wieder verworfen –
  der Browser-Aufruf scheitert (CORS) und das Senden von Schülercode an einen
  nicht benannten Drittanbieter ist für die Schule datenschutzrechtlich heikel.
  Maßgeblich bleibt Codex' sicherer eigener Gemini-Worker.
- **Geänderte Dateien:** `services/ai-feedback-worker/README.md` (neue
  CLI-freie Deployment-Variante über das Cloudflare-Dashboard + Funktionstest),
  `README.md` (Hinweis auf beide Deploy-Varianten), `.gitignore`
  (`node_modules/`). Kein App-Code geändert, daher keine neue Cache-Bust-Version.
- **Status KI-Modus:** vollständig implementiert (Codex 0.16/0.17). Aktivierung
  = Worker deployen und `aiFeedbackEndpoint` in `config.js` setzen. Solange leer,
  zeigt die Oberfläche ehrlich „KI-Modus noch nicht freigeschaltet“; lokaler
  Coach und Prüfung bleiben voll funktionsfähig.
- **Offen:** Worker-Deployment (nur vom Schul-/Lehrer-Konto möglich) und
  schulische Datenschutzfreigabe.

### 0.17.0 – Codex

- **Geänderte Dateien:** `app.js` (Sitzungsmodus, automatische KI-Hilfe,
  Zwischenspeicher, Schutz vor veralteten Antworten und tolerantere
  Ausgabeprüfung mit zeilengenauer Diagnose), `content.js` (offenere Starter
  für Fibonacci und Primzahlen), `index.html`
  (Einwilligungsdialog), `styles.css` (KI-Schalter und Dialog), `config.js`
  (öffentliche Konfiguration), `services/ai-feedback-worker/` (Prompt, Modell,
  Schema, Zeit- und Ratenbegrenzung) sowie Projektdokumentation.
- **Fachliche Entscheidung:** Die KI ist ein freiwilliger Lerncoach, keine
  Bewertungsinstanz. Sie soll in kleinen Schritten zum Weiterdenken anregen und
  keine vollständige Lösung liefern. Aufgabe, Lektion und XP werden weiterhin
  ausschließlich durch lokale reproduzierbare Tests abgeschlossen.
- **Datenschutz:** Modus standardmäßig aus; Zustimmung und Aktivierung nur für
  die aktuelle Browsersitzung. Übertragen werden Aufgabe, Code, lokale Diagnose
  und Versuchszähler, nicht aber Profil, XP, Lernstandsdatei oder Eingabefeld.
  Der öffentliche Endpoint bleibt bis zur schulischen Datenschutz- und
  Tariffreigabe leer.
- **Tests:** Syntax aller JavaScript-Dateien und `git diff --check`; Worker mit
  gemocktem Gemini auf Origin-Schutz, JSON-Schema, Modell, Weitergabegrenzen und
  429-Sitzungslimit; Browserablauf mit Einwilligung, automatischer Rückmeldung,
  Cache-Treffer bei unverändertem Code, neuer Anfrage nach Codeänderung und
  Abschalten des Modus; im Browser die Screenshot-Variante ohne Ausrufezeichen,
  eine echte Textabweichung und beschriftete Taschengeld-Ausgaben geprüft.
- **Offene Punkte:** Freigegebenen Gemini-Tarif wählen, Cloudflare/Gemini
  außerhalb des Repositories einrichten, Secret hinterlegen, Endpoint setzen
  und vor einer Veröffentlichung mit nicht personenbezogenen Testdaten prüfen.

### 0.16.0 – Codex

- **Geänderte Dateien:** `content.js` (Aufgabe `primzahlen-werkstatt`, Story und
  Kompetenzbezüge), `app.js` (Rasterbilder, Fakten und Quellen im Storyblock),
  `styles.css` (responsive Bild- und Faktenansicht), `index.html` (Version und
  XP-Fallback), `assets/primzahlen-anwendung.png` sowie Projektdokumentation.
- **Fachliche Entscheidung:** Eine gemeinsame, zweistufige Anwendungsaufgabe führt
  von `teste_primzahl()` mit festgelegter 29 zu `ist_primzahl(n)` mit booleschem
  Rückgabewert. Die Schleife berichtet für jede Zahl von 1 bis 50 den Status, da
  die gewünschte Beispielausgabe ausdrücklich auch zusammengesetzte Zahlen zeigt.
- **Quellen:** Definition, eindeutige Primfaktorzerlegung, unendlich viele
  Primzahlen und Kryptografiebezug wurden über die offizielle MediaWiki-API des
  deutschsprachigen Wikipedia-Artikels „Primzahl“ abgeglichen; im Storyblock ist
  der Artikel als freiwillige Vertiefung verlinkt.
- **Tests:** Musterlösung real über Pyodide bestanden (inklusive
  Funktionssignaturen, boolescher Rückgaben, Grenzwerte, AST-Nachweis für Schleife
  und Modulo sowie aller 50 Ausgabezeilen); Integritätsprüfung mit 0 Problemen,
  29 Aufgaben und 7200 XP; Desktop und 390 Pixel, Light und Dark ohne Überlauf;
  Illustration geladen und Browserkonsole fehlerfrei.
- **Offene Punkte:** Kategorie Anwendung mit weiteren J1-Beispielen ausbauen;
  optionalen Gemini-Coach schulisch freigeben und deployen; Screenshots erneuern.

### 0.15.0 – Claude Code (Opus 4.8)

- **Geänderte Dateien:** `content.js` (Lektions-Struktogramme für sequenz, if,
  elif, logik, for, while; neue Einstiegsaufgabe `fibonacci-folge` mit
  Story-Block; Funktionsaufgabe `fibonacci` retitelt + Story), `app.js`
  (`renderExerciseStory`, Aufruf in `renderExercise`; erweiterte lokale Diagnose
  in `pythonDiagnostic`/`buildExerciseHints`; Worker-Verweis `?v=0.15.0`),
  `styles.css` (`.exercise-story` hell/dunkel + mobil), `index.html`
  (XP-Fallback 6950, `?v=0.15.0`); Doku in `README.md`, `TASKS.md`,
  `UEBERGABE_Codex.md`, dieser Datei.
- **Neue Datenmodell-Felder:** `lesson.structogram` (Node-Array im hus-Format,
  in renderLesson als „Als Struktogramm gedacht“ gerendert) und `exercise.story`
  (`{ eyebrow, heading, paragraphs[], video:{url,label}, illustration:<svg>,
  illustrationAlt }`). Beide sind optional und abwärtskompatibel.
- **Fachliche Entscheidung:** Fibonacci nach dem OneNote-Aufbau des Lehrers
  umgesetzt – Aufgabe 1 (ohne Funktion, drei Variablen a/b/c, for-Schleife,
  Ausgabe der ersten zehn Zahlen) als motivierender Einstieg mit Bio,
  Goldenes-Rechteck-Illustration und Erklärvideo; Funktionsversion als Aufbau.
  Struktogramme in den Kontrollstruktur-Lektionen stärken den Abiturbezug.
- **Tests:** beide Fibonacci-Musterlösungen real über Pyodide bestanden; alle
  sechs Lektions-Struktogramme rendern; neue lokale Hinweise (Doppelpunkt,
  `print`-Klammern) greifen; Integritätsprüfung 0 Probleme, 28 Aufgaben,
  XP-Summe 6950; kein Überlauf bei 1280 und 390 px; Light und Dark geprüft;
  Browserkonsole fehlerfrei.
- **Offene Punkte:** Kategorie Anwendung mit weiteren J1-Aufgaben füllen;
  optionalen Gemini-Coach gemäß README-Abschnitt „KI-Lerncoach aktivieren“
  schulisch freigeben und deployen; Screenshots erneuern.
- **Git-Status bei Übergabe:** `main`, ein Release-Commit 0.15.0, nach
  `origin/main` gepusht, GitHub-Pages-Build geprüft.

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
