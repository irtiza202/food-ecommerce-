// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCEPeRLt3VydcsWOrREcvARuHV6iFQCulA",
  authDomain: "e-commerce-1212.firebaseapp.com",
  projectId: "e-commerce-1212",
  storageBucket: "e-commerce-1212.firebasestorage.app",
  messagingSenderId: "53549594004",
  appId: "1:53549594004:web:fc1ec0c82e061e863fcb81"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { analytics, auth, firestore };
