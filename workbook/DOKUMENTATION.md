# Python-Workbook · BPE 5 „Grundlagen der Programmierung“ & BPE 7 „Algorithmen und Datenstrukturen“

**Projektdokumentation und Gedächtnisstütze für alle Beteiligten (Mensch + KI-Agenten).**

> ⚠️ **Regel für alle KI-Agenten (Claude, Codex, …):** Wer etwas am Workbook ändert,
> trägt es unten im [Änderungsprotokoll](#änderungsprotokoll) ein (Datum, Autor,
> Änderung) und aktualisiert bei Bedarf die [offenen Punkte](#offene-punkte--to-do).
> Diese Datei zuerst lesen, dann arbeiten.

---

## 1. Projektüberblick

| | |
|---|---|
| **Ziel** | Übersichtliches, anschauliches HTML-Lehrbuch („Workbook“) für Schüler |
| **Zielgruppe** | Informatik, Berufliches Gymnasium Baden-Württemberg, Jahrgangsstufen 1 und 2 |
| **Umfang (aktuell)** | **BPE 5** „Grundlagen der Programmierung“ (JG1, 20 Std., Kapitel 1–3) und **BPE 7** „Algorithmen und Datenstrukturen“ (JG2, 30 Std., Kapitel 4–6) |
| **Anrede** | Kapitel, Spickzettel und Checklisten nutzen überwiegend **„Sie“** wie die offiziellen Materialien; Startseite, Inhaltsverzeichnis und Glossar sind schülernah mit **„du“** formuliert. Vollständige Vereinheitlichung ist ein offener Redaktionspunkt. |
| **Sprache** | Deutsch |
| **Technik** | Reines HTML/CSS/Vanilla-JS, **keine Frameworks, keine CDN-Abhängigkeiten** – muss komplett **offline** funktionieren (Doppelklick auf `index.html` genügt) |
| **Integration in PythonLab** | Diese Kopie liegt unter `PythonLab/workbook/` und wird über den PythonLab-Reiter **Workbook** geöffnet. Alle Workbook-Seiten enthalten oben den Rücklink `← PythonLab`. |
| **Auftraggeber** | Jakob Sawazki (Lehrer) |

### Inhaltliche Quellen (nicht verändern, nur lesen!)

- **Bildungsplan** (Grundlage für alles):
  [`D:\Google Drive\Codex\PythonLab\resources\29-TB02-Inhalt-Band 2a-AG-3 Informatik.pdf`](../PythonLab/resources/29-TB02-Inhalt-Band%202a-AG-3%20Informatik.pdf)
  – BPE 5 auf S. 14–15 · BPE 6 „Relationale Datenbanken“ auf S. 15–16 · **BPE 7 auf S. 17–18** · BPE 8 „Gesellschaftliche Aspekte“ auf S. 18 · Operatorenliste ab S. 19
- **Materialien zur BPE 5** (Landesbildungsserver BW):
  `D:\Google Drive\Codex\PythonLab\resources\bpe-5-grundlagen-der-programmierung-version-mit-python\bpe-5-gdp_python`
  (Lernfortschritt 1 = Kara, Lernfortschritt 2 = Python-Grundlagen/Thonny, Lernfortschritt 3 = Kontrollstrukturen; jeweils Informationen / Aufgaben / Lösungen + Ich-Kann-Listen)
- **Materialien zur BPE 7** (Landesbildungsserver BW):
  `D:\Google Drive\Codex\PythonLab\resources\bpe-7-algorithmen-datenstrukturen-python`
  (Lernfortschritt 1 = Datenstrukturen/Arrays, Lernfortschritt 2 = Algorithmik: Bubble/Selection Sort + lineare/binäre Suche, Lernfortschritt 3 = verkettete Liste/Stack/Queue/Baum; jeweils Informationsmaterial / Arbeitsaufträge / Lösungen inkl. `.py`-Programme + Ich-Kann-Listen + Kompetenzraster)
- Übungen im Workbook referenzieren die Original-Arbeitsblätter per Kürzel (z. B. „L3_2_2“ bzw. bei BPE 7 mit Zusatz „(BPE 7)“).

---

## 2. Dateistruktur

```
PythonWorkbook/
├── index.html                        Startseite: Einführung, Kapitelübersicht, BPE-Bezug, Werkzeuge
├── inhaltsverzeichnis.html           Detailliertes Inhaltsverzeichnis + Lernlandkarte   (Codex)
├── kapitel-1-kara.html               LF1: Struktogramme, Sequenz, for, while, Alternative (mit Kara)
├── kapitel-2-python-grundlagen.html  LF2 / BPE 5.1: Thonny, print, Variablen, Rechnen, input, Funktionen, GUI
├── kapitel-3-kontrollstrukturen.html LF3 / BPE 5.2: if/elif/else, and/or/not, for/while + Übungen
├── kapitel-4-arrays.html             BPE 7.1 / LF1 (JG2): Datenstrukturen-Überblick, Arrays (Index, append, len, Muster, Tauschen/Einfügen/Entfernen)
├── kapitel-5-sortieren-suchen.html   BPE 7.2 / LF2 (JG2): Algorithmus-Begriff, Bubble Sort, Selection Sort, lineare + binäre Suche
├── kapitel-6-datenstrukturen.html    BPE 7.3 / LF3 (JG2): verkettete Liste, Stack, Queue, Baum/Binärbaum (beschreiben + modellieren, inkl. SVG-Baumgrafiken)
├── glossar.html                      Glossar + Befehlsübersicht (BPE 5/7: Python, Arrays/Algorithmen, Kara, tkinter)
├── referenz.html                     Spickzettel: Syntax, Operatoren, Struktogramme, Fehlermeldungen
├── checklisten.html                  Ich-kann-Checklisten (interaktiv, localStorage)
├── DOKUMENTATION.md                  ← diese Datei
└── assets/
    ├── style.css                     Zentrales Stylesheet (alle Bausteine, s. Abschnitt 3)
    ├── workbook.js                   Syntax-Highlighter, Quiz, Checklisten, Nach-oben-Button
    └── kara.js                       Interaktiver Kara-Simulator (nur Kapitel 1)
```

---

## 3. Konventionen & wichtige Bausteine (Gedächtnisstütze für KI-Agenten)

### Didaktische HTML-Bausteine (zentral in `assets/style.css` definiert)

| Baustein | Markup | Zweck |
|---|---|---|
| Lernziele | `<div class="box box-ziel">` | 🎯 am Abschnittsanfang |
| Information | `<div class="box box-info">` | ℹ️ Hintergrundwissen |
| Merke | `<div class="box box-merke">` | 📌 Kernaussagen (gelb) |
| Achtung | `<div class="box box-achtung">` | ⚠️ typische Stolperfallen (rot) |
| Tipp/Ausprobieren | `<div class="box box-tipp">` | 💡 Experimentier-Aufträge (grün) |
| Code | `<pre class="code">` | wird von `workbook.js` automatisch Python-gehighlightet |
| Konsolen-Ausgabe | `<pre class="output">` | Benutzereingaben darin: `<span class="eingabe">`, Fehler: `<span class="fehler">` |
| Übungsaufgabe | `<div class="uebung">` mit `.uebung-kopf` + `.uebung-inhalt` | Lösung als `<details class="loesung">` (aufklappbar) |
| Quiz | `<div class="quiz" data-erklaerung="…">` | Antworten als `<button class="antwort">`, richtige mit `data-richtig` |
| Checkliste | `<div class="checkliste">` | Checkboxen mit `id` → Zustand in `localStorage` (Präfix `pywb-`) |
| Zwei Spalten | `<div class="vergleich">` | z. B. Struktogramm neben Code |
| Array-Grafik | `<div class="arr">` mit `.zelle` (`.wert` + `.idx`), Hervorhebung: `.hervor`/`.neu` | indizierte Speicherzellen (Kapitel 4/5) |
| Verkettete Liste | `<div class="vkette">` mit `.anker`, `.knoten` (`.daten` + `.zeiger`), `.pfeil`, `.nullm` | Kapitel 6 |
| Stack / Queue | `.stapel-wrap`/`.stapel` bzw. `.queue` mit `.element` | LIFO/FIFO-Grafiken (Kapitel 6) |
| Bäume | Inline-SVG direkt in `kapitel-6-datenstrukturen.html` | Wurzel gelb, innere Knoten blau, Blätter grün |

### Struktogramme (Nassi-Shneiderman, reines CSS)

- Container: `<div class="stg">`, Titel: `.stg-titel`, Anweisung: `.stg-zeile`
- Schleife: `.stg-schleife` → `.stg-schleife-kopf` + `.stg-schleife-koerper` (eingerückt)
- Verzweigung: `.stg-if` → `.stg-if-kopf` (mit `<span class="bed">`, `<span class="ja">`, `<span class="nein">`) + `.stg-if-zweige` (zwei `<div>`; leerer Zweig: `<div class="leer">∅</div>`)
- **Die Diagonalen der Verzweigung** werden per SVG-Data-URI in `.stg-if-kopf::before` gezeichnet:
  von den **oberen Ecken zur Mitte unten** (klassische Form: Bedingung im oberen Dreieck,
  „Ja“ unten links, „Nein“ unten rechts). Nicht wieder umdrehen!

### Weitere Regeln

- Navigation: identische `<nav class="topnav">` auf **allen** Seiten – bei neuen Seiten überall ergänzen.
- Anker-IDs bleiben stabil (`#for`, `#while`, `#alternative`, …) – Checklisten und Inhaltsverzeichnis verlinken darauf.
- Druckansicht ist vorbereitet (`@media print`): Lösungen werden ausgeklappt, Nav/Simulator ausgeblendet.
- Dezimalzahlen in Code-Beispielen mit Punkt; Fachbegriffe wie im Original (Zählerschleife, kopfgesteuerte Schleife, …).
- Lokaler Test-Server: launch.json-Konfiguration `python-workbook` (Port 8748, `python -m http.server`).

---

## 4. Änderungsprotokoll

| Datum | Version | Autor | Änderungen |
|---|---|---|---|
| 07.07.2026 | 1.0 | Claude (Fable 5) | Grundgerüst erstellt: Quellenanalyse (Bildungsplan-PDF + alle 124 Original-Dokumente der Lernfortschritte 1–3), Startseite, Kapitel 1–3, Spickzettel (`referenz.html`), interaktive Ich-kann-Checklisten, zentrales CSS (Boxen, CSS-Struktogramme, Druckansicht), `workbook.js` (Python-Syntax-Highlighter, Quiz, localStorage-Checklisten), 21 Übungsaufgaben mit aufklappbaren Lösungen aus den Originalmaterialien |
| 07.07.2026 | 1.1 | Claude (Fable 5) | Interaktiver **Kara-Simulator** (`assets/kara.js`) in Kapitel 1: freies Steuern + 4 Schritt-für-Schritt-Programmszenarien (Sequenz, for, while, while+Alternative) mit Code-Zeilen-Hervorhebung; **Schreibtischtest-Übung** (Übung 9, klausurtypisch) in Kapitel 3 |
| 07.07.2026 | 1.2 | Codex | **Glossar** (`glossar.html`: Begriffe, Python-/Kara-/tkinter-Befehle, Operatoren), **Inhaltsverzeichnis** (`inhaltsverzeichnis.html` mit Lernlandkarte), Navigation auf allen Seiten vereinheitlicht/gekürzt (K1/K2/K3 + Inhalt + Glossar), Querverweis Spickzettel↔Glossar, Struktogramm-Diagonalen von CSS-Gradient auf SVG umgestellt |
| 07.07.2026 | 1.3 | Claude (Fable 5) | Struktogramm-Diagonalen **korrigiert**: Linien laufen jetzt von den oberen Ecken zur Mitte unten (klassische Nassi-Shneiderman-Form, Wunsch von Jakob per Skizze) – zentral in `style.css`, wirkt auf alle Seiten; `DOKUMENTATION.md` angelegt |
| 07.07.2026 | 1.4 | Claude (Fable 5) | **BPE 7 „Algorithmen und Datenstrukturen“ komplett eingepflegt** (Quellen: neuer Materialordner `bpe-7-…` + Bildungsplan S. 17–18): drei neue Kapitel `kapitel-4-arrays.html` (Datenstrukturen-Überblick, Arrays inkl. Schreibtischtest, Wetterstation, Kapitalrechner), `kapitel-5-sortieren-suchen.html` (Algorithmus-Eigenschaften, Bubble/Selection Sort mit offiziellen Implementierungen, lineare/binäre Suche, Vergleich) und `kapitel-6-datenstrukturen.html` (verkettete Liste, Stack, Queue, Baum/Binärbaum mit SVG-Grafiken). Dazu: Navigation auf allen Seiten um K4–K6 erweitert, Startseite (Titel, Hero, JG2-Lernweg-Karten, TOC-Blöcke, Bildungsplan-Tabelle BPE 7.1–7.3), Inhaltsverzeichnis (Lernlandkarte-Etappen 4–6 + Abschnittslisten), drei neue Ich-kann-Checklisten (`#bpe7lf1–3`, nach offiziellen Ich-Kann-Listen), Spickzettel-Abschnitte Arrays / Sortieren & Suchen / dynamische Datenstrukturen, neue CSS-Bausteine (`.arr`, `.vkette`, `.stapel`, `.queue`) |
| 07.07.2026 | 1.5 | Codex | **BPE-7-Abschlussrunde:** `glossar.html` um zentrale BPE-7-Begriffe erweitert (Array, Index, Datenstruktur, Bubble/Selection Sort, lineare/binäre Suche, verkettete Liste, Stack/LIFO, Queue/FIFO, Baum/Binärbaum, Knoten, Wurzel, Zeiger) und eine BPE-7-Befehlsübersicht ergänzt (`append()`, `insert()`, `pop()`, `remove()`, Indexzugriff, `len()`, Such-/Tauschmuster, Stack/Queue-Modellierung). Fußzeilen in `glossar.html`, `referenz.html`, `inhaltsverzeichnis.html` und `checklisten.html` auf BPE 5 + BPE 7 aktualisiert; mobile Tabellen/Code-Vergleiche gegen horizontales Überlaufen abgesichert; Stylesheet-Link mit `?v=1.5.1` cache-sicher gemacht; Dokumentation bereinigt. |
| 07.07.2026 | 1.6 | Codex | Startseiten-Symbol „Struktogramme“ in `assets/style.css` neu gezeichnet: weiterhin blau, rote/irritierende Markierungen entfernt. Drei Zusatzübungen für BPE 7 ergänzt: Kapitel 4 „Laufzeiten auswerten“ (parallele Arrays, Minimum, Durchschnitt, Zählen), Kapitel 5 „Binäre Suche: nicht gefunden“ (Trace mit leerem Suchbereich), Kapitel 6 „Dateisystem als Baum“ (Wurzel, Blätter, Höhe, Binärbaum, Pfad). Stylesheet-Link auf `?v=1.6` aktualisiert. |
| 07.07.2026 | 1.7 | Codex | Workbook-Kopie in `PythonLab/workbook/` integriert: alle Seiten erhielten in der Topnavigation den Rücklink `← PythonLab`; `assets/style.css` um die Klasse `.lab-ruecklink` erweitert. Die Originalquelle `D:\Google Drive\Codex\PythonWorkbook` bleibt als eigenständiger Arbeitsordner erhalten. |

---

## 5. Offene Punkte / To-do

- [ ] **BPE 6 „Relationale Datenbanken“** als weitere Einheit im gleichen Stil (Kapitelstruktur: ER-Modell → Relationenmodell → SQL CREATE/INSERT → SELECT-Auswertungen → Chancen/Risiken Massendaten; Bildungsplan-Text liegt vor, S. 15–16 der PDF). Vorher klären, ob offizielle Materialien zu BPE 6 vorhanden sind. (Ggf. auch BPE 8 „Gesellschaftliche Aspekte“, S. 18.)
- [ ] Kapitel 1: ggf. kleine Weltbilder/Grafiken zu den Übungsaufgaben (Ausgangs-/Ziel-Welt), damit die Aufgaben ohne PythonKara-Datei eindeutig sind.
- [ ] **Anrede vereinheitlichen:** Kapitel 1–6, Spickzettel, Checklisten nutzen „Sie“; die Codex-Seiten (Startseite, Inhaltsverzeichnis, Glossar) nutzen „du“. Jakob entscheiden lassen, dann konsequent umstellen.
- [ ] Optional: Abschlussquiz pro Kapitel (5–8 Fragen) als Klassenarbeits-Simulation.
- [ ] Bei neuen Seiten: Navigation (inzwischen 12 Einträge – bei weiteren Kapiteln über ein Dropdown „Kapitel“ nachdenken), Inhaltsverzeichnis und ggf. Checklisten mitpflegen.

---

## 6. Verifikation (Stand v1.6)

- Alle Seiten laden ohne Konsolenfehler und ohne fehlgeschlagene Netzwerk-Requests (getestet über lokalen `http.server`).
- Interaktiv getestet: Quiz-Feedback, Syntax-Highlighting, Checklisten-Speicherung (übersteht Neuladen), Kara-Simulator (Schritt/Abspielen/Zurücksetzen), Struktogramm-Rendering (einfach + verschachtelt), neue Kapitel 4–6 inkl. Quiz und Grafiken (Array-Zellen, Listen-/Stack-/Queue-Diagramme, SVG-Bäume).
- Statischer Link-/Ankercheck: alle lokalen HTML-Ziele und Sprungmarken vorhanden.
- Browsercheck nach v1.6: `index.html` und Kapitel 4–6 auf Desktopbreite sowie mobil (390 × 844) geprüft; keine Konsolenfehler, kein horizontales Seiten-Overflow. Das Startseiten-Symbol `.mini-stg` rendert mit Blauwerten (`#344bb8`) und ohne Rotanteile; die drei neuen Übung-7-Blöcke sind sichtbar.
