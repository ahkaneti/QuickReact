import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCV2IplSzl2HcEwetTatp-frMcu7Pze9H4",
  authDomain: "scheduler-a9a8f.firebaseapp.com",
  databaseURL: "https://scheduler-a9a8f.firebaseio.com",
  projectId: "scheduler-a9a8f",
  storageBucket: "scheduler-a9a8f.appspot.com",
  messagingSenderId: "676834200657",
  appId: "1:676834200657:web:8bf78c2795494695023c70",
  measurementId: "G-VBWNXN74JB"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();
export default db;