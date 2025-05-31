"use server"

import { getAccessToken } from "@/services/authService"
import type { MonthlyMetrics } from "./analyticsService"

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

export interface CoachMonthlyAnalytics extends MonthlyMetrics {
  feedback?: {
    averageRating: number
    totalFeedback: number
  }
}

export interface BatchMonthlyAnalytics extends MonthlyMetrics {
  feedback?: {
    averageRating: number
    totalFeedback: number
  }
}

/**
 * Get monthly analytics for a coach
 */
export async function getCoachMonthlyAnalytics(coachId: string): Promise<{
  success: boolean
  data?: MonthlyMetrics[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/coach/${coachId}/analytics/monthly`, {
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
        error: result.message || `Failed to fetch coach monthly analytics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching coach monthly analytics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get monthly analytics for a coach's batch
 */
export async function getBatchMonthlyAnalytics(batchId: string): Promise<{
  success: boolean
  data?: MonthlyMetrics[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/coach/batches/${batchId}/analytics/monthly`, {
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
        error: result.message || `Failed to fetch batch monthly analytics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching batch monthly analytics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get detailed monthly analytics for a coach
 */
export async function getCoachDetailedMonthlyAnalytics(
  coachId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: CoachMonthlyAnalytics
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/coach/${coachId}/analytics/${monthId}`, {
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
        error: result.message || `Failed to fetch coach detailed monthly analytics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching coach detailed monthly analytics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get detailed monthly analytics for a batch
 */
export async function getBatchDetailedMonthlyAnalytics(
  batchId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: BatchMonthlyAnalytics
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/coach/batches/${batchId}/analytics/${monthId}`, {
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
        error: result.message || `Failed to fetch batch detailed monthly analytics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching batch detailed monthly analytics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
