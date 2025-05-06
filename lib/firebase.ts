// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app"
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuKIj8vPuYujWdbfPVkyYQie9FerBwiCY",
  authDomain: "di-twin.firebaseapp.com",
  projectId: "di-twin",
  storageBucket: "di-twin.appspot.com",
  messagingSenderId: "235797705732",
  appId: "1:235797705732:web:ebac0839cad13ba17f3151",
  measurementId: "G-64SEMKFMSG",
}

// Initialize Firebase only if it hasn't been initialized already
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0]

// Initialize Firebase Authentication
export const auth = getAuth(app)

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
