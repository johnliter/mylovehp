const FALLBACK_MEMORIES = [
  { id: "birthday-31", title: "31st Birthday", date: "2024-09-23", type: "birthday", reason: "Birthday", image: "images/31stbday.jpg", path: "birthdays/thirtyfirst/index.html", description: "A birthday creation made especially for Christina." },
  { id: "poem-2024-10-01", title: "Just Because — A Poem", date: "2024-10-01", type: "poem", reason: "Just Because", image: "images/heart.jpg", path: "poems/poem10012024.html", description: "Words written simply because love does not need an occasion." },
  { id: "anniversary-7", title: "Seven Years Together", date: "2024-12-27", type: "anniversary", reason: "Anniversary", image: "images/sevenyears.jpg", path: "anniversaries/sevenyearanniversary/index.html", description: "A celebration of seven years of marriage." },
  { id: "valentines-2025", title: "Valentine's Day 2025", date: "2025-02-14", type: "holiday", reason: "Valentine's Day", image: "holidays/valentines/photos/vday.png", path: "holidays/valentines/index.html", description: "A Valentine's Day creation for Christina." },
  { id: "mothers-day-2025", title: "Mother's Day 2025", date: "2025-05-11", type: "holiday", reason: "Mother's Day", image: "images/mothersday.jpg", path: "mothersday/index.html", description: "A Mother's Day tribute made with love." },
  { id: "birthday-32", title: "32nd Birthday", date: "2025-09-23", type: "birthday", reason: "Birthday", image: "images/32bday.png", path: "birthdays/thirtysecond/32bday.html", description: "Another year, another page created just for Christina." }
];

const FALLBACK_MILESTONES = [
  { id: "wedding-day", date: "2017-12-27", label: "Our wedding day", title: "We chose forever.", description: "The day our marriage began." },
  { id: "archive-begins", date: "2024-09-23", label: "A story worth preserving", title: "The archive begins.", description: "The earliest creation currently preserved in this collection became the first chapter of a much larger archive.", path: "birthdays/thirtyfirst/index.html" }
];

const FALLBACK_LETTERS = [
  {
    id: "why-i-built-this",
    label: "For Christina",
    title: "Why I built this",
    paragraphs: [
      "I created this page for the love of my life.",
      "You understand how much I love to code, and you appreciate all the little things I do and create for you. This archive is one of them — a place for those little things to live together and keep growing with us."
    ],
    signature: "Love, John"
  }
];

let memories = [];
let activeFilter = "all";

document.addEventListener("DOMContentLoaded", async () => {
  const [memoryData, milestoneData, letterData] = await Promise.all([
    loadCollection("data/memories.json", "memories", FALLBACK_MEMORIES),
    loadCollection("data/milestones.json", "milestones", FALLBACK_MILESTONES),
    loadCollection("data/letters.json", "letters", FALLBACK_LETTERS)
  ]);

  memories = memoryData;
  renderMemories();
  renderMilestones(milestoneData);
  renderLetters(letterData);
  updateCounters();
  updateTodayMessage();
  updateNextChapter();
  setupControls();
  registerOfflineSupport();
});

async function loadCollection(path, key, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error("Archive data unavailable");
    const data = await response.json();
    return Array.isArray(data[key]) ? data[key] : fallback;
  } catch {
    return fallback;
  }
}

function setupControls() {
  const search = document.getElementById("searchInput");
  const filters = document.getElementById("filters");
  search.addEventListener("input", renderMemories);
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    activeFilter = button.dataset.filter;
    document.querySelectorAll(".filter").forEach((item) => item.classList.toggle("active", item === button));
    renderMemories();
  });
}

function renderMilestones(milestones) {
  const container = document.getElementById("milestoneTimeline");
  container.innerHTML = milestones
    .slice()
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((milestone) => {
      const date = new Date(milestone.date + "T12:00:00");
      const year = date.getFullYear();
      return `
        <article class="milestone">
          <time class="milestone-date" datetime="${milestone.date}">${year}</time>
          <div class="milestone-content">
            <span class="milestone-kicker">${escapeHtml(milestone.label || "")}</span>
            <h3>${escapeHtml(milestone.title)}</h3>
            <p>${escapeHtml(milestone.description || "")}</p>
            ${milestone.path ? `<a href="${escapeHtml(milestone.path)}">Open this chapter →</a>` : ""}
          </div>
        </article>
      `;
    }).join("");
}

function renderLetters(letters) {
  const container = document.getElementById("lettersGrid");
  container.innerHTML = letters.map((letter) => `
    <article class="letter-card">
      <span class="letter-meta">${escapeHtml(letter.label || "A letter")}</span>
      <h3>${escapeHtml(letter.title)}</h3>
      ${(letter.paragraphs || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${letter.signature ? `<div class="letter-signature">${escapeHtml(letter.signature)}</div>` : ""}
    </article>
  `).join("");
}

