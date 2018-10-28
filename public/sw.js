
(function () {
  'use strict';
  const version = "0.2.1";
  const staticCacheName = `mws-${version}`;
  self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(staticCacheName).then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/images/me-pt.jpg',
          '/images/planB.jpeg',
          '/images/tegdun.png',
          '/images/warkop.jpeg',
          '/images/calc.png',
          '/images/grid.png',
          '/images/map.png',
          '/404.html',
          '/tugas1.html',
          '/tugas2.html',
          '/tugas3.html',
          '/map.js',
          '/css/map.css',
          '/places.json',
          '/offline.html',
          '/css/main.css',
          '/task.html',
          '/sw.js'
        ])
        .then(() => self.skipWaiting());
      })
    );
  });

  self.addEventListener('fetch', function (event) {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
      caches.match(event.request).then(function (response) {
        if (response) {
          console.log('Found ', event.request.url, ' in cache');
          return response;
        }
        console.log('Network request for ', event.request.url);
        return fetch(event.request).then(function (response) {
          if (response.status === 404) {
            return caches.match('404.html');
          }
          return caches.open(staticCacheName).then(function (cache) {
            if (event.request.url.indexOf('test') < 0) {
              cache.put(event.request.url, response.clone());
            }
            return response;
          });
        });
      }).catch(function (error) {
        console.log('Error, ', error);
        return caches.match('offline.html');
      })
    );
  });

  self.addEventListener('activate', function (event) {
    console.log('Activating new service worker...');

    var cacheWhitelist = [staticCacheName];

    event.waitUntil(
      caches.keys().then(function (cacheNames) {
        return Promise.all(
          cacheNames.map(function (cacheName) {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
})();
