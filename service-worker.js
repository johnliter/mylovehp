const CACHE_NAME = "our-story-v2";
const CORE = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./data/memories.json",
  "./data/milestones.json",
  "./data/letters.json",
  "./images/hero-wedding.jpg",
  "./images/31stbday.jpg",
  "./images/heart.jpg",
  "./images/sevenyears.jpg",
  "./images/mothersday.jpg",
  "./images/32bday.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      return response;
    }).catch(() => caches.match("./index.html")))
  );
});
