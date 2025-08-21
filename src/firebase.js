import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import * as demoServices from './firebase-demo.js';

// Your Firebase configuration
// Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

// Check if we're using demo mode (placeholder config detected)
const isDemoMode = firebaseConfig.apiKey === "your-api-key";

let auth, db, storage, googleProvider, onAuthStateChanged;

if (isDemoMode) {
  console.log('🎮 Running in DEMO MODE - No Firebase setup required!');
  console.log('📝 To use real Firebase, update the config in src/firebase.js');
  
  // Use demo services
  auth = demoServices.auth;
  db = demoServices.db;
  storage = demoServices.storage;
  googleProvider = demoServices.googleProvider;
  
  // Set up auth state change handler for demo
  onAuthStateChanged = (callback) => {
    demoServices.auth.onAuthStateChanged = callback;
    // Initially call with null user
    callback(null);
    return () => {
      demoServices.auth.onAuthStateChanged = null;
    };
  };
} else {
  // Initialize real Firebase
  const app = initializeApp(firebaseConfig);
  
  // Initialize Firebase services
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  googleProvider = new GoogleAuthProvider();
  onAuthStateChanged = firebaseOnAuthStateChanged;
}

export { auth, db, storage, googleProvider, onAuthStateChanged, isDemoMode };

export default null;
