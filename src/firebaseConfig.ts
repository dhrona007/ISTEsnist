import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC2JysWJSkOPllrk57jszCzAKqeGdu-gXo",
  authDomain: "istesnist-2026.firebaseapp.com",
  projectId: "istesnist-2026",
  storageBucket: "istesnist-2026.firebasestorage.app",
  messagingSenderId: "745666809153",
  appId: "1:745666809153:web:c2287d879a2b265bafa5c0",
  measurementId: "G-TFQT6YE4C7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
