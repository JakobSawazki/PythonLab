# Übergabeprotokoll: PythonLab

Stand: 19. Juni 2026

Aktueller Release-Stand: 0.13.0. Die Zusammenarbeit und die verbindliche Übergaberoutine für Mensch, Claude Code und Codex stehen zusätzlich in `docs/ZUSAMMENARBEIT.md`.

## Projektziel

Öffentliches Lernportal für Schülerinnen und Schüler des nichtgewerblichen beruflichen Gymnasiums. Schwerpunkt ist BPE 5 „Grundlagen der Programmierung“ mit Python. Die Lernenden sollen verständliche Erklärungen lesen, unmittelbar selbst programmieren und über XP sowie Erfolge zum Weiterarbeiten motiviert werden.

## Ablage und Repository

- Aktueller lokaler Projektpfad: `G:\Meine Ablage\Codex\PythonLab`
- Lokales Schwesterprojekt: `G:\Meine Ablage\Codex\Struktogrammer`
- Lokale BPE5-Referenz: `G:\Meine Ablage\Codex\PythonLab\resources\bpe-5-grundlagen-der-programmierung-version-mit-python\bpe-5-gdp_python`
- Lokale Implementierungsablage: `G:\Meine Ablage\Codex\PythonLab\implementations`
- GitHub-Repository: `https://github.com/JakobSawazki/PythonLab`
- GitHub Pages: `https://jakobsawazki.github.io/PythonLab/`
- Projektzuordnung: Sawazki Electronics; Gegenlink in der Fußnavigation von
  `https://jakobsawazki.github.io/sawazki-electronics/`

Die private Materialsammlung liegt jetzt lokal im Projektordner unter `resources/`. Sie enthält unter anderem Musterlösungen und bleibt absichtlich per `.gitignore` aus dem öffentlichen GitHub-Pages-Repository heraus. Im veröffentlichten Projekt liegen nur eigene Dokumentation, Abgleich und Integrationsnotizen.

`implementations/` ist eine lokale Ablage für verwandte Umsetzungen, darunter die frühere KA-Webarbeit. Diese Inhalte sollen perspektivisch als nicht benotete Übungs- oder Vorbereitungseinheit eingebunden werden, sind aber nicht Teil des PythonLab-Pages-Repos.

Verbindliche fachliche Referenz:

- Datei: `bpe-5-grundlagen-der-programmierung-version-mit-python.zip`
- Materialstand: 31. Juli 2025
- Größe: 23.496.218 Byte
- SHA-256: `E1747DB487817A46AAD11B1A6A6CD7E71AEF5F49414BFDCEE8CFC940DA8CF460`
- Offizieller Download: `https://www.schule-bw.de/resolveuid/4bf04e3081af47f9aa0a7455778f3cbe`
- Soll-Ist-Abgleich: `docs/BPE5_ABGLEICH_2025.md`
- Quellen- und Ordnungsnotiz: `references/bpe5/README.md`

## Aktueller Funktionsumfang

- Übersicht mit persönlichem nächsten Schritt und Lernstatistik
- fünf Lernetappen mit sechzehn Lektionen
- achtundzwanzig Aufgaben mit editierbarem Python-Code, davon mehrere freie Transferaufgaben sowie die Kategorie **Anwendung** mit zwei Fibonacci-Aufgaben (Einstieg ohne Funktion und Aufbau als Funktion)
- optionaler Story-Block je Aufgabe (`exercise.story`) mit Motivationstext, Inline-SVG-Illustration und Video-Link; eingebettete Struktogramme in den Kontrollstruktur-Lektionen (`lesson.structogram`)
- eigener Funktionsabschnitt mit drei Lektionen: ohne Parameter, mit Parametern und mit Rückgabewert
- Modul Python Plus mit Listen, Listen erweitern, Text bearbeiten und Fehlersuche
- Reiter **Befehle** mit neunzehn Python-Basiselementen, Detailseiten und XP-Miniaufgaben
- Struktogramm-Labor mit fünf Grundformen und fünf interaktiven Aufgaben; zweiseitige Alternativen verwenden gemeinsame SVG-Mittelpunkte, Bedingungen mit `?` und die Zweigbeschriftungen `Ja`/`Nein`
- direkter Kopfzeilen-Link zum Struktogrammer Web
- eigenes grünes Struktogramm-SVG als Icon-Button für den Struktogrammer-Web-Link, im Stroke-Stil der übrigen Symbole
- Dark Mode als Standard für neue Browserprofile und weiterhin umschaltbarer Light Mode
- veredeltes Design mit Verlaufs- und Schattensystem, Hover-Lifts, animierten
  Fortschrittsbalken und Inhaltseinblendung; respektiert `prefers-reduced-motion`
