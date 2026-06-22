# Optionaler KI-Lerncoach

Der Cloudflare Worker hält den Gemini-Schlüssel aus Browser und Repository
heraus. PythonLab bleibt ohne diesen Dienst vollständig nutzbar: Ausführung,
lokale Hinweise, Aufgabenabschluss und XP funktionieren weiterhin im Browser.
Die KI ergänzt nur einen kurzen Lernimpuls.

## Einrichten

Voraussetzungen sind ein eigenes Cloudflare-Konto (kostenlos), ein
Google-AI-Projekt und eine schulische Datenschutzfreigabe. API-Schlüssel niemals
in einen Chat, `config.js`, HTML, JavaScript oder Git kopieren.

Zuerst in [Google AI Studio](https://aistudio.google.com/app/apikey) einen
Gemini-API-Schlüssel anlegen. Danach den Worker entweder ohne Installation über
das Cloudflare-Dashboard (Variante A, für Lehrkräfte empfohlen) oder mit der
wrangler-CLI (Variante B) veröffentlichen.

### Variante A – ohne Installation (Cloudflare-Dashboard)

1. Bei [dash.cloudflare.com](https://dash.cloudflare.com) anmelden und links
   **Workers & Pages → Create application → Create Worker** wählen, einen Namen
   wie `pythonlab-ai-feedback` vergeben und **Deploy** klicken.
2. **Edit code** öffnen, den gesamten Inhalt von `worker.js` aus diesem Ordner
   einfügen (vorhandenen Beispielcode ersetzen) und erneut **Deploy** klicken.
3. Im Worker **Settings → Variables and Secrets** öffnen und eintragen:
   - **Secret** `GEMINI_API_KEY` = dein Gemini-Schlüssel (Typ „Secret“/verschlüsselt).
   - **Variable** `ALLOWED_ORIGINS` = `https://jakobsawazki.github.io` (für lokale
     Tests zusätzlich, kommagetrennt, `http://localhost:4173`).
   - **Variable** `GEMINI_MODEL` = `gemini-3.1-flash-lite` (oder ein aktuell
     gültiges Modell).
   - Speichern und neu deployen.
4. Die Worker-Adresse (Form `https://NAME.DEINKONTO.workers.dev`) kopieren und mit
   `/feedback` ergänzt in `config.js` unter `aiFeedbackEndpoint` eintragen,
   z. B. `https://pythonlab-ai-feedback.deinname.workers.dev/feedback`.
5. `config.js` committen und nach `main` pushen. Nach dem GitHub-Pages-Build
   erscheint im Aufgabenbereich der KI-Modus-Schalter.

### Variante B – mit wrangler-CLI (für Entwickler)

1. In diesem Ordner bei Cloudflare anmelden: `npx wrangler login`
2. Den Schlüssel ausschließlich als Worker-Secret eingeben:
   `npx wrangler secret put GEMINI_API_KEY`
3. `ALLOWED_ORIGINS` in `wrangler.toml` auf die tatsächlich erlaubten Seiten
   begrenzen (Live-Adresse, optional localhost).
4. Veröffentlichen: `npx wrangler deploy`
5. Die ausgegebene Worker-Adresse mit `/feedback` in `config.js` unter
   `aiFeedbackEndpoint` eintragen.

Das voreingestellte Modell ist `gemini-3.1-flash-lite` (am 22. Juni 2026 gegen
die offizielle Modellliste als gültiges, kostenfreies Stable-Modell geprüft).
Wer den Worker einmal einrichten und nicht mehr anfassen möchte, kann
`GEMINI_MODEL` stattdessen auf den Alias `gemini-flash-lite-latest` setzen; er
zeigt automatisch auf das jeweils aktuelle Flash-Lite-Modell und vermeidet, dass
der Dienst bei einem späteren Modellwechsel ins Leere läuft. Vor einem manuellen
Modellwechsel die offizielle Modellliste, Preise und strukturierte Ausgabe
erneut prüfen.

### Schneller Funktionstest

Nach dem Eintragen der URL eine Aufgabe öffnen, den KI-Modus-Schalter
aktivieren, die Einwilligung bestätigen und „KI jetzt um Hilfe bitten“ klicken.
Erscheint eine kurze Rückmeldung, läuft der Dienst. Bleibt es bei „KI-Tipp
derzeit nicht verfügbar“, zuerst `ALLOWED_ORIGINS` (exakte Live-Adresse ohne
abschließenden Schrägstrich), das Secret und den Modellnamen prüfen.

## Übertragene Daten

Gesendet werden nur:

- Aufgaben-ID, Titel, Kurzbeschreibung und Arbeitsaufträge,
- der aktuelle Python-Code,
- Ergebnis und Fehlermeldung der lokalen Prüfung,
- der Versuchszähler.

Eine zufällige Sitzungs-ID dient nur der Ratenbegrenzung im Worker und wird
nicht an Gemini weitergegeben. Profilname, XP, Lernstandsdatei und vorbereitete
Eingaben werden nicht übertragen. Der KI-Modus gilt nur für die aktuelle
Browsersitzung; unveränderte Anfragen werden dort zwischengespeichert.

## Datenschutz und schulischer Betrieb

- Vor der ersten Übertragung zeigt PythonLab einen Zustimmungsdialog. Der Modus
  ist standardmäßig aus und jederzeit abschaltbar.
- Lernende dürfen keine Namen, personenbezogenen oder vertraulichen Angaben in
  ihren Code schreiben.
- Laut aktueller Google-Preisseite können Inhalte der kostenlosen Gemini-Stufe
  zur Verbesserung der Produkte verwendet werden; bei der kostenpflichtigen
  Stufe ist dies dort verneint. Für den regulären Einsatz mit Minderjährigen
  sollte deshalb nur ein schulisch freigegebener Tarif und Vertrag verwendet
  werden.
- Die lokale Prüfung entscheidet allein über Abschluss und XP. Eine KI-Antwort
  kann fehlerhaft sein und bleibt immer ein unverbindlicher Lernhinweis.
- Der Worker begrenzt in einem Fünf-Minuten-Fenster auf zehn Anfragen je
  anonymer Sitzung und 240 Anfragen je IP. Die höhere IP-Grenze berücksichtigt,
  dass eine ganze Klasse oft dieselbe öffentliche Schul-IP verwendet.
- Diese Speicherbegrenzung gilt pro laufender Worker-Instanz. Für einen
  öffentlichen Produktivbetrieb zusätzlich eine Rate-Limiting-Regel im
  Cloudflare-Dashboard einrichten und Nutzung sowie Kosten beobachten.
- Gemini-Anfragen brechen nach 15 Sekunden ab; bei Ausfall bleibt der lokale
  Lerncoach vollständig verfügbar.

## Offizielle Quellen, geprüft am 21. Juni 2026

- [Gemini-Modelle](https://ai.google.dev/gemini-api/docs/models)
- [Gemini-Preise und Datennutzung](https://ai.google.dev/gemini-api/docs/pricing)
- [Strukturierte Ausgaben](https://ai.google.dev/gemini-api/docs/structured-output)
- [Gemini-API-Nutzungsbedingungen](https://ai.google.dev/gemini-api/terms)
- [Cloudflare Worker Secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
