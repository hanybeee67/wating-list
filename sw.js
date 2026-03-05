const CACHE_NAME = 'wating-list-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        // 오프라인 상태에서도 기본 UI가 뜨도록 캐싱 (Firebase는 자체 offline persistence 지원)
        return cache.addAll(urlsToCache).catch(err => console.log('Caching failed', err));
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // 캐시에 있으면 반환, 없으면 네트워크 요청
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
