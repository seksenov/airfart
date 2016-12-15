/*
 *
 *  Air Horner
 *  Copyright 2015 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */
 
// Version 0.54

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('airhorner').then(cache => {
      return cache.addAll([
        '/airfart/',
        'airfart/index.html',
        'airfart/index.html?homescreen=1',
        'airfart/?homescreen=1',
        'airfart/styles/main.css',
        'airfart/scripts/main.min.js',
        'airfart/scripts/fallingsnow_V6.js',
        'airfart/sounds/airhorn.mp3',
        'airfart/images/poop.svg'
      ])
      .then(() => self.skipWaiting());
    })
  )
});

self.addEventListener('activate',  event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});