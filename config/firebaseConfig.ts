import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD8FJMeciw21iGtMkP4f9Vop1qsiubaBYk",
  authDomain: "healthyogaapp.firebaseapp.com",
  projectId: "healthyogaapp",
  storageBucket: "healthyogaapp.appspot.com",
  messagingSenderId: "317722593153",
  appId: "1:317722593153:android:e0f3bcdd64af8fcc6f4a80",
};

const app = initializeApp(firebaseConfig);

const firestore = getFirestore(app);

export { app, firestore };
