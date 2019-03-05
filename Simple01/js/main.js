//check if browser supports service worker

if ('serviceWorker' in navigator)
{
    console.log('Service Worker supported');
    window.addEventListener('load', () => 
    { 
        navigator.serviceWorker
        .register('../serviceWorker_Cached_Site.js')
        .then(reg => console.log('Service Worker: Registered (Site)'))
        .catch(err => console.log(`Service Worker: Error ${err}`));
    });
}
else
{
    console.log('Service Worker not supported');
}
