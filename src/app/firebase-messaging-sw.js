// firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.5.0/firebase-messaging-compat.js');

firebase.initializeApp({
    // apiKey: "YOUR_API_KEY",
    // projectId: "YOUR_PROJECT_ID",
    // messagingSenderId: "YOUR_SENDER_ID",
    // appId: "YOUR_APP_ID"

    apiKey: "AIzaSyAR-GtS70uqHsWufXJb_jTzUohK7zeFiEM",
    authDomain: "hide-project-3622d.firebaseapp.com",
    projectId: "hide-project-3622d",
    storageBucket: "hide-project-3622d.firebasestorage.app",
    messagingSenderId: "191697751390",
    appId: "1:191697751390:web:71147043cd4e7249b393cf",
    measurementId: "G-FNSLW9CB50",
    vapidKey: "DVN8r4rYVaNY4gaOe7YLNDje3gpjCXyIwyKn-DAzrzU"
});

const messaging = firebase.messaging();
