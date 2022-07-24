---
layout: none
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js');

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: 'blebon.com',
  suffix: '{{ site.time | date: "%Y-%m" }}',
  precache: 'precache',
  runtime: 'runtime-cache'
});

// let Service Worker take control of pages ASAP
workbox.core.skipWaiting();
workbox.core.clientsClaim();

// let Workbox handle our precache list
workbox.precaching.precacheAndRoute(self.__precacheManifest);

// use `NetworkFirst`strategy for home page
registerRoute(
  '/',
  new NetworkFirst()
);

// Pages
registerRoute(
  /about/,
  new NetworkFirst()
);

registerRoute(
  /mauritian-blogs/,
  new NetworkFirst()
);

// Posts
registerRoute(
  new RegExp('/\\d{4}/\\d{2}/\\d{2}/.+'),
  new StaleWhileRevalidate()
);

// css, images
registerRoute(
  /assets/(css|img|icons)/,
  new CacheFirst()
);
