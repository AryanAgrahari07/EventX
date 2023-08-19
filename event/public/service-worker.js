// Register a service worker to handle the notification
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service worker registration successful.');
        // Listen for incoming notifications
        registration.addEventListener('push', function(event) {
          // Retrieve the notification data
          const data = event.data.json();
          const { title, body, icon } = data.notification;
          // Display the notification
          self.registration.showNotification(title, { body, icon });
        });
      })
      .catch(function(error) {
        console.log('Service worker registration failed:', error);
      });
  }