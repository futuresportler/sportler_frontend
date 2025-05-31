"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

// Types for analytics data
export interface SupplierAnalyticsOverview {
    totalRevenue: number
    totalBookings: number
    monthlyBreakdown: Array<{
        month: string
        revenue: number
        bookings: number
    }>
}

export interface PromotionAnalytics {
    totalPromotions: number
    activePromotions: number
    monthlyStats: Array<{
        month: string
        promotions: number
        spend: number
    }>
}

export interface FeedbackAnalytics {
    averageRating: number
    totalFeedback: number
    ratingDistribution: {
        "5": number
        "4": number
        "3": number
        "2": number
        "1": number
    }
    recentComments: Array<{
        user: string
        comment: string
        rating: number
        date?: string
    }>
}

export interface BookingPlatformData {
    platform: string
    bookings: number
}

export interface PopularProgram {
    programId: string
    name: string
    enrollments: number
}

export interface MonthlyMetrics {
    month: string
    enrollments?: number
    revenue?: number
    sessions?: number
    students?: number
    attendance?: number
    payments?: number
    bookings?: number
    utilizationRate?: number
}

export interface ConversionRate {
    month: string
    inquiries: number
    enrollments: number
    conversionRate: number
}

export interface CoachFeedback {
    coachId: string
    averageRating: number
    totalFeedback: number
}

export interface RevenueBySource {
    source: string
    revenue: number
}

export interface HourlyBookings {
    hour: string
    bookings: number
}

export interface DailyBookings {
    date: string
    bookings: number
}

export interface GroundMetrics {
    groundId: string
    bookings: number
    revenue: number
}

/**
 * Get analytics overview for the authenticated supplier
 */
export async function getSupplierAnalyticsOverview(period = 6): Promise<{
    success: boolean
    data?: SupplierAnalyticsOverview
    error?: string
}> {
    try {
        const accessToken = getAccessToken()
        if (!accessToken) {
            return { success: false, error: "Not authenticated" }
        }

        const response = await fetch(`${API_BASE_URL}/supplier/me/analytics/overview?period=${period}`, {
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
                error: result.message || `Failed to fetch supplier analytics: ${response.status}`,
            }
        }

        return {
            success: true,
            data: result.data,
        }
    } catch (error) {
        console.error("Error fetching supplier analytics overview:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}

/**
 * Get promotion analytics for the authenticated supplier
 */
export async function getPromotionAnalytics(period = 6): Promise<{
    success: boolean
    data?: PromotionAnalytics
    error?: string
}> {
    try {
        const accessToken = getAccessToken()
        if (!accessToken) {
            return { success: false, error: "Not authenticated" }
        }

        const response = await fetch(`${API_BASE_URL}/promotion/analytics/overview?period=${period}`, {
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
                error: result.message || `Failed to fetch promotion analytics: ${response.status}`,
            }
        }

        return {
            success: true,
            data: result.data,
        }
    } catch (error) {
        console.error("Error fetching promotion analytics:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}

/**
 * Get feedback analytics for a specific entity
 */
export async function getFeedbackAnalytics(
    entityType: string,
    entityId: string,
): Promise<{
    success: boolean
    data?: FeedbackAnalytics
    error?: string
}> {
    try {
        const accessToken = getAccessToken()
        if (!accessToken) {
            return { success: false, error: "Not authenticated" }
        }

        const response = await fetch(`${API_BASE_URL}/feedback/analytics/${entityType}/${entityId}`, {
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
                error: result.message || `Failed to fetch feedback analytics: ${response.status}`,
            }
        }

        return {
            success: true,
            data: result.data,
        }
    } catch (error) {
        console.error("Error fetching feedback analytics:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}

/**
 * Get recent feedback for a specific entity
 */
export async function getRecentFeedback(
    entityType: string,
    entityId: string,
    limit = 5,
): Promise<{
    success: boolean
    data?: Array<{
        user: string
        comment: string
        rating: number
        date: string
    }>
    error?: string
}> {
    try {
        const accessToken = getAccessToken()
        if (!accessToken) {
            return { success: false, error: "Not authenticated" }
        }

        const response = await fetch(`${API_BASE_URL}/feedback/recent/${entityType}/${entityId}?limit=${limit}`, {
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
 * Refresh analytics for a specific entity and month
 */
export async function refreshAnalytics(
    entityType: "coach" | "turf",
    entityId: string,
    monthId: string,
): Promise<{
    success: boolean
    data?: { month: string; status: string }
    error?: string
}> {
    try {
        const accessToken = getAccessToken()
        if (!accessToken) {
            return { success: false, error: "Not authenticated" }
        }

        const endpoint =
            entityType === "coach"
                ? `${API_BASE_URL}/coach/${entityId}/analytics/${monthId}/refresh`
                : `${API_BASE_URL}/turf/${entityId}/metrics/${monthId}/refresh`

        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        })

        const result = await response.json()

        if (!response.ok) {
            return {
                success: false,
                error: result.message || `Failed to refresh analytics: ${response.status}`,
            }
        }

        return {
            success: true,
            data: result.data,
        }
    } catch (error) {
        console.error("Error refreshing analytics:", error)
        return {
            success: false,
            error: error instanceof Error ? error.message : "An unknown error occurred",
        }
    }
}
