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
      title: "Funktionen bauen",
      description: "Teilaufgaben auslagern, Werte übergeben und Ergebnisse zurückgeben.",
      lessonIds: ["funktionen", "funktionen-parameter", "funktionen-rueckgabe"]
    },
    {
      id: "plus",
      number: "05",
      title: "Python Plus",
      description: "Listen vertiefen, Texte bearbeiten und Fehler verstehen.",
      lessonIds: ["listen", "listen-methoden", "strings", "debugging"]
    }
  ],

  competencies: [
    {
      id: "planning",
      number: "01",
      title: "Abläufe planen und darstellen",
      description: "Du erkennst die Grundbausteine eines Algorithmus und kannst sie als Struktogramm lesen.",
      items: [
        {
          id: "sequence-plan",
          title: "Ich kann einen Ablauf in die richtige Reihenfolge bringen.",
          lessonIds: ["sequenz"],
          exerciseIds: ["hallo-python"],
          structogramIds: ["stg-sequenz"],
          route: "lesson/sequenz"
        },
        {
          id: "for-plan",
          title: "Ich kann eine Zählerschleife erkennen und als Struktogramm darstellen.",
          lessonIds: ["for"],
          structogramIds: ["stg-for"],
          route: "structograms"
        },
        {
          id: "while-plan",
          title: "Ich kann eine kopfgesteuerte Schleife planen und ihre Bedingung erklären.",
          lessonIds: ["while"],
          structogramIds: ["stg-while"],
          route: "structograms"
        },
        {
          id: "decision-plan",
          title: "Ich kann Entscheidungen mit Ja- und Nein-Zweig darstellen.",
          lessonIds: ["if", "elif", "logik"],
          structogramIds: ["stg-alternative", "stg-nested"],
          route: "structograms"
        }
      ]
    },
    {
      id: "python-basics",
      number: "02",
      title: "Python-Grundlagen anwenden",
      description: "Du entwickelst Programme mit Ausgaben, Variablen, Berechnungen, Eingaben und Funktionen.",
      items: [
        {
          id: "output",
          title: "Ich kann Texte und berechnete Werte mit print() ausgeben.",
          lessonIds: ["sequenz"],
          exerciseIds: ["hallo-python"],
          commandIds: ["print"],
          route: "lesson/sequenz"
        },
        {
          id: "variables",
          title: "Ich kann passende Variablen anlegen, verändern und auslesen.",
          lessonIds: ["variablen"],
          exerciseIds: ["punkte-variable"],
          route: "lesson/variablen"
        },
        {
          id: "calculations",
          title: "Ich kann Rechenoperatoren in einem Python-Programm verwenden.",
          lessonIds: ["rechnen"],
          exerciseIds: ["rechteck-flaeche"],
          commandIds: ["modulo", "round"],
          route: "lesson/rechnen"
        },
        {
          id: "inputs",
          title: "Ich kann Eingaben einlesen und in Zahlen umwandeln.",
          lessonIds: ["eingaben"],
          exerciseIds: ["temperatur"],
          commandIds: ["input", "type-conversion"],
          route: "lesson/eingaben"
        },
        {
          id: "functions",
          title: "Ich kann Funktionen definieren, Parameter übergeben und Rückgabewerte nutzen.",
          lessonIds: ["funktionen", "funktionen-parameter", "funktionen-rueckgabe"],
          exerciseIds: ["pausensignal-funktion", "begruessung-parameter", "fahrtkosten-funktion"],
          commandIds: ["functions"],
          route: "lesson/funktionen"
        }
      ]
    },
    {
      id: "control",
      number: "03",
      title: "Kontrollstrukturen entwickeln",
      description: "Du setzt Alternativen und Wiederholungen passend zur Problemstellung ein.",
      items: [
        {
          id: "one-sided-if",
          title: "Ich kann eine einseitige Verzweigung mit einer passenden Bedingung entwickeln.",
          lessonIds: ["if"],
          exerciseIds: ["rabatt-if"],
          commandIds: ["comparisons"],
          route: "lesson/if"
        },
        {
          id: "two-sided-if",
          title: "Ich kann zwischen zwei oder mehreren Fällen unterscheiden.",
          lessonIds: ["elif"],
          exerciseIds: ["notenstufe", "preisangebot", "mietzuschuss"],
          commandIds: ["if-elif-else"],
          structogramIds: ["stg-alternative", "stg-nested"],
          route: "lesson/elif"
        },
        {
          id: "logical-conditions",
          title: "Ich kann Bedingungen mit and, or und not sinnvoll verknüpfen.",
          lessonIds: ["logik"],
          exerciseIds: ["zugang-logik"],
          commandIds: ["logic"],
          route: "lesson/logik"
        },
        {
          id: "for-loops",
          title: "Ich kann eine for-Schleife für eine bekannte Anzahl von Wiederholungen einsetzen.",
          lessonIds: ["for"],
          exerciseIds: ["einmaleins", "gerade-summe", "sternentreppe", "taschengeld-tabelle"],
          commandIds: ["for-range", "range-steps"],
          structogramIds: ["stg-for"],
          route: "lesson/for"
        },
        {
          id: "while-loops",
          title: "Ich kann mit while wiederholen, bis ein Ziel erreicht ist.",
          lessonIds: ["while"],
          exerciseIds: ["sparziel", "countdown", "fischteich"],
          commandIds: ["while"],
          structogramIds: ["stg-while"],
          route: "lesson/while"
        }
      ]
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
      xp: 60,
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
      xp: 75,
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
      xp: 75,
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
      xp: 90,
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
          code: `name = input("Wie heißt du? ")\nalter = int(input("Wie alt bist du? "))\nprint("Hallo", name)\nprint("Nächstes Jahr bist du", alter + 1)`,
          exampleInput: "Mia\n16"
        },
        {
          title: "Ganzzahl oder Dezimalzahl?",
          body: [
            "Nutze `int()` für ganze Stückzahlen oder Jahre. Nutze `float()` für Preise, Längen oder Messwerte mit Nachkommastellen.",
            "Wähle die Umwandlung passend zum fachlichen Inhalt, nicht nur passend zu einem einzelnen Beispiel."
          ],
          code: `anzahl = int(input("Anzahl: "))\npreis = float(input("Preis pro Stück: "))\ngesamt = anzahl * preis\nprint("Gesamt:", gesamt, "Euro")`,
          exampleInput: "4\n2.5",
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
      xp: 90,
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
      xp: 105,
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
      xp: 105,
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
      xp: 120,
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
      xp: 135,
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
      title: "Funktionen ohne Parameter",
      subtitle: "Ein benannter Programmbaustein kann an beliebigen Stellen aufgerufen werden.",
      duration: 22,
      xp: 150,
      difficulty: "easy",
      objectives: [
        "eine Funktion mit def definieren und aufrufen",
        "Funktionsdefinition und Hauptprogramm unterscheiden",
        "Einrückung, Klammern und Doppelpunkt sicher setzen"
      ],
      sections: [
        {
          title: "Eine Teilaufgabe bekommt einen Namen",
          body: [
            "Eine Funktion ist ein ausgelagerter Programmteil für eine klar benannte Aufgabe. Statt dieselben Anweisungen mehrfach zu schreiben, definierst du sie einmal und rufst sie danach beliebig oft auf.",
            "Das macht längere Programme übersichtlicher: Im Hauptprogramm ist sofort zu erkennen, welche Teilaufgabe gerade ausgeführt wird."
          ],
          code: `def zeige_startmeldung():\n    print("PythonLab startet")\n    print("Viel Erfolg!")\n\nzeige_startmeldung()\nzeige_startmeldung()`
        },
        {
          title: "Definition und Aufruf sind verschieden",
          body: [
            "Die Zeile mit `def` legt fest, was die Funktion später tun soll. Python merkt sich diese Definition, führt den eingerückten Funktionskörper aber noch nicht aus.",
            "Erst der Aufruf `zeige_startmeldung()` springt in die Funktion. Nach der letzten eingerückten Anweisung geht es im Hauptprogramm direkt hinter dem Aufruf weiter."
          ],
          code: `def signal():\n    print("Start")\n\nprint("A")\nsignal()\nprint("B")`,
          tip: "Verfolge den Ablauf mit dem Finger: Definition merken, A ausgeben, Funktion aufrufen, Start ausgeben, B ausgeben."
        },
        {
          title: "Die Syntax im Blick",
          body: [
            "Nach `def` folgen ein sinnvoller Funktionsname, leere runde Klammern und ein Doppelpunkt. Die zugehörigen Anweisungen stehen eingerückt darunter.",
            "Beim Aufruf schreibst du nur den Namen und die Klammern. `def` und Doppelpunkt gehören nicht zum Aufruf."
          ],
          code: `def zeige_hinweis():\n    print("Bitte Eingaben prüfen")\n\nzeige_hinweis()`,
          warning: "Fehlt die Einrückung, der Doppelpunkt oder eines der Klammerpaare, kann Python die Funktion nicht richtig verarbeiten."
        },
        {
          title: "Gute Namen und eine klare Reihenfolge",
          body: [
            "Funktionsnamen sollten die Aufgabe als Tätigkeit beschreiben, zum Beispiel `zeige_menue()`, `drucke_ticket()` oder `berechne_preis()`. In Python werden mehrere Wörter üblicherweise mit Unterstrichen verbunden.",
            "Definiere eine Funktion, bevor sie im Programm aufgerufen wird. Python arbeitet von oben nach unten und muss die Definition beim Aufruf bereits kennen."
          ],
          code: `def drucke_trennlinie():\n    print("-" * 24)\n\nprint("Tagesübersicht")\ndrucke_trennlinie()\nprint("Drei Aufgaben sind offen")`,
          tip: "Ein guter Funktionsname lässt den Aufruf fast wie einen deutschen Arbeitsauftrag lesen."
        }
      ],
      quiz: {
        question: "Was geschieht, wenn eine Funktion nur definiert, aber nirgends aufgerufen wird?",
        options: [
          "Der Funktionskörper wird einmal ausgeführt",
          "Der Funktionskörper wird nicht ausgeführt",
          "Python führt die Funktion automatisch am Programmende aus"
        ],
        correct: 1,
        explanation: "Die Definition legt die Funktion nur an. Erst ein Aufruf mit ihrem Namen und den Klammern führt den Funktionskörper aus."
      },
      practiceId: "pausensignal-funktion"
    },
    {
      id: "funktionen-parameter",
      module: "bausteine",
      index: "11",
      title: "Funktionen mit Parametern",
      subtitle: "Parameter machen aus einem festen Baustein ein Werkzeug für unterschiedliche Werte.",
      duration: 25,
      xp: 135,
      difficulty: "medium",
      objectives: [
        "Parameter und Argumente voneinander unterscheiden",
        "einer Funktion einen oder mehrere Werte übergeben",
        "Reihenfolge und Verwendung der Parameter nachvollziehen"
      ],
      sections: [
        {
          title: "Platzhalter in der Definition",
          body: [
            "Ein Parameter ist ein Platzhalter in der Funktionsdefinition. Die Funktion kann ihn wie eine Variable verwenden, obwohl der konkrete Wert erst beim Aufruf feststeht.",
            "So erledigt derselbe Programmbaustein eine Aufgabe mit immer neuen Daten."
          ],
          code: `def begruesse(name):\n    print("Hallo", name)\n\nbegruesse("Mia")\nbegruesse("Noah")`
        },
        {
          title: "Parameter und Argument",
          body: [
            "In `def begruesse(name):` heißt `name` Parameter. Beim Aufruf `begruesse(\"Mia\")` ist `\"Mia\"` das konkrete Argument.",
            "Bei jedem Aufruf erhält der Parameter für die Dauer dieses Aufrufs den übergebenen Wert. Danach kann dieselbe Funktion mit einem anderen Argument erneut starten."
          ],
          code: `def zeige_preis(preis):\n    print("Preis:", preis, "Euro")\n\nzeige_preis(4.5)\nzeige_preis(7.0)`,
          tip: "Merksatz: Der Parameter steht in der Definition, das Argument steht im Aufruf."
        },
        {
          title: "Mehrere Werte übergeben",
          body: [
            "Mehrere Parameter werden durch Kommas getrennt. Beim normalen Aufruf zählt ihre Reihenfolge: Das erste Argument gehört zum ersten Parameter, das zweite zum zweiten Parameter.",
            "Wähle Namen, die die Bedeutung der Werte deutlich machen. Dann lässt sich der Funktionsaufruf leichter kontrollieren."
          ],
          code: `def zeige_strecke(start, ziel):\n    print("Von", start, "nach", ziel)\n\nzeige_strecke("Ulm", "Freiburg")`,
          warning: "Anzahl und Reihenfolge der Argumente müssen zur Definition passen. Sonst erhältst du einen Fehler oder die Funktion verarbeitet vertauschte Werte."
        },
        {
          title: "Parameter gelten innerhalb der Funktion",
          body: [
            "Parameter stehen der Funktion während eines Aufrufs als eigene Namen zur Verfügung. Änderungen an einer einfachen Zahl oder Zeichenkette innerhalb der Funktion verändern die ursprüngliche Variable im Hauptprogramm nicht.",
            "Das Präfix `p_` kann Parameter sichtbar kennzeichnen, ist in Python aber keine Pflicht. Wichtiger sind verständliche Namen und eine einheitliche Schreibweise."
          ],
          code: `def zeige_doppelten_wert(zahl):\n    zahl = zahl * 2\n    print("In der Funktion:", zahl)\n\nwert = 7\nzeige_doppelten_wert(wert)\nprint("Im Hauptprogramm:", wert)`,
          tip: "Im Beispiel ist der Parameter zahl nur innerhalb der Funktion 14. Die Variable wert bleibt außerhalb bei 7."
        }
      ],
      quiz: {
        question: "Was sind in rechteck(4, 6) die Werte 4 und 6?",
        options: ["Funktionsnamen", "Argumente", "Rückgabewerte"],
        correct: 1,
        explanation: "Die konkreten Werte beim Aufruf heißen Argumente. In der Definition werden sie von Parametern entgegengenommen."
      },
      practiceId: "begruessung-parameter"
    },
    {
      id: "funktionen-rueckgabe",
      module: "bausteine",
      index: "12",
      title: "Funktionen mit Rückgabewert",
      subtitle: "Mit return liefert eine Funktion ein Ergebnis an die aufrufende Stelle zurück.",
      duration: 28,
      xp: 150,
      difficulty: "medium",
      objectives: [
        "ein berechnetes Ergebnis mit return zurückgeben",
        "einen Rückgabewert speichern und weiterverwenden",
        "Ausgabe mit print() und Rückgabe mit return unterscheiden"
      ],
      sections: [
        {
          title: "Ein Ergebnis kommt zurück",
          body: [
            "Parameter bringen Werte in eine Funktion hinein. `return` transportiert ein Ergebnis zurück an die Stelle, an der die Funktion aufgerufen wurde.",
            "Der Aufruf verhält sich dann wie ein Wert. Du kannst ihn einer Variablen zuweisen, direkt ausgeben oder in einer weiteren Rechnung verwenden."
          ],
          code: `def quadrat(zahl):\n    ergebnis = zahl * zahl\n    return ergebnis\n\nquadrat_von_fuenf = quadrat(5)\nprint(quadrat_von_fuenf)`
        },
        {
          title: "print() oder return?",
          body: [
            "`print()` zeigt etwas auf dem Bildschirm. Das ist eine Ausgabe, aber noch kein Ergebnis, mit dem das Hauptprogramm weiterrechnen kann.",
            "`return` gibt einen Wert an den Aufruf zurück. Über die sichtbare Ausgabe entscheidet anschließend das Hauptprogramm. Dadurch bleibt die Funktion vielseitig."
          ],
          code: `def netto(brutto, rabatt):\n    return brutto * (1 - rabatt)\n\npreis = netto(80, 0.25)\nprint("Endpreis:", preis)`,
          tip: "Frage dich: Soll die Funktion nur etwas anzeigen oder soll das Ergebnis später noch gebraucht werden? Für Berechnungen ist return meist die bessere Wahl."
        },
        {
          title: "Der Weg des Wertes",
          body: [
            "Beim Aufruf werden zuerst die Argumente an die Parameter übergeben. Die Funktion berechnet daraus ihr Ergebnis. `return` beendet den Aufruf und setzt das Ergebnis an seiner Stelle ein.",
            "Im Beispiel wird der Rückgabewert zuerst in `kosten` gespeichert und danach ausgegeben. Mit anderen Argumenten kann dieselbe Funktion weitere Fahrten berechnen."
          ],
          code: `def fahrtkosten(strecke, verbrauch, literpreis):\n    liter = strecke * verbrauch / 100\n    return liter * literpreis\n\nkosten = fahrtkosten(250, 6.5, 1.80)\nprint("Fahrtkosten:", kosten, "Euro")`,
          warning: "Sobald Python return ausführt, endet der aktuelle Funktionsaufruf. Anweisungen darunter werden in diesem Durchlauf nicht mehr erreicht."
        },
        {
          title: "Wenn return fehlt",
          body: [
            "Eine Python-Funktion ohne ausdrückliches `return` liefert automatisch den besonderen Wert `None`. Das bedeutet: Es wurde kein verwendbares Ergebnis zurückgegeben.",
            "Darum kann eine Funktion zwar etwas mit `print()` anzeigen, aber das Hauptprogramm erhält dadurch noch keinen berechneten Wert."
          ],
          code: `def nur_ausgeben(text):\n    print(text)\n\nrueckgabe = nur_ausgeben("Hallo aus der Funktion")\nprint("Rückgabewert:", rueckgabe)`,
          tip: "Führe das Beispiel aus und beobachte: Die erste Zeile ist die Ausgabe der Funktion, danach wird None als fehlender Rückgabewert sichtbar."
        }
      ],
      quiz: {
        question: "Welchen Wert erhält ergebnis nach ergebnis = doppelt(7), wenn doppelt den Ausdruck zahl * 2 zurückgibt?",
        options: ["7", "14", "Keinen Wert"],
        correct: 1,
        explanation: "Beim Aufruf ist zahl gleich 7. return gibt 7 * 2 zurück, deshalb wird 14 in ergebnis gespeichert."
      },
      practiceId: "fahrtkosten-funktion"
    },
    {
      id: "listen",
      module: "plus",
      index: "13",
      title: "Listen als Sammlung",
      subtitle: "Listen speichern mehrere zusammengehörige Werte in einer geordneten Sammlung.",
      duration: 24,
      xp: 150,
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
      id: "listen-methoden",
      module: "plus",
      index: "14",
      title: "Listen erweitern",
      subtitle: "Listen lassen sich gezielt füllen, verkleinern und durchsuchen.",
      duration: 18,
      xp: 105,
      difficulty: "medium",
      objectives: [
        "Werte mit append() und insert() hinzufügen",
        "Mit pop() und remove() Werte entfernen",
        "Mit in prüfen, ob ein Wert enthalten ist"
      ],
      sections: [
        {
          title: "Werte hinzufügen",
          body: [
            "`append()` hängt einen Wert ans Ende. `insert(position, wert)` setzt ihn an eine bestimmte Stelle.",
            "Beide Methoden verändern die Liste direkt. Du musst das Ergebnis nicht erneut zuweisen."
          ],
          code: `aufgaben = ["lesen", "rechnen"]\naufgaben.append("üben")\naufgaben.insert(0, "ankommen")\nprint(aufgaben)`,
          tip: "Schreibe nicht aufgaben = aufgaben.append(\"üben\"). append() gibt None zurück und würde die Liste löschen."
        },
        {
          title: "Werte entfernen",
          body: [
            "`pop()` entfernt das letzte Element und gibt es zurück. `pop(0)` nimmt das erste.",
            "`remove(wert)` löscht das erste Vorkommen eines bestimmten Wertes."
          ],
          code: `warteschlange = ["Mia", "Noah", "Sara"]\nnaechste = warteschlange.pop(0)\nprint("dran:", naechste)\nprint("warten noch:", warteschlange)`
        },
        {
          title: "Suchen und zählen",
          body: [
            "Mit `wert in liste` prüfst du, ob ein Wert vorhanden ist. Das Ergebnis ist True oder False.",
            "`len(liste)` liefert die Anzahl der Elemente, `liste.count(wert)` zählt, wie oft ein Wert vorkommt."
          ],
          code: `farben = ["rot", "blau", "rot", "grün"]\nprint("blau" in farben)\nprint(len(farben))\nprint(farben.count("rot"))`,
          warning: "remove() meldet einen Fehler, wenn der gesuchte Wert nicht in der Liste ist. Prüfe im Zweifel vorher mit in."
        }
      ],
      quiz: {
        question: "Was liefert [\"a\", \"b\", \"a\"].count(\"a\")?",
        options: ["1", "2", "3"],
        correct: 1,
        explanation: "count() zählt, wie oft der Wert vorkommt – hier zweimal."
      },
      practiceId: "einkaufsliste"
    },
    {
      id: "strings",
      module: "plus",
      index: "15",
      title: "Text bearbeiten",
      subtitle: "Strings lassen sich zusammensetzen, umformen und Zeichen für Zeichen untersuchen.",
      duration: 20,
      xp: 105,
      difficulty: "medium",
      objectives: [
        "Werte mit f-Strings übersichtlich in Text einsetzen",
        "String-Methoden wie upper(), lower() und strip() anwenden",
        "Einzelne Zeichen und Teilstücke eines Strings auslesen"
      ],
      sections: [
        {
          title: "f-Strings: Werte sauber einbauen",
          body: [
            "Ein f-String beginnt mit einem `f` vor dem Anführungszeichen. In geschweiften Klammern stehen Variablen oder Ausdrücke.",
            "So entstehen lesbare Ausgaben, ohne viele Kommas oder Plus-Zeichen."
          ],
          code: `name = "Mia"\npunkte = 42\nprint(f"{name} hat {punkte} Punkte.")\nprint(f"Mit Bonus: {punkte + 8}")`,
          tip: "Mit f\"{preis:.2f}\" zeigst du genau zwei Nachkommastellen – ideal für Geldbeträge."
        },
        {
          title: "Methoden formen Text um",
          body: [
            "`upper()` schreibt alles groß, `lower()` alles klein. `strip()` entfernt Leerzeichen am Rand.",
            "Solche Umformungen helfen, Eingaben einheitlich zu vergleichen."
          ],
          code: `eingabe = "  Ja  "\nantwort = eingabe.strip().lower()\nprint(antwort == "ja")\nprint("python".upper())`,
          warning: "Die Methoden ändern den Originaltext nicht. Speichere das Ergebnis: text = text.upper()."
        },
        {
          title: "Zeichen und Teilstücke",
          body: [
            "Jedes Zeichen hat eine Position. `wort[0]` ist das erste Zeichen, `wort[-1]` das letzte.",
            "Mit `wort[0:3]` schneidest du ein Teilstück heraus; die zweite Zahl ist nicht enthalten."
          ],
          code: `wort = "Python"\nprint(wort[0])\nprint(wort[-1])\nprint(wort[0:3])\nprint(len(wort))`
        }
      ],
      quiz: {
        question: "Welche Ausgabe erzeugt print(f\"Summe: {3 + 4}\")?",
        options: ["Summe: {3 + 4}", "Summe: 7", "Summe: 34"],
        correct: 1,
        explanation: "Im f-String wird der Ausdruck in den Klammern berechnet und eingesetzt."
      },
      practiceId: "namensschild"
    },
    {
      id: "debugging",
      module: "plus",
      index: "16",
      title: "Fehler finden und Lösungen planen",
      subtitle: "Fehler sind Hinweise. Mit einer festen Strategie werden sie beherrschbar.",
      duration: 22,
      xp: 150,
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
      xp: 75,
      instructions: [
        "Gib zuerst den Text PythonLab aus.",
        "Gib danach den Text Ich übe selbst! aus.",
        "Gib in der dritten Zeile das Ergebnis von 6 + 4 aus."
      ],
      hints: [
        "Nutze für jede geforderte Ausgabe einen eigenen print()-Aufruf.",
        "Text braucht Anführungszeichen; die Rechnung 6 + 4 dagegen nicht.",
        "Prüfe, ob genau drei nichtleere Ausgabezeilen in der geforderten Reihenfolge entstehen."
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
      xp: 75,
      instructions: [
        "Speichere 35 in einer Variable namens punkte.",
        "Erhöhe punkte um 15.",
        "Gib den neuen Punktestand aus."
      ],
      hints: [
        "Verwende die vorhandene Variable punkte auf der rechten Seite einer neuen Zuweisung.",
        "Erhöhe den bisherigen Wert mit punkte = punkte + 15.",
        "Gib am Ende die Variable aus, nicht den fest eingetippten Ergebniswert."
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
      xp: 90,
      instructions: [
        "Die Variablen breite und hoehe sind bereits gesetzt.",
        "Berechne flaeche = breite * hoehe.",
        "Berechne umfang = 2 * (breite + hoehe).",
        "Gib zuerst die Fläche, danach den Umfang aus."
      ],
      hints: [
        "Lege für Fläche und Umfang zwei unterschiedlich benannte Variablen an.",
        "Die Fläche ist breite * hoehe; beim Umfang wird die Summe aus Breite und Höhe verdoppelt.",
        "Die Tests suchen die Variablen flaeche und umfang und erwarten die Werte 40 und 26."
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
      xp: 105,
      instructions: [
        "Lies eine Celsius-Temperatur als Dezimalzahl ein.",
        "Berechne Fahrenheit mit celsius * 1.8 + 32.",
        "Gib das Ergebnis aus."
      ],
      hints: [
        "input() liefert Text. Wandle die Eingabe vor der Rechnung mit float() um.",
        "Setze die Umwandlung direkt um input(), zum Beispiel float(input()).",
        "Berechne fahrenheit aus celsius * 1.8 + 32 und gib diese Variable aus."
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
      xp: 105,
      instructions: [
        "preis und anzahl sind vorgegeben.",
        "Berechne zunächst gesamt = preis * anzahl.",
        "Ab 5 Stück wird gesamt mit 0.9 multipliziert.",
        "Gib gesamt aus."
      ],
      hints: [
        "Prüfe die Stückzahl mit einer if-Bedingung.",
        "Der Rabattblock soll nur für anzahl >= 5 ausgeführt werden.",
        "Innerhalb des eingerückten Blocks wird gesamt mit 0.9 multipliziert."
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
      xp: 120,
      instructions: [
        "90 oder mehr Punkte: Gold",
        "70 bis 89 Punkte: Silber",
        "50 bis 69 Punkte: Bronze",
        "Weniger als 50 Punkte: Starter",
        "Speichere die Stufe in der Variable stufe und gib sie aus."
      ],
      hints: [
        "Prüfe die Grenzwerte mit if, elif und else von oben nach unten.",
        "Beginne mit dem höchsten Grenzwert 90 und prüfe danach 70 und 50.",
        "Jeder Zweig weist der Variablen stufe genau einen Text zu."
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
      xp: 120,
      instructions: [
        "Der Zugang ist erlaubt, wenn die Person mindestens 16 Jahre alt ist und die Unterweisung abgeschlossen hat.",
        "Speichere True oder False in zugang.",
        "Gib zugang aus."
      ],
      hints: [
        "Formuliere zuerst zwei einzelne Vergleiche: Alter ausreichend und Unterweisung abgeschlossen.",
        "Beide Bedingungen müssen zugleich wahr sein; verbinde sie deshalb mit and.",
        "Speichere den gesamten Wahrheitsausdruck direkt in zugang."
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
      xp: 135,
      instructions: [
        "Nutze eine for-Schleife für die Zahlen 1 bis 10.",
        "Gib in jeder Runde 7 * zahl aus.",
        "Die Ausgabe beginnt mit 7 und endet mit 70."
      ],
      hints: [
        "Nutze range() so, dass die Laufvariable die Zahlen 1 bis 10 annimmt.",
        "Da der Endwert von range() nicht enthalten ist, lautet der Bereich range(1, 11).",
        "Rücke print(7 * zahl) in den Schleifenblock ein."
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
      xp: 150,
      instructions: [
        "Das Guthaben startet bei 40 Euro.",
        "Jeden Monat kommen 15 Euro hinzu.",
        "Erhöhe monate in jedem Durchlauf um 1.",
        "Wiederhole, bis mindestens 130 Euro erreicht sind.",
        "Gib monate und guthaben aus."
      ],
      hints: [
        "Die Schleife läuft, solange guthaben noch kleiner als 130 ist.",
        "Verändere innerhalb jedes Durchlaufs sowohl guthaben als auch monate.",
        "Addiere pro Runde 15 zum Guthaben und 1 zu den Monaten."
      ],
      starter: `guthaben = 40\nmonate = 0\n\n# Ergänze die while-Schleife\n\nprint(monate)\nprint(guthaben)\n`,
      check: {
        type: "tests",
        code: `assert monate == 6, "Das Ziel wird nach 6 Monaten erreicht."\nassert guthaben == 130, "Das Guthaben soll dann 130 Euro betragen."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "pausensignal-funktion",
      lessonId: "funktionen",
      title: "Pausensignal wiederverwenden",
      description: "Definiere eine Funktion ohne Parameter und rufe sie mehrfach auf.",
      difficulty: "easy",
      xp: 120,
      instructions: [
        "Definiere eine Funktion namens pausensignal ohne Parameter.",
        "Die Funktion soll zuerst Pause beginnt und danach Bitte lüften ausgeben.",
        "Rufe die Funktion im Hauptprogramm genau zweimal auf."
      ],
      hints: [
        "Ersetze pass innerhalb der Funktion durch zwei eingerückte print()-Anweisungen.",
        "Unterhalb der Definition startest du die Funktion mit pausensignal().",
        "Der Aufruf soll zweimal im Hauptprogramm stehen; die Definition selbst wird nur einmal geschrieben."
      ],
      starter: `def pausensignal():\n    # Ergänze die beiden Ausgaben\n    pass\n\n# Rufe die Funktion zweimal auf\n`,
      check: {
        type: "tests",
        code: `import ast\nimport contextlib\nimport inspect\nimport io\n\nassert callable(pausensignal), "Definiere eine Funktion namens pausensignal."\nassert len(inspect.signature(pausensignal).parameters) == 0, "Die Funktion soll keine Parameter besitzen."\n_testausgabe = io.StringIO()\nwith contextlib.redirect_stdout(_testausgabe):\n    pausensignal()\nassert _testausgabe.getvalue().strip().splitlines() == ["Pause beginnt", "Bitte lüften"], "Prüfe die beiden Ausgaben und ihre Reihenfolge."\n_baum = ast.parse(__pylab_source__)\n_aufrufe = [knoten for knoten in ast.walk(_baum) if isinstance(knoten, ast.Call) and isinstance(knoten.func, ast.Name) and knoten.func.id == "pausensignal"]\nassert len(_aufrufe) == 2, "Rufe pausensignal im Hauptprogramm genau zweimal auf."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "begruessung-parameter",
      lessonId: "funktionen-parameter",
      title: "Persönlich begrüßen",
      description: "Übergib Vor- und Nachname als zwei Parameter.",
      difficulty: "medium",
      xp: 150,
      instructions: [
        "Definiere begruesse(vorname, nachname) mit genau zwei Parametern.",
        "Gib in der Funktion Hallo gefolgt von Vor- und Nachname aus.",
        "Lass den vorgegebenen Beispielaufruf unverändert."
      ],
      hints: [
        "Ersetze pass durch eine eingerückte Ausgabe innerhalb der Funktion.",
        "print() kann mehrere Werte durch Kommas getrennt mit Leerzeichen ausgeben.",
        "Verwende beide Parameter vorname und nachname; schreibe nicht die Beispielnamen fest in die Funktion."
      ],
      starter: `def begruesse(vorname, nachname):\n    # Persönliche Begrüßung ausgeben\n    pass\n\nbegruesse("Mia", "Koch")\n`,
      check: {
        type: "tests",
        code: `import ast\nimport contextlib\nimport inspect\nimport io\n\nassert callable(begruesse), "Definiere eine Funktion namens begruesse."\nassert len(inspect.signature(begruesse).parameters) == 2, "Die Funktion benötigt genau zwei Parameter."\n_testausgabe = io.StringIO()\nwith contextlib.redirect_stdout(_testausgabe):\n    begruesse("Noah", "Yilmaz")\nassert _testausgabe.getvalue().strip() == "Hallo Noah Yilmaz", "Verwende beide übergebenen Namen in der Begrüßung."\n_baum = ast.parse(__pylab_source__)\n_beispiel = [knoten for knoten in ast.walk(_baum) if isinstance(knoten, ast.Call) and isinstance(knoten.func, ast.Name) and knoten.func.id == "begruesse" and len(knoten.args) == 2]\nassert any(isinstance(knoten.args[0], ast.Constant) and knoten.args[0].value == "Mia" and isinstance(knoten.args[1], ast.Constant) and knoten.args[1].value == "Koch" for knoten in _beispiel), "Lass den Beispielaufruf begruesse(\"Mia\", \"Koch\") unverändert."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "fahrtkosten-funktion",
      lessonId: "funktionen-rueckgabe",
      title: "Fahrtkosten als Funktion",
      description: "Kapsele eine Berechnung mit Parametern und Rückgabewert.",
      difficulty: "medium",
      xp: 165,
      instructions: [
        "Definiere kosten(strecke, verbrauch, literpreis).",
        "Berechne zuerst die benötigten Liter: strecke * verbrauch / 100.",
        "Gib die Gesamtkosten mit return zurück.",
        "Verändere den vorgegebenen Beispielaufruf nicht."
      ],
      hints: [
        "Berechne innerhalb der Funktion zuerst liter = strecke * verbrauch / 100.",
        "Die Gesamtkosten ergeben sich aus den benötigten Litern mal literpreis.",
        "Gib das berechnete Ergebnis mit return zurück; print() allein ist kein Rückgabewert."
      ],
      starter: `def kosten(strecke, verbrauch, literpreis):\n    # Berechnung ergänzen\n    pass\n\nbeispiel = kosten(250, 6.5, 1.80)\nprint(beispiel)\n`,
      check: {
        type: "tests",
        code: `import ast\nimport inspect\n\nassert callable(kosten), "Definiere eine Funktion namens kosten."\nassert len(inspect.signature(kosten).parameters) == 3, "Die Funktion benötigt genau drei Parameter."\nassert abs(kosten(250, 6.5, 1.80) - 29.25) < 0.001, "Prüfe Literverbrauch und Kosten."\nassert abs(kosten(100, 5, 2) - 10) < 0.001, "Die Funktion soll mit verschiedenen Werten arbeiten."\nassert abs(kosten(420, 7.2, 1.65) - 49.896) < 0.001, "Verwende alle drei Parameter in der Berechnung."\n_baum = ast.parse(__pylab_source__)\n_beispiel = [knoten for knoten in ast.walk(_baum) if isinstance(knoten, ast.Call) and isinstance(knoten.func, ast.Name) and knoten.func.id == "kosten" and len(knoten.args) == 3]\nassert any([isinstance(argument, ast.Constant) for argument in knoten.args] == [True, True, True] and [argument.value for argument in knoten.args] == [250, 6.5, 1.8] for knoten in _beispiel), "Lass den vorgegebenen Beispielaufruf unverändert."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "mittelwert-liste",
      lessonId: "listen",
      title: "Messwerte auswerten",
      description: "Berechne den Mittelwert einer Liste ohne fertige sum-Funktion.",
      difficulty: "plus",
      xp: 180,
      instructions: [
        "Durchlaufe die Liste messwerte mit einer for-Schleife.",
        "Addiere alle Werte in summe.",
        "Berechne mittelwert mit summe / len(messwerte).",
        "Gib den Mittelwert aus."
      ],
      hints: [
        "Durchlaufe messwerte mit for wert in messwerte:.",
        "Addiere im eingerückten Schleifenblock jeden wert zu summe.",
        "Berechne nach der Schleife mittelwert = summe / len(messwerte)."
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
      xp: 180,
      instructions: [
        "Das Programm soll ab 4 Tickets 20 Prozent Rabatt geben.",
        "Für 5 Tickets zu je 10 Euro muss der Endpreis 40 Euro sein.",
        "Repariere alle Fehler und behalte die Ausgabe bei."
      ],
      hints: [
        "Behebe zuerst den Syntaxfehler: Nach einer if-Bedingung steht ein Doppelpunkt.",
        "Alle Anweisungen des if-Blocks müssen gleich weit eingerückt sein.",
        "Der Gesamtpreis entsteht durch Multiplikation von preis und anzahl, nicht durch Addition."
      ],
      starter: `preis = 10\nanzahl = 5\ngesamt = preis + anzahl\n\nif anzahl >= 4\nprint("Rabatt wird angewendet")\n    gesamt = gesamt * 0.8\n\nprint(gesamt)\n`,
      check: {
        type: "tests",
        code: `assert gesamt == 40, "Für 5 Tickets zu 10 Euro sind nach Rabatt 40 Euro fällig."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "klima-hinweis",
      lessonId: "elif",
      title: "Temperaturhinweis",
      description: "Ordne eine Temperatur genau einer Empfehlung zu.",
      difficulty: "medium",
      xp: 120,
      instructions: [
        "30 Grad oder mehr: Hitze",
        "20 bis 29 Grad: angenehm",
        "10 bis 19 Grad: Jacke",
        "Weniger als 10 Grad: kalt",
        "Speichere die Empfehlung in der Variable hinweis und gib sie aus."
      ],
      hints: [
        "Prüfe die Grenzwerte mit if, elif und else von oben nach unten.",
        "Beginne mit der höchsten Grenze 30 und prüfe danach 20 und 10.",
        "Jeder Zweig weist hinweis genau einen Text zu; bei 24 Grad ergibt sich angenehm."
      ],
      starter: `temperatur = 24\n\n# Bestimme die Variable hinweis\n\nprint(hinweis)\n`,
      check: {
        type: "tests",
        code: `assert hinweis == "angenehm", "Bei 24 Grad lautet der Hinweis angenehm."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "gerade-summe",
      lessonId: "for",
      title: "Gerade Zahlen summieren",
      description: "Verbinde Schleife und Rest-Operator.",
      difficulty: "medium",
      xp: 135,
      instructions: [
        "Durchlaufe mit einer for-Schleife die Zahlen 1 bis 20.",
        "Addiere nur die geraden Zahlen zur Variable summe.",
        "Gib summe am Ende aus."
      ],
      hints: [
        "Nutze range(1, 21), damit auch die 20 enthalten ist.",
        "Eine Zahl ist gerade, wenn zahl % 2 == 0 ist.",
        "Erhöhe summe nur innerhalb der if-Bedingung um den aktuellen Wert."
      ],
      starter: `summe = 0\n\n# Addiere alle geraden Zahlen von 1 bis 20\n\nprint(summe)\n`,
      check: {
        type: "tests",
        code: `assert summe == 110, "Die Summe der geraden Zahlen von 1 bis 20 ist 110."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "countdown",
      lessonId: "while",
      title: "Countdown zum Start",
      description: "Zähle mit einer while-Schleife rückwärts.",
      difficulty: "easy",
      xp: 105,
      instructions: [
        "Beginne bei 5 und gib in jeder Runde die aktuelle Zahl aus.",
        "Verringere die Zahl in jedem Durchlauf um 1.",
        "Wiederhole, bis 1 ausgegeben wurde, und gib danach Start! aus."
      ],
      hints: [
        "Die Schleife läuft, solange zahl größer als 0 ist.",
        "Gib zuerst die Zahl aus und verringere sie danach mit zahl = zahl - 1.",
        "Die Ausgabe von Start! steht nach der Schleife, also nicht eingerückt."
      ],
      starter: `zahl = 5\n\n# Zähle mit einer while-Schleife von 5 auf 1 herunter\n\nprint("Start!")\n`,
      check: {
        type: "output",
        expected: "5\n4\n3\n2\n1\nStart!"
      }
    },
    {
      id: "maximum-funktion",
      lessonId: "funktionen-rueckgabe",
      title: "Den größeren Wert zurückgeben",
      description: "Schreibe eine Funktion, die zwei Werte vergleicht.",
      difficulty: "medium",
      xp: 150,
      instructions: [
        "Definiere groesser(a, b) mit genau zwei Parametern.",
        "Gib den größeren der beiden Werte mit return zurück.",
        "Bei gleichen Werten soll dieser Wert zurückgegeben werden."
      ],
      hints: [
        "Vergleiche die beiden Parameter mit if und else.",
        "Gib das Ergebnis mit return zurück; print() allein ist kein Rückgabewert.",
        "Sind beide gleich groß, darf jeder der beiden zurückgegeben werden."
      ],
      starter: `def groesser(a, b):\n    # Gib den größeren der beiden Werte zurück\n    pass\n\nprint(groesser(3, 9))\n`,
      check: {
        type: "tests",
        code: `import inspect\nassert callable(groesser), "Definiere eine Funktion namens groesser."\nassert len(inspect.signature(groesser).parameters) == 2, "Die Funktion benötigt genau zwei Parameter."\nassert groesser(3, 9) == 9, "Bei 3 und 9 ist 9 der größere Wert."\nassert groesser(10, 2) == 10, "Bei 10 und 2 ist 10 der größere Wert."\nassert groesser(5, 5) == 5, "Bei zwei gleichen Werten wird dieser Wert zurückgegeben."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "einkaufsliste",
      lessonId: "listen-methoden",
      title: "Einkaufsliste pflegen",
      description: "Erweitere und verkleinere eine Liste gezielt.",
      difficulty: "medium",
      xp: 120,
      instructions: [
        "Die Liste einkauf ist bereits vorhanden.",
        "Füge \"Käse\" am Ende hinzu.",
        "Entferne \"Milch\" aus der Liste.",
        "Gib die fertige Liste aus."
      ],
      hints: [
        "Mit einkauf.append(\"Käse\") hängst du einen Wert ans Ende an.",
        "Mit einkauf.remove(\"Milch\") entfernst du den passenden Eintrag.",
        "Schreibe nicht einkauf = einkauf.append(...); die Methode verändert die Liste direkt."
      ],
      starter: `einkauf = ["Brot", "Milch", "Apfel"]\n\n# Füge "Käse" hinzu\n\n# Entferne "Milch"\n\nprint(einkauf)\n`,
      check: {
        type: "tests",
        code: `assert einkauf == ["Brot", "Apfel", "Käse"], "Nach dem Hinzufügen und Entfernen soll die Liste Brot, Apfel, Käse enthalten."\nassert len(einkauf) == 3, "Die Liste soll am Ende genau drei Einträge haben."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "namensschild",
      lessonId: "strings",
      title: "Namensschild gestalten",
      description: "Setze Werte mit einem f-String zusammen und forme sie um.",
      difficulty: "medium",
      xp: 120,
      instructions: [
        "vorname und nachname sind vorgegeben.",
        "Baue mit einem f-String den Text aus Vor- und Nachname, getrennt durch ein Leerzeichen.",
        "Schreibe das Namensschild komplett in Großbuchstaben.",
        "Gib das Ergebnis aus (erwartet wird MIA KOCH)."
      ],
      hints: [
        "Ein f-String beginnt mit f vor dem Anführungszeichen: f\"{vorname} {nachname}\".",
        "Mit .upper() machst du Text groß. Du kannst die ganze Zeichenkette am Ende umwandeln.",
        "Speichere das Ergebnis in schild und gib genau diese Variable aus."
      ],
      starter: `vorname = "mia"\nnachname = "koch"\n\n# Baue ein Namensschild in Großbuchstaben\nschild = \n\nprint(schild)\n`,
      check: {
        type: "output",
        expected: "MIA KOCH"
      }
    },
    {
      id: "vokale-zaehlen",
      lessonId: "strings",
      title: "Vokale zählen",
      description: "Untersuche einen Text Zeichen für Zeichen.",
      difficulty: "plus",
      xp: 165,
      instructions: [
        "Definiere vokale(wort) mit einem Parameter.",
        "Zähle, wie viele Vokale (a, e, i, o, u) im Wort stecken.",
        "Große und kleine Vokale sollen gleich zählen.",
        "Gib die Anzahl mit return zurück."
      ],
      hints: [
        "Durchlaufe das Wort mit for zeichen in wort: und prüfe jedes Zeichen.",
        "Mit zeichen.lower() in \"aeiou\" erkennst du auch große Vokale.",
        "Erhöhe einen Zähler und gib ihn nach der Schleife mit return zurück."
      ],
      starter: `def vokale(wort):\n    anzahl = 0\n    # Durchlaufe das Wort und zähle die Vokale\n    return anzahl\n\nprint(vokale("Programmieren"))\n`,
      check: {
        type: "tests",
        code: `import inspect\nassert callable(vokale), "Definiere eine Funktion namens vokale."\nassert len(inspect.signature(vokale).parameters) == 1, "Die Funktion erwartet genau einen Parameter."\nassert vokale("Programmieren") == 5, "In Programmieren stecken 5 Vokale."\nassert vokale("xyz") == 0, "In xyz steckt kein Vokal."\nassert vokale("Aeiou") == 5, "Achte auch auf große Vokale: a, e, i, o und u zählen mit."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "sternentreppe",
      lessonId: "for",
      title: "Sternentreppe bauen",
      description: "Erzeuge ein wachsendes Muster mit einer Schleife.",
      difficulty: "plus",
      xp: 165,
      instructions: [
        "Gib eine Treppe aus Sternen mit vier Stufen aus.",
        "Die erste Stufe hat einen Stern, die vierte Stufe vier Sterne.",
        "Jede Stufe steht in einer eigenen Zeile."
      ],
      hints: [
        "Mit \"*\" * 3 erzeugst du die Zeichenkette ***.",
        "Eine for-Schleife mit range(1, 5) liefert die Stufenhöhen 1 bis 4.",
        "Gib in jeder Runde \"*\" * stufe aus."
      ],
      starter: `# Gib eine Sternentreppe mit vier Stufen aus\n`,
      check: {
        type: "output",
        expected: "*\n**\n***\n****"
      }
    },
    {
      id: "preisangebot",
      lessonId: "elif",
      title: "Preisangebot prüfen",
      description: "Entscheide mit if und else, ob ein Angebot den Mindestpreis erreicht.",
      difficulty: "medium",
      xp: 135,
      instructions: [
        "Der Mindestpreis beträgt 24.99 Euro, das Angebot 22.50 Euro.",
        "Liegt das Angebot unter dem Mindestpreis, speichere abgelehnt in ergebnis.",
        "Andernfalls speichere angenommen in ergebnis.",
        "Gib ergebnis aus."
      ],
      hints: [
        "Vergleiche angebot mit mindestpreis in einer if-Bedingung.",
        "Für angebot < mindestpreis gilt der Text abgelehnt; der andere Fall gehört in else.",
        "Weise ergebnis in beiden Zweigen genau einen Text zu und gib die Variable erst danach aus."
      ],
      starter: `mindestpreis = 24.99\nangebot = 22.50\n\n# Entscheide zwischen "abgelehnt" und "angenommen"\nergebnis = ""\n\nprint(ergebnis)\n`,
      check: {
        type: "tests",
        code: `import ast\nassert ergebnis == "abgelehnt", "22.50 Euro liegen unter dem Mindestpreis."\n_baum = ast.parse(__pylab_source__)\n_verzweigungen = [knoten for knoten in ast.walk(_baum) if isinstance(knoten, ast.If)]\nassert _verzweigungen, "Verwende eine if-Bedingung für den Vergleich."\nassert any(knoten.orelse for knoten in _verzweigungen), "Ergänze einen else-Zweig für das angenommene Angebot."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "mietzuschuss",
      lessonId: "elif",
      title: "Mietzuschuss staffeln",
      description: "Ordne einen Mietpreis mit einer geschachtelten Verzweigung einem Zuschusssatz zu.",
      difficulty: "plus",
      xp: 165,
      instructions: [
        "Unter 500 Euro beträgt der Zuschusssatz 2 Prozent.",
        "Von 500 bis unter 1000 Euro beträgt er 5 Prozent.",
        "Ab 1000 Euro beträgt er 7 Prozent.",
        "Bestimme satz mit einer geschachtelten Verzweigung und berechne zuschuss = miete * satz."
      ],
      hints: [
        "Prüfe außen zuerst, ob miete kleiner als 1000 ist.",
        "Innerhalb dieses Zweigs unterscheidest du nochmals zwischen unter 500 und mindestens 500.",
        "Für 850 Euro gilt satz = 0.05 und damit zuschuss = 42.5."
      ],
      starter: `miete = 850\nsatz = 0\n\n# Bestimme 0.02, 0.05 oder 0.07 mit einer geschachtelten Verzweigung\n\nzuschuss = miete * satz\nprint(zuschuss)\n`,
      check: {
        type: "tests",
        code: `import ast\nassert abs(satz - 0.05) < 0.0001, "Für 850 Euro gilt ein Zuschusssatz von 5 Prozent."\nassert abs(zuschuss - 42.5) < 0.0001, "Der Zuschuss für 850 Euro beträgt 42.50 Euro."\n_baum = ast.parse(__pylab_source__)\n_verzweigungen = [knoten for knoten in ast.walk(_baum) if isinstance(knoten, ast.If)]\nassert len(_verzweigungen) >= 2, "Verwende mindestens zwei Verzweigungen."\nassert any(any(isinstance(teil, ast.If) for teil in knoten.body + knoten.orelse) for knoten in _verzweigungen), "Eine Verzweigung soll innerhalb einer anderen liegen."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "taschengeld-tabelle",
      lessonId: "for",
      title: "Taschengeldtabelle erstellen",
      description: "Berechne mit einer for-Schleife eine Entwicklung vom 6. bis zum 21. Lebensjahr.",
      difficulty: "medium",
      xp: 150,
      instructions: [
        "Das Taschengeld startet mit 10 Euro im Alter von 6 Jahren.",
        "Nach jeder Ausgabe steigt es für das nächste Lebensjahr um 2 Euro.",
        "Gib für jedes Alter von 6 bis einschließlich 21 zuerst das Alter und dann den Betrag aus.",
        "Verwende dazu eine for-Schleife."
      ],
      hints: [
        "range(6, 22) liefert alle Alterswerte von 6 bis einschließlich 21.",
        "Gib in jeder Runde print(alter, taschengeld) aus.",
        "Erhöhe taschengeld erst nach der Ausgabe um 2, damit das Alter 6 mit 10 Euro beginnt."
      ],
      starter: `taschengeld = 10\n\n# Gib Alter und Taschengeld von 6 bis 21 aus\n`,
      check: {
        type: "output",
        expected: "6 10\n7 12\n8 14\n9 16\n10 18\n11 20\n12 22\n13 24\n14 26\n15 28\n16 30\n17 32\n18 34\n19 36\n20 38\n21 40"
      }
    },
    {
      id: "fischteich",
      lessonId: "while",
      title: "Fischbestand hochrechnen",
      description: "Ermittle mit while, wann ein wachsender Bestand ein Ziel erreicht.",
      difficulty: "medium",
      xp: 150,
      instructions: [
        "Der Bestand startet bei 3 Fischen und verdoppelt sich jedes Jahr.",
        "Wiederhole die Entwicklung, bis mindestens 100 Fische erreicht sind.",
        "Erhöhe jahre in jedem Schleifendurchlauf um 1.",
        "Gib zuerst jahre und danach bestand aus."
      ],
      hints: [
        "Die Schleife läuft, solange bestand noch kleiner als ziel ist.",
        "Verdopple bestand innerhalb der Schleife mit bestand = bestand * 2.",
        "Nach 6 Jahren sind 192 Fische erreicht; beide Variablen werden geprüft."
      ],
      starter: `bestand = 3\nziel = 100\njahre = 0\n\n# Verdopple den Bestand, bis das Ziel erreicht ist\n\nprint(jahre)\nprint(bestand)\n`,
      check: {
        type: "tests",
        code: `import ast\nassert jahre == 6, "Das Ziel wird nach 6 Verdopplungen erreicht."\nassert bestand == 192, "Nach 6 Jahren beträgt der Bestand 192 Fische."\n_baum = ast.parse(__pylab_source__)\nassert any(isinstance(knoten, ast.While) for knoten in ast.walk(_baum)), "Verwende eine while-Schleife."\nprint("__PYLAB_TESTS_OK__")`
      }
    },
    {
      id: "fibonacci",
      lessonId: "for",
      title: "Fibonacci-Folge erzeugen",
      description: "Eine berühmte Zahlenfolge aus Natur und Mathematik – Schritt für Schritt mit Python.",
      difficulty: "extra",
      xp: 200,
      instructions: [
        "Definiere fibonacci(anzahl) mit einem Parameter.",
        "Die Folge beginnt mit 0 und 1; jede weitere Zahl ist die Summe der beiden vorherigen.",
        "Gib eine Liste mit den ersten anzahl Fibonacci-Zahlen zurück.",
        "Bei anzahl = 10 ergibt sich [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]."
      ],
      hints: [
        "Starte mit a = 0, b = 1 und einer leeren Liste folge.",
        "Hänge in jeder Runde a an die Liste an und berechne danach die nächste Zahl.",
        "Den nächsten Wert bekommst du mit naechste = a + b; danach gilt a = b und b = naechste."
      ],
      starter: `def fibonacci(anzahl):\n    folge = []\n    a = 0\n    b = 1\n    # Wiederhole anzahl-mal: hänge a an folge an und berechne die nächste Zahl\n\n    return folge\n\nprint(fibonacci(10))\n`,
      check: {
        type: "tests",
        code: `import inspect\nassert callable(fibonacci), "Definiere eine Funktion namens fibonacci."\nassert len(inspect.signature(fibonacci).parameters) == 1, "Die Funktion erwartet genau einen Parameter."\nassert fibonacci(0) == [], "Bei 0 angeforderten Zahlen ist die Liste leer."\nassert fibonacci(1) == [0], "Die Folge beginnt mit 0."\nassert fibonacci(2) == [0, 1], "Die ersten beiden Zahlen sind 0 und 1."\nassert fibonacci(10) == [0, 1, 1, 2, 3, 5, 8, 13, 21, 34], "Prüfe die ersten zehn Fibonacci-Zahlen."\nprint("__PYLAB_TESTS_OK__")`
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
      xp: 30,
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
      xp: 30,
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
      xp: 30,
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
      xp: 30,
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
      xp: 45,
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
      xp: 30,
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
      xp: 45,
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
      xp: 45,
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
      xp: 45,
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
      xp: 45,
      exercise: {
        question: "Was liefert len([4, 7, 2])?",
        options: ["2", "3", "13"],
        correct: 1,
        feedback: "len() zählt die Elemente, nicht deren Summe."
      }
    },
    {
      id: "comments",
      title: "Kommentare #",
      category: "Grundlagen",
      syntax: "# Das ist ein Kommentar",
      short: "Notizen im Code, die Python nicht ausführt.",
      summary: "Mit # schreibst du Erklärungen direkt in den Code. Python überspringt alles ab dem Doppelkreuz bis zum Zeilenende.",
      details: [
        "Alles rechts vom # in derselben Zeile wird beim Ausführen ignoriert.",
        "Kommentare erklären das Warum, nicht das Offensichtliche. Gute Namen ersetzen viele Kommentare.",
        "Du kannst eine Codezeile vorübergehend „auskommentieren“, um sie testweise zu deaktivieren."
      ],
      example: `# Preis für eine Klassenfahrt berechnen\npreis_pro_tag = 45\ntage = 3\ngesamt = preis_pro_tag * tage  # ergibt 135\nprint(gesamt)`,
      pitfalls: [
        "Ein # mitten in einem String (\"a # b\") ist Text und kein Kommentar.",
        "Zu viele selbstverständliche Kommentare machen Code unübersichtlicher, nicht klarer."
      ],
      relatedLesson: "sequenz",
      xp: 30,
      exercise: {
        question: "Was passiert mit dem Text nach einem # in einer Codezeile?",
        options: ["Er wird ausgegeben", "Python führt ihn nicht aus", "Er löst einen Fehler aus"],
        correct: 1,
        feedback: "Alles ab dem # bis zum Zeilenende ist nur für Menschen gedacht."
      }
    },
    {
      id: "fstrings",
      title: "f-Strings",
      category: "Ausgabe",
      syntax: "f\"Hallo {name}\"",
      short: "Setzt Werte sauber in einen Text ein.",
      summary: "Ein f-String verbindet festen Text und Variablen, ohne mühsam mit Kommas und Plus zu jonglieren.",
      details: [
        "Schreibe ein f direkt vor das öffnende Anführungszeichen.",
        "In geschweiften Klammern {} steht der Name oder ein Ausdruck, der eingesetzt wird.",
        "Mit {wert:.2f} rundest du eine Dezimalzahl auf zwei Nachkommastellen für die Ausgabe."
      ],
      example: `name = "Mia"\npunkte = 42\npreis = 3.5\nprint(f"{name} hat {punkte} Punkte.")\nprint(f"Preis: {preis:.2f} Euro")`,
      pitfalls: [
        "Ohne das f vor dem Anführungszeichen bleibt {name} einfach als Text stehen.",
        "Die geschweiften Klammern dürfen nicht vergessen werden: f\"{punkte}\" statt f\"punkte\"."
      ],
      relatedLesson: "strings",
      xp: 45,
      exercise: {
        question: "Welche Zeile gibt Hallo Mia aus, wenn name = \"Mia\" ist?",
        options: ["print(\"Hallo {name}\")", "print(f\"Hallo {name}\")", "print(f\"Hallo name\")"],
        correct: 1,
        feedback: "Nur mit f vor dem String und {name} in Klammern wird der Wert eingesetzt."
      }
    },
    {
      id: "modulo",
      title: "% und //",
      category: "Rechnen",
      syntax: "rest = zahl % 2",
      short: "Rest und ganzzahliges Ergebnis einer Division.",
      summary: "Mit % erhältst du den Rest einer Division, mit // das abgerundete ganzzahlige Ergebnis. Beides ist beim Aufteilen und Prüfen sehr nützlich.",
      details: [
        "zahl % 2 ist 0, wenn zahl gerade ist, und 1, wenn sie ungerade ist.",
        "// teilt und schneidet die Nachkommastellen ab: 17 // 5 ergibt 3.",
        "Zusammen beschreiben // und % eine Division mit Rest: 17 = 3 * 5 + 2."
      ],
      example: `eier = 17\nkartons = eier // 6\nrest = eier % 6\nprint("Volle Kartons:", kartons)\nprint("Übrig:", rest)`,
      pitfalls: [
        "% ist der Rest-Operator, nicht das Prozentzeichen aus dem Alltag.",
        "Bei / entsteht meist eine Dezimalzahl, bei // dagegen eine Ganzzahl."
      ],
      relatedLesson: "rechnen",
      xp: 45,
      exercise: {
        question: "Womit prüfst du am einfachsten, ob zahl gerade ist?",
        options: ["zahl // 2 == 0", "zahl % 2 == 0", "zahl / 2 == 0"],
        correct: 1,
        feedback: "Eine gerade Zahl lässt bei der Division durch 2 keinen Rest, also zahl % 2 == 0."
      }
    },
    {
      id: "round",
      title: "round()",
      category: "Rechnen",
      syntax: "round(wert, stellen)",
      short: "Rundet eine Zahl auf gewünschte Stellen.",
      summary: "round() macht lange Dezimalzahlen lesbar, zum Beispiel bei Preisen oder Durchschnittswerten.",
      details: [
        "round(3.14159, 2) ergibt 3.14.",
        "Ohne zweite Zahl rundet round() auf eine ganze Zahl: round(2.7) ergibt 3.",
        "round() liefert einen neuen Wert; die ursprüngliche Variable bleibt unverändert."
      ],
      example: `summe = 100\nanzahl = 3\nschnitt = summe / anzahl\nprint(schnitt)\nprint(round(schnitt, 2))`,
      pitfalls: [
        "Nur zum Anzeigen runden – beim Weiterrechnen besser mit dem genauen Wert arbeiten.",
        "round(2.5) kann je nach Zahl kaufmännisch zur geraden Ziffer runden; für reine Anzeige reicht das aus."
      ],
      relatedLesson: "rechnen",
      xp: 30,
      exercise: {
        question: "Was ergibt round(7.456, 1)?",
        options: ["7.4", "7.5", "8.0"],
        correct: 1,
        feedback: "Auf eine Nachkommastelle gerundet wird aus 7.456 der Wert 7.5."
      }
    },
    {
      id: "string-methods",
      title: ".upper() .lower() .strip()",
      category: "Text",
      syntax: "text.upper()",
      short: "Verändert Groß-/Kleinschreibung und entfernt Leerzeichen.",
      summary: "String-Methoden liefern eine bearbeitete Kopie eines Textes, etwa für saubere Vergleiche oder einheitliche Ausgaben.",
      details: [
        ".upper() macht alle Buchstaben groß, .lower() alle klein.",
        ".strip() entfernt Leerzeichen am Anfang und Ende.",
        ".replace(\"alt\", \"neu\") ersetzt jedes Vorkommen eines Teilstücks."
      ],
      example: `eingabe = "  Ja  "\nantwort = eingabe.strip().lower()\nprint(antwort == "ja")\nprint("python".upper())`,
      pitfalls: [
        "Die Methoden ändern den Originaltext nicht, sondern geben einen neuen zurück: text = text.upper().",
        "Vergiss die Klammern nicht: text.upper ohne () ist nur die Methode selbst, nicht ihr Ergebnis."
      ],
      relatedLesson: "strings",
      xp: 45,
      exercise: {
        question: "Was liefert \"  Hallo \".strip()?",
        options: ["\"hallo\"", "\"Hallo\"", "\"  Hallo \""],
        correct: 1,
        feedback: ".strip() entfernt nur die äußeren Leerzeichen, die Groß-/Kleinschreibung bleibt."
      }
    },
    {
      id: "string-index",
      title: "Indizieren und Teilstücke",
      category: "Text",
      syntax: "text[0]   text[1:4]",
      short: "Greift auf einzelne Zeichen oder Abschnitte zu.",
      summary: "Jedes Zeichen eines Strings hat eine Position. Über diese Indizes liest du gezielt Zeichen oder ganze Teilstücke aus.",
      details: [
        "Die Zählung beginnt bei 0: bei \"Python\" ist text[0] das P.",
        "Negative Indizes zählen von hinten: text[-1] ist das letzte Zeichen.",
        "Mit text[1:4] erhältst du die Zeichen von Position 1 bis vor Position 4."
      ],
      example: `wort = "Python"\nprint(wort[0])\nprint(wort[-1])\nprint(wort[0:3])\nprint(len(wort))`,
      pitfalls: [
        "text[6] bei einem 6 Zeichen langen Wort löst einen Fehler aus, weil die Indizes bei 0 enden.",
        "Beim Teilstück ist die zweite Zahl ausgeschlossen: [0:3] liefert drei Zeichen."
      ],
      relatedLesson: "strings",
      xp: 45,
      exercise: {
        question: "Welches Zeichen liefert \"Lernen\"[1]?",
        options: ["L", "e", "n"],
        correct: 1,
        feedback: "Index 0 ist das L, Index 1 also das e."
      }
    },
    {
      id: "list-methods",
      title: ".append() .pop() in",
      category: "Datenstrukturen",
      syntax: "liste.append(wert)",
      short: "Listen erweitern, verkleinern und durchsuchen.",
      summary: "Mit Listenmethoden veränderst du eine Sammlung von Werten: hinzufügen, entfernen und prüfen, ob etwas enthalten ist.",
      details: [
        ".append(wert) hängt einen Wert am Ende an, .insert(0, wert) setzt ihn an eine Position.",
        ".pop() entfernt das letzte Element und gibt es zurück, .remove(wert) löscht einen bestimmten Wert.",
        "Mit wert in liste prüfst du, ob ein Wert vorhanden ist; das Ergebnis ist True oder False."
      ],
      example: `aufgaben = ["lesen", "rechnen"]\naufgaben.append("üben")\naufgaben.remove("lesen")\nprint(aufgaben)\nprint("üben" in aufgaben)`,
      pitfalls: [
        ".append() gibt nichts zurück; schreibe nicht liste = liste.append(x).",
        ".remove(wert) entfernt nur das erste Vorkommen und meldet einen Fehler, wenn der Wert fehlt."
      ],
      relatedLesson: "listen-methoden",
      xp: 45,
      exercise: {
        question: "Womit hängst du einen Wert am Ende einer Liste an?",
        options: ["liste.add(wert)", "liste.append(wert)", "liste.insert(wert)"],
        correct: 1,
        feedback: "append() fügt am Ende an. add() gibt es für Listen nicht."
      }
    },
    {
      id: "range-steps",
      title: "range() mit Schritten",
      category: "Schleifen",
      syntax: "range(start, ende, schritt)",
      short: "Zahlenfolgen mit Start, Ende und Schrittweite.",
      summary: "range() kann mehr als nur hochzählen: Mit einer dritten Zahl bestimmst du die Schrittweite, auch rückwärts.",
      details: [
        "range(0, 10, 2) liefert 0, 2, 4, 6, 8 – jeder zweite Wert.",
        "range(5, 0, -1) zählt rückwärts: 5, 4, 3, 2, 1.",
        "Der Endwert ist nie enthalten; prüfe deshalb immer den letzten erzeugten Wert."
      ],
      example: `for zahl in range(2, 11, 2):\n    print(zahl)\nprint("---")\nfor zahl in range(3, 0, -1):\n    print(zahl)`,
      pitfalls: [
        "Ohne negative Schrittweite erzeugt range(5, 0) gar keine Werte.",
        "Eine Schrittweite von 0 ist nicht erlaubt und löst einen Fehler aus."
      ],
      relatedLesson: "for",
      xp: 45,
      exercise: {
        question: "Welche Werte durchläuft range(1, 10, 3)?",
        options: ["1, 4, 7", "1, 4, 7, 10", "1, 3, 6, 9"],
        correct: 0,
        feedback: "Start 1, Schrittweite 3, Ende vor 10: also 1, 4, 7."
      }
    },
    {
      id: "error-messages",
      title: "Fehlermeldungen lesen",
      category: "Fehlersuche",
      syntax: "NameError: name 'x' is not defined",
      short: "Aus Fehlermeldungen die Ursache ablesen.",
      summary: "Eine Fehlermeldung ist kein Tadel, sondern ein Hinweis. Sie nennt die Art des Fehlers und meist die betroffene Zeile.",
      details: [
        "SyntaxError bedeutet einen Schreibfehler, etwa einen fehlenden Doppelpunkt oder eine offene Klammer.",
        "NameError heißt, dass ein Name benutzt wird, der noch nicht existiert – oft ein Tippfehler.",
        "TypeError entsteht, wenn Typen nicht zusammenpassen, zum Beispiel Text plus Zahl."
      ],
      example: `alter = "17"\n# Falsch: alter + 1 -> TypeError, weil Text und Zahl nicht passen\nalter = int(alter)\nprint(alter + 1)`,
      pitfalls: [
        "Lies die letzte Zeile der Meldung zuerst; sie nennt Fehlerart und Ursache.",
        "Die genannte Zeilennummer zeigt, wo Python stolpert – der eigentliche Fehler kann eine Zeile davor liegen."
      ],
      relatedLesson: "debugging",
      xp: 45,
      exercise: {
        question: "Welcher Fehler entsteht typischerweise bei \"3\" + 4?",
        options: ["NameError", "TypeError", "SyntaxError"],
        correct: 1,
        feedback: "Text und Zahl passen nicht zusammen – das ist ein TypeError."
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
        xp: 90,
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
        xp: 105,
        type: "slots",
        instructions: [
          "Ab 18 Jahren gilt eine Person als volljährig.",
          "Der Ja-Zweig wird bei einer wahren Bedingung ausgeführt.",
          "Der Nein-Zweig wird bei einer falschen Bedingung ausgeführt."
        ],
        slots: {
          condition: {
            label: "Bedingung wählen",
            options: ["alter = 18", "alter >= 18", "alter < 18"],
            answer: "alter >= 18"
          },
          yes: {
            label: "Ja-Zweig wählen",
            options: ["Ausgabe: \"minderjährig\"", "Ausgabe: \"volljährig\"", "Zuweisung: alter = 18"],
            answer: "Ausgabe: \"volljährig\""
          },
          no: {
            label: "Nein-Zweig wählen",
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
        xp: 120,
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
        xp: 135,
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
        xp: 150,
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
            label: "Ja-Zweig innen wählen",
            prefix: "Ausgabe:",
            options: [
              "\"nicht bestanden\"",
              "\"bestanden\"",
              "\"sehr gut\""
            ],
            answer: "\"sehr gut\""
          },
          passed: {
            label: "Nein-Zweig innen wählen",
            prefix: "Ausgabe:",
            options: [
              "\"bestanden\"",
              "\"nicht bestanden\"",
              "\"sehr gut\""
            ],
            answer: "\"bestanden\""
          },
          failed: {
            label: "Nein-Zweig außen wählen",
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
      description: "Schließe die gesamte Funktionsetappe ab.",
      icon: "wrench",
      condition: { type: "module", value: "bausteine" }
    },
    {
      id: "collector",
      title: "Sammler",
      description: "Erreiche mindestens 1000 XP.",
      icon: "gem",
      condition: { type: "xp", value: 1000 }
    },
    {
      id: "point-hunter",
      title: "Punktejäger",
      description: "Erreiche mindestens 3000 XP.",
      icon: "rocket",
      condition: { type: "xp", value: 3000 }
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
      id: "list-wrangler",
      title: "Listenprofi",
      description: "Schließe die Lektion „Listen erweitern“ mit Aufgabe ab.",
      icon: "list-checks",
      condition: { type: "lessonExercise", value: "listen-methoden" }
    },
    {
      id: "wordsmith",
      title: "Textkünstler",
      description: "Schließe die Lektion „Text bearbeiten“ mit Aufgabe ab.",
      icon: "type",
      condition: { type: "lessonExercise", value: "strings" }
    },
    {
      id: "transfer-talent",
      title: "Transfer-Talent",
      description: "Löse mindestens 14 Programmieraufgaben.",
      icon: "target",
      condition: { type: "exercises", value: 14 }
    },
    {
      id: "streak-keeper",
      title: "Dranbleiber",
      description: "Übe an drei Tagen in Folge.",
      icon: "flame",
      condition: { type: "streak", value: 3 }
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
      title: "f-String",
      description: "Werte sauber in Text einsetzen, optional gerundet.",
      code: `name = "Mia"\npreis = 3.5\nprint(f"{name}: {preis:.2f} Euro")`
    },
    {
      title: "Text bearbeiten",
      description: "Groß-/Kleinschreibung, Ränder und Teilstücke.",
      code: `wort = "  Python  "\nprint(wort.strip().upper())\nprint(wort.strip()[0:3])`
    },
    {
      title: "Listen verändern",
      description: "Hinzufügen, entfernen und auf Werte prüfen.",
      code: `werte = [4, 7]\nwerte.append(9)\nwerte.remove(4)\nprint(7 in werte)`
    },
    {
      title: "Rest und Teilen",
      description: "Rest mit %, ganzzahliges Teilen mit //.",
      code: `print(17 % 5)   # 2\nprint(17 // 5)  # 3\nprint(8 % 2 == 0)  # True`
    },
    {
      title: "Fehlersuche",
      description: "Fehlermeldung lesen, Zeile prüfen, kleine Testwerte verwenden.",
      code: `print("Zwischenwert:", wert)\nprint("Typ:", type(wert))`
    }
  ]
};
