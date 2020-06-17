import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

var firebaseConfig = {
    apiKey: "AIzaSyBUZJZWC30oGSay2GmRm5Ju72dUn5MRzZI",
    authDomain: "slack-cdb11.firebaseapp.com",
    databaseURL: "https://slack-cdb11.firebaseio.com",
    projectId: "slack-cdb11",
    storageBucket: "slack-cdb11.appspot.com",
    messagingSenderId: "327010898121",
    appId: "1:327010898121:web:ae9487c3549d05d084fd18"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;