- alle Erklärungsbeispiele direkt in den Lektionen mit Pyodide ausführbar
- automatische Prüfung von Ausgabe, Variablen und Funktionen
- konkrete Python-Diagnosen und drei gestufte lokale Hinweise je Programmieraufgabe
- erfolgreiche Programmierprüfung schließt die zugehörige Lektion ab
- optionaler Gemini-Lerncoach über einen separaten Cloudflare Worker; nie maßgeblich für XP
- Pyodide 0.29.4 in einem Web Worker
- Abbruch sehr langer Programme nach zehn Sekunden
- lokaler Name beziehungsweise Kürzel, XP, Level, Erfolge und Entwürfe
- versionierter JSON-Export und -Import des vollständigen Lernstands
- Nachschlagebereich mit kompakten Syntaxmustern
- responsive Navigation und Tastaturbedienung
- Kompetenzansicht mit drei BPE5-Bereichen, vierzehn Ich-kann-Zielen und verknüpften Lernaktivitäten
- insgesamt exakt 6950 erreichbare XP mit erweiterten Levelgrenzen und erklärender Punkteanzeige (`totalAvailableXp()` berechnet die Summe zur Laufzeit)
- lokaler Lerncoach erkennt zusätzlich fehlende Doppelpunkte, `print` ohne Klammern sowie weitere Fehlertypen; optionaler Gemini-Coach in README unter „KI-Lerncoach aktivieren“ dokumentiert

## Dateistruktur

| Datei | Verantwortung |
| --- | --- |
| `index.html` | App-Shell, Navigation, Profildialog |
| `styles.css` | gesamtes Design und responsive Regeln |
| `content.js` | Module, Lektionen, Kompetenzen, Aufgaben, Erfolge, Nachschlagekarten |
| `app.js` | Routing, Rendern, Lernstand, XP, Aufgabenprüfung |
| `python-worker.js` | Laden und Ausführen von Pyodide |
| `config.js` | öffentliche Konfiguration des optionalen KI-Endpunkts ohne Secret |
| `services/ai-feedback-worker/` | optionaler, getrennt zu veröffentlichender Gemini-Proxy |
| `assets/python-lernraum.png` | Titelbild der Übersicht |
| `assets/struktogrammer-mark.png` | Icon für den Struktogrammer-Web-Link |
| `TASKS.md` | zentrale Aufgabenliste, Versionshistorie, offene Punkte und Ideen |
| `docs/TECHNIK_UND_DIDAKTIK.md` | Quellen, Datenschutz und didaktische Entscheidungen |
| `docs/BPE5_ABGLEICH_2025.md` | Abdeckung des offiziellen Kompetenzrasters und offene Ausbauschritte |
| `docs/KI_CODEPRUEFUNG_KONZEPT.md` | Konzept für dynamischere Codeprüfung und optionale KI-Auswertung |
| `docs/ZUSAMMENARBEIT.md` | Arbeits- und Übergaberegeln für Mensch, Claude Code und Codex |
| `references/bpe5/README.md` | lokale BPE5-Quellenstruktur und Veröffentlichungsgrenze |

## Zustandsmodell

Der aktuelle Schlüssel im Browser lautet `pythonlab-v1`. Gespeichert werden:

- `name`
- `xp`
- `completedLessons`
- `completedExercises`
- `completedCommands`
- `completedStructograms`
- `drafts`
- `structogramDrafts`
- `activityDates`
- `lastLessonId`

Die gewählte Darstellung wird getrennt davon unter `pythonlab-theme-v1`
gespeichert. Zulässige Werte sind `light` und `dark`; ohne gespeicherte Auswahl
startet PythonLab im Dark Mode.

Es gibt kein Backend und keine automatische Synchronisation zwischen Geräten.
Das ist für die datenschutzarme Version beabsichtigt. Über das
Disketten-Symbol in der Kopfzeile lässt sich der vollständige Zustand in einer
JSON-Datei sichern und auf einem anderen Gerät wieder laden. Die Datei trägt
das Formatkennzeichen `formatVersion: 1`; unbekannte IDs und unplausible Werte
werden beim Import verworfen beziehungsweise neu berechnet.

## Inhalte bearbeiten

