const CACHE_NAME = "yogaMotor v1";
var urlsToCache = [
  "/",
  "manifest.json",
  "/index.html",
  "/pages/home.html",
  "/pages/product.html",
  "/pages/contact.html",
  "/pages/detail-produk/beat.html",
  "/pages/detail-produk/revoX.html",
  "/pages/detail-produk/pcx.html",
  "/pages/detail-produk/sonic.html",
  "/pages/detail-produk/supra.html",
  "/pages/detail-produk/vario.html",
  "/css/materialize.min.css",
  "/css/style.css",
  "/js/materialize.min.js",
  "/js/script.js",
  "/js/sWRegister.js",
  "/js/jquery.js",
  "/img/Logo.png",
  "/img/slider-1.jpg",
  "/img/slider-2.jpg",
  "/img/slider-3.jpg",
  "/img/testimoni/testi-1.svg",
  "/img/testimoni/testi-2.svg",
  "/img/testimoni/testi-3.svg",
  "/img/testimoni/testi-4.svg",
  "/img/testimoni/testi-5.svg",
  "/img/testimoni/testi-6.svg",
  "/img/service/card-call.svg",
  "/img/service/card-customer.svg",
  "/img/service/card-loop.svg",
  "/img/service/card-time.svg",
  "/img/product/beat.jpg",
  "/img/product/beat-detail.jpg",
  "/img/product/gtr.png",
  "/img/product/gtr-detail.png",
  "/img/product/pcx.png",
  "/img/product/pcx-detail.png",
  "/img/product/revo.png",
  "/img/product/revo-detail.png",
  "/img/product/sonic.png",
  "/img/product/sonic-detail.png",
  "/img/product/vario.jpg",
  "/img/product/vario-detail.png",
  "/icon-192x192.png",
  "/icon-512x512.png"
]
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});


self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }
  
        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
  );
});


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});