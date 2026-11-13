/* 三位 IP 伙伴的生动形象（SVG）与动作 */

function charFigureHtml(id, mood = "idle", size = "md") {
  const char = QUEST_CHARS[id] || QUEST_CHARS.pip;
  const moodClass = `is-${mood || "idle"}`;
  const sizeClass = size === "lg" ? "is-lg" : size === "sm" ? "is-sm" : "";
  return `
    <div class="char-figure char-${char.id} ${moodClass} ${sizeClass}" data-char="${char.id}" aria-hidden="true">
      ${charSvg(char.id)}
      <span class="char-shadow"></span>
    </div>
  `;
}

function charSvg(id) {
  if (id === "ollie") return ollieSvg();
  if (id === "sunny") return sunnySvg();
  return pipSvg();
}

function pipSvg() {
  return `
  <svg class="char-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <g class="char-body">
      <ellipse class="pip-tail" cx="28" cy="78" rx="16" ry="10" fill="#d9822b"/>
      <ellipse cx="60" cy="78" rx="28" ry="24" fill="#f0a24b"/>
      <ellipse cx="60" cy="82" rx="18" ry="14" fill="#ffe1b0"/>
      <g class="pip-head">
        <path class="pip-ear-l" d="M32 42 L22 14 L48 34 Z" fill="#f0a24b"/>
        <path class="pip-ear-r" d="M88 42 L98 14 L72 34 Z" fill="#f0a24b"/>
        <path d="M34 40 L28 22 L46 36 Z" fill="#ffd7a8"/>
        <path d="M86 40 L92 22 L74 36 Z" fill="#ffd7a8"/>
        <circle cx="60" cy="52" r="26" fill="#f0a24b"/>
        <ellipse cx="60" cy="60" rx="14" ry="11" fill="#ffe1b0"/>
        <g class="char-eyes">
          <circle cx="50" cy="48" r="4.5" fill="#2b2118"/>
          <circle cx="70" cy="48" r="4.5" fill="#2b2118"/>
          <circle class="eye-shine" cx="48.5" cy="46.5" r="1.4" fill="#fff"/>
          <circle class="eye-shine" cx="68.5" cy="46.5" r="1.4" fill="#fff"/>
          <rect class="eye-lid" x="45" y="43" width="10" height="0" fill="#f0a24b"/>
          <rect class="eye-lid eye-lid-r" x="65" y="43" width="10" height="0" fill="#f0a24b"/>
        </g>
        <ellipse class="pip-nose" cx="60" cy="58" rx="4" ry="3" fill="#5a3418"/>
        <path class="pip-smile" d="M52 66 Q60 72 68 66" fill="none" stroke="#5a3418" stroke-width="2.2" stroke-linecap="round"/>
        <path class="pip-glass-l" d="M42 48 h16" stroke="#5b6bc0" stroke-width="2" opacity=".35"/>
        <path class="pip-glass-r" d="M62 48 h16" stroke="#5b6bc0" stroke-width="2" opacity=".35"/>
      </g>
      <g class="pip-arm-l char-arm">
        <ellipse cx="34" cy="78" rx="7" ry="12" fill="#f0a24b"/>
      </g>
      <g class="pip-arm-r char-arm">
        <ellipse cx="86" cy="78" rx="7" ry="12" fill="#f0a24b"/>
      </g>
      <circle class="pip-badge" cx="72" cy="76" r="6" fill="#fff3d4" stroke="#e29a0f" stroke-width="2"/>
    </g>
  </svg>`;
}

