const CACHE_NAME = 'agenda-cultural-v3';
const CACHE_DURATION = 4 * 60 * 60 * 1000; // 4 hours

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(req);

      if (cached) {
        const fetchedOn = cached.headers.get('sw-fetched-on');
        const now = Date.now();

        if (fetchedOn && (now - parseInt(fetchedOn) < CACHE_DURATION)) {
          return cached;
        }
      }

      try {
        const res = await fetch(req);
        const resClone = res.clone();

        const newHeaders = new Headers(resClone.headers);
        newHeaders.set('sw-fetched-on', Date.now().toString());

        const resToCache = new Response(resClone.body, {
          status: resClone.status,
          statusText: resClone.statusText,
          headers: newHeaders
        });

        cache.put(req, resToCache);
        return res;
      } catch (e) {
        return cached || new Response('Offline', { status: 503 });
      }
    })
  );
});