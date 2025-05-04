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
    const response = await fetch("https://api-primary.futuresportler.com//api/suppliers/signup", {
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
    const response = await fetch("https://api-primary.futuresportler.com//api/auth/refresh", {
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
      academyVerified: false,
    }
    localStorage.setItem("supplierOnboardingState", JSON.stringify(onboardingState))
  }
}

// Update the getOnboardingState function
export const getOnboardingState = (): SupplierOnboardingState => {
  if (!isBrowser) {
    return {
      profileCompleted: false,
      academyAdded: false,
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
      academyVerified: false,
    }
  }
  return JSON.parse(state)
}

// Update the updateOnboardingState function to ensure it correctly handles academy/turf additions
export const updateOnboardingState = (updates: Partial<SupplierOnboardingState>) => {
  if (!isBrowser) {
    return {
      profileCompleted: false,
      academyAdded: false,
      academyVerified: false,
      ...updates,
    }
  }

  const currentState = getOnboardingState()
  const newState = { ...currentState, ...updates }
  localStorage.setItem("supplierOnboardingState", JSON.stringify(newState))

  // Also update supplierModules based on new state
  if (updates.academyAdded || updates.academyVerified) {
    const storedModules = localStorage.getItem("supplierModules")
    const modules = storedModules
      ? JSON.parse(storedModules)
      : {
          academy: {
            enabled: true,
            entities: [],
          },
          turf: {
            enabled: false,
            entities: [],
          },
          coach: {
            enabled: false,
            entities: [],
          },
        }

    // If academy is added, ensure academy module is enabled
    if (updates.academyAdded) {
      modules.academy.enabled = true

      // If no entities yet, add a pending entity
      if (modules.academy.entities.length === 0) {
        modules.academy.entities = [{ id: 1, name: "Premier Cricket Academy", location: "Mumbai", status: "pending" }]
      }
    }

    // If academy is verified, enable turf and coach modules
    if (updates.academyVerified) {
      modules.turf.enabled = true
      modules.coach.enabled = true

      // Add sample entities for verified academy
      if (modules.academy.entities.length === 0) {
        modules.academy.entities = [
          { id: 1, name: "Premier Cricket Academy", location: "Mumbai" },
          { id: 2, name: "Elite Tennis School", location: "Delhi" },
        ]
      } else {
        // Update status of existing entities
        modules.academy.entities = modules.academy.entities.map((entity) => ({
          ...entity,
          status: "verified",
        }))
      }

      if (modules.turf.entities.length === 0) {
        modules.turf.entities = [{ id: 1, name: "Green Field Turf", location: "Bangalore" }]
      }
    }

    localStorage.setItem("supplierModules", JSON.stringify(modules))
  }

  return newState
}

// Check if user needs to complete profile
export const needsProfileCompletion = (): boolean => {
  // If not authenticated, no need to complete profile yet
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return !state.profileCompleted
}

// Check if user needs to add academy
export const needsAcademyCreation = (): boolean => {
  // If not authenticated, no need to create academy yet
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return state.profileCompleted && !state.academyAdded
}

// Check if academy is pending verification
export const isAcademyPendingVerification = (): boolean => {
  // If not authenticated, academy is not pending verification
  if (!isAuthenticated()) {
    return false
  }

  const state = getOnboardingState()
  return state.academyAdded && !state.academyVerified
}
