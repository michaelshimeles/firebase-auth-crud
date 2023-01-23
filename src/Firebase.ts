// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGRLk2TzU8HlLNtXqDi986GtAOGKxWNMo",
  authDomain: "fir-crud-16d5d.firebaseapp.com",
  projectId: "fir-crud-16d5d",
  storageBucket: "fir-crud-16d5d.appspot.com",
  messagingSenderId: "85617115777",
  appId: "1:85617115777:web:ac3a750032fb2a06ee4380",
  measurementId: "G-3416XMJRMD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
