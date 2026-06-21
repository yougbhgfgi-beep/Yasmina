const CACHE_NAME = 'love-story-cache-v6'
const URLS_TO_CACHE = ['/', '/index.html', '/manifest.json', '/icon-heart.svg', '/maze.html', '/images/photo-1.jpeg', '/images/photo-2.jpeg', '/assets/index-new.js', '/01_-_Ewediny.mp3']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).then((resp) => {
      if (resp.status === 200) {
        const clone = resp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
      }
      return resp;
    }).catch(() => caches.match(event.request))
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => {
      if (k !== CACHE_NAME) return caches.delete(k)
      return null
    })))
  )
})
