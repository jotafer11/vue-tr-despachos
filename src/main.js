import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";
import 'firebase/compat/storage';


import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2lFvw4OGZGJi33FpZkwdT4cnttdnQWwo",
  authDomain: "ml-vue.firebaseapp.com",
  projectId: "ml-vue",
  storageBucket: "ml-vue.appspot.com",
  messagingSenderId: "557460278919",
  appId: "1:557460278919:web:5030259f48ab3528df3222"
};

firebase.initializeApp(firebaseConfig);
var storage = firebase.storage();
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { db, auth, storage };


createApp(App).use(store).use(router).mount('#app')

