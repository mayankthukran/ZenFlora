// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

// Your Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyAl4LuiLESlbV62cYu4yiirFX6washhwLg",
  authDomain: "zenflora-my.firebaseapp.com",
  projectId: "zenflora-my",
  storageBucket: "zenflora-my.firebasestorage.app",
  messagingSenderId: "152449266293",
  appId: "1:152449266293:web:63975ead472bb39a93fe3c",
  measurementId: "G-N2K8DWQECD"
};

// Initialize Firebase only if no apps exist and we're in browser
let app
let auth

if (typeof window !== 'undefined') {
  // Only initialize Firebase in the browser
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  auth = getAuth(app)
} else {
  // Server-side: create mock objects to prevent errors
  app = null
  auth = null
}

export { auth }
export default app