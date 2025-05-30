/**
 * Authentication service for supplier signup and token management
 */

import type { SupplierOnboardingState } from "@/types/supplier"

// At the top of the file, add this check for browser environment
const isBrowser = typeof window !== "undefined"

// TESTING ONLY: Configuration for hardcoded authentication
// Set this to true to use a hardcoded token instead of the real authentication flow
const USE_HARDCODED_TOKEN_FOR_TESTING = false
// Replace this with your test token when needed
const TEST_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBwbGllcklkIjoiZjgxYjIxNjctMzMwMC00YmI5LTg4Y2EtOTJhNTliYTNlOTBiIiwibW9iaWxlX251bWJlciI6Iis5MTc4NDI5MDAxNTUiLCJpYXQiOjE3NDU2Njc1NzIsImV4cCI6MTc0NTY3MTE3Mn0.TMM0nLK-nmNeGaq-OMb_Myp3dLibkOb0fWxyBTVdVyk"
const TEST_REFRESH_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBwbGllcklkIjoiZjgxYjIxNjctMzMwMC00YmI5LTg4Y2EtOTJhNTliYTNlOTBiIiwibW9iaWxlX251bWJlciI6Iis5MTc4NDI5MDAxNTUiLCJpYXQiOjE3NDU2Njc1NzIsImV4cCI6MTc0ODI1OTU3Mn0.ljc_YWmNvV6FuLAtV75KvT8o1YW-CwJW7pmDlAgnkIw"

// Function to call the supplier signup API
export const supplierSignup = async (mobileNumber: string, firebaseIdToken: string) => {
  try {
    const response = await fetch("https://api-primary.futuresportler.com/api/suppliers/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: mobileNumber,
        firebaseIdToken: firebaseIdToken,
        role: "owner", // Hardcoded as per the API requirement
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to sign up")
    }

    const data = await response.json()

    // Initialize onboarding state for new users
    initializeOnboardingState()

    return data
  } catch (error) {
    console.error("Supplier signup error:", error)
    throw error
  }
}

// Update the saveAuthTokens function
export const saveAuthTokens = (accessToken: string, refreshToken: string) => {
  if (isBrowser) {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
  }
}

// Update the getAccessToken function to use the hardcoded token when enabled
export const getAccessToken = () => {
  if (USE_HARDCODED_TOKEN_FOR_TESTING) {
    console.warn("WARNING: Using hardcoded access token for testing purposes!")
    return TEST_ACCESS_TOKEN
  }
  return isBrowser ? localStorage.getItem("accessToken") : null
}

// Update the getRefreshToken function to use the hardcoded token when enabled
export const getRefreshToken = () => {
  if (USE_HARDCODED_TOKEN_FOR_TESTING) {
    console.warn("WARNING: Using hardcoded refresh token for testing purposes!")
    return TEST_REFRESH_TOKEN
  }
  return isBrowser ? localStorage.getItem("refreshToken") : null
}

// Update the clearAuthTokens function
export const clearAuthTokens = () => {
  if (isBrowser) {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("supplierOnboardingState")
    localStorage.removeItem("supplierModules")
  }
}

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getAccessToken()
}

// Function to refresh the access token using refresh token
export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken()

  if (!refreshToken) {
    throw new Error("No refresh token available")
  }

  try {
    const response = await fetch("https://api-primary.futuresportler.com/api/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken,
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to refresh token")
    }

    const data = await response.json()
    saveAuthTokens(data.accessToken, data.refreshToken)

    return data.accessToken
  } catch (error) {
    console.error("Token refresh error:", error)
    clearAuthTokens()
    throw error
  }
}

// Update the initializeOnboardingState function
export const initializeOnboardingState = () => {
  if (isBrowser) {
    const onboardingState: SupplierOnboardingState = {
      profileCompleted: false,
      academyAdded: false,
      turfAdded: false,
      coachAdded: false,
      anyEntityAdded: false,
      academyVerified: false,
    }
    localStorage.setItem("supplierOnboardingState", JSON.stringify(onboardingState))

    // Initialize supplier modules
    const supplierModules = {
      academy: { enabled: false, entities: [] },
      turf: { enabled: false, entities: [] },
      coach: { enabled: false, entities: [] },
    }
    localStorage.setItem("supplierModules", JSON.stringify(supplierModules))
  }
}

// Update the getOnboardingState function
export const getOnboardingState = (): SupplierOnboardingState => {
  if (!isBrowser) {
    return {
      profileCompleted: false,
      academyAdded: false,
      turfAdded: false,
      coachAdded: false,
      anyEntityAdded: false,
      academyVerified: false,
    }
  }

  const state = localStorage.getItem("supplierOnboardingState")
  if (!state) {
    // If no state exists, initialize it
    initializeOnboardingState()
    return {
      profileCompleted: false,
      academyAdded: false,
      turfAdded: false,
      coachAdded: false,
      anyEntityAdded: false,
      academyVerified: false,
    }
  }
  return JSON.parse(state)
}

