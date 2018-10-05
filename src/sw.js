var filesToCache = [
    '/index.html',
    '/css/style.css',
    '/js/app.js',
    '/js/nav.js',
    '/program.html',
    '/damer.html',
    // '/img/**/*.{jpg||png}',
    // '/docs',
    '/img/ubuntu-conf1.jpg', 
    '/img/ubuntu-conf2.jpg', 
    '/img/ubuntu-conf3.jpg', 
    '/img/ubuntu-conf4.jpg', 
    '/img/ubuntu-conf5.jpg', 
    '/img/ubuntu-conf6.jpg', 
    '/img/ubuntu-conf7.jpg', 
    '/img/hero.png', 
    '/img/circuit.svg', 
    '/img/logo.png', 
];

// var cache = function(){}; 
/**
 * Installer Service Worker
 * Lytter efter install event og tilføjer App Shell filer til cache
 */
self.addEventListener("install", function(e) {
    console.log("Service Worker Installed");
    e.waitUntil(
        caches.open('my-new-progressive-web-app').then(function (cache) {
            console.log("Opening cache");
            // return cache.addAll([
            //     '/index.html',
            //     '/assets/css/style.css',
            //     '/assets/js/app.js',
            //     '/program.html',
            //     '/damer.html',
            //     '/',
            // ]);
            // return cache.addAll([
            //     '/index.html',
            //     '/css/style.css',
            //     '/js/app.js',
            //     '/program.html',
            //     '/damer.html',
            //     '/',
            // ]);
            return cache.addAll(filesToCache);
        })
    );
});

/**
 * Aktiver Service Worker
 */
self.addEventListener("activate", function(e) {
    console.log("Service Worker Activated");
});

/**
 * Service Worker Fetch
 * Tjek cache efter match og returner hvis der er et match
 * Ellers hent fil via netværk og tilføj til cache
 */
// self.addEventListener("fetch", function(event) {
//     event.respondWith(
//         caches.open('my-new-progressive-web-app').then(function (cache) {
//             return cache.match(event.request).then(function (response) {
//                 return response || fetch(event.request).then(function (response) {
//                     cache.put(event.request, response.clone());
//                     return response;
//                 });
//             });
//         })
//     );
// });


self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  