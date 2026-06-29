(() => {
  "use strict";

  const content = window.PYLAB_CONTENT;
  const appConfig = window.PYLAB_CONFIG || {};
  const storageKey = "pythonlab-v1";
  const backupAppId = "PythonLab";
  const themeStorageKey = "pythonlab-theme-v1";
  const main = document.querySelector("#mainContent");
  const sidebar = document.querySelector("#sidebar");
  const backdrop = document.querySelector("#mobileBackdrop");
  const profileDialog = document.querySelector("#profileDialog");
  const profileForm = document.querySelector("#profileForm");
  const profileName = document.querySelector("#profileName");
  const backupDialog = document.querySelector("#backupDialog");
  const pointsDialog = document.querySelector("#pointsDialog");
  const aiConsentDialog = document.querySelector("#aiConsentDialog");
  const aiPrivacyLink = document.querySelector("#aiPrivacyLink");
  const progressFileInput = document.querySelector("#progressFileInput");
  const runtimeChip = document.querySelector("#runtimeChip");
  const runtimeText = document.querySelector("#runtimeText");
  const themeToggleButton = document.querySelector("#themeToggleButton");
  const themeColorMeta = document.querySelector('meta[name="theme-color"]');
  const backupFormatVersion = 1;
  const aiModeStorageKey = "pythonlab-ai-mode-v1";
  const aiConsentStorageKey = "pythonlab-ai-consent-v2";
  const aiSessionStorageKey = "pythonlab-ai-session-v1";

  const defaultState = {
    name: "",
    xp: 0,
    completedLessons: [],
    completedExercises: [],
    completedCommands: [],
    completedStructograms: [],
    drafts: {},
    structogramDrafts: {},
    activityDates: [],
    lastLessonId: "sequenz"
  };

  const levels = [
    { min: 0, title: "Starter" },
    { min: 250, title: "Code-Entdecker" },
    { min: 700, title: "Pfadfinder" },
    { min: 1300, title: "Schleifen-Fuchs" },
    { min: 2100, title: "Problemlöser" },
    { min: 3000, title: "Bausteinmeister" },
    { min: 4000, title: "Funktions-Architekt" },
    { min: 5000, title: "Python-Profi" },
    { min: 5800, title: "Werkstattmeister" }
  ];

  let state = loadState();
  let exerciseFilter = "all";
  let worker = null;
  let workerReady = null;
  let pendingRuns = new Map();
  let requestCounter = 0;
  const exerciseAttempts = new Map();
  const aiFeedbackCache = new Map();
  let lastExerciseReview = null;
  let pendingAiFeedbackRequest = null;
  let aiFeedbackInFlight = false;
  let lastShownXp = state.xp;

  function uniqueAllowedStrings(values, allowedIds) {
    if (!Array.isArray(values)) {
      return [];
    }
    return [...new Set(values.filter((value) => typeof value === "string" && allowedIds.has(value)))];
  }

  function normalizeState(candidate = {}) {
    const lessonIds = new Set(content.lessons.map((lesson) => lesson.id));
    const exerciseIds = new Set(content.exercises.map((exercise) => exercise.id));
    const commandIds = new Set(content.commands.map((command) => command.id));
    const structogramIds = new Set(content.structograms.exercises.map((exercise) => exercise.id));
    const completedLessons = uniqueAllowedStrings(candidate.completedLessons, lessonIds);
    const completedExercises = uniqueAllowedStrings(candidate.completedExercises, exerciseIds);
    const completedCommands = uniqueAllowedStrings(candidate.completedCommands, commandIds);
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
      completedCommands.reduce((sum, id) => sum + (commandById(id)?.xp || 0), 0) +
      completedStructograms.reduce((sum, id) => sum + (structogramExerciseById(id)?.xp || 0), 0);

    return {
      ...defaultState,
      name: typeof candidate.name === "string" ? candidate.name.trim().slice(0, 18) : "",
      xp,
      completedLessons,
      completedExercises,
      completedCommands,
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
      const storedRaw = localStorage.getItem(storageKey);
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

  function readTheme() {
    try {
      return localStorage.getItem(themeStorageKey) === "light" ? "light" : "dark";
    } catch {
      return document.documentElement.dataset.theme === "light" ? "light" : "dark";
    }
  }

  function applyTheme(theme, persist = true) {
    const normalized = theme === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = normalized;
    themeColorMeta?.setAttribute("content", normalized === "dark" ? "#101714" : "#173f35");

    if (themeToggleButton) {
      themeToggleButton.setAttribute("aria-pressed", String(normalized === "dark"));
      themeToggleButton.setAttribute(
        "aria-label",
        normalized === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren"
      );
      themeToggleButton.title = normalized === "dark" ? "Light Mode aktivieren" : "Dark Mode aktivieren";
      themeToggleButton.innerHTML = `<i data-lucide="${normalized === "dark" ? "sun" : "moon"}"></i>`;
      renderIcons();
    }

    if (persist) {
      try {
        localStorage.setItem(themeStorageKey, normalized);
      } catch {}
    }
  }

  function toggleTheme() {
    applyTheme(readTheme() === "dark" ? "light" : "dark");
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
    return { easy: "Grundlage", medium: "Vertiefung", plus: "Plus", extra: "Anwendung" }[value] || value;
  }

  function sessionValue(key) {
    try {
      return sessionStorage.getItem(key) || "";
    } catch {
      return "";
    }
  }

  function setSessionValue(key, value) {
    try {
      if (value) {
        sessionStorage.setItem(key, value);
      } else {
        sessionStorage.removeItem(key);
      }
    } catch {
      // Der lokale Lerncoach bleibt auch ohne Session Storage vollständig nutzbar.
    }
  }

  function aiFeedbackEndpoint() {
    return String(appConfig.aiFeedbackEndpoint || "").trim();
  }

  function aiFeedbackAvailable() {
    return Boolean(aiFeedbackEndpoint());
  }

  function aiModeEnabled() {
    return aiFeedbackAvailable() && sessionValue(aiModeStorageKey) === "1";
  }

  function aiSessionId() {
    const saved = sessionValue(aiSessionStorageKey);
    if (saved) {
      return saved;
    }
    const generated = typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `session-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    setSessionValue(aiSessionStorageKey, generated);
    return generated;
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

  function commandById(id) {
    return content.commands.find((command) => command.id === id);
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

  function totalAvailableXp() {
    return [
      content.lessons,
      content.exercises,
      content.commands,
      content.structograms.exercises
    ].flat().reduce((sum, item) => sum + item.xp, 0);
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
      command: "completedCommands",
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

  function competencyProgress(competency) {
    const sources = [
      [competency.lessonIds || [], state.completedLessons],
      [competency.exerciseIds || [], state.completedExercises],
      [competency.commandIds || [], state.completedCommands],
      [competency.structogramIds || [], state.completedStructograms]
    ];
    const total = sources.reduce((sum, [ids]) => sum + ids.length, 0);
    const done = sources.reduce((sum, [ids, completed]) =>
      sum + ids.filter((id) => completed.includes(id)).length, 0);
    return { done, total, percent: progressPercent(done, total) };
  }

  function competencyEvidence(competency) {
    return [
      { ids: competency.lessonIds || [], completed: state.completedLessons, label: "Lektionen", icon: "book-open-text" },
      { ids: competency.exerciseIds || [], completed: state.completedExercises, label: "Aufgaben", icon: "code-2" },
      { ids: competency.commandIds || [], completed: state.completedCommands, label: "Befehle", icon: "braces" },
      { ids: competency.structogramIds || [], completed: state.completedStructograms, label: "Struktogramme", icon: "workflow" }
    ].filter((source) => source.ids.length).map((source) => ({
      ...source,
      done: source.ids.filter((id) => source.completed.includes(id)).length
    }));
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
    if (condition.type === "commands") {
      return state.completedCommands.length >= condition.value;
    }
    if (condition.type === "allCommands") {
      return state.completedCommands.length === content.commands.length;
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
    if (condition.type === "streak") {
      return streak() >= condition.value;
    }
    if (condition.type === "all") {
      return state.completedLessons.length === content.lessons.length &&
        state.completedExercises.length === content.exercises.length &&
        state.completedCommands.length === content.commands.length;
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
    const availableXp = document.querySelector("#availableXp");
    if (availableXp) {
      availableXp.textContent = `${totalAvailableXp()} Punkte`;
    }

    const pointsChip = document.querySelector(".points-chip");
    if (pointsChip && state.xp > lastShownXp) {
      pointsChip.classList.remove("is-bumped");
      void pointsChip.offsetWidth;
      pointsChip.classList.add("is-bumped");
      pointsChip.addEventListener("animationend", () => pointsChip.classList.remove("is-bumped"), { once: true });
    }
    lastShownXp = state.xp;
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

  function commandCard(command) {
    const completed = state.completedCommands.includes(command.id);
    return `
      <article class="command-card" tabindex="0" role="button" data-command="${command.id}" aria-label="${escapeHtml(command.title)} öffnen">
        <span class="lesson-state ${completed ? "is-done" : ""}">
          <i data-lucide="${completed ? "check" : "braces"}"></i>
        </span>
        <span class="command-category">${escapeHtml(command.category)}</span>
        <h3><code>${escapeHtml(command.title)}</code></h3>
        <p>${escapeHtml(command.short)}</p>
        <pre>${escapeHtml(command.syntax)}</pre>
        <div class="exercise-meta">
          <span class="meta-pill"><i data-lucide="book-open"></i>${escapeHtml(lessonById(command.relatedLesson)?.title || "Python")}</span>
          <span class="meta-pill"><i data-lucide="sparkles"></i>${command.xp} XP</span>
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

  function renderStructureCondition(value, exercise, answers = {}) {
    const alreadyHasQuestionMark = typeof value === "string" && value.trim().endsWith("?");
    return `${renderStructureValue(value, exercise, answers)}${alreadyHasQuestionMark ? "" : '<span class="stg-question-mark" aria-hidden="true">?</span>'}`;
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
              <svg class="stg-decision-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="0" x2="50" y2="100"></line>
                <line x1="100" y1="0" x2="50" y2="100"></line>
              </svg>
              <strong class="stg-condition">${renderStructureCondition(node.condition, exercise, answers)}</strong>
              <span class="stg-branch-label is-yes">Ja</span>
              <span class="stg-branch-label is-no">Nein</span>
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
          <div><strong>${state.completedExercises.length + state.completedCommands.length} / ${content.exercises.length + content.commands.length}</strong><small>Übungen gelöst</small></div>
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
            <span class="meta-pill"><i data-lucide="sparkles"></i>bis zu 600 XP</span>
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

  function renderCompetencies() {
    setHeading("BPE 5 · Dein Kompetenzraster", "Kompetenzen");
    activateNav("competencies");
    const allItems = content.competencies.flatMap((group) => group.items);
    const secure = allItems.filter((item) => competencyProgress(item).percent === 100).length;
    const doneActivities = allItems.reduce((sum, item) => sum + competencyProgress(item).done, 0);
    const totalActivities = allItems.reduce((sum, item) => sum + competencyProgress(item).total, 0);
    const overallPercent = progressPercent(doneActivities, totalActivities);

    main.innerHTML = `
      <section class="competency-lead">
        <div>
          <p class="eyebrow">Ich kann ...</p>
          <h2>Sieh, was du schon sicher beherrschst.</h2>
          <p>Die Ziele orientieren sich am offiziellen BPE5-Kompetenzraster. Dein Stand entsteht aus abgeschlossenen Lektionen, Aufgaben, Befehlen und Struktogrammen.</p>
        </div>
        <div class="competency-summary" aria-label="${overallPercent} Prozent der zugeordneten Lernaktivitäten abgeschlossen">
          <strong>${overallPercent} %</strong>
          <span>${secure} von ${allItems.length} Kompetenzen sicher geübt</span>
          <div class="progress-track"><span style="width:${overallPercent}%"></span></div>
        </div>
      </section>

      <div class="callout competency-note">
        <i data-lucide="info"></i>
        <p>Die Anzeige ist eine Lernhilfe und keine Note. „Sicher geübt“ bedeutet, dass du alle zugeordneten Aktivitäten abgeschlossen hast. Du kannst jedes Ziel jederzeit weiter vertiefen.</p>
      </div>

      ${content.competencies.map((group) => `
        <section class="content-section competency-section">
          <div class="section-heading">
            <div>
              <p class="eyebrow">Kompetenzbereich ${escapeHtml(group.number)}</p>
              <h2>${escapeHtml(group.title)}</h2>
              <p>${escapeHtml(group.description)}</p>
            </div>
          </div>
          <div class="competency-grid">
            ${group.items.map((item) => {
              const progress = competencyProgress(item);
              const evidence = competencyEvidence(item);
              const status = progress.percent === 100 ? "Sicher geübt" : progress.percent > 0 ? "In Arbeit" : "Noch offen";
              return `
                <article class="competency-card ${progress.percent === 100 ? "is-complete" : ""}">
                  <div class="competency-card-heading">
                    <span class="competency-state"><i data-lucide="${progress.percent === 100 ? "badge-check" : "target"}"></i></span>
                    <div>
                      <span class="competency-status">${status}</span>
                      <h3>${escapeHtml(item.title)}</h3>
                    </div>
                  </div>
                  <div class="progress-track" aria-label="${progress.percent} Prozent abgeschlossen"><span style="width:${progress.percent}%"></span></div>
                  <div class="competency-evidence">
                    ${evidence.map((source) => `<span><i data-lucide="${source.icon}"></i>${source.done}/${source.ids.length} ${source.label}</span>`).join("")}
                  </div>
                  <button class="text-button competency-action" type="button" data-route="${escapeHtml(item.route)}">
                    ${progress.percent === 100 ? "Noch einmal ansehen" : "Weiter üben"}
                    <i data-lucide="arrow-right"></i>
                  </button>
                </article>`;
            }).join("")}
          </div>
        </section>`).join("")}`;
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
          ["plus", "Python Plus"],
          ["extra", "Anwendung"]
        ].map(([value, label]) => `
          <button class="filter-button ${exerciseFilter === value ? "is-active" : ""}" type="button" data-filter="${value}">${label}</button>
        `).join("")}
      </div>
      <div class="exercise-grid">${filtered.map(exerciseCard).join("")}</div>`;
  }

  function renderCommands() {
    setHeading("Python-Werkzeuge", "Befehle");
    activateNav("commands");
    const completed = state.completedCommands.length;
    const categories = [...new Set(content.commands.map((command) => command.category))];
    main.innerHTML = `
      <section class="commands-lead">
        <div>
          <p class="eyebrow">Syntax verstehen</p>
          <h2>Die wichtigsten Python-Befehle auf einen Blick.</h2>
          <p>Jede Karte erklärt kurz, wofür ein Befehl gedacht ist. Öffne einen Befehl für Details, typische Fehler und eine kleine Übung mit XP.</p>
        </div>
        <div class="command-progress">
          <small>Dein Befehlsstand</small>
          <strong>${completed} / ${content.commands.length}</strong>
          <span>Miniaufgaben gelöst</span>
        </div>
      </section>
      <div class="command-category-list" aria-label="Befehlskategorien">
        ${categories.map((category) => `<span class="tag"><i data-lucide="folder"></i>${escapeHtml(category)}</span>`).join("")}
      </div>
      <div class="command-grid">${content.commands.map(commandCard).join("")}</div>`;
  }

  function renderCommandDetail(id) {
    const command = commandById(id);
    if (!command) {
      go("commands");
      return;
    }
    setHeading(command.category, command.title);
    activateNav("commands");
    const completed = state.completedCommands.includes(command.id);
    const lesson = lessonById(command.relatedLesson);
    main.innerHTML = `
      <button class="text-button back-button" type="button" data-route="commands">
        <i data-lucide="arrow-left"></i>
        Zu allen Befehlen
      </button>
      <article class="command-detail">
        <header class="detail-header command-detail-header">
          <div class="lesson-meta">
            <span class="meta-pill"><i data-lucide="tag"></i>${escapeHtml(command.category)}</span>
            <span class="meta-pill"><i data-lucide="sparkles"></i>${command.xp} XP</span>
            ${completed ? `<span class="completion-chip"><i data-lucide="circle-check"></i> Gelöst</span>` : ""}
          </div>
          <h2><code>${escapeHtml(command.title)}</code></h2>
          <p>${escapeHtml(command.summary)}</p>
        </header>

        <section class="command-detail-grid">
          <div class="command-copy">
            <section>
              <h3>Wofür brauchst du das?</h3>
              ${command.details.map((detail) => `<p>${inlineCode(detail)}</p>`).join("")}
            </section>
            <section>
              <h3>Typische Stolperstellen</h3>
              <ul>${command.pitfalls.map((pitfall) => `<li>${inlineCode(pitfall)}</li>`).join("")}</ul>
            </section>
            <div class="button-row">
              ${lesson ? `
                <button class="button button-secondary" type="button" data-lesson="${lesson.id}">
                  <i data-lucide="book-open"></i>
                  Passende Lektion öffnen
                </button>` : ""}
            </div>
          </div>
          <aside class="command-example-panel">
            <p class="eyebrow">Syntax</p>
            <pre class="command-syntax">${escapeHtml(command.syntax)}</pre>
            <p class="eyebrow">Beispiel</p>
            <pre class="code-example"><code>${escapeHtml(command.example)}</code></pre>
          </aside>
        </section>

        <section class="quick-check command-check">
          <p class="eyebrow">Miniaufgabe</p>
          <h3>${escapeHtml(command.exercise.question)}</h3>
          <form id="commandExerciseForm" data-command-id="${command.id}">
            <div class="answer-options">
              ${command.exercise.options.map((option, index) => `
                <label class="answer-option">
                  <input type="radio" name="commandAnswer" value="${index}">
                  <span>${escapeHtml(option)}</span>
                </label>`).join("")}
            </div>
            <button class="button button-primary" type="submit">
              <i data-lucide="check"></i>
              ${completed ? "Antwort prüfen" : "Befehl abschließen"}
            </button>
            <div class="feedback" id="commandFeedback"></div>
          </form>
        </section>
      </article>`;
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

      <div class="callout abitur-note">
        <i data-lucide="graduation-cap"></i>
        <div>
          <p><strong>Abiturrelevant.</strong> Struktogramme gehören fest zum Bildungsplan und werden im Abitur Informatik – schriftlich wie mündlich – immer wieder verlangt. An unserer Schule arbeiten wir mit dem <strong>hus Struktogrammer</strong>. Für konkrete Prüfungen gelten die jeweils aktuellen schulischen Vorgaben.</p>
          <a class="text-button" href="https://struktogrammer.ch/Web_files/page1_JavaVersion.html" target="_blank" rel="noreferrer">
            <i data-lucide="external-link"></i>
            hus Struktogrammer öffnen
          </a>
        </div>
      </div>

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
                  ${escapeHtml(tool.linkLabel || "Projektseite")} <i data-lucide="external-link"></i>
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

  function renderLessonCodeDemo(section, sectionIndex) {
    if (!section.code) {
      return "";
    }
    const inputId = `exampleInput-${sectionIndex}`;
    const outputId = `exampleOutput-${sectionIndex}`;
    const hasExampleInput = typeof section.exampleInput === "string";
    return `
      <div class="lesson-code-demo">
        <pre class="code-example"><code>${escapeHtml(section.code)}</code></pre>
        <div class="lesson-code-controls">
          ${hasExampleInput ? `
            <label class="example-input-field" for="${inputId}">
              <span>Beispieleingaben · eine Zeile pro input()</span>
              <textarea id="${inputId}" spellcheck="false">${escapeHtml(section.exampleInput)}</textarea>
            </label>` : ""}
          <button class="button example-run-button" type="button" data-run-example="${sectionIndex}" aria-controls="${outputId}">
            <i data-lucide="play"></i>
            Beispiel ausführen
          </button>
        </div>
        <div class="example-output" id="${outputId}" role="status" aria-live="polite" hidden>
          <strong>Ausgabe</strong>
          <pre></pre>
        </div>
      </div>`;
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
      <article class="lesson-detail difficulty-page-${lesson.difficulty}">
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

        ${lesson.sections.map((section, sectionIndex) => `
          <section class="lesson-section">
            <h3>${escapeHtml(section.title)}</h3>
            <div class="lesson-copy">
              ${section.body.map((paragraph) => `<p>${inlineCode(paragraph)}</p>`).join("")}
              ${renderLessonCodeDemo(section, sectionIndex)}
              ${section.tip ? `<div class="callout"><i data-lucide="lightbulb"></i><p>${inlineCode(section.tip)}</p></div>` : ""}
              ${section.warning ? `<div class="callout is-warning"><i data-lucide="triangle-alert"></i><p>${inlineCode(section.warning)}</p></div>` : ""}
            </div>
          </section>`).join("")}

        ${lesson.structogram ? `
          <section class="lesson-section lesson-structogram">
            <h3>Als Struktogramm gedacht</h3>
            <div class="lesson-copy">
              <p>Im Bildungsplan und im Abitur Informatik werden Abläufe oft als Struktogramm dargestellt. So sieht der Ablauf dieser Lektion als Nassi-Shneiderman-Struktogramm aus:</p>
              ${renderStructogram(lesson.structogram)}
              <p class="lesson-structogram-link">
                <a class="text-button" href="#structograms" data-route="structograms"><i data-lucide="workflow"></i> Im Struktogramm-Labor üben</a>
              </p>
            </div>
          </section>` : ""}

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
          <button class="button button-practice" type="button" data-exercise="${lesson.practiceId}">
            <i data-lucide="terminal"></i>
            Aufgabe öffnen
          </button>
        </section>
      </article>`;
  }

  function renderExerciseStory(story) {
    if (!story || typeof story !== "object") {
      return "";
    }
    const paragraphs = Array.isArray(story.paragraphs) ? story.paragraphs : [];
    const facts = Array.isArray(story.facts) ? story.facts : [];
    const visual = story.image
      ? `<div class="exercise-story-illustration exercise-story-illustration--image">
          <img src="${escapeHtml(story.image)}" alt="${escapeHtml(story.illustrationAlt || "Illustration")}" loading="lazy" decoding="async">
        </div>`
      : story.illustration
        ? `<div class="exercise-story-illustration" role="img" aria-label="${escapeHtml(story.illustrationAlt || "Illustration")}">${story.illustration}</div>`
        : "";
    return `
      <section class="exercise-story ${story.image ? "exercise-story--image" : ""}">
        <div class="exercise-story-text">
          ${story.eyebrow ? `<p class="eyebrow">${escapeHtml(story.eyebrow)}</p>` : ""}
          ${story.heading ? `<h2>${escapeHtml(story.heading)}</h2>` : ""}
          ${paragraphs.map((paragraph) => `<p>${inlineCode(paragraph)}</p>`).join("")}
          ${facts.length ? `
            <ul class="exercise-story-facts" aria-label="Primzahlen auf einen Blick">
              ${facts.map((fact) => `<li><strong>${escapeHtml(fact.value)}</strong><span>${escapeHtml(fact.label)}</span></li>`).join("")}
            </ul>` : ""}
          ${story.video?.url ? `
            <a class="button button-secondary exercise-story-video" href="${escapeHtml(story.video.url)}" target="_blank" rel="noreferrer">
              <i data-lucide="play"></i>
              ${escapeHtml(story.video.label || "Video ansehen")}
            </a>` : ""}
          ${story.source?.url ? `
            <a class="text-button exercise-story-source" href="${escapeHtml(story.source.url)}" target="_blank" rel="noreferrer">
              <i data-lucide="external-link"></i>
              ${escapeHtml(story.source.label || "Quelle und Weiterlesen")}
            </a>` : ""}
        </div>
        ${visual}
      </section>`;
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
    const hasAiFeedback = aiFeedbackAvailable();
    const aiModeActive = aiModeEnabled();
    const aiProvider = String(appConfig.aiProviderLabel || "externer KI-Dienst").trim();
    setHeading(`Aufgabe zu Lektion ${lesson.index}`, exercise.title);
    activateNav("practice");
    main.innerHTML = `
      <button class="text-button back-button" type="button" data-route="practice"><i data-lucide="arrow-left"></i> Zu allen Aufgaben</button>
      ${renderExerciseStory(exercise.story)}
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
                Code prüfen
              </button>
            </div>
          </div>
          <div class="result-banner" id="resultBanner"></div>
          <section class="learning-coach" aria-labelledby="learningCoachTitle">
            <div class="learning-coach-heading">
              <span class="learning-coach-icon"><i data-lucide="brain-circuit"></i></span>
              <div>
                <p class="eyebrow">Lerncoach</p>
                <h3 id="learningCoachTitle">Hinweise zu deinem Code</h3>
              </div>
              <span class="local-check-badge"><i data-lucide="shield-check"></i> Prüfung im Browser</span>
            </div>
            <p>Die automatische Prüfung führt deinen Code aus und testet das Ergebnis. Hinweise helfen weiter, ohne die fertige Lösung vorwegzunehmen.</p>
            ${hasAiFeedback ? `
              <div class="ai-mode-switch ${aiModeActive ? "is-active" : ""}" id="aiModeSwitch">
                <span class="ai-mode-symbol"><i data-lucide="sparkles"></i></span>
                <div>
                  <strong>KI-Modus <span id="aiModeStatus">${aiModeActive ? "aktiv" : "aus"}</span></strong>
                  <small id="aiModeDescription">${aiModeActive
                    ? `Nach einer fehlgeschlagenen Prüfung fragt PythonLab automatisch ${escapeHtml(aiProvider)} nach einem Lernhinweis.`
                    : "Aktiviere den Modus freiwillig, wenn du nach Fehlversuchen zusätzliche Hinweise möchtest."}</small>
                </div>
                <button class="ai-mode-toggle" id="aiModeToggleButton" type="button" role="switch" aria-checked="${aiModeActive}" aria-label="KI-Modus ${aiModeActive ? "ausschalten" : "aktivieren"}">
                  <span></span>
                </button>
              </div>` : `
              <div class="ai-mode-switch is-unavailable">
                <span class="ai-mode-symbol"><i data-lucide="cloud-off"></i></span>
                <div><strong>KI-Modus noch nicht freigeschaltet</strong><small>Der lokale Lerncoach und die automatische Prüfung funktionieren vollständig.</small></div>
              </div>`}
            <div class="learning-coach-actions">
              <button class="button button-secondary" type="button" id="hintCodeButton">
                <i data-lucide="lightbulb"></i>
                Lernhinweis anzeigen
              </button>
              ${hasAiFeedback ? `
                <button class="button button-ai" type="button" id="aiFeedbackButton">
                  <i data-lucide="sparkles"></i>
                  KI jetzt um Hilfe bitten
                </button>` : ""}
            </div>
            ${hasAiFeedback ? `
              <p class="ai-privacy-note"><i data-lucide="info"></i><span>${aiModeActive
                ? "Im aktiven KI-Modus wird der aktuelle Code nach fehlgeschlagenen Prüfungen übertragen."
                : "Ohne Aktivierung wird Code nur übertragen, wenn du ausdrücklich auf „KI jetzt um Hilfe bitten“ klickst."} Trage keine Namen oder persönlichen Daten in den Code ein.</span></p>` : ""}
            <div class="coach-feedback" id="coachFeedback" role="status" aria-live="polite" hidden></div>
          </section>
        </section>
      </div>`;

    const editor = document.querySelector("#codeEditor");
    editor.addEventListener("input", () => {
      state.drafts[exercise.id] = editor.value;
      saveState();
      lastExerciseReview = null;
    });
  }

  function showQuizFeedback(success, message) {
    const feedback = document.querySelector("#quizFeedback");
    feedback.className = `feedback is-visible ${success ? "is-success" : "is-error"}`;
    feedback.textContent = message;
  }

  function checkCommandExercise(form) {
    const command = commandById(form.dataset.commandId);
    const selected = form.querySelector('input[name="commandAnswer"]:checked');
    const feedback = document.querySelector("#commandFeedback");
    if (!command || !feedback) {
      return;
    }
    if (!selected) {
      feedback.className = "feedback is-visible is-error";
      feedback.textContent = "Wähle zuerst eine Antwort aus.";
      return;
    }
    const success = Number(selected.value) === command.exercise.correct;
    feedback.className = `feedback is-visible ${success ? "is-success" : "is-error"}`;
    if (success) {
      const firstCompletion = award("command", command.id, command.xp);
      feedback.textContent = firstCompletion
        ? `${command.exercise.feedback} ${command.xp} XP wurden gutgeschrieben.`
        : command.exercise.feedback;
    } else {
      feedback.textContent = "Noch nicht ganz. Lies Beispiel und Stolperstellen noch einmal.";
    }
  }

  function showResult(success, title, detail) {
    const banner = document.querySelector("#resultBanner");
    banner.className = `result-banner is-visible ${success ? "is-success" : "is-error"}`;
    banner.innerHTML = `
      <i data-lucide="${success ? "circle-check" : "circle-alert"}"></i>
      <div><strong>${escapeHtml(title)}</strong><p>${escapeHtml(detail)}</p></div>`;
    renderIcons();
  }

  function showCoachFeedback(title, intro, items = [], tone = "info", source = "") {
    const panel = document.querySelector("#coachFeedback");
    if (!panel) {
      return;
    }
    panel.hidden = false;
    panel.className = `coach-feedback is-${tone}`;
    panel.replaceChildren();

    const heading = document.createElement("strong");
    heading.textContent = title;
    panel.append(heading);

    if (intro) {
      const paragraph = document.createElement("p");
      paragraph.textContent = intro;
      panel.append(paragraph);
    }

    const cleanItems = items.filter(Boolean).slice(0, 6);
    if (cleanItems.length) {
      const list = document.createElement("ul");
      cleanItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        list.append(listItem);
      });
      panel.append(list);
    }

    if (source) {
      const note = document.createElement("small");
      note.textContent = source;
      panel.append(note);
    }
  }

  function pythonDiagnostic(errorText) {
    const text = String(errorText || "");
    const assertion = text.match(/AssertionError:\s*([^\n]+)/);
    if (assertion?.[1]) {
      return assertion[1].trim();
    }
    const namedErrors = [
      ["IndentationError", "Prüfe die Einrückung. Zeilen eines Blocks müssen gleich weit eingerückt sein."],
      ["SyntaxError", "Python kann die Schreibweise noch nicht lesen. Prüfe besonders Doppelpunkte, Klammern und unvollständige Zuweisungen."],
      ["NameError", "Ein verwendeter Name ist noch nicht definiert oder anders geschrieben."],
      ["TypeError", "Hier werden Werte oder Funktionsaufrufe in einer unpassenden Form verbunden."],
      ["ValueError", "Ein Wert lässt sich nicht wie vorgesehen umwandeln oder verarbeiten."],
      ["ZeroDivisionError", "Eine Rechnung teilt durch 0. Prüfe den Nenner."],
      ["IndexError", "Ein Listenplatz liegt außerhalb der vorhandenen Elemente."],
      ["AttributeError", "Auf diesem Wert gibt es die aufgerufene Methode nicht. Prüfe den Datentyp und die Schreibweise der Methode."],
      ["ModuleNotFoundError", "Ein importiertes Modul ist nicht verfügbar. Für diese Aufgaben brauchst du meist keine zusätzlichen Importe."],
      ["RecursionError", "Die Funktion ruft sich endlos selbst auf. Prüfe, ob es einen Abbruchfall gibt."],
      ["EOFError", "Das Programm wartet auf eine Eingabe, es sind aber keine vorbereiteten Eingabezeilen mehr da. Ergänze sie im Reiter „Eingabe“."]
    ];
    return namedErrors.find(([name]) => text.includes(name))?.[1]
      || "Lies die letzte Zeile der Fehlermeldung und prüfe anschließend die dort genannte Codezeile.";
  }

  function buildExerciseHints(exercise, code, errorText = "", attempt = 1) {
    const hints = [];
    const trimmedCode = String(code || "").trim();
    if (!trimmedCode || trimmedCode === exercise.starter.trim()) {
      hints.push("Im Startcode fehlen noch eigene Anweisungen. Arbeite die Schritte links nacheinander ab.");
    }
    if (/\bpass\b/.test(code)) {
      hints.push("`pass` ist nur ein Platzhalter. Ersetze ihn durch die Anweisungen, die die Funktion ausführen soll.");
    }
    if (/=\s*(?:#.*)?$/m.test(code)) {
      hints.push("Mindestens eine Zuweisung endet direkt nach dem Gleichheitszeichen. Rechts davon fehlt noch ein Wert oder Ausdruck.");
    }
    if (/^[ \t]*(?:if|elif|for|while|def)\b.*[^:\s][ \t]*$/m.test(code)) {
      hints.push("Nach einer Bedingung oder einem Schleifen- bzw. Funktionskopf (if, elif, for, while, def) muss ein Doppelpunkt stehen.");
    }
    if (/\bprint[ \t]+[^([\t =]/.test(code)) {
      hints.push("In Python 3 braucht `print` immer Klammern: schreibe print(...) statt print ...");
    }
    if (errorText) {
      hints.push(pythonDiagnostic(errorText));
    }
    const stagedHints = Array.isArray(exercise.hints) ? exercise.hints : exercise.instructions;
    if (stagedHints?.length) {
      hints.push(stagedHints[Math.min(Math.max(attempt - 1, 0), stagedHints.length - 1)]);
    }
    return [...new Set(hints)].slice(0, 3);
  }

  function showExerciseHint() {
    const exercise = exerciseById(parseRoute().id);
    const editor = document.querySelector("#codeEditor");
    if (!exercise || !editor) {
      return;
    }
    const attempt = Math.max(1, exerciseAttempts.get(exercise.id) || 1);
    const reviewError = lastExerciseReview?.exerciseId === exercise.id ? lastExerciseReview.error : "";
    showCoachFeedback(
      `Hinweis ${Math.min(attempt, 3)}`,
      "Gehe in einem kleinen Schritt weiter und prüfe danach erneut.",
      buildExerciseHints(exercise, editor.value, reviewError, attempt),
      "info",
      "Dieser Hinweis wird lokal aus Aufgabe, Code und Testergebnis erzeugt."
    );
  }

  function updateAiModeControl() {
    const active = aiModeEnabled();
    const provider = String(appConfig.aiProviderLabel || "der KI").trim();
    const container = document.querySelector("#aiModeSwitch");
    const status = document.querySelector("#aiModeStatus");
    const description = document.querySelector("#aiModeDescription");
    const toggle = document.querySelector("#aiModeToggleButton");
    const privacyNote = document.querySelector(".ai-privacy-note span");

    container?.classList.toggle("is-active", active);
    if (status) {
      status.textContent = active ? "aktiv" : "aus";
    }
    if (description) {
      description.textContent = active
        ? `Nach einer fehlgeschlagenen Prüfung fragt PythonLab automatisch ${provider} nach einem Lernhinweis.`
        : "Aktiviere den Modus freiwillig, wenn du nach Fehlversuchen zusätzliche Hinweise möchtest.";
    }
    if (toggle) {
      toggle.setAttribute("aria-checked", String(active));
      toggle.setAttribute("aria-label", `KI-Modus ${active ? "ausschalten" : "aktivieren"}`);
    }
    if (privacyNote) {
      privacyNote.textContent = `${active
        ? "Im aktiven KI-Modus wird der aktuelle Code nach fehlgeschlagenen Prüfungen übertragen."
        : "Ohne Aktivierung wird Code nur übertragen, wenn du ausdrücklich auf „KI jetzt um Hilfe bitten“ klickst."} Trage keine Namen oder persönlichen Daten in den Code ein.`;
    }
  }

  function activateAiMode() {
    setSessionValue(aiConsentStorageKey, "1");
    setSessionValue(aiModeStorageKey, "1");
    updateAiModeControl();
    showCoachFeedback(
      "KI-Modus ist aktiv",
      "Nach einer fehlgeschlagenen Prüfung erhältst du zusätzlich einen kleinen KI-Hinweis.",
      ["Die lokale Prüfung bleibt maßgeblich.", "Du kannst den Modus über den Schalter jederzeit wieder ausschalten."],
      "ai",
      "Der Modus gilt nur für diese Browsersitzung."
    );
  }

  function toggleAiMode() {
    if (!aiFeedbackAvailable()) {
      return;
    }
    if (aiModeEnabled()) {
      setSessionValue(aiModeStorageKey, "");
      updateAiModeControl();
      showCoachFeedback(
        "KI-Modus ist ausgeschaltet",
        "Code wird jetzt nur noch übertragen, wenn du den KI-Button ausdrücklich anklickst.",
        [],
        "info",
        "Lokale Prüfung und Lernhinweise bleiben aktiv."
      );
      return;
    }
    if (sessionValue(aiConsentStorageKey) === "1") {
      activateAiMode();
      return;
    }
    pendingAiFeedbackRequest = { activateOnly: true };
    if (aiConsentDialog) {
      aiConsentDialog.returnValue = "";
      aiConsentDialog.showModal();
    }
  }

  function aiFeedbackKey(exercise, code, localReview, depth = "standard") {
    return [exercise.id, depth, code, localReview.passed, localReview.diagnostic, localReview.error].join("\n---\n");
  }

  function displayAiFeedback(feedback, cached = false, deep = false) {
    const observations = [
      ...(Array.isArray(feedback.strengths) ? feedback.strengths.map((item) => `Das klappt schon: ${item}`) : []),
      ...(Array.isArray(feedback.nextSteps) ? feedback.nextSteps : []),
      feedback.hint ? `Denkimpuls: ${feedback.hint}` : "",
      feedback.question ? `Frage an dich: ${feedback.question}` : ""
    ].filter(Boolean);
    showCoachFeedback(
      deep ? "Vertiefte KI-Rückmeldung" : "KI-Rückmeldung",
      feedback.summary || "Hier ist ein zusätzlicher Blick auf deinen Lösungsweg.",
      observations,
      "ai",
      `${cached ? "Gespeicherter " : ""}${deep ? "Ausführlichere Analyse mit mehr Erklärungstiefe. " : ""}KI-generierter Lernhinweis – kann Fehler enthalten und ersetzt nicht die automatische Prüfung.`
    );
    if (!deep && aiFeedbackAvailable()) {
      const panel = document.querySelector("#coachFeedback");
      if (panel) {
        const actions = document.createElement("div");
        actions.className = "coach-actions";
        const deepButton = document.createElement("button");
        deepButton.type = "button";
        deepButton.id = "aiDeepButton";
        deepButton.className = "button button-secondary button-small";
        deepButton.setAttribute("data-ai-deep", "1");
        deepButton.innerHTML = `<i data-lucide="search"></i> Vertiefende Hilfe`;
        const note = document.createElement("small");
        note.className = "coach-actions-note";
        note.textContent = "Reicht der Tipp noch nicht? Hol dir eine ausführlichere Analyse mit mehr Erklärungstiefe.";
        actions.append(deepButton, note);
        panel.append(actions);
        renderIcons();
      }
    }
  }

  async function requestAiFeedback(options = {}) {
    const automatic = options.automatic === true;
    const deep = options.deep === true;
    const depth = deep ? "deep" : "standard";
    const exercise = exerciseById(parseRoute().id);
    const editor = document.querySelector("#codeEditor");
    const button = document.querySelector("#aiFeedbackButton");
    const endpoint = aiFeedbackEndpoint();
    if (!exercise || !editor || !endpoint || (automatic && !aiModeEnabled())) {
      return;
    }

    if (sessionValue(aiConsentStorageKey) !== "1") {
      pendingAiFeedbackRequest = { automatic, deep };
      if (aiConsentDialog) {
        aiConsentDialog.returnValue = "";
        aiConsentDialog.showModal();
      }
      return;
    }

    const localReview = lastExerciseReview?.exerciseId === exercise.id
      ? {
          passed: lastExerciseReview.passed,
          diagnostic: lastExerciseReview.diagnostic,
          error: String(lastExerciseReview.error || "").slice(0, 3000)
        }
      : { passed: null, diagnostic: "Noch nicht lokal geprüft.", error: "" };
    const feedbackKey = aiFeedbackKey(exercise, editor.value, localReview, depth);
    const submittedCode = editor.value;
    const feedbackStillRelevant = () => {
      const currentEditor = document.querySelector("#codeEditor");
      if (parseRoute().id !== exercise.id || currentEditor?.value !== submittedCode) {
        return false;
      }
      const currentReview = lastExerciseReview?.exerciseId === exercise.id
        ? {
            passed: lastExerciseReview.passed,
            diagnostic: lastExerciseReview.diagnostic,
            error: String(lastExerciseReview.error || "").slice(0, 3000)
          }
        : { passed: null, diagnostic: "Noch nicht lokal geprüft.", error: "" };
      return aiFeedbackKey(exercise, submittedCode, currentReview, depth) === feedbackKey;
    };
    if (aiFeedbackCache.has(feedbackKey)) {
      displayAiFeedback(aiFeedbackCache.get(feedbackKey), true, deep);
      return;
    }
    if (aiFeedbackInFlight) {
      return;
    }

    aiFeedbackInFlight = true;
    if (button) {
      button.disabled = true;
      button.innerHTML = `<i data-lucide="loader-circle"></i> KI denkt nach ...`;
    }
    showCoachFeedback(
      deep ? "Vertiefende KI-Hilfe" : "KI-Lerncoach",
      deep
        ? "Die KI sieht sich deinen Code jetzt ausführlicher an. Das dauert einen Moment ..."
        : automatic
          ? "Die lokale Prüfung hat einen Lernpunkt gefunden. Die KI formuliert einen passenden Denkimpuls ..."
          : "Dein Code wird analysiert ...",
      [],
      "ai",
      "Die KI ergänzt die lokale Prüfung, entscheidet aber nicht über den Abschluss."
    );
    renderIcons();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        mode: "cors",
        credentials: "omit",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exercise: {
            id: exercise.id,
            title: exercise.title,
            description: exercise.description,
            instructions: exercise.instructions
          },
          code: editor.value.slice(0, 12000),
          localReview,
          attempt: Math.max(1, exerciseAttempts.get(exercise.id) || 1),
          depth,
          sessionId: aiSessionId()
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(data.error || "Der KI-Dienst ist gerade nicht erreichbar.");
      }
      const feedback = data.feedback || {};
      if (aiFeedbackCache.size >= 25) {
        aiFeedbackCache.delete(aiFeedbackCache.keys().next().value);
      }
      aiFeedbackCache.set(feedbackKey, feedback);
      if (feedbackStillRelevant()) {
        displayAiFeedback(feedback, false, deep);
      }
    } catch (error) {
      if (feedbackStillRelevant()) {
        showCoachFeedback(
          "KI-Tipp derzeit nicht verfügbar",
          error.message || "Der Dienst konnte nicht antworten.",
          ["Nutze den lokalen Lernhinweis oder prüfe deinen Code erneut. Die Aufgabe kann weiterhin vollständig abgeschlossen werden."],
          "warning",
          "Es wurden keine Auswirkungen auf Prüfung, XP oder Lernfortschritt vorgenommen."
        );
      }
    } finally {
      aiFeedbackInFlight = false;
      if (button?.isConnected) {
        button.disabled = false;
        button.innerHTML = `<i data-lucide="sparkles"></i> KI jetzt um Hilfe bitten`;
        renderIcons();
      }
    }
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
      <div><strong>${state.completedExercises.length + state.completedCommands.length + state.completedStructograms.length}</strong><small>Aufgaben</small></div>`;
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
      if (parsed?.app !== backupAppId || !parsed.data) {
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

    worker = new Worker("python-worker.js?v=0.18.0", { type: "module" });
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

  async function runLessonExample(sectionIndex, button) {
    const route = parseRoute();
    const lesson = route.name === "lesson" ? lessonById(route.id) : null;
    const section = lesson?.sections?.[sectionIndex];
    const output = document.querySelector(`#exampleOutput-${sectionIndex}`);
    const outputLabel = output?.querySelector("strong");
    const outputText = output?.querySelector("pre");
    const exampleInput = document.querySelector(`#exampleInput-${sectionIndex}`)?.value ?? section?.exampleInput ?? "";
    if (!section?.code || !button || !output || !outputLabel || !outputText) {
      return;
    }

    button.disabled = true;
    button.innerHTML = `<i data-lucide="loader-circle"></i> Python arbeitet ...`;
    output.hidden = false;
    output.classList.remove("is-error");
    outputLabel.textContent = "Ausgabe";
    outputText.textContent = "Das Beispiel wird ausgeführt ...";
    renderIcons();

    try {
      const result = await executePython(section.code, exampleInput);
      const error = [result.stderr, result.error].filter(Boolean).join("\n");
      if (error) {
        output.classList.add("is-error");
        outputLabel.textContent = "Fehler";
        outputText.textContent = error;
      } else {
        outputText.textContent = result.stdout || "Das Programm wurde ohne sichtbare Ausgabe beendet.";
      }
    } catch (error) {
      output.classList.add("is-error");
      outputLabel.textContent = "Fehler";
      outputText.textContent = error.message;
    } finally {
      if (button.isConnected) {
        button.disabled = false;
        button.innerHTML = `<i data-lucide="play"></i> Beispiel erneut ausführen`;
        renderIcons();
      }
    }
  }

  function normalizeOutput(value) {
    return String(value)
      .replace(/\r\n/g, "\n")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n");
  }

  function outputLines(value) {
    const normalized = normalizeOutput(value);
    return normalized ? normalized.split("\n") : [];
  }

  function outputNumbers(line) {
    return (String(line).match(/-?\d+(?:[.,]\d+)?/g) || [])
      .map((value) => Number(value.replace(",", ".")));
  }

  function outputText(line) {
    return String(line)
      .normalize("NFKC")
      .toLocaleLowerCase("de-DE")
      .replace(/-?\d+(?:[.,]\d+)?/g, " ")
      .replace(/[.!?,;:]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function sameNumber(actual, expected) {
    return Number.isFinite(actual) && Number.isFinite(expected) && Math.abs(actual - expected) < 0.001;
  }

  function outputLineMatches(actual, expected) {
    const actualNumbers = outputNumbers(actual);
    const expectedNumbers = outputNumbers(expected);
    const actualText = outputText(actual);
    const expectedText = outputText(expected);

    if (!expectedNumbers.length) {
      return actualText === expectedText;
    }
    if (expectedNumbers.length === 1 && !expectedText) {
      return sameNumber(actualNumbers.at(-1), expectedNumbers[0]);
    }
    if (actualNumbers.length !== expectedNumbers.length
      || !expectedNumbers.every((value, index) => sameNumber(actualNumbers[index], value))) {
      return false;
    }
    return !expectedText || actualText === expectedText || actualText.includes(expectedText);
  }

  function outputMatches(actual, expected) {
    const actualLines = outputLines(actual);
    const expectedLines = outputLines(expected);
    return actualLines.length === expectedLines.length
      && expectedLines.every((line, index) => outputLineMatches(actualLines[index], line));
  }

  function outputMismatchDiagnostic(actual, expected) {
    const actualLines = outputLines(actual);
    const expectedLines = outputLines(expected);
    if (actualLines.length !== expectedLines.length) {
      return `Erwartet werden ${expectedLines.length} nichtleere Ausgabezeilen, dein Programm erzeugt ${actualLines.length}.`;
    }
    const mismatchIndex = expectedLines.findIndex((line, index) => !outputLineMatches(actualLines[index], line));
    if (mismatchIndex >= 0) {
      const actualLine = actualLines[mismatchIndex] || "(leer)";
      return `Prüfe Ausgabezeile ${mismatchIndex + 1}: Erwartet wird sinngemäß „${expectedLines[mismatchIndex]}“, ausgegeben wurde „${actualLine}“.`;
    }
    return "Die Ausgabe enthält noch eine Abweichung von der Aufgabenstellung.";
  }

  function lastOutputNumber(value) {
    const lines = normalizeOutput(value).split("\n").filter(Boolean);
    const lastLine = lines.at(-1) || "";
    const numbers = lastLine.match(/-?\d+(?:[.,]\d+)?/g);
    return numbers ? Number(numbers.at(-1).replace(",", ".")) : Number.NaN;
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
    const attempt = checkSolution ? (exerciseAttempts.get(exercise.id) || 0) + 1 : 0;
    if (checkSolution) {
      exerciseAttempts.set(exercise.id, attempt);
    }
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
          const diagnostic = pythonDiagnostic(combinedError);
          lastExerciseReview = { exerciseId: exercise.id, passed: false, error: combinedError, diagnostic };
          showResult(false, "Noch nicht ganz", diagnostic);
          showCoachFeedback(
            "Die Prüfung hat eine konkrete Spur gefunden",
            diagnostic,
            buildExerciseHints(exercise, editor.value, combinedError, attempt),
            "warning",
            "Automatisch aus Python-Fehler und Aufgabentests ermittelt."
          );
          if (aiModeEnabled()) {
            void requestAiFeedback({ automatic: true });
          }
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
        passed = outputMatches(result.stdout, check.expected);
      } else if (check.type === "outputNumber") {
        passed = Math.abs(lastOutputNumber(result.stdout) - check.expected) < 0.001;
      }

      if (passed) {
        const lesson = lessonById(exercise.lessonId);
        const firstExerciseCompletion = award("exercise", exercise.id, exercise.xp);
        const firstLessonCompletion = lesson ? award("lesson", lesson.id, lesson.xp) : false;
        const gainedXp = (firstExerciseCompletion ? exercise.xp : 0) + (firstLessonCompletion ? lesson.xp : 0);
        lastExerciseReview = { exerciseId: exercise.id, passed: true, error: "", diagnostic: "Alle automatischen Prüfungen bestanden." };
        showResult(
          true,
          firstLessonCompletion ? "Aufgabe und Lektion abgeschlossen" : "Aufgabe gelöst",
          gainedXp
            ? `Dein Code besteht die Prüfung. ${gainedXp} XP wurden gutgeschrieben.`
            : "Deine Lösung besteht die Prüfung weiterhin."
        );
        showCoachFeedback(
          "Prüfung bestanden",
          "Dein Programm läuft und erfüllt die überprüfbaren Anforderungen.",
          [
            "Die Aufgabe wurde mit den vorgesehenen Testwerten geprüft.",
            "Du kannst den Code jetzt noch mit eigenen Werten ausführen oder zur nächsten Lektion gehen."
          ],
          "success",
          "Der Abschluss basiert ausschließlich auf reproduzierbaren Tests – nicht auf einer KI-Einschätzung."
        );
      } else {
        const diagnostic = check.type === "output"
          ? outputMismatchDiagnostic(result.stdout, check.expected)
          : check.type === "outputNumber"
            ? "Der letzte ausgegebene Zahlenwert ist noch nicht das erwartete Ergebnis."
            : "Mindestens eine überprüfte Anforderung ist noch nicht erfüllt.";
        lastExerciseReview = { exerciseId: exercise.id, passed: false, error: "", diagnostic };
        showResult(false, "Noch nicht ganz", diagnostic);
        showCoachFeedback(
          "Nächster sinnvoller Schritt",
          diagnostic,
          buildExerciseHints(exercise, editor.value, "", attempt),
          "warning",
          "Die Hinweise werden stufenweise konkreter, wenn du erneut prüfst."
        );
        if (aiModeEnabled()) {
          void requestAiFeedback({ automatic: true });
        }
      }
    } catch (error) {
      setConsole(error.message, true);
      if (checkSolution) {
        lastExerciseReview = { exerciseId: exercise.id, passed: false, error: error.message, diagnostic: "Python konnte die Prüfung nicht abschließen." };
        showResult(false, "Python ist gerade nicht bereit", "Prüfe die Internetverbindung und versuche es erneut.");
        showCoachFeedback(
          "Technischer Hinweis",
          "Die Prüfung konnte nicht vollständig ausgeführt werden.",
          ["Dein Lernstand wurde dadurch nicht verändert. Starte den Code nach einem Moment erneut."],
          "warning",
          "Die lokale Python-Laufzeit wird beim nächsten Versuch neu verwendet."
        );
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
    } else if (route.name === "competencies") {
      renderCompetencies();
    } else if (route.name === "commands") {
      renderCommands();
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
    } else if (route.name === "command") {
      renderCommandDetail(route.id);
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
    const commandButton = event.target.closest("[data-command]");
    const exerciseButton = event.target.closest("[data-exercise]");
    const structogramButton = event.target.closest("[data-structogram]");
    const filterButton = event.target.closest("[data-filter]");
    const runnerTab = event.target.closest("[data-runner-tab]");
    const orderButton = event.target.closest("[data-order-action]");
    const lessonExampleButton = event.target.closest("[data-run-example]");

    if (lessonExampleButton) {
      runLessonExample(Number(lessonExampleButton.dataset.runExample), lessonExampleButton);
      return;
    }

    if (routeButton) {
      event.preventDefault();
      go(routeButton.dataset.route);
    }
    if (lessonButton) {
      go(`lesson/${lessonButton.dataset.lesson}`);
    }
    if (commandButton) {
      go(`command/${commandButton.dataset.command}`);
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
    if (event.target.closest("#hintCodeButton")) {
      showExerciseHint();
    }
    if (event.target.closest("#aiModeToggleButton")) {
      toggleAiMode();
    }
    if (event.target.closest("#aiFeedbackButton")) {
      requestAiFeedback();
    }
    if (event.target.closest("#aiDeepButton")) {
      requestAiFeedback({ deep: true });
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
        exerciseAttempts.delete(exercise.id);
        lastExerciseReview = null;
        setConsole("Die Aufgabe wurde zurückgesetzt.");
        document.querySelector("#resultBanner").className = "result-banner";
        const coachFeedback = document.querySelector("#coachFeedback");
        if (coachFeedback) {
          coachFeedback.hidden = true;
        }
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
    const card = event.target.closest("[data-lesson], [data-command], [data-exercise], [data-structogram]");
    if (card && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      if (card.dataset.lesson) {
        go(`lesson/${card.dataset.lesson}`);
      } else if (card.dataset.command) {
        go(`command/${card.dataset.command}`);
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
    if (event.target.id === "commandExerciseForm") {
      event.preventDefault();
      checkCommandExercise(event.target);
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
  document.querySelector("#pointsInfoButton")?.addEventListener("click", () => {
    pointsDialog?.showModal();
    renderIcons();
  });
  aiConsentDialog?.addEventListener("close", () => {
    const accepted = aiConsentDialog.returnValue === "activate";
    const pendingRequest = pendingAiFeedbackRequest;
    pendingAiFeedbackRequest = null;
    if (!accepted) {
      return;
    }
    activateAiMode();
    if (pendingRequest && !pendingRequest.activateOnly) {
      requestAiFeedback({ automatic: pendingRequest.automatic === true, deep: pendingRequest.deep === true });
    }
  });
  if (aiPrivacyLink && appConfig.aiPrivacyUrl) {
    aiPrivacyLink.href = String(appConfig.aiPrivacyUrl);
  }
  themeToggleButton?.addEventListener("click", toggleTheme);
  document.querySelector("#backupCloseButton").addEventListener("click", () => backupDialog.close());
  document.querySelector("#exportProgressButton").addEventListener("click", exportProgress);
  document.querySelector("#importProgressButton").addEventListener("click", () => progressFileInput.click());
  progressFileInput.addEventListener("change", () => importProgressFile(progressFileInput.files?.[0]));

  window.addEventListener("hashchange", renderRoute);

  applyTheme(readTheme(), false);
  createWorker();
  renderRoute();
  if (!state.name && !sessionStorage.getItem("pythonlab-profile-seen")) {
    sessionStorage.setItem("pythonlab-profile-seen", "1");
    window.setTimeout(() => profileDialog.showModal(), 350);
  }
})();
