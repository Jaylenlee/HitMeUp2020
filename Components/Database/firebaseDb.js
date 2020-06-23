import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

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
const db = firebase.firestore();
const fs = firebase.firestore;
const auth = firebase.auth();

export default {db: db, auth: auth, fs: fs};
//export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : {db: db, auth: auth};