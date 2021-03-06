// import firebase from 'firebase/app';
// import "firebase/firestore";
// import "firebase/auth";

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_API_KEY,
//     authDomain: process.env.REACT_APP_AUTH_DOMAIN,
//     databaseURL: process.env.REACT_APP_DATABASE_URL,
//     projectId: process.env.REACT_APP_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_APP_ID
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// export const db = firebase.firestore();
// export default firebase;

import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
  // Authentication infomation
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
})

// 認証用
const auth = firebase.auth();
// ToDo管理用
const db = firebase.firestore();
// チャット用
const firebaseDb = firebase.database();

export {auth, db, firebaseDb};