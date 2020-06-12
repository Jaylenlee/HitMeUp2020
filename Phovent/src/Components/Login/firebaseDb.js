import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCcAnseVGB14351ytDfUL4dkTca6AcqXKY",
    authDomain: "logintest-49507.firebaseapp.com",
    databaseURL: "https://logintest-49507.firebaseio.com",
    projectId: "logintest-49507",
    storageBucket: "logintest-49507.appspot.com",
    messagingSenderId: "679584447227",
    appId: "1:679584447227:web:31add1ace743c2ba55ce5e"
  };

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase