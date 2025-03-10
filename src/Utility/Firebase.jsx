import firebase from "firebase/compat/app"
import {getAuth} from "firebase/auth"
import"firebase/compat/firestore"
import "firebase/compat/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWAo2jy1cEI4g5MyENHyxAxQx9DS0xgiA",
  authDomain: "clone-6abca.firebaseapp.com",
  projectId: "clone-6abca",
  storageBucket: "clone-6abca.firebasestorage.app",
  messagingSenderId: "27544485688",
  appId: "1:27544485688:web:18f4fd540f86d2ab4b4bcd",
  measurementId: "G-NJXTQGY3E3",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth =getAuth(app);
export const db = app.firestore();