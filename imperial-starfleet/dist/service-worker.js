// In dist, fill out service-worker.js the same way we did in the last lesson:
// with a fetch and an install promise. However, you'll need different URLs to cache.

var CACHE_NAME = 'death-square-cache-v1';
var urlsToCache = [
  'index.html',
  './assets/images/tie-fighter.png',
  './assets/images/turret.png',
  'service-worker.js'
];

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(CACHE_NAME)
		.then(function(cache) {
			console.log('Opened cache');
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request)
		.then(function(response) {
			if (response) return response;
			return fetch(event.request);
		})
	);
});