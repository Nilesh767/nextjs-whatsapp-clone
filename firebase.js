import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDmRsZz4YW95hX8eZSczt0nW06dBY3SP0I",
  authDomain: "nextjs-whatsapp-clone.firebaseapp.com",
  projectId: "nextjs-whatsapp-clone",
  storageBucket: "nextjs-whatsapp-clone.appspot.com",
  messagingSenderId: "376454720024",
  appId: "1:376454720024:web:567b8e38cb181f94de716d",
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

export const db = firebase.firestore();
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
