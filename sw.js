/* Красноуфимск: Сквозь эпохи — Service Worker (полный офлайн-пакет, 2026-10-19) */
const CACHE = 'kuf-history-v31-offline-20261019';
const PMTILES_PATH = '/assets/maps/krasnoufimsk.pmtiles';
const FONT_FILES = [
  'inter-cyrillic-ext-wght-normal.woff2',
  'inter-cyrillic-ext-wght-italic.woff2',
  'inter-cyrillic-wght-normal.woff2',
  'inter-cyrillic-wght-italic.woff2',
  'inter-latin-ext-wght-normal.woff2',
  'inter-latin-ext-wght-italic.woff2',
  'inter-latin-wght-normal.woff2',
  'inter-latin-wght-italic.woff2',
  'playfair-display-cyrillic-wght-normal.woff2',
  'playfair-display-cyrillic-wght-italic.woff2',
  'playfair-display-latin-ext-wght-normal.woff2',
  'playfair-display-latin-ext-wght-italic.woff2',
  'playfair-display-latin-wght-normal.woff2',
  'playfair-display-latin-wght-italic.woff2'
];
const CORE = [
  '/', '/index.html', '/planner.html', '/404.html', '/manifest.json',
  '/favicon.ico', '/images/favicon.png', '/images/icon-512.png', '/images/apple-touch-icon.png',
  '/assets/fonts.css',
  ...FONT_FILES.map(file => `/assets/fonts/${file}`),
  '/assets/index.css', '/assets/index.js', '/assets/planner.css', '/assets/planner.js',
  PMTILES_PATH,
  '/images/og_banner.jpg', '/images/unsplash.webp', '/images/bg_winter.webp', '/images/bg_spring.webp', '/images/bg_summer.webp',
  '/vendor/leaflet.css', '/vendor/leaflet.js', '/vendor/protomaps-leaflet.js',
  '/vendor/pdfmake.min.js', '/vendor/vfs_fonts.js'
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await Promise.allSettled(CORE.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

async function getFullPmtilesResponse(cache) {
  const cacheKey = new Request(new URL(PMTILES_PATH, self.location.origin).href, { method: 'GET' });
  let response = await cache.match(cacheKey, { ignoreSearch: true, ignoreVary: true });
  if (response && response.status === 200) return response;

  response = await fetch(cacheKey);
  if (response && response.ok && response.status === 200) {
    await cache.put(cacheKey, response.clone());
  }
  return response;
}

async function handlePmtilesRequest(request) {
  const cache = await caches.open(CACHE);
  const fullResponse = await getFullPmtilesResponse(cache);
  if (!fullResponse || fullResponse.status !== 200) return fullResponse;

  const rangeHeader = request.headers.get('range');
  if (!rangeHeader) return fullResponse;

  const blob = await fullResponse.clone().blob();
  const size = blob.size;
  const match = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  const headers = new Headers({
    'Accept-Ranges': 'bytes',
    'Cache-Control': fullResponse.headers.get('cache-control') || 'public, max-age=31536000, immutable',
    'Content-Type': fullResponse.headers.get('content-type') || 'application/octet-stream'
  });
  const etag = fullResponse.headers.get('etag');
  const lastModified = fullResponse.headers.get('last-modified');
  if (etag) headers.set('ETag', etag);
  if (lastModified) headers.set('Last-Modified', lastModified);

  if (!match || (match[1] === '' && match[2] === '')) {
    headers.set('Content-Range', `bytes */${size}`);
    return new Response(null, { status: 416, statusText: 'Range Not Satisfiable', headers });
  }

  let start;
  let end;
  if (match[1] === '') {
    const suffixLength = Number(match[2]);
    if (!Number.isFinite(suffixLength) || suffixLength <= 0) {
      headers.set('Content-Range', `bytes */${size}`);
      return new Response(null, { status: 416, statusText: 'Range Not Satisfiable', headers });
    }
    start = Math.max(size - suffixLength, 0);
    end = size - 1;
  } else {
    start = Number(match[1]);
    end = match[2] === '' ? size - 1 : Math.min(Number(match[2]), size - 1);
  }

  if (!Number.isFinite(start) || !Number.isFinite(end) || start < 0 || start >= size || end < start) {
    headers.set('Content-Range', `bytes */${size}`);
    return new Response(null, { status: 416, statusText: 'Range Not Satisfiable', headers });
  }

  const slice = blob.slice(start, end + 1);
  headers.set('Content-Length', String(slice.size));
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  return new Response(slice, { status: 206, statusText: 'Partial Content', headers });
}

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // Погода и геокодинг кэшируются приложением точечно, не SW.

  if (url.pathname === PMTILES_PATH) {
    event.respondWith(handlePmtilesRequest(req));
    return;
  }

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        if (fresh && fresh.status === 200) cache.put(req, fresh.clone());
        return fresh;
      } catch (_) {
        return (await caches.match(req, { ignoreSearch: true })) ||
          (await caches.match('/index.html')) ||
          (await caches.match('/404.html'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreVary: true });
    const network = fetch(req).then(async res => {
      if (res && res.ok && res.status === 200) {
        const cache = await caches.open(CACHE);
        cache.put(req, res.clone());
      }
      return res;
    }).catch(() => cached);
    return cached || network;
  })());
});