// Update the updateOnboardingState function
export const updateOnboardingState = (updates: Partial<SupplierOnboardingState>) => {
  if (!isBrowser) {
    return {
      profileCompleted: false,
      academyAdded: false,
      turfAdded: false,
      coachAdded: false,
      anyEntityAdded: false,
      academyVerified: false,
      ...updates,
    }
  }

  const currentState = getOnboardingState()
  const newState = { ...currentState, ...updates }

  // Update anyEntityAdded based on individual entity states
  newState.anyEntityAdded = newState.academyAdded || newState.turfAdded || newState.coachAdded

  localStorage.setItem("supplierOnboardingState", JSON.stringify(newState))

  // Update supplierModules based on new state
  const storedModules = localStorage.getItem("supplierModules")
  const modules = storedModules
    ? JSON.parse(storedModules)
    : {
        academy: { enabled: false, entities: [] },
        turf: { enabled: false, entities: [] },
        coach: { enabled: false, entities: [] },
      }

  // Enable modules based on profile completion
  if (newState.profileCompleted) {
    modules.academy.enabled = true
    modules.turf.enabled = true
    modules.coach.enabled = true
  }

  // Add entities based on what's been added
  if (updates.academyAdded && modules.academy.entities.length === 0) {
    modules.academy.entities = [{ id: 1, name: "Premier Cricket Academy", location: "Mumbai", status: "pending" }]
  }

  if (updates.turfAdded && modules.turf.entities.length === 0) {
    modules.turf.entities = [{ id: 1, name: "Green Field Turf", location: "Bangalore", status: "pending" }]
  }

  if (updates.coachAdded && modules.coach.entities.length === 0) {
    modules.coach.entities = [{ id: 1, name: "John Smith", specialization: "Cricket", status: "pending" }]
  }

  // If academy is verified, update all entities to verified
  if (updates.academyVerified) {
    modules.academy.entities = modules.academy.entities.map((entity) => ({
      ...entity,
      status: "verified",
    }))
    modules.turf.entities = modules.turf.entities.map((entity) => ({
      ...entity,
      status: "verified",
    }))
    modules.coach.entities = modules.coach.entities.map((entity) => ({
      ...entity,
      status: "verified",
    }))
  }

  localStorage.setItem("supplierModules", JSON.stringify(modules))
  return newState
}

// Check if user needs to complete profile
export const needsProfileCompletion = (): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return !state.profileCompleted
}

// Check if user needs to add any entity
export const needsEntityCreation = (): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return state.profileCompleted && !state.anyEntityAdded
}

// Check if any entity is pending verification
export const isEntityPendingVerification = (): boolean => {
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return state.anyEntityAdded && !state.academyVerified
}

// Get supplier modules
export const getSupplierModules = () => {
  if (!isBrowser) {
    return {
      academy: { enabled: false, entities: [] },
      turf: { enabled: false, entities: [] },
      coach: { enabled: false, entities: [] },
    }
  }

  const modules = localStorage.getItem("supplierModules")
  if (!modules) {
    return {
      academy: { enabled: false, entities: [] },
      turf: { enabled: false, entities: [] },
      coach: { enabled: false, entities: [] },
    }
  }
  return JSON.parse(modules)
}

// Mark profile as completed
export const markProfileCompleted = () => {
  updateOnboardingState({ profileCompleted: true })
}

// Mark academy as added
export const markAcademyAdded = () => {
  updateOnboardingState({ academyAdded: true })
}

// Mark turf as added
export const markTurfAdded = () => {
  updateOnboardingState({ turfAdded: true })
}

// Mark coach as added
export const markCoachAdded = () => {
  updateOnboardingState({ coachAdded: true })
}

// Mark academy as verified (this will verify all entities)
export const markAcademyVerified = () => {
  updateOnboardingState({ academyVerified: true })
}

export const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const response = await fetch("https://api-primary.futuresportler.com/api/users/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to sign in")
    }

    const data = await response.json()

    // Save authentication tokens
    if (data.tokens) {
      // @ts-ignore
      saveAuthTokens(data.tokens.accessToken, data.tokens.refreshToken)
    }

    return data
  } catch (error) {
    console.error("Sign in error:", error)
    throw error
  }
}

// Function to sign up with email and password
export const signUpWithEmailPassword = async (userData: {
  email: string
  password: string
  first_name: string
  last_name: string
  profile_picture?: string
  latitude?: number
  longitude?: number
}) => {
  try {
    const response = await fetch("https://api-primary.futuresportler.com/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to sign up")
    }

    const data = await response.json()

    // Save authentication tokens
    if (data.tokens) {
      // @ts-ignore
      saveAuthTokens(data.tokens.accessToken, data.tokens.refreshToken)
    }

    return data
  } catch (error) {
    console.error("Sign up error:", error)
    throw error
  }
}

// Function to get user's current location
export const getUserLocation = (): Promise<{ latitude: number; longitude: number }> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        reject(error)
      },
    )
  })
}
