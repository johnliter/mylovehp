const FALLBACK_MEMORIES = [
  { id: "birthday-31", title: "31st Birthday", date: "2024-09-23", type: "birthday", reason: "Birthday", image: "images/31stbday.jpg", path: "birthdays/thirtyfirst/index.html", description: "A birthday creation made especially for Christina." },
  { id: "poem-2024-10-01", title: "Just Because — A Poem", date: "2024-10-01", type: "poem", reason: "Just Because", image: "images/heart.jpg", path: "poems/poem10012024.html", description: "Words written simply because love does not need an occasion." },
  { id: "anniversary-7", title: "Seven Years Together", date: "2024-12-27", type: "anniversary", reason: "Anniversary", image: "images/sevenyears.jpg", path: "anniversaries/sevenyearanniversary/index.html", description: "A celebration of seven years of marriage." },
  { id: "valentines-2025", title: "Valentine's Day 2025", date: "2025-02-14", type: "holiday", reason: "Valentine's Day", image: "holidays/valentines/photos/vday.png", path: "holidays/valentines/index.html", description: "A Valentine's Day creation for Christina." },
  { id: "mothers-day-2025", title: "Mother's Day 2025", date: "2025-05-11", type: "holiday", reason: "Mother's Day", image: "images/mothersday.jpg", path: "mothersday/index.html", description: "A Mother's Day tribute made with love." },
  { id: "birthday-32", title: "32nd Birthday", date: "2025-09-23", type: "birthday", reason: "Birthday", image: "images/32bday.png", path: "birthdays/thirtysecond/32bday.html", description: "Another year, another page created just for Christina." }
];

let memories = [];
let activeFilter = "all";

document.addEventListener("DOMContentLoaded", async () => {
  memories = await loadMemories();
  renderMemories();
  updateCounters();
  updateTodayMessage();
  setupControls();
  registerOfflineSupport();
});

async function loadMemories() {
  try {
    const response = await fetch("data/memories.json", { cache: "no-store" });
    if (!response.ok) throw new Error("Memory archive unavailable");
    const data = await response.json();
    return Array.isArray(data.memories) ? data.memories : FALLBACK_MEMORIES;
  } catch {
    return FALLBACK_MEMORIES;
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
  const wedding = new Date("2017-12-27T00:00:00");
  const now = new Date();
  const elapsed = Math.max(0, now - wedding);
  const days = Math.floor(elapsed / 86400000);

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
