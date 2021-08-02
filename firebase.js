import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6psb71ZgYAWkDEgjL91QKHx7NCiojfVU",
  authDomain: "savomobileapp-2b61a.firebaseapp.com",
  projectId: "savomobileapp-2b61a",
  storageBucket: "savomobileapp-2b61a.appspot.com",
  messagingSenderId: "418816982339",
  appId: "1:418816982339:web:314d1eb5e10fce45bdc3f6",
  measurementId: "G-XVCXVC9CZ9",
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();
export { db, auth };
