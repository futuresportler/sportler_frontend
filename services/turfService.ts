// Fix the import statement to match how apiService is exported
import api from "./apiService"

export interface TurfProfile {
  turfId: string
  name: string
  city: string
  fullAddress: string
  description?: string
  contactPhone: string
  contactEmail: string
  turfType: "indoor" | "outdoor" | "hybrid"
  sportsAvailable: string[]
  facilities?: string[]
  latitude: number
  longitude: number
  openingTime: string
  closingTime: string
  hourlyRate: number
  halfDayRate?: number
  fullDayRate?: number
  mainImage?: string
  images?: string[]
  rating: number
  totalReviews: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Ground {
  groundId: string
  turfId: string
  groundName: string
  sportType: string
  surfaceType: "natural" | "artificial" | "hybrid"
  capacity?: number
  dimensions?: string
  hourlyRate: number
  halfDayRate?: number
  fullDayRate?: number
  amenities?: string[]
  description?: string
  status: "active" | "inactive"
  slots?: any[]
  createdAt: string
  updatedAt: string
}

export interface TurfSearchParams {
  city?: string
  sport?: string
  rating?: number
  turfType?: "indoor" | "outdoor" | "hybrid"
  minPrice?: number
  maxPrice?: number
  facilities?: string
  page?: number
  limit?: number
  latitude?: number
  longitude?: number
  radius?: number
  sortBy?: string
}

export interface CreateTurfRequest {
  name: string
  city: string
  fullAddress: string
  description?: string
  contactPhone: string
  contactEmail: string
  turfType: "indoor" | "outdoor" | "hybrid"
  sportsAvailable: string[]
  facilities?: string[]
  latitude: number
  longitude: number
  openingTime: string
  closingTime: string
  hourlyRate: number
  halfDayRate?: number
  fullDayRate?: number
  images?: string[]
  mainImage?: string
}

export interface CreateGroundRequest {
  groundName: string
  sportType: string
  surfaceType: "natural" | "artificial" | "hybrid"
  capacity?: number
  dimensions?: string
  hourlyRate: number
  halfDayRate?: number
  fullDayRate?: number
  amenities?: string[]
  description?: string
}

class TurfService {
  private baseUrl = "/api/turf"

  // Turf Profile Management
  async searchTurfs(params: TurfSearchParams = {}) {
    const queryString = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        queryString.append(key, value.toString())
      }
    })

    const response = await api.get(`${this.baseUrl}?${queryString}`)
    return response.data
  }

  async createTurf(data: CreateTurfRequest) {
    const response = await api.post(this.baseUrl, data)
    return response.data
  }

  async getMyTurfs() {
    const response = await api.get(`${this.baseUrl}/my-turfs`)
    return response.data
  }

  async getTurfById(turfId: string) {
    const response = await api.get(`${this.baseUrl}/${turfId}`)
    return response.data
  }

  async updateTurf(turfId: string, data: Partial<CreateTurfRequest>) {
    const response = await api.patch(`${this.baseUrl}/${turfId}`, data)
    return response.data
  }

  async deleteTurf(turfId: string) {
    const response = await api.delete(`${this.baseUrl}/${turfId}`)
    return response.data
  }

  async getTurfDashboard(turfId: string) {
    const response = await api.get(`${this.baseUrl}/${turfId}/dashboard`)
    return response.data
  }

  async getNearbyTurfs(latitude: number, longitude: number, radius = 5000) {
    const response = await api.get(`${this.baseUrl}/nearby`, {
      params: { latitude, longitude, radius },
    })
    return response.data
  }

  async addTurfImage(turfId: string, imageUrl: string, isMainImage = false) {
    const response = await api.post(`${this.baseUrl}/${turfId}/images`, {
      imageUrl,
      isMainImage,
    })
    return response.data
  }

  async handleBookingRequest(requestId: string, action: "accept" | "decline") {
    const response = await api.post(`${this.baseUrl}/booking-requests/${requestId}`, {
      action,
    })
    return response.data
  }

  async addReview(turfId: string, rating: number, comment: string) {
    const response = await api.post(`${this.baseUrl}/${turfId}/reviews`, {
      rating,
      comment,
    })
    return response.data
  }

  async getTurfWithPromotion(turfId: string) {
    const response = await api.get(`${this.baseUrl}/${turfId}/with-promotion`)
    return response.data
  }

  // Ground Management
  async createGround(turfId: string, data: CreateGroundRequest) {
    const response = await api.post(`${this.baseUrl}/${turfId}/grounds`, data)
    return response.data
  }

  async getGrounds(turfId: string) {
    const response = await api.get(`${this.baseUrl}/${turfId}/grounds`)
    return response.data
  }

  async getGroundById(groundId: string) {
    const response = await api.get(`${this.baseUrl}/grounds/${groundId}`)
    return response.data
  }

  async updateGround(groundId: string, data: Partial<CreateGroundRequest & { status: "active" | "inactive" }>) {
    const response = await api.patch(`${this.baseUrl}/grounds/${groundId}`, data)
    return response.data
  }

  async deleteGround(groundId: string) {
    const response = await api.delete(`${this.baseUrl}/grounds/${groundId}`)
    return response.data
  }

  // Utility methods
  formatPrice(price: number) {
    return `₹${price.toLocaleString()}`
  }

  formatTimeRange(startTime: string, endTime: string) {
    return `${startTime} - ${endTime}`
  }

  calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371e3 // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180
    const φ2 = (lat2 * Math.PI) / 180
    const Δφ = ((lat2 - lat1) * Math.PI) / 180
    const Δλ = ((lon2 - lon1) * Math.PI) / 180

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    return R * c
  }
}

export const turfService = new TurfService()