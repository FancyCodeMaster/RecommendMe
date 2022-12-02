import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyAlMqN2uJC1XBEUaWJJ5aFYbS2oTEPTaSg",
  authDomain: "recommendme-9e7d6.firebaseapp.com",
  projectId: "recommendme-9e7d6",
  storageBucket: "recommendme-9e7d6.appspot.com",
  messagingSenderId: "320578258281",
  appId: "1:320578258281:web:d68ed1c6aa035ee12369f8",
  measurementId: "G-XM95WD0PDZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);