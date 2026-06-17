window.PYLAB_CONTENT = {
  modules: [
    {
      id: "start",
      number: "01",
      title: "Ankommen in Python",
      description: "Sequenzen, Ausgaben, Variablen, Rechnen und Eingaben.",
      lessonIds: ["sequenz", "variablen", "rechnen", "eingaben"]
    },
    {
      id: "entscheidungen",
      number: "02",
      title: "Programme entscheiden",
      description: "Vergleiche, if-else und verknüpfte Bedingungen.",
      lessonIds: ["if", "elif", "logik"]
    },
    {
      id: "wiederholungen",
      number: "03",
      title: "Programme wiederholen",
      description: "Zählerschleifen und bedingte Wiederholungen.",
      lessonIds: ["for", "while"]
    },
    {
      id: "bausteine",
      number: "04",
      title: "Programme strukturieren",
      description: "Funktionen mit Parametern und Rückgabewerten.",
      lessonIds: ["funktionen"]
    },
    {
      id: "plus",
      number: "05",
      title: "Python Plus",
      description: "Listen nutzen, Fehler verstehen und Lösungen planen.",
      lessonIds: ["listen", "debugging"]
    }
  ],

  lessons: [
    {
      id: "sequenz",
      module: "start",
      index: "01",
      title: "Sequenz und Ausgabe",
      subtitle: "Ein Programm arbeitet Anweisungen in einer festen Reihenfolge ab.",
      duration: 12,
      xp: 20,
      difficulty: "easy",
      objectives: [
        "Anweisungen in der richtigen Reihenfolge lesen",
        "Texte und Werte mit print() ausgeben",
        "Vorhersagen, was ein kurzes Programm ausgibt"
      ],
      sections: [
        {
          title: "Schritt für Schritt",
          body: [
            "Python führt ein Programm normalerweise von oben nach unten aus. Jede Zeile ist ein neuer Arbeitsschritt. Diese geordnete Folge nennt man Sequenz.",
            "Schon bei kurzen Programmen lohnt sich die Frage: Welche Werte gibt es vor dieser Zeile, und was verändert die Zeile?"
          ],
          code: `print("Willkommen!")\nprint("Heute üben wir Python.")\nprint(2 + 3)`,
          tip: "Lies Code zunächst laut wie eine Handlungsanweisung: Gib Willkommen aus. Gib den zweiten Satz aus. Berechne 2 + 3 und gib das Ergebnis aus."
        },
        {
          title: "Text oder Rechnung?",
          body: [
            "Text steht in Anführungszeichen. Ohne Anführungszeichen versucht Python, den Ausdruck auszuwerten.",
            "`print(\"2 + 3\")` zeigt den Text 2 + 3. `print(2 + 3)` zeigt das Ergebnis 5."
          ],
          code: `print("2 + 3")\nprint(2 + 3)`
        }
      ],
      quiz: {
        question: "Welche Ausgabe erzeugt print(\"7 * 2\")?",
        options: ["14", "7 * 2", "Einen Fehler"],
        correct: 1,
        explanation: "Die Anführungszeichen machen den Inhalt zu Text. Python rechnet deshalb nicht."
      },
      practiceId: "hallo-python"
    },
    {
      id: "variablen",
      module: "start",
      index: "02",
      title: "Variablen und Datentypen",
      subtitle: "Variablen geben gespeicherten Werten einen verständlichen Namen.",
      duration: 16,
      xp: 25,
      difficulty: "easy",
      objectives: [
        "Werte in Variablen speichern und wieder auslesen",
        "Text, Ganzzahl, Dezimalzahl und Wahrheitswert unterscheiden",
        "Sinnvolle Variablennamen wählen"
      ],
      sections: [
        {
          title: "Ein beschriftetes Fach",
          body: [
            "Eine Variable kannst du dir wie ein beschriftetes Fach vorstellen. Der Name steht links, der gespeicherte Wert rechts vom Gleichheitszeichen.",
            "Das Gleichheitszeichen bedeutet in Python Zuweisung: Speichere den rechten Wert unter dem linken Namen."
          ],
          code: `name = "Mira"\nalter = 17\nnote = 2.3\nbestanden = True\n\nprint(name)\nprint(alter)`
        },
        {
          title: "Datentypen erkennen",
          body: [
            "`str` ist Text, `int` eine Ganzzahl, `float` eine Dezimalzahl und `bool` ein Wahrheitswert.",
            "Python erkennt den Typ meist automatisch. Trotzdem musst du wissen, welcher Typ zu deiner Aufgabe passt."
          ],
          code: `fach = "Informatik"   # str\nstunden = 2           # int\nschnitt = 2.5         # float\nmacht_spass = True    # bool`,
          tip: "Variablennamen dürfen nicht mit einer Ziffer beginnen. Verwende Kleinbuchstaben und Unterstriche, zum Beispiel preis_pro_ticket."
        },
        {
          title: "Werte verändern",
          body: [
            "Eine Variable kann später einen neuen Wert erhalten. Der alte Wert wird dabei ersetzt.",
            "Bei `punkte = punkte + 10` wird zuerst rechts mit dem bisherigen Wert gerechnet. Das Ergebnis wird danach wieder in `punkte` gespeichert."
          ],
          code: `punkte = 20\npunkte = punkte + 10\nprint(punkte)  # 30`
        }
      ],
      quiz: {
        question: "Welcher Datentyp passt zum Wert True?",
        options: ["str", "int", "bool", "float"],
        correct: 2,
        explanation: "True und False sind Wahrheitswerte vom Typ bool."
      },
      practiceId: "punkte-variable"
    },
    {
      id: "rechnen",
      module: "start",
      index: "03",
      title: "Rechnen mit Python",
      subtitle: "Python verbindet Variablen und Rechenoperatoren zu nachvollziehbaren Berechnungen.",
      duration: 16,
      xp: 25,
      difficulty: "easy",
      objectives: [
        "Die wichtigsten Rechenoperatoren verwenden",
        "Zwischenergebnisse sinnvoll speichern",
        "Berechnungen Schritt für Schritt prüfen"
      ],
      sections: [
        {
          title: "Die Operatoren",
          body: [
            "Für Addition, Subtraktion und Multiplikation nutzt Python `+`, `-` und `*`. Eine normale Division mit `/` liefert meist eine Dezimalzahl.",
            "Mit `**` berechnest du eine Potenz. Der Rest einer Division steht nach `%`."
          ],
          code: `print(8 + 2)   # 10\nprint(8 - 2)   # 6\nprint(8 * 2)   # 16\nprint(8 / 2)   # 4.0\nprint(2 ** 3)  # 8\nprint(9 % 2)   # 1`
        },
        {
          title: "Lesbare Berechnungen",
          body: [
            "Lange Rechnungen werden verständlicher, wenn du wichtige Zwischenergebnisse benennst.",
            "Klammern machen deutlich, welche Rechnung zuerst ausgeführt werden soll."
          ],
          code: `preis = 4.50\nanzahl = 6\nzwischensumme = preis * anzahl\nrabatt = zwischensumme * 0.10\nendpreis = zwischensumme - rabatt\nprint(endpreis)`,
          tip: "Rechne einen Beispielsatz einmal mit dem Taschenrechner nach. So merkst du schnell, ob Formel und Einheit stimmen."
        }
      ],
      quiz: {
        question: "Welcher Ausdruck berechnet drei hoch vier?",
        options: ["3 * 4", "3 ^ 4", "3 ** 4", "3 / 4"],
        correct: 2,
        explanation: "Der Potenzoperator in Python ist **."
      },
      practiceId: "rechteck-flaeche"
    },
    {
      id: "eingaben",
      module: "start",
      index: "04",
      title: "Eingaben und Umwandlung",
      subtitle: "Mit input() können Nutzerinnen und Nutzer Werte an ein Programm übergeben.",
      duration: 18,
      xp: 30,
      difficulty: "easy",
      objectives: [
        "Benutzereingaben mit input() einlesen",
        "Texte in Zahlen umwandeln",
        "Aussagekräftige Eingabeaufforderungen formulieren"
      ],
      sections: [
        {
          title: "input liefert Text",
          body: [
            "`input()` wartet auf eine Eingabe. Der eingegebene Wert ist zunächst immer Text, selbst wenn jemand 12 eintippt.",
            "Für eine Rechnung wandelst du den Text mit `int()` oder `float()` um."
          ],
          code: `name = input("Wie heißt du? ")\nalter = int(input("Wie alt bist du? "))\nprint("Hallo", name)\nprint("Nächstes Jahr bist du", alter + 1)`
        },
        {
          title: "Ganzzahl oder Dezimalzahl?",
          body: [
            "Nutze `int()` für ganze Stückzahlen oder Jahre. Nutze `float()` für Preise, Längen oder Messwerte mit Nachkommastellen.",
            "Wähle die Umwandlung passend zum fachlichen Inhalt, nicht nur passend zu einem einzelnen Beispiel."
          ],
          code: `anzahl = int(input("Anzahl: "))\npreis = float(input("Preis pro Stück: "))\ngesamt = anzahl * preis\nprint("Gesamt:", gesamt, "Euro")`,
          warning: "Eine Eingabe wie zwölf kann nicht mit int() umgewandelt werden. Für den Einstieg gehen wir davon aus, dass die Eingaben passend erfolgen."
        }
      ],
      quiz: {
        question: "Warum steht häufig int(input(...)) im Code?",
        options: [
          "Damit die Eingabe farbig wird",
          "Damit der eingegebene Text in eine Ganzzahl umgewandelt wird",
          "Damit input schneller arbeitet"
        ],
        correct: 1,
        explanation: "input() liefert Text. int() macht daraus eine Ganzzahl, mit der gerechnet werden kann."
      },
      practiceId: "temperatur"
    },
    {
      id: "if",
      module: "entscheidungen",
      index: "05",
      title: "Vergleiche und if",
      subtitle: "Eine einseitige Verzweigung führt Code nur dann aus, wenn eine Bedingung wahr ist.",
      duration: 18,
      xp: 30,
      difficulty: "easy",
      objectives: [
        "Vergleichsoperatoren sicher lesen",
        "Eine if-Bedingung formulieren",
        "Einrückungen als Teil der Python-Syntax verstehen"
      ],
      sections: [
        {
          title: "Wahr oder falsch",
          body: [
            "Ein Vergleich liefert immer `True` oder `False`. Häufige Operatoren sind `==`, `!=`, `<`, `<=`, `>` und `>=`.",
            "Achtung: `=` weist einen Wert zu. `==` vergleicht zwei Werte."
          ],
          code: `alter = 17\nprint(alter >= 16)  # True\nprint(alter == 18)  # False`
        },
        {
          title: "Nur wenn ...",
          body: [
            "Der eingerückte Block nach `if` wird nur ausgeführt, wenn die Bedingung wahr ist.",
            "Der Doppelpunkt eröffnet den Block. Alle zugehörigen Zeilen sind gleich weit eingerückt."
          ],
          code: `punkte = 82\n\nif punkte >= 80:\n    print("Stark! Du hast Level 2 erreicht.")\n\nprint("Auswertung beendet.")`,
          warning: "Einrückungen sind in Python keine Dekoration. Fehlen sie oder sind sie uneinheitlich, kann Python den Programmblock nicht erkennen."
        }
      ],
      quiz: {
        question: "Welcher Vergleich prüft, ob alter genau 18 ist?",
        options: ["alter = 18", "alter == 18", "alter >= 18"],
        correct: 1,
        explanation: "Mit == vergleichst du auf Gleichheit. Ein einzelnes = ist eine Zuweisung."
      },
      practiceId: "rabatt-if"
    },
    {
      id: "elif",
      module: "entscheidungen",
      index: "06",
      title: "if, elif und else",
      subtitle: "Mehrere Fälle werden in einer sinnvollen Reihenfolge geprüft.",
      duration: 20,
      xp: 35,
      difficulty: "medium",
      objectives: [
        "Zweiseitige und mehrseitige Verzweigungen entwickeln",
        "Bedingungen in sinnvoller Reihenfolge anordnen",
        "Lücken und Überschneidungen in Fällen erkennen"
      ],
      sections: [
        {
          title: "Genau ein Zweig",
          body: [
            "Bei `if` - `elif` - `else` wird von oben nach unten geprüft. Sobald eine Bedingung wahr ist, wird ihr Block ausgeführt. Die weiteren Zweige werden übersprungen.",
            "`else` benötigt keine eigene Bedingung. Es fängt alle übrigen Fälle ab."
          ],
          code: `punkte = 73\n\nif punkte >= 90:\n    stufe = "Gold"\nelif punkte >= 70:\n    stufe = "Silber"\nelif punkte >= 50:\n    stufe = "Bronze"\nelse:\n    stufe = "Starter"\n\nprint(stufe)`
        },
        {
          title: "Reihenfolge planen",
          body: [
            "Bei Grenzwerten prüfst du meist vom größten zum kleinsten Wert. Würde im Beispiel zuerst `punkte >= 50` stehen, wären auch 95 Punkte bereits dort abgefangen.",
            "Teste immer Werte direkt an den Grenzen, zum Beispiel 49, 50, 69, 70, 89 und 90."
          ],
          tip: "Schreibe vor dem Programm eine kleine Falltabelle. Das verhindert viele Denkfehler."
        }
      ],
      quiz: {
        question: "Warum steht im Beispiel die Bedingung punkte >= 90 zuerst?",
        options: [
          "Weil Python nur große Zahlen lesen kann",
          "Damit hohe Werte nicht bereits von einer niedrigeren Grenze abgefangen werden",
          "Die Reihenfolge ist beliebig"
        ],
        correct: 1,
        explanation: "Python nimmt den ersten passenden Zweig. Deshalb werden hohe Grenzen zuerst geprüft."
      },
      practiceId: "notenstufe"
    },
    {
      id: "logik",
      module: "entscheidungen",
      index: "07",
      title: "Logische Operatoren",
      subtitle: "Mit and, or und not lassen sich mehrere Bedingungen verständlich verbinden.",
      duration: 20,
      xp: 35,
      difficulty: "medium",
      objectives: [
        "and, or und not fachlich unterscheiden",
        "Verknüpfte Bedingungen formulieren",
        "Komplexe Bedingungen in Teilfragen zerlegen"
      ],
      sections: [
        {
          title: "and und or",
          body: [
            "`and` verlangt, dass beide Teilbedingungen wahr sind. Bei `or` genügt eine wahre Teilbedingung.",
            "Formuliere die Regel zuerst als deutschen Satz. Übersetze danach jedes 'und' beziehungsweise 'oder'."
          ],
          code: `alter = 17\nhat_ausweis = True\n\nif alter >= 16 and hat_ausweis:\n    print("Zugang erlaubt")\n\nif alter < 12 or alter >= 65:\n    print("Ermäßigter Eintritt")`
        },
        {
          title: "not dreht um",
          body: [
            "`not` kehrt einen Wahrheitswert um. Aus `True` wird `False`, aus `False` wird `True`.",
            "Oft ist eine positive Variablenbezeichnung leichter zu lesen: `hat_ticket` statt `kein_ticket`."
          ],
          code: `hat_ticket = False\n\nif not hat_ticket:\n    print("Bitte Ticket kaufen.")`,
          tip: "Setze bei längeren Bedingungen Klammern. Sie sind nicht immer nötig, machen die Absicht aber klarer."
        }
      ],
      quiz: {
        question: "Wann ist A and B wahr?",
        options: ["Wenn A oder B wahr ist", "Nur wenn A und B wahr sind", "Immer"],
        correct: 1,
        explanation: "Bei and müssen beide Teilbedingungen wahr sein."
      },
      practiceId: "zugang-logik"
    },
    {
      id: "for",
      module: "wiederholungen",
      index: "08",
      title: "for-Schleifen",
      subtitle: "Eine Zählerschleife wiederholt einen Block für eine bekannte Anzahl von Durchläufen.",
      duration: 22,
      xp: 40,
      difficulty: "medium",
      objectives: [
        "range() mit Start, Ende und Schrittweite lesen",
        "Zählerschleifen entwickeln",
        "Laufende Werte innerhalb einer Schleife aktualisieren"
      ],
      sections: [
        {
          title: "Zählen mit range",
          body: [
            "`range(1, 6)` erzeugt die Zahlen 1, 2, 3, 4 und 5. Der Endwert 6 gehört nicht mehr dazu.",
            "Die Laufvariable erhält nacheinander jeden Wert aus diesem Bereich."
          ],
          code: `for tag in range(1, 6):\n    print("Tag", tag)`,
          warning: "Der häufigste Fehler ist ein fehlender letzter Durchlauf. Prüfe immer, ob dein Endwert bei range noch enthalten sein soll."
        },
        {
          title: "Werte entwickeln",
          body: [
            "Schleifen eignen sich gut für Entwicklungen über mehrere Zeitpunkte. Ein Wert wird in jedem Durchlauf verändert.",
            "Initialisiere den Startwert vor der Schleife. Aktualisiere ihn im Schleifenkörper."
          ],
          code: `guthaben = 50\n\nfor jahr in range(1, 4):\n    guthaben = guthaben + 10\n    print("Jahr", jahr, ":", guthaben)`
        }
      ],
      quiz: {
        question: "Welche Werte durchläuft i bei range(2, 6)?",
        options: ["2, 3, 4, 5", "2, 3, 4, 5, 6", "0, 1, 2, 3, 4, 5"],
        correct: 0,
        explanation: "Der Startwert ist enthalten, der Endwert nicht."
      },
      practiceId: "einmaleins"
    },
    {
      id: "while",
      module: "wiederholungen",
      index: "09",
      title: "while-Schleifen",
      subtitle: "Eine while-Schleife läuft so lange, wie ihre Bedingung wahr ist.",
      duration: 24,
      xp: 45,
      difficulty: "medium",
      objectives: [
        "Startwert, Bedingung und Veränderung bestimmen",
        "Bedingte Wiederholungen programmieren",
        "Endlosschleifen erkennen und vermeiden"
      ],
      sections: [
        {
          title: "Solange die Bedingung gilt",
          body: [
            "Eine `while`-Schleife ist passend, wenn die Anzahl der Durchläufe vorher nicht sicher feststeht.",
            "Vor jedem Durchlauf prüft Python die Bedingung. Ist sie falsch, endet die Schleife."
          ],
          code: `akku = 20\nminuten = 0\n\nwhile akku < 80:\n    akku = akku + 10\n    minuten = minuten + 1\n\nprint(minuten)`
        },
        {
          title: "Die drei Bausteine",
          body: [
            "Eine sichere while-Schleife braucht einen sinnvollen Startwert, eine Abbruchbedingung und eine Veränderung, die irgendwann zum Ende führt.",
            "Frage dich vor dem Start: Welche Variable macht in jedem Durchlauf einen Schritt in Richtung Ende?"
          ],
          code: `wert = 1              # Startwert\nwhile wert < 100:     # Bedingung\n    wert = wert * 2   # Veränderung\n    print(wert)`,
          warning: "Verändert sich keine Variable aus der Bedingung, kann eine Endlosschleife entstehen. Der Übungsbereich beendet sehr lange Programme automatisch."
        }
      ],
      quiz: {
        question: "Wann eignet sich while besonders?",
        options: [
          "Wenn die Anzahl der Wiederholungen durch eine Bedingung bestimmt wird",
          "Nur für genau drei Wiederholungen",
          "Nur für Textausgaben"
        ],
        correct: 0,
        explanation: "while ist ideal, wenn bis zu einem Ziel oder solange eine Bedingung gilt wiederholt wird."
      },
      practiceId: "sparziel"
    },
    {
      id: "funktionen",
      module: "bausteine",
      index: "10",
      title: "Funktionen",
      subtitle: "Funktionen bündeln eine Teilaufgabe und machen Programme übersichtlicher.",
      duration: 25,
      xp: 50,
      difficulty: "medium",
      objectives: [
        "Funktionen definieren und aufrufen",
        "Parameter als Eingabewerte einer Funktion verstehen",
        "Rückgabewerte weiterverwenden"
      ],
      sections: [
        {
          title: "Ein benannter Baustein",
          body: [
            "Mit `def` definierst du eine Funktion. Der eingerückte Block beschreibt, was die Funktion erledigt.",
            "Eine Definition führt den Block noch nicht aus. Erst ein Funktionsaufruf startet ihn."
          ],
          code: `def begruessung():\n    print("Willkommen in PythonLab!")\n\nbegruessung()`
        },
        {
          title: "Parameter",
          body: [
            "Parameter sind Platzhalter in der Funktionsdefinition. Beim Aufruf werden konkrete Argumente eingesetzt.",
            "So kann derselbe Baustein mit unterschiedlichen Werten arbeiten."
          ],
          code: `def begruessung(name):\n    print("Hallo", name)\n\nbegruessung("Mia")\nbegruessung("Noah")`
        },
        {
          title: "Rückgabewerte",
          body: [
            "`return` gibt ein Ergebnis an die aufrufende Stelle zurück. Dort kann es gespeichert, ausgegeben oder weiterverarbeitet werden.",
            "Ein Rückgabewert ist flexibler als eine Ausgabe direkt in der Funktion."
          ],
          code: `def rechteck_flaeche(breite, hoehe):\n    flaeche = breite * hoehe\n    return flaeche\n\nergebnis = rechteck_flaeche(4, 6)\nprint(ergebnis)`,
          tip: "Eine Funktion sollte möglichst eine klar beschreibbare Teilaufgabe erledigen."
        }
      ],
      quiz: {
        question: "Was bewirkt return in einer Funktion?",
        options: [
          "Es startet das gesamte Programm neu",
          "Es gibt einen Wert an die aufrufende Stelle zurück",
          "Es schreibt immer etwas auf den Bildschirm"
        ],
        correct: 1,
        explanation: "return liefert ein Ergebnis zurück. Eine Ausgabe erfolgt nur, wenn du es zusätzlich mit print() ausgibst."
      },
      practiceId: "fahrtkosten-funktion"
    },
    {
      id: "listen",
      module: "plus",
      index: "11",
      title: "Listen als Sammlung",
      subtitle: "Listen speichern mehrere zusammengehörige Werte in einer geordneten Sammlung.",
      duration: 24,
      xp: 50,
      difficulty: "plus",
      objectives: [
        "Listen erstellen und einzelne Elemente lesen",
        "Mit einer Schleife über eine Liste laufen",
        "Summen und Mittelwerte aus einer Liste bestimmen"
      ],
      sections: [
        {
          title: "Mehrere Werte",
          body: [
            "Eine Liste steht in eckigen Klammern. Die Position eines Elements heißt Index und beginnt bei 0.",
            "Eine Liste kann wachsen. Mit `append()` hängst du einen neuen Wert an."
          ],
          code: `noten = [2, 3, 1, 2]\nprint(noten[0])\n\nnoten.append(1)\nprint(noten)`
        },
        {
          title: "Listen durchlaufen",
          body: [
            "Eine for-Schleife kann direkt nacheinander jedes Element einer Liste verwenden.",
            "Für eine Summe startest du mit 0 und addierst jeden Wert."
          ],
          code: `werte = [12, 18, 15, 20]\nsumme = 0\n\nfor wert in werte:\n    summe = summe + wert\n\nmittelwert = summe / len(werte)\nprint(mittelwert)`,
          tip: "len(liste) liefert die Anzahl der Elemente. Damit kannst du zum Beispiel einen Mittelwert berechnen."
        }
      ],
      quiz: {
        question: "Welchen Index hat das erste Element einer Python-Liste?",
        options: ["0", "1", "-1"],
        correct: 0,
        explanation: "Python zählt Listenpositionen ab 0."
      },
      practiceId: "mittelwert-liste"
    },
    {
      id: "debugging",
      module: "plus",
      index: "12",
      title: "Fehler finden und Lösungen planen",
      subtitle: "Fehler sind Hinweise. Mit einer festen Strategie werden sie beherrschbar.",
      duration: 22,
      xp: 50,
      difficulty: "plus",
      objectives: [
        "Syntax-, Laufzeit- und Logikfehler unterscheiden",
        "Fehlermeldungen von unten nach oben lesen",
        "Ein Problem mit Beispielen und Zwischenausgaben eingrenzen"
      ],
      sections: [
        {
          title: "Drei Fehlerarten",
          body: [
            "Ein Syntaxfehler bedeutet, dass Python die Schreibweise nicht versteht. Ein Laufzeitfehler tritt erst beim Ausführen auf. Ein Logikfehler liefert ein falsches Ergebnis, obwohl das Programm läuft.",
            "Bei Logikfehlern helfen kleine Testwerte, die du selbst leicht nachrechnen kannst."
          ],
          code: `# Syntaxfehler: Doppelpunkt fehlt\n# if alter >= 18\n\n# Laufzeitfehler: Division durch 0\n# ergebnis = 10 / 0\n\n# Logikfehler: falscher Operator\npreis = 5\nanzahl = 3\ngesamt = preis + anzahl`
        },
        {
          title: "Eine ruhige Strategie",
          body: [
            "Lies die letzte Zeile der Fehlermeldung. Suche danach die genannte Codezeile. Prüfe Variablennamen, Klammern, Doppelpunkte und Einrückungen.",
            "Wenn das Programm läuft, aber falsch rechnet, gib Zwischenergebnisse aus. So findest du den ersten Schritt, an dem Erwartung und tatsächlicher Wert auseinanderlaufen."
          ],
          code: `breite = 4\nhoehe = 6\nprint("Breite:", breite)\nprint("Höhe:", hoehe)\nflaeche = breite * hoehe\nprint("Fläche:", flaeche)`,
          tip: "Ändere beim Debuggen immer nur eine Sache und teste danach erneut."
        }
      ],
      quiz: {
        question: "Das Programm läuft, berechnet aber einen falschen Preis. Welche Fehlerart ist das wahrscheinlich?",
        options: ["Syntaxfehler", "Logikfehler", "Installationsfehler"],
        correct: 1,
        explanation: "Ein falsches Ergebnis bei laufendem Programm deutet auf einen Logikfehler hin."
      },
      practiceId: "debug-rabatt"
    }
  ],

  exercises: [
    {
      id: "hallo-python",
      lessonId: "sequenz",
      title: "Dein erster Werkstattgruß",
      description: "Erzeuge drei Ausgaben in der richtigen Reihenfolge.",
      difficulty: "easy",
      xp: 25,
      instructions: [
        "Gib zuerst den Text PythonLab aus.",
        "Gib danach den Text Ich übe selbst! aus.",
        "Gib in der dritten Zeile das Ergebnis von 6 + 4 aus."
      ],
      starter: `# Schreibe deine drei Ausgaben hier\n`,
      check: {
        type: "output",
        expected: "PythonLab\nIch übe selbst!\n10"
      }
    },
    {
      id: "punkte-variable",
      lessonId: "variablen",
      title: "Punkte sammeln",
      description: "Speichere und verändere einen Punktestand.",
      difficulty: "easy",
      xp: 25,
      instructions: [
        "Speichere 35 in einer Variable namens punkte.",
        "Erhöhe punkte um 15.",
        "Gib den neuen Punktestand aus."
      ],
      starter: `punkte = 35\n\n# Erhöhe den Punktestand\n\n# Gib ihn aus\n`,
      check: {
        type: "tests",
        code: `assert punkte == 50, "Die Variable punkte soll am Ende 50 enthalten."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "rechteck-flaeche",
      lessonId: "rechnen",
      title: "Fläche und Umfang",
      description: "Berechne zwei Ergebnisse mit denselben Ausgangswerten.",
      difficulty: "easy",
      xp: 30,
      instructions: [
        "Die Variablen breite und hoehe sind bereits gesetzt.",
        "Berechne flaeche = breite * hoehe.",
        "Berechne umfang = 2 * (breite + hoehe).",
        "Gib zuerst die Fläche, danach den Umfang aus."
      ],
      starter: `breite = 8\nhoehe = 5\n\n# Berechne Fläche und Umfang\n`,
      check: {
        type: "tests",
        code: `assert flaeche == 40, "Die Fläche stimmt noch nicht."\nassert umfang == 26, "Der Umfang stimmt noch nicht."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "temperatur",
      lessonId: "eingaben",
      title: "Temperatur umrechnen",
      description: "Lies eine Zahl ein und verwende sie in einer Formel.",
      difficulty: "easy",
      xp: 35,
      instructions: [
        "Lies eine Celsius-Temperatur als Dezimalzahl ein.",
        "Berechne Fahrenheit mit celsius * 1.8 + 32.",
        "Gib das Ergebnis aus."
      ],
      starter: `# Eingabe als float einlesen\ncelsius = \n\n# Fahrenheit berechnen\nfahrenheit = \n\nprint(fahrenheit)\n`,
      input: "20",
      checkInput: "20",
      check: {
        type: "outputNumber",
        expected: 68
      }
    },
    {
      id: "rabatt-if",
      lessonId: "if",
      title: "Mengenrabatt",
      description: "Wende einen Rabatt nur ab einer bestimmten Stückzahl an.",
      difficulty: "easy",
      xp: 35,
      instructions: [
        "preis und anzahl sind vorgegeben.",
        "Berechne zunächst gesamt = preis * anzahl.",
        "Ab 5 Stück wird gesamt mit 0.9 multipliziert.",
        "Gib gesamt aus."
      ],
      starter: `preis = 12\nanzahl = 6\n\ngesamt = preis * anzahl\n\n# Rabatt nur ab 5 Stück\n\nprint(gesamt)\n`,
      check: {
        type: "tests",
        code: `assert abs(gesamt - 64.8) < 0.001, "Bei 6 Stück muss der Rabatt berücksichtigt werden."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "notenstufe",
      lessonId: "elif",
      title: "Leistungsstufe bestimmen",
      description: "Ordne einen Punktwert genau einer Stufe zu.",
      difficulty: "medium",
      xp: 40,
      instructions: [
        "90 oder mehr Punkte: Gold",
        "70 bis 89 Punkte: Silber",
        "50 bis 69 Punkte: Bronze",
        "Weniger als 50 Punkte: Starter",
        "Speichere die Stufe in der Variable stufe und gib sie aus."
      ],
      starter: `punkte = 76\n\n# Bestimme die Variable stufe\n\nprint(stufe)\n`,
      check: {
        type: "tests",
        code: `assert stufe == "Silber", "76 Punkte gehören zur Stufe Silber."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "zugang-logik",
      lessonId: "logik",
      title: "Zugang zur Werkstatt",
      description: "Verbinde Alter und Sicherheitsunterweisung.",
      difficulty: "medium",
      xp: 40,
      instructions: [
        "Der Zugang ist erlaubt, wenn die Person mindestens 16 Jahre alt ist und die Unterweisung abgeschlossen hat.",
        "Speichere True oder False in zugang.",
        "Gib zugang aus."
      ],
      starter: `alter = 17\nunterweisung = True\n\n# Verknüpfe beide Bedingungen\nzugang = \n\nprint(zugang)\n`,
      check: {
        type: "tests",
        code: `assert zugang is True, "Beide Bedingungen sind erfüllt, daher muss zugang True sein."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "einmaleins",
      lessonId: "for",
      title: "Das Siebener-Einmaleins",
      description: "Erzeuge mit einer Schleife eine Folge von Ergebnissen.",
      difficulty: "medium",
      xp: 45,
      instructions: [
        "Nutze eine for-Schleife für die Zahlen 1 bis 10.",
        "Gib in jeder Runde 7 * zahl aus.",
        "Die Ausgabe beginnt mit 7 und endet mit 70."
      ],
      starter: `# Schreibe die for-Schleife\n`,
      check: {
        type: "output",
        expected: "7\n14\n21\n28\n35\n42\n49\n56\n63\n70"
      }
    },
    {
      id: "sparziel",
      lessonId: "while",
      title: "Bis zum Sparziel",
      description: "Ermittle eine unbekannte Anzahl von Monaten.",
      difficulty: "medium",
      xp: 50,
      instructions: [
        "Das Guthaben startet bei 40 Euro.",
        "Jeden Monat kommen 15 Euro hinzu.",
        "Erhöhe monate in jedem Durchlauf um 1.",
        "Wiederhole, bis mindestens 130 Euro erreicht sind.",
        "Gib monate und guthaben aus."
      ],
      starter: `guthaben = 40\nmonate = 0\n\n# Ergänze die while-Schleife\n\nprint(monate)\nprint(guthaben)\n`,
      check: {
        type: "tests",
        code: `assert monate == 6, "Das Ziel wird nach 6 Monaten erreicht."\nassert guthaben == 130, "Das Guthaben soll dann 130 Euro betragen."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "fahrtkosten-funktion",
      lessonId: "funktionen",
      title: "Fahrtkosten als Funktion",
      description: "Kapsele eine Berechnung mit Parametern und Rückgabewert.",
      difficulty: "medium",
      xp: 55,
      instructions: [
        "Definiere kosten(strecke, verbrauch, literpreis).",
        "Berechne zuerst die benötigten Liter: strecke * verbrauch / 100.",
        "Gib die Gesamtkosten mit return zurück.",
        "Verändere den vorgegebenen Beispielaufruf nicht."
      ],
      starter: `def kosten(strecke, verbrauch, literpreis):\n    # Berechnung ergänzen\n    pass\n\nbeispiel = kosten(250, 6.5, 1.80)\nprint(beispiel)\n`,
      check: {
        type: "tests",
        code: `assert abs(kosten(250, 6.5, 1.80) - 29.25) < 0.001, "Prüfe Literverbrauch und Kosten."\nassert abs(kosten(100, 5, 2) - 10) < 0.001, "Die Funktion soll mit verschiedenen Werten arbeiten."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "mittelwert-liste",
      lessonId: "listen",
      title: "Messwerte auswerten",
      description: "Berechne den Mittelwert einer Liste ohne fertige sum-Funktion.",
      difficulty: "plus",
      xp: 60,
      instructions: [
        "Durchlaufe die Liste messwerte mit einer for-Schleife.",
        "Addiere alle Werte in summe.",
        "Berechne mittelwert mit summe / len(messwerte).",
        "Gib den Mittelwert aus."
      ],
      starter: `messwerte = [18, 21, 19, 22, 20]\nsumme = 0\n\n# Liste durchlaufen und Summe bilden\n\n# Mittelwert berechnen\n\nprint(mittelwert)\n`,
      check: {
        type: "tests",
        code: `assert summe == 100, "Die Summe der Messwerte ist 100."\nassert mittelwert == 20, "Der Mittelwert ist 20."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "debug-rabatt",
      lessonId: "debugging",
      title: "Rabattprogramm reparieren",
      description: "Finde Syntax- und Logikfehler in einem kurzen Programm.",
      difficulty: "plus",
      xp: 60,
      instructions: [
        "Das Programm soll ab 4 Tickets 20 Prozent Rabatt geben.",
        "Für 5 Tickets zu je 10 Euro muss der Endpreis 40 Euro sein.",
        "Repariere alle Fehler und behalte die Ausgabe bei."
      ],
      starter: `preis = 10\nanzahl = 5\ngesamt = preis + anzahl\n\nif anzahl >= 4\nprint("Rabatt wird angewendet")\n    gesamt = gesamt * 0.8\n\nprint(gesamt)\n`,
      check: {
        type: "tests",
        code: `assert gesamt == 40, "Für 5 Tickets zu 10 Euro sind nach Rabatt 40 Euro fällig."\nprint("__PYLAB_TESTS_OK__")`
      }
    }
  ],

  commands: [
    {
      id: "print",
      title: "print()",
      category: "Ausgabe",
      syntax: "print(wert)",
      short: "Gibt Text, Zahlen oder berechnete Werte aus.",
      summary: "Mit print() machst du sichtbar, was dein Programm berechnet oder mitteilen soll.",
      details: [
        "Text steht in Anführungszeichen. Zahlen und Variablen können direkt ausgegeben werden.",
        "Mehrere Werte trennst du mit Komma. Python setzt dann automatisch Leerzeichen dazwischen.",
        "print() ist auch beim Debuggen hilfreich, weil du Zwischenwerte kontrollieren kannst."
      ],
      example: `name = "Mia"\npunkte = 42\nprint("Hallo", name)\nprint("Punkte:", punkte)`,
      pitfalls: [
        "print(\"2 + 3\") gibt den Text aus, print(2 + 3) berechnet 5.",
        "Vergiss die schließende Klammer nicht."
      ],
      relatedLesson: "sequenz",
      xp: 10,
      exercise: {
        question: "Welche Zeile gibt das berechnete Ergebnis 8 aus?",
        options: ["print(\"5 + 3\")", "print(5 + 3)", "print = 5 + 3"],
        correct: 1,
        feedback: "Ohne Anführungszeichen wird der Ausdruck berechnet."
      }
    },
    {
      id: "input",
      title: "input()",
      category: "Eingabe",
      syntax: "text = input(\"Frage: \")",
      short: "Liest eine Eingabe als Text ein.",
      summary: "Mit input() kann eine Nutzerin oder ein Nutzer einen Wert an dein Programm übergeben.",
      details: [
        "input() liefert immer Text, auch wenn jemand eine Zahl eintippt.",
        "Die Frage in den Klammern sollte klar sagen, was eingegeben werden soll.",
        "Für Rechnungen wandelst du die Eingabe danach mit int() oder float() um."
      ],
      example: `name = input("Name: ")\nprint("Hallo", name)`,
      pitfalls: [
        "Mit Text kann Python nicht direkt rechnen.",
        "In PythonLab werden input()-Werte im Aufgabenbereich über vorbereitete Eingabezeilen simuliert."
      ],
      relatedLesson: "eingaben",
      xp: 10,
      exercise: {
        question: "Welchen Datentyp liefert input() zuerst?",
        options: ["int", "float", "str"],
        correct: 2,
        feedback: "input() liefert zuerst immer Text, also str."
      }
    },
    {
      id: "type-conversion",
      title: "int(), float(), str()",
      category: "Umwandlung",
      syntax: "zahl = int(text)",
      short: "Wandelt Werte in passende Datentypen um.",
      summary: "Umwandlungen brauchst du besonders nach input(), wenn aus eingegebenem Text eine Zahl werden soll.",
      details: [
        "int() erzeugt eine Ganzzahl, float() eine Dezimalzahl und str() Text.",
        "Wähle den Typ passend zum Sachverhalt: Stückzahlen sind meistens int, Preise eher float.",
        "Eine unpassende Eingabe wie zwölf statt 12 kann eine Fehlermeldung auslösen."
      ],
      example: `alter = int(input("Alter: "))\npreis = float(input("Preis: "))\nprint("Nächstes Jahr:", alter + 1)`,
      pitfalls: [
        "int(\"3.5\") funktioniert nicht, weil 3.5 keine ganze Zahl ist.",
        "str() ist nützlich, wenn Werte zu Text zusammengesetzt werden sollen."
      ],
      relatedLesson: "eingaben",
      xp: 10,
      exercise: {
        question: "Welche Umwandlung passt zu einer eingegebenen Anzahl von Tickets?",
        options: ["int(input(...))", "float(input(...))", "str(input(...))"],
        correct: 0,
        feedback: "Eine Anzahl ist eine ganze Zahl, deshalb passt int()."
      }
    },
    {
      id: "comparisons",
      title: "Vergleiche",
      category: "Bedingungen",
      syntax: "alter >= 18",
      short: "Prüfen, ob eine Aussage wahr oder falsch ist.",
      summary: "Vergleiche liefern True oder False und steuern damit if- und while-Blöcke.",
      details: [
        "== prüft Gleichheit, = weist einen Wert zu.",
        "Häufige Operatoren sind !=, <, <=, > und >=.",
        "Vergleiche solltest du besonders an Grenzwerten testen."
      ],
      example: `punkte = 73\nprint(punkte >= 50)\nprint(punkte == 100)`,
      pitfalls: [
        "Ein einzelnes = ist keine Prüfung.",
        "Achte bei Grenzen darauf, ob der Grenzwert selbst dazugehören soll."
      ],
      relatedLesson: "if",
      xp: 10,
      exercise: {
        question: "Welcher Ausdruck prüft, ob alter mindestens 16 ist?",
        options: ["alter = 16", "alter >= 16", "alter < 16"],
        correct: 1,
        feedback: ">= bedeutet größer gleich."
      }
    },
    {
      id: "if-elif-else",
      title: "if, elif, else",
      category: "Verzweigung",
      syntax: "if bedingung:",
      short: "Führt abhängig von Bedingungen unterschiedliche Blöcke aus.",
      summary: "Verzweigungen lassen Programme auf Fälle reagieren, statt immer denselben Weg zu nehmen.",
      details: [
        "Nach if und elif steht eine Bedingung mit Doppelpunkt.",
        "Der dazugehörige Block ist eingerückt.",
        "elif prüft weitere Fälle, else fängt alle übrigen Fälle ab."
      ],
      example: `punkte = 73\nif punkte >= 90:\n    print("Gold")\nelif punkte >= 50:\n    print("bestanden")\nelse:\n    print("noch üben")`,
      pitfalls: [
        "Die Reihenfolge der Bedingungen ist wichtig.",
        "else hat keine eigene Bedingung."
      ],
      relatedLesson: "elif",
      xp: 15,
      exercise: {
        question: "Warum steht bei mehreren Notengrenzen meist die höchste Grenze zuerst?",
        options: [
          "Damit hohe Werte nicht vorher von einer niedrigeren Grenze abgefangen werden",
          "Weil Python sonst keine Zahlen lesen kann",
          "Die Reihenfolge ist immer egal"
        ],
        correct: 0,
        feedback: "Python nimmt den ersten passenden Zweig."
      }
    },
    {
      id: "logic",
      title: "and, or, not",
      category: "Bedingungen",
      syntax: "alter >= 16 and hat_ausweis",
      short: "Verknüpft oder dreht Wahrheitswerte.",
      summary: "Logische Operatoren machen Bedingungen präziser, wenn mehrere Teilfragen wichtig sind.",
      details: [
        "and ist nur wahr, wenn beide Teilbedingungen wahr sind.",
        "or ist wahr, wenn mindestens eine Teilbedingung wahr ist.",
        "not dreht True zu False und False zu True."
      ],
      example: `alter = 17\nhat_ausweis = True\nif alter >= 16 and hat_ausweis:\n    print("Zugang erlaubt")`,
      pitfalls: [
        "Formuliere die Regel zuerst als deutschen Satz.",
        "Klammern helfen bei längeren Bedingungen."
      ],
      relatedLesson: "logik",
      xp: 10,
      exercise: {
        question: "Wann ist A and B wahr?",
        options: ["Wenn A oder B wahr ist", "Nur wenn A und B wahr sind", "Nie"],
        correct: 1,
        feedback: "and verlangt beide Wahrheitswerte."
      }
    },
    {
      id: "for-range",
      title: "for und range()",
      category: "Schleifen",
      syntax: "for i in range(1, 6):",
      short: "Wiederholt einen Block für eine bekannte Anzahl von Durchläufen.",
      summary: "for-Schleifen eignen sich, wenn du weißt, über welche Werte oder wie oft wiederholt werden soll.",
      details: [
        "range(1, 6) liefert 1, 2, 3, 4, 5. Der Endwert ist nicht enthalten.",
        "Die Laufvariable erhält nacheinander jeden Wert.",
        "Der Schleifenkörper ist eingerückt."
      ],
      example: `for i in range(1, 6):\n    print(i * 5)`,
      pitfalls: [
        "Prüfe immer, ob der letzte Wert wirklich enthalten sein soll.",
        "range(5) startet bei 0 und endet vor 5."
      ],
      relatedLesson: "for",
      xp: 15,
      exercise: {
        question: "Welche Werte durchläuft i bei range(2, 5)?",
        options: ["2, 3, 4", "2, 3, 4, 5", "0, 1, 2, 3, 4"],
        correct: 0,
        feedback: "Start inklusive, Ende exklusiv."
      }
    },
    {
      id: "while",
      title: "while",
      category: "Schleifen",
      syntax: "while bedingung:",
      short: "Wiederholt einen Block, solange eine Bedingung wahr ist.",
      summary: "while-Schleifen sind passend, wenn vorher nicht feststeht, wie viele Durchläufe nötig sind.",
      details: [
        "Vor jedem Durchlauf wird die Bedingung geprüft.",
        "Im Schleifenkörper muss sich etwas in Richtung Ende verändern.",
        "Startwert, Bedingung und Veränderung gehören zusammen."
      ],
      example: `guthaben = 40\nwhile guthaben < 100:\n    guthaben = guthaben + 15\nprint(guthaben)`,
      pitfalls: [
        "Ohne Veränderung entsteht schnell eine Endlosschleife.",
        "Teste mit kleinen Startwerten, ob die Schleife endet."
      ],
      relatedLesson: "while",
      xp: 15,
      exercise: {
        question: "Welcher Baustein verhindert typischerweise eine Endlosschleife?",
        options: ["Eine Veränderung der Bedingungsvariable", "Mehr Leerzeilen", "Ein längerer Variablenname"],
        correct: 0,
        feedback: "Die Bedingung muss irgendwann falsch werden können."
      }
    },
    {
      id: "functions",
      title: "def und return",
      category: "Funktionen",
      syntax: "def name(parameter):",
      short: "Bündelt eine Teilaufgabe als wiederverwendbaren Baustein.",
      summary: "Funktionen machen Programme übersichtlicher und erlauben, Teilprobleme getrennt zu lösen.",
      details: [
        "def definiert eine Funktion. Erst ein Aufruf führt sie aus.",
        "Parameter sind Eingabewerte für die Funktion.",
        "return gibt ein Ergebnis an den Aufrufer zurück."
      ],
      example: `def flaeche(breite, hoehe):\n    return breite * hoehe\n\nwert = flaeche(4, 6)\nprint(wert)`,
      pitfalls: [
        "print() zeigt etwas an, return gibt einen Wert zurück.",
        "Der Funktionskörper muss eingerückt sein."
      ],
      relatedLesson: "funktionen",
      xp: 15,
      exercise: {
        question: "Was macht return in einer Funktion?",
        options: ["Es beendet PythonLab", "Es gibt einen Wert an den Aufrufer zurück", "Es druckt immer automatisch"],
        correct: 1,
        feedback: "return liefert ein Ergebnis, das weiterverwendet werden kann."
      }
    },
    {
      id: "lists",
      title: "Listen, len(), append()",
      category: "Datenstrukturen",
      syntax: "werte = [4, 7, 2]",
      short: "Speichert mehrere Werte in einer geordneten Sammlung.",
      summary: "Listen sind der erste Schritt zu Datenstrukturen: mehrere Werte werden gemeinsam gespeichert und durchlaufen.",
      details: [
        "Mit eckigen Klammern erzeugst du eine Liste.",
        "append() hängt einen Wert am Ende an.",
        "len() liefert die Anzahl der Elemente."
      ],
      example: `werte = [4, 7, 2]\nwerte.append(9)\nprint(len(werte))\nfor wert in werte:\n    print(wert)`,
      pitfalls: [
        "Listenindizes beginnen bei 0.",
        "append() verändert die Liste und gibt keinen neuen Listenwert zurück."
      ],
      relatedLesson: "listen",
      xp: 15,
      exercise: {
        question: "Was liefert len([4, 7, 2])?",
        options: ["2", "3", "13"],
        correct: 1,
        feedback: "len() zählt die Elemente, nicht deren Summe."
      }
    }
  ],

  structograms: {
    operators: [
      {
        title: "Deklaration und Initialisierung",
        syntax: "variable |als datentyp| = wert",
        example: "Deklaration und Initialisierung: punkte als Ganzzahl = 0",
        icon: "archive-restore"
      },
      {
        title: "Zuweisung",
        syntax: "element = wert",
        example: "Zuweisung: flaeche = breite * hoehe",
        icon: "arrow-right-left"
      },
      {
        title: "Einlesen",
        syntax: "variable |als datentyp|",
        example: "Deklaration und Einlesen: alter als Ganzzahl",
        icon: "keyboard"
      },
      {
        title: "Ausgabe",
        syntax: "Ausgabe: inhalt",
        example: "Ausgabe: \"Die Fläche beträgt \" + flaeche",
        icon: "monitor-up"
      },
      {
        title: "Verzweigung",
        syntax: "Wenn bedingung, dann ..., sonst ...",
        example: "alter >= 18",
        icon: "split"
      },
      {
        title: "Kopfgesteuerte Schleife",
        syntax: "Wiederhole solange bedingung",
        example: "Wiederhole solange guthaben < 100",
        icon: "refresh-cw"
      },
      {
        title: "Zählergesteuerte Schleife",
        syntax: "Zähle variable von start bis ende, Schrittweite ...",
        example: "Zähle i von 1 bis 10, Schrittweite 1",
        icon: "repeat-2"
      },
      {
        title: "Aufruf und Rückgabe",
        syntax: "Aufruf: funktion(parameter) / Rückgabe: wert",
        example: "Rückgabe: breite * hoehe",
        icon: "package-open"
      }
    ],

    examples: [
      {
        id: "sequence",
        title: "Sequenz",
        description: "Anweisungen werden von oben nach unten genau einmal ausgeführt.",
        diagram: [
          { type: "statement", text: "Deklaration und Einlesen: breite als Dezimalzahl" },
          { type: "statement", text: "Deklaration und Einlesen: hoehe als Dezimalzahl" },
          { type: "statement", text: "Zuweisung: flaeche = breite * hoehe" },
          { type: "statement", text: "Ausgabe: \"Fläche: \" + flaeche" }
        ],
        python: "breite = float(input(\"Breite: \"))\nhoehe = float(input(\"Höhe: \"))\nflaeche = breite * hoehe\nprint(\"Fläche:\", flaeche)"
      },
      {
        id: "alternative",
        title: "Zweiseitige Alternative",
        description: "Abhängig von einer Bedingung wird genau einer von zwei Wegen gewählt.",
        diagram: [
          { type: "statement", text: "Deklaration und Einlesen: alter als Ganzzahl" },
          {
            type: "if",
            condition: "alter >= 18",
            yes: [{ type: "statement", text: "Ausgabe: \"volljährig\"" }],
            no: [{ type: "statement", text: "Ausgabe: \"minderjährig\"" }]
          }
        ],
        python: "alter = int(input(\"Alter: \"))\nif alter >= 18:\n    print(\"volljährig\")\nelse:\n    print(\"minderjährig\")"
      },
      {
        id: "for-loop",
        title: "Zählergesteuerte Schleife",
        description: "Die Anzahl der Wiederholungen wird durch Zählvariable und Grenzen festgelegt.",
        diagram: [
          {
            type: "loop",
            loopType: "for",
            header: "Zähle i von 1 bis 5, Schrittweite 1",
            body: [{ type: "statement", text: "Ausgabe: i * 5" }]
          }
        ],
        python: "for i in range(1, 6):\n    print(i * 5)"
      },
      {
        id: "while-loop",
        title: "Kopfgesteuerte Schleife",
        description: "Vor jedem Durchlauf wird geprüft, ob die Bedingung weiterhin wahr ist.",
        diagram: [
          { type: "statement", text: "Deklaration und Initialisierung: guthaben = 40" },
          {
            type: "loop",
            loopType: "while",
            header: "Wiederhole solange guthaben < 100",
            body: [{ type: "statement", text: "Zuweisung: guthaben = guthaben + 15" }]
          },
          { type: "statement", text: "Ausgabe: guthaben" }
        ],
        python: "guthaben = 40\nwhile guthaben < 100:\n    guthaben = guthaben + 15\nprint(guthaben)"
      },
      {
        id: "nested",
        title: "Geschachtelte Alternative",
        description: "In einem Zweig liegt eine weitere Entscheidung. So entstehen mehr als zwei Fälle.",
        diagram: [
          { type: "statement", text: "Deklaration und Einlesen: punkte als Ganzzahl" },
          {
            type: "if",
            condition: "punkte >= 50",
            yes: [
              {
                type: "if",
                condition: "punkte >= 80",
                yes: [{ type: "statement", text: "Ausgabe: \"sehr gut bestanden\"" }],
                no: [{ type: "statement", text: "Ausgabe: \"bestanden\"" }]
              }
            ],
            no: [{ type: "statement", text: "Ausgabe: \"nicht bestanden\"" }]
          }
        ],
        python: "punkte = int(input(\"Punkte: \"))\nif punkte >= 50:\n    if punkte >= 80:\n        print(\"sehr gut bestanden\")\n    else:\n        print(\"bestanden\")\nelse:\n    print(\"nicht bestanden\")"
      }
    ],

    exercises: [
      {
        id: "stg-sequenz",
        number: "S1",
        title: "Flächenberechnung ordnen",
        description: "Bringe Einlesen, Berechnung und Ausgabe in eine sinnvolle Sequenz.",
        difficulty: "easy",
        xp: 30,
        type: "order",
        instructions: [
          "Lies zuerst Breite und Höhe ein.",
          "Berechne danach die Fläche.",
          "Gib das Ergebnis zum Schluss aus."
        ],
        blocks: [
          { id: "height", text: "Deklaration und Einlesen: hoehe als Dezimalzahl" },
          { id: "output", text: "Ausgabe: \"Fläche: \" + flaeche" },
          { id: "width", text: "Deklaration und Einlesen: breite als Dezimalzahl" },
          { id: "calculate", text: "Zuweisung: flaeche = breite * hoehe" }
        ],
        expected: ["width", "height", "calculate", "output"]
      },
      {
        id: "stg-alternative",
        number: "S2",
        title: "Eintritt entscheiden",
        description: "Vervollständige eine zweiseitige Alternative mit passenden Operatoren.",
        difficulty: "easy",
        xp: 35,
        type: "slots",
        instructions: [
          "Ab 18 Jahren gilt eine Person als volljährig.",
          "Der J-Zweig wird bei einer wahren Bedingung ausgeführt.",
          "Der N-Zweig wird bei einer falschen Bedingung ausgeführt."
        ],
        slots: {
          condition: {
            label: "Bedingung wählen",
            options: ["alter = 18", "alter >= 18", "alter < 18"],
            answer: "alter >= 18"
          },
          yes: {
            label: "J-Zweig wählen",
            options: ["Ausgabe: \"minderjährig\"", "Ausgabe: \"volljährig\"", "Zuweisung: alter = 18"],
            answer: "Ausgabe: \"volljährig\""
          },
          no: {
            label: "N-Zweig wählen",
            options: ["Ausgabe: \"minderjährig\"", "Ausgabe: \"volljährig\"", "Einlesen: alter"],
            answer: "Ausgabe: \"minderjährig\""
          }
        },
        diagram: [
          { type: "statement", text: "Deklaration und Einlesen: alter als Ganzzahl" },
          {
            type: "if",
            condition: { slot: "condition" },
            yes: [{ type: "statement", text: { slot: "yes" } }],
            no: [{ type: "statement", text: { slot: "no" } }]
          }
        ]
      },
      {
        id: "stg-for",
        number: "S3",
        title: "Fünferreihe wiederholen",
        description: "Plane eine zählergesteuerte Schleife für zehn Ausgaben.",
        difficulty: "medium",
        xp: 40,
        type: "slots",
        instructions: [
          "Die Zahlen 1 bis einschließlich 10 werden benötigt.",
          "In jedem Durchlauf wird das Fünffache der Zählvariable ausgegeben."
        ],
        slots: {
          header: {
            label: "Schleifenkopf wählen",
            options: [
              "Zähle i von 1 bis 10, Schrittweite 1",
              "Zähle i von 1 bis 5, Schrittweite 10",
              "Wiederhole solange i == 10"
            ],
            answer: "Zähle i von 1 bis 10, Schrittweite 1"
          },
          body: {
            label: "Schleifenkörper wählen",
            options: ["Ausgabe: i + 5", "Ausgabe: i * 5", "Zuweisung: i = 5"],
            answer: "Ausgabe: i * 5"
          }
        },
        diagram: [
          {
            type: "loop",
            loopType: "for",
            header: { slot: "header" },
            body: [{ type: "statement", text: { slot: "body" } }]
          }
        ]
      },
      {
        id: "stg-while",
        number: "S4",
        title: "Sparziel erreichen",
        description: "Vervollständige eine kopfgesteuerte Schleife mit sicherem Ende.",
        difficulty: "medium",
        xp: 45,
        type: "slots",
        instructions: [
          "Das Guthaben startet bei 40 Euro.",
          "Jeden Monat kommen 15 Euro hinzu.",
          "Die Wiederholung endet, sobald mindestens 130 Euro erreicht sind."
        ],
        slots: {
          condition: {
            label: "Bedingung wählen",
            options: [
              "Wiederhole solange guthaben < 130",
              "Wiederhole solange guthaben >= 130",
              "Wiederhole solange guthaben == 40"
            ],
            answer: "Wiederhole solange guthaben < 130"
          },
          body: {
            label: "Veränderung wählen",
            options: [
              "Zuweisung: guthaben = guthaben - 15",
              "Zuweisung: guthaben = 15",
              "Zuweisung: guthaben = guthaben + 15"
            ],
            answer: "Zuweisung: guthaben = guthaben + 15"
          }
        },
        diagram: [
          { type: "statement", text: "Deklaration und Initialisierung: guthaben = 40" },
          {
            type: "loop",
            loopType: "while",
            header: { slot: "condition" },
            body: [{ type: "statement", text: { slot: "body" } }]
          },
          { type: "statement", text: "Ausgabe: guthaben" }
        ]
      },
      {
        id: "stg-nested",
        number: "S5",
        title: "Ergebnis abgestuft ausgeben",
        description: "Baue eine geschachtelte Alternative für drei mögliche Ergebnisse.",
        difficulty: "plus",
        xp: 50,
        type: "slots",
        instructions: [
          "Unter 50 Punkten lautet die Ausgabe nicht bestanden.",
          "Ab 50 Punkten ist die Prüfung bestanden.",
          "Ab 80 Punkten lautet die genauere Ausgabe sehr gut."
        ],
        slots: {
          outerCondition: {
            label: "Äußere Bedingung wählen",
            options: ["punkte >= 50", "punkte >= 80", "punkte < 50"],
            answer: "punkte >= 50"
          },
          innerCondition: {
            label: "Innere Bedingung wählen",
            options: ["punkte == 50", "punkte >= 80", "punkte < 80"],
            answer: "punkte >= 80"
          },
          excellent: {
            label: "J-Zweig innen wählen",
            prefix: "Ausgabe:",
            options: [
              "\"nicht bestanden\"",
              "\"bestanden\"",
              "\"sehr gut\""
            ],
            answer: "\"sehr gut\""
          },
          passed: {
            label: "N-Zweig innen wählen",
            prefix: "Ausgabe:",
            options: [
              "\"bestanden\"",
              "\"nicht bestanden\"",
              "\"sehr gut\""
            ],
            answer: "\"bestanden\""
          },
          failed: {
            label: "N-Zweig außen wählen",
            prefix: "Ausgabe:",
            options: [
              "\"bestanden\"",
              "\"nicht bestanden\"",
              "\"sehr gut\""
            ],
            answer: "\"nicht bestanden\""
          }
        },
        diagram: [
          { type: "statement", text: "Deklaration und Einlesen: punkte als Ganzzahl" },
          {
            type: "if",
            condition: { slot: "outerCondition" },
            yes: [
              {
                type: "if",
                condition: { slot: "innerCondition" },
                yes: [{ type: "statement", text: { slot: "excellent" } }],
                no: [{ type: "statement", text: { slot: "passed" } }]
              }
            ],
            no: [{ type: "statement", text: { slot: "failed" } }]
          }
        ]
      }
    ]
  },

  achievements: [
    {
      id: "first-step",
      title: "Erster Schritt",
      description: "Schließe deine erste Lektion ab.",
      icon: "footprints",
      condition: { type: "lessons", value: 1 }
    },
    {
      id: "first-code",
      title: "Code läuft",
      description: "Löse deine erste Programmieraufgabe.",
      icon: "play",
      condition: { type: "exercises", value: 1 }
    },
    {
      id: "foundation",
      title: "Stabiles Fundament",
      description: "Schließe alle vier Einstiegslektionen ab.",
      icon: "blocks",
      condition: { type: "module", value: "start" }
    },
    {
      id: "decision-maker",
      title: "Entscheider",
      description: "Schließe das Modul Entscheidungen ab.",
      icon: "split",
      condition: { type: "module", value: "entscheidungen" }
    },
    {
      id: "loop-pro",
      title: "In der Schleife",
      description: "Löse je eine for- und while-Aufgabe.",
      icon: "repeat-2",
      condition: { type: "exerciseSet", value: ["einmaleins", "sparziel"] }
    },
    {
      id: "builder",
      title: "Bausteinbauer",
      description: "Schließe die Funktionslektion und ihre Aufgabe ab.",
      icon: "wrench",
      condition: { type: "lessonExercise", value: "funktionen" }
    },
    {
      id: "collector",
      title: "Sammler",
      description: "Erreiche mindestens 300 XP.",
      icon: "gem",
      condition: { type: "xp", value: 300 }
    },
    {
      id: "command-starter",
      title: "Befehlskenner",
      description: "Löse deine erste Befehls-Miniaufgabe.",
      icon: "braces",
      condition: { type: "commands", value: 1 }
    },
    {
      id: "command-library",
      title: "Syntaxbibliothek",
      description: "Löse alle Befehls-Miniaufgaben.",
      icon: "library",
      condition: { type: "allCommands" }
    },
    {
      id: "structure-reader",
      title: "Strukturleser",
      description: "Löse deine erste Struktogramm-Aufgabe.",
      icon: "workflow",
      condition: { type: "structograms", value: 1 }
    },
    {
      id: "structure-planner",
      title: "Ablaufplaner",
      description: "Löse alle fünf Struktogramm-Aufgaben.",
      icon: "network",
      condition: { type: "allStructograms" }
    },
    {
      id: "workshop-master",
      title: "Werkstattmeister",
      description: "Schließe alle Lektionen und Übungen ab.",
      icon: "award",
      condition: { type: "all" }
    }
  ],

  tools: [
    {
      title: "Informatik-Stick",
      description: "Der einfachste Start am Schul-PC: Der Informatik-Stick bündelt die benötigten, kostenlosen und schulisch freigegebenen Programme an einem Ort.",
      note: "Download, Dokumentation, Neuigkeiten und Versionshistorie liegen auf der offiziellen Schultasche-BW-Seite.",
      icon: "usb",
      url: "https://schultasche-bw.de/",
      linkLabel: "Download und Doku"
    },
    {
      title: "Thonny",
      description: "Einsteigerfreundliche Python-Entwicklungsumgebung zum Schreiben, Speichern, Starten und schrittweisen Untersuchen eigener Programme.",
      note: "Auf den Schul-PCs installiert und zusätzlich über den Informatik-Stick verfügbar.",
      icon: "terminal",
      url: "https://thonny.org/"
    },
    {
      title: "Struktogrammer Web",
      description: "Browserbasierter Editor zum freien Erstellen, Bearbeiten, Speichern und Exportieren von Nassi-Shneiderman-Struktogrammen.",
      note: "Als Schwesterprojekt eingebunden und über das Symbol rechts oben direkt erreichbar.",
      icon: "workflow",
      url: "https://jakobsawazki.github.io/struktogrammer-web/"
    },
    {
      title: "hus Struktogrammer",
      description: "Java-Anwendung zum Erstellen und Bearbeiten umfangreicher Struktogramme nach den im Unterricht verwendeten Konventionen.",
      note: "Installiert, über den Informatik-Stick startbar und als Java-Datei in den Unterrichtsmaterialien verfügbar.",
      icon: "workflow",
      url: "https://struktogrammer.ch/Web_files/page1_JavaVersion.html"
    }
  ],

  reference: [
    {
      title: "Ausgabe und Variablen",
      description: "Werte speichern, verändern und gemeinsam mit Text ausgeben.",
      code: `name = "Mia"\npunkte = 25\npunkte = punkte + 10\nprint(name, punkte)`
    },
    {
      title: "Eingabe und Umwandlung",
      description: "input liefert Text. int und float machen daraus Zahlen.",
      code: `alter = int(input("Alter: "))\npreis = float(input("Preis: "))`
    },
    {
      title: "Vergleiche",
      description: "Vergleiche liefern True oder False.",
      code: `==  gleich\n!=  ungleich\n<   kleiner\n<=  kleiner gleich\n>   größer\n>=  größer gleich`
    },
    {
      title: "Verzweigung",
      description: "Von oben nach unten wird genau der erste passende Zweig ausgeführt.",
      code: `if bedingung:\n    ...\nelif andere_bedingung:\n    ...\nelse:\n    ...`
    },
    {
      title: "for-Schleife",
      description: "Für eine bekannte Anzahl von Wiederholungen.",
      code: `for i in range(1, 6):\n    print(i)`
    },
    {
      title: "while-Schleife",
      description: "Wiederholt, solange eine Bedingung wahr ist.",
      code: `wert = 1\nwhile wert < 100:\n    wert = wert * 2`
    },
    {
      title: "Funktion",
      description: "Parameter hinein, Rückgabewert heraus.",
      code: `def flaeche(breite, hoehe):\n    return breite * hoehe\n\nwert = flaeche(4, 6)`
    },
    {
      title: "Liste",
      description: "Mehrere Werte speichern und durchlaufen.",
      code: `werte = [4, 7, 2]\nwerte.append(9)\nfor wert in werte:\n    print(wert)`
    },
    {
      title: "Fehlersuche",
      description: "Fehlermeldung lesen, Zeile prüfen, kleine Testwerte verwenden.",
      code: `print("Zwischenwert:", wert)\nprint("Typ:", type(wert))`
    }
  ]
};
