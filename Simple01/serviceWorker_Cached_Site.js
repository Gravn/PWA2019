//Caching specific pages
const cacheName = 'Simple01V2';

//Call Install and Save cache Event
self.addEventListener('install', e => 
{
    console.log('Service Worker: Installed');
})

//Call Activate Event
self.addEventListener('activate', e => 
{
    console.log('Service Worker: Activated');
    //Remove old caches
    e.waitUntil
    (
        caches.keys().then(cacheNames => 
        {
            return Promise.all(cacheNames.map(cache => 
            {
                if(cache !== cacheName)
                {
                    console.log('Service Worker: Clearing Old Cache');
                    return caches.delete(cache);
                }
            }))
        })
    );
})

//Call Fetch Event, Network, falling back to cache with frequent updates(updating cache if network avaliable)
self.addEventListener('fetch', e => 
{
    console.log('Service Worker: Fetching cache');
    e.respondWith
    (
        fetch(e.request)
        .then(res =>
        {
            //Clone server response
            const resClone = res.clone();

            //Open Cache
            caches.open(cacheName)
            .then(cache =>
            {
                //Add response to cache
                cache.put(e.request, resClone);
            })
            return res;
        })
        .catch(err => 
        {
                console.log('Offline: loading cache');
                caches.match(e.request)
        })

        .then(res => res)
    )
})