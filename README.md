# PythonLab

**Aktuelle Version:** 0.6.0
**Dokumentationsstand:** 17. Juni 2026
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
Musterlösungen liegt ausschließlich in der privaten Unterrichtsablage:

`D:\Google Drive\Lehramt\Lernfelder\BPE5`

Musterlösungen und private Originaldateien werden nicht in dieses öffentliche
Repository übernommen.

## Aktueller Funktionsumfang

- fünf Etappen mit insgesamt zwölf Python-Lektionen
- zwölf automatisch prüfbare Programmieraufgaben
- Struktogramm-Labor mit fünf Grundformen und fünf geprüften Übungen
- echter Python-Interpreter im Browser über Pyodide
- XP, Level, Lernfortschritt und zehn Erfolge
- lokales Lernprofil mit Name oder Kürzel
- Speicherung von Code- und Struktogramm-Entwürfen
- Export und Import des vollständigen Lernstands als JSON-Datei
- direkter Kopfzeilen-Link zum lokalen Struktogrammer Web
- kompakter Nachschlagebereich
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
- Funktionen, Parameter und Rückgabewerte
- Listen als Erweiterung
- systematische Fehlersuche

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
- gelöste Struktogramm-Aufgaben
- Codeentwürfe
- Struktogramm-Entwürfe

Browserstände unter dem früheren Schlüssel `pythonwerkstatt-bg-v1` werden beim
Laden weiterhin gelesen und beim nächsten Speichern in das neue PythonLab-Format
übernommen. JSON-Sicherungen mit dem alten App-Kennzeichen werden beim Import
aus Kompatibilitätsgründen ebenfalls akzeptiert.

Es gibt kein Backend und kein zentrales Schülerkonto. Daten werden nicht an
einen eigenen Server übertragen. Browserdaten können jedoch durch
Schulrichtlinien, Profilbereinigung oder einen Gerätewechsel verloren gehen.
Über das Disketten-Symbol in der Kopfzeile kann der vollständige Lernstand
deshalb als JSON-Datei gesichert und später auf demselben oder einem anderen
Gerät geladen werden. Der Browser darf den Desktop aus Sicherheitsgründen
nicht automatisch auswählen. In unterstützten Browsern erscheint ein
Speicherdialog; andernfalls landet die Datei üblicherweise im Download-Ordner.

## Schulisch bereitgestellte Hilfsmittel

Für die Arbeit am Schul-PC stehen folgende Programme bereit:

- **Informatik-Stick:** zentrale Startmöglichkeit für die benötigten Programme
- **[Thonny](https://thonny.org/):** Python-Entwicklungsumgebung
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
2. Kompetenzansicht mit verständlich formulierten Ich-kann-Zielen entwickeln.

Optional:

- weitere Verzahnung mit Struktogrammer Web
- GUI-Kapitel mit Python
- Lernstandsynchronisation über ein datenschutzkonformes Backend
- separater Prüfungsmodus mit Authentifizierung
- Lehrkraftansicht für selbst zusammengestellte Aufgaben

## Einstieg für einen weiteren Codex-Agenten

1. Dieses `README.md` vollständig lesen.
2. `UEBERGABE_Codex.md` und `docs/BPE5_ABGLEICH_2025.md` lesen.
3. `git status -sb` und `git log --oneline -5` prüfen.
4. `tasks.txt` von oben nach unten bearbeiten, sofern die Datei Aufgaben
   enthält.
5. Bestehende Gestaltung und Datenmodelle in `content.js` und `app.js`
   beibehalten.
6. Private Materialien aus `...\Lernfelder\BPE5` nur als Referenz lesen und
   niemals ungeprüft veröffentlichen.
7. Nach Änderungen Syntax, Funktion, Desktop und Mobilansicht prüfen.
8. Dokumentation und Versionsverlauf aktualisieren.
9. Änderungen committen, nach `main` pushen und GitHub Pages kontrollieren.

Empfohlener Startprompt:

> Arbeite im Projekt PythonLab. Lies README.md,
> UEBERGABE_Codex.md, docs/BPE5_ABGLEICH_2025.md und tasks.txt. Prüfe danach
> git status und den aktuellen Live-Stand. Bearbeite die offenen Aufgaben in
> der vorhandenen Architektur, teste Desktop und Mobilansicht und
> veröffentliche den geprüften Stand wieder über GitHub Pages.

## Weitere Dokumentation

- [Übergabe für die Weiterarbeit](UEBERGABE_Codex.md)
- [Didaktik, Datenschutz und Quellen](docs/TECHNIK_UND_DIDAKTIK.md)
- [Abgleich mit BPE 5, Materialstand 31.07.2025](docs/BPE5_ABGLEICH_2025.md)
