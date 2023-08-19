import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "event-261e7.appspot.com",
  messagingSenderId: "860477917704",
  appId: "1:860477917704:web:c4c8b1290804e6bd089fbd",
  measurementId: "G-11H02NZEFB"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);
