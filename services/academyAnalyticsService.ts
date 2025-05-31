"use server"

import { getAccessToken } from "@/services/authService"
import type {
  CoachFeedback,
  BookingPlatformData,
  PopularProgram,
  MonthlyMetrics,
  ConversionRate,
} from "./analyticsService"

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

/**
 * Get feedback analytics for all coaches in an academy
 */
export async function getAcademyCoachFeedback(academyId: string): Promise<{
  success: boolean
  data?: { feedback: CoachFeedback[] }
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/${academyId}/coach-feedback`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch academy coach feedback: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching academy coach feedback:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get analytics on booking platforms used for an academy
 */
export async function getAcademyBookingPlatforms(
  academyId: string,
  period = 3,
): Promise<{
  success: boolean
  data?: BookingPlatformData[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/${academyId}/booking-platforms?period=${period}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch booking platforms data: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching academy booking platforms:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get most popular programs in an academy
 */
export async function getAcademyPopularPrograms(
  academyId: string,
  limit = 5,
): Promise<{
  success: boolean
  data?: PopularProgram[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/${academyId}/popular-programs?limit=${limit}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch popular programs: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching academy popular programs:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get monthly metrics for an academy
 */
export async function getAcademyMonthlyMetrics(academyId: string): Promise<{
  success: boolean
  data?: MonthlyMetrics[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/${academyId}/metrics/monthly`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch academy monthly metrics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching academy monthly metrics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get monthly metrics for a specific program
 */
export async function getProgramMonthlyMetrics(
  programId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: {
    month: string
    enrollments: number
    completionRate: number
  }
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/programs/${programId}/metrics/${monthId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch program monthly metrics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching program monthly metrics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get conversion rate for an academy for a given month
 */
export async function getAcademyConversionRate(
  academyId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: ConversionRate
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/academy/${academyId}/conversion-rate/${monthId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch academy conversion rate: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching academy conversion rate:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
