
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('timeforce-cache').then(cache => {
      return cache.addAll([
        './',
        './index.html',
        './style.css',
        './script.js',
        './manifest.json',
        './icon192.png',
        './icon512.png',
        './timeforce_ios_settings.html'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});
