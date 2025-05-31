"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

/**
 * Manually trigger metrics update for an academy and month (admin only)
 */
export async function triggerMetricsUpdate(
  academyId: string,
  monthId: string,
): Promise<{
  success: boolean
  data?: {
    processed: number
    status: string
  }
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/admin/trigger-metrics-update`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        academyId,
        monthId,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: result.message || `Failed to trigger metrics update: ${response.status}`,
      }
    }

    return {
      success: true,
      data: result.data,
    }
  } catch (error) {
    console.error("Error triggering metrics update:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
