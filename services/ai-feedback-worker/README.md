# Optionaler KI-Lerncoach

Der Worker hält den Gemini-Schlüssel aus dem Browser und aus dem Git-Repository heraus. Die automatische Bewertung in PythonLab funktioniert unabhängig davon lokal; dieser Dienst liefert nur freiwillige Zusatzhinweise.

## Einrichten

1. In Google AI Studio einen Gemini-API-Schlüssel für ein eigenes Cloud-Projekt anlegen.
2. Im Ordner dieses Workers bei Cloudflare anmelden: `npx wrangler login`
3. Den Schlüssel sicher hinterlegen: `npx wrangler secret put GEMINI_API_KEY`
4. `ALLOWED_ORIGINS` in `wrangler.toml` auf die tatsächlich erlaubten Seiten begrenzen.
5. Veröffentlichen: `npx wrangler deploy`
6. Die ausgegebene URL mit `/feedback` in `config.js` als `aiFeedbackEndpoint` eintragen.

Der Schlüssel darf niemals in `config.js`, HTML, JavaScript oder Git eingetragen werden.

## Datenschutz und Betrieb

- Gesendet werden Aufgabenbeschreibung, aktueller Code und das Ergebnis der lokalen Prüfung – kein Profilname und keine Eingaben aus dem Eingabefeld.
- Vor der ersten Übertragung weist PythonLab auf den externen Dienst hin und bittet um Zustimmung.
- Bei der kostenlosen Gemini-Stufe können Inhalte laut Google zur Verbesserung der Produkte verwendet werden. Deshalb dürfen Lernende keine personenbezogenen oder vertraulichen Angaben in den Code schreiben.
- Die lokale Prüfung entscheidet allein über Abschluss und XP. Bei Ausfall oder ausgeschöpftem Kontingent bleibt PythonLab vollständig nutzbar.
- Der Worker begrenzt Anfragen pro sichtbarer Instanz. Für größeren öffentlichen Betrieb sollte zusätzlich im Cloudflare-Dashboard eine Rate-Limiting-Regel eingerichtet werden.
