/* ============================================================
   Kara-Simulator – interaktive Kara-Welt für Kapitel 1
   (reines Vanilla-JS, funktioniert offline)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  var wurzel = document.getElementById("kara-sim");
  if (!wurzel) return;

  /* ---------- Szenarien ---------- */
  /* Richtungen: 0 = Ost, 1 = Süd, 2 = West, 3 = Nord */

  var SZENARIEN = {
    frei: {
      titel: "Freies Ausprobieren (Steuerung per Knopf)",
      cols: 9, rows: 5,
      kara: { x: 1, y: 2, dir: 0 },
      baeume: [[4, 1], [6, 3], [8, 0]],
      blaetter: [[3, 2], [6, 1], [2, 4]],
      code: null,
      hinweis: "Steuern Sie Kara mit den Knöpfen unten. Was passiert, wenn er gegen einen Baum läuft?"
    },

    sequenz: {
      titel: "Sequenz: Pfad ablaufen",
      cols: 7, rows: 5,
      kara: { x: 1, y: 1, dir: 0 },
      baeume: [],
      blaetter: [],
      code: [
        "kara.move()",
        "kara.move()",
        "kara.move()",
        "kara.turnRight()",
        "kara.move()",
        "kara.move()",
        "kara.turnLeft()"
      ],
      programm: function* (k, ui) {
        ui.hl(0); k.move(); yield;
        ui.hl(1); k.move(); yield;
        ui.hl(2); k.move(); yield;
        ui.hl(3); k.turnRight(); yield;
        ui.hl(4); k.move(); yield;
        ui.hl(5); k.move(); yield;
        ui.hl(6); k.turnLeft(); yield;
        ui.info("Fertig! Jede Anweisung wurde genau einmal ausgeführt.");
      }
    },

    forschleife: {
      titel: "for-Schleife: 5 Schritte gehen",
      cols: 8, rows: 3,
      kara: { x: 0, y: 1, dir: 0 },
      baeume: [],
      blaetter: [],
      code: [
        "for i in range(0, 5):",
        "    kara.move()"
      ],
      programm: function* (k, ui) {
        for (var i = 0; i < 5; i++) {
          ui.hl(0); ui.info("Schleifenkopf: i = " + i); yield;
          ui.hl(1); k.move(); ui.info("Schleifenkörper: kara.move()  (i = " + i + ")"); yield;
        }
        ui.hl(-1);
        ui.info("Fertig! range(0, 5) ergab die Werte 0, 1, 2, 3, 4 – also 5 Durchläufe.");
      }
    },

    whileschleife: {
      titel: "while-Schleife: bis zum Baum laufen",
      cols: 9, rows: 3,
      kara: { x: 0, y: 1, dir: 0 },
      baeume: [[7, 1]],
      blaetter: [],
      code: [
        "while not kara.treeFront():",
        "    kara.move()"
      ],
      programm: function* (k, ui) {
        while (true) {
          var frei = !k.treeFront();
          ui.hl(0);
          ui.info("Bedingung geprüft: not kara.treeFront() ist " + (frei ? "wahr → weiter" : "falsch → Schleife endet"));
          yield;
          if (!frei) break;
          ui.hl(1); k.move(); yield;
        }
        ui.hl(-1);
        ui.info("Fertig! Kara steht direkt vor dem Baum – die Bedingung wurde zuerst geprüft, dann gelaufen.");
      }
    },

    sammler: {
      titel: "while + Alternative: Blätter sammeln",
      cols: 9, rows: 3,
      kara: { x: 0, y: 1, dir: 0 },
      baeume: [[8, 1]],
      blaetter: [[2, 1], [4, 1], [5, 1], [7, 1]],
      code: [
        "while not kara.treeFront():",
        "    if kara.onLeaf():",
        "        kara.removeLeaf()",
        "    kara.move()",
        "",
        "if kara.onLeaf():",
        "    kara.removeLeaf()"
      ],
      programm: function* (k, ui) {
        while (true) {
          var frei = !k.treeFront();
          ui.hl(0);
          ui.info("while-Bedingung: " + (frei ? "wahr" : "falsch → Schleife endet"));
          yield;
          if (!frei) break;
          var blatt = k.onLeaf();
          ui.hl(1);
          ui.info("if-Bedingung: kara.onLeaf() ist " + (blatt ? "wahr → Blatt aufheben" : "falsch → nichts tun"));
          yield;
          if (blatt) { ui.hl(2); k.removeLeaf(); yield; }
          ui.hl(3); k.move(); yield;
        }
        var blattEnde = k.onLeaf();
        ui.hl(5);
        ui.info("Letzte Prüfung vor dem Baum: kara.onLeaf() ist " + (blattEnde ? "wahr" : "falsch"));
        yield;
        if (blattEnde) { ui.hl(6); k.removeLeaf(); yield; }
        ui.hl(-1);
        ui.info("Fertig! Alle Blätter eingesammelt – Schleife und Alternative arbeiten zusammen.");
      }
    }
  };

  /* ---------- Zustand ---------- */

  var aktiv = null;      // aktuelles Szenario-Objekt
  var welt = null;       // Weltzustand
  var lauf = null;       // Generator des laufenden Programms
  var timer = null;      // Interval fürs Abspielen

  /* ---------- DOM-Elemente ---------- */

  var elWelt = document.getElementById("kara-welt");
  var elCode = document.getElementById("kara-code");
  var elInfo = document.getElementById("kara-info");
  var elWahl = document.getElementById("kara-szenario");
  var btStep = document.getElementById("kara-step");
  var btPlay = document.getElementById("kara-play");
  var btReset = document.getElementById("kara-reset");
  var elManuell = document.getElementById("kara-manuell");

  /* ---------- Welt-Logik ---------- */

  function key(x, y) { return x + "," + y; }

  function erzeugeWelt(def) {
    var b = {}, l = {};
    def.baeume.forEach(function (p) { b[key(p[0], p[1])] = true; });
    def.blaetter.forEach(function (p) { l[key(p[0], p[1])] = true; });
    return {
      cols: def.cols, rows: def.rows,
      x: def.kara.x, y: def.kara.y, dir: def.kara.dir,
      baeume: b, blaetter: l
    };
  }

  var DX = [1, 0, -1, 0];   // O, S, W, N
  var DY = [0, 1, 0, -1];

  function vorne() {
    return { x: welt.x + DX[welt.dir], y: welt.y + DY[welt.dir] };
  }

  function imFeld(p) {
    return p.x >= 0 && p.x < welt.cols && p.y >= 0 && p.y < welt.rows;
  }

  var kara = {
    move: function () {
      var z = vorne();
      if (!imFeld(z)) { melde("🧱 Autsch – Rand der Welt erreicht! Kara bleibt stehen."); return; }
      if (welt.baeume[key(z.x, z.y)]) { melde("🌳 Autsch – Kara kann nicht durch Bäume laufen!"); return; }
      welt.x = z.x; welt.y = z.y;
      zeichne();
    },
    turnLeft: function () { welt.dir = (welt.dir + 3) % 4; zeichne(); },
    turnRight: function () { welt.dir = (welt.dir + 1) % 4; zeichne(); },
    putLeaf: function () {
      if (welt.blaetter[key(welt.x, welt.y)]) { melde("🍀 Hier liegt schon ein Blatt."); return; }
      welt.blaetter[key(welt.x, welt.y)] = true; zeichne();
    },
    removeLeaf: function () {
      if (!welt.blaetter[key(welt.x, welt.y)]) { melde("Hier liegt kein Blatt zum Aufheben."); return; }
      delete welt.blaetter[key(welt.x, welt.y)]; zeichne();
    },
    treeFront: function () {
      var z = vorne();
      return imFeld(z) && !!welt.baeume[key(z.x, z.y)];
    },
    onLeaf: function () { return !!welt.blaetter[key(welt.x, welt.y)]; }
  };

  /* ---------- Anzeige ---------- */

  function zeichne() {
    var html = "";
    for (var y = 0; y < welt.rows; y++) {
      for (var x = 0; x < welt.cols; x++) {
        var inhalt = "";
        if (welt.baeume[key(x, y)]) inhalt = "🌳";
        else if (welt.blaetter[key(x, y)]) inhalt = "🍀";
        var karaHier = (welt.x === x && welt.y === y);
        html += '<div class="kara-zelle">' + inhalt;
        if (karaHier) {
          var deg = (welt.dir + 1) * 90;   // Käfer-Emoji zeigt nach Norden
          html += '<span class="kara-figur" style="transform:rotate(' + deg + 'deg)">🐞</span>';
        }
        html += "</div>";
      }
    }
    elWelt.style.gridTemplateColumns = "repeat(" + welt.cols + ", var(--kara-feld))";
    elWelt.innerHTML = html;
  }

  function zeigeCode() {
    if (!aktiv.code) {
      elCode.innerHTML = '<div class="kara-code-zeile">— kein Programm, freie Steuerung —</div>';
      return;
    }
    elCode.innerHTML = aktiv.code.map(function (zeile, i) {
      return '<div class="kara-code-zeile" data-zeile="' + i + '">' +
        (zeile === "" ? "&nbsp;" : zeile.replace(/&/g, "&amp;").replace(/</g, "&lt;")) + "</div>";
    }).join("");
  }

  var ui = {
    hl: function (zeile) {
      elCode.querySelectorAll(".kara-code-zeile").forEach(function (el) {
        el.classList.toggle("aktiv", el.getAttribute("data-zeile") == zeile);
      });
    },
    info: function (text) { elInfo.textContent = text; }
  };

  function melde(text) { elInfo.textContent = text; }

  /* ---------- Steuerung ---------- */

  function stoppeAbspielen() {
    if (timer) { clearInterval(timer); timer = null; }
    btPlay.textContent = "▶▶ Abspielen";
  }

  function setzeZurueck() {
    stoppeAbspielen();
    welt = erzeugeWelt(aktiv);
    lauf = aktiv.programm ? aktiv.programm(kara, ui) : null;
    zeigeCode();
    ui.hl(-1);
    elInfo.textContent = aktiv.hinweis || "Klicken Sie auf „Schritt“ oder „Abspielen“ und beobachten Sie Kara.";
    zeichne();
  }

  function schritt() {
    if (!lauf) return;
    var erg = lauf.next();
    if (erg.done) {
      stoppeAbspielen();
      lauf = null;
      btStep.disabled = true;
      btPlay.disabled = true;
    }
  }

  function waehle(idKey) {
    aktiv = SZENARIEN[idKey];
    var hatProgramm = !!aktiv.programm;
    btStep.disabled = !hatProgramm;
    btPlay.disabled = !hatProgramm;
    elManuell.style.display = hatProgramm ? "none" : "flex";
    setzeZurueck();
  }

  /* ---------- Ereignisse ---------- */

  elWahl.addEventListener("change", function () { waehle(elWahl.value); });

  btStep.addEventListener("click", function () { stoppeAbspielen(); schritt(); });

  btPlay.addEventListener("click", function () {
    if (timer) { stoppeAbspielen(); return; }
    btPlay.textContent = "⏸ Pause";
    timer = setInterval(schritt, 650);
  });

  btReset.addEventListener("click", function () {
    btStep.disabled = !aktiv.programm;
    btPlay.disabled = !aktiv.programm;
    setzeZurueck();
  });

  elManuell.querySelectorAll("button[data-befehl]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      elInfo.textContent = "kara." + btn.getAttribute("data-befehl") + "()";
      kara[btn.getAttribute("data-befehl")]();
    });
  });

  /* ---------- Start ---------- */

  waehle(elWahl.value);
});
