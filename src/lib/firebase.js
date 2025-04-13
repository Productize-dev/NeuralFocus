// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAy6nU4d0CzdC7GnRTVWjsODaZIocXtRsE",
  authDomain: "nueralfocus.firebaseapp.com",
  projectId: "nueralfocus",
  storageBucket: "nueralfocus.firebasestorage.app",
  messagingSenderId: "95734191373",
  appId: "1:95734191373:web:3723b38d8fbba030c24c44",
  measurementId: "G-29C3P9C5YX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);