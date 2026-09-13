const LESSONS = [
  {
    id: "tables",
    number: "01",
    concept: "SELECT",
    title: "Database မြေပုံကိုဖွင့်မယ်",
    brief: "စုံထောက်ကောင်းတစ်ယောက်လို အရင်ဆုံး ကိုယ်ရှာဖွေရမယ့် table တွေကို သိအောင်လုပ်ပါ။",
    task: "Database ထဲမှာရှိတဲ့ table နာမည်အားလုံးကို ပြပါ။",
    learning: "SELECT က database ထဲက ကိုယ်လိုချင်တဲ့ data ကို ဖတ်ဖို့သုံးတဲ့ command ဖြစ်ပါတယ်။ sqlite_master က SQLite ရဲ့ table စာရင်းကို သိမ်းထားတဲ့နေရာပါ။",
    starter: `SELECT name
FROM sqlite_master
WHERE type = '_____';`,
    hints: [
      "ရှာချင်တာက table တွေဖြစ်လို့ type ရဲ့ value ကို table လို့ထည့်ပါ။",
      "စာသား value ကို single quotes (') နှစ်ခုကြားမှာ ရေးရပါတယ်။"
    ],
    solution: `SELECT name
FROM sqlite_master
WHERE type = 'table';`,
    expected: `SELECT name FROM sqlite_master WHERE type = 'table';`,
    evidence: "Table ၄ ခုရဲ့နာမည်ကို သင်ရရှိခဲ့ပြီ။"
  },
  {
    id: "report",
    number: "02",
    concept: "WHERE + AND",
    title: "မှန်ကန်တဲ့ crime report ကိုရှာမယ်",
    brief: "မှတ်မိတဲ့အချက်သုံးခု—အမှုအမျိုးအစား၊ ရက်စွဲနဲ့ မြို့—ကိုသုံးပြီး report တစ်ခုတည်းကျန်အောင် စစ်ထုတ်ပါ။",
    task: "2024-03-10 နေ့ SQL Village မှာဖြစ်ခဲ့တဲ့ theft report ကိုရှာပါ။",
    learning: "WHERE က row တွေကို condition နဲ့ စစ်ထုတ်ပါတယ်။ Condition အားလုံးမှန်ရမယ်ဆိုရင် AND နဲ့ ဆက်ရေးပါ။",
    starter: `SELECT *
FROM crime_reports
WHERE type = '_____'
  AND date = '__________'
  AND city = '___________';`,
    hints: [
      "မှတ်မိထားတဲ့ values တွေက theft, 2024-03-10 နဲ့ SQL Village ပါ။",
      "Column တစ်ခုစီကို = နဲ့နှိုင်းပြီး condition သုံးခုလုံးကို AND နဲ့ဆက်ပါ။"
    ],
    solution: `SELECT *
FROM crime_reports
WHERE type = 'theft'
  AND date = '2024-03-10'
  AND city = 'SQL Village';`,
    expected: `SELECT * FROM crime_reports WHERE type = 'theft' AND date = '2024-03-10' AND city = 'SQL Village';`,
    evidence: "Report ထဲမှာ Padauk Street နဲ့ Inya Road မှ သက်သေနှစ်ဦးကို ဖော်ပြထားတယ်။"
  },
  {
    id: "witness-one",
    number: "03",
    concept: "ORDER BY + LIMIT",
    title: "ပထမသက်သေကိုရှာမယ်",
    brief: "ပထမသက်သေက Padauk Street မှာ အမြင့်ဆုံးအိမ်နံပါတ်နဲ့ နေထိုင်တယ်။",
    task: "Padauk Street က လူတွေကို အိမ်နံပါတ်အကြီးဆုံးမှစီပြီး ပထမတစ်ယောက်ကိုပဲ ပြပါ။",
    learning: "ORDER BY ... DESC က နံပါတ်အကြီးဆုံးမှ အသေးဆုံးစီပါတယ်။ LIMIT 1 က result တစ်ခုတည်းသာ ပြစေပါတယ်။",
    starter: `SELECT *
FROM people
WHERE address_street = '_____________'
ORDER BY address_number ____
LIMIT _;`,
    hints: [
      "လမ်းနာမည်က Padauk Street ဖြစ်ပြီး အကြီးဆုံးကိုအရင်ရဖို့ DESC သုံးပါ။",
      "နောက်ဆုံးမှာ LIMIT 1 ထည့်ရင် ပထမဆုံး row တစ်ခုသာကျန်ပါမယ်။"
    ],
    solution: `SELECT *
FROM people
WHERE address_street = 'Padauk Street'
ORDER BY address_number DESC
LIMIT 1;`,
    expected: `SELECT * FROM people WHERE address_street = 'Padauk Street' ORDER BY address_number DESC LIMIT 1;`,
    evidence: "ပထမသက်သေက person_id 3 — U Hla Aung ဖြစ်တယ်။"
  },
  {
    id: "witness-two",
    number: "04",
    concept: "LIKE",
    title: "ဒုတိယသက်သေကိုရှာမယ်",
    brief: "ဒုတိယသက်သေရဲ့နာမည်က Thiri နဲ့စပြီး Inya Road မှာနေတယ်။",
    task: "နာမည် Thiri နဲ့စပြီး Inya Road မှာနေတဲ့လူကို ရှာပါ။",
    learning: "LIKE နဲ့ % wildcard ကိုသုံးရင် စာသားအစိတ်အပိုင်းဖြင့် ရှာနိုင်ပါတယ်။ 'Thiri%' ဆိုတာ Thiri နဲ့စတဲ့နာမည်အားလုံးပါ။",
    starter: `SELECT *
FROM people
WHERE name LIKE '_______'
  AND address_street = '_________';`,
    hints: [
      "နာမည်အဆုံးပိုင်းကို မသိသေးတဲ့အတွက် Thiri နောက်မှာ % wildcard ထည့်ပါ။",
      "လမ်းနာမည် condition ကို AND address_street = 'Inya Road' နဲ့ထပ်စစ်ပါ။"
    ],
    solution: `SELECT *
FROM people
WHERE name LIKE 'Thiri%'
  AND address_street = 'Inya Road';`,
    expected: `SELECT * FROM people WHERE name LIKE 'Thiri%' AND address_street = 'Inya Road';`,
    evidence: "ဒုတိယသက်သေက person_id 4 — Thiri Win ဖြစ်တယ်။"
  },
  {
    id: "interviews",
    number: "05",
    concept: "JOIN",
    title: "သက်သေတွေရဲ့ interview ကိုဖတ်မယ်",
    brief: "လူနာမည်က people table မှာရှိပြီး ထွက်ဆိုချက်က interviews table မှာရှိတယ်။ person_id နဲ့ ချိတ်ဆက်ပါ။",
    task: "person_id 3 နဲ့ 4 တို့ရဲ့ နာမည်နဲ့ transcript ကို JOIN သုံးပြီးပြပါ။",
    learning: "JOIN က table နှစ်ခုမှာ အဓိပ္ပာယ်တူတဲ့ key ကိုဆက်ပြီး ဆိုင်ရာ data ကို row တစ်ခုထဲမှာ ပြပေးပါတယ်။",
    starter: `SELECT p.name, i.transcript
FROM people AS p
JOIN interviews AS i
  ON p._________ = i._________
WHERE p.person_id IN (_, _);`,
    hints: [
      "Table နှစ်ခုစလုံးမှာ တွေ့ရတဲ့ key က person_id ဖြစ်ပါတယ်။",
      "သက်သေနှစ်ဦးရဲ့ ID ကို IN (3, 4) လို့ တစ်ခါတည်းစစ်နိုင်ပါတယ်။"
    ],
    solution: `SELECT p.name, i.transcript
FROM people AS p
JOIN interviews AS i
  ON p.person_id = i.person_id
WHERE p.person_id IN (3, 4);`,
    expected: `SELECT p.name, i.transcript FROM people AS p JOIN interviews AS i ON p.person_id = i.person_id WHERE p.person_id IN (3, 4);`,
    evidence: "တရားခံဟာ FitLife Gym က gold member တစ်ယောက်ဖြစ်တယ်။"
  },
  {
    id: "thief",
    number: "06",
    concept: "FINAL JOIN",
    title: "ရွှေဘဲရုပ်ခိုးသူကို ဖော်ထုတ်မယ်",
    brief: "နောက်ဆုံး clue နှစ်ခုကို memberships table မှာ စစ်ပြီး တရားခံနာမည်ကို people table ကနေ ယူပါ။",
    task: "FitLife Gym ရဲ့ gold member ကိုရှာပြီး name, age, gym_name နဲ့ membership_status ပြပါ။",
    learning: "JOIN condition နဲ့ WHERE conditions ကိုပေါင်းသုံးရင် table မတူတဲ့အချက်အလက်တွေကို တိကျစွာရှာနိုင်ပါတယ်။",
    starter: `SELECT p.name, p.age, m.gym_name, m.membership_status
FROM people AS p
JOIN memberships AS m
  ON p.person_id = m.person_id
WHERE m.gym_name = '___________'
  AND m.membership_status = '____';`,
    hints: [
      "people နဲ့ memberships ကို person_id တူတဲ့ row တွေဖြင့် JOIN လုပ်ပါ။",
      "နောက်ဆုံး conditions က gym_name = 'FitLife Gym' နဲ့ membership_status = 'gold' ပါ။"
    ],
    solution: `SELECT p.name, p.age, m.gym_name, m.membership_status
FROM people AS p
JOIN memberships AS m
  ON p.person_id = m.person_id
WHERE m.gym_name = 'FitLife Gym'
  AND m.membership_status = 'gold';`,
    expected: `SELECT p.name, p.age, m.gym_name, m.membership_status FROM people AS p JOIN memberships AS m ON p.person_id = m.person_id WHERE m.gym_name = 'FitLife Gym' AND m.membership_status = 'gold';`,
    evidence: "Nandar Hlaing က ရွှေဘဲရုပ်ကို ခိုးယူခဲ့သူဖြစ်တယ်။"
  }
];

