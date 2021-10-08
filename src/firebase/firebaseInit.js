import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA_U_qm4XWsWD_QambpGCzSIhDemWYCpFg",
    authDomain: "triangu-66dab.firebaseapp.com",
    projectId: "triangu-66dab",
    storageBucket: "triangu-66dab.appspot.com",
    messagingSenderId: "547516993822",
    appId: "1:547516993822:web:3bc904e97b9cd7a1d8790f"
};  

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export {timestamp};
export default firebase.firestore();