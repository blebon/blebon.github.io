---
layout: none
---
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

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

workbox.precaching.precacheAndRoute([
  {% for post in site.posts limit:10 -%}
  { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {% endfor -%}
  { url: '/', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/about', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/mauritian-blogs', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/assets/css/style.css', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' }
])

registerRoute(
  ({request}) => request.destination === 'image' ,
  new CacheFirst({
    plugins: [
      new CacheableResponse({statuses: [0, 200]})
    ],
  })
);

// css, images
registerRoute(
  /assets/(css|img)/,
  new CacheFirst()
);
