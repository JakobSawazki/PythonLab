# Konzept: Dynamische Codeprüfung und optionale KI-Hilfe

Stand: 29. Juni 2026 – KI-Modus vorbereitet; Cloudflare Worker produktiv erreichbar, Website-Verknüpfung in Arbeit

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

Das gilt auch dann, wenn die Homepage einer einzelnen Person gehört und nicht
auf einem Schulserver liegt: Entscheidend ist, dass GitHub Pages den
clientseitigen Quelltext öffentlich an die Browser ausliefert. Die
Eigentümerschaft der Seite schützt keinen darin eingebauten Schlüssel.

Eine KI-Anbindung braucht deshalb einen kleinen Server oder Serverless-Proxy,
der den API-Key geheim hält, Rate-Limits setzt und nur die minimal nötigen
Daten weitergibt.

## Geeignete Architektur

```text
Browser / PythonLab
  -> sendet nach Zustimmung Aufgabe, Code, Fehlermeldung und Versuchszähler
Serverless-Proxy
  -> prüft Origin, Größe und Rate-Limits, hält den API-Key geheim
KI-Modell
  -> gibt JSON mit Stärke, nächsten Schritten, Denkimpuls und Rückfrage zurück
PythonLab
  -> zeigt den Lernhinweis; lokale Tests allein vergeben XP
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

## Struktur der KI-Rückmeldung

```json
{
  "summary": "Deine Funktion wird schon aufgerufen, gibt aber noch keinen Wahrheitswert zurück.",
  "strengths": ["Du hast die verlangte Funktion angelegt."],
  "nextSteps": ["Behandle zuerst Zahlen kleiner als 2.", "Prüfe danach mögliche Teiler."],
  "hint": "Eine Funktion kann eine Entscheidung mit return zurückgeben.",
  "question": "Welchen Wert soll ist_primzahl(1) liefern?"
}
```

## Umsetzungsstand

1. Alle Aufgaben besitzen drei gestufte lokale Hinweise.
2. Python- und Assertion-Fehler werden verständlich ausgewertet.
3. Die drei Funktionsaufgaben nutzen zusätzliche AST-, Signatur- und Testwertprüfungen.
4. Sobald ein Endpoint konfiguriert ist, bietet die Oberfläche einen freiwilligen
   KI-Modus. Nach transparenter Zustimmung gilt er nur für die aktuelle Sitzung
   und fragt nach fehlgeschlagenen Prüfungen automatisch nach einem Lernhinweis.
5. `services/ai-feedback-worker/` enthält den getrennten Serverless-Proxy; der API-Key bleibt als Secret dort.
6. KI-Antworten werden als festes JSON-Schema angefordert und serverseitig
   bereinigt. Vollständige Musterlösungen und Ersatzcode sind im Systemauftrag
   ausdrücklich ausgeschlossen.
7. Nur die deterministische Prüfung vergibt XP und schließt Aufgabe und Lektion ab.
8. Identische Anfragen werden pro Browsersitzung zwischengespeichert. Eine
   anonyme Sitzungs-ID ermöglicht ein klassenfreundliches Rate-Limit, wird aber
   nicht an Gemini weitergegeben.
9. Antworten werden nicht mehr angezeigt, wenn Code, Testergebnis oder Seite
   während der Anfrage gewechselt wurden.

Das Cloudflare-/Gemini-Projekt ist produktiv erreichbar. `aiFeedbackEndpoint`
zeigt auf den Worker-Endpunkt; der Gemini-Schlüssel bleibt ausschließlich als
Worker-Secret gespeichert. Offen bleiben die schulische Datenschutzfreigabe,
Tarifentscheidung, spätere Teilpunkte und Kompetenz-Rubriken sowie die
regelmäßige Kontrolle von Nutzung und Kosten.

## Einbindung der KA-Webarbeit

Die vorhandene KA-Webarbeit unter `implementations/KA` soll perspektivisch als
**Übungsvorbereitung** eingebunden werden. Die Oberfläche sollte keine
Notenlogik und keinen Klassenarbeitscharakter betonen, sondern Begriffe wie
`Wissenscheck`, `Vorbereitung`, `Selbsttest` oder `Übungsrunde` verwenden.

## Quellen zur API-Einschätzung

- Google AI for Developers: `https://ai.google.dev/gemini-api/docs/models`
- Google AI for Developers: `https://ai.google.dev/gemini-api/docs/pricing`
- Google AI for Developers: `https://ai.google.dev/gemini-api/docs/structured-output`
- Google AI for Developers: `https://ai.google.dev/gemini-api/terms`
- Cloudflare Docs: `https://developers.cloudflare.com/workers/configuration/secrets/`
- GitHub Docs: `https://docs.github.com/copilot/using-github-copilot/code-review/using-copilot-code-review`
