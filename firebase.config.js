import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCaXcytqrjvv1KDNpZtlZMlqUv_3WBcj_0",
  authDomain: "diwali-ticketing.firebaseapp.com",
  projectId: "diwali-ticketing",
  storageBucket: "diwali-ticketing.appspot.com",
  messagingSenderId: "240536048758",
  appId: "1:240536048758:web:785a6179f9af37246abb57",
  measurementId: "G-2EL06Y7EHZ",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
