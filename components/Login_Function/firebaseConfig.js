import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBz7SmdJTjsb0NuMdkPPHodPxAv56Ud7Uk",
  authDomain: "firebidalogin.firebaseapp.com",
  projectId: "firebidalogin",
  storageBucket: "firebidalogin.appspot.com",
  messagingSenderId: "336774241773",
  appId: "1:336774241773:web:55d4db39b72cde6aad1be4",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const emailsRef = collection(FIRESTORE_DB, "emails");
