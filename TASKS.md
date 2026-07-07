# PythonLab Tasks und Projektstand

Stand: 7. Juli 2026
Aktuelle Version: 0.20.1
Live: `https://jakobsawazki.github.io/PythonLab/`

## Leitentscheidung

PythonLab bleibt ein eigenes, öffentliches Lernportal. Die offiziellen
BPE5-Materialien dienen als fachliche Referenz, werden aber nicht ungeprüft in
das Repository übernommen. Eigene Erklärungen, Übungen und Beispiele werden in
`content.js`, `app.js` und der Dokumentation gepflegt.

## Erledigt

- 2026-07-07: Footer der Workbook-Startseite vereinfacht: kleiner Info-Button für BPE-/Quellenhinweise links, `Designed by Sawazki Electronics` rechts mit Link auf die Sawazki-Electronics-Homepage.
- 2026-07-07: PythonLab und Workbook mit eigenen fotorealistischen PNG-Logos/Favicons ausgestattet, Workbook-Navigationsicon unterscheidbar gemacht und offizielle SwissEduc-PythonKara-Links im Workbook ergänzt.
- 2026-07-07: HTML-Workbook zu BPE 5 und BPE 7 unter `workbook/` in PythonLab eingebunden, neuen Reiter **Workbook** mit Lesemodus-Übersicht ergänzt und Rücklinks vom Workbook zurück zu PythonLab gesetzt.
- 2026-06-29: KI-Aktivierungsdialog gekürzt, schwebenden Feedback-Button mit
  vorbereitetem GitHub-Issue-Fallback ergänzt und Lektion 16 `debug-rabatt`
  fairer auf letzte Ausgabe `40` geprüft.
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
- 2026-06-19: Etappe 04 zu einem eigenen Funktionsabschnitt mit drei aufeinander aufbauenden Lektionen erweitert.
- 2026-06-19: Zwei neue geprüfte Aufgaben zu Funktionen ohne Parameter und Funktionen mit Parametern ergänzt.
- 2026-06-19: Fahrtkostenaufgabe als Transfer zu Parametern und Rückgabewerten eingeordnet.
- 2026-06-19: Hover-Kontrast der linken Navigation im Dark Mode verbessert.
- 2026-06-19: Vertiefung und Plus auf blaue Farbabstufungen umgestellt und Lektionsseiten entsprechend akzentuiert.
- 2026-06-19: Alle 34 Codebeispiele auf Lektionsseiten direkt ausführbar gemacht; Eingabebeispiele erhalten veränderbare Testdaten.
- 2026-06-19: Aufgabenbutton freundlicher gestaltet und Dark Mode als Standard für neue Browserprofile festgelegt.
- 2026-06-19: Versionsparameter für CSS, Inhalte, App und Python-Worker ergänzt.
- 2026-06-19: Dynamische Prüfung mit konkreten Python-Diagnosen und drei gestuften Hinweisen je Aufgabe ergänzt.
- 2026-06-19: Funktionsaufgaben um mehrere Testwerte sowie AST- und Signaturprüfungen erweitert.
- 2026-06-19: Erfolgreiche Programmierprüfung mit dem Abschluss der zugehörigen Lektion verbunden.
- 2026-06-19: Freiwilligen Gemini-Lerncoach samt sicherem Cloudflare-Worker und lokalem Fallback vorbereitet.
- 2026-06-19: v0.10.0-Stand committet, nach `main` gepusht und `resources/` (inkl. Bildungsplan-PDF) vollständig aus dem öffentlichen Repository ausgeschlossen.
- 2026-06-19: Modul Python Plus um die Lektionen „Listen erweitern“ (listen-methoden) und „Text bearbeiten“ (strings) erweitert.
- 2026-06-19: Befehlsbibliothek von zehn auf neunzehn Karten ausgebaut (Kommentare, f-Strings, `%`/`//`, `round()`, String-Methoden, String-Indizierung, Listenmethoden, `range()` mit Schritt, Fehlermeldungen).
- 2026-06-19: Acht neue, automatisch geprüfte Programmieraufgaben ergänzt, darunter freie Transferaufgaben zu Alternativen, Schleifen, Funktionen und Text; alle mit Musterlösung getestet.
- 2026-06-19: Vier neue Erfolge ergänzt, inklusive Serien-Erfolg über den neuen Bedingungstyp `streak` in `app.js`.
- 2026-06-19: Vier neue Nachschlagekarten zu f-Strings, Textbearbeitung, Listen und Rest/Teilen ergänzt.
- 2026-06-19: Design veredelt – Verlaufs- und Schattensystem, Hover-Lifts, animierte Fortschrittsbalken, Inhaltseinblendung und XP-Hervorhebung bei erhaltener Grünidentität; `prefers-reduced-motion` respektiert.
- 2026-06-19: Stand auf Desktop (1280) und Mobil (390) sowie in Light und Dark Mode geprüft; neue Aufgaben real über Pyodide bestanden, keine Konsolenfehler.
- 2026-06-19: XP-System auf exakt 6000 erreichbare Punkte skaliert, Levelgrenzen erweitert und eine anklickbare Punkteerklärung ergänzt.
- 2026-06-19: Lernzielkästen in ein ruhiges Grünsystem überführt und Karten-Hover ohne unruhigen oberen Farbstreifen veredelt.
- 2026-06-19: Zweiseitige Struktogramm-Alternativen mit exakt zusammentreffenden SVG-Diagonalen, Fragezeichen sowie ausgeschriebenen Zweigen `Ja` und `Nein` an den hus-Stil angenähert.
- 2026-06-19: Gemeinsame Arbeitsregeln für Mensch, Claude Code und Codex unter `docs/ZUSAMMENARBEIT.md` festgehalten.
- 2026-06-19: Textüberlagerung im Punktefenster durch stabile Textcontainer innerhalb der Listenzeilen behoben.
- 2026-06-19: Kompetenzansicht mit drei BPE5-Bereichen, vierzehn Ich-kann-Zielen und automatisch berechnetem Übungsstand umgesetzt.
- 2026-06-19: Vier BPE5-nahe Transferaufgaben zu Preisangebot, Mietzuschuss, Taschengeld und Fischbestand ergänzt und mit Musterlösungen geprüft.
- 2026-06-19: Gesamtumfang auf sechsundzwanzig Programmieraufgaben und 6600 erreichbare XP erweitert.
- 2026-06-19: GitHub-Pages-Liveprüfung als verbindlichen Bestandteil jeder Veröffentlichung in `docs/ZUSAMMENARBEIT.md` dokumentiert und angewendet.
- 2026-06-19: Neue Aufgabenkategorie **Anwendung** (`difficulty: "extra"`) mit Filter, Label und eigener Farbe (Light/Dark) eingeführt.
- 2026-06-19: Erste Anwendungsaufgabe **Fibonacci-Folge** ergänzt, Musterlösung real über Pyodide bestanden; Gesamt-XP auf 6800 angehoben.
- 2026-06-19: Kopfzeilen-Icon für den Struktogrammer Web durch ein eigenes grünes SVG (Struktogramm-Marke) im einheitlichen Stroke-Stil ersetzt.
- 2026-06-19: Bestätigt, dass der Lernzielkasten „Danach kannst du ...“ in Light und Dark Mode grün dargestellt wird (frühere gelbe Darstellung war ein veralteter Browserstand).
- 2026-06-20: Lektions-Struktogramme (`lesson.structogram`) für Sequenz, Verzweigungen und Schleifen ergänzt; zuvor versehentlich ohne Daten ausgelieferten Rendercode damit funktional gemacht.
- 2026-06-20: Fibonacci nach OneNote-Aufbau ausgebaut – Einstieg ohne Funktion plus Funktionsaufbau, beide in Kategorie Anwendung; neuer optionaler `exercise.story`-Block mit Motivation, SVG-Illustration und Erklärvideo. Gesamt-XP auf 6950.
- 2026-06-20: Lokalen Lerncoach erweitert (fehlender Doppelpunkt, `print` ohne Klammern, AttributeError/ModuleNotFoundError/RecursionError/EOFError) und Abschnitt „KI-Lerncoach aktivieren“ in README ergänzt.
- 2026-06-20: Integritätsprüfung (eindeutige IDs, Bezüge, XP-Summe) sowie alle Ansichten, beide Themes und 390/1280 px im Browser geprüft; beide Fibonacci-Lösungen real über Pyodide bestanden.
- 2026-06-20: **Primzahlen-Werkstatt** als dritte Aufgabe der Kategorie Anwendung ergänzt: Teil 1 ohne Parameter, Teil 2 mit Parameter und booleschem Rückgabewert, Prüfung der Zahlen 1 bis 50; mit eigener Illustration, Wikipedia-Weiterlesen und 250 XP. Gesamtumfang: 29 Aufgaben und 7200 XP.
- 2026-06-20: Optionalen Aufgaben-Storyblock um Rasterbilder, kompakte Faktenkarten und Quellenlinks erweitert.
- 2026-06-21: Freiwilligen KI-Modus als Sitzungsschalter umgesetzt: transparenter
  Zustimmungsdialog, automatische Denkimpulse nach fehlgeschlagenen Prüfungen,
  manueller Abruf, Sitzungscache und konsequent lokale XP-Entscheidung.
