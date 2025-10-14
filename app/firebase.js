// import { initializeApp } from 'firebase/app';
// import {
//   getMessaging,
//   getToken,
//   onMessage,
//   deleteToken,
// } from 'firebase/messaging';

// const firebaseConfig = {
//   apiKey: 'AIzaSyC-HlC2lV2x1pAl2v4UrM2dNHTzvzGgts0',
//   authDomain: 'mst-igaming.firebaseapp.com',
//   projectId: 'mst-igaming',
//   storageBucket: 'mst-igaming.firebasestorage.app',
//   messagingSenderId: '699740337867',
//   appId: '1:699740337867:web:b979ef488903bc91bd8d4e',
//   measurementId: 'G-ZPFZ98P409',
// };
// const app = initializeApp(firebaseConfig);
// const messaging = getMessaging(app);

// const publicKey = process.env.VAPID_KEY;

// export const getFCMToken = async () => {
//   let currentToken = '';
//   try {
//     currentToken = await getToken(messaging, { vapidKey: publicKey });
//     if (currentToken) {
//       return currentToken;
//     } else {
//       return null;
//     }
//   } catch (error) {
//     console.error('An error occurred while retrieving token.', error);
//   }
//   return currentToken;
// };

// export const onMessageListener = (setNotification) =>
//   new Promise((resolve) => {
//     onMessage(messaging, (payload) => {
//       console.log(payload, 'payload in on message listerniser in girebase');
//       setNotification(payload);
//       resolve(payload);
//     });
//   });

// export { messaging, getToken, deleteToken };