function ollieSvg() {
  return `
  <svg class="char-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <g class="char-body">
      <ellipse cx="60" cy="86" rx="26" ry="20" fill="#5b6bc0"/>
      <ellipse cx="60" cy="90" rx="16" ry="12" fill="#dfe6ff"/>
      <g class="ollie-head">
        <path class="ollie-tuft" d="M50 28 Q60 12 70 28" fill="none" stroke="#3f4ea3" stroke-width="5" stroke-linecap="round"/>
        <circle cx="60" cy="52" r="28" fill="#6d7dd6"/>
        <circle cx="48" cy="50" r="12" fill="#f7f4ff"/>
        <circle cx="72" cy="50" r="12" fill="#f7f4ff"/>
        <g class="char-eyes">
          <circle cx="48" cy="50" r="5" fill="#2b2118"/>
          <circle cx="72" cy="50" r="5" fill="#2b2118"/>
          <circle class="eye-shine" cx="46.5" cy="48.5" r="1.5" fill="#fff"/>
          <circle class="eye-shine" cx="70.5" cy="48.5" r="1.5" fill="#fff"/>
          <rect class="eye-lid" x="41" y="42" width="14" height="0" fill="#6d7dd6"/>
          <rect class="eye-lid eye-lid-r" x="65" y="42" width="14" height="0" fill="#6d7dd6"/>
        </g>
        <path class="ollie-beak" d="M56 58 L60 68 L64 58 Z" fill="#e29a0f"/>
        <path class="ollie-brow" d="M40 40 Q48 36 56 40" fill="none" stroke="#3f4ea3" stroke-width="2"/>
        <path class="ollie-brow" d="M64 40 Q72 36 80 40" fill="none" stroke="#3f4ea3" stroke-width="2"/>
      </g>
      <g class="ollie-wing-l char-arm">
        <ellipse cx="34" cy="86" rx="8" ry="14" fill="#5b6bc0"/>
      </g>
      <g class="ollie-wing-r char-arm">
        <ellipse cx="86" cy="86" rx="8" ry="14" fill="#5b6bc0"/>
      </g>
      <rect class="ollie-book" x="70" y="82" width="14" height="12" rx="2" fill="#fffdf6" stroke="#e29a0f" stroke-width="2"/>
    </g>
  </svg>`;
}

function sunnySvg() {
  return `
  <svg class="char-svg" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <g class="char-body">
      <ellipse class="sunny-body" cx="60" cy="72" rx="34" ry="26" fill="#57b7cf"/>
      <ellipse cx="60" cy="78" rx="22" ry="16" fill="#d7f3fa"/>
      <g class="sunny-head">
        <ellipse cx="60" cy="48" rx="24" ry="22" fill="#6ec4d8"/>
        <g class="char-eyes">
          <circle cx="50" cy="46" r="4.2" fill="#2b2118"/>
          <circle cx="70" cy="46" r="4.2" fill="#2b2118"/>
          <circle class="eye-shine" cx="48.8" cy="44.8" r="1.3" fill="#fff"/>
          <circle class="eye-shine" cx="68.8" cy="44.8" r="1.3" fill="#fff"/>
          <rect class="eye-lid" x="45" y="41" width="10" height="0" fill="#6ec4d8"/>
          <rect class="eye-lid eye-lid-r" x="65" y="41" width="10" height="0" fill="#6ec4d8"/>
        </g>
        <ellipse class="sunny-nose" cx="60" cy="54" rx="7" ry="5" fill="#2f6f82"/>
        <circle cx="56" cy="53" r="1.2" fill="#d7f3fa"/>
        <circle cx="64" cy="53" r="1.2" fill="#d7f3fa"/>
        <path class="sunny-smile" d="M50 60 Q60 68 70 60" fill="none" stroke="#2f6f82" stroke-width="2.2" stroke-linecap="round"/>
        <circle class="sunny-blush" cx="44" cy="56" r="3.5" fill="#ffb4a8" opacity=".55"/>
        <circle class="sunny-blush" cx="76" cy="56" r="3.5" fill="#ffb4a8" opacity=".55"/>
      </g>
      <g class="sunny-flip-l char-arm">
        <ellipse cx="28" cy="78" rx="10" ry="7" fill="#57b7cf"/>
      </g>
      <g class="sunny-flip-r char-arm">
        <ellipse cx="92" cy="78" rx="10" ry="7" fill="#57b7cf"/>
      </g>
      <path class="sunny-tail" d="M88 88 Q108 78 104 98" fill="none" stroke="#3f9bb3" stroke-width="8" stroke-linecap="round"/>
    </g>
  </svg>`;
}

const REWARD_LINES = [
  { text: "+1 星星糖", icon: "🍬" },
  { text: "太棒了！", icon: "✨" },
  { text: "再来一颗糖！", icon: "🌟" },
  { text: "伙伴为你加油！", icon: "👏" },
  { text: "答对啦！", icon: "🎉" },
];