Neue Inhalte möglichst nur in `content.js` ergänzen. Jede Lektion verweist mit `practiceId` auf eine Aufgabe. Jede Aufgabe verweist mit `lessonId` zurück. Mehrere Aufgaben dürfen sich eine `lessonId` teilen; zusätzliche Aufgaben erscheinen als freie Transferaufgaben im Reiter **Üben**. Befehlsseiten liegen im Array `commands`; jede Befehls-Miniaufgabe vergibt XP über `completedCommands`.

Erfolge liegen im Array `achievements`. Die Bedingungstypen werden in `app.js` in `achievementUnlocked` ausgewertet; neben den bestehenden Typen gibt es seit 0.11.0 den Typ `streak` für eine Mindest-Lernserie an aufeinanderfolgenden Tagen.

Die Etappe `bausteine` bildet Funktionen jetzt in drei Schritten ab. Die alte
Lektions-ID `funktionen` bezeichnet den Einstieg ohne Parameter und bleibt aus
Kompatibilitätsgründen erhalten. Darauf folgen `funktionen-parameter` und
`funktionen-rueckgabe`; die bestehende Fahrtkostenaufgabe schließt den Abschnitt
als Transferaufgabe ab.

Prüfarten:

- `output`: normalisierte Textausgabe muss exakt passen.
- `outputNumber`: letzte Ausgabezeile wird als Zahl verglichen.
- `tests`: zusätzlicher Python-Testcode prüft Variablen oder Funktionen.

Fehler aus Python-Assertions und häufige Syntax- beziehungsweise Laufzeitfehler
werden in verständliche Diagnosen übersetzt. Die Hinweise in `content.js`
werden über mehrere Prüfversuche schrittweise konkreter. Bei erfolgreicher
Aufgabenprüfung werden Aufgabe und zugehörige Lektion abgeschlossen.

Der optionale KI-Lerncoach wird über `config.js` aktiviert. Der Gemini-Schlüssel
liegt ausschließlich als `GEMINI_API_KEY`-Secret im Cloudflare Worker. Ohne
konfigurierten Endpoint bleibt die Oberfläche vollständig lokal funktionsfähig.

XP werden pro Lektion und Aufgabe nur einmal vergeben.

## Sinnvolle nächste Schritte

1. Weitere Struktogramm-Transferaufgaben ergänzen.
2. Weitere Befehlsseiten und Übungen aus BPE5 ergänzen, insbesondere zu häufigen Fehlermeldungen und Programmentwurf.
3. Teilpunkte und Kompetenz-Rubriken für längere Transferaufgaben ergänzen.
4. Die KA-Webarbeit aus `implementations/KA` als nicht benotete Übungsvorbereitung in PythonLab integrieren.
5. Die Verzahnung mit Struktogrammer Web bei Bedarf ausbauen.
6. Den ikonischen Einstieg aus Lernfortschritt 1 bei Bedarf didaktisch übertragen.
7. Die GUI-Inhalte aus Lernfortschritt 2 als optionales Zusatzmodul prüfen.
8. Weitere Python-Aufgabenvarianten ergänzen.
9. Vor einem Einsatz als Leistungsnachweis ein separates Prüfungsprojekt mit Authentifizierung und serverseitiger Speicherung planen.

## Grenzen

- Die Plattform ist derzeit ein Übungsportal, kein manipulationssicheres Prüfungssystem.
- Lernstände bleiben lokal und lassen sich über Browserwerkzeuge oder die
  JSON-Datei verändern.
- Für Pyodide und Lucide ist beim ersten Laden eine Internetverbindung erforderlich.
- `input()` verwendet im Aufgabenbereich vorbereitete Eingabezeilen statt modaler Dialoge.

## Einstieg für einen neuen Codex-Chat

Empfohlener Startauftrag:

> Öffne `UEBERGABE_Codex.md`, `README.md`, `TASKS.md`, `docs/ZUSAMMENARBEIT.md`, `docs/BPE5_ABGLEICH_2025.md`, `docs/KI_CODEPRUEFUNG_KONZEPT.md` und `references/bpe5/README.md`. Prüfe anschließend `git status`, `git log -5`, `content.js` und `app.js`. Das Projekt ist PythonLab, das öffentliche Lernportal für BPE 5. Arbeite mit dem vorhandenen Stil weiter und veröffentliche Änderungen nach Prüfung wieder über GitHub Pages. `resources/` und `implementations/` sind lokale Referenzablagen und dürfen nicht ungeprüft veröffentlicht werden.
