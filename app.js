const STORAGE_KEY = "xiaociben-progress-v1";
const SESSION_SIZE = 10;

const state = {
  view: "home",
  moduleId: "all",
  mode: "cards",
  deck: [],
  index: 0,
  answers: [],
  flipped: false,
  locked: false,
  libraryKind: "story",
  libraryFilter: "all",
  libraryQuery: "",
  remoteItems: [],
  libraryItem: null,
  pageIndex: 0,
  showStoryText: false,
  showZh: false,
  playing: false,
  utterance: null,
  comprehensionIndex: 0,
  comprehensionAnswers: [],
  novel: null,
  chapterIndex: 0,
  wordCard: null,
};

function emptyProgress() {
  return {
    seen: {},
    correct: {},
    wrong: {},
    custom: [],
    lastDate: "",
    streak: 0,
    completedStories: {},
    completedBooks: {},
    completedDictation: {},
    reading: {},
  };
}

function loadProgress() {
  try {
    return { ...emptyProgress(), ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return emptyProgress();
  }
}

function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function backupPayload() {
  return {
    app: "xiaociben",
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: loadProgress(),
  };
}

function parseBackup(raw) {
  const data = typeof raw === "string" ? JSON.parse(raw) : raw;
  const progress = data && data.progress ? data.progress : data;
  if (!progress || typeof progress !== "object") throw new Error("empty");
  return { ...emptyProgress(), ...progress };
}

function setBackupFeedback(text) {
  if ($("backup-feedback")) $("backup-feedback").textContent = text;
}

function saveBackupFile() {
  const blob = new Blob([JSON.stringify(backupPayload(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "小词本学习记录.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  setBackupFeedback("已经保存。iPad 上一般在「文件」App 的下载里。");
}

async function copyBackupText() {
  const text = JSON.stringify(backupPayload());
  try {
    await navigator.clipboard.writeText(text);
    setBackupFeedback("已经复制。可以发给微信「文件传输助手」，换设备时再粘贴回来。");
  } catch {
    $("backup-paste").value = text;
    $("backup-paste").focus();
    $("backup-paste").select();
    setBackupFeedback("请长按上面的框，自己复制。");
  }
}

function restoreProgress(progress) {
  saveProgress(progress);
  renderProgress();
  renderHome();
  show("progress");
}

function importBackupText(raw) {
  try {
    const progress = parseBackup(raw);
    restoreProgress(progress);
    $("backup-paste").value = "";
    setBackupFeedback("学习记录已经找回来了。单词、故事和听写都会还在。");
  } catch {
    setBackupFeedback("这段记录读不出来。请再保存一次，或者换用文件找回。");
  }
}

function importBackupFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => importBackupText(String(reader.result || ""));
  reader.onerror = () => setBackupFeedback("这个文件打不开，请再试一次。");
  reader.readAsText(file);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function touchStreak() {
  const progress = loadProgress();
  const today = todayKey();
  if (progress.lastDate === today) return progress;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = yesterday.toISOString().slice(0, 10);
  progress.streak = progress.lastDate === yKey ? progress.streak + 1 : 1;
  progress.lastDate = today;
  saveProgress(progress);
  return progress;
}

function wordLevel(word) {
  if (word.source === "grade3" && word.level) return word.level;
  if (word.module === "mine") return 1;
  const moduleId = Number(word.module);
  if (moduleId >= 8) return 3;
  if (moduleId >= 4) return 2;
  return 1;
}

function recommendedLevel(progress) {
  const known = allWords().filter((word) => (progress.correct[word.id] || 0) >= 2).length;
  const storyWins = Object.values(progress.completedStories || {}).filter((item) => item.ok).length;
  const bookWins = Object.values(progress.completedBooks || {}).filter((item) => item.ok).length;
  const dictWins = Object.values(progress.completedDictation || {}).filter((item) => item.ok).length;
  const points = Math.floor(known / 8) + storyWins + bookWins + dictWins;
  if (points >= 8) return 3;
  if (points >= 3) return 2;
  return 1;
}

function allWords() {
  const progress = loadProgress();
  return GRADE3_WORDS.concat(WORDS, progress.custom || []);
}

function wordsForModule(moduleId) {
  if (moduleId === "wrong") {
    const progress = loadProgress();
    return allWords().filter((word) => (progress.wrong[word.id] || 0) > (progress.correct[word.id] || 0));
  }
  if (moduleId === "mine") return loadProgress().custom || [];
  if (moduleId === "reading") return (loadProgress().custom || []).filter((word) => word.source === "reading");
  if (moduleId === "level-1") return GRADE3_WORDS.filter((word) => word.level === 1);
  if (moduleId === "level-2") return GRADE3_WORDS.filter((word) => word.level === 2);
  if (moduleId === "level-3") return GRADE3_WORDS.filter((word) => word.level === 3);
  if (moduleId === "grade3-all") return GRADE3_WORDS.slice();
  if (moduleId === "all") return allWords();
  return WORDS.filter((word) => String(word.module) === String(moduleId));
}

function pickDeck(source) {
  const rec = recommendedLevel(loadProgress());
  const easier = source.filter((word) => wordLevel(word) < rec);
  const current = source.filter((word) => wordLevel(word) === rec);
  const harder = source.filter((word) => wordLevel(word) > rec);
  const mix = shuffle(current).concat(shuffle(easier), shuffle(harder));
  return (mix.length ? mix : shuffle(source)).slice(0, SESSION_SIZE);
}

function shuffle(list) {
  const next = list.slice();
  for (let i = next.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

let speakToken = 0;

function speakRate() {
  let level = 1;
  if (state.view === "play" && state.deck[state.index]) level = wordLevel(state.deck[state.index]);
  else if (state.libraryItem?.level) level = state.libraryItem.level;
  return level === 1 ? 0.82 : level === 2 ? 0.9 : 0.96;
}

function speak(text, onend) {
  if (!window.speechSynthesis) {
    onend?.();
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-GB";
  utterance.rate = speakRate();
  utterance.onend = () => onend?.();
  utterance.onerror = () => onend?.();
  state.utterance = utterance;
  window.speechSynthesis.speak(utterance);
}

function stopSpeak() {
  state.playing = false;
  speakToken += 1;
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakLines(lines, onIndex, onDone) {
  stopSpeak();
  const token = speakToken;
  state.playing = true;
  let index = 0;
  const next = () => {
    if (token !== speakToken || !state.playing || index >= lines.length) {
      if (token === speakToken) {
        state.playing = false;
        onDone?.();
      }
      return;
    }
    onIndex?.(index);
    speak(lines[index].en, () => {
      index += 1;
      next();
    });
  };
  next();
}

function $(id) {
  return document.getElementById(id);
}

function show(view) {
  if (view !== "story" && view !== "reader" && view !== "novel-reader") stopSpeak();
  if (view !== "novel-reader") hideWordSheet();
  state.view = view;
  document.querySelectorAll(".screen").forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.view === view);
  });
}

function moduleLabel(moduleId) {
  if (moduleId === "all") return "全部单词";
  if (moduleId === "wrong") return "错词本";
  if (moduleId === "mine") return "我加的词";
  if (moduleId === "level-1") return "三年级浅";
  if (moduleId === "level-2") return "三年级";
  if (moduleId === "level-3") return "三年级深";
  if (moduleId === "grade3-all") return "三年级全部单词";
  const found = MODULES.find((item) => item.id === Number(moduleId));
  return found ? `${found.subtitle} ${found.title}` : "单词";
}

function latestReading() {
  const progress = loadProgress();
  const entries = Object.entries(progress.reading || {})
    .map(([id, record]) => ({ id, record, novel: findNovel(id) }))
    .filter((item) => item.novel && item.record);
  entries.sort((a, b) => String(b.record.updatedAt || "").localeCompare(String(a.record.updatedAt || "")));
  return entries[0] || null;
}

function renderHome() {
  const progress = loadProgress();
  const known = allWords().filter((word) => (progress.correct[word.id] || 0) >= 2).length;
  const weak = wordsForModule("wrong").length;
  const rec = recommendedLevel(progress);
  $("stat-known").textContent = String(known);
  $("stat-wrong").textContent = String(weak);
  $("stat-streak").textContent = String(progress.streak || 0);
  $("home-recommend").textContent = `现在建议练习「${levelName(rec)}」。你也可以自己选更难或更容易的。`;
  const latest = latestReading();
  $("home-continue").hidden = !latest;
  if (latest) {
    const place = novelPageLabel(latest.novel, latest.record.chapterIndex || 0, latest.record.pageIndex || 0);
    $("home-continue-title").textContent = latest.record.finished
      ? `再读一遍：《${latest.novel.titleZh}》`
      : `接着读：《${latest.novel.titleZh}》`;
    $("home-continue-meta").textContent = latest.record.finished ? "已经读完，可以从头或从目录再看" : place;
  }
  show("home");
}

function renderModules() {
  const rec = recommendedLevel(loadProgress());
  $("module-list").innerHTML = [
    moduleButton("level-1", "三年级浅", `美国三年级上 · ${wordsForModule("level-1").length} 个词${rec === 1 ? " · 建议" : ""}`),
    moduleButton("level-2", "三年级", `美国三年级标准 · ${wordsForModule("level-2").length} 个词${rec === 2 ? " · 建议" : ""}`),
    moduleButton("level-3", "三年级深", `美国三年级下 · ${wordsForModule("level-3").length} 个词${rec === 3 ? " · 建议" : ""}`),
    moduleButton("grade3-all", "三年级全部单词", `${GRADE3_WORDS.length} 个词，从容易的开始`),
    moduleButton("all", "全部（含课本）", `${allWords().length} 个词`),
    moduleButton("wrong", "错词本", "先把容易错的词拿回来"),
    moduleButton("mine", "我加的词", "课本以外、你自己收集的词"),
  ]
    .concat(
      MODULES.map((item) =>
        moduleButton(
          item.id,
          `${item.subtitle} ${item.title}`,
          `${WORDS.filter((word) => word.module === item.id).length} 个词 · ${levelName(item.id >= 8 ? 3 : item.id >= 4 ? 2 : 1)}`,
        ),
      ),
    )
    .join("");
  show("modules");
}

function moduleButton(id, title, desc) {
  return `<button class="module-card" data-module="${id}">
    <span><strong>${title}</strong><br><small>${desc}</small></span>
    <span>›</span>
  </button>`;
}

function renderModes() {
  $("mode-title").textContent = moduleLabel(state.moduleId);
  const count = wordsForModule(state.moduleId).length;
  $("mode-count").textContent = count ? `这一组有 ${count} 个词，会从比较容易的开始。` : "这一组还没有单词";
  show("modes");
}

function startPlay(mode) {
  const source = wordsForModule(state.moduleId);
  if (!source.length) {
    $("mode-count").textContent = "先去单词本加几个词，或换一个单元试试。";
    return;
  }
  state.mode = mode;
  state.libraryKind = "words";
  state.deck = pickDeck(source);
  state.index = 0;
  state.answers = [];
  state.flipped = false;
  state.locked = false;
  touchStreak();
  renderPlay();
}

function currentWord() {
  return state.deck[state.index];
}

function renderPlay() {
  const word = currentWord();
  const total = state.deck.length;
  $("play-progress-text").textContent = `${state.index + 1} / ${total}`;
  $("play-bar").style.width = `${((state.index + 1) / total) * 100}%`;
  $("play-title").textContent = state.mode === "cards" ? "翻卡片" : state.mode === "quiz" ? "选择题" : "拼写听写";

  $("card-panel").hidden = state.mode !== "cards";
  $("quiz-panel").hidden = state.mode !== "quiz";
  $("spell-panel").hidden = state.mode !== "spell";

  if (state.mode === "cards") renderCard(word);
  if (state.mode === "quiz") renderQuiz(word);
  if (state.mode === "spell") renderSpell(word);
  show("play");
}

function renderCard(word) {
  state.flipped = false;
  $("flash").classList.remove("is-back");
  $("card-en").textContent = word.en;
  $("card-ipa").textContent = word.ipa || "";
  $("card-zh").textContent = word.zh;
  $("card-example").textContent = word.example || "";
  $("card-example-zh").textContent = word.exampleZh || "";
}

function renderQuiz(word) {
  state.locked = false;
  const askEnglish = Math.random() < 0.5;
  state.quizAskEnglish = askEnglish;
  $("quiz-prompt").textContent = askEnglish ? word.en : word.zh;
  $("quiz-hint").textContent = askEnglish ? "选出正确的中文意思" : "选出正确的英文";
  $("quiz-feedback").textContent = "";

  const pool = allWords().filter((item) => item.id !== word.id);
  const options = shuffle([word, ...shuffle(pool).slice(0, 3)]);
  $("quiz-options").innerHTML = options
    .map((item) => {
      const label = askEnglish ? item.zh : item.en;
      return `<button class="option" data-word-option="${item.id}">${label}</button>`;
    })
    .join("");
}

function renderSpell(word) {
  state.locked = false;
  $("spell-prompt").textContent = word.zh;
  $("spell-input").value = "";
  $("spell-feedback").textContent = "";
  $("spell-next").hidden = true;
  $("spell-check").hidden = false;
  setTimeout(() => {
    $("spell-input").focus();
    speak(word.en);
  }, 200);
}

function markResult(word, ok) {
  const progress = loadProgress();
  progress.seen[word.id] = (progress.seen[word.id] || 0) + 1;
  if (ok) progress.correct[word.id] = (progress.correct[word.id] || 0) + 1;
  else progress.wrong[word.id] = (progress.wrong[word.id] || 0) + 1;
  saveProgress(progress);
  state.answers.push({ id: word.id, ok, word });
}

function nextQuestion() {
  if (state.index >= state.deck.length - 1) {
    renderResult();
    return;
  }
  state.index += 1;
  renderPlay();
}

function normalizeAnswer(text) {
  return text.toLowerCase().replace(/[.,!?;:'"’]/g, "").replace(/\s+/g, " ").trim();
}

function libraryCollection() {
  if (state.libraryKind === "story") return STORIES;
  if (state.libraryKind === "book") return BOOKS;
  return DICTATION_SETS;
}

function completedMap(progress) {
  if (state.libraryKind === "story") return progress.completedStories || {};
  if (state.libraryKind === "book") return progress.completedBooks || {};
  return progress.completedDictation || {};
}

function filteredLibrary() {
  const local = libraryCollection().filter((item) => state.libraryFilter === "all" || item.level === Number(state.libraryFilter));
  const searched = searchItems(local, state.libraryQuery);
  const remote = (state.remoteItems || []).filter((item) => state.libraryKind !== "dictation");
  return searched.concat(searchItems(remote, state.libraryQuery));
}

function renderLibrary(kind) {
  state.libraryKind = kind;
  const titles = { story: "听故事", book: "看书", dictation: "听写" };
  const hints = {
    story: "可以直接搜书名或主题，比如「恐龙」「魔法」「侦探」。先听，再做两道题。",
    book: "搜你想看的书或主题。点句子就能听，读完做阅读题。",
    dictation: "按美国小学三年级来听写。从单词到更长的句子。",
  };
  $("library-title").textContent = titles[kind];
  $("library-hint").textContent = hints[kind];
  $("library-search-form").hidden = kind === "dictation";
  $("library-search-status").hidden = kind === "dictation";
  if ($("library-search") && $("library-search").value !== state.libraryQuery) {
    $("library-search").value = state.libraryQuery;
  }
  const rec = recommendedLevel(loadProgress());
  $("library-chips").innerHTML = ["all", 1, 2, 3]
    .map((value) => {
      const label = value === "all" ? "全部" : levelName(value);
      const extra = value === rec ? " · 建议" : "";
      const active = String(state.libraryFilter) === String(value) ? " active" : "";
      return `<button class="chip${active}" data-library-filter="${value}" type="button">${label}${extra}</button>`;
    })
    .join("");

  const progress = loadProgress();
  const done = completedMap(progress);
  const list = filteredLibrary();
  const hint = copyrightHint(state.libraryQuery);
  if (hint && !list.length) {
    $("library-search-status").textContent = `${hint.message}可以改搜：${hint.suggest}`;
  } else if (state.libraryQuery && !list.length) {
    $("library-search-status").textContent = `没有找到「${state.libraryQuery}」。试试：恐龙、魔法、侦探、太空、友谊、学校、足球。`;
  } else if (state.libraryQuery) {
    $("library-search-status").textContent = `找到 ${list.length} 本和「${state.libraryQuery}」有关的。`;
  } else {
    $("library-search-status").textContent = kind === "dictation" ? "" : "也可以搜英文书名，比如 lunch、owl、moon。";
  }

  $("library-list").innerHTML = list.length
    ? list
        .map((item) => {
          const mark = done[item.id] ? `<span class="done-mark">${done[item.id].ok ? "已完成" : "再试试"}</span>` : "";
          const extra = item.kind
            ? `${item.kind} · ${item.items.length} 题`
            : item.remote
              ? "公共版权书"
              : item.pages
                ? `${item.pages.length} 页`
                : `${item.sentences.length} 句`;
          return `<button class="module-card" data-open-item="${item.id}">
        <span>
          <strong>${item.title}</strong><br>
          <small>${item.titleZh} · ${extra}</small>
          <span class="level-pill">${item.remote ? "公共版权" : levelName(item.level)}</span>
        </span>
        <span>${mark} ›</span>
      </button>`;
        })
        .join("")
    : `<div class="empty">没有找到。换个词再搜一次。</div>`;
  show("library");
}

async function searchPublicDomain(query) {
  if (!query.trim() || state.libraryKind === "dictation") return [];
  try {
    const url = `https://gutendex.com/books/?search=${encodeURIComponent(query.trim())}&languages=en`;
    const response = await fetch(url);
    if (!response.ok) return [];
    const data = await response.json();
    return (data.results || []).slice(0, 5).map((book) => ({
      id: `gutenberg-${book.id}`,
      remote: true,
      level: 3,
      title: book.title,
      titleZh: (book.authors || []).map((author) => author.name).join(", ") || "公共版权英文书",
      summary: book.title,
      tags: ["public domain", "gutenberg"],
      aliases: [query],
      sentences: null,
      pages: null,
      questions: [],
      textUrl:
        book.formats["text/plain; charset=utf-8"] ||
        book.formats["text/plain; charset=us-ascii"] ||
        book.formats["text/plain"],
    }));
  } catch {
    return [];
  }
}

function splitRemoteText(raw) {
  const cleaned = raw.replace(/\r/g, "").replace(/\n{3,}/g, "\n\n");
  const start = cleaned.search(/\n(CHAPTER|Chapter|STORY|Story|Once upon|In the)/);
  const body = cleaned.slice(start > 80 ? start : 0).slice(0, 4500);
  const parts = body
    .replace(/\n+/g, " ")
    .match(/[^.!?]+[.!?]+/g) || [];
  const sentences = parts
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter((line) => line.length > 20 && line.length < 280)
    .slice(0, 24)
    .map((en) => ({ en, zh: "" }));
  const pages = [];
  for (let i = 0; i < sentences.length; i += 3) {
    pages.push(sentences.slice(i, i + 3));
  }
  return { sentences: sentences.slice(0, 12), pages: pages.slice(0, 6) };
}

async function fillRemoteItem(item) {
  if (!item.textUrl) throw new Error("no text");
  const response = await fetch(item.textUrl);
  if (!response.ok) throw new Error("text failed");
  const raw = await response.text();
  const parts = splitRemoteText(raw);
  if (!parts.sentences.length) throw new Error("empty");
  item.sentences = parts.sentences;
  item.pages = parts.pages;
}

async function openLibraryItem(id) {
  const item = libraryCollection()
    .concat(state.remoteItems || [])
    .find((entry) => entry.id === id);
  if (!item) return;
  if (item.remote && !item.pages) {
    $("library-search-status").textContent = "正在打开这本书…";
    try {
      await fillRemoteItem(item);
    } catch {
      $("library-search-status").textContent = "这本书下载失败。请改搜书库里的主题，比如 恐龙、魔法、侦探。";
      return;
    }
  }
  state.libraryItem = item;
  state.index = 0;
  state.pageIndex = 0;
  state.answers = [];
  state.locked = false;
  state.showZh = false;
  state.showStoryText = false;
  touchStreak();
  if (state.libraryKind === "story") renderStory();
  if (state.libraryKind === "book") renderReader();
  if (state.libraryKind === "dictation") renderDictation();
}

function renderStory() {
  const item = state.libraryItem;
  $("story-title").textContent = item.title;
  $("story-level").textContent = levelName(item.level);
  $("story-toggle-text").classList.toggle("active", state.showStoryText);
  $("story-toggle-zh").classList.toggle("active", state.showZh);
  $("story-lines").innerHTML = state.showStoryText
    ? item.sentences
        .map(
          (line, index) => `<button class="sentence" data-line="${index}" type="button">
            <b>${line.en}</b>
            ${state.showZh ? `<small>${line.zh}</small>` : ""}
          </button>`,
        )
        .join("")
    : `<div class="empty">现在是只听模式。想看句子，点上面的「看原文」。</div>`;
  $("story-listen-hint").textContent = state.showStoryText ? "点某一句，可以再听这一句。" : "先听完整故事，再决定要不要看原文。";
  $("story-play").textContent = "开始听";
  show("story");
}

function highlightLine(index) {
  document.querySelectorAll("#story-lines .sentence, #reader-lines .sentence").forEach((node, nodeIndex) => {
    node.classList.toggle("active", nodeIndex === index);
  });
}

function playStory() {
  const item = state.libraryItem;
  $("story-play").textContent = "正在听…";
  speakLines(
    item.sentences,
    (index) => highlightLine(index),
    () => {
      $("story-play").textContent = "再听一遍";
    },
  );
}

function renderReader() {
  const item = state.libraryItem;
  const page = item.pages[state.pageIndex];
  const last = state.pageIndex >= item.pages.length - 1;
  $("reader-title").textContent = item.title;
  $("reader-kicker").textContent = `${item.titleZh} · ${levelName(item.level)}`;
  $("reader-page").textContent = `${state.pageIndex + 1} / ${item.pages.length}`;
  $("reader-bar").style.width = `${((state.pageIndex + 1) / item.pages.length) * 100}%`;
  $("reader-toggle-zh").classList.toggle("active", state.showZh);
  $("reader-prev").disabled = state.pageIndex === 0;
  $("reader-next").hidden = last;
  $("reader-quiz").hidden = !last;
  $("reader-lines").innerHTML = page
    .map(
      (line, index) => `<button class="sentence" data-read-line="${index}" type="button">
        <b>${line.en}</b>
        ${state.showZh ? `<small>${line.zh}</small>` : ""}
      </button>`,
    )
    .join("");
  show("reader");
}

function currentDictItem() {
  return state.libraryItem.items[state.index];
}

function renderDictation() {
  const item = state.libraryItem;
  const current = currentDictItem();
  const total = item.items.length;
  state.locked = false;
  $("dict-title").textContent = item.title;
  $("dict-kind").textContent = `${item.kind}听写`;
  $("dict-hint").textContent = "先听，再写出英文。不会可以看中文提示。";
  $("dict-progress-text").textContent = `${state.index + 1} / ${total}`;
  $("dict-bar").style.width = `${((state.index + 1) / total) * 100}%`;
  $("dict-input").value = "";
  $("dict-feedback").textContent = "";
  $("dict-next").hidden = true;
  $("dict-check").hidden = false;
  show("dictation");
  setTimeout(() => {
    $("dict-input").focus();
    speak(current.play);
  }, 200);
}

function currentQuestions() {
  if (state.libraryKind === "novel") return currentChapter()?.questions || [];
  return state.libraryItem?.questions || [];
}

function startComprehension() {
  stopSpeak();
  state.comprehensionIndex = 0;
  state.comprehensionAnswers = [];
  state.answers = [];
  state.locked = false;
  if (!currentQuestions().length) {
    state.answers = [{ ok: true, label: "已读完这一段" }];
    renderResult();
    return;
  }
  renderComprehension();
}

function renderComprehension() {
  const question = currentQuestions()[state.comprehensionIndex];
  const total = currentQuestions().length;
  $("comp-progress").textContent = `${state.comprehensionIndex + 1} / ${total}`;
  $("comp-prompt").textContent = question.q;
  $("comp-feedback").textContent = "";
  $("comp-options").innerHTML = question.options
    .map((option, index) => `<button class="option" data-comp-option="${index}">${option}</button>`)
    .join("");
  show("comprehension");
}

function markLibraryDone(ok) {
  const progress = loadProgress();
  const record = { ok, at: todayKey() };
  if (state.libraryKind === "story") progress.completedStories[state.libraryItem.id] = record;
  if (state.libraryKind === "book") progress.completedBooks[state.libraryItem.id] = record;
  if (state.libraryKind === "dictation") progress.completedDictation[state.libraryItem.id] = record;
  saveProgress(progress);
}

function renderResult() {
  const right = state.answers.filter((item) => item.ok).length;
  const total = state.answers.length;
  const passed = total > 0 && right >= Math.ceil(total * 0.7);
  $("result-score").textContent = `${right} / ${total}`;

  if (state.libraryKind === "words") {
    $("result-message").textContent =
      right === total ? "全对了，太棒了！" : passed ? "很不错，错的词再练一遍就更稳。" : "没关系，先把错词拿回来。";
    const missed = state.answers.filter((item) => !item.ok);
    $("result-wrong").innerHTML = missed.length
      ? missed.map((item) => `<li><b>${item.word.en}</b> · ${item.word.zh}</li>`).join("")
      : "<li>这一轮没有错词。</li>";
    $("retry-wrong").hidden = missed.length === 0;
    $("retry-same").textContent = "再练一轮";
  } else if (state.libraryKind === "novel") {
    const rec = recommendedLevel(loadProgress());
    $("result-message").textContent = passed
      ? `这一章看得很清楚。可以下一章，也可以试试「${levelName(rec)}」的单词。`
      : "再读一遍这一章，然后重做这两道题。";
    const missed = state.answers.filter((item) => !item.ok);
    $("result-wrong").innerHTML = missed.length
      ? missed.map((item) => `<li>${item.label || "再看一看这一题"}</li>`).join("")
      : "<li>这一章的题都对了。</li>";
    $("retry-wrong").hidden = true;
    $("retry-same").textContent = "回到这一章";
  } else {
    markLibraryDone(passed);
    const rec = recommendedLevel(loadProgress());
    $("result-message").textContent = passed
      ? `做得好！可以继续选，也可以试试「${levelName(rec)}」。`
      : "再听一遍或再读一遍，然后重做这两道题。";
    const missed = state.answers.filter((item) => !item.ok);
    $("result-wrong").innerHTML = missed.length
      ? missed.map((item) => `<li>${item.label || "再看一看这一题"}</li>`).join("")
      : "<li>这一轮都对了。</li>";
    $("retry-wrong").hidden = true;
    $("retry-same").textContent = state.libraryKind === "dictation" ? "再听写一遍" : "再来一遍";
  }
  show("result");
}

function renderBook(filter = "all") {
  const list = wordsForModule(filter);
  $("book-list").innerHTML = list.length
    ? list
        .map(
          (word) => `<button class="word-row" data-speak="${word.en}">
            <span><strong>${word.en}</strong><br><small>${word.zh} · ${word.example ? word.example : `${moduleLabel(word.module || "mine")} · ${levelName(wordLevel(word))}`}</small></span>
            <span>听</span>
          </button>`,
        )
        .join("")
    : `<div class="empty">这里还没有单词。</div>`;
  show("book");
}

function renderProgress() {
  const progress = loadProgress();
  const words = allWords();
  const practiced = words.filter((word) => progress.seen[word.id]).length;
  const known = words.filter((word) => (progress.correct[word.id] || 0) >= 2).length;
  const weak = wordsForModule("wrong");
  const rec = recommendedLevel(progress);
  $("progress-practiced").textContent = String(practiced);
  $("progress-known").textContent = String(known);
  $("progress-streak-big").textContent = `${progress.streak || 0} 天`;
  $("weak-list").innerHTML = weak.length
    ? weak.map((word) => `<li><b>${word.en}</b> · ${word.zh}</li>`).join("")
    : "<li>暂时没有错词，去练习一个单元吧。</li>";
  const storyCount = Object.keys(progress.completedStories || {}).length;
  const bookCount = Object.keys(progress.completedBooks || {}).length;
  const dictCount = Object.keys(progress.completedDictation || {}).length;
  const readingLines = NOVELS.map((novel) => {
    const record = (progress.reading || {})[novel.id];
    if (!record) return `<li>《${novel.titleZh}》：还没开始</li>`;
    if (record.finished) return `<li>《${novel.titleZh}》：已经读完</li>`;
    return `<li>《${novel.titleZh}》：${novelPageLabel(novel, record.chapterIndex || 0, record.pageIndex || 0)}</li>`;
  }).join("");
  $("library-done").innerHTML = `
    <li>当前建议难度：<b>${levelName(rec)}</b></li>
    <li>听过的故事：${storyCount} 个</li>
    <li>看过的短篇：${bookCount} 本</li>
    <li>完成的听写：${dictCount} 组</li>
    ${readingLines}
  `;
  show("progress");
}

function currentChapter() {
  return state.novel?.chapters[state.chapterIndex] || null;
}

function readingRecord(novelId) {
  return (loadProgress().reading || {})[novelId] || null;
}

function saveReadingPosition(extra = {}) {
  if (!state.novel) return;
  const progress = loadProgress();
  progress.reading = progress.reading || {};
  progress.reading[state.novel.id] = {
    ...(progress.reading[state.novel.id] || {}),
    chapterIndex: state.chapterIndex,
    pageIndex: state.pageIndex,
    updatedAt: new Date().toISOString(),
    ...extra,
  };
  saveProgress(progress);
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function tokenizeLine(en) {
  return en.match(/[A-Za-z]+(?:['’-][A-Za-z]+)*|[^A-Za-z]+/g) || [en];
}

function savedWordKeys() {
  return new Set(allWords().map((word) => word.en.toLowerCase()));
}

function lookupWord(raw) {
  const key = raw.toLowerCase();
  const fromBank = allWords().find((word) => word.en.toLowerCase() === key);
  if (fromBank) return { en: fromBank.en, zh: fromBank.zh, ipa: fromBank.ipa || "" };
  const gloss = GLOSSARY[key];
  if (gloss) return { en: raw, zh: gloss.zh, ipa: gloss.ipa || "" };
  const stem = key.replace(/'s$/, "").replace(/s$/, "");
  if (stem !== key && GLOSSARY[stem]) return { en: raw, zh: GLOSSARY[stem].zh, ipa: GLOSSARY[stem].ipa || "" };
  return { en: raw, zh: "先听发音。中文可以自己补在单词本里。", ipa: "" };
}

function hideWordSheet() {
  if (!$("word-sheet")) return;
  $("word-sheet").hidden = true;
  state.wordCard = null;
  document.querySelectorAll(".tap-word.is-open").forEach((node) => node.classList.remove("is-open"));
}

function openWordSheet(token, line) {
  const info = lookupWord(token);
  state.wordCard = { token, line, info };
  $("word-sheet-en").textContent = token;
  $("word-sheet-ipa").textContent = info.ipa || "";
  $("word-sheet-ipa").hidden = !info.ipa;
  $("word-sheet-zh").textContent = info.zh;
  $("word-sheet-sentence").textContent = line.en;
  $("word-sheet-feedback").textContent = "";
  $("word-sheet").hidden = false;
  document.querySelectorAll(".tap-word").forEach((node) => {
    node.classList.toggle("is-open", node.dataset.tapToken === token);
  });
}

function addReadingWord() {
  if (!state.wordCard) return;
  const { token, line, info } = state.wordCard;
  const progress = loadProgress();
  const exists = (progress.custom || []).some((word) => word.en.toLowerCase() === token.toLowerCase());
  if (exists) {
    $("word-sheet-feedback").textContent = "这个词已经在单词本里了。";
    return;
  }
  progress.custom.push({
    id: `read-${token.toLowerCase()}-${Date.now()}`,
    module: "mine",
    source: "reading",
    level: 1,
    en: token,
    zh: info.zh,
    ipa: info.ipa || "",
    example: line.en,
    exampleZh: line.zh || "",
  });
  saveProgress(progress);
  renderNovelReader();
  openWordSheet(token, line);
  $("word-sheet-feedback").textContent = "已经加入单词本，并带上了这一整句。";
}

function renderNovels() {
  hideWordSheet();
  $("novel-list").innerHTML = NOVELS.map((novel) => {
    const record = readingRecord(novel.id);
    let status = "还没开始 · 点这里选书";
    if (record?.finished) status = "已经读完 · 可以再读";
    else if (record) status = `读到${novelPageLabel(novel, record.chapterIndex || 0, record.pageIndex || 0)}`;
    return `<button class="module-card" data-open-novel="${novel.id}" type="button">
      <span><strong>${novel.titleZh}</strong><br><small>${novel.title} · ${novel.kindZh}<br>${status}</small></span>
      <span>›</span>
    </button>`;
  }).join("");
  show("novels");
}

function openNovelMenu(id) {
  state.novel = findNovel(id);
  state.libraryKind = "novel";
  if (!state.novel) return;
  const record = readingRecord(id);
  const chapter = state.novel.chapters[record?.chapterIndex || 0];
  const canResume = Boolean(record) && !record.finished;
  $("novel-chapter-title").textContent = state.novel.titleZh;
  $("novel-chapter-hero").innerHTML = `
    <h2>${escapeHtml(state.novel.title)}</h2>
    <p>${escapeHtml(state.novel.summaryZh)}</p>
    <p>${escapeHtml(state.novel.author)} · ${escapeHtml(state.novel.kindZh)} · ${state.novel.chapters.length} 章</p>
    ${
      record
        ? `<p class="recommend">${record.finished ? "这本书你已经读完了。" : `上次读到：${novelPageLabel(state.novel, record.chapterIndex || 0, record.pageIndex || 0)}`}</p>`
        : "<p>从第一章开始，读到哪里都会记住。</p>"
    }
    <div class="actions" style="margin-top:16px">
      <button class="primary" data-resume-novel="${state.novel.id}" type="button">${canResume ? "接着读" : record?.finished ? "再读一遍" : "开始读"}</button>
      <button class="ghost" data-go="novels" type="button">换一本</button>
    </div>
  `;
  $("novel-chapter-list").innerHTML = state.novel.chapters
    .map((item, index) => {
      const here = record && record.chapterIndex === index && !record.finished;
      return `<button class="module-card" data-open-chapter="${index}" type="button">
        <span><strong>第 ${index + 1} 章 · ${item.titleZh}</strong><br><small>${item.title}${here ? " · 上次读到这里" : ""}</small></span>
        <span>›</span>
      </button>`;
    })
    .join("");
  show("novel-chapters");
}

function openNovelAt(id, chapterIndex, pageIndex, restart) {
  state.novel = findNovel(id);
  state.libraryKind = "novel";
  if (!state.novel) return;
  const record = readingRecord(id);
  if (restart) {
    state.chapterIndex = 0;
    state.pageIndex = 0;
  } else {
    state.chapterIndex = chapterIndex ?? record?.chapterIndex ?? 0;
    state.pageIndex = pageIndex ?? record?.pageIndex ?? 0;
  }
  touchStreak();
  saveReadingPosition(restart ? { finished: false } : {});
  renderNovelReader();
}

function renderNovelReader() {
  const novel = state.novel;
  const chapter = currentChapter();
  if (!novel || !chapter) return;
  const page = chapter.pages[state.pageIndex];
  const lastPage = state.pageIndex >= chapter.pages.length - 1;
  const lastChapter = state.chapterIndex >= novel.chapters.length - 1;
  const saved = savedWordKeys();
  $("novel-reader-title").textContent = chapter.titleZh;
  $("novel-kicker").textContent = `${novel.titleZh} · 第 ${state.chapterIndex + 1} 章 ${chapter.title}`;
  $("novel-reader-page").textContent = `${state.pageIndex + 1} / ${chapter.pages.length}`;
  $("novel-bar").style.width = `${((state.chapterIndex + (state.pageIndex + 1) / chapter.pages.length) / novel.chapters.length) * 100}%`;
  $("novel-toggle-zh").classList.toggle("active", state.showZh);
  $("novel-prev").disabled = state.chapterIndex === 0 && state.pageIndex === 0;
  $("novel-next").hidden = lastPage && lastChapter;
  $("novel-next").textContent = lastPage ? "下一章" : "下一页";
  $("novel-quiz").hidden = !lastPage;
  $("novel-lines").innerHTML = page
    .map((line, lineIndex) => {
      const words = tokenizeLine(line.en)
        .map((part) => {
          if (!/[A-Za-z]/.test(part)) return escapeHtml(part);
          const savedClass = saved.has(part.toLowerCase()) ? " is-saved" : "";
          return `<button class="tap-word${savedClass}" data-tap-line="${lineIndex}" data-tap-token="${escapeHtml(part)}" type="button">${escapeHtml(part)}</button>`;
        })
        .join("");
      return `<div class="novel-line">
        <div class="novel-line-top">
          <button class="line-listen" data-novel-line="${lineIndex}" type="button">听</button>
          <p class="novel-text">${words}</p>
        </div>
        ${state.showZh ? `<small>${escapeHtml(line.zh)}</small>` : ""}
      </div>`;
    })
    .join("");
  saveReadingPosition({ finished: lastPage && lastChapter });
  show("novel-reader");
}

function stepNovelPage(delta) {
  const chapter = currentChapter();
  if (!chapter) return;
  const nextPage = state.pageIndex + delta;
  if (nextPage >= 0 && nextPage < chapter.pages.length) {
    state.pageIndex = nextPage;
    hideWordSheet();
    renderNovelReader();
    return;
  }
  if (delta > 0 && state.chapterIndex < state.novel.chapters.length - 1) {
    state.chapterIndex += 1;
    state.pageIndex = 0;
    hideWordSheet();
    renderNovelReader();
    return;
  }
  if (delta < 0 && state.chapterIndex > 0) {
    state.chapterIndex -= 1;
    state.pageIndex = state.novel.chapters[state.chapterIndex].pages.length - 1;
    hideWordSheet();
    renderNovelReader();
  }
}

function addCustomWord() {
  const en = $("new-en").value.trim();
  const zh = $("new-zh").value.trim();
  const example = $("new-example").value.trim();
  if (!en || !zh) {
    $("add-feedback").textContent = "英文和中文都要填写。";
    return;
  }
  const progress = loadProgress();
  progress.custom.push({
    id: `mine-${Date.now()}`,
    module: "mine",
    level: 1,
    en,
    zh,
    ipa: "",
    example,
    exampleZh: "",
  });
  saveProgress(progress);
  $("new-en").value = "";
  $("new-zh").value = "";
  $("new-example").value = "";
  $("add-feedback").textContent = "已经放进单词本了。";
}

function bindEvents() {
  document.body.addEventListener("click", (event) => {
    const go = event.target.closest("[data-go]");
    if (go) {
      const view = go.dataset.go;
      if (view === "home") renderHome();
      if (view === "modules") renderModules();
      if (view === "modes") renderModes();
      if (view === "book") renderBook(go.dataset.filter || "all");
      if (view === "stories") {
        state.libraryFilter = "all";
        state.libraryQuery = "";
        state.remoteItems = [];
        renderLibrary("story");
      }
      if (view === "reads") {
        state.libraryFilter = "all";
        state.libraryQuery = "";
        state.remoteItems = [];
        renderLibrary("book");
      }
      if (view === "dicts") {
        state.libraryFilter = "all";
        state.libraryQuery = "";
        renderLibrary("dictation");
      }
      if (view === "add") {
        $("add-feedback").textContent = "";
        show("add");
      }
      if (view === "progress") renderProgress();
      if (view === "help") show("help");
      if (view === "novels") renderNovels();
    }

    const start = event.target.closest("[data-start]");
    if (start) startPlay(start.dataset.start);

    const moduleBtn = event.target.closest("[data-module]");
    if (moduleBtn) {
      state.moduleId = moduleBtn.dataset.module;
      renderModes();
    }

    const filter = event.target.closest("[data-library-filter]");
    if (filter) {
      state.libraryFilter = filter.dataset.libraryFilter === "all" ? "all" : Number(filter.dataset.libraryFilter);
      renderLibrary(state.libraryKind);
    }

    const openItem = event.target.closest("[data-open-item]");
    if (openItem) openLibraryItem(openItem.dataset.openItem);

    const openNovel = event.target.closest("[data-open-novel]");
    if (openNovel) {
      openNovelMenu(openNovel.dataset.openNovel);
      return;
    }

    const resumeNovel = event.target.closest("[data-resume-novel]");
    if (resumeNovel) {
      const record = readingRecord(resumeNovel.dataset.resumeNovel);
      openNovelAt(resumeNovel.dataset.resumeNovel, undefined, undefined, Boolean(record?.finished) || !record);
      return;
    }

    const openChapter = event.target.closest("[data-open-chapter]");
    if (openChapter && state.novel) {
      openNovelAt(state.novel.id, Number(openChapter.dataset.openChapter), 0);
      return;
    }

    const tapWord = event.target.closest("[data-tap-token]");
    if (tapWord && state.view === "novel-reader") {
      const line = currentChapter().pages[state.pageIndex][Number(tapWord.dataset.tapLine)];
      openWordSheet(tapWord.dataset.tapToken, line);
      return;
    }

    const novelLine = event.target.closest("[data-novel-line]");
    if (novelLine && state.view === "novel-reader") {
      const line = currentChapter().pages[state.pageIndex][Number(novelLine.dataset.novelLine)];
      speak(line.en);
    }

    const speakBtn = event.target.closest("[data-speak]");
    if (speakBtn) speak(speakBtn.dataset.speak);

    const storyLine = event.target.closest("[data-line]");
    if (storyLine) {
      highlightLine(Number(storyLine.dataset.line));
      speak(state.libraryItem.sentences[Number(storyLine.dataset.line)].en);
    }

    const readLine = event.target.closest("[data-read-line]");
    if (readLine) {
      const page = state.libraryItem.pages[state.pageIndex];
      const index = Number(readLine.dataset.readLine);
      highlightLine(index);
      speak(page[index].en);
    }

    const wordOption = event.target.closest("[data-word-option]");
    if (wordOption && !state.locked && state.view === "play") {
      state.locked = true;
      const word = currentWord();
      const ok = wordOption.dataset.wordOption === word.id;
      wordOption.classList.add(ok ? "is-right" : "is-wrong");
      if (!ok) {
        const right = [...$("quiz-options").children].find((btn) => btn.dataset.wordOption === word.id);
        if (right) right.classList.add("is-right");
      }
      $("quiz-feedback").textContent = ok ? "答对了！" : `正确答案：${state.quizAskEnglish ? word.zh : word.en}`;
      markResult(word, ok);
      setTimeout(nextQuestion, 850);
    }

    const compOption = event.target.closest("[data-comp-option]");
    if (compOption && !state.locked && state.view === "comprehension") {
      state.locked = true;
      const question = currentQuestions()[state.comprehensionIndex];
      const choice = Number(compOption.dataset.compOption);
      const ok = choice === question.answer;
      compOption.classList.add(ok ? "is-right" : "is-wrong");
      if (!ok) {
        const right = [...$("comp-options").children].find((btn) => Number(btn.dataset.compOption) === question.answer);
        if (right) right.classList.add("is-right");
      }
      $("comp-feedback").textContent = ok ? "答对了！" : `正确答案：${question.options[question.answer]}`;
      state.answers.push({ ok, label: `${question.q} → ${question.options[question.answer]}` });
      setTimeout(() => {
        if (state.comprehensionIndex >= currentQuestions().length - 1) {
          renderResult();
        } else {
          state.comprehensionIndex += 1;
          state.locked = false;
          renderComprehension();
        }
      }, 850);
    }
  });

  $("flash").addEventListener("click", () => {
    state.flipped = !state.flipped;
    $("flash").classList.toggle("is-back", state.flipped);
  });

  $("know-yes").addEventListener("click", () => {
    markResult(currentWord(), true);
    nextQuestion();
  });

  $("know-no").addEventListener("click", () => {
    markResult(currentWord(), false);
    nextQuestion();
  });

  $("card-listen").addEventListener("click", () => speak(currentWord().en));
  $("quiz-listen").addEventListener("click", () => speak(currentWord().en));
  $("spell-listen").addEventListener("click", () => speak(currentWord().en));

  $("spell-check").addEventListener("click", () => {
    if (state.locked) return;
    const word = currentWord();
    const typed = $("spell-input").value.trim().replace(/\s+/g, " ");
    const ok = typed.toLowerCase() === word.en.toLowerCase();
    state.locked = true;
    markResult(word, ok);
    $("spell-feedback").textContent = ok ? "拼对了！" : `正确答案：${word.en}`;
    $("spell-check").hidden = true;
    $("spell-next").hidden = false;
  });

  $("spell-next").addEventListener("click", nextQuestion);
  $("spell-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") $("spell-check").click();
  });

  $("story-back").addEventListener("click", () => {
    stopSpeak();
    renderLibrary("story");
  });
  $("story-toggle-text").addEventListener("click", () => {
    state.showStoryText = !state.showStoryText;
    renderStory();
  });
  $("story-toggle-zh").addEventListener("click", () => {
    state.showZh = !state.showZh;
    state.showStoryText = true;
    renderStory();
  });
  $("story-play").addEventListener("click", playStory);
  $("story-stop").addEventListener("click", () => {
    stopSpeak();
    $("story-play").textContent = "继续听";
  });
  $("story-quiz").addEventListener("click", startComprehension);

  $("reader-back").addEventListener("click", () => {
    stopSpeak();
    renderLibrary("book");
  });
  $("reader-toggle-zh").addEventListener("click", () => {
    state.showZh = !state.showZh;
    renderReader();
  });
  $("reader-prev").addEventListener("click", () => {
    if (state.pageIndex > 0) {
      state.pageIndex -= 1;
      renderReader();
    }
  });
  $("reader-next").addEventListener("click", () => {
    if (state.pageIndex < state.libraryItem.pages.length - 1) {
      state.pageIndex += 1;
      renderReader();
    }
  });
  $("reader-quiz").addEventListener("click", startComprehension);
  $("comp-back").addEventListener("click", () => {
    if (state.libraryKind === "story") renderStory();
    else if (state.libraryKind === "novel") renderNovelReader();
    else renderReader();
  });

  $("dict-listen").addEventListener("click", () => speak(currentDictItem().play));
  $("dict-show-hint").addEventListener("click", () => {
    $("dict-hint").textContent = currentDictItem().hint;
  });
  $("dict-check").addEventListener("click", () => {
    if (state.locked) return;
    const current = currentDictItem();
    const ok = normalizeAnswer($("dict-input").value) === normalizeAnswer(current.answer);
    state.locked = true;
    state.answers.push({ ok, label: current.answer });
    $("dict-feedback").textContent = ok ? "写对了！" : `正确答案：${current.answer}`;
    $("dict-check").hidden = true;
    $("dict-next").hidden = false;
  });
  $("dict-next").addEventListener("click", () => {
    if (state.index >= state.libraryItem.items.length - 1) {
      renderResult();
      return;
    }
    state.index += 1;
    renderDictation();
  });
  $("dict-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") $("dict-check").click();
  });

  $("add-word").addEventListener("click", addCustomWord);
  $("backup-save").addEventListener("click", saveBackupFile);
  $("backup-copy").addEventListener("click", copyBackupText);
  $("backup-load").addEventListener("click", () => $("backup-file").click());
  $("backup-file").addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    importBackupFile(file);
    event.target.value = "";
  });
  $("backup-import-text").addEventListener("click", () => importBackupText($("backup-paste").value.trim()));
  $("retry-same").addEventListener("click", () => {
    if (state.libraryKind === "words") {
      startPlay(state.mode);
      return;
    }
    state.index = 0;
    state.pageIndex = 0;
    state.answers = [];
    if (state.libraryKind === "story") renderStory();
    if (state.libraryKind === "book") renderReader();
    if (state.libraryKind === "dictation") renderDictation();
    if (state.libraryKind === "novel") renderNovelReader();
  });
  $("retry-wrong").addEventListener("click", () => {
    state.moduleId = "wrong";
    startPlay(state.mode);
  });

  document.querySelectorAll("[data-book-filter]").forEach((chip) => {
    chip.addEventListener("click", () => {
      document.querySelectorAll("[data-book-filter]").forEach((item) => item.classList.toggle("active", item === chip));
      renderBook(chip.dataset.bookFilter);
    });
  });

  $("library-search-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    state.libraryQuery = $("library-search").value.trim();
    state.remoteItems = [];
    renderLibrary(state.libraryKind);
    const localHits = searchItems(
      libraryCollection().filter((item) => state.libraryFilter === "all" || item.level === Number(state.libraryFilter)),
      state.libraryQuery,
    );
    if (state.libraryQuery && !localHits.length && state.libraryKind !== "dictation") {
      $("library-search-status").textContent = "正在网上查找公共版权英文书…";
      state.remoteItems = await searchPublicDomain(state.libraryQuery);
      renderLibrary(state.libraryKind);
    }
  });

  $("library-search").addEventListener("input", () => {
    state.libraryQuery = $("library-search").value;
    state.remoteItems = [];
    renderLibrary(state.libraryKind);
  });

  $("home-continue").addEventListener("click", () => {
    const latest = latestReading();
    if (!latest) {
      renderNovels();
      return;
    }
    openNovelAt(latest.id, undefined, undefined, Boolean(latest.record.finished));
  });

  $("novel-back").addEventListener("click", () => {
    hideWordSheet();
    saveReadingPosition();
    openNovelMenu(state.novel.id);
  });
  $("novel-toggle-zh").addEventListener("click", () => {
    state.showZh = !state.showZh;
    renderNovelReader();
  });
  $("novel-toc").addEventListener("click", () => {
    hideWordSheet();
    saveReadingPosition();
    openNovelMenu(state.novel.id);
  });
  $("novel-prev").addEventListener("click", () => stepNovelPage(-1));
  $("novel-next").addEventListener("click", () => stepNovelPage(1));
  $("novel-quiz").addEventListener("click", startComprehension);

  $("word-sheet-close").addEventListener("click", hideWordSheet);
  $("word-sheet-speak").addEventListener("click", () => {
    if (state.wordCard) speak(state.wordCard.token);
  });
  $("word-sheet-speak-line").addEventListener("click", () => {
    if (state.wordCard) speak(state.wordCard.line.en);
  });
  $("word-sheet-add").addEventListener("click", addReadingWord);

  document.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "a") return;
    if (event.target.matches("input, textarea")) return;
    if ($("word-sheet").hidden) return;
    event.preventDefault();
    addReadingWord();
  });
}

bindEvents();
renderHome();
