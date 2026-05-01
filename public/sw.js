self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker ...', event);
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker ...', event);
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  // Only handle requests that belong to the same origin (the Vite dev server)
  if (url.origin !== self.location.origin) {
    // Let the browser perform the request normally (e.g., Firebase API calls)
    return;
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      // Graceful fallback when the network fails
      return new Response('Not found', {
        status: 404,
        statusText: 'Not Found',
        headers: { 'Content-Type': 'text/plain' },
      });
    })
  );
});

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/vite.svg',
    badge: '/vite.svg'
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});
