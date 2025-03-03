// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth , GoogleAuthProvider } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGQwlUnMp4bKVJa6KqnY-4fHWE_CAwtoo",
  authDomain: "news-48af9.firebaseapp.com",
  projectId: "news-48af9",
  storageBucket: "news-48af9.firebasestorage.app",
  messagingSenderId: "705977525894",
  appId: "1:705977525894:web:0b7d4dc835e63ffbfed307",
  measurementId: "G-825836S4TD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()
// const analytics = getAnalytics(app);