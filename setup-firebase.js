#!/usr/bin/env node

// Interactive Firebase setup script
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function setupFirebase() {
  console.log('🔧 Hamburg Monopoly Challenge - Firebase Setup\n');
  
  console.log('Follow these steps to set up Firebase:');
  console.log('1. Go to https://console.firebase.google.com/');
  console.log('2. Create a new project or select existing one');
  console.log('3. Enable Authentication (Google provider)');
  console.log('4. Create Firestore Database');
  console.log('5. Enable Storage');
  console.log('6. Get your web app config\n');
  
  const apiKey = await question('Enter your Firebase API Key: ');
  const authDomain = await question('Enter your Auth Domain (e.g., project.firebaseapp.com): ');
  const projectId = await question('Enter your Project ID: ');
  const storageBucket = await question('Enter your Storage Bucket (e.g., project.appspot.com): ');
  const messagingSenderId = await question('Enter your Messaging Sender ID: ');
  const appId = await question('Enter your App ID: ');
  
  const firebaseConfig = `import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, onAuthStateChanged as firebaseOnAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import * as demoServices from './firebase-demo.js';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "${apiKey}",
  authDomain: "${authDomain}",
  projectId: "${projectId}",
  storageBucket: "${storageBucket}",
  messagingSenderId: "${messagingSenderId}",
  appId: "${appId}"
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

export default null;`;

  fs.writeFileSync('src/firebase.js', firebaseConfig);
  
  console.log('\n✅ Firebase configuration updated!');
  console.log('📝 Next steps:');
  console.log('1. Set up Firestore rules (copy from firestore.rules)');
  console.log('2. Set up Storage rules (copy from storage.rules)');
  console.log('3. Test your app: npm run dev');
  console.log('4. Deploy: npm run deploy');
  
  rl.close();
}

setupFirebase().catch(console.error);
