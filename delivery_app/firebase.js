import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyC1I-7hRLzOJLNTpNo7NYekTMt_XrQBhaE",
  authDomain: "myproject-328909.firebaseapp.com",
  projectId: "myproject-328909",
  storageBucket: "myproject-328909.appspot.com",
  messagingSenderId: "825291155071",
  appId: "1:825291155071:web:46b959d0089c7fe3eac14a"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;


