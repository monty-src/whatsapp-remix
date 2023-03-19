/**
 * @module next.config
 *
 *
 * @author montier.elliott@gmail.com
 */
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

/**
 * Firebase API keys
 *
 *
 * @typedef {Object} FirebaseConfig
 */
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

/** Firebase app instance */
const app = initializeApp(firebaseConfig);

/** Firestore instance */
const db = getFirestore();

/** Firebase Auth instance */
const auth = getAuth();

/** Google Auth provider instance */
const provider = new GoogleAuthProvider();

/** exporting */
export { db, auth, provider };
