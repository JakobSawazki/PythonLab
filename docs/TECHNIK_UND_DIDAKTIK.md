# Technik, Didaktik, Datenschutz und Quellen

## Didaktische Leitidee

Das Portal reduziert die Einstiegshürde durch kurze Lernschritte:

1. Eine konkrete Vorstellung oder Regel wird erklärt.
2. Ein kleines Codebeispiel macht die Regel sichtbar.
3. Eine Verständnisfrage prüft den Kern der Lektion.
4. Eine direkt zugeordnete Programmieraufgabe fordert eigenes Handeln.
5. Automatisches Feedback erlaubt mehrere Versuche ohne öffentliche Bewertung.

Die Reihenfolge orientiert sich an BPE 5: Sequenz, Variablen und Datentypen, Ein- und Ausgabe, Berechnungen, Alternativen, Wiederholungen, Funktionen und Modularisierung. Listen und Debugging sind als zugängliche Erweiterung angefügt.

## Datenschutz

Die Anwendung besitzt kein Backend. Name oder Kürzel, Fortschritt und Codeentwürfe werden ausschließlich im lokalen Browserspeicher abgelegt.

- Es werden keine Konten angelegt.
- Es werden keine Namen an einen eigenen Server übertragen.
- Ein Kürzel genügt; ein vollständiger Name ist nicht erforderlich.
- Beim Löschen der Website-Daten im Browser wird auch der Lernstand gelöscht.

Externe technische Ressourcen werden beim Laden direkt vom jeweiligen CDN abgerufen:

- Lucide für Symbole
- Pyodide für die Python-Laufzeit

Für einen späteren schulischen Produktivbetrieb kann man diese Dateien selbst hosten, um externe Abrufe vollständig zu vermeiden.

### Verhalten auf Schul-PCs

`localStorage` bleibt normalerweise auch nach dem Schließen des Browsers und
nach einem Neustart des PCs erhalten. Ein Schüler kann beim nächsten Unterricht
am bisherigen Stand weiterarbeiten, wenn alle folgenden Bedingungen erfüllt
sind:

- derselbe Schul-PC oder dasselbe synchronisierte Windows-Benutzerprofil,
- derselbe Browser,
- kein privates beziehungsweise InPrivate-Fenster,
- Browser- und Profildaten werden von der Schulverwaltung nicht automatisch
  beim Abmelden gelöscht.

Nicht garantiert ist die Speicherung bei wechselnden PCs, Gastkonten,
zurückgesetzten Benutzerprofilen oder zentraler Browserbereinigung. PythonLab
behandelt den Browserstand deshalb als bequeme lokale
Zwischenspeicherung, nicht als dauerhafte Datensicherung.

### Lernstand als Datei

Über das Disketten-Symbol kann der vollständige Lernstand als JSON-Datei
exportiert werden. Der Inhalt umfasst Profil, Abschlüsse, Aktivitätstage sowie
Code- und Struktogramm-Entwürfe. Beim Import werden Dateityp, maximale Größe,
Formatversion und bekannte Inhalts-IDs geprüft. XP werden aus den gültigen
Abschlüssen neu berechnet.

Webseiten dürfen aus Sicherheitsgründen keinen bestimmten Zielordner wie den
Desktop ungefragt beschreiben. Unterstützt der Browser die File System Access
API, kann der Lernende im Speicherdialog Desktop oder Informatik-Stick wählen.
Sonst wird die Datei als normaler Download gespeichert und kann anschließend
verschoben werden.

### Darstellung

PythonLab unterstützt Light- und Dark-Mode. Die Auswahl wird unter
`pythonlab-theme-v1` im lokalen Browserspeicher abgelegt und nicht in die
Lernstandsdatei geschrieben. Die Umschaltung verändert CSS-Variablen und einige
gezielte Kontrastregeln; die Struktogramm-Arbeitsflächen bleiben bewusst hell,
damit die Nassi-Shneiderman-Blöcke auch im Dark-Mode eindeutig lesbar bleiben.

## Technische Architektur

Die Anwendung ist eine statische Single-Page-Anwendung ohne Framework und Build-System. Hash-Routing hält alle Unterseiten mit GitHub Pages kompatibel.

Python läuft über Pyodide in einem separaten Web Worker. Dadurch bleibt die Benutzeroberfläche während normaler Programmausführung bedienbar. Nach zehn Sekunden wird der Worker beendet und neu aufgebaut; so werden typische Endlosschleifen begrenzt.

Die Aufgabenprüfung verwendet je nach Lernziel:

- erwartete Standardausgabe,
- numerische Ausgabe mit Toleranz,
- Python-Assertions gegen Variablen oder Funktionen.

## Quellen

