// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCF9lfuIqWwDY4Zd-An0BeFuS7Kr1dLiqE",
  authDomain: "shopnet-44a5e.firebaseapp.com",
  databaseURL: "https://shopnet-44a5e-default-rtdb.firebaseio.com",
  projectId: "shopnet-44a5e",
  storageBucket: "shopnet-44a5e.appspot.com",
  messagingSenderId: "1001414580194",
  appId: "1:1001414580194:web:52473c9ff35ca8ad1d8bbb",
  measurementId: "G-Y1Q2JY90LM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
