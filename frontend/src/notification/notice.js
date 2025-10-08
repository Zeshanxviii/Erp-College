// ##########################################################################################################

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHYLC125cjpJl-HIm7R8F7epdKQF-qmOU",
  authDomain: "erpnoticechannel.firebaseapp.com",
  projectId: "erpnoticechannel",
  storageBucket: "erpnoticechannel.firebasestorage.app",
  messagingSenderId: "713167625953",
  appId: "1:713167625953:web:db75d8db2272a6272c21a0",
  measurementId: "G-RQRC77FJ91"
};

  ``  ` ` ` ` ` ` ` ` ` ` ` ` ``````````` ` ` ` ` ` ` ` ` ` ``

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);