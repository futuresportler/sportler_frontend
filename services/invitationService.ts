"use server"

import { getAccessToken } from "@/services/authService"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api-primary.futuresportler.com"

// Types for invitation system
export interface InviteManagerRequest {
  phoneNumber: string
  email: string
  name: string
}

export interface InviteCoachRequest {
  phoneNumber: string
  email: string
  name: string
  bio: string
  specialization: string[]
  role: "coach"
  experienceLevel: "beginner" | "intermediate" | "advanced" | "expert"
  certifications: string[]
}

export interface Invitation {
  invitationId: string
  academyId: string
  inviterSupplierId: string
  inviteeSupplierId: string
  inviteePhoneNumber: string
  inviteeEmail: string
  role: "manager" | "coach"
  invitationToken: string
  expiresAt: string
  metadata: {
    inviteeName: string
    bio?: string
    specialization?: string[]
    experienceLevel?: string
    certifications?: string[]
  }
  status: "pending" | "accepted" | "rejected" | "expired"
  createdAt: string
  acceptedAt?: string
  rejectedAt?: string
}

export interface InvitationWithAcademy extends Invitation {
  academy: {
    academyId: string
    name: string
    description: string
    photos: string[]
    sports: string[]
  }
}

export interface ManagingAcademy {
  academyId: string
  name: string
  description: string
  photos: string[]
  sports: string[]
  managerAcceptedAt: string
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
  error?: any
}

/**
 * Invite a manager to an academy
 */
export async function inviteManagerToAcademy(
  academyId: string,
  inviteData: InviteManagerRequest,
): Promise<ApiResponse<Invitation>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/academy/${academyId}/invite-manager`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inviteData),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `Failed to invite manager: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error inviting manager:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Invite a coach to an academy
 */
export async function inviteCoachToAcademy(
  academyId: string,
  inviteData: InviteCoachRequest,
): Promise<ApiResponse<Invitation>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/academy/${academyId}/invite-coach`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inviteData),
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `Failed to invite coach: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error inviting coach:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Accept an invitation
 */
export async function acceptInvitation(invitationToken: string): Promise<ApiResponse<Invitation>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/accept/${invitationToken}`, {
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
        message: result.message || `Failed to accept invitation: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error accepting invitation:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Reject an invitation
 */
export async function rejectInvitation(invitationToken: string): Promise<ApiResponse<Invitation>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/reject/${invitationToken}`, {
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
        message: result.message || `Failed to reject invitation: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error rejecting invitation:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get supplier invitations with optional status filter
 */
export async function getSupplierInvitations(
  status?: "pending" | "accepted" | "rejected",
): Promise<ApiResponse<InvitationWithAcademy[]>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const url = new URL(`${API_BASE_URL}/invitation/supplier/invitations`)
    if (status) {
      url.searchParams.append("status", status)
    }

    const response = await fetch(url.toString(), {
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
        message: result.message || `Failed to fetch invitations: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching invitations:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get academies where the supplier is a manager
 */
export async function getManagingAcademies(): Promise<ApiResponse<ManagingAcademy[]>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/supplier/managing-academies`, {
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
        message: result.message || `Failed to fetch managing academies: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error fetching managing academies:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Get pending invitations count for notifications
 */
export async function getPendingInvitationsCount(): Promise<ApiResponse<{ count: number }>> {
  try {
    const result = await getSupplierInvitations("pending")
    if (result.success && result.data) {
      return {
        success: true,
        message: "Pending invitations count fetched",
        data: { count: result.data.length },
      }
    }
    return result as ApiResponse<{ count: number }>
  } catch (error) {
    console.error("Error fetching pending invitations count:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Resend invitation (if needed)
 */
export async function resendInvitation(invitationId: string): Promise<ApiResponse<Invitation>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}/resend`, {
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
        message: result.message || `Failed to resend invitation: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
      data: result.data,
    }
  } catch (error) {
    console.error("Error resending invitation:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}

/**
 * Cancel invitation (if needed)
 */
export async function cancelInvitation(invitationId: string): Promise<ApiResponse<void>> {
  try {
    const accessToken = getAccessToken()
    if (!accessToken) {
      return { success: false, message: "Not authenticated" }
    }

    const response = await fetch(`${API_BASE_URL}/invitation/${invitationId}/cancel`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    const result = await response.json()

    if (!response.ok) {
      return {
        success: false,
        message: result.message || `Failed to cancel invitation: ${response.status}`,
        error: result.error,
      }
    }

    return {
      success: true,
      message: result.message,
    }
  } catch (error) {
    console.error("Error canceling invitation:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "An unknown error occurred",
    }
  }
}
