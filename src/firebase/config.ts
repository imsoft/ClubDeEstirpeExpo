import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import "react-native-get-random-values";

const firebaseConfig = {
  // apiKey: process.env.API_KEY,
  // authDomain: process.env.AUTH_DOMAIN,
  // projectId: process.env.PROJECT_ID,
  // storageBucket: process.env.STORAGE_BUCKET,
  // messagingSenderId: process.env.MESSAGING_SENDER_ID,
  // appId: process.env.APP_ID,
  apiKey: "AIzaSyDHBqaoDpzlm4abBxXaXB-Cz9WsZlhR5F4",
  authDomain: "clubdeestirpe-df60c.firebaseapp.com",
  projectId: "clubdeestirpe-df60c",
  storageBucket: "clubdeestirpe-df60c.appspot.com",
  messagingSenderId: "620680821548",
  appId: "1:620680821548:web:95c40d6e0b3a5ab2f7ca89",
};

export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore(FirebaseApp);
export const FirebaseStorage = getStorage(FirebaseApp);
