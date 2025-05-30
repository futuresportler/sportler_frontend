
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth, Auth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxZz8Q8lKLhPNE0GP9xpPIsMui-72LavM",
  authDomain: "future-sportler-459115.firebaseapp.com",
  projectId: "future-sportler-459115",
  storageBucket: "future-sportler-459115.firebasestorage.app",
  messagingSenderId: "183840114821",
  appId: "1:183840114821:web:40dc4e8124428f9a8f81ec",
  measurementId: "G-EPSS0BEW2S"
}

// Initialize Firebase only if it hasn't been initialized already
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication
export const auth: Auth = getAuth(app)

// Add this to the global window object for TypeScript
declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

export default app

// Helper function to check if Firebase is properly initialized
export const checkFirebaseInitialization = () => {
  try {
    // Check if auth is initialized
    if (!auth) {
      console.error("Firebase auth is not initialized")
      return false
    }

    // Check if the app is initialized
    if (!app) {
      console.error("Firebase app is not initialized")
      return false
    }

    return true
  } catch (error) {
    console.error("Error checking Firebase initialization:", error)
    return false
  }
}

// Export the app configuration for debugging if needed
export const getFirebaseConfig = () => {
  return { ...firebaseConfig }
}
