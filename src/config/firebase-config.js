
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCoRW1FmOUdga2acDtck5BUBYtlOW4gLA8",
  authDomain: "warehouse-management-sqf.firebaseapp.com",
  projectId: "warehouse-management-sqf",
  storageBucket: "warehouse-management-sqf.appspot.com",
  messagingSenderId: "806597955478",
  appId: "1:806597955478:web:e4dac517cee4a913cbd7b7",
  measurementId: "G-JLMSP6T5B7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const GoogleProvider = new GoogleAuthProvider();

export const db = getFirestore(app)
export const storage = getStorage(app)