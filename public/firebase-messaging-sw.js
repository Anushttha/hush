importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyD9sVZChEJ0p1GE-7Gh367E-3dDTekwYFU",
    authDomain: "hush-df0a6.firebaseapp.com",
    databaseURL: "https://hush-df0a6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hush-df0a6",
    storageBucket: "hush-df0a6.appspot.com",
    messagingSenderId: "531998820222",
    appId: "1:531998820222:web:9388a25e79adb514c6952f",
    measurementId: "G-9WGWYSGB4G"
  });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/default-icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
