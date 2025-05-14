import { auth } from './firebase-config.js';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.19.0/firebase-auth.js";

// Login function
export async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("Logged in:", userCredential.user);

    // After successful login, check if user is logged in
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is logged in:", user);
        document.getElementById('view-all-btn').click(); // Trigger 'Show Inventory'
      } else {
        console.log("No user logged in");
      }
    });
  } catch (error) {
    console.error("Error logging in:", error);
  }
}

// Logout function
export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error logging out:", error);
  }
}