
const staticName = "aqnmws-0.1.1";

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('aqnmws').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/images/me-pt.jpg',
        '/images/planB.jpeg',
        '/images/tegdun.png',
        '/images/warkop.jpeg',
        '/404.html',
        '/tugas1.html',
        '/tugas2.html',
        '/tugas3.html',
        '/map.js',
        '/style.css',
        'task.html',
        '/sw.js'
      ]);
    })
  );
  // console.log('install please');
});

self.addEventListener('fetch', function(event) {
  console.log(event.request.url);

  event.respondWith(
     caches.match(event.request).then(function(response) {
       return response || fetch(event.request);
     })
   );
});

self.addEventListener('activate', function(event) {

  var cacheWhitelist = [staticName];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
