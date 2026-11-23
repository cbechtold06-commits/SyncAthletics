const CACHE_NAME = 'syncathletics-pwa-v1';
const APP_SHELL = ['./','./index.html','./home.html','./base-added.html','./features.html','./whyus.html','./app.css','./app.js','./subscription.js','./manifest.webmanifest','./icons/sync-192.png','./icons/sync-512.png','./icons/sync.svg'];
self.addEventListener('install', event => { event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', event => { event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) return;
  event.respondWith(caches.match(request).then(cached => {
    const network = fetch(request).then(response => { if (response && response.ok) { const copy = response.clone(); caches.open(CACHE_NAME).then(cache => cache.put(request, copy)); } return response; }).catch(() => cached || caches.match('./index.html'));
    return cached || network;
  }));
});
