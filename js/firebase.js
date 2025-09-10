// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-analytics.js";
import {
  getFirestore,
  enableIndexedDbPersistence,
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAvka1C7uS0QD1evzTIgJMAuymmkPvOWwg",
  authDomain: "food-ninja-93a59.firebaseapp.com",
  projectId: "food-ninja-93a59",
  storageBucket: "food-ninja-93a59.firebasestorage.app",
  messagingSenderId: "921180030748",
  appId: "1:921180030748:web:b1211a49c6bca073849cd9",
  measurementId: "G-YRC2C37NFW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
