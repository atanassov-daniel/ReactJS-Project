import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Initialize Cloud Firestore through Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBg39vkJc3CaI-J6bnevQPMPILG8PWmzyI",
    authDomain: "slack-app-1d097.firebaseapp.com",
    projectId: "slack-app-1d097",
    storageBucket: "slack-app-1d097.appspot.com",
    messagingSenderId: "222925739959",
    appId: "1:222925739959:web:afcdf3e05cf61fa02e7a32"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;

export const auth = firebase.auth();
export const db = firebase.firestore();