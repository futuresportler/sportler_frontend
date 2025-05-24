import type { SupplierProfile, SupplierApiData, Academy } from "@/types/supplier"

/**
 * Service for supplier-related API calls
 */

// TESTING ONLY: Configuration for hardcoded tokens
// WARNING: This should NEVER be enabled in production
const USE_HARDCODED_TOKEN_FOR_TESTING = false
const TEST_ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdXBwbGllcklkIjoiMjFmODk3NzQtZmQzZS00N2JjLWE1MDUtZGNkYjIyYzEyYjkwIiwibW9iaWxlX251bWJlciI6Iis5MTc4NDI5MDAxNTUiLCJpYXQiOjE3NDU2ODYwMTMsImV4cCI6MTc0NTY4OTYxM30.A48-b9Tf1lANhQOTmZZyI-Sxt3TFL5LH26Q-O7WaRjE"
// Base API URL
const API_BASE_URL = "https://api-primary.futuresportler.com/api"

// Helper function to get the appropriate token based on configuration
const getToken = (): string | null => {
  if (USE_HARDCODED_TOKEN_FOR_TESTING) {
    console.warn("Using hardcoded token for testing. DO NOT USE IN PRODUCTION!")
    return TEST_ACCESS_TOKEN
  }

  // Check if we're in a browser environment
  const isBrowser = typeof window !== "undefined"
  return isBrowser ? localStorage.getItem("accessToken") : null
}

// Convert API data to UI form data
const mapApiDataToFormData = (apiData: SupplierApiData): SupplierProfile => {
  return {
    id: apiData.supplierId,
    name: "", // Not in API data
    email: apiData.email || "",
    phone: apiData.mobile_number || "",
    governmentId: "", // Not in API data
    governmentIdType: "aadhar", // Default value
    address: "", // Not in API data
    city: "", // Not in API data
    state: "", // Not in API data
    pincode: "", // Not in API data
    businessName: "", // Not in API data
    gstNumber: apiData.gstNumber || "",
    bankAccountName: apiData.accountHolderName || "",
    bankAccountNumber: apiData.bankAccountNumber || "",
    ifscCode: apiData.ifscCode || "",
    upiId: apiData.upiId || "",
    bio: "", // Not in API data
    profileCompleted: apiData.isVerified || false,
  }
}

// Update the getSupplierProfile function to handle the new response format
export const getSupplierProfile = async (): Promise<{
  success: boolean
  message: string
  data?: any
}> => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    const response = await fetch(`${API_BASE_URL}/suppliers/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch supplier profile")
    }

    const result = await response.json()

    // Return the entire response as is, since it already has the structure we need
    return result
  } catch (error) {
    console.error("Error fetching supplier profile:", error)
    return { success: false, message: "Failed to fetch supplier data" }
  }
}

// Get the supplier's academies
export const getSupplierAcademies = async (): Promise<Academy[]> => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    const response = await fetch(`${API_BASE_URL}/suppliers/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch supplier academies")
    }

    const result = await response.json()

    // Extract academies from the response
    if (result.success && result.data && Array.isArray(result.data.academyProfiles)) {
      return result.data.academyProfiles
    }

    return []
  } catch (error) {
    console.error("Error fetching supplier academies:", error)
    return []
  }
}

