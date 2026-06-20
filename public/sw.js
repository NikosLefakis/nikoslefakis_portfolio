// Placeholder service worker — prevents 404 in the browser console
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
