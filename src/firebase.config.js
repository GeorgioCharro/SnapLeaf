// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlFLUXVKzqEwK06NT9ZMn6aTjhCzWPnf8",
  authDomain: "snapleaf-71813.firebaseapp.com",
  projectId: "snapleaf-71813",
  storageBucket: "snapleaf-71813.appspot.com",
  messagingSenderId: "806554763147",
  appId: "1:806554763147:web:e4805d82cdd8450c5df98e"
};

// Initialize Firebase
 initializeApp(firebaseConfig);

export const db=getFirestore()