- Ministerium für Kultus, Jugend und Sport Baden-Württemberg: [Bildungsplan Informatik, nichtgewerbliche Berufliche Gymnasien](https://www.bildungsplaene-bw.de/In_OS_nichtTG)
- Landesbildungsserver Baden-Württemberg: [Materialien zum Bildungsplan Informatik an den nichtgewerblichen Beruflichen Gymnasien](https://www.schule-bw.de/faecher-und-schularten/mathematisch-naturwissenschaftliche-faecher/informatik/material/materialien-zum-neuen-bildungsplan-informatik-an-den-nichtgewerblichen-beruflichen-gymnasien)
- Landesbildungsserver Baden-Württemberg: [Grundlagen der Programmierung – Version mit Python, Stand 31.07.2025](https://www.schule-bw.de/resolveuid/4bf04e3081af47f9aa0a7455778f3cbe)
- Landesbildungsserver Baden-Württemberg: [Operatorenliste für Struktogramme, Version 2.2 vom 01.09.2024](https://www.schule-bw.de/faecher-und-schularten/mathematisch-naturwissenschaftliche-faecher/informatik/material/materialien-zum-neuen-bildungsplan-informatik-an-den-nichtgewerblichen-beruflichen-gymnasien/operatorenliste-fuer-struktogramme-v2-2.pdf)
- Struktogrammer Web: lokales Schwesterprojekt unter `G:\Meine Ablage\Codex\Struktogrammer`
- hus Struktogrammer: [Offizielle Projektseite der Java-Version](https://struktogrammer.ch/Web_files/page1_JavaVersion.html)
- Pyodide: [Using Pyodide in a web worker](https://pyodide.org/en/stable/usage/webworker.html)
- Lucide: [Lucide Icons](https://lucide.dev/)

Die lokale Referenzdatei liegt unter
`D:\Google Drive\Lehramt\Lernfelder\BPE5\bpe-5-grundlagen-der-programmierung-version-mit-python.zip`.
Das Archiv enthält das Kompetenzraster sowie die Ich-kann-Listen zu den
Lernfortschritten 1 bis 3. Diese Dokumente wurden inhaltlich gesichtet.
Es wurden keine Musterlösungen und keine privaten Originaldateien in das
öffentliche Projekt übernommen.

Der detaillierte Soll-Ist-Abgleich ist in
[`BPE5_ABGLEICH_2025.md`](BPE5_ABGLEICH_2025.md) dokumentiert.

## Struktogramm-Labor

Das Labor rendert Nassi-Shneiderman-Strukturen direkt mit HTML und CSS. Es
benötigt weder Java noch ein Browser-Plugin. Enthalten sind:

- Sequenz
- zweiseitige Alternative
- zählergesteuerte Schleife
- kopfgesteuerte Schleife
- geschachtelte Alternative

Fünf Übungen prüfen Reihenfolge oder ausgewählte Operatoren automatisch. Auf
kleinen Bildschirmen werden J- und N-Zweig untereinander dargestellt, damit
auch geschachtelte Strukturen vollständig lesbar bleiben. Für umfangreichere
freie Zeichnungen verweist das Portal oben rechts und im Nachschlagebereich auf
den lokal eingebundenen Struktogrammer Web.

## Schulische Hilfsmittel

Die Kaufmännische Schule stellt den Lernenden Thonny und den hus
Struktogrammer auf den Schul-PCs sowie über den Informatik-Stick bereit. Der
Stick dient als zentraler Einstieg und enthält die für den Unterricht
benötigten Programme.

Zusätzlich ist Struktogrammer Web als Schwesterprojekt eingebunden. Das Icon
liegt in `assets/struktogrammer-mark.png`; der Link zeigt aus PythonLab auf
`https://jakobsawazki.github.io/struktogrammer-web/`.

Die Portal-Fußzeile verweist schlicht mit `Designed by Sawazki Electronics` auf
die Hauptseite `https://jakobsawazki.github.io/sawazki-electronics/`.

Die Portalformulierung vermeidet eine allgemeine, zeitlich unbegrenzte
Zulassungsaussage. Sie verweist darauf, dass für konkrete schriftliche und
mündliche Abiturprüfungen die jeweils aktuellen schulischen
Prüfungsanweisungen maßgeblich sind.

## Bildnachweis

`assets/python-lernraum.png` wurde am 9. Juni 2026 mit dem integrierten OpenAI-Bildgenerator eigens für dieses Projekt erzeugt.
`assets/struktogrammer-mark.png` stammt aus dem lokalen Schwesterprojekt
Struktogrammer Web.

Verwendete Bildidee: heller schulischer Arbeitsplatz mit Laptop, Python-Code, Karten für Sequenz, Entscheidung und Schleife sowie ruhiger grüner Freifläche für den Seitentitel; ohne Personen und ohne Markenlogos.
