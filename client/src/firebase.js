// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "real-estate-b434b.firebaseapp.com",
  projectId: "real-estate-b434b",
  storageBucket: "real-estate-b434b.firebasestorage.app",
  messagingSenderId: "68730503728",
  appId: "1:68730503728:web:ce91059ad5be05714fa3f5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);