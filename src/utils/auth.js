import { getAuth, signInWithPopup, signOut as firebaseSignOut, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { app } from "./client";

const auth = getAuth(app);
const database = getDatabase(app);

// Firebase Authentication
const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider);
};

const signOut = () => {
  firebaseSignOut(auth);
};

const checkUser = (uid) =>
  new Promise((resolve, reject) => {
    const userRef = ref(database, `/users/${uid}`);
    get(userRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          resolve(snapshot.val()); // Return user data
        } else {
          resolve({}); // Return empty object if user does not exist
        }
      })
      .catch(reject);
  });

// Register a new user in Realtime Database
const registerUser = (userInfo) =>
  new Promise((resolve, reject) => {
    const userRef = ref(database, `/users/${userInfo.uid}`);
    set(userRef, userInfo)
      .then(() => resolve(userInfo)) // Resolve with the registered user info
      .catch(reject);
  });

export { signIn, signOut, checkUser, registerUser };
