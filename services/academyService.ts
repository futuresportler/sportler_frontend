"use server"

import { getAccessToken } from "@/services/authService"

export async function checkAcademyVerificationStatus(): Promise<{
  hasAcademy: boolean
  isVerified: boolean
  verificationMessage?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { hasAcademy: false, isVerified: false }
    }

    // Replace with your actual API endpoint
    const response = await fetch("https://api-primary.futuresportler.com//api/academies/verification-status", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch academy verification status")
    }

    const data = await response.json()

    return {
      hasAcademy: data.hasAcademy || false,
      isVerified: data.isVerified || false,
      verificationMessage: data.verificationMessage,
    }
  } catch (error) {
    console.error("Error checking academy verification status:", error)
    return { hasAcademy: false, isVerified: false }
  }
}

/**
 * Creates a new batch for an academy
 * @param batchData The batch data to create
 * @returns Success status and message or error
 */
export async function createBatch(batchData: {
  name: string
  academyId: string
  sport: string
  level?: string
  schedule?: string
  coach?: string
  capacity?: number
  fee?: string
  paymentType?: string
  ageGroup?: string
}): Promise<{ success: boolean; message?: string; error?: string }> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch("https://api-primary.futuresportler.com/api/academy/batches", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(batchData),
    })

    const data = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: data.message || `Failed to create batch: ${response.status}`,
      }
    }

    return {
      success: true,
      message: "Batch created successfully",
    }
  } catch (error) {
    console.error("Error creating batch:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Gets all batches for an academy
 * @param academyId The academy ID
 * @returns List of batches or error
 */
export async function getAcademyBatches(academyId: string): Promise<{
  success: boolean
  batches?: any[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`https://api-primary.futuresportler.com/api/academy/${academyId}/batches`, {
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
        error: data.message || `Failed to fetch batches: ${response.status}`,
      }
    }

    return {
      success: true,
      batches: data,
    }
  } catch (error) {
    console.error("Error fetching batches:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
