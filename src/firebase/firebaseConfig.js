import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDCgah6Bk1dUzslKvQCmqnVfsJtsFxZxHk",
  authDomain: "worklink-mb.firebaseapp.com",
  projectId: "worklink-mb",
  storageBucket: "worklink-mb.firebasestorage.app",
  messagingSenderId: "208274368343",
  appId: "1:208274368343:web:f9fe1ab0831d2c004cc012",
  measurementId: "G-ZPE1WBCKGF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);