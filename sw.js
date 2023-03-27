//Asignar nombre y version de la cache
const CACHE_NAME = 'v1_cache_BCH_PWA';

//configuracion de los ficheros
var urlsToCache = [
    '/',
    '/index.html',
    '/index.css',
    '/sw.js',
    '/main.js',
    '/manifest.json',
    '/img/windows11/Square44x44Logo.altform-unplated_targetsize-256.png',
    '/img/windows11/llamada-telefonica.png',
    '/img/windows11/linkedin.png',
    '/img/windows11/email.png',
    '/img/windows11/developer-3461405_1280.png',
    '/img/windows11/Trabajando.jpg',
    '/img/windows11/Estudios.jpg'
];

self.addEventListener('install', event => { 
    event.waitUntil(caches.open(CACHE_NAME)
    .then(function (cache) { 
        return cache
        .addAll(urlsToCache)
        .then(() => { 
            self.skipWaiting() 
        })
    .catch(err => console.log('Hubo un error', err)) })); });

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];


    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheNames => {
                        if (cacheWhitelist.indexOf(cacheNames) == -1) {
                            return cache.delete(cacheNames);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim();
            })
    );

});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    return res;
                }
                return fetch(e.request);
            })
    );
});