// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
// import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBA_JbObxChQ3WrzSrG5SIVgxWqL23f7ao",
  authDomain: "future-sportler.firebaseapp.com",
  projectId: "future-sportler",
  storageBucket: "future-sportler.firebasestorage.app",
  messagingSenderId: "982158309109",
  appId: "1:982158309109:web:1b821c3202dde92b9bb7bc",
  measurementId: "G-SG5BC66GFZ",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
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
