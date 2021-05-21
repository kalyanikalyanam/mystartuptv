import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';


var config = {
    apiKey: "AIzaSyCKyWGO2UvC7VCr75SQZRmIBX6o0Wh9e2s",
    authDomain: "mystartuptv-8e985.firebaseapp.com",
    databaseURL: "https://mystartuptv-8e985.firebaseio.com",
    projectId: "mystartuptv-8e985",
    storageBucket: "mystartuptv-8e985.appspot.com",
    messagingSenderId: "1039945577635",
    appId: "1:1039945577635:web:e01b6cf2303dda34e53b16"
 

};



firebase.initializeApp(config);
export default firebase;
