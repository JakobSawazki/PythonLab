# PythonLab Tasks und Projektstand

Stand: 18. Juni 2026
Aktuelle Version: 0.8.1
Live: `https://jakobsawazki.github.io/PythonLab/`

## Leitentscheidung

PythonLab bleibt ein eigenes, öffentliches Lernportal. Die offiziellen
BPE5-Materialien dienen als fachliche Referenz, werden aber nicht ungeprüft in
das Repository übernommen. Eigene Erklärungen, Übungen und Beispiele werden in
`content.js`, `app.js` und der Dokumentation gepflegt.

## Erledigt

- 2026-06-09: Grundversion von PythonLab erstellt und über GitHub Pages veröffentlicht.
- 2026-06-09: BPE5-Materialstand 31.07.2025 geprüft und fachlichen Abgleich dokumentiert.
- 2026-06-09: Struktogramm-Labor mit Grundformen, Aufgaben, XP und Mobilansicht ergänzt.
- 2026-06-09: Lernstand-Export und -Import als JSON-Datei umgesetzt.
- 2026-06-09: Projektzuordnung zu Sawazki Electronics ergänzt.
- 2026-06-17: Projektname vollständig auf PythonLab umgestellt.
- 2026-06-17: Struktogrammer Web in Kopfzeile und Nachschlagen-Bereich verlinkt.
- 2026-06-17: Sawazki-Electronics-Hauptseite auf die neue PythonLab-Adresse angepasst.
- 2026-06-17: Light-/Dark-Mode mit Schalter neben dem Speichern-Button ergänzt.
- 2026-06-17: Footer auf `Designed by Sawazki Electronics` vereinfacht.
- 2026-06-17: Informatik-Stick im Nachschlagen-Bereich auf `https://schultasche-bw.de/` verlinkt.
- 2026-06-17: Neuer Reiter **Befehle** mit zehn Python-Basiselementen, Detailseiten, Beispielen, Stolperstellen und XP-Miniaufgaben erstellt.
- 2026-06-17: Lernstandsmodell um `completedCommands` erweitert.
- 2026-06-17: Zwei Erfolge für Befehlsaufgaben ergänzt.
- 2026-06-17: BPE5-Quellenstruktur unter `references/bpe5/` dokumentiert.
- 2026-06-17: `.gitignore` um Schutzpfade für mögliche lokale BPE5-Originalkopien ergänzt.
- 2026-06-17: Diese `TASKS.md` als zentrale Aufgabenliste erstellt und `tasks.txt` abgelöst.
- 2026-06-18: BPE5-Originalmaterialien lokal unter `resources/` eingeordnet und vom öffentlichen Repository ausgeschlossen.
- 2026-06-18: Lokale Implementierungsablage `implementations/` dokumentiert.
- 2026-06-18: Struktogrammer-Web-Link oben rechts als einheitlichen Icon-Button gestaltet.
- 2026-06-18: Ausgabeprüfung toleranter für Leerzeilen, Zeilenabstände und Zahlen in Textausgaben gemacht.
- 2026-06-18: Konzept für robustere Codeprüfung und optionale KI-Hilfe unter `docs/KI_CODEPRUEFUNG_KONZEPT.md` dokumentiert.

## Offen Priorisiert

1. Codeprüfung weiter robuster machen: mehrere Testfälle, Teilpunkte, genauere Fehlhinweise und AST-Prüfung für zentrale Konzepte.
2. KI-Hilfe nur optional über Serverless-Proxy planen, niemals mit sichtbarem API-Key im Browser.
3. Befehlsbibliothek ausbauen: Fehlermeldungen, String-Methoden, Listenmethoden, `len()`, `range()`-Varianten und Mini-Quizze ergänzen.
4. Kompetenzansicht erstellen: BPE5-Ich-kann-Ziele in verständlicher Sprache anzeigen und mit Lektionen, Übungen, Befehlen und Struktogrammen verknüpfen.
5. Weitere BPE5-Transferaufgaben entwickeln, besonders zu Alternativen, Schleifen, Funktionen und Struktogramm-Übersetzung.
6. KA-Webarbeit aus `implementations/KA` als nicht benotete Übungsvorbereitung prüfen und integrieren.
7. Den ikonischen Einstieg aus Lernfortschritt 1 didaktisch prüfen und bei Bedarf als optionales Einstiegsmodul umsetzen.
8. GUI-Inhalte aus Lernfortschritt 2 als Python-Plus-Modul prüfen.
9. Struktogrammer Web stärker verzahnen, zum Beispiel durch konkrete Aufgabenlinks oder Import-/Export-Hinweise.
10. Screenshots nach größeren UI-Änderungen erneuern.
11. GitHub-Pages-Liveprüfung nach jedem Push dokumentieren.

## Ideen

- Suchfunktion für Befehle, Lektionen und Nachschlagekarten.
- Markierte Lieblingsbefehle oder persönliche Merkliste.
- Aufgabenserien nach Kompetenzbereich statt nur nach Lernpfad.
- Lehrkraftmodus für vorbereitete Übungssets.
- Wissenscheck oder Übungsvorbereitung als eigener Bereich ohne Notencharakter.
- Offline-freundliche Variante mit lokal gehostetem Pyodide und Lucide.
- Datenschutzkonforme optionale Synchronisation für Schulgeräte.
- Prüfungsmodus als separates, serverseitig abgesichertes Projekt.

## Arbeitsregeln

- Originalmaterialien aus `resources/` nur lesen, nicht ungeprüft veröffentlichen.
- `implementations/` ist eine lokale Ablage mit eigener Historie und wird nicht als Teil von PythonLab veröffentlicht.
- Öffentliche Inhalte eigenständig formulieren.
- Neue Inhalte bevorzugt in `content.js` ergänzen.
- Lernstandsänderungen immer in `normalizeState`, Export/Import und Dokumentation nachziehen.
- Vor Veröffentlichung mindestens `node --check app.js`, `node --check content.js`, `node --check python-worker.js` und `git diff --check` ausführen.
- Nach erfolgreichem Push die Live-Seite `https://jakobsawazki.github.io/PythonLab/` prüfen.
