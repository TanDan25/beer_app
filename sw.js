var cacheName = 'v1';

// var casheAssets = [
//     'index.html',
//     'js/main.js'
// ];


// Call Install Event
self.addEventListener('install', (event) => {
    // console.log('Service Worker: Installed');

    // event.waitUntil(
    //     caches
    //         .open(cacheName)
    //         .then(cache => {
    //             console.log('Service Worker: Cashing Files');
    //             cache.addAll(casheAssets);
    //         })
    //         .then( () => self.skipWaiting() )
    // );
});

// Call Activate Event
self.addEventListener('activate', (event) => {
    // console.log('Service Worker: Activated');
    // Remove Unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map( cache => {
                    if (cache !== cacheName) {
                        // console.log('Service Worker: Clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

// Call Fetch Event
self.addEventListener('fetch', (event) => {
    // console.log('Service Worker: Fetching');

    event.respondWith(
        fetch(event.request)
        .then(res => {
            // Make copy/clone of response
            const resClone = res.clone();
            // Open Cache
            caches
            .open(cacheName)
            .then(cache => {
                // Add the response to cache
                cache.put(event.request, resClone);
            });
            return res;
        }).catch(err => caches.match(event.request).then(res => res))

    );
});