- 2026-06-21: Gemini-Worker auf Flash-Lite, strukturiertes
  lösungsvermeidendes Feedback, Zeitlimit sowie kombinierte
  Sitzungs- und IP-Begrenzung aktualisiert; Browser- und Mock-Worker-Ablauf geprüft.
- 2026-06-21: Ausgabeprüfung für alternative korrekte Lösungen toleranter
  gemacht. Satzzeichen, Schreibweise, Dezimaldarstellung und beschriftete
  Zahlenausgaben werden sinnvoll normalisiert; Abweichungen nennen die erste
  betroffene Zeile.
- 2026-06-21: Zu stark vorgezeichnete Startcodes der Fibonacci- und
  Primzahlen-Aufgaben auf knappe Funktions- beziehungsweise Schleifengerüste
  reduziert.
- 2026-06-21: KI-Modus-Aktivierung erleichtert – CLI-freie Worker-Deployment-
  Variante über das Cloudflare-Dashboard samt Funktionstest dokumentiert; den
  kostenlosen Direkt-Dienst (pollinations.ai) nach CORS-/Datenschutzprüfung
  verworfen; `node_modules/` aus dem Repo ausgeschlossen.

## Offen Priorisiert

1. Schulische Datenschutz- und Tariffreigabe für den KI-Modus weiter klären,
   Nutzung/Kosten beobachten und den Cloudflare-/Gemini-Betrieb regelmäßig
   kontrollieren.
