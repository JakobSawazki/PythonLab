# Abgleich mit BPE 5: Grundlagen der Programmierung

Stand des Abgleichs: 19. Juni 2026
Referenzmaterial: Version mit Python, Stand 31. Juli 2025

## Verbindliche Referenz

Das Portal orientiert sich an den Materialien des Landesbildungsservers
Baden-Württemberg für die nichtgewerblichen beruflichen Gymnasien,
Jahrgangsstufe 1:

- [Übersichtsseite der Materialien](https://www.schule-bw.de/faecher-und-schularten/mathematisch-naturwissenschaftliche-faecher/informatik/material/materialien-zum-neuen-bildungsplan-informatik-an-den-nichtgewerblichen-beruflichen-gymnasien)
- [Direkter Download der Python-Version](https://www.schule-bw.de/resolveuid/4bf04e3081af47f9aa0a7455778f3cbe)

Private lokale Referenz:

`G:\Meine Ablage\Codex\PythonLab\resources\bpe-5-grundlagen-der-programmierung-version-mit-python\bpe-5-gdp_python`

Die entpackte Fassung enthält 3.495 Dateien in den Ordnern
`Lernfortschritt 1`, `Lernfortschritt 1_PythonKara`,
`Lernfortschritt 2` und `Lernfortschritt 3`, darunter das Kompetenzraster,
Ich-kann-Listen, Unterrichtsmaterialien, Aufgaben, Struktogramme,
Python-Dateien und Musterlösungen. Diese Originaldateien werden nicht in das
öffentliche GitHub-Repository übernommen. Der Ordner `resources/` ist lokal
vorhanden und wird per `.gitignore` vom Pages-Repository getrennt.

Im Projekt ist die Ordnung der Quelle zusätzlich unter
`references/bpe5/README.md` dokumentiert.

## Kompetenzbereiche

Das offizielle Kompetenzraster gliedert die Einheit in drei Bereiche:

1. Programmieren mit einer ikonischen Entwicklungsumgebung
2. Benutzereingaben, Ausgaben, Berechnungen und Funktionen mit Python
3. Alternativen und Wiederholungen mit Python

## Soll-Ist-Abgleich

### Lernfortschritt 1: Ikonischer Einstieg und Struktogramme

| Offizieller Inhalt | Stand im Portal |
| --- | --- |
| Sequentielle Abläufe | Inhaltlich durch Lektion 01 abgedeckt |
| Projekte in einer ikonischen Umgebung | Noch nicht umgesetzt |
| `for`-Schleifen ikonisch entwickeln | Später unmittelbar in Python umgesetzt |
| `while`-Schleifen ikonisch entwickeln | Später unmittelbar in Python umgesetzt |
| Alternativen ikonisch entwickeln | Später unmittelbar in Python umgesetzt |
| Abläufe als Struktogramm darstellen | Im Struktogramm-Labor umgesetzt |

**Bewertung:** Die algorithmischen Grundideen und die Übersetzung zwischen
Struktogramm und Python sind vorhanden. Der konkrete Einstieg über MyKara
beziehungsweise Greenfoot ist nicht Bestandteil des browserbasierten Portals.

### Lernfortschritt 2: Python-Grundlagen

| Offizieller Inhalt | Portal-Lektion | Abdeckung |
| --- | --- | --- |
| Python-Programme anlegen und verwalten | gesamte Browserumgebung | teilweise, da Thonny nicht erklärt wird |
| Textausgaben mit `print()` | 01 Sequenz und Ausgabe | vollständig |
| Variablen, Datentypen und kombinierte Ausgaben | 02 Variablen und Datentypen | vollständig |
| Rechenoperatoren | 03 Rechnen mit Python | vollständig |
| Benutzereingaben und Typumwandlung | 04 Eingaben und Umwandlung | vollständig |
| Funktionen ohne Parameter | 10 Funktionen ohne Parameter | vollständig |
| Funktionen mit Parametern | 11 Funktionen mit Parametern | vollständig |
| Funktionen mit Rückgabewert | 12 Funktionen mit Rückgabewert | vollständig |
| zentrale Syntax wiederholen | Reiter Befehle | als kompakte Nachschlage- und Übungskarten umgesetzt |
| Programme als Struktogramm dokumentieren | Struktogramm-Labor | als geführte Übungen umgesetzt |
| Grafische Benutzeroberflächen | Zusatzinhalt | noch nicht umgesetzt |

Der Funktionsabschnitt orientiert sich in seiner Progression an den drei
Informationsblättern `L2_5_1_1` bis `L2_5_1_3`, formuliert Erklärungen und
Aufgaben jedoch eigenständig. Zwei kurze Aufbauaufgaben und die
Fahrtkosten-Transferaufgabe machen jeden Schritt unmittelbar prüfbar.

**Bewertung:** Der verpflichtende Python-Kern ist sehr gut abgedeckt. Thonny
ist für das browserbasierte Portal technisch nicht erforderlich. Die
GUI-Einheit ist im Kompetenzmaterial als Zusatzbereich gekennzeichnet und kann
später als Python-Plus-Modul ergänzt werden.

### Lernfortschritt 3: Kontrollstrukturen

| Offizieller Inhalt | Portal-Lektion | Abdeckung |
| --- | --- | --- |
| Einseitige Verzweigung | 05 Vergleiche und `if` | vollständig |
| Zweiseitige Verzweigung | 06 `if`, `elif` und `else` | vollständig |
| Geschachtelte Verzweigung | Struktogramm-Labor, Aufgabe S5 | ausdrücklich umgesetzt |
| `and`, `or` und `not` | 07 Logische Operatoren | vollständig |
| Zählerschleife `for` | 08 `for`-Schleifen | vollständig |
| Kopfgesteuerte Schleife `while` | 09 `while`-Schleifen | vollständig |
| Syntax sicher anwenden | Reiter Befehle | mit Miniaufgaben zu Alternativen, Logik und Schleifen umgesetzt |
| Kontrollstrukturen als Struktogramm | Struktogramm-Labor | vollständig als Grundformen und Übungen |

**Bewertung:** Die Python-Kontrollstrukturen und ihre Darstellung als
Struktogramm sind vorhanden. Die geschachtelte Verzweigung wird in einer
eigenen interaktiven Aufgabe behandelt.

## Bewusste Erweiterungen

Die Lektionen zu Listen und systematischer Fehlersuche gehen über den engsten
Kern des Kompetenzrasters hinaus. Sie bleiben bewusst im Portal, weil sie
einen zugänglichen Übergang zu weiterführenden Python-Inhalten schaffen und
die Selbstständigkeit beim Üben stärken.

## Priorisierte Weiterentwicklung

1. Weitere Struktogramm-Aufgaben mit alltagsnahen Transferproblemen ergänzen.
2. Die Befehlsbibliothek um weitere typische Fehlerbilder, Mini-Übungen und
   Querverweise zu passenden Lektionen erweitern.
3. Die bisherige KA-Webarbeit als nicht benotete Übungsvorbereitung prüfen und
   in PythonLab integrieren.
4. Die Codeprüfung um robustere Testfälle, Teilpunkte und optional
   KI-gestützte Hinweise erweitern.
5. Die Verzahnung mit Struktogrammer Web für freie Struktogramme bei Bedarf ausbauen.
6. Ein optionales GUI-Kapitel, sofern es im konkreten Unterricht eingesetzt
   wird.
7. Eine Kompetenzansicht, die den Lernenden die offiziellen Ich-kann-Ziele in
   verständlicher Sprache zeigt.

## Urheberrechtliche Grenze

Das Portal übernimmt die fachliche Struktur und formuliert Erklärungen und
Aufgaben eigenständig. Originalarbeitsblätter, Bilder, Musterlösungen und
weitere Dateien aus dem Archiv bleiben in der privaten Unterrichtsablage.
Vor einer späteren Übernahme einzelner Materialien müssen die jeweils
angegebenen Lizenzbedingungen separat geprüft werden.
