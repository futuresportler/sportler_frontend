"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com"

export interface CoachScheduleResponse {
  coach: {
    id: string
    name: string
  }
  schedule: {
    personal: {
      monday?: string[]
      tuesday?: string[]
      wednesday?: string[]
      thursday?: string[]
      friday?: string[]
      saturday?: string[]
      sunday?: string[]
    }
    batches: Array<{
      batchId: string
      name: string
      schedule: {
        monday?: string[]
        tuesday?: string[]
        wednesday?: string[]
        thursday?: string[]
        friday?: string[]
        saturday?: string[]
        sunday?: string[]
      }
    }>
    programs: Array<{
      programId: string
      name: string
      schedule: {
        monday?: string[]
        tuesday?: string[]
        wednesday?: string[]
        thursday?: string[]
        friday?: string[]
        saturday?: string[]
        sunday?: string[]
      }
    }>
  }
}

/**
 * Gets coach schedule
 */
export async function getCoachSchedule(coachId: string): Promise<{
  success: boolean
  data?: CoachScheduleResponse
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academies/coaches/${coachId}/schedule`, {
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
        error: data.message || `Failed to fetch coach schedule: ${response.status}`,
      }
    }

    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("Error fetching coach schedule:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
