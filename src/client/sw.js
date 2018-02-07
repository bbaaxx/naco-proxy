/* global serviceWorkerOption */
const CACHE_NAME = 'naco-proxy-cache-v1';
const urlsToCache = serviceWorkerOption.assets;

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log('cache hit');
        return response;
      }
      const fetchRequest = event.request.clone();

      return fetch(fetchRequest).then(_response => {
        if (
          !_response ||
          _response.status !== 200 ||
          _response.type !== 'basic'
        ) {
          return _response;
        }
        const responseToCache = _response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request, responseToCache);
        });
        return _response;
      });
    }),
  );
});
