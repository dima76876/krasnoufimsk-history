/* ==========================================================================
   SERVICE WORKER: «Красноуфимск: Сквозь эпохи» (2026)
   Обеспечивает кэширование страниц и офлайн-доступ к путеводителю и планировщику.
   ========================================================================== */

const CACHE_NAME = 'kuf-history-v6';
const STATIC_ASSETS = [
  './',
  './index.html',
  './planner.html',
  './manifest.json',
  './images/favicon.png?v=7',
  './images/apple-touch-icon.png?v=7',
  './images/icon-512.png'
];

// Установка Service Worker и предзагрузка ключевых страниц
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('SW pre-cache warning:', err);
      });
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

  // Для внешних погодных и гео-API — прямой запрос в сеть с фоллбэком
  if (url.origin.includes('open-meteo.com') || url.origin.includes('met.no') || url.origin.includes('yandex.ru')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
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
          if (event.request.headers.get('accept')?.includes('text/html')) {
            return caches.match('./index.html');
          }
        });
      })
  );
});