2. Teilpunkte und visuelle Kompetenz-Rubriken für längere Transferaufgaben entwickeln.
3. Weitere Struktogramm-Transferaufgaben ergänzen, besonders alltagsnahe und geschachtelte Abläufe.
4. Befehlsbibliothek bei didaktischem Bedarf um `enumerate()` und Wörterbücher erweitern; beides liegt außerhalb des engsten BPE5-Kerns.
5. KA-Webarbeit aus `implementations/KA` als nicht benotete Übungsvorbereitung prüfen und integrieren.
6. Den ikonischen Einstieg aus Lernfortschritt 1 didaktisch prüfen und bei Bedarf als optionales Einstiegsmodul umsetzen.
7. GUI-Inhalte aus Lernfortschritt 2 als optionales Python-Plus-Modul prüfen.
8. Struktogrammer Web stärker verzahnen, zum Beispiel durch konkrete Aufgabenlinks oder Import-/Export-Hinweise.
9. Kategorie **Anwendung** weiter ausbauen: Nach Fibonacci und Primzahlen weitere alltags- und anwendungsnahe Aufgaben aus dem J1-Unterricht (Quelle: OneNote „5. Grundlagen der Programmierung“) ergänzen, die zeigen, wofür Python eingesetzt wird.
10. Screenshots nach den UI-Änderungen ab 0.12.0 erneuern (Preview-Screenshots in der aktuellen Agent-Umgebung nicht verfügbar; lokal nachholen).

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
