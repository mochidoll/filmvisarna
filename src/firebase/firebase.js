import firebase from 'firebase'
import 'firebase/firestore'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyDnJQuOn6Lr_bf17clr0DF8a57AEyN-DI8",
  authDomain: "group-assignment-cinema.firebaseapp.com",
  databaseURL: "https://group-assignment-cinema.firebaseio.com",
  projectId: "group-assignment-cinema",
  storageBucket: "group-assignment-cinema.appspot.com",
  messagingSenderId: "74024270977",
  appId: "1:74024270977:web:0c1ea48a9c28b2781b6180"
};

// Firebase app
let myFirebase = firebase.initializeApp(config);

// Firebase db
const db = myFirebase.firestore();

export {
  db
}