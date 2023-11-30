
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCM7m7a-8F5nhYr0x_DZxTvrlY4INqQzxg",
    authDomain: "todoapp-6db05.firebaseapp.com",
    projectId: "todoapp-6db05",
    storageBucket: "todoapp-6db05.appspot.com",
    messagingSenderId: "774946138847",
    appId: "1:774946138847:web:9621ee205eb29ceec1d76a",
    measurementId: "G-4B0TNW99HE"
  };
  
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  
  export {db}