// Update the updateSupplierProfile function to match the API expectations
export const updateSupplierProfile = async (formData: FormData): Promise<{ success: boolean; message: string }> => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    // Create a new FormData with the correct API field names
    const apiFormData = new FormData()

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === "module" && Array.isArray(value)) {
          // Handle array fields
          apiFormData.append(key, JSON.stringify(value))
        } else {
          apiFormData.append(key, value.toString())
        }
      }
    })

    // Add profile image if it exists
    if (formData.get("profilePicture") instanceof File) {
      apiFormData.append("profilePicture", formData.get("profilePicture") as File)
    }

    // Updated to use the correct endpoint
    const response = await fetch(`${API_BASE_URL}/suppliers/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: apiFormData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to update profile")
    }

    return { success: true, message: "Profile updated successfully" }
  } catch (error: any) {
    console.error("Error updating supplier profile:", error)
    return { success: false, message: error.message || "Failed to update profile" }
  }
}

// Update the createAcademy function to match the database schema
export const createAcademy = async (
  academyData: FormData,
): Promise<{ success: boolean; message: string; academyId?: string }> => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    // Get sports from form data
    const sportsObj = JSON.parse((academyData.get("sports") as string) || "{}")
    const sports = Object.entries(sportsObj)
      .filter(([sport, enabled]) => enabled && sport !== "other")
      .map(([sport]) => sport.charAt(0).toUpperCase() + sport.slice(1))

    // Add other sports if specified
    if (sportsObj.other && academyData.get("otherSports")) {
      const otherSports = (academyData.get("otherSports") as string).split(",").map((s) => s.trim())
      sports.push(...otherSports)
    }

    // Get age groups from form data
    const ageGroupsObj = JSON.parse((academyData.get("ageGroups") as string) || "{}")

    // Get class types from form data
    const classTypesObj = JSON.parse((academyData.get("classTypes") as string) || "{}")

    // Map class types to match schema
    const mappedClassTypes = {
      "one-on-one": classTypesObj.oneOnOne || false,
      "group-classes": classTypesObj.group || false,
    }

    // Get champions/achievements
    const championsData = academyData.get("champions") ? JSON.parse(academyData.get("champions") as string) : []

    const achievements = championsData.map((c: any) => `${c.name} - ${c.achievement} (${c.year})`)

    // Create a mock location point (this should be replaced with actual geolocation)
    // Mumbai coordinates as default
    const location = {
      type: "Point",
      coordinates: [72.8777, 19.076],
      crs: {
        type: "name",
        properties: {
          name: "EPSG:4326",
        },
      },
    }

    // Process batches to ensure valid time formats
    const batches = JSON.parse((academyData.get("batches") as string) || "[]").map((batch: any) => {
      // Ensure all numeric fields have default values
      const capacity = batch.capacity && batch.capacity.trim() !== "" ? Number.parseInt(batch.capacity, 10) : 10

      const fee = batch.fee && batch.fee.trim() !== "" ? Number.parseInt(batch.fee, 10) : 0

      return {
        batch_name: batch.name || "Unnamed Batch",
        age_group: batch.ageGroup || "all",
        monthly_fee: fee,
        // Use a descriptive string instead of a time format
        timing: batch.timing && batch.timing.trim() !== "" ? batch.timing : "Schedule to be announced",
        capacity: capacity,
      }
    })

    // Create the structured data object according to the database schema
    const academyProfileData = {
      name: academyData.get("name") || "New Academy",
      description: academyData.get("description") || "Academy description",
      foundedYear: Number.parseInt(academyData.get("yearEstablished") as string, 10) || new Date().getFullYear(),
      sports,
      facilities: [], // This would need to be populated from form data
      achievements,
      ageGroups: ageGroupsObj,
      classTypes: mappedClassTypes,
      location,
      city: academyData.get("location") || "Mumbai",
      address: academyData.get("address") || "Address not provided",
      phone: academyData.get("phone") || "+919999999999",
      email: academyData.get("email") || "academy@example.com",
      website: academyData.get("website") || null,
      socialMediaLinks: JSON.parse((academyData.get("socialMedia") as string) || "{}"),
      photos: [], // This would need to be populated from uploaded images
      videos: [], // This would need to be populated from uploaded videos
      isVerified: false,
    }

    // Additional data for the module API
    const formDataObj = {
      module: "academy",
      profileData: {
        basic_info: {
          academy_name: academyData.get("name") || "New Academy",
          city: academyData.get("location") || "Mumbai",
          full_address: academyData.get("address") || "Address not provided",
          contact_email: academyData.get("email") || "academy@example.com",
          social_media_links: JSON.parse((academyData.get("socialMedia") as string) || "{}"),
          academy_description: academyData.get("description") || "Academy description",
          year_of_establishment:
            Number.parseInt(academyData.get("yearEstablished") as string, 10) || new Date().getFullYear(),
          contact_phone: academyData.get("phone") || "+919999999999",
          website: academyData.get("website") || "",
        },
        sports_details: {
          sports_available: sports.length > 0 ? sports : ["Cricket"],
          champions_achievements: achievements,
          facilities: [],
          age_groups: Object.entries(ageGroupsObj)
            .filter(([group, enabled]) => enabled)
            .map(([group]) => {
              if (group === "infant") return "0-6 years (Infants)"
              if (group === "children") return "6-12 years (Children)"
              if (group === "teens") return "12-22 years (Teens/Young Adults)"
              return group
            }),
          class_types: Object.entries(classTypesObj)
            .filter(([type, enabled]) => enabled)
            .map(([type]) => {
              if (type === "oneOnOne") return "One-on-One Training"
              if (type === "group") return "Group Classes"
              return type
            }),
          academy_photos: [],
          academy_video: {
            url: "",
            geolocation: "19.0760° N, 72.8777° E", // Default Mumbai coordinates
          },
        },
        coaches: JSON.parse((academyData.get("coaches") as string) || "[]").map((coach: any) => ({
          coach_name: coach.name || "Unnamed Coach",
          years_of_experience: Number.parseInt(coach.experience, 10) || 0,
          specialization: coach.specialization || "General",
          certifications: coach.certification ? [coach.certification] : [],
        })),
        batches: batches,
        manager_info: {
          owner: {
            name: JSON.parse((academyData.get("owner") as string) || "{}").name || "Owner Name",
            phone: JSON.parse((academyData.get("owner") as string) || "{}").phone || "+919999999999",
            email: JSON.parse((academyData.get("owner") as string) || "{}").email || "owner@example.com",
            id_type:
              JSON.parse((academyData.get("owner") as string) || "{}").idType === "aadhar"
                ? "Aadhar Card"
                : JSON.parse((academyData.get("owner") as string) || "{}").idType === "pan"
                  ? "PAN Card"
                  : JSON.parse((academyData.get("owner") as string) || "{}").idType === "voter"
                    ? "Voter ID"
                    : JSON.parse((academyData.get("owner") as string) || "{}").idType === "driving"
                      ? "Driving License"
                      : "Passport",
            id_number: JSON.parse((academyData.get("owner") as string) || "{}").idNumber || "123456789012",
          },
          manager: {
            name: JSON.parse((academyData.get("manager") as string) || "{}").name || "Manager Name",
            phone: JSON.parse((academyData.get("manager") as string) || "{}").phone || "+919999999999",
            email: JSON.parse((academyData.get("manager") as string) || "{}").email || "manager@example.com",
            id_type:
              JSON.parse((academyData.get("manager") as string) || "{}").idType === "aadhar"
                ? "Aadhar Card"
                : JSON.parse((academyData.get("manager") as string) || "{}").idType === "pan"
                  ? "PAN Card"
                  : JSON.parse((academyData.get("manager") as string) || "{}").idType === "voter"
                    ? "Voter ID"
                    : JSON.parse((academyData.get("manager") as string) || "{}").idType === "driving"
                      ? "Driving License"
                      : "Passport",
            id_number: JSON.parse((academyData.get("manager") as string) || "{}").idNumber || "123456789012",
          },
          owner_is_manager: academyData.get("isOwnerManager") === "true",
        },
        payment_info: {
          gst_number: academyData.get("gstNumber") || "",
          payment_details: {
            bank_account_number:
              JSON.parse((academyData.get("paymentDetails") as string) || "{}").accountNumber || "12345678901234",
            account_holder_name:
              JSON.parse((academyData.get("paymentDetails") as string) || "{}").accountName || "Account Holder",
            ifsc_code: JSON.parse((academyData.get("paymentDetails") as string) || "{}").ifscCode || "SBIN0000123",
            upi_id: JSON.parse((academyData.get("paymentDetails") as string) || "{}").upiId || "user@upi",
          },
        },
      },
      // Include the properly formatted academy profile data
      academyProfile: academyProfileData,
    }

    console.log("Sending academy data to API:", JSON.stringify(formDataObj, null, 2))

    // Send the request to the module endpoint
    const response = await fetch(`${API_BASE_URL}/suppliers/module?module=academy`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API Response:", responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch (e) {
        errorData = { message: responseText || "Unknown error" }
      }

      console.error("API Error Response:", errorData)
      throw new Error(
        typeof errorData.message === "object"
          ? JSON.stringify(errorData.message)
          : errorData.message || "Failed to create academy",
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Error parsing response JSON:", e)
      data = { success: true }
    }

    return {
      success: true,
      message: "Academy created successfully",
      academyId: data.academyId || data.data?.academyId,
    }
  } catch (error: any) {
    console.error("Error creating academy:", error)
    return { success: false, message: error.message || "Failed to create academy" }
  }
}

// Add this new function after the createAcademy function

// Create a new turf
export const createTurf = async (turfData: any): Promise<{ success: boolean; message: string; turfId?: string }> => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    // Prepare the request payload
    const formDataObj = {
      module: "turf",
      profileData: turfData,
    }

    console.log("Sending turf data to API:", JSON.stringify(formDataObj, null, 2))

    // Send the request to the module endpoint
    const response = await fetch(`${API_BASE_URL}/suppliers/module?module=turf`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataObj),
    })

    // Log the raw response for debugging
    const responseText = await response.text()
    console.log("Raw API Response:", responseText)

    if (!response.ok) {
      let errorData
      try {
        errorData = JSON.parse(responseText)
      } catch (e) {
        errorData = { message: responseText || "Unknown error" }
      }

      console.error("API Error Response:", errorData)
      throw new Error(
        typeof errorData.message === "object"
          ? JSON.stringify(errorData.message)
          : errorData.message || "Failed to create turf",
      )
    }

    let data
    try {
      data = JSON.parse(responseText)
    } catch (e) {
      console.error("Error parsing response JSON:", e)
      data = { success: true }
    }

    return {
      success: true,
      message: "Turf created successfully",
      turfId: data.turfId || data.data?.turfId,
    }
  } catch (error: any) {
    console.error("Error creating turf:", error)
    return { success: false, message: error.message || "Failed to create turf" }
  }
}

// Get the supplier's turfs
export const getSupplierTurfs = async () => {
  try {
    const accessToken = getToken()
    if (!accessToken) {
      throw new Error("No access token found")
    }

    const response = await fetch(`${API_BASE_URL}/suppliers/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch supplier turfs")
    }

    const result = await response.json()

    // Extract turfs from the response
    if (result.success && result.data && Array.isArray(result.data.turfProfiles)) {
      return result.data.turfProfiles
    }

    return []
  } catch (error) {
    console.error("Error fetching supplier turfs:", error)
    return []
  }
}

// Check academy verification status
export const checkAcademyVerificationStatus = async (): Promise<{
  hasAcademy: boolean
  isVerified: boolean
  verificationMessage?: string
}> => {
  try {
    const academies = await getSupplierAcademies()

    if (academies.length === 0) {
      return { hasAcademy: false, isVerified: false }
    }

    // Check if any academy is verified
    const hasVerifiedAcademy = academies.some((academy) => academy.isVerified)

    return {
      hasAcademy: true,
      isVerified: hasVerifiedAcademy,
      verificationMessage: hasVerifiedAcademy
        ? undefined
        : "Your academy is currently under review. We'll notify you once the verification is complete.",
    }
  } catch (error) {
    console.error("Error checking academy verification status:", error)
    return { hasAcademy: false, isVerified: false }
  }
}
