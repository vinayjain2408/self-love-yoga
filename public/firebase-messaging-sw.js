// Import the Firebase app and messaging services
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js',
);

// Initialize Firebase with your Firebase config
firebase.initializeApp({
  apiKey: 'AIzaSyC-HlC2lV2x1pAl2v4UrM2dNHTzvzGgts0',
  authDomain: 'mst-igaming.firebaseapp.com',
  projectId: 'mst-igaming',
  storageBucket: 'mst-igaming.firebasestorage.app',
  messagingSenderId: '699740337867',
  appId: '1:699740337867:web:b979ef488903bc91bd8d4e',
  measurementId: 'G-ZPFZ98P409',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message: ', payload);

  const redirectUrl = 'https://mst-igaming.codesfortomorrow.com';
  const notificationTitle = payload?.data?.title;
  const notificationOptions = {
    body: payload?.data?.body,
    icon: '/android-chrome-256x256.png',
    vibrate: [200, 100, 200],
    requireInteraction: true,
    data: {
      redirectUrl,
    },
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener('notificationclick', (event) => {
//   console.info('Notification clicked:', event.notification);
//   event.notification.close(); // Close the notification

//   const redirectUrl = event.notification.data?.redirectUrl;

//   if (redirectUrl) {
//     event.waitUntil(clients.openWindow(redirectUrl));
//   }
// });
