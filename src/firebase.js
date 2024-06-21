// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "hush-df0a6.firebaseapp.com",
  projectId: "hush-df0a6",
  storageBucket: "hush-df0a6.appspot.com",
  messagingSenderId: "531998820222",
  appId: "1:531998820222:web:9388a25e79adb514c6952f",
  measurementId: "G-9WGWYSGB4G",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

