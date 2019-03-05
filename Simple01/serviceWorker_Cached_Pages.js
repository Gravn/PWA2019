//Caching specific pages
const cacheName = 'Simple01V2';
const cacheAssets =
    [
        'index.html',
        '/css/simpleStyle01.css',
        '/js/main.js'
    ];

//Call Install and Save cache Event
self.addEventListener('install', e => 
{
    console.log('Service Worker: Installed');

    e.waitUntil
    (
        caches
        .open(cacheName)
        .then(cache =>
        {
            console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    )
})

//Call Activate Event
self.addEventListener('activate', e => 
{
    console.log('Service Worker: Activated');
    //Remove old caches
    e.waitUntil(
        caches.keys().then(cacheNames => 
        {
            return Promise.all
            (cacheNames.map(
                cache => 
                {
                    if(cache !== cacheName)
                    {
                        console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

//Call Fetch Event
self.addEventListener('fetch', e => 
{
    console.log('Service Worker: Fetching cache');
    e.respondWith
    (
        fetch(e.request)
        .catch(() => caches.match(e.request))
    )
})