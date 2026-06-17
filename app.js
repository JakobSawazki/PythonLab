(() => {
  "use strict";

  const content = window.PYLAB_CONTENT;
  const storageKey = "pythonlab-v1";
  const legacyStorageKeys = ["pythonwerkstatt-bg-v1"];
  const backupAppId = "PythonLab";
  const acceptedBackupAppIds = new Set([backupAppId, "PythonWerkstatt BG"]);
  const main = document.querySelector("#mainContent");
  const sidebar = document.querySelector("#sidebar");
  const backdrop = document.querySelector("#mobileBackdrop");
  const profileDialog = document.querySelector("#profileDialog");
  const profileForm = document.querySelector("#profileForm");
  const profileName = document.querySelector("#profileName");
  const backupDialog = document.querySelector("#backupDialog");
  const progressFileInput = document.querySelector("#progressFileInput");
  const runtimeChip = document.querySelector("#runtimeChip");
  const runtimeText = document.querySelector("#runtimeText");
  const backupFormatVersion = 1;

  const defaultState = {
    name: "",
    xp: 0,
    completedLessons: [],
    completedExercises: [],
    completedStructograms: [],
    drafts: {},
    structogramDrafts: {},
    activityDates: [],
    lastLessonId: "sequenz"
  };

  const levels = [
    { min: 0, title: "Starter" },
    { min: 100, title: "Code-Entdecker" },
    { min: 250, title: "Pfadfinder" },
    { min: 450, title: "Problemlöser" },
    { min: 700, title: "Python-Profi" },
    { min: 1000, title: "Werkstattmeister" }
  ];

  let state = loadState();
  let exerciseFilter = "all";
  let worker = null;
  let workerReady = null;
  let pendingRuns = new Map();
  let requestCounter = 0;

  function uniqueAllowedStrings(values, allowedIds) {
    if (!Array.isArray(values)) {
      return [];
    }
    return [...new Set(values.filter((value) => typeof value === "string" && allowedIds.has(value)))];
  }

  function normalizeState(candidate = {}) {
    const lessonIds = new Set(content.lessons.map((lesson) => lesson.id));
    const exerciseIds = new Set(content.exercises.map((exercise) => exercise.id));
    const structogramIds = new Set(content.structograms.exercises.map((exercise) => exercise.id));
    const completedLessons = uniqueAllowedStrings(candidate.completedLessons, lessonIds);
    const completedExercises = uniqueAllowedStrings(candidate.completedExercises, exerciseIds);
    const completedStructograms = uniqueAllowedStrings(candidate.completedStructograms, structogramIds);
    const drafts = {};
    const structogramDrafts = {};

    Object.entries(candidate.drafts || {}).forEach(([id, value]) => {
      if (exerciseIds.has(id) && typeof value === "string") {
        drafts[id] = value.slice(0, 100000);
      }
    });

    Object.entries(candidate.structogramDrafts || {}).forEach(([id, value]) => {
      if (!structogramIds.has(id) || !value || typeof value !== "object") {
        return;
      }
      const cleanDraft = {};
      if (Array.isArray(value.order)) {
        cleanDraft.order = value.order.filter((item) => typeof item === "string").slice(0, 30);
      }
      if (value.answers && typeof value.answers === "object") {
        cleanDraft.answers = {};
        Object.entries(value.answers).forEach(([slot, answer]) => {
          if (typeof answer === "string") {
            cleanDraft.answers[slot] = answer.slice(0, 300);
          }
        });
      }
      structogramDrafts[id] = cleanDraft;
    });

    const xp =
      completedLessons.reduce((sum, id) => sum + (lessonById(id)?.xp || 0), 0) +
      completedExercises.reduce((sum, id) => sum + (exerciseById(id)?.xp || 0), 0) +
      completedStructograms.reduce((sum, id) => sum + (structogramExerciseById(id)?.xp || 0), 0);

    return {
      ...defaultState,
      name: typeof candidate.name === "string" ? candidate.name.trim().slice(0, 18) : "",
      xp,
      completedLessons,
      completedExercises,
      completedStructograms,
      drafts,
      structogramDrafts,
      activityDates: Array.isArray(candidate.activityDates)
        ? [...new Set(candidate.activityDates.filter((date) => /^\d{4}-\d{2}-\d{2}$/.test(date)))].slice(-90)
        : [],
      lastLessonId: lessonIds.has(candidate.lastLessonId) ? candidate.lastLessonId : "sequenz"
    };
  }

  function loadState() {
    try {
      const storedRaw = localStorage.getItem(storageKey) ||
        legacyStorageKeys.map((key) => localStorage.getItem(key)).find(Boolean);
      const stored = storedRaw ? JSON.parse(storedRaw) : null;
      return normalizeState(stored || {});
    } catch {
      return { ...defaultState };
    }
  }

  function saveState() {
    localStorage.setItem(storageKey, JSON.stringify(state));
    updateChrome();
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function inlineCode(value) {
    return escapeHtml(value).replace(/`([^`]+)`/g, "<code>$1</code>");
  }

  function difficultyLabel(value) {
    return { easy: "Grundlage", medium: "Vertiefung", plus: "Plus" }[value] || value;
  }

  function lessonById(id) {
    return content.lessons.find((lesson) => lesson.id === id);
  }

  function exerciseById(id) {
    return content.exercises.find((exercise) => exercise.id === id);
  }

  function moduleById(id) {
    return content.modules.find((module) => module.id === id);
  }

  function structogramExerciseById(id) {
    return content.structograms.exercises.find((exercise) => exercise.id === id);
  }

  function currentLevel() {
    let index = 0;
    levels.forEach((level, levelIndex) => {
      if (state.xp >= level.min) {
        index = levelIndex;
      }
    });
    const current = levels[index];
    const next = levels[index + 1];
    return {
      number: index + 1,
      title: current.title,
      currentMin: current.min,
      nextMin: next?.min ?? current.min,
      progress: next ? ((state.xp - current.min) / (next.min - current.min)) * 100 : 100
    };
  }

  function progressPercent(done, total) {
    return total ? Math.round((done / total) * 100) : 0;
  }

  function todayKey(date = new Date()) {
    return [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, "0"),
      String(date.getDate()).padStart(2, "0")
    ].join("-");
  }

  function markActivity() {
    const today = todayKey();
    if (!state.activityDates.includes(today)) {
      state.activityDates.push(today);
      state.activityDates = state.activityDates.slice(-90);
    }
  }

  function streak() {
    const dates = new Set(state.activityDates);
    let count = 0;
    const cursor = new Date();
    while (dates.has(todayKey(cursor))) {
      count += 1;
      cursor.setDate(cursor.getDate() - 1);
    }
    return count;
  }

  function award(kind, id, xp) {
    const keyByKind = {
      lesson: "completedLessons",
      exercise: "completedExercises",
      structogram: "completedStructograms"
    };
    const key = keyByKind[kind];
    if (!key) {
      return false;
    }
    if (state[key].includes(id)) {
      return false;
    }
    state[key].push(id);
    state.xp += xp;
    markActivity();
    saveState();
    toast(`+${xp} XP gesammelt`, "xp");
    return true;
  }

  function moduleProgress(module) {
    const done = module.lessonIds.filter((id) => state.completedLessons.includes(id)).length;
    return { done, total: module.lessonIds.length, percent: progressPercent(done, module.lessonIds.length) };
  }

  function nextLesson() {
    const incomplete = content.lessons.find((lesson) => !state.completedLessons.includes(lesson.id));
    return incomplete || content.lessons.at(-1);
  }

  function achievementUnlocked(achievement) {
    const condition = achievement.condition;
    if (condition.type === "lessons") {
      return state.completedLessons.length >= condition.value;
    }
    if (condition.type === "exercises") {
      return state.completedExercises.length >= condition.value;
    }
    if (condition.type === "structograms") {
      return state.completedStructograms.length >= condition.value;
    }
    if (condition.type === "allStructograms") {
      return state.completedStructograms.length === content.structograms.exercises.length;
    }
    if (condition.type === "module") {
      return moduleProgress(moduleById(condition.value)).percent === 100;
    }
    if (condition.type === "exerciseSet") {
      return condition.value.every((id) => state.completedExercises.includes(id));
    }
    if (condition.type === "lessonExercise") {
      const lesson = lessonById(condition.value);
      return state.completedLessons.includes(lesson.id) && state.completedExercises.includes(lesson.practiceId);
    }
    if (condition.type === "xp") {
      return state.xp >= condition.value;
    }
    if (condition.type === "all") {
      return state.completedLessons.length === content.lessons.length &&
        state.completedExercises.length === content.exercises.length;
    }
    return false;
  }

  function updateChrome() {
    const level = currentLevel();
    const displayName = state.name || "Gast";
    document.querySelector("#sidebarName").textContent = displayName;
    document.querySelector("#sidebarAvatar").textContent = displayName.slice(0, 1).toUpperCase();
    document.querySelector("#sidebarLevel").textContent = `Level ${level.number} · ${level.title}`;
    document.querySelector("#sidebarXpBar").style.width = `${Math.max(0, Math.min(100, level.progress))}%`;
    document.querySelector("#sidebarXpText").textContent = level.number === levels.length
      ? `${state.xp} XP · Höchstes Level`
      : `${state.xp} / ${level.nextMin} XP`;
    document.querySelector("#topXp").textContent = `${state.xp} XP`;
  }

  function setHeading(eyebrow, title) {
    document.querySelector("#viewEyebrow").textContent = eyebrow;
    document.querySelector("#viewTitle").textContent = title;
    document.title = `${title} · PythonLab`;
  }

  function closeMobileNav() {
    sidebar.classList.remove("is-open");
    backdrop.classList.remove("is-visible");
  }

  function activateNav(route) {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("is-active", item.dataset.route === route);
    });
  }

  function go(route) {
    window.location.hash = route;
    closeMobileNav();
  }

  function renderIcons() {
    window.lucide?.createIcons();
  }

  function lessonCard(lesson) {
    const completed = state.completedLessons.includes(lesson.id);
    return `
      <article class="lesson-card" tabindex="0" role="button" data-lesson="${lesson.id}" aria-label="${escapeHtml(lesson.title)} öffnen">
        <span class="lesson-state ${completed ? "is-done" : ""}">
          <i data-lucide="${completed ? "check" : "book-open"}"></i>
        </span>
        <span class="lesson-index">${lesson.index}</span>
        <h3>${escapeHtml(lesson.title)}</h3>
        <p>${escapeHtml(lesson.subtitle)}</p>
        <div class="lesson-meta">
          <span class="meta-pill"><i data-lucide="clock-3"></i>${lesson.duration} Min.</span>
          <span class="meta-pill difficulty-${lesson.difficulty}">${difficultyLabel(lesson.difficulty)}</span>
          <span class="meta-pill"><i data-lucide="sparkles"></i>${lesson.xp} XP</span>
        </div>
      </article>`;
  }

  function exerciseCard(exercise) {
    const completed = state.completedExercises.includes(exercise.id);
    return `
      <article class="exercise-card" tabindex="0" role="button" data-exercise="${exercise.id}" aria-label="${escapeHtml(exercise.title)} öffnen">
        <span class="lesson-state ${completed ? "is-done" : ""}">
          <i data-lucide="${completed ? "check" : "terminal"}"></i>
        </span>
        <span class="lesson-index">${lessonById(exercise.lessonId).index}</span>
        <h3>${escapeHtml(exercise.title)}</h3>
        <p>${escapeHtml(exercise.description)}</p>
        <div class="exercise-meta">
          <span class="meta-pill difficulty-${exercise.difficulty}">${difficultyLabel(exercise.difficulty)}</span>
          <span class="meta-pill"><i data-lucide="sparkles"></i>${exercise.xp} XP</span>
        </div>
      </article>`;
  }

  function structogramExerciseCard(exercise) {
    const completed = state.completedStructograms.includes(exercise.id);
    return `
      <article class="exercise-card structure-exercise-card" tabindex="0" role="button"
        data-structogram="${exercise.id}" aria-label="${escapeHtml(exercise.title)} öffnen">
        <span class="lesson-state ${completed ? "is-done" : ""}">
          <i data-lucide="${completed ? "check" : "workflow"}"></i>
        </span>
        <span class="lesson-index">${exercise.number}</span>
        <h3>${escapeHtml(exercise.title)}</h3>
        <p>${escapeHtml(exercise.description)}</p>
        <div class="exercise-meta">
          <span class="meta-pill difficulty-${exercise.difficulty}">${difficultyLabel(exercise.difficulty)}</span>
          <span class="meta-pill"><i data-lucide="sparkles"></i>${exercise.xp} XP</span>
        </div>
      </article>`;
  }

  function renderStructureValue(value, exercise, answers = {}) {
    if (typeof value === "string") {
      return `<span>${escapeHtml(value)}</span>`;
    }
    if (!value?.slot || !exercise?.slots?.[value.slot]) {
      return "<span>...</span>";
    }
    const slot = exercise.slots[value.slot];
    const selected = answers[value.slot] || "";
    return `
      <label class="structure-slot ${slot.prefix ? "has-prefix" : ""}">
        <span class="sr-only">${escapeHtml(slot.label)}</span>
        ${slot.prefix ? `<span class="structure-slot-prefix">${escapeHtml(slot.prefix)}</span>` : ""}
        <select data-structure-slot="${value.slot}" aria-label="${escapeHtml(slot.label)}"
          title="${escapeHtml(selected || slot.label)}">
          <option value="">Bitte wählen ...</option>
          ${slot.options.map((option) => `
            <option value="${escapeHtml(option)}" ${selected === option ? "selected" : ""}>${escapeHtml(option)}</option>
          `).join("")}
        </select>
      </label>`;
  }

  function renderStructureNodes(nodes, exercise = null, answers = {}) {
    return nodes.map((node) => {
      if (node.type === "statement") {
        return `<div class="stg-statement">${renderStructureValue(node.text, exercise, answers)}</div>`;
      }
      if (node.type === "if") {
        const hasNoBranch = Array.isArray(node.no) && node.no.length > 0;
        return `
          <div class="stg-decision ${hasNoBranch ? "" : "is-one-sided"}">
            <div class="stg-decision-head">
              <strong>${renderStructureValue(node.condition, exercise, answers)}</strong>
              <span class="stg-diagonal is-left"></span>
              <span class="stg-diagonal is-right"></span>
              <span class="stg-branch-label is-yes">J</span>
              <span class="stg-branch-label is-no">N</span>
            </div>
            <div class="stg-branches ${hasNoBranch ? "" : "is-one-sided"}">
              <div class="stg-branch">${renderStructureNodes(node.yes || [], exercise, answers)}</div>
              ${hasNoBranch
                ? `<div class="stg-branch">${renderStructureNodes(node.no, exercise, answers)}</div>`
                : `<div class="stg-branch is-empty"><span>keine Anweisung</span></div>`}
            </div>
          </div>`;
      }
      if (node.type === "loop") {
        return `
          <div class="stg-loop stg-loop-${node.loopType}">
            <div class="stg-loop-head">
              <span class="stg-loop-kind">${node.loopType === "for" ? "Zählergesteuert" : "Kopfgesteuert"}</span>
              <strong>${renderStructureValue(node.header, exercise, answers)}</strong>
            </div>
            <div class="stg-loop-body">${renderStructureNodes(node.body || [], exercise, answers)}</div>
          </div>`;
      }
      return "";
    }).join("");
  }

  function renderStructogram(diagram, exercise = null, answers = {}) {
    return `<div class="stg-diagram">${renderStructureNodes(diagram, exercise, answers)}</div>`;
  }

  function renderHome() {
    setHeading("Deine Lernzentrale", "Übersicht");
    activateNav("home");
    const lesson = nextLesson();
    const lessonProgress = progressPercent(state.completedLessons.length, content.lessons.length);
    const unlocked = content.achievements.filter(achievementUnlocked).length;
    main.innerHTML = `
      <section class="hero-band">
        <div class="hero-content">
          <p class="eyebrow">Python in deinem Tempo</p>
          <h2>${state.name ? `Weiter geht's, ${escapeHtml(state.name)}.` : "Verstehen. Ausprobieren. Dranbleiben."}</h2>
          <p>Arbeite dich in kleinen Schritten von den ersten Ausgaben bis zu eigenen Funktionen vor. Jede Lektion führt direkt zu einer Aufgabe, die du im Browser ausprobieren kannst.</p>
          <div class="hero-actions">
            <button class="button button-primary" type="button" data-lesson="${lesson.id}">
              <i data-lucide="play"></i>
              ${state.completedLessons.length ? "Weiterlernen" : "Lernpfad starten"}
            </button>
            <button class="button button-secondary" type="button" data-route="practice">
              <i data-lucide="code-2"></i>
              Aufgaben öffnen
            </button>
          </div>
        </div>
      </section>

      <section class="stats-grid" aria-label="Lernstatistik">
        <div class="stat-item">
          <span class="stat-icon"><i data-lucide="book-check"></i></span>
          <div><strong>${state.completedLessons.length} / ${content.lessons.length}</strong><small>Lektionen</small></div>
        </div>
        <div class="stat-item">
          <span class="stat-icon is-blue"><i data-lucide="square-terminal"></i></span>
          <div><strong>${state.completedExercises.length} / ${content.exercises.length}</strong><small>Aufgaben gelöst</small></div>
        </div>
        <div class="stat-item">
          <span class="stat-icon is-yellow"><i data-lucide="trophy"></i></span>
          <div><strong>${unlocked} / ${content.achievements.length}</strong><small>Erfolge</small></div>
        </div>
        <div class="stat-item">
          <span class="stat-icon is-coral"><i data-lucide="flame"></i></span>
          <div><strong>${streak()} ${streak() === 1 ? "Tag" : "Tage"}</strong><small>Aktuelle Serie</small></div>
        </div>
      </section>

      <section class="structure-promo">
        <div>
          <p class="eyebrow">Bildungsplan-Werkzeug</p>
          <h2>Algorithmen als Struktogramm denken</h2>
          <p>Plane Sequenzen, Entscheidungen und Schleifen zunächst unabhängig von Python. Fünf interaktive Aufgaben führen von der Grundform bis zur geschachtelten Alternative.</p>
          <div class="lesson-meta">
            <span class="meta-pill"><i data-lucide="workflow"></i>${state.completedStructograms.length} / ${content.structograms.exercises.length} gelöst</span>
            <span class="meta-pill"><i data-lucide="sparkles"></i>bis zu 200 XP</span>
          </div>
          <button class="button button-primary" type="button" data-route="structograms">
            <i data-lucide="arrow-right"></i>
            Struktogramm-Labor öffnen
          </button>
        </div>
        <div class="structure-promo-preview" aria-hidden="true">
          ${renderStructogram(content.structograms.examples[1].diagram)}
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div><h2>Dein nächster Schritt</h2><p>Die Lektionen bauen aufeinander auf, bleiben aber frei wählbar.</p></div>
        </div>
        <div class="continue-band">
          <div class="continue-main">
            <div class="lesson-meta">
              <span class="meta-pill">Lektion ${lesson.index}</span>
              <span class="meta-pill"><i data-lucide="clock-3"></i>${lesson.duration} Min.</span>
            </div>
            <h3>${escapeHtml(lesson.title)}</h3>
            <p>${escapeHtml(lesson.subtitle)}</p>
            <button class="button button-primary" type="button" data-lesson="${lesson.id}">
              <i data-lucide="arrow-right"></i>
              Lektion öffnen
            </button>
          </div>
          <div class="continue-progress">
            <small>Gesamtfortschritt</small>
            <strong>${lessonProgress} %</strong>
            <div class="progress-track"><span style="width:${lessonProgress}%"></span></div>
            <small>${state.completedLessons.length} von ${content.lessons.length} Lektionen abgeschlossen</small>
          </div>
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div><h2>Die fünf Etappen</h2><p>Vom sicheren Fundament bis zum kleinen Python-Projekt.</p></div>
          <button class="text-button" type="button" data-route="path">Gesamten Lernpfad <i data-lucide="arrow-right"></i></button>
        </div>
        <div class="module-grid">
          ${content.modules.map((module) => {
            const progress = moduleProgress(module);
            return `
              <article class="module-card">
                <span class="module-number">${module.number}</span>
                <h3>${escapeHtml(module.title)}</h3>
                <p>${escapeHtml(module.description)}</p>
                <div class="progress-track"><span style="width:${progress.percent}%"></span></div>
                <div class="module-footer"><span>${progress.done}/${progress.total} Lektionen</span><strong>${progress.percent} %</strong></div>
              </article>`;
          }).join("")}
        </div>
      </section>`;
  }

  function renderPath() {
    setHeading("BPE 5 · Grundlagen der Programmierung", "Lernpfad");
    activateNav("path");
    main.innerHTML = `
      <p class="view-intro">Beginne mit den Grundlagen und arbeite dich Schritt für Schritt vor. Bereits bekannte Themen kannst du direkt öffnen.</p>
      ${content.modules.map((module) => {
        const lessons = module.lessonIds.map(lessonById);
        const progress = moduleProgress(module);
        return `
          <section class="content-section">
            <div class="section-heading">
              <div>
                <p class="eyebrow">Etappe ${module.number}</p>
                <h2>${escapeHtml(module.title)}</h2>
                <p>${escapeHtml(module.description)}</p>
              </div>
              <strong>${progress.percent} %</strong>
            </div>
            <div class="lesson-grid">${lessons.map(lessonCard).join("")}</div>
          </section>`;
      }).join("")}`;
  }

  function renderPractice() {
    setHeading("Selbst programmieren", "Üben");
    activateNav("practice");
    const filtered = exerciseFilter === "all"
      ? content.exercises
      : content.exercises.filter((exercise) => exercise.difficulty === exerciseFilter);
    main.innerHTML = `
      <p class="view-intro">Wähle eine Aufgabe, schreibe den Code selbst und lass deine Lösung automatisch prüfen. Fehler gehören dazu: Lies die Meldung, ändere eine Sache und probiere erneut.</p>
      <div class="filters" aria-label="Aufgaben filtern">
        ${[
          ["all", "Alle Aufgaben"],
          ["easy", "Grundlagen"],
          ["medium", "Vertiefung"],
          ["plus", "Python Plus"]
        ].map(([value, label]) => `
          <button class="filter-button ${exerciseFilter === value ? "is-active" : ""}" type="button" data-filter="${value}">${label}</button>
        `).join("")}
      </div>
      <div class="exercise-grid">${filtered.map(exerciseCard).join("")}</div>`;
  }

  function renderStructograms() {
    setHeading("Planen vor dem Programmieren", "Struktogramme");
    activateNav("structograms");
    const total = content.structograms.exercises.length;
    const done = state.completedStructograms.length;
    const percent = progressPercent(done, total);
    main.innerHTML = `
      <section class="structure-lead">
        <div>
          <p class="eyebrow">Nassi-Shneiderman-Diagramme</p>
          <h2>Erst den Ablauf klären, dann Python schreiben.</h2>
          <p>Ein Struktogramm beschreibt einen Algorithmus mit ineinander gesetzten Blöcken. Es zeigt Reihenfolge, Auswahl und Wiederholung, ohne sich an die Schreibweise einer Programmiersprache zu binden.</p>
          <div class="button-row">
            <button class="button button-primary" type="button"
              data-structogram="${content.structograms.exercises.find((exercise) => !state.completedStructograms.includes(exercise.id))?.id || content.structograms.exercises[0].id}">
              <i data-lucide="play"></i>
              ${done ? "Weiterüben" : "Erste Aufgabe starten"}
            </button>
            <a class="button button-secondary" href="https://www.schule-bw.de/faecher-und-schularten/mathematisch-naturwissenschaftliche-faecher/informatik/material/materialien-zum-neuen-bildungsplan-informatik-an-den-nichtgewerblichen-beruflichen-gymnasien/operatorenliste-fuer-struktogramme-v2-2.pdf"
              target="_blank" rel="noreferrer">
              <i data-lucide="file-text"></i>
              Offizielle Operatorenliste
            </a>
          </div>
        </div>
        <div class="structure-progress-panel">
          <small>Dein Fortschritt</small>
          <strong>${percent} %</strong>
          <div class="progress-track"><span style="width:${percent}%"></span></div>
          <span>${done} von ${total} Aufgaben gelöst</span>
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div>
            <h2>Die Bausteine lesen</h2>
            <p>Die Form zeigt die Kontrollstruktur, der Text beschreibt die konkrete Handlung.</p>
          </div>
        </div>
        <div class="operator-grid">
          ${content.structograms.operators.map((operator) => `
            <article class="operator-item">
              <span class="stat-icon"><i data-lucide="${operator.icon}"></i></span>
              <div>
                <h3>${escapeHtml(operator.title)}</h3>
                <code>${escapeHtml(operator.syntax)}</code>
                <p>${escapeHtml(operator.example)}</p>
              </div>
            </article>`).join("")}
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div>
            <h2>Fünf Grundformen</h2>
            <p>Vergleiche das sprachneutrale Struktogramm jeweils mit dem passenden Python-Code.</p>
          </div>
        </div>
        <div class="structure-example-list">
          ${content.structograms.examples.map((example, index) => `
            <article class="structure-example">
              <div class="structure-example-heading">
                <span class="module-number">${String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>${escapeHtml(example.title)}</h3>
                  <p>${escapeHtml(example.description)}</p>
                </div>
              </div>
              <div class="structure-compare">
                <div>
                  <span class="compare-label">Struktogramm</span>
                  ${renderStructogram(example.diagram)}
                </div>
                <div>
                  <span class="compare-label">Python</span>
                  <pre class="code-example"><code>${escapeHtml(example.python)}</code></pre>
                </div>
              </div>
            </article>`).join("")}
        </div>
      </section>

      <section class="content-section">
        <div class="section-heading">
          <div>
            <h2>Jetzt selbst planen</h2>
            <p>Die Aufgaben werden automatisch geprüft und vergeben XP nur beim ersten erfolgreichen Abschluss.</p>
          </div>
        </div>
        <div class="exercise-grid">${content.structograms.exercises.map(structogramExerciseCard).join("")}</div>
      </section>

      <section class="structure-tool-note">
        <div>
          <p class="eyebrow">Freies Zeichnen</p>
          <h2>Struktogrammer Web</h2>
          <p>Für umfangreichere freie Zeichnungen öffnet PythonLab den Struktogrammer Web als Schwesterprojekt. Das Labor hier im Portal dient zum Verstehen und Üben direkt im Browser.</p>
        </div>
        <a class="button button-secondary" href="https://jakobsawazki.github.io/struktogrammer-web/"
          target="_blank" rel="noreferrer">
          <i data-lucide="external-link"></i>
          Struktogrammer öffnen
        </a>
      </section>`;
  }

  function getStructogramDraft(exercise) {
    if (exercise.type === "order") {
      const storedOrder = state.structogramDrafts[exercise.id]?.order;
      const valid = Array.isArray(storedOrder) &&
        storedOrder.length === exercise.blocks.length &&
        storedOrder.every((id) => exercise.blocks.some((block) => block.id === id));
      return { order: valid ? storedOrder : exercise.blocks.map((block) => block.id) };
    }
    return { answers: state.structogramDrafts[exercise.id]?.answers || {} };
  }

  function renderOrderDiagram(exercise, order) {
    const blockById = new Map(exercise.blocks.map((block) => [block.id, block]));
    return `
      <div class="order-workspace">
        ${order.map((id, index) => {
          const block = blockById.get(id);
          return `
            <div class="order-block">
              <span class="order-number">${index + 1}</span>
              <span>${escapeHtml(block.text)}</span>
              <div class="order-controls">
                <button class="icon-button" type="button" data-order-action="up" data-block-id="${id}"
                  title="Nach oben" aria-label="${escapeHtml(block.text)} nach oben" ${index === 0 ? "disabled" : ""}>
                  <i data-lucide="arrow-up"></i>
                </button>
                <button class="icon-button" type="button" data-order-action="down" data-block-id="${id}"
                  title="Nach unten" aria-label="${escapeHtml(block.text)} nach unten" ${index === order.length - 1 ? "disabled" : ""}>
                  <i data-lucide="arrow-down"></i>
                </button>
              </div>
            </div>`;
        }).join("")}
      </div>`;
  }

  function renderStructogramExercise(id) {
    const exercise = structogramExerciseById(id);
    if (!exercise) {
      go("structograms");
      return;
    }
    setHeading(`Struktogramm-Aufgabe ${exercise.number}`, exercise.title);
    activateNav("structograms");
    const draft = getStructogramDraft(exercise);
    const completed = state.completedStructograms.includes(exercise.id);
    main.innerHTML = `
      <button class="text-button back-button" type="button" data-route="structograms">
        <i data-lucide="arrow-left"></i>
        Zum Struktogramm-Labor
      </button>
      <div class="structure-workspace">
        <aside class="structure-brief">
          <div class="exercise-meta">
            <span class="meta-pill difficulty-${exercise.difficulty}">${difficultyLabel(exercise.difficulty)}</span>
            <span class="meta-pill"><i data-lucide="sparkles"></i>${exercise.xp} XP</span>
          </div>
          <h2>${escapeHtml(exercise.title)}</h2>
          <p>${escapeHtml(exercise.description)}</p>
          <ol>${exercise.instructions.map((instruction) => `<li>${escapeHtml(instruction)}</li>`).join("")}</ol>
          <div class="callout">
            <i data-lucide="lightbulb"></i>
            <p>Arbeite vom Problem aus: Welche Werte werden zuerst benötigt, welche Struktur steuert den Ablauf und in welchen Block gehört jede Anweisung?</p>
          </div>
        </aside>
        <section class="structure-canvas-panel">
          <div class="structure-canvas-heading">
            <div>
              <p class="eyebrow">${exercise.type === "order" ? "Reihenfolge festlegen" : "Bausteine auswählen"}</p>
              <h3>Dein Struktogramm</h3>
            </div>
            ${completed ? `<span class="completion-chip"><i data-lucide="circle-check"></i> Gelöst</span>` : ""}
          </div>
          ${exercise.type === "order"
            ? renderOrderDiagram(exercise, draft.order)
            : renderStructogram(exercise.diagram, exercise, draft.answers)}
          <div class="structure-actions">
            <button class="button button-secondary" type="button" id="resetStructureButton">
              <i data-lucide="rotate-ccw"></i>
              Zurücksetzen
            </button>
            <button class="button button-primary" type="button" id="checkStructureButton">
              <i data-lucide="badge-check"></i>
              Struktogramm prüfen
            </button>
          </div>
          <div class="result-banner" id="resultBanner"></div>
        </section>
      </div>`;
  }

  function renderAchievements() {
    setHeading("Deine Meilensteine", "Erfolge");
    activateNav("achievements");
    const unlocked = content.achievements.filter(achievementUnlocked).length;
    main.innerHTML = `
      <p class="view-intro">${unlocked} von ${content.achievements.length} Erfolgen sind freigeschaltet. Sie entstehen automatisch durch abgeschlossene Lektionen, gelöste Aufgaben und gesammelte XP.</p>
      <div class="achievement-grid">
        ${content.achievements.map((achievement) => {
          const isUnlocked = achievementUnlocked(achievement);
          return `
            <article class="achievement-card ${isUnlocked ? "" : "is-locked"}">
              <span class="achievement-icon"><i data-lucide="${isUnlocked ? achievement.icon : "lock-keyhole"}"></i></span>
              <h3>${escapeHtml(achievement.title)}</h3>
              <p>${escapeHtml(achievement.description)}</p>
              <span class="achievement-status">${isUnlocked ? "Freigeschaltet" : "Noch gesperrt"}</span>
            </article>`;
        }).join("")}
      </div>`;
  }

  function renderReference() {
    setHeading("Werkzeuge und Syntax", "Nachschlagen");
    activateNav("reference");
    main.innerHTML = `
      <p class="view-intro">Hier findest du die schulisch bereitgestellten Hilfsmittel, den eingebundenen Struktogrammer Web und kurze Muster für die wichtigsten Python-Sprachelemente.</p>
      <section class="tools-band">
        <div class="section-heading">
          <div>
            <p class="eyebrow">Am Schul-PC</p>
            <h2>Erlaubte Hilfsmittel</h2>
            <p>Thonny und der hus Struktogrammer sind installiert und zusätzlich über den Informatik-Stick verfügbar; der Struktogrammer Web ist als lokales Schwesterprojekt verlinkt.</p>
          </div>
        </div>
        <div class="tool-grid">
          ${content.tools.map((tool) => `
            <article class="tool-item">
              <span class="tool-icon"><i data-lucide="${tool.icon}"></i></span>
              <h3>${escapeHtml(tool.title)}</h3>
              <p>${escapeHtml(tool.description)}</p>
              <small>${escapeHtml(tool.note)}</small>
              ${tool.url ? `
                <a class="text-button" href="${tool.url}" target="_blank" rel="noreferrer">
                  Projektseite <i data-lucide="external-link"></i>
                </a>` : ""}
            </article>`).join("")}
        </div>
        <div class="callout is-warning">
          <i data-lucide="badge-check"></i>
          <p>Diese Werkzeuge sind nach schulischer Vorgabe für den Informatikunterricht und die entsprechend freigegebenen Prüfungssituationen vorgesehen. Für schriftliche und mündliche Abiturprüfungen gelten stets die aktuellen Prüfungsanweisungen der Schule.</p>
        </div>
      </section>
      <section class="content-section">
        <div class="section-heading">
          <div><h2>Python kompakt</h2><p>Nutze die Muster als Erinnerung und passe Variablennamen und Werte an deine Aufgabe an.</p></div>
        </div>
      <div class="reference-grid">
        ${content.reference.map((item) => `
          <article class="reference-card">
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.description)}</p>
            <pre>${escapeHtml(item.code)}</pre>
          </article>`).join("")}
      </div>
      </section>`;
  }

  function renderLesson(id) {
    const lesson = lessonById(id);
    if (!lesson) {
      go("path");
      return;
    }
    state.lastLessonId = lesson.id;
    saveState();
    setHeading(`Lektion ${lesson.index}`, lesson.title);
    activateNav("path");
    const completed = state.completedLessons.includes(lesson.id);
    main.innerHTML = `
      <article class="lesson-detail">
        <header class="detail-header">
          <button class="text-button back-button" type="button" data-route="path"><i data-lucide="arrow-left"></i> Zum Lernpfad</button>
          <div class="lesson-meta">
            <span class="meta-pill difficulty-${lesson.difficulty}">${difficultyLabel(lesson.difficulty)}</span>
            <span class="meta-pill"><i data-lucide="clock-3"></i>${lesson.duration} Min.</span>
            <span class="meta-pill"><i data-lucide="sparkles"></i>${lesson.xp} XP</span>
          </div>
          <h2>${escapeHtml(lesson.title)}</h2>
          <p>${escapeHtml(lesson.subtitle)}</p>
        </header>

        <section class="objectives-band">
          <h3>Danach kannst du ...</h3>
          <ul>${lesson.objectives.map((objective) => `<li>${escapeHtml(objective)}</li>`).join("")}</ul>
        </section>

        ${lesson.sections.map((section) => `
          <section class="lesson-section">
            <h3>${escapeHtml(section.title)}</h3>
            <div class="lesson-copy">
              ${section.body.map((paragraph) => `<p>${inlineCode(paragraph)}</p>`).join("")}
              ${section.code ? `<pre class="code-example"><code>${escapeHtml(section.code)}</code></pre>` : ""}
              ${section.tip ? `<div class="callout"><i data-lucide="lightbulb"></i><p>${inlineCode(section.tip)}</p></div>` : ""}
              ${section.warning ? `<div class="callout is-warning"><i data-lucide="triangle-alert"></i><p>${inlineCode(section.warning)}</p></div>` : ""}
            </div>
          </section>`).join("")}

        <section class="quick-check">
          <p class="eyebrow">Kurz prüfen</p>
          <h3>${escapeHtml(lesson.quiz.question)}</h3>
          <form id="quizForm" data-lesson-id="${lesson.id}">
            <div class="answer-options">
              ${lesson.quiz.options.map((option, index) => `
                <label class="answer-option">
                  <input type="radio" name="quizAnswer" value="${index}">
                  <span>${escapeHtml(option)}</span>
                </label>`).join("")}
            </div>
            <button class="button button-primary" type="submit">
              <i data-lucide="check"></i>
              ${completed ? "Antwort prüfen" : "Lektion abschließen"}
            </button>
            <div class="feedback" id="quizFeedback"></div>
          </form>
        </section>

        <section class="content-section">
          <div class="section-heading">
            <div><h2>Jetzt selbst programmieren</h2><p>Wende das Gelernte direkt in einer kleinen Aufgabe an.</p></div>
          </div>
          <button class="button button-coral" type="button" data-exercise="${lesson.practiceId}">
            <i data-lucide="terminal"></i>
            Aufgabe öffnen
          </button>
        </section>
      </article>`;
  }

  function renderExercise(id) {
    const exercise = exerciseById(id);
    if (!exercise) {
      go("practice");
      return;
    }
    const lesson = lessonById(exercise.lessonId);
    const savedDraft = state.drafts[exercise.id];
    const code = savedDraft ?? exercise.starter;
    setHeading(`Aufgabe zu Lektion ${lesson.index}`, exercise.title);
    activateNav("practice");
    main.innerHTML = `
      <button class="text-button back-button" type="button" data-route="practice"><i data-lucide="arrow-left"></i> Zu allen Aufgaben</button>
      <div class="exercise-workspace">
        <aside class="exercise-brief">
          <div class="exercise-meta">
            <span class="meta-pill difficulty-${exercise.difficulty}">${difficultyLabel(exercise.difficulty)}</span>
            <span class="meta-pill"><i data-lucide="sparkles"></i>${exercise.xp} XP</span>
          </div>
          <h2>${escapeHtml(exercise.title)}</h2>
          <p>${escapeHtml(exercise.description)}</p>
          <ol>${exercise.instructions.map((instruction) => `<li>${inlineCode(instruction)}</li>`).join("")}</ol>
          <button class="text-button" type="button" data-lesson="${lesson.id}"><i data-lucide="book-open"></i> Erklärung noch einmal ansehen</button>
        </aside>

        <section>
          <div class="editor-shell">
            <div class="editor-toolbar">
              <strong>main.py</strong>
              <button class="icon-button" id="resetCodeButton" type="button" title="Aufgabe zurücksetzen" aria-label="Aufgabe zurücksetzen">
                <i data-lucide="rotate-ccw"></i>
              </button>
            </div>
            <textarea class="code-editor" id="codeEditor" spellcheck="false" aria-label="Python-Code">${escapeHtml(code)}</textarea>
            <div class="runner-panel">
              <div class="runner-tabs">
                <button class="runner-tab is-active" type="button" data-runner-tab="output">Ausgabe</button>
                <button class="runner-tab" type="button" data-runner-tab="input">Eingabe</button>
              </div>
              <div class="runner-content is-active" data-runner-panel="output">
                <pre class="console-output" id="consoleOutput">Bereit. Starte deinen Code oder prüfe die Lösung.</pre>
              </div>
              <div class="runner-content" data-runner-panel="input">
                <textarea class="input-area" id="inputArea" spellcheck="false" aria-label="Eingaben für input">${escapeHtml(exercise.input || "")}</textarea>
              </div>
            </div>
            <div class="editor-actions">
              <button class="button button-secondary" type="button" id="runCodeButton">
                <i data-lucide="play"></i>
                Code starten
              </button>
              <button class="button button-primary" type="button" id="checkCodeButton">
                <i data-lucide="badge-check"></i>
                Lösung prüfen
              </button>
            </div>
          </div>
          <div class="result-banner" id="resultBanner"></div>
        </section>
      </div>`;

    const editor = document.querySelector("#codeEditor");
    editor.addEventListener("input", () => {
      state.drafts[exercise.id] = editor.value;
      saveState();
    });
  }

  function showQuizFeedback(success, message) {
    const feedback = document.querySelector("#quizFeedback");
    feedback.className = `feedback is-visible ${success ? "is-success" : "is-error"}`;
    feedback.textContent = message;
  }

  function showResult(success, title, detail) {
    const banner = document.querySelector("#resultBanner");
    banner.className = `result-banner is-visible ${success ? "is-success" : "is-error"}`;
    banner.innerHTML = `
      <i data-lucide="${success ? "circle-check" : "circle-alert"}"></i>
      <div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></div>`;
    renderIcons();
  }

  function setConsole(value, error = false) {
    const output = document.querySelector("#consoleOutput");
    if (!output) {
      return;
    }
    output.textContent = value || "(keine Ausgabe)";
    output.classList.toggle("is-error", error);
    document.querySelectorAll("[data-runner-tab]").forEach((tab) => {
      tab.classList.toggle("is-active", tab.dataset.runnerTab === "output");
    });
    document.querySelectorAll("[data-runner-panel]").forEach((panel) => {
      panel.classList.toggle("is-active", panel.dataset.runnerPanel === "output");
    });
  }

  function setRuntime(status, text) {
    runtimeChip.classList.toggle("is-ready", status === "ready");
    runtimeChip.classList.toggle("is-error", status === "error");
    runtimeText.textContent = text;
  }

  function safeFilePart(value) {
    return String(value || "lernstand")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 30) || "lernstand";
  }

  function exportFileName() {
    return `pythonlab-${safeFilePart(state.name)}-${todayKey()}.json`;
  }

  function backupPayload() {
    return {
      app: backupAppId,
      formatVersion: backupFormatVersion,
      exportedAt: new Date().toISOString(),
      data: state
    };
  }

  function updateBackupSummary() {
    const summary = document.querySelector("#backupSummary");
    if (!summary) {
      return;
    }
    summary.innerHTML = `
      <div><strong>${state.xp} XP</strong><small>Erfahrung</small></div>
      <div><strong>${state.completedLessons.length}</strong><small>Lektionen</small></div>
      <div><strong>${state.completedExercises.length + state.completedStructograms.length}</strong><small>Aufgaben</small></div>`;
  }

  async function exportProgress() {
    const json = JSON.stringify(backupPayload(), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const suggestedName = exportFileName();

    if ("showSaveFilePicker" in window) {
      try {
        const handle = await window.showSaveFilePicker({
          suggestedName,
          types: [{
            description: "PythonLab-Lernstand",
            accept: { "application/json": [".json"] }
          }]
        });
        const writable = await handle.createWritable();
        await writable.write(blob);
        await writable.close();
        toast("Lernstand gespeichert");
        return;
      } catch (error) {
        if (error?.name === "AbortError") {
          return;
        }
      }
    }

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = suggestedName;
    document.body.append(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    toast("Lernstand heruntergeladen");
  }

  async function importProgressFile(file) {
    if (!file) {
      return;
    }
    if (file.size > 2_000_000) {
      toast("Die Datei ist zu groß", "error");
      progressFileInput.value = "";
      return;
    }

    try {
      const parsed = JSON.parse(await file.text());
      if (!acceptedBackupAppIds.has(parsed?.app) || !parsed.data) {
        throw new Error("Keine PythonLab-Datei");
      }
      if (!Number.isInteger(parsed.formatVersion) || parsed.formatVersion > backupFormatVersion) {
        throw new Error("Die Datei stammt aus einer neueren Version");
      }
      const importedState = normalizeState(parsed.data);
      const label = importedState.name || "Gast";
      const confirmed = window.confirm(
        `Lernstand von ${label} mit ${importedState.xp} XP laden? Der aktuelle Browserstand wird ersetzt.`
      );
      if (!confirmed) {
        return;
      }
      state = importedState;
      saveState();
      backupDialog.close();
      renderRoute();
      toast("Lernstand erfolgreich geladen");
    } catch (error) {
      toast(error.message || "Die Datei konnte nicht geladen werden", "error");
    } finally {
      progressFileInput.value = "";
    }
  }

  function createWorker() {
    if (worker) {
      worker.terminate();
    }
    pendingRuns.forEach(({ reject }) => reject(new Error("Python wurde neu gestartet.")));
    pendingRuns = new Map();
    setRuntime("loading", "Python wird vorbereitet");

    worker = new Worker("python-worker.js", { type: "module" });
    workerReady = new Promise((resolve, reject) => {
      const readyTimeout = window.setTimeout(() => reject(new Error("Python konnte nicht geladen werden.")), 30000);
      worker.addEventListener("message", function onReady(event) {
        if (event.data?.type === "ready") {
          window.clearTimeout(readyTimeout);
          worker.removeEventListener("message", onReady);
          setRuntime("ready", "Python ist bereit");
          resolve();
        }
        if (event.data?.type === "init-error") {
          window.clearTimeout(readyTimeout);
          worker.removeEventListener("message", onReady);
          setRuntime("error", "Python nicht verfügbar");
          reject(new Error(event.data.error));
        }
      });
    });

    worker.addEventListener("message", (event) => {
      if (event.data?.type !== "result") {
        return;
      }
      const pending = pendingRuns.get(event.data.requestId);
      if (!pending) {
        return;
      }
      window.clearTimeout(pending.timeout);
      pendingRuns.delete(event.data.requestId);
      pending.resolve(event.data);
    });
  }

  async function executePython(code, inputs, testCode = "") {
    await workerReady;
    const requestId = ++requestCounter;
    return new Promise((resolve, reject) => {
      const timeout = window.setTimeout(() => {
        pendingRuns.delete(requestId);
        createWorker();
        reject(new Error("Das Programm lief zu lange und wurde beendet. Prüfe besonders deine Schleifen."));
      }, 10000);
      pendingRuns.set(requestId, { resolve, reject, timeout });
      worker.postMessage({ type: "run", requestId, code, inputs, testCode });
    });
  }

  function normalizeOutput(value) {
    return String(value).replace(/\r\n/g, "\n").trim();
  }

  async function runExercise(checkSolution) {
    const route = parseRoute();
    const exercise = exerciseById(route.id);
    const editor = document.querySelector("#codeEditor");
    const input = document.querySelector("#inputArea");
    const runButton = document.querySelector("#runCodeButton");
    const checkButton = document.querySelector("#checkCodeButton");
    if (!exercise || !editor || !input) {
      return;
    }

    runButton.disabled = true;
    checkButton.disabled = true;
    setConsole("Python arbeitet ...");
    try {
      const check = exercise.check;
      const testCode = checkSolution && check.type === "tests" ? check.code : "";
      const inputs = checkSolution ? (exercise.checkInput ?? exercise.input ?? "") : input.value;
      const result = await executePython(editor.value, inputs, testCode);
      const combinedError = [result.stderr, result.error].filter(Boolean).join("\n");
      if (combinedError) {
        setConsole(combinedError, true);
        if (checkSolution) {
          showResult(false, "Noch nicht ganz", "Lies die letzte Zeile der Fehlermeldung und prüfe die genannte Codezeile.");
        }
        return;
      }

      setConsole(result.stdout);
      if (!checkSolution) {
        return;
      }

      let passed = false;
      if (check.type === "tests") {
        passed = result.testsPassed;
      } else if (check.type === "output") {
        passed = normalizeOutput(result.stdout) === normalizeOutput(check.expected);
      } else if (check.type === "outputNumber") {
        const lastLine = normalizeOutput(result.stdout).split("\n").at(-1)?.replace(",", ".");
        passed = Math.abs(Number(lastLine) - check.expected) < 0.001;
      }

      if (passed) {
        const firstCompletion = award("exercise", exercise.id, exercise.xp);
        showResult(true, "Aufgabe gelöst", firstCompletion
          ? `Starke Arbeit. ${exercise.xp} XP wurden gutgeschrieben.`
          : "Deine Lösung besteht die Prüfung weiterhin.");
      } else {
        showResult(false, "Noch nicht ganz", "Vergleiche Aufgabe und Ausgabe genau. Prüfe auch Reihenfolge, Schreibweise und Grenzwerte.");
      }
    } catch (error) {
      setConsole(error.message, true);
      if (checkSolution) {
        showResult(false, "Python ist gerade nicht bereit", "Prüfe die Internetverbindung und versuche es erneut.");
      }
    } finally {
      runButton.disabled = false;
      checkButton.disabled = false;
    }
  }

  function saveStructogramDraft(exerciseId, draft) {
    state.structogramDrafts[exerciseId] = draft;
    saveState();
  }

  function moveStructureBlock(exercise, blockId, direction) {
    const draft = getStructogramDraft(exercise);
    const index = draft.order.indexOf(blockId);
    const target = direction === "up" ? index - 1 : index + 1;
    if (index < 0 || target < 0 || target >= draft.order.length) {
      return;
    }
    [draft.order[index], draft.order[target]] = [draft.order[target], draft.order[index]];
    saveStructogramDraft(exercise.id, draft);
    renderStructogramExercise(exercise.id);
    renderIcons();
  }

  function checkStructogramExercise() {
    const exercise = structogramExerciseById(parseRoute().id);
    if (!exercise) {
      return;
    }
    const draft = getStructogramDraft(exercise);
    let passed = false;
    let incomplete = false;

    if (exercise.type === "order") {
      passed = exercise.expected.every((id, index) => draft.order[index] === id);
    } else {
      const entries = Object.entries(exercise.slots);
      incomplete = entries.some(([slotId]) => !draft.answers[slotId]);
      passed = !incomplete && entries.every(([slotId, slot]) => draft.answers[slotId] === slot.answer);
    }

    if (passed) {
      const firstCompletion = award("structogram", exercise.id, exercise.xp);
      showResult(true, "Struktogramm stimmt", firstCompletion
        ? `Der Ablauf ist schlüssig. ${exercise.xp} XP wurden gutgeschrieben.`
        : "Der Ablauf ist weiterhin korrekt.");
    } else if (incomplete) {
      showResult(false, "Noch nicht vollständig", "Fülle zuerst alle freien Bausteine aus.");
    } else {
      showResult(false, "Prüfe den Ablauf noch einmal", exercise.type === "order"
        ? "Einlesen kommt vor der Berechnung, die Ausgabe danach."
        : "Achte besonders auf Wahrheitsrichtung, Grenzen und die Veränderung innerhalb einer Schleife.");
    }
  }

  function toast(message, type = "success") {
    const region = document.querySelector("#toastRegion");
    const element = document.createElement("div");
    element.className = `toast${type === "xp" ? " is-xp" : ""}${type === "error" ? " is-error" : ""}`;
    const icon = type === "xp" ? "sparkles" : type === "error" ? "circle-alert" : "circle-check";
    element.innerHTML = `<i data-lucide="${icon}"></i><strong>${escapeHtml(message)}</strong>`;
    region.append(element);
    renderIcons();
    window.setTimeout(() => element.remove(), 3200);
  }

  function parseRoute() {
    const hash = window.location.hash.replace(/^#\/?/, "") || "home";
    const [name, id] = hash.split("/");
    return { name, id };
  }

  function renderRoute() {
    const route = parseRoute();
    if (route.name === "home") {
      renderHome();
    } else if (route.name === "path") {
      renderPath();
    } else if (route.name === "structograms") {
      renderStructograms();
    } else if (route.name === "practice") {
      renderPractice();
    } else if (route.name === "achievements") {
      renderAchievements();
    } else if (route.name === "reference") {
      renderReference();
    } else if (route.name === "lesson") {
      renderLesson(route.id);
    } else if (route.name === "exercise") {
      renderExercise(route.id);
    } else if (route.name === "structogram") {
      renderStructogramExercise(route.id);
    } else {
      go("home");
      return;
    }
    updateChrome();
    renderIcons();
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    const lessonButton = event.target.closest("[data-lesson]");
    const exerciseButton = event.target.closest("[data-exercise]");
    const structogramButton = event.target.closest("[data-structogram]");
    const filterButton = event.target.closest("[data-filter]");
    const runnerTab = event.target.closest("[data-runner-tab]");
    const orderButton = event.target.closest("[data-order-action]");

    if (routeButton) {
      event.preventDefault();
      go(routeButton.dataset.route);
    }
    if (lessonButton) {
      go(`lesson/${lessonButton.dataset.lesson}`);
    }
    if (exerciseButton) {
      go(`exercise/${exerciseButton.dataset.exercise}`);
    }
    if (structogramButton) {
      go(`structogram/${structogramButton.dataset.structogram}`);
    }
    if (filterButton) {
      exerciseFilter = filterButton.dataset.filter;
      renderPractice();
      renderIcons();
    }
    if (runnerTab) {
      document.querySelectorAll("[data-runner-tab]").forEach((tab) => {
        tab.classList.toggle("is-active", tab === runnerTab);
      });
      document.querySelectorAll("[data-runner-panel]").forEach((panel) => {
        panel.classList.toggle("is-active", panel.dataset.runnerPanel === runnerTab.dataset.runnerTab);
      });
    }

    if (event.target.closest("#runCodeButton")) {
      runExercise(false);
    }
    if (event.target.closest("#checkCodeButton")) {
      runExercise(true);
    }
    if (event.target.closest("#checkStructureButton")) {
      checkStructogramExercise();
    }
    if (orderButton) {
      const exercise = structogramExerciseById(parseRoute().id);
      if (exercise) {
        moveStructureBlock(exercise, orderButton.dataset.blockId, orderButton.dataset.orderAction);
      }
    }
    if (event.target.closest("#resetCodeButton")) {
      const exercise = exerciseById(parseRoute().id);
      const editor = document.querySelector("#codeEditor");
      if (exercise && editor && window.confirm("Deinen Code auf den Startzustand zurücksetzen?")) {
        editor.value = exercise.starter;
        delete state.drafts[exercise.id];
        saveState();
        setConsole("Die Aufgabe wurde zurückgesetzt.");
        document.querySelector("#resultBanner").className = "result-banner";
      }
    }
    if (event.target.closest("#resetStructureButton")) {
      const exercise = structogramExerciseById(parseRoute().id);
      if (exercise && window.confirm("Dein Struktogramm auf den Startzustand zurücksetzen?")) {
        delete state.structogramDrafts[exercise.id];
        saveState();
        renderStructogramExercise(exercise.id);
        renderIcons();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    const card = event.target.closest("[data-lesson], [data-exercise], [data-structogram]");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      if (card.dataset.lesson) {
        go(`lesson/${card.dataset.lesson}`);
      } else if (card.dataset.exercise) {
        go(`exercise/${card.dataset.exercise}`);
      } else {
        go(`structogram/${card.dataset.structogram}`);
      }
    }

    if (event.target.id === "codeEditor" && event.key === "Tab") {
      event.preventDefault();
      const editor = event.target;
      const start = editor.selectionStart;
      editor.setRangeText("    ", start, editor.selectionEnd, "end");
      editor.dispatchEvent(new Event("input"));
    }
  });

  document.addEventListener("change", (event) => {
    const slot = event.target.closest("[data-structure-slot]");
    if (!slot) {
      return;
    }
    const exercise = structogramExerciseById(parseRoute().id);
    if (!exercise) {
      return;
    }
    const draft = getStructogramDraft(exercise);
    draft.answers[slot.dataset.structureSlot] = slot.value;
    saveStructogramDraft(exercise.id, draft);
    document.querySelector("#resultBanner").className = "result-banner";
  });

  document.addEventListener("submit", (event) => {
    if (event.target.id === "quizForm") {
      event.preventDefault();
      const form = event.target;
      const lesson = lessonById(form.dataset.lessonId);
      const selected = form.querySelector('input[name="quizAnswer"]:checked');
      if (!selected) {
        showQuizFeedback(false, "Wähle zuerst eine Antwort aus.");
        return;
      }
      if (Number(selected.value) === lesson.quiz.correct) {
        award("lesson", lesson.id, lesson.xp);
        showQuizFeedback(true, `Richtig. ${lesson.quiz.explanation}`);
      } else {
        showQuizFeedback(false, `Noch nicht. ${lesson.quiz.explanation}`);
      }
    }
  });

  document.querySelector("#mobileMenuButton").addEventListener("click", () => {
    sidebar.classList.toggle("is-open");
    backdrop.classList.toggle("is-visible");
  });
  backdrop.addEventListener("click", closeMobileNav);

  document.querySelector("#editProfileButton").addEventListener("click", () => {
    profileName.value = state.name;
    profileDialog.showModal();
    profileName.focus();
  });
  document.querySelector("#profileCancelButton").addEventListener("click", () => profileDialog.close());
  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    state.name = profileName.value.trim().slice(0, 18);
    saveState();
    profileDialog.close();
    renderRoute();
    toast("Lernprofil gespeichert");
  });

  document.querySelector("#backupButton").addEventListener("click", () => {
    updateBackupSummary();
    backupDialog.showModal();
  });
  document.querySelector("#backupCloseButton").addEventListener("click", () => backupDialog.close());
  document.querySelector("#exportProgressButton").addEventListener("click", exportProgress);
  document.querySelector("#importProgressButton").addEventListener("click", () => progressFileInput.click());
  progressFileInput.addEventListener("change", () => importProgressFile(progressFileInput.files?.[0]));

  window.addEventListener("hashchange", renderRoute);

  createWorker();
  renderRoute();
  if (!state.name && !sessionStorage.getItem("pythonlab-profile-seen")) {
    sessionStorage.setItem("pythonlab-profile-seen", "1");
    window.setTimeout(() => profileDialog.showModal(), 350);
  }
})();
