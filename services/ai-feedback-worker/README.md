# Optionaler KI-Lerncoach

Der Cloudflare Worker hält den Gemini-Schlüssel aus Browser und Repository
heraus. PythonLab bleibt ohne diesen Dienst vollständig nutzbar: Ausführung,
lokale Hinweise, Aufgabenabschluss und XP funktionieren weiterhin im Browser.
Die KI ergänzt nur einen kurzen Lernimpuls.

## Einrichten

Voraussetzungen sind ein eigenes Cloudflare-Konto, ein Google-AI-Projekt und
eine schulische Datenschutzfreigabe. API-Schlüssel niemals in einen Chat,
`config.js`, HTML, JavaScript oder Git kopieren.

1. In Google AI Studio einen Gemini-API-Schlüssel für das vorgesehene Projekt
   anlegen.
2. In diesem Ordner bei Cloudflare anmelden: `npx wrangler login`
3. Den Schlüssel ausschließlich als Worker-Secret eingeben:
   `npx wrangler secret put GEMINI_API_KEY`
4. `ALLOWED_ORIGINS` in `wrangler.toml` auf die tatsächlich erlaubten Seiten
   begrenzen.
5. Veröffentlichen: `npx wrangler deploy`
6. Die ausgegebene Worker-Adresse mit `/feedback` in `config.js` unter
   `aiFeedbackEndpoint` eintragen.

Das voreingestellte Modell ist `gemini-3.1-flash-lite`. Vor einem späteren
Modellwechsel die offizielle Modellliste, Preise und strukturierte Ausgabe
erneut prüfen.

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
