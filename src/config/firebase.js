// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAY0QFWBS1rrjwX00Id7xrCdFqKLQ3jVws",
    authDomain: "employeestatus-98cb9.firebaseapp.com",
    projectId: "employeestatus-98cb9",
    storageBucket: "employeestatus-98cb9.firebasestorage.app",
    messagingSenderId: "40645520643",
    appId: "1:40645520643:web:6a32c65317b5274a32cd36",
    measurementId: "G-PCVJ311MDD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
