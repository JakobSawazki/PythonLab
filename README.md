# PythonLab

**Aktuelle Version:** 0.20.1
**Dokumentationsstand:** 7. Juli 2026
**Live:** https://jakobsawazki.github.io/PythonLab/
**Repository:** https://github.com/JakobSawazki/PythonLab

Browserbasierte Lernumgebung für Schülerinnen und Schüler des
nichtgewerblichen beruflichen Gymnasiums. Die Anwendung behandelt die
Bildungsplaneinheit 5 „Grundlagen der Programmierung“ in Jahrgangsstufe 1 mit
Python.

![Übersicht von PythonLab](docs/screenshots/startseite-desktop.png)

## Ziel und Vorhaben

PythonLab soll Lernenden einen ruhigen, verständlichen und
bildungsplanorientierten Einstieg in die Programmierung ermöglichen. Jeder
Themenbereich folgt demselben Lernzyklus:

1. Eine neue Idee wird in kleinen Schritten erklärt.
2. Kurze Beispiele machen den Programmablauf sichtbar.
3. Eine Verständnisfrage prüft den fachlichen Kern.
4. Die Lernenden schreiben oder planen selbst eine Lösung.
5. Automatisches Feedback ermöglicht beliebig viele weitere Versuche.

Das Portal ist als Übungs- und Vertiefungsumgebung gedacht. Es ist derzeit
kein manipulationssicheres Prüfungssystem und ersetzt weder die Lehrkraft noch
die im Unterricht eingesetzten Entwicklungswerkzeuge.

## Fachliche Grundlage

Maßgeblich sind die Materialien des Landesbildungsservers Baden-Württemberg
für die nichtgewerblichen beruflichen Gymnasien:

- Jahrgangsstufe 1, BPE 5 „Grundlagen der Programmierung“
- Version mit Python, Stand 31.07.2025
- [Offizieller Download](https://www.schule-bw.de/resolveuid/4bf04e3081af47f9aa0a7455778f3cbe)
- [Materialübersicht](https://www.schule-bw.de/faecher-und-schularten/mathematisch-naturwissenschaftliche-faecher/informatik/material/materialien-zum-neuen-bildungsplan-informatik-an-den-nichtgewerblichen-beruflichen-gymnasien)

Die vollständige Materialsammlung mit Informationsblättern, Aufgaben und
Musterlösungen liegt lokal im Projektordner, wird aber per `.gitignore` aus
dem öffentlichen GitHub-Pages-Repository herausgehalten:

`G:\Meine Ablage\Codex\PythonLab\resources\bpe-5-grundlagen-der-programmierung-version-mit-python\bpe-5-gdp_python`

Musterlösungen und private Originaldateien werden nicht in dieses öffentliche
Repository übernommen.

## Aktueller Funktionsumfang

- fünf Etappen mit insgesamt sechzehn Python-Lektionen, in den Kontrollstruktur-Lektionen jeweils mit eingebettetem Struktogramm
- neunundzwanzig automatisch prüfbare Programmieraufgaben, davon mehrere
  freie Transferaufgaben sowie eine eigene Kategorie **Anwendung** mit
  Fibonacci- und Primzahlwerkstatt inklusive Motivationstexten und Illustrationen
- eigener Reiter **Befehle** mit neunzehn Python-Basiselementen, Beispielen,
  Detailseiten und kleinen XP-Aufgaben
- Struktogramm-Labor mit fünf Grundformen und fünf geprüften Übungen
- echter Python-Interpreter im Browser über Pyodide
- insgesamt 7200 erreichbare XP, feinere Levelstufen, Lernfortschritt und siebzehn Erfolge inklusive Serien-Erfolg
- eigene Kompetenzansicht mit vierzehn verständlichen BPE5-Ich-kann-Zielen und automatisch berechnetem Übungsstand
- lokales Lernprofil mit Name oder Kürzel
- Speicherung von Code- und Struktogramm-Entwürfen
- Export und Import des vollständigen Lernstands als JSON-Datei
- direkter Kopfzeilen-Link zum Struktogrammer Web
- eigenes grünes Struktogramm-Icon für den Struktogrammer-Web-Link, passend zur übrigen Icon-Leiste
- Dark Mode als Standard und weiterhin umschaltbarer Light Mode
- alle 40 Erklärungsbeispiele direkt auf der Lektionsseite ausführbar
- dynamische Aufgabenprüfung mit konkreten Python-Diagnosen und gestuften Lernhinweisen
- tolerante Ausgabeprüfung: unterschiedliche sinnvolle Formatierungen,
  unwichtige Satzzeichen und beschriftete Zahlen werden akzeptiert; echte
  Abweichungen nennen direkt die betroffene Ausgabezeile
- bestandene Programmieraufgabe schließt die zugehörige Lektion zuverlässig ab
- lokaler Lerncoach, der häufige Anfängerfehler (fehlender Doppelpunkt, `print` ohne Klammern, Fehlertypen wie NameError oder TypeError) verständlich erklärt – ganz ohne Backend und Datenübertragung
- freiwillig aktivierbarer Gemini-Lerncoach: Nach Zustimmung gibt er nach fehlgeschlagenen Prüfungen automatisch kleine Denkimpulse; identische Anfragen werden für die Sitzung zwischengespeichert (siehe „KI-Lerncoach aktivieren“)
- schwebender Feedback-Button unten rechts: öffnet ohne zusätzliches Secret ein vorbereitetes GitHub-Issue und kann später über einen geschützten `feedbackEndpoint` direkt angebunden werden
- kompakter Nachschlagebereich
- eigener Reiter **Workbook**: ruhiger Lesemodus mit dem eingebundenen HTML-Workbook zu BPE 5 und BPE 7 (`workbook/`), inklusive Rücklink zu PythonLab
- eigene fotorealistische PNG-Brandmarks für PythonLab und Workbook: Browser-Favicons, PythonLab-Sidebarlogo und Workbook-Logo in der Workbook-Navigation
- schlichter Footer-Hinweis `Designed by Sawazki Electronics`
- responsive Oberfläche für Computer, Tablet und Smartphone
- Tastaturbedienung und semantische Bedienelemente

## Lerninhalte

### Python

- Sequenz und Ausgabe mit `print()`
- Variablen und Datentypen
- Rechenoperatoren
- Eingaben und Typumwandlung
- einseitige und zweiseitige Verzweigungen
- logische Operatoren `and`, `or` und `not`
- `for`- und `while`-Schleifen
- eigener Funktionsabschnitt: Funktionen ohne Parameter, mit Parametern und mit Rückgabewert
- Listen als Erweiterung sowie Listen erweitern mit `append()`, `pop()` und `in`
- Text bearbeiten mit f-Strings, String-Methoden und Indizierung
- systematische Fehlersuche

### Befehle

Der Reiter **Befehle** bündelt die wichtigsten Sprachmittel aus BPE 5 als
kurze, wiederholbare Syntaxkarten. Enthalten sind Ausgabe, Eingabe,
Typumwandlung, Vergleiche, Alternativen, logische Operatoren, Schleifen,
Funktionen und Listen sowie ergänzend Kommentare, f-Strings, Rest- und
Ganzzahldivision, `round()`, String-Methoden, String-Indizierung,
Listenmethoden, `range()` mit Schrittweite und das Lesen von Fehlermeldungen.
Jede Karte führt zu einer Detailseite mit Erklärung, Beispiel, typischen
Stolperstellen und einer Miniaufgabe.

### Struktogramme

- Sequenz
- zweiseitige Alternative
- geschachtelte Alternative
- zählergesteuerte Schleife
- kopfgesteuerte Schleife
- Übersetzung zwischen sprachneutralem Ablauf und Python-Code

![Struktogramm-Labor](docs/screenshots/struktogramme-desktop.png)

## Technische Architektur

Das Projekt ist bewusst als statische Single-Page-Anwendung ohne Build-Schritt
aufgebaut. Dadurch kann es direkt über GitHub Pages veröffentlicht werden.

| Datei | Verantwortung |
| --- | --- |
| `index.html` | App-Shell, Hauptnavigation und Profildialog |
| `styles.css` | Gestaltung, Struktogramme und responsive Darstellung |
| `content.js` | Module, Lektionen, Aufgaben, Erfolge und Referenzen |
| `app.js` | Routing, Rendern, Lernstand, XP und Prüfungen |
| `python-worker.js` | Python-Ausführung mit Pyodide im Web Worker |
| `config.js` | öffentliche, schlüsselfreie Konfiguration optionaler Dienste |
| `services/ai-feedback-worker/` | optionaler Gemini-Proxy ohne API-Schlüssel im Browser |
| `assets/` | selbst erzeugte Bildmedien und Struktogrammer-Mark |
| `docs/` | fachliche, technische und visuelle Dokumentation |

Hash-Routing wie `#lesson/sequenz` oder `#structograms` hält alle Ansichten mit
GitHub Pages kompatibel.

## Lernstand und Datenschutz

Der Lernstand wird aktuell unter dem Schlüssel `pythonlab-v1` im
`localStorage` des Browsers gespeichert. Enthalten sind:

- Name oder Kürzel
- XP und Aktivitätstage
- abgeschlossene Lektionen
- gelöste Python-Aufgaben
- gelöste Befehls-Miniaufgaben
- gelöste Struktogramm-Aufgaben
- Codeentwürfe
- Struktogramm-Entwürfe

JSON-Sicherungen müssen das aktuelle App-Kennzeichen `PythonLab` tragen. Ältere
Zwischenstände aus der Entwicklungsphase werden nicht mehr als offizielles
Importformat geführt.

Die lokale Prüfung, der Lernstand und alle Kernfunktionen benötigen kein
Backend und kein zentrales Schülerkonto. Der optionale KI-Modus ist zunächst
ausgeschaltet und gilt nach einer bewussten Zustimmung nur für die aktuelle
Browsersitzung. Im aktiven Modus werden nach fehlgeschlagenen Prüfungen
Aufgabenbeschreibung, aktueller Code, lokales Testergebnis und Versuchszähler
an den eingerichteten Proxy und Gemini übertragen. Profilname, Lernstandsdatei,
XP und Eingabefeld werden nicht mitgesendet. Unveränderter Code wird in der
Sitzung aus einem lokalen Rückmeldungscache bedient. Die kostenlose
Gemini-Stufe kann Inhalte laut Google zur Produktverbesserung verwenden; die
Oberfläche weist deshalb vor der ersten Übertragung darauf hin.
Personenbezogene Daten gehören nicht in den Code.

Der Feedback-Button übernimmt nur Rückmeldungstext, aktuelle Seite, Route, URL
und Zeitpunkt in ein vorbereitetes GitHub-Issue. Ohne zusätzlichen
Serverless-Endpoint wird nichts automatisch abgesendet. Für direkte
GitHub-Erstellung ohne Anmeldung wäre ein Worker mit geheimem GitHub-Token oder
alternativ ein schulisch freigegebenes Formular nötig; ein Token darf niemals in
Browsercode oder `config.js` stehen.

Browserdaten können durch
Schulrichtlinien, Profilbereinigung oder einen Gerätewechsel verloren gehen.
Über das Disketten-Symbol in der Kopfzeile kann der vollständige Lernstand
deshalb als JSON-Datei gesichert und später auf demselben oder einem anderen
Gerät geladen werden. Der Browser darf den Desktop aus Sicherheitsgründen
nicht automatisch auswählen. In unterstützten Browsern erscheint ein
Speicherdialog; andernfalls landet die Datei üblicherweise im Download-Ordner.
Die gewählte Darstellung wird separat unter `pythonlab-theme-v1` im Browser
gespeichert.

## KI-Lerncoach aktivieren

PythonLab hilft Lernenden beim Programmieren auf zwei Ebenen:

1. **Lokaler Lerncoach (immer aktiv, ohne Backend).** Bei einem Klick auf
   „Lernhinweis anzeigen“ oder nach einer fehlgeschlagenen Prüfung analysiert
   die App den Code und die Fehlermeldung direkt im Browser und gibt gestufte,
   verständliche Hinweise – ohne dass Daten das Gerät verlassen. Das ist für den
   Schulbetrieb der datenschutzfreundliche Standard.
2. **Optionaler Gemini-Lerncoach (muss einmalig eingerichtet werden).** Nach
   einer transparenten Zustimmung können Lernende den KI-Modus für die aktuelle
   Browsersitzung einschalten. Nach einer fehlgeschlagenen lokalen Prüfung
   erscheint dann automatisch ein kurzer Denkimpuls mit nächsten Schritten und
   einer Rückfrage. Die vollständige Lösung wird bewusst nicht ausgegeben. Der
   API-Schlüssel liegt ausschließlich als Secret im Cloudflare Worker und
   niemals im Browser oder im Repository.

Auch wenn PythonLab privat verwaltet wird, ist ein Gemini-Schlüssel direkt in
GitHub Pages nicht sicher: Die ausgelieferten HTML- und JavaScript-Dateien sind
für jeden Browser lesbar. Google warnt ausdrücklich davor, API-Schlüssel in
produktiven clientseitigen Anwendungen fest einzubauen. Der Worker ist daher
kein Schulserver, sondern lediglich der kleine sichere Schlüssel-Tresor und
Anfragefilter vor Gemini.

Einrichtung des optionalen Gemini-Coaches:

1. Den Cloudflare Worker aus `services/ai-feedback-worker/` veröffentlichen –
   wahlweise **ohne Installation über das Cloudflare-Dashboard** (Variante A, für
   Lehrkräfte empfohlen) oder mit der wrangler-CLI (Variante B). Beide Wege sind
   Schritt für Schritt in der `README.md` des Worker-Ordners beschrieben.
2. Den Gemini-Schlüssel ausschließlich als Worker-Secret `GEMINI_API_KEY`
   hinterlegen (im Dashboard unter „Variables and Secrets“ oder per
   `wrangler secret put GEMINI_API_KEY`).
3. Die öffentliche `/feedback`-URL des Workers in `config.js` unter
   `aiFeedbackEndpoint` eintragen.
4. Vor dem Einsatz die schulische Datenschutzfreigabe und den geeigneten
   Gemini-Tarif klären. Laut aktueller Google-Preisseite können Inhalte der
   kostenlosen Stufe zur Produktverbesserung verwendet werden; für einen
   regulären Schülerbetrieb ist deshalb ein freigegebener, entsprechend
   konfigurierter Bezahlzugang die vorzugswürdige Variante.

Sobald der Endpoint gesetzt ist, erscheinen im Aufgabenbereich der
Sitzungsschalter „KI-Modus“ und die manuelle Schaltfläche „KI jetzt um Hilfe
bitten“. Die KI entscheidet nie über XP oder den Abschluss einer Aufgabe – das
übernimmt ausschließlich die lokale, reproduzierbare Prüfung. Die konkrete
Worker-Einrichtung, Grenzen und offiziellen Quellen stehen unter
`services/ai-feedback-worker/README.md`.

## Schulisch bereitgestellte Hilfsmittel

Für die Arbeit am Schul-PC stehen folgende Programme bereit:

- **[Informatik-Stick](https://schultasche-bw.de/):** zentrale
  Startmöglichkeit für die benötigten kostenlosen und schulisch freigegebenen
  Programme; Download, Dokumentation und Versionshinweise liegen auf der
  offiziellen Schultasche-BW-Seite.
- **[Thonny](https://thonny.org/):** Python-Entwicklungsumgebung
- **[PythonKara](https://www.swisseduc.ch/informatik/karatojava/pythonkara/):**
  offizieller SwissEduc-Download für Kapitel 1; lokal ausführbar, z. B. mit der
  Java-17-JAR von SwissEduc
- **[Struktogrammer Web](https://jakobsawazki.github.io/struktogrammer-web/):**
  lokales Schwesterprojekt für freie Nassi-Shneiderman-Struktogramme
- **[hus Struktogrammer](https://struktogrammer.ch/Web_files/page1_JavaVersion.html):**
  Java-Anwendung für Struktogramme

Thonny und der hus Struktogrammer sind auf den Schul-PCs installiert und
zusätzlich über den Informatik-Stick erreichbar. Der hus Struktogrammer liegt
außerdem als Java-Datei in den Unterrichtsmaterialien. Der Struktogrammer Web
liegt im lokalen Schwesterordner `G:\Meine Ablage\Codex\Struktogrammer` und ist
in PythonLab oben rechts sowie im Nachschlagebereich auf die Live-Version
verlinkt.

Nach schulischer Vorgabe sind diese Werkzeuge für den Informatikunterricht und
die entsprechend freigegebenen Prüfungssituationen vorgesehen. Für
schriftliche und mündliche Abiturprüfungen sind immer die jeweils aktuellen
Prüfungsanweisungen der Schule maßgeblich.

## Lokal starten

Wegen des Web Workers muss die Anwendung über einen lokalen HTTP-Server
geöffnet werden:

```powershell
python -m http.server 4173
```

Danach `http://localhost:4173` öffnen.

## Qualitätssicherung

Vor Veröffentlichungen werden mindestens folgende Prüfungen durchgeführt:

- Syntaxprüfung von `app.js`, `content.js` und `python-worker.js`
- reale Ausführung und Prüfung mehrerer Python-Aufgaben
- vollständiger Durchlauf aller Struktogramm-Aufgaben
- Desktopprüfung mit 1440 × 1000 Pixeln
- Mobilprüfung mit 390 × 844 Pixeln
- Kontrolle auf horizontales Überlaufen und Browserfehler
- abschließender Abruf der GitHub-Pages-Version

## Versionsverlauf

### 0.20.1 – 7. Juli 2026

- Footer der Workbook-Startseite aufgeräumt: fachliche BPE-/Quellenhinweise liegen nun hinter einem kleinen Info-Button unten links
- rechts im Workbook-Startseitenfooter `Designed by Sawazki Electronics` mit Link auf die Sawazki-Electronics-Homepage ergänzt
- Workbook-Startseite auf `assets/style.css?v=1.9` und `assets/workbook.js?v=1.9` aktualisiert

### 0.20.0 – 7. Juli 2026

- eingebettetes SVG-Favicon von PythonLab durch eigene PNG-Assets ersetzt (`assets/pythonlab-logo.png`, `pythonlab-favicon.png`, `pythonlab-apple-touch.png`)
- Workbook um eigenes fotorealistisches PNG-Logo und Tab-Icon ergänzt (`workbook/assets/workbook-logo.png`, `workbook-favicon.png`, `workbook-apple-touch.png`)
- Workbook-Symbol in der PythonLab-Navigation auf `clipboard-list` geändert, damit es sich klar vom Nachschlagebereich unterscheidet
- offizielle PythonKara-Seite von SwissEduc im Workbook an passenden Stellen verlinkt: Startseite/Werkzeuge, Kapitel 1, Glossar und Spickzettel
- Cache-Bust-Versionen in PythonLab auf `0.20.0` und im Workbook auf `1.8` angehoben

### 0.19.0 – 7. Juli 2026

- neues eingebundenes **Workbook** unter `workbook/` übernommen; es enthält das HTML-Lehrbuch zu BPE 5 und BPE 7 mit Kapiteln, Glossar, Spickzettel und Ich-kann-Checklisten
- linken Navigationsreiter **Workbook** ergänzt und in `app.js` eine eigene `#workbook`-Übersichtsseite gebaut, die den Lehrbuchbereich bewusst vom XP-Übungsbereich trennt
- Workbook-Seiten mit Rücklink `← PythonLab` versehen und den Link im Workbook-Design hervorgehoben
- Cache-Bust-Versionen in `index.html` auf `0.19.0` angehoben

### 0.18.1 – 29. Juni 2026

- KI-Aktivierungsdialog deutlich gekürzt: nur noch wichtigste Hinweise zu
  Datenübertragung, personenbezogenen Daten und XP-Entscheidung.
- schwebenden Feedback-Button unten rechts ergänzt; ohne zusätzlichen
  Feedback-Server öffnet er ein vorbereitetes GitHub-Issue und bietet eine
  Kopierfunktion als Fallback.
- Aufgabe `debug-rabatt` aus Lektion 16 fairer geprüft: Entscheidend ist jetzt
  der letzte ausgegebene Zahlenwert `40`, nicht zwingend die interne Variable
  `gesamt`.

### 0.17.1 – 21. Juni 2026

- KI-Modus-Aktivierung erleichtert: zusätzliche Deployment-Variante des Workers
  **ohne CLI direkt im Cloudflare-Dashboard** sowie ein kurzer Funktionstest in
  `services/ai-feedback-worker/README.md`; Haupt-README auf beide Wege verwiesen
- kostenlosen schlüssellosen Direkt-Dienst (pollinations.ai) geprüft und bewusst
  verworfen (Browser-CORS und Datenschutz beim Senden von Schülercode an einen
  Drittanbieter); maßgeblich bleibt der eigene, sichere Gemini-Worker
- `node_modules/` in `.gitignore` aufgenommen (Worker-Abhängigkeiten gehören nicht ins Repo)
- reine Dokumentations- und Hygieneänderung; kein App-Code und keine
  Cache-Bust-Version verändert

### 0.17.0 – 21. Juni 2026

- freiwilligen KI-Modus als Sitzungsschalter in den Lerncoach integriert; vor
  der ersten Übertragung erklärt ein eigener Dialog verständlich, welche Daten
  gesendet werden und welche lokal bleiben
- automatische, kurze KI-Hilfe nach fehlgeschlagenen lokalen Prüfungen ergänzt;
  XP und Aufgabenabschluss bleiben ausschließlich bei den reproduzierbaren Tests
- unveränderte Anfragen werden in der Sitzung zwischengespeichert, parallele
  Anfragen verhindert und veraltete Antworten nach Code- oder Seitenwechsel
  nicht mehr eingeblendet
- Ausgabeprüfungen semantisch toleranter gestaltet: Das im Screenshot fehlende
  Ausrufezeichen, verschiedene Groß-/Kleinschreibung und sinnvoll beschriftete
  Zahlenausgaben führen nicht mehr fälschlich zum Abbruch; bei echten Fehlern
  wird die konkrete Ausgabezeile genannt
- stark vorgezeichnete Startcodes bei Fibonacci und Primzahlen auf offene,
  lernförderliche Gerüste reduziert
- Gemini-Worker auf strukturiertes, lösungsvermeidendes Feedback mit Stärke,
  ein bis zwei nächsten Schritten, Denkimpuls und Reflexionsfrage ausgerichtet
- schulfreundliche Begrenzung pro anonymer Sitzung und zusätzlich pro IP,
  Zeitlimit sowie Flash-Lite-Modell ergänzt
- Einrichtungs-, Datenschutz- und Übergabedokumentation aktualisiert; der
  öffentliche Endpoint wird erst nach Cloudflare-Deploy und bewusster Freigabe
  in `config.js` aktiviert

### 0.16.0 – 20. Juni 2026

- neue Anwendungsaufgabe **Primzahlen-Werkstatt** mit zwei aufeinander aufbauenden
  Teilen: feste Zahl ohne Parameter sowie `ist_primzahl(n)` mit booleschem
  Rückgabewert und vollständiger Ausgabe von 1 bis 50
- robuste automatische Prüfung für Funktionssignaturen, `True`/`False`, Grenzfälle,
  Schleife, Modulo-Logik und die geforderten Ausgabezeilen
- motivierender Primzahl-Einstieg mit eigener Illustration, Merkkarten und
  weiterführendem Wikipedia-Link; Bedeutung als Zahlbausteine und für Kryptografie
- Story-Komponente um Rasterbilder, Faktenkarten und Quellenlinks erweitert
- Gesamtumfang auf 29 Programmieraufgaben und 7200 erreichbare XP erhöht

### 0.15.0 – 20. Juni 2026

- Fibonacci-Aufgabe ausgebaut: eigener motivierender Einstieg ohne Funktion (drei
  Variablen, for-Schleife) plus aufbauende Funktionsaufgabe; beide in der Kategorie
  **Anwendung** und mit Musterlösung real über Pyodide geprüft
- neuer optionaler Aufgaben-Block mit Motivationstext, Fibonacci-Illustration
  (Goldenes-Rechteck-Struktogramm aus den Zahlen 1, 1, 2, 3, 5, 8) und Erklärvideo
- in den Kontrollstruktur-Lektionen (Sequenz, Verzweigungen, Schleifen) jeweils ein
  passendes Struktogramm direkt in der Lektion eingebettet – als Brücke zum Abitur
- prominenter Hinweis im Struktogramm-Bereich auf den im Abitur zugelassenen hus Struktogrammer
- lokaler Lerncoach erweitert: erkennt zusätzlich fehlende Doppelpunkte, `print` ohne
  Klammern sowie AttributeError, ModuleNotFoundError, RecursionError und EOFError
- erreichbare Gesamt-XP auf 6950 erhöht; Punkteanzeige berechnet die Summe weiterhin zur Laufzeit
- Abschnitt „KI-Lerncoach aktivieren“ ergänzt; Desktop und Mobil, Light und Dark sowie Browserkonsole geprüft

### 0.14.0 – 19. Juni 2026

- neue Aufgabenkategorie **Anwendung** eingeführt und als Filter im Reiter **Üben** ergänzt
- erste Anwendungsaufgabe **Fibonacci-Folge** ergänzt: Funktion `fibonacci(anzahl)`
  mit Liste der ersten Fibonacci-Zahlen, mit Musterlösung real über Pyodide geprüft
- erreichbare Gesamt-XP dadurch auf 6800 erhöht (Punkteanzeige berechnet die Summe weiterhin zur Laufzeit)
- Kopfzeilen-Icon für den Struktogrammer Web durch ein eigenes, an die Struktogramm-Marke
  angelehntes SVG ersetzt; gleicher grüner Stroke-Stil wie die übrigen Symbole
- Desktop (1280) und Mobil (390) sowie Light und Dark Mode ohne horizontalen Überlauf und ohne Konsolenfehler geprüft
- Übergabe- und Zusammenarbeitsregeln in `docs/ZUSAMMENARBEIT.md` fortgeschrieben (XP-Zielwert, Teamnotiz)

### 0.13.0 – 19. Juni 2026

- Textüberlagerung im Punktefenster behoben; Hervorhebungen bleiben jetzt innerhalb des jeweiligen Listentextes
- neue Kompetenzansicht mit drei BPE5-Kompetenzbereichen und vierzehn verständlich formulierten Ich-kann-Zielen ergänzt
- Kompetenzfortschritt aus abgeschlossenen Lektionen, Aufgaben, Befehlen und Struktogrammen berechnet; ausdrücklich als Lernhilfe statt Note gekennzeichnet
- vier eigenständig formulierte BPE5-Transferaufgaben ergänzt: Preisangebot, Mietzuschuss, Taschengeldtabelle und Fischbestand
- Gesamtumfang auf sechsundzwanzig Programmieraufgaben und 6600 erreichbare XP erweitert
- neue Aufgaben mit Musterlösungen, AST-Prüfungen und erwarteten Ausgaben getestet
- Desktop-, Dark-Mode- und 390-Pixel-Mobilansicht ohne horizontalen Überlauf geprüft
- offene Aufgabenliste bereinigt: doppelten Teilpunkte-Eintrag entfernt, Kompetenzansicht und Live-Prüfroutine als erledigt markiert

### 0.12.0 – 19. Juni 2026

- XP aller Lernaktivitäten auf ein transparentes Gesamtsystem mit exakt 6000 erreichbaren Punkten skaliert und Levelgrenzen entsprechend erweitert
- anklickbare XP-Anzeige mit einer kurzen, schülergerechten Erklärung ergänzt
- Lernzielkasten „Danach kannst du ...“ von Gelb auf ein ruhiges, hochwertiges Grünsystem umgestellt
- Karten-Hover ohne aufgesetzten oberen Farbstreifen gestaltet; stattdessen ein gleichmäßiger Rahmen, Schatten und dezenter Lift
- zweiseitige Alternativen hus-näher gezeichnet: beide Diagonalen treffen sich exakt im unteren Mittelpunkt, Bedingungen enden mit `?`, Zweige heißen `Ja` und `Nein`
- Struktogramm-Hinweis fachlich präzisiert: Für konkrete Prüfungen gelten die jeweils aktuellen schulischen Vorgaben
- Desktop- und Mobilansicht sowie Syntax, Inhaltsbeziehungen, XP-Summe und Browserkonsole geprüft
- gemeinsame Arbeits- und Übergaberegeln für Mensch, Claude Code und Codex in `docs/ZUSAMMENARBEIT.md` dokumentiert

### 0.11.0 – 19. Juni 2026

- Modul **Python Plus** um die Lektionen „Listen erweitern“ und „Text bearbeiten“ ergänzt
- neun zusätzliche Befehlskarten (Kommentare, f-Strings, `%`/`//`, `round()`,
  String-Methoden, String-Indizierung, Listenmethoden, `range()` mit Schritt,
  Fehlermeldungen) mit Beispielen, Stolperstellen und Miniaufgaben
- acht neue, automatisch geprüfte Programmieraufgaben, darunter freie
  Transferaufgaben zu Alternativen, Schleifen, Funktionen und Text
- vier neue Erfolge inklusive eines Serien-Erfolgs für Übung an drei Tagen in Folge
- neue Referenzkarten zu f-Strings, Textbearbeitung, Listen und Rest/Teilen
- Design veredelt: kohärentes Verlaufs- und Schattensystem, weiche Hover-Lifts
  auf Karten und Buttons, feinere Radien, animierte Fortschrittsbalken,
  Einblendung des Inhalts und dezente XP-Hervorhebung – Grünidentität bleibt erhalten
- Reduzierte-Bewegung-Voreinstellung der Lernenden wird respektiert
- alle Änderungen auf Desktop und Mobil sowie in Light und Dark Mode geprüft

### 0.10.0 – 19. Juni 2026

- dynamische Codeprüfung um konkrete Assertion-, Syntax- und Laufzeitdiagnosen erweitert
- für alle vierzehn Aufgaben drei gestufte, lokal erzeugte Lernhinweise ergänzt
- Funktionsaufgaben mit zusätzlichen AST-, Signatur- und Testwertprüfungen abgesichert
- bestandene Programmieraufgabe schließt nun auch die zugehörige Lektion ab
- freiwilligen KI-Lerncoach in der Oberfläche vorbereitet; KI entscheidet nie über XP oder Abschluss
- sicheren Cloudflare-Worker für Gemini mit CORS, Größenlimit, Rate-Limit und JSON-Validierung ergänzt
- Gemini-Schlüssel konsequent aus Browser, GitHub Pages und Repository herausgehalten
- Datenschutz- und Ausfallhinweise sowie vollständigen lokalen Fallback ergänzt

### 0.9.0 – 19. Juni 2026

- Etappe 04 zu einem eigenen Lernabschnitt über Funktionen mit drei Lektionen ausgebaut
- Funktionen ohne Parameter, Parameter und Rückgabewerte jeweils schrittweise erklärt
- zwei neue automatisch geprüfte Funktionsaufgaben ergänzt
- Fahrtkostenaufgabe als Transferabschluss des Funktionsabschnitts eingeordnet
- vorhandene Lernstände durch Beibehaltung der bisherigen Funktions-ID kompatibel gehalten
- Schrift- und Icon-Kontrast beim Überfahren der Navigation im Dark Mode verbessert
- Vertiefung und Plus mit freundlichen, klar unterscheidbaren Blautönen gestaltet
- Schwierigkeitsfarben auch auf die Lernzielboxen der Lektionsseiten übertragen
- alle Codebeispiele um eine direkte Ausführung mit sichtbarer Ausgabe ergänzt
- Aufgabenbutton von warnendem Korallrot auf ein freundliches Blau umgestellt
- Dark Mode für neue Browserprofile als Standard festgelegt
- Styles, Inhalte, App und Python-Worker mit Versionsparametern gegen veraltete Browser-Caches abgesichert
- BPE5-Abgleich und Projektdokumentation aktualisiert

### 0.8.1 – 18. Juni 2026

- lokale BPE5-Originalmaterialien im Projekt unter `resources/` dokumentiert
- lokale KA-/Übungsvorbereitung unter `implementations/` dokumentiert
- beide lokalen Ablagen per `.gitignore` vom öffentlichen PythonLab-Repository getrennt
- Konzeptnotiz für dynamischere Codeprüfung mit optionaler KI-Unterstützung ergänzt
- Ausgabeprüfung toleranter für Leerzeilen, Zeilenabstände und Zahlen in Textausgaben gemacht
- Struktogrammer-Web-Link in der Kopfzeile als einheitlichen Icon-Button gestaltet

### 0.8.0 – 17. Juni 2026

- offiziellen Schultasche-BW-Link für den Informatik-Stick im Nachschlagebereich ergänzt
- neuen Reiter **Befehle** mit zehn Python-Basiselementen, Detailseiten,
  Beispielen und XP-Miniaufgaben erstellt
- Lernstandsmodell um `completedCommands` erweitert
- zwei Erfolge für Befehlsaufgaben ergänzt
- BPE5-Quellenstruktur im Projekt dokumentiert und Originalmaterialien bewusst
  aus dem öffentlichen Repository herausgehalten
- `TASKS.md` als zentrale Aufgaben-, Versions- und Ideenliste angelegt
- leere `tasks.txt` abgelöst

### 0.7.0 – 17. Juni 2026

- Light-/Dark-Mode mit lokal gespeicherter Auswahl ergänzt
- Theme-Schalter neben dem Lernstand-Speichern-Button eingebaut
- Footer auf `Designed by Sawazki Electronics` vereinfacht
- Sawazki-Electronics-Gegenlink auf die neue PythonLab-Pages-Adresse abgestimmt

### 0.6.0 – 17. Juni 2026

- Projektname in Oberfläche, Lernstandsdateien und Dokumentation auf PythonLab umgestellt
- Lernstandsspeicherung auf `pythonlab-v1` umgestellt und Altbestände weiterlesbar gehalten
- Struktogrammer Web über die Kopfzeile und den Nachschlagebereich verlinkt
- Struktogrammer-Mark aus dem Schwesterprojekt nach `assets/struktogrammer-mark.png` übernommen

### 0.5.0 – 9. Juni 2026

- diskrete Projektzuordnung zu Sawazki Electronics im Portal ergänzt
- gegenseitige Verlinkung mit der Sawazki-Electronics-Homepage eingerichtet

### 0.4.0 – 9. Juni 2026

- vollständigen Lernstand als versionierte JSON-Datei exportierbar gemacht
- Import mit Formatprüfung, Größenbegrenzung und Bestätigung ergänzt
- importierte Inhalte gegen vorhandene Lektionen und Aufgaben validiert
- Sicherungsdialog für Desktop, Informatik-Stick und Download-Ordner ergänzt
- Schul-PC-Verhalten und bereitgestellte Hilfsmittel dokumentiert

### 0.3.0 – 9. Juni 2026

- interaktives Struktogramm-Labor ergänzt
- fünf Grundformen mit Python-Gegenüberstellung erstellt
- fünf automatisch geprüfte Struktogramm-Aufgaben ergänzt
- XP, Entwürfe und zwei Erfolge für Struktogramme integriert
- geschachtelte Alternativen ausdrücklich behandelt
- mobile Darstellung für tief verschachtelte J-/N-Zweige optimiert
- BPE-5-Abgleich und Übergabe aktualisiert
- Git-Commit: `75b02ce`

### 0.2.0 – 9. Juni 2026

- offiziellen Materialstand vom 31.07.2025 verifiziert
- Kompetenzraster und Ich-kann-Listen der Lernfortschritte 1 bis 3 abgeglichen
- fachliche Abdeckungsmatrix angelegt
- private Unterrichtsmaterialien vom öffentlichen Projekt getrennt
- Git-Commit: `de94938`

### 0.1.0 – 9. Juni 2026

- erste vollständige Lernumgebung veröffentlicht
- zwölf Lektionen und zwölf Python-Aufgaben erstellt
- Pyodide-Ausführung, Lernprofil, XP, Level und Erfolge implementiert
- responsive Desktop- und Mobiloberfläche aufgebaut
- GitHub Pages aktiviert
- Git-Commit: `87761e3`

## Offene und mögliche Weiterentwicklung

Priorisiert:

1. Weitere bildungsplanorientierte Transferaufgaben ergänzen.
2. BPE5-Materialien weiter in eigene PythonLab-Aufgaben übertragen, ohne
   Originalarbeitsblätter oder Musterlösungen ungeprüft zu veröffentlichen.
3. Übungsvorbereitung aus `implementations/KA` als nicht benotete
   Wissensabfrage in PythonLab einbinden.

Optional:

- weitere Verzahnung mit Struktogrammer Web
- Teilpunkte und visuelle Kompetenz-Rubriken für komplexere Aufgaben
- GUI-Kapitel mit Python
- Lernstandsynchronisation über ein datenschutzkonformes Backend
- separater Prüfungsmodus mit Authentifizierung
- Lehrkraftansicht für selbst zusammengestellte Aufgaben

## Einstieg für einen weiteren Codex-Agenten

1. Dieses `README.md` vollständig lesen.
2. `UEBERGABE_Codex.md` und `docs/BPE5_ABGLEICH_2025.md` lesen.
3. `git status -sb` und `git log --oneline -5` prüfen.
4. `TASKS.md` von oben nach unten prüfen und fortschreiben.
5. Bestehende Gestaltung und Datenmodelle in `content.js` und `app.js`
   beibehalten.
6. Lokale Materialien aus `resources/` und `implementations/` nur als Referenz
   lesen und niemals ungeprüft veröffentlichen.
7. Nach Änderungen Syntax, Funktion, Desktop und Mobilansicht prüfen.
8. Dokumentation und Versionsverlauf aktualisieren.
9. Änderungen committen, nach `main` pushen und GitHub Pages kontrollieren.

Empfohlener Startprompt:

> Arbeite im Projekt PythonLab. Lies README.md,
> UEBERGABE_Codex.md, TASKS.md, docs/BPE5_ABGLEICH_2025.md und
> references/bpe5/README.md. Prüfe danach
> git status und den aktuellen Live-Stand. Bearbeite die offenen Aufgaben in
> der vorhandenen Architektur, teste Desktop und Mobilansicht und
> veröffentliche den geprüften Stand wieder über GitHub Pages.

## Weitere Dokumentation

- [Übergabe für die Weiterarbeit](UEBERGABE_Codex.md)
- [Zentrale Aufgabenliste und Projektstand](TASKS.md)
- [Didaktik, Datenschutz und Quellen](docs/TECHNIK_UND_DIDAKTIK.md)
- [Abgleich mit BPE 5, Materialstand 31.07.2025](docs/BPE5_ABGLEICH_2025.md)
- [Konzept: dynamische Codeprüfung und KI](docs/KI_CODEPRUEFUNG_KONZEPT.md)
- [BPE5-Quellen und Integrationsentscheidung](references/bpe5/README.md)
