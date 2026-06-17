# Übergabeprotokoll: PythonLab

Stand: 17. Juni 2026

## Projektziel

Öffentliches Lernportal für Schülerinnen und Schüler des nichtgewerblichen beruflichen Gymnasiums. Schwerpunkt ist BPE 5 „Grundlagen der Programmierung“ mit Python. Die Lernenden sollen verständliche Erklärungen lesen, unmittelbar selbst programmieren und über XP sowie Erfolge zum Weiterarbeiten motiviert werden.

## Ablage und Repository

- Aktueller lokaler Projektpfad: `G:\Meine Ablage\Codex\PythonLab`
- Lokales Schwesterprojekt: `G:\Meine Ablage\Codex\Struktogrammer`
- GitHub-Repository: `https://github.com/JakobSawazki/PythonLab`
- GitHub Pages: `https://jakobsawazki.github.io/PythonLab/`
- Projektzuordnung: Sawazki Electronics; Gegenlink in der Fußnavigation von
  `https://jakobsawazki.github.io/sawazki-electronics/`

Die private Materialsammlung liegt getrennt unter `...\Lernfelder\BPE5`. Sie enthält unter anderem Musterlösungen und wird absichtlich nicht in dieses öffentliche Repository kopiert.

Verbindliche fachliche Referenz:

- Datei: `bpe-5-grundlagen-der-programmierung-version-mit-python.zip`
- Materialstand: 31. Juli 2025
- Größe: 23.496.218 Byte
- SHA-256: `E1747DB487817A46AAD11B1A6A6CD7E71AEF5F49414BFDCEE8CFC940DA8CF460`
- Offizieller Download: `https://www.schule-bw.de/resolveuid/4bf04e3081af47f9aa0a7455778f3cbe`
- Soll-Ist-Abgleich: `docs/BPE5_ABGLEICH_2025.md`

## Aktueller Funktionsumfang

- Übersicht mit persönlichem nächsten Schritt und Lernstatistik
- fünf Lernetappen mit zwölf Lektionen
- zwölf Aufgaben mit editierbarem Python-Code
- Struktogramm-Labor mit fünf Grundformen und fünf interaktiven Aufgaben
- direkter Kopfzeilen-Link zum lokalen Struktogrammer Web
- automatische Prüfung von Ausgabe, Variablen und Funktionen
- Pyodide 0.29.4 in einem Web Worker
- Abbruch sehr langer Programme nach zehn Sekunden
- lokaler Name beziehungsweise Kürzel, XP, Level, Erfolge und Entwürfe
- versionierter JSON-Export und -Import des vollständigen Lernstands
- Nachschlagebereich mit kompakten Syntaxmustern
- responsive Navigation und Tastaturbedienung

## Dateistruktur

| Datei | Verantwortung |
| --- | --- |
| `index.html` | App-Shell, Navigation, Profildialog |
| `styles.css` | gesamtes Design und responsive Regeln |
| `content.js` | Module, Lektionen, Aufgaben, Erfolge, Nachschlagekarten |
| `app.js` | Routing, Rendern, Lernstand, XP, Aufgabenprüfung |
| `python-worker.js` | Laden und Ausführen von Pyodide |
| `assets/python-lernraum.png` | Titelbild der Übersicht |
| `assets/struktogrammer-mark.png` | Icon für den Struktogrammer-Web-Link |
| `docs/TECHNIK_UND_DIDAKTIK.md` | Quellen, Datenschutz und didaktische Entscheidungen |
| `docs/BPE5_ABGLEICH_2025.md` | Abdeckung des offiziellen Kompetenzrasters und offene Ausbauschritte |

## Zustandsmodell

Der aktuelle Schlüssel im Browser lautet `pythonlab-v1`. Der frühere Schlüssel
`pythonwerkstatt-bg-v1` wird beim Laden weiterhin gelesen, damit vorhandene
Browserstände übernommen werden können. Gespeichert werden:

- `name`
- `xp`
- `completedLessons`
- `completedExercises`
- `completedStructograms`
- `drafts`
- `structogramDrafts`
- `activityDates`
- `lastLessonId`

Es gibt kein Backend und keine automatische Synchronisation zwischen Geräten.
Das ist für die datenschutzarme Version beabsichtigt. Über das
Disketten-Symbol in der Kopfzeile lässt sich der vollständige Zustand in einer
JSON-Datei sichern und auf einem anderen Gerät wieder laden. Die Datei trägt
das Formatkennzeichen `formatVersion: 1`; unbekannte IDs und unplausible Werte
werden beim Import verworfen beziehungsweise neu berechnet.

## Inhalte bearbeiten

Neue Inhalte möglichst nur in `content.js` ergänzen. Jede Lektion verweist mit `practiceId` auf eine Aufgabe. Jede Aufgabe verweist mit `lessonId` zurück.

Prüfarten:

- `output`: normalisierte Textausgabe muss exakt passen.
- `outputNumber`: letzte Ausgabezeile wird als Zahl verglichen.
- `tests`: zusätzlicher Python-Testcode prüft Variablen oder Funktionen.

XP werden pro Lektion und Aufgabe nur einmal vergeben.

## Sinnvolle nächste Schritte

1. Weitere Struktogramm-Transferaufgaben ergänzen.
2. Die Verzahnung mit Struktogrammer Web bei Bedarf ausbauen.
3. Den ikonischen Einstieg aus Lernfortschritt 1 bei Bedarf didaktisch übertragen.
4. Die GUI-Inhalte aus Lernfortschritt 2 als optionales Zusatzmodul prüfen.
5. Weitere Python-Aufgabenvarianten ergänzen.
6. Vor einem Einsatz als Leistungsnachweis ein separates Prüfungsprojekt mit Authentifizierung und serverseitiger Speicherung planen.

## Grenzen

- Die Plattform ist derzeit ein Übungsportal, kein manipulationssicheres Prüfungssystem.
- Lernstände bleiben lokal und lassen sich über Browserwerkzeuge oder die
  JSON-Datei verändern.
- Für Pyodide und Lucide ist beim ersten Laden eine Internetverbindung erforderlich.
- `input()` verwendet im Aufgabenbereich vorbereitete Eingabezeilen statt modaler Dialoge.

## Einstieg für einen neuen Codex-Chat

Empfohlener Startauftrag:

> Öffne `UEBERGABE_Codex.md` und prüfe anschließend `git status`, `README.md`, `content.js` und `app.js`. Das Projekt ist PythonLab, das öffentliche Python-Lernportal für BPE 5. Arbeite mit dem vorhandenen Stil weiter und veröffentliche Änderungen nach Prüfung wieder über GitHub Pages.
