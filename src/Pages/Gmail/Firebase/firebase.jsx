import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCd8o0WXCAoVI9XkgYbNJe1jA8YdIMPAQw",
  authDomain: "crm-mail-module.firebaseapp.com",
  projectId: "crm-mail-module",
  storageBucket: "crm-mail-module.appspot.com",
  messagingSenderId: "598757844287",
  appId: "1:598757844287:web:c6c92c1fbe44984ec9df8a",
  measurementId: "G-ME0KGYQJF0",
};

const firebaseApp = initializeApp(firebaseConfig);
// Firestore Reference
const db = getFirestore(firebaseApp);
// Cloud Storage Reference
const storage = getStorage(firebaseApp);
// Authentication Refernece
const auth = getAuth();

export { db, storage, auth };

/* const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export {db} */