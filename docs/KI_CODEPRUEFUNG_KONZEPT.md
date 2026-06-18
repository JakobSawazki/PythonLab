# Konzept: Dynamische Codeprüfung und optionale KI-Hilfe

Stand: 18. Juni 2026

## Ausgangspunkt

PythonLab prüft Programmieraufgaben aktuell deterministisch: Ausgabe,
Zahlenwerte oder kleine Python-Tests müssen zu den hinterlegten Erwartungen
passen. Das ist schnell, datensparsam und offline-nah, kann aber richtige
alternative Lösungen übersehen, wenn eine Aufgabe zu eng formuliert oder die
Prüfung zu strikt ist.

Ziel ist eine fairere Prüfung mit besseren Hinweisen und Teilpunkten, ohne aus
PythonLab ein benotetes Prüfungssystem zu machen.

## Empfehlung

Die Prüfung sollte in drei Schichten wachsen:

1. **Robustere automatische Tests:** mehrere Eingabefälle, normalisierte
   Ausgabe, Toleranzen für Leerzeichen und sinnvolle Varianten.
2. **Struktur- und Teilpunkte:** AST-Prüfungen für Konzepte wie `if`,
   Schleifen, Funktionen oder Listen sowie Rubriken mit Teil-XP.
3. **Optionale KI-Hilfe:** KI erklärt Hinweise und bewertet Grenzfälle, aber
   nicht als alleinige Instanz für XP.

## Warum kein API-Key direkt im Browser?

PythonLab ist eine statische GitHub-Pages-App. Ein API-Key im HTML- oder
JavaScript-Code wäre für alle sichtbar. Das ist für Gemini, OpenAI, Claude oder
ähnliche Dienste ungeeignet, weil der Key missbraucht werden kann und Kosten,
Kontingente und Datenschutz nicht kontrollierbar wären.

Eine KI-Anbindung braucht deshalb einen kleinen Server oder Serverless-Proxy,
der den API-Key geheim hält, Rate-Limits setzt und nur die minimal nötigen
Daten weitergibt.

## Geeignete Architektur

```text
Browser / PythonLab
  -> sendet Aufgabe, Code, Ausgabe, Fehlermeldung, anonyme Rubrikdaten
Serverless-Proxy
  -> prüft Rate-Limits, entfernt unnötige Daten, hält API-Key geheim
KI-Modell
  -> gibt JSON mit Hinweisen, Teilpunkten und Begründung zurück
PythonLab
  -> zeigt Feedback an und vergibt nur freigegebene XP
```

Mögliche Proxy-Orte:

- Cloudflare Worker
- Vercel Function
- Netlify Function
- Google Cloud Function
- ein kleiner eigener Schul-/Projektserver

## Datenschutz

An die KI sollten keine Namen, keine Profil-IDs und keine vollständigen
Lernstandsdateien gesendet werden. Sinnvoll sind nur:

- Aufgaben-ID
- Aufgabenbeschreibung in Kurzform
- Schülercode
- Konsolenausgabe oder Fehlermeldung
- erwartete Kompetenzen
- Rubrik mit maximal erreichbaren Teilpunkten

Die App sollte deutlich anzeigen, wenn eine KI-Prüfung verwendet wird.

## Modellfrage

Gemini kann grundsätzlich geeignet sein, weil es eine öffentliche API und
kostenlose beziehungsweise niedrigschwellige Einstiegskontingente geben kann.
Diese Kontingente ändern sich jedoch und sind projekt- und modellabhängig.
GitHub Copilot eignet sich eher für IDE-, Pull-Request- und Code-Review-
Workflows, nicht als frei einbettbare Schülercode-Prüf-API in einer
GitHub-Pages-Webapp.

Entscheidend ist daher nicht nur das Modell, sondern die Architektur:
kein Key im Browser, klare Rate-Limits, JSON-Ausgabe und deterministischer
Fallback.

## Mögliche Rubrik-Ausgabe

```json
{
  "score": 7,
  "maxScore": 10,
  "passed": false,
  "hints": [
    "Die erste Ausgabe stimmt.",
    "Die zweite Ausgabe fehlt noch.",
    "Berechne 6 + 4 als Ausdruck oder gib den Wert 10 aus."
  ],
  "concepts": {
    "print": true,
    "order": false,
    "calculation": true
  }
}
```

## Umsetzungsschritte

1. Aufgabenmodell in `content.js` um Rubriken und mehrere Testfälle erweitern.
2. Prüfengine in `app.js` um Teilpunkte und detaillierte Hinweise ergänzen.
3. AST-Prüfungen für zentrale BPE5-Konzepte einführen.
4. Optionale KI-Schaltfläche `Hinweis prüfen lassen` ergänzen.
5. Serverless-Proxy erstellen und API-Key nur dort speichern.
6. KI-Antwort strikt als JSON validieren.
7. XP-Vergabe konservativ halten: volle XP nur bei deterministisch bestandenen
   Kernkriterien oder bei klarer Rubrikfreigabe.

## Einbindung der KA-Webarbeit

Die vorhandene KA-Webarbeit unter `implementations/KA` soll perspektivisch als
**Übungsvorbereitung** eingebunden werden. Die Oberfläche sollte keine
Notenlogik und keinen Klassenarbeitscharakter betonen, sondern Begriffe wie
`Wissenscheck`, `Vorbereitung`, `Selbsttest` oder `Übungsrunde` verwenden.

## Quellen zur API-Einschätzung

- Google AI for Developers: `https://ai.google.dev/gemini-api/docs/api-key`
- Google AI for Developers: `https://ai.google.dev/gemini-api/docs/rate-limits`
- GitHub Docs: `https://docs.github.com/copilot/using-github-copilot/code-review/using-copilot-code-review`
