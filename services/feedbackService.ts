"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com"

export interface FeedbackItem {
  user: string
  comment: string
  rating: number
  date: string
}

export interface RecentFeedbackResponse {
  message: string
  data: FeedbackItem[]
}

export interface CoachFeedbackSummary {
  coachId: string
  averageRating: number
  totalReviews: number
}

export interface AcademyCoachFeedbackResponse {
  success: boolean
  message: string
  data: CoachFeedbackSummary[]
}

/**
 * Gets recent feedback for an entity
 */
export async function getRecentFeedback(
  entityType: string,
  entityId: string,
): Promise<{
  success: boolean
  data?: FeedbackItem[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/api/feedback/recent/${entityType}/${entityId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result: RecentFeedbackResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to fetch recent feedback: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching recent feedback:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Gets academy coach feedback summary
 */
export async function getAcademyCoachFeedback(academyId: string): Promise<{
  success: boolean
  data?: CoachFeedbackSummary[]
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/api/feedback/academy/${academyId}/coaches`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result: AcademyCoachFeedbackResponse = await response.json()

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