function renderMemories() {
  const timeline = document.getElementById("timeline");
  const empty = document.getElementById("emptyState");
  const query = document.getElementById("searchInput")?.value.trim().toLowerCase() || "";

  const filtered = memories
    .filter((memory) => activeFilter === "all" || memory.type === activeFilter)
    .filter((memory) => [memory.title, memory.reason, memory.description, memory.date].join(" ").toLowerCase().includes(query))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const grouped = filtered.reduce((years, memory) => {
    const year = new Date(memory.date + "T12:00:00").getFullYear();
    (years[year] ||= []).push(memory);
    return years;
  }, {});

  timeline.innerHTML = Object.keys(grouped)
    .sort((a, b) => b - a)
    .map((year) => `
      <section class="year-block" aria-labelledby="year-${year}">
        <div class="year-label" id="year-${year}">${year}</div>
        <div class="year-memories">
          ${grouped[year].map(memoryCard).join("")}
        </div>
      </section>
    `).join("");

  empty.hidden = filtered.length !== 0;
  document.getElementById("memoryCount").textContent = memories.length;
}

function memoryCard(memory) {
  const date = new Date(memory.date + "T12:00:00");
  const prettyDate = date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  return `
    <a class="memory-card" href="${escapeHtml(memory.path)}">
      <div class="memory-image">
        <img src="${escapeHtml(memory.image)}" alt="${escapeHtml(memory.title)}" loading="lazy">
      </div>
      <div class="memory-body">
        <div class="memory-meta"><span>${escapeHtml(memory.reason)}</span><span>•</span><time datetime="${memory.date}">${prettyDate}</time></div>
        <h3>${escapeHtml(memory.title)}</h3>
        <p>${escapeHtml(memory.description || "")}</p>
      </div>
    </a>
  `;
}

function updateCounters() {
  const wedding = new Date(2017, 11, 27);
  const now = new Date();
  const start = new Date(wedding.getFullYear(), wedding.getMonth(), wedding.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.max(0, Math.round((today - start) / 86400000));

  let years = now.getFullYear() - wedding.getFullYear();
  const anniversaryThisYear = new Date(now.getFullYear(), wedding.getMonth(), wedding.getDate());
  if (now < anniversaryThisYear) years -= 1;

  document.getElementById("marriedDays").textContent = days.toLocaleString();
  document.getElementById("marriedYears").textContent = Math.max(0, years);
}

function updateTodayMessage() {
  const now = new Date();
  const monthDay = `${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const matches = memories.filter((memory) => memory.date.slice(5) === monthDay);
  const title = document.getElementById("today-title");
  const message = document.getElementById("todayMessage");

  if (monthDay === "12-27") {
    title.textContent = "Happy anniversary.";
    message.textContent = "December 27 is one of the dates that changed everything.";
    return;
  }

  if (monthDay === "09-23") {
    title.textContent = "Happy birthday, Christina.";
    message.textContent = "Today belongs to you — and this archive holds a few of the birthdays we have celebrated together.";
    return;
  }

  if (matches.length) {
    const memory = matches[0];
    const yearsAgo = now.getFullYear() - Number(memory.date.slice(0, 4));
    title.textContent = `${yearsAgo} year${yearsAgo === 1 ? "" : "s"} ago today…`;
    message.textContent = memory.title;
  }
}

function updateNextChapter() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const candidates = [
    nextOccurrence(today, 8, 23, "Christina's birthday"),
    nextOccurrence(today, 11, 27, "our anniversary")
  ].sort((a, b) => a.date - b.date);

  const next = candidates[0];
  const days = Math.round((next.date - today) / 86400000);
  const title = document.getElementById("nextChapterTitle");
  const message = document.getElementById("nextChapterMessage");

  if (days === 0) {
    title.textContent = `Today is ${next.label}.`;
    message.textContent = "A new chapter belongs here today.";
  } else if (days === 1) {
    title.textContent = `Tomorrow is ${next.label}.`;
    message.textContent = "The next page is almost here.";
  } else {
    title.textContent = `${days.toLocaleString()} days until ${next.label}.`;
    message.textContent = "The next page is still being written.";
  }
}

function nextOccurrence(today, monthIndex, day, label) {
  let date = new Date(today.getFullYear(), monthIndex, day);
  if (date < today) date = new Date(today.getFullYear() + 1, monthIndex, day);
  return { date, label };
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[character]));
}

function registerOfflineSupport() {
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("service-worker.js").catch(() => {});
  }
}
