import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAY0QFWBS1rrjwX00Id7xrCdFqKLQ3jVws",
    authDomain: "employeestatus-98cb9.firebaseapp.com",
    projectId: "employeestatus-98cb9",
    storageBucket: "employeestatus-98cb9.firebasestorage.app",
    messagingSenderId: "40645520643",
    appId: "1:40645520643:web:6a32c65317b5274a32cd36",
    measurementId: "G-PCVJ311MDD",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

console.log(auth);
export { db, auth };
