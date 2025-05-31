import axios from "axios"

// Create an axios instance with default config
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://api-primary.futuresportler.com",
  headers: {
    "Content-Type": "application/json",
  },
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle token expiration
    if (error.response && error.response.status === 401) {
      // Check if we're in a browser environment
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        // Redirect to login page
        window.location.href = "/auth/signin"
      }
    }
    return Promise.reject(error)
  },
)

// API Response Types
interface ApiAcademy {
  id: number
  name: string
  description?: string
  location?: string
  city?: string
  sports?: string[]
  rating?: number
  hourlyRate?: number
  image?: string
  amenities?: string[]
  certificationLevel?: string
  sessionTypes?: string[]
  languages?: string[]
}

interface ApiCoach {
  id: number
  name: string
  description?: string
  location?: string
  city?: string
  sport?: string
  rating?: number
  hourlyRate?: number
  image?: string
  certificationLevel?: string
  sessionTypes?: string[]
  languages?: string[]
  trainedProfessionals?: boolean
}

interface ApiTurf {
  id: number
  name: string
  description?: string
  location?: string
  city?: string
  sport?: string
  rating?: number
  price?: number
  image?: string
  amenities?: string[]
  isIndoor?: boolean
  surface?: string
  type?: string
}

// Fetch functions
export async function fetchAcademiesByCity(city: string): Promise<ApiAcademy[]> {
  try {
    const response = await fetch(`${api.defaults.baseURL}/api/academies?city=${encodeURIComponent(city)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || data || []
  } catch (error) {
    console.error("Error fetching academies:", error)
    return []
  }
}

export async function fetchCoachesByCity(city: string): Promise<ApiCoach[]> {
  try {
    const response = await fetch(`${api.defaults.baseURL}/api/coaches?city=${encodeURIComponent(city)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || data || []
  } catch (error) {
    console.error("Error fetching coaches:", error)
    return []
  }
}

export async function fetchTurfsByCity(city: string): Promise<ApiTurf[]> {
  try {
    const response = await fetch(`${api.defaults.baseURL}/api/turfs?city=${encodeURIComponent(city)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.data || data || []
  } catch (error) {
    console.error("Error fetching turfs:", error)
    return []
  }
}

// Transform functions to convert API data to component interfaces
export function transformApiAcademyToAcademy(apiAcademy: ApiAcademy): any {
  return {
    id: apiAcademy.id,
    title: apiAcademy.name,
    description: apiAcademy.description || "",
    location: apiAcademy.location || apiAcademy.city || "",
    sports: apiAcademy.sports || [],
    rating: apiAcademy.rating || 0,
    hourlyRate: apiAcademy.hourlyRate,
    image: apiAcademy.image || "/placeholder.svg?height=300&width=400",
    amenities: apiAcademy.amenities || [],
    certificationLevel: apiAcademy.certificationLevel,
    sessionTypes: apiAcademy.sessionTypes || [],
    languages: apiAcademy.languages || [],
    category: apiAcademy.sports?.[0] || "Sports",
  }
}

export function transformApiCoachToCoach(apiCoach: ApiCoach): any {
  return {
    id: apiCoach.id,
    name: apiCoach.name,
    description: apiCoach.description || "",
    location: apiCoach.location || apiCoach.city || "",
    sport: apiCoach.sport || "Sports",
    rating: apiCoach.rating || 0,
    hourlyRate: apiCoach.hourlyRate || 0,
    image: apiCoach.image || "/placeholder.svg?height=300&width=400",
    certificationLevel: apiCoach.certificationLevel || "Beginner",
    sessionTypes: apiCoach.sessionTypes || ["Individual"],
    languages: apiCoach.languages || ["English"],
    trainedProfessionals: apiCoach.trainedProfessionals || false,
  }
}

export function transformApiTurfToCourt(apiTurf: ApiTurf): any {
  return {
    id: apiTurf.id,
    name: apiTurf.name,
    description: apiTurf.description || "",
    location: apiTurf.location || apiTurf.city || "",
    sport: apiTurf.sport || "Sports",
    rating: apiTurf.rating || 0,
    price: apiTurf.price || 0,
    image: apiTurf.image || "/placeholder.svg?height=300&width=400",
    amenities: apiTurf.amenities || [],
    isIndoor: apiTurf.isIndoor || false,
    surface: apiTurf.surface || "Grass",
    type: apiTurf.type || "Standard",
    facilities: apiTurf.amenities || [],
  }
}

// Utility functions for finding items by slug
export const findAcademyBySlug = (academies, slug) => {
  return academies.find((academy) => generateSlug(academy.name) === slug)
}

export const findCoachBySlug = (coaches, slug) => {
  return coaches.find((coach) => generateSlug(coach.name) === slug)
}

export const findTurfBySlug = (turfs, slug) => {
  return turfs.find((turf) => generateSlug(turf.name) === slug)
}

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-")
}

// Export the api instance
export default api