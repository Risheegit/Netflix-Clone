import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjvBnfb7gRoywMJAJx9FwyaoULf2QQ9mw",
  authDomain: "netflix-clone-25663.firebaseapp.com",
  projectId: "netflix-clone-25663",
  storageBucket: "netflix-clone-25663.appspot.com",
  messagingSenderId: "1083854369586",
  appId: "1:1083854369586:web:acbde9ecde2f9edbe15d2b",
  measurementId: "G-7W04DQ41NF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
