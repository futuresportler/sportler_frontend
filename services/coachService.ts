"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com"

export interface Coach {
  id: string
  academyId?: string
  name: string
  email: string
  mobileNumber: string
  bio: string
  hourlyRate: number
  experienceLevel: number
  sport: string
  isVerified?: boolean
}

export interface CoachListItem {
  id: string
  name: string
  sport: string
  isVerified: boolean
}

export interface CoachAssignments {
  batches: Array<{ id: string; name: string }>
  programs: Array<{ id: string; name: string }>
}

export interface CreateCoachData {
  name: string
  email: string
  mobileNumber: string
  bio: string
  hourlyRate: number
  experienceLevel: number
  sport: string
}

export interface UpdateCoachData {
  name?: string
  email?: string
  mobileNumber?: string
  bio?: string
  hourlyRate?: number
  experienceLevel?: number
  sport?: string
}

/**
 * Creates a new coach for an academy
 */
export async function createCoach(
  academyId: string,
  coachData: CreateCoachData,
): Promise<{
  success: boolean
  coach?: Coach
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/${academyId}/coaches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coachData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to create coach: ${response.status}`,
      }
    }

    return {
      success: true,
      coach: data,
    }
  } catch (error) {
    console.error("Error creating coach:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Gets all coaches for an academy
 */
export async function getAcademyCoaches(
  academyId: string,
  filters?: { sport?: string; isVerified?: boolean },
): Promise<{
  success: boolean
  coaches?: CoachListItem[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const url = new URL(`${API_BASE_URL}/academies/${academyId}/coaches`)
    if (filters?.sport) {
      url.searchParams.append("sport", filters.sport)
    }
    if (filters?.isVerified !== undefined) {
      url.searchParams.append("isVerified", filters.isVerified.toString())
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to fetch coaches: ${response.status}`,
      }
    }

    return {
      success: true,
      coaches: data,
    }
  } catch (error) {
    console.error("Error fetching coaches:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Gets a specific coach by ID
 */
export async function getCoachById(coachId: string): Promise<{
  success: boolean
  coach?: Coach
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to fetch coach: ${response.status}`,
      }
    }

    return {
      success: true,
      coach: data,
    }
  } catch (error) {
    console.error("Error fetching coach:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Updates a coach
 */
export async function updateCoach(
  coachId: string,
  updateData: UpdateCoachData,
): Promise<{
  success: boolean
  coach?: Coach
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to update coach: ${response.status}`,
      }
    }

    return {
      success: true,
      coach: data,
    }
  } catch (error) {
    console.error("Error updating coach:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Gets coach assignments (batches and programs)
 */
export async function getCoachAssignments(coachId: string): Promise<{
  success: boolean
  assignments?: CoachAssignments
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/assignments`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to fetch coach assignments: ${response.status}`,
      }
    }

    return {
      success: true,
      assignments: data,
    }
  } catch (error) {
    console.error("Error fetching coach assignments:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Deletes a coach from the academy
 */
export async function deleteCoach(coachId: string): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        error: data.message || `Failed to delete coach: ${response.status}`,
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error deleting coach:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Assigns a coach to a batch
 */
export async function assignCoachToBatch(
  coachId: string,
  batchId: string,
  isPrimary = false,
): Promise<{
  success: boolean
  assignment?: any
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/batches`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ batchId, isPrimary }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to assign coach to batch: ${response.status}`,
      }
    }

    return {
      success: true,
      assignment: data,
    }
  } catch (error) {
    console.error("Error assigning coach to batch:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Removes a coach from a batch
 */
export async function removeCoachFromBatch(
  coachId: string,
  batchId: string,
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/batches/${batchId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        error: data.message || `Failed to remove coach from batch: ${response.status}`,
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error removing coach from batch:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Assigns a coach to a program
 */
export async function assignCoachToProgram(
  coachId: string,
  programId: string,
  isPrimary = false,
): Promise<{
  success: boolean
  assignment?: any
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/programs`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ programId, isPrimary }),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to assign coach to program: ${response.status}`,
      }
    }

    return {
      success: true,
      assignment: data,
    }
  } catch (error) {
    console.error("Error assigning coach to program:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Removes a coach from a program
 */
export async function removeCoachFromProgram(
  coachId: string,
  programId: string,
): Promise<{
  success: boolean
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/programs/${programId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const data = await response.json()
      return {
        success: false,
        error: data.message || `Failed to remove coach from program: ${response.status}`,
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error removing coach from program:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Syncs all academy coaches with the platform
 */
export async function syncCoaches(academyId: string): Promise<{
  success: boolean
  synced?: number
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/${academyId}/coaches/sync`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to sync coaches: ${response.status}`,
      }
    }

    return {
      success: true,
      synced: data.synced,
    }
  } catch (error) {
    console.error("Error syncing coaches:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
