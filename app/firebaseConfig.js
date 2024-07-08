import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCcXP4rG1nDVyka6qD2N6QLm7BB4qi4v5c",
  authDomain: "curlarc-a47e9.firebaseapp.com",
  projectId: "curlarc-a47e9",
  storageBucket: "curlarc-a47e9.appspot.com",
  messagingSenderId: "1079195038730",
  appId: "1:1079195038730:web:51f4c13ef4f34ae2ed1bf3",
  measurementId: "G-QCV4VLZLB8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);