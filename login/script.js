import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-analytics.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js"; // Add the Firebase Auth SDK

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID (optional)",
};
document.addEventListener("DOMContentLoaded", function () {
  // Event listener for Google Sign-In button
  const googleSignInButton = document.getElementById("googleSignInButton");
  googleSignInButton.addEventListener("click", signInWithGoogle);

  // Event listener for Email/Password Sign-In button
  const emailSignInButton = document.getElementById("emailSignInButton");
  emailSignInButton.addEventListener("click", signInWithEmailAndPassword);
});
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the authentication service
const auth = getAuth(app); // Initializing Firebase Auth

// Function to handle Google Sign-In
function signInWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // This gives you a Google Access Token.
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      console.log(user);
      // You can do something with the user object here.
    })
    .catch((error) => {
      // Handle errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential =
        firebase.auth.GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);
    });
}

function signInWithEmailAndPassword() {
  const email = document.getElementById("emailInput").value;
  const password = document.getElementById("passwordInput").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Email/Password User signed in:", user);
      // Additional actions after Email/Password sign-in
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Email/Password Sign-in Error:", errorCode, errorMessage);
      // Handle Email/Password sign-in errors
    });
}
