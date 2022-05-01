// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.APP_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   databaseURL: process.env.DATABASE_URL,
//   projectId:process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE,
//   messagingSenderId: process.env.MESSAGING,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_iD,
// };
const firebaseConfig = {
  apiKey: "AIzaSyA3F-TBTTB1nx8umqsJfbIeAP0JJNXOWyc",
  authDomain: "offroad-market.firebaseapp.com",
  databaseURL: "https://offroad-market-default-rtdb.firebaseio.com",
  projectId: "offroad-market",
  storageBucket: "offroad-market.appspot.com",
  messagingSenderId: "331767784872",
  appId: "1:331767784872:web:93c7904685ff650be7699d",
  measurementId: "G-0B7V7M8NKB"
};

// Initialize Firebase
export default function initFirebase() {
  if (!getApps().length) {
    initializeApp(
      firebaseConfig
    )
  }
}

// export const storage = getStorage(initializeApp(firebaseConfig))