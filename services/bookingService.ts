"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = "https://api-primary.futuresportler.com"

export interface BookingDetails {
  [key: string]: any
}

export interface Booking {
  bookingId: string
  userId: string
  supplierType: string
  supplierId: string
  status: string
  date: string
  details: BookingDetails
}

export interface UserBookingsResponse {
  bookings: Booking[]
  total: number
}

export interface BookingFilters {
  supplier?: string
  status?: string
  limit?: number
  offset?: number
}

/**
 * Gets user bookings
 */
export async function getUserBookings(
  userId: string,
  filters?: BookingFilters,
): Promise<{
  success: boolean
  data?: UserBookingsResponse
  error?: string
}> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, error: "Not authenticated" }
    }

    const url = new URL(`${API_BASE_URL}/api/bookings/user/${userId}`)

    if (filters?.supplier) {
      url.searchParams.append("supplier", filters.supplier)
    }
    if (filters?.status) {
      url.searchParams.append("status", filters.status)
    }
    if (filters?.limit) {
      url.searchParams.append("limit", filters.limit.toString())
    }
    if (filters?.offset) {
      url.searchParams.append("offset", filters.offset.toString())
    }

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const data: UserBookingsResponse = await response.json()

    if (!response.ok) {
      return {
        success: false,
        error: `Failed to fetch user bookings: ${response.status}`,
      }
    }

    return {
      success: true,
      data: data,
    }
  } catch (error) {
    console.error("Error fetching user bookings:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
