import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAR21YF-I2e4lnXQqo3MaIta0GbkXxaNlY",
    authDomain: "signal-clonex.firebaseapp.com",
    projectId: "signal-clonex",
    storageBucket: "signal-clonex.appspot.com",
    messagingSenderId: "48876377042",
    appId: "1:48876377042:web:c5b9eff062c21f48c82e0b"
  };
  
  // Initialize Firebase
  let app;
  if(firebase.apps.length === 0 ){

  app = firebase.initializeApp(firebaseConfig);
  } else {
      app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };