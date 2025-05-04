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
