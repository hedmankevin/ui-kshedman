import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYJSHyMGdnB17LU8KjQFyHSJWBqscbkhM",
  authDomain: "webapp-cfed6.firebaseapp.com",
  projectId: "webapp-cfed6",
  storageBucket: "webapp-cfed6.appspot.com",
  messagingSenderId: "436118793564",
  appId: "1:436118793564:web:288bf2450964d0b858a599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);