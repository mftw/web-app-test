/**
 * Installer service worker hvis nødvendigt
 * Du skal referere til denne fil fra dit sites footer
 * Bemærk at din service worker fil skal ligge på roden af dit site (Linie 8)
 */
if('serviceWorker' in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function (registration) {
                console.log("Service Worker registred");
            })
            .catch(function(error) {
                console.error("Registration failed!");
            })
    })
}