const STORAGE_KEY = "sql-village-golden-duck:v1";
const FORBIDDEN_SQL = /\b(insert|update|delete|drop|alter|create|replace|attach|detach|vacuum|reindex|pragma)\b/i;
const STATUS_STYLES = {
  neutral: "status-panel status-neutral",
  success: "status-panel status-success",
  error: "status-panel status-error"
};

class DatabaseClient {
  constructor() {
    this.worker = null;
    this.requestId = 0;
    this.pending = new Map();
  }

  async open() {
    if (this.worker) this.worker.terminate();
    this.worker = new Worker("scripts/db-worker.js");
    this.worker.onmessage = ({ data }) => {
      const request = this.pending.get(data.id);
      if (!request) return;
      this.pending.delete(data.id);
      if (data.error) request.reject(new Error(data.error));
      else request.resolve(data);
    };
    this.worker.onerror = (event) => {
      for (const request of this.pending.values()) {
        request.reject(new Error(event.message || "SQL worker မစတင်နိုင်ပါ။"));
      }
      this.pending.clear();
    };

    const response = await fetch("sql-village-theft.db", { cache: "no-store" });
    if (!response.ok) throw new Error("Database file ကို download မလုပ်နိုင်ပါ။");
    const buffer = await response.arrayBuffer();
    await this.send("open", { buffer }, [buffer]);
  }

  async query(sql) {
    const response = await this.send("exec", { sql });
    return response.results || [];
  }

  send(action, payload = {}, transfer = []) {
    return new Promise((resolve, reject) => {
      const id = ++this.requestId;
      this.pending.set(id, { resolve, reject });
      this.worker.postMessage({ id, action, ...payload }, transfer);
    });
  }
}

const db = new DatabaseClient();
let editor = null;
let busy = false;
let dbReady = false;
let state = loadState();

const elements = {
  stepNav: document.querySelector("#step-nav"),
  mobileProgress: document.querySelector("#mobile-progress"),
  lesson: document.querySelector("#lesson-card"),
  databaseStatus: document.querySelector("#database-status"),
  reset: document.querySelector("#reset-case"),
  start: document.querySelector("#start-case"),
  schemaDialog: document.querySelector("#schema-dialog"),
  openSchema: document.querySelector("#open-schema"),
  closeSchema: document.querySelector("#close-schema")
};

function initialState() {
  return { activeStep: 0, unlockedStep: 0, complete: false, drafts: {} };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved || typeof saved.unlockedStep !== "number") return initialState();
    const unlockedStep = Math.min(Math.max(saved.unlockedStep, 0), LESSONS.length - 1);
    return {
      activeStep: Math.min(Math.max(saved.activeStep ?? unlockedStep, 0), unlockedStep),
      unlockedStep,
      complete: Boolean(saved.complete),
      drafts: saved.drafts && typeof saved.drafts === "object" ? saved.drafts : {}
    };
  } catch {
    return initialState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function validateReadOnlyQuery(sql) {
  const withoutComments = sql
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/--.*$/gm, " ")
    .trim();
  const singleStatement = withoutComments.replace(/;\s*$/, "").trim();

  if (!singleStatement) throw new Error("Query တစ်ခုရေးပြီး Run query ကိုနှိပ်ပါ။");
  if (!/^select\b/i.test(singleStatement)) {
    throw new Error("ဒီလေ့ကျင့်ခန်းမှာ SELECT query တစ်ခုတည်းသာ အသုံးပြုနိုင်ပါတယ်။");
  }
  if (singleStatement.includes(";") || FORBIDDEN_SQL.test(singleStatement)) {
    throw new Error("Database ကိုမပြောင်းလဲနိုင်အောင် SELECT statement တစ်ခုတည်းသာ ခွင့်ပြုထားပါတယ်။");
  }
  return singleStatement;
}

function normalizedResult(result) {
  if (!result) return { columns: [], rows: [] };
  return {
    columns: result.columns.map((column) => String(column).trim().toLowerCase()),
    rows: result.values
      .map((row) => row.map((value) => value === null ? null : value))
      .sort((left, right) => JSON.stringify(left).localeCompare(JSON.stringify(right)))
  };
}

function resultsMatch(submission, expected) {
  return JSON.stringify(normalizedResult(submission)) === JSON.stringify(normalizedResult(expected));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function renderProgress() {
  elements.stepNav.innerHTML = LESSONS.map((lesson, index) => {
    const locked = index > state.unlockedStep;
    const completed = index < state.unlockedStep || state.complete;
    const active = index === state.activeStep;
    const stateClass = locked ? "step-locked" : active ? "step-active" : completed ? "step-complete" : "step-ready";
    const icon = completed ? "✓" : lesson.number;
    return `
      <li>
        <button class="step-button ${stateClass}" type="button" data-step="${index}" ${locked ? "disabled" : ""} ${active ? 'aria-current="step"' : ""}>
          <span class="step-icon" aria-hidden="true">${icon}</span>
          <span class="min-w-0 text-left">
            <span class="step-concept">${lesson.concept}</span>
            <span class="step-name">${lesson.title}</span>
          </span>
          ${locked ? '<span class="ml-auto text-sm" aria-hidden="true">🔒</span>' : ""}
        </button>
      </li>`;
  }).join("");

  elements.stepNav.querySelectorAll("[data-step]").forEach((button) => {
    button.addEventListener("click", () => changeStep(Number(button.dataset.step)));
  });

  const completedCount = state.complete ? LESSONS.length : state.unlockedStep;
  elements.mobileProgress.innerHTML = `
    <div class="flex items-center justify-between gap-4">
      <span class="eyebrow text-evidence-navy">Case progress</span>
      <span class="text-sm font-bold text-evidence-navy">${completedCount} / ${LESSONS.length}</span>
    </div>
    <div class="mt-3 grid grid-cols-6 gap-2" aria-hidden="true">
      ${LESSONS.map((_, index) => `<span class="h-2 rounded-full ${index < completedCount ? "bg-success-jade" : index === state.activeStep ? "bg-duck-gold" : "bg-evidence-navy/15"}"></span>`).join("")}
    </div>`;

  const duck = document.querySelector("#duck-marker");
  if (duck) duck.style.setProperty("--duck-progress", `${(Math.min(completedCount, 5) / 5) * 100}%`);
}

function renderLesson() {
  const lesson = LESSONS[state.activeStep];
  const isComplete = state.complete && state.activeStep === LESSONS.length - 1;

  if (editor) {
    editor.toTextArea();
    editor = null;
  }

  elements.lesson.innerHTML = `
    <div class="lesson-heading">
      <div>
        <p class="eyebrow">Evidence ${lesson.number} · ${lesson.concept}</p>
        <h2 class="mt-2 text-2xl font-bold leading-relaxed text-evidence-navy sm:text-3xl">${lesson.title}</h2>
      </div>
      <span class="evidence-number" aria-hidden="true">${lesson.number}</span>
    </div>

    <p class="mt-5 text-base leading-8 text-slate-700">${lesson.brief}</p>

    <section class="learning-note" aria-labelledby="learn-${lesson.id}">
      <span class="learning-icon" aria-hidden="true">?</span>
      <div>
        <h3 id="learn-${lesson.id}" class="font-bold text-evidence-navy">ဒီ step မှာ ဘာသင်မလဲ</h3>
        <p class="mt-1 leading-7 text-slate-700">${lesson.learning}</p>
      </div>
    </section>

    <section class="mt-7" aria-labelledby="task-${lesson.id}">
      <h3 id="task-${lesson.id}" class="text-lg font-bold text-evidence-navy">လုပ်ရန်</h3>
      <p class="mt-2 leading-7 text-slate-700">${lesson.task}</p>

      <form id="query-form" class="mt-5">
        <label class="sr-only" for="query-editor">SQL query</label>
        <textarea id="query-editor" name="query">${escapeHtml(state.drafts[lesson.id] ?? lesson.starter)}</textarea>
        <p class="mt-2 text-xs font-semibold text-slate-500">Shortcut: Shift + Enter</p>
        <div class="mt-4 flex flex-wrap gap-3">
          <button id="run-query" class="button-primary" type="submit" ${busy || !dbReady ? "disabled" : ""}>
            <span aria-hidden="true">▶</span> Run query
          </button>
          <button id="show-hint" class="button-secondary" type="button">Hint ကြည့်မယ်</button>
          <button id="restore-starter" class="button-quiet" type="button">Starter ပြန်ထားမယ်</button>
        </div>
      </form>
    </section>

    <section id="hint-panel" class="mt-5 hidden" aria-live="polite"></section>
    <section id="query-status" class="mt-5" aria-live="polite" aria-atomic="true"></section>
    <section id="query-result" class="mt-5" aria-label="Query result"></section>

    ${isComplete ? completionMarkup() : ""}`;

  const textarea = document.querySelector("#query-editor");
  editor = CodeMirror.fromTextArea(textarea, {
    mode: "text/x-sql",
    lineNumbers: true,
    indentWithTabs: false,
    smartIndent: true,
    tabSize: 2,
    lineWrapping: true,
    viewportMargin: Infinity
  });
  editor.setSize("100%", "auto");
  editor.on("change", () => {
    state.drafts[lesson.id] = editor.getValue();
    saveState();
  });
  editor.on("keydown", (_instance, event) => {
    if (event.shiftKey && event.key === "Enter") {
      event.preventDefault();
      document.querySelector("#query-form").requestSubmit();
    }
  });

  let hintLevel = 0;
  document.querySelector("#query-form").addEventListener("submit", handleQuerySubmit);
  document.querySelector("#restore-starter").addEventListener("click", () => {
    editor.setValue(lesson.starter);
    setStatus("neutral", "Starter query ကို ပြန်ထားပြီးပါပြီ။ ကွက်လပ်တွေကို ပြန်ဖြည့်ကြည့်ပါ။");
    document.querySelector("#query-result").innerHTML = "";
  });
  document.querySelector("#show-hint").addEventListener("click", () => {
    hintLevel = Math.min(hintLevel + 1, 2);
    renderHints(hintLevel);
  });
}

function renderHints(level) {
  const lesson = LESSONS[state.activeStep];
  const panel = document.querySelector("#hint-panel");
  panel.classList.remove("hidden");
  panel.innerHTML = `
    <div class="hint-card">
      <p class="eyebrow text-evidence-red-ink">Hint ${level} / 2</p>
      <p class="mt-2 leading-7 text-slate-700">${lesson.hints[level - 1]}</p>
      ${level === 2 ? '<button id="show-solution" class="button-quiet mt-3" type="button">Query အပြည့်ထည့်မယ်</button>' : ""}
    </div>`;

  if (level === 2) {
    document.querySelector("#show-solution").addEventListener("click", () => {
      editor.setValue(lesson.solution);
      setStatus("neutral", "Query အပြည့်ကို editor ထဲထည့်ထားပါတယ်။ Run query နှိပ်ပြီး result ကိုဖတ်ပါ။");
    });
  }
}

async function handleQuerySubmit(event) {
  event.preventDefault();
  if (busy) return;

  const lesson = LESSONS[state.activeStep];
  const runButton = document.querySelector("#run-query");
  document.querySelector("#query-result").innerHTML = "";

  try {
    busy = true;
    runButton.disabled = true;
    runButton.innerHTML = '<span class="spinner" aria-hidden="true"></span> စစ်နေပါတယ်';
    setStatus("neutral", "Query ကို database ထဲမှာ run နေပါတယ်…");

    const sql = validateReadOnlyQuery(editor.getValue());
    const submissionResults = await db.query(sql);
    const expectedResults = await db.query(lesson.expected);
    const submission = submissionResults[0];
    const expected = expectedResults[0];
    renderResult(submission);

    if (!resultsMatch(submission, expected)) {
      setStatus("error", "Result မကိုက်သေးပါ။ Column နာမည်နဲ့ row တွေကို task နဲ့ ပြန်တိုက်ကြည့်ပါ။ Hint ကိုလည်းဖွင့်ကြည့်နိုင်ပါတယ်။");
      return;
    }

    const wasNew = state.activeStep === state.unlockedStep && !state.complete;
    if (wasNew && state.activeStep < LESSONS.length - 1) {
      state.unlockedStep += 1;
    } else if (state.activeStep === LESSONS.length - 1) {
      state.complete = true;
    }
    saveState();
    renderProgress();

    const nextButton = state.activeStep < LESSONS.length - 1
      ? '<button id="next-step" class="button-primary mt-4" type="button">နောက် clue သို့ →</button>'
      : '<button id="show-finish" class="button-primary mt-4" type="button">အမှုကိုပိတ်မယ် →</button>';
    setStatus("success", `<strong>မှန်ပါတယ်!</strong> ${lesson.evidence}${nextButton}`);
    document.querySelector(state.activeStep < LESSONS.length - 1 ? "#next-step" : "#show-finish")
      .addEventListener("click", () => {
        if (state.activeStep < LESSONS.length - 1) changeStep(state.activeStep + 1);
        else renderLesson();
      });
  } catch (error) {
    setStatus("error", `<strong>Query ကို မလုပ်ဆောင်နိုင်ပါ။</strong> ${escapeHtml(error.message)}`);
  } finally {
    busy = false;
    runButton.disabled = false;
    runButton.innerHTML = '<span aria-hidden="true">▶</span> Run query';
  }
}

function setStatus(type, message) {
  const panel = document.querySelector("#query-status");
  if (!panel) return;
  panel.className = `mt-5 ${STATUS_STYLES[type]}`;
  panel.innerHTML = message;
}

function renderResult(result) {
  const target = document.querySelector("#query-result");
  if (!result || !result.values.length) {
    target.innerHTML = '<div class="empty-result">Result row မရှိသေးပါ။ Filter values တွေကို ပြန်စစ်ပါ။</div>';
    return;
  }

  const head = result.columns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join("");
  const body = result.values.map((row) => `
    <tr>${row.map((value) => `<td>${escapeHtml(value ?? "NULL")}</td>`).join("")}</tr>`).join("");
  target.innerHTML = `
    <div class="result-heading">
      <h3>Query result</h3>
      <span>${result.values.length} row${result.values.length === 1 ? "" : "s"}</span>
    </div>
    <div class="result-scroll" tabindex="0">
      <table class="result-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>`;
}

function completionMarkup() {
  return `
    <section class="completion-card" aria-labelledby="case-closed-title">
      <div class="completion-duck" aria-hidden="true"><img src="assets/golden-duck.svg" alt=""></div>
      <div>
        <p class="eyebrow text-evidence-red-ink">Case closed</p>
        <h3 id="case-closed-title" class="mt-2 text-3xl font-bold text-evidence-navy">တရားခံက Nandar Hlaing ပါ!</h3>
        <p class="mt-3 leading-7 text-slate-700">ရွှေဘဲရုပ်ကို ပြန်လည်တွေ့ရှိပါပြီ။ သင်က SELECT, WHERE, ORDER BY, LIMIT, LIKE နဲ့ JOIN ကိုသုံးပြီး အမှုကို ဖြေရှင်းနိုင်ခဲ့ပါတယ်။</p>
        <div class="mt-5 flex flex-wrap gap-3">
          <a class="button-secondary" href="walkthrough.html">Worksheet ကြည့်မယ်</a>
          <button class="button-quiet" type="button" data-reset-complete>အစမှပြန်လုပ်မယ်</button>
        </div>
      </div>
    </section>`;
}

function changeStep(index) {
  if (index < 0 || index > state.unlockedStep || index >= LESSONS.length) return;
  state.activeStep = index;
  saveState();
  renderProgress();
  renderLesson();
  document.querySelector("#lesson-card").scrollIntoView({ behavior: "smooth", block: "start" });
}

async function resetCase() {
  localStorage.removeItem(STORAGE_KEY);
  state = initialState();
  dbReady = false;
  elements.databaseStatus.textContent = "Database ပြန်ဖွင့်နေသည်…";
  elements.databaseStatus.dataset.state = "loading";
  await db.open();
  dbReady = true;
  elements.databaseStatus.textContent = "Database ready";
  elements.databaseStatus.dataset.state = "ready";
  renderProgress();
  renderLesson();
}

async function start() {
  renderProgress();
  renderLesson();

  elements.start.addEventListener("click", () => {
    document.querySelector("#case-workspace").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => editor?.focus(), 450);
  });
  elements.reset.addEventListener("click", resetCase);
  elements.lesson.addEventListener("click", (event) => {
    if (event.target.closest("[data-reset-complete]")) resetCase();
  });
  elements.openSchema.addEventListener("click", () => elements.schemaDialog.showModal());
  elements.closeSchema.addEventListener("click", () => elements.schemaDialog.close());
  elements.schemaDialog.addEventListener("click", (event) => {
    if (event.target === elements.schemaDialog) elements.schemaDialog.close();
  });

  try {
    await db.open();
    dbReady = true;
    elements.databaseStatus.textContent = "Database ready";
    elements.databaseStatus.dataset.state = "ready";
    const runButton = document.querySelector("#run-query");
    if (runButton) runButton.disabled = false;
  } catch (error) {
    elements.databaseStatus.textContent = "Database မဖွင့်နိုင်ပါ";
    elements.databaseStatus.dataset.state = "error";
    setStatus("error", `${escapeHtml(error.message)} Local folder ကို double-click မလုပ်ဘဲ static server ဖြင့်ဖွင့်ပါ။`);
  }
}

window.__sqlVillage = {
  lessons: LESSONS,
  getState: () => structuredClone(state),
  reset: resetCase
};

start();
