---
layout: none
---
importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js");

const { registerRoute } = workbox.routing;
const { CacheFirst, NetworkFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;

workbox.core.setCacheNameDetails({
  prefix: "blebon.com",
  suffix: '{{ site.time | date: "%Y-%m" }}'
});

registerRoute(
  "/",
  new NetworkFirst()
);

registerRoute(
  /about/,
  new NetworkFirst()
);

registerRoute(
  /mauritian-blogs/,
  new NetworkFirst()
);

registerRoute(
  new RegExp("/\\d{4}/\\d{2}/\\d{2}/.+"),
  new StaleWhileRevalidate()
);

registerRoute(
  /assets/css/,
  new CacheFirst()
);

workbox.precaching.precacheAndRoute([
  {%- for post in site.posts limit:15 %}
    { url: '{{ post.url }}', revision: '{{ post.date | date: "%Y-%m-%d"}}' },
  {%- endfor %}
  { url: '/', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/about/', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/mauritian-blogs/', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' },
  { url: '/assets/css/style.css', revision: '{{ site.time | date: "%Y%m%d%H%M" }}' }
]);
