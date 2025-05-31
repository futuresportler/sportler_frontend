"use server"

import { getAccessToken } from "@/services/authService"
import type { MonthlyMetrics, HourlyBookings, DailyBookings, GroundMetrics } from "./analyticsService"

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

export interface TurfUtilization {
  month: string
  utilizationRate: number
}

export interface RevenueBySport {
  sport: string
  revenue: number
}

/**
 * Get monthly metrics for a turf
 */
export async function getTurfMonthlyMetrics(turfId: string): Promise<{
  success: boolean
  data?: MonthlyMetrics[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/monthly`, {
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
        error: result.message || `Failed to fetch turf monthly metrics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf monthly metrics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get utilization rate for a turf for a given month
 */
export async function getTurfUtilization(
  turfId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: TurfUtilization
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/${monthId}/utilization`, {
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
        error: result.message || `Failed to fetch turf utilization: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf utilization:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get revenue by sport for a turf for a given month
 */
export async function getTurfRevenueBySport(
  turfId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: RevenueBySport[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/${monthId}/revenue-by-sport`, {
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
        error: result.message || `Failed to fetch turf revenue by sport: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf revenue by sport:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get hourly bookings for a turf for a given month
 */
export async function getTurfHourlyBookings(
  turfId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: HourlyBookings[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/${monthId}/hourly-bookings`, {
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
        error: result.message || `Failed to fetch turf hourly bookings: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf hourly bookings:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get daily bookings for a turf for a given month
 */
export async function getTurfDailyBookings(
  turfId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: DailyBookings[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/${monthId}/daily-bookings`, {
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
        error: result.message || `Failed to fetch turf daily bookings: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf daily bookings:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get ground metrics for a turf for a given month
 */
export async function getTurfGroundMetrics(
  turfId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: GroundMetrics[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/turf/${turfId}/metrics/${monthId}/ground-metrics`, {
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
        error: result.message || `Failed to fetch turf ground metrics: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching turf ground metrics:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
