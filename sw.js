/* ==========================================================================
   SERVICE WORKER: «Красноуфимск: Сквозь эпохи» (2026)
   Обеспечивает кэширование страниц и офлайн-доступ к путеводителю и планировщику.
   ========================================================================== */

const CACHE_NAME = 'kuf-history-v21';
const STATIC_ASSETS = [
  './',
  './index.html',
  './planner.html',
  './manifest.json',
  './favicon.ico',
  './images/favicon.png',
  './images/apple-touch-icon.png',
  './images/icon-512.png'
];

// Установка Service Worker и предзагрузка ключевых страниц
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Кэшируем каждый ассет отдельно: если одного файла нет на сервере (404),
      // остальные всё равно попадут в кэш и офлайн-режим будет работать.
      return Promise.all(STATIC_ASSETS.map(asset =>
        cache.add(asset).catch(err => {
          console.warn('SW: не удалось закэшировать', asset, err);
        })
      ));
    })
  );
  self.skipWaiting();
});

// Активация и очистка устаревших кэшей
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Стратегия Network-First с fallback на Cache
self.addEventListener('fetch', event => {
  // Пропускаем не-GET запросы и расширения браузера
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);

  // Внешние API и тайлы карт (OSM, Leaflet, Яндекс) — прямой запрос в сеть без кэширования
  const NO_CACHE_HOSTS = [
    'open-meteo.com', 'met.no', 'yandex.ru',
    'openstreetmap.org', 'tile.openstreetmap.org',
    'openstreetmap.fr', 'tile.openstreetmap.fr'
  ];
  if (NO_CACHE_HOSTS.some(h => url.hostname.includes(h))) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200 && url.origin === self.location.origin) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then(cachedResponse => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
          return Response.error();
        });
      })
  );
});
