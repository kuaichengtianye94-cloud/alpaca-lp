const CACHE = 'alpaca-v3';
const ASSETS = [
  '/alpaca-lp/app.html',
  '/alpaca-lp/fee-calculator.html',
  '/alpaca-lp/tel-manual.html',
  '/alpaca-lp/manifest.json',
  '/alpaca-lp/manifest-calc.json',
  '/alpaca-lp/manifest-manual.json',
  '/alpaca-lp/icon.svg',
  '/alpaca-lp/icon-calc.svg',
  '/alpaca-lp/icon-manual.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
