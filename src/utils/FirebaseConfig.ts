// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAGLeCExdtBvZzwlqCYj8LImS-NpK5q6YA",
  authDomain: "zoom-clone-1b30c.firebaseapp.com",
  projectId: "zoom-clone-1b30c",
  storageBucket: "zoom-clone-1b30c.appspot.com",
  messagingSenderId: "764096183644",
  appId: "1:764096183644:web:b5ea455643985f1f619599",
  measurementId: "G-1XM6NZH1GF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app)
export const firebaseDB = getFirestore(app)

export const userRef = collection(firebaseDB, "users")