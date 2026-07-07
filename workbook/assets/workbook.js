/* ============================================================
   Python-Workbook – interaktive Funktionen
   (reines Vanilla-JS, funktioniert auch offline)
   ============================================================ */

document.addEventListener("DOMContentLoaded", function () {
  hebeCodeHervor();
  initQuiz();
  initChecklisten();
  initNachOben();
});

/* ---------- 1. Einfache Python-Syntax-Hervorhebung ---------- */

function hebeCodeHervor() {
  var bloecke = document.querySelectorAll("pre.code");

  var schluesselwoerter = /\b(def|return|if|elif|else|for|while|in|and|or|not|from|import|break|continue|pass|as)\b/;
  var eingebaute = /\b(print|input|int|float|str|range|round|list|randint|len|type)\b(?=\s*\()/;
  var boolwerte = /\b(True|False|None)\b/;
  var zahl = /\b\d+(?:\.\d+)?\b/;

  bloecke.forEach(function (pre) {
    var text = pre.textContent;
    var html = "";
    var i = 0;

    while (i < text.length) {
      var rest = text.slice(i);

      // Kommentar bis Zeilenende
      if (rest[0] === "#") {
        var ende = rest.indexOf("\n");
        if (ende === -1) ende = rest.length;
        html += span("tok-com", rest.slice(0, ende));
        i += ende;
        continue;
      }

      // Zeichenkette (einfache oder doppelte Anführungszeichen)
      if (rest[0] === '"' || rest[0] === "'") {
        var q = rest[0];
        var j = 1;
        while (j < rest.length && rest[j] !== q && rest[j] !== "\n") j++;
        if (j < rest.length && rest[j] === q) j++;
        html += span("tok-str", rest.slice(0, j));
        i += j;
        continue;
      }

      // Wort oder Zahl am Anfang?
      var m;
      if ((m = rest.match(/^[A-Za-z_][A-Za-z0-9_]*/))) {
        var wort = m[0];
        var nach = rest.slice(wort.length);
        if (schluesselwoerter.test(wort) && wort.match(schluesselwoerter)[0] === wort) {
          html += span("tok-kw", wort);
        } else if (boolwerte.test(wort) && wort.match(boolwerte)[0] === wort) {
          html += span("tok-bool", wort);
        } else if (/^\s*\(/.test(nach) && eingebaute.test(wort + "(")) {
          html += span("tok-fn", wort);
        } else {
          html += escapeHtml(wort);
        }
        i += wort.length;
        continue;
      }

      if ((m = rest.match(/^\d+(?:\.\d+)?/))) {
        html += span("tok-num", m[0]);
        i += m[0].length;
        continue;
      }

      html += escapeHtml(rest[0]);
      i += 1;
    }

    pre.innerHTML = html;
  });

  function span(klasse, inhalt) {
    return '<span class="' + klasse + '">' + escapeHtml(inhalt) + "</span>";
  }

  function escapeHtml(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
}

/* ---------- 2. Multiple-Choice-Quiz ---------- */

function initQuiz() {
  document.querySelectorAll(".quiz").forEach(function (quiz) {
    var feedback = quiz.querySelector(".quiz-feedback");
    var buttons = quiz.querySelectorAll("button.antwort");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("richtig", "falsch"); });

        if (btn.hasAttribute("data-richtig")) {
          btn.classList.add("richtig");
          feedback.textContent = "✔ Richtig! " + (quiz.getAttribute("data-erklaerung") || "");
          feedback.className = "quiz-feedback ok";
        } else {
          btn.classList.add("falsch");
          feedback.textContent = "✘ Leider falsch – probieren Sie es noch einmal.";
          feedback.className = "quiz-feedback nok";
        }
      });
    });
  });
}

/* ---------- 3. Ich-kann-Checklisten (mit Speicherung) ---------- */

function initChecklisten() {
  document.querySelectorAll(".checkliste").forEach(function (liste) {
    var boxen = liste.querySelectorAll('input[type="checkbox"][id]');
    var balken = liste.querySelector(".fortschritt .balken > span");
    var zaehler = liste.querySelector(".fortschritt .zaehler");

    boxen.forEach(function (box) {
      // gespeicherten Zustand laden
      if (localStorage.getItem("pywb-" + box.id) === "1") {
        box.checked = true;
        box.closest("label").classList.add("erledigt");
      }

      box.addEventListener("change", function () {
        localStorage.setItem("pywb-" + box.id, box.checked ? "1" : "0");
        box.closest("label").classList.toggle("erledigt", box.checked);
        aktualisiere();
      });
    });

    function aktualisiere() {
      if (!balken) return;
      var gesamt = boxen.length;
      var fertig = liste.querySelectorAll('input[type="checkbox"]:checked').length;
      balken.style.width = (gesamt ? (100 * fertig / gesamt) : 0) + "%";
      if (zaehler) zaehler.textContent = fertig + " von " + gesamt;
    }

    aktualisiere();
  });
}

/* ---------- 4. Nach-oben-Button ---------- */

function initNachOben() {
  var knopf = document.querySelector(".nach-oben");
  if (!knopf) return;

  window.addEventListener("scroll", function () {
    knopf.classList.toggle("sichtbar", window.scrollY > 600);
  });
}
