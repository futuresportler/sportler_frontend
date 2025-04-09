export interface Academy {
  id: number
  title: string
  name?: string
  image: string
  category: string
  sports?: string[]
  description: string
  hourlyRate?: number
  rating?: number
  reviewCount?: number
  location: string
  state?: string
  coach?: string
  time?: string
  amenities: string[]
  certificationLevel?: string
  sessionTypes?: string[]
  nextAvailability: string
  languages: string[]
  featured?: boolean
  detailData: {
    overview: {
      description: string
    }
    includes: {
      name: string
      checked: boolean
    }[]
    rules: string[]
    amenities: {
      name: string
      available: boolean
    }[]
    gallery?: string[]
    reviews: {
      id: number
      name: string
      date: string
      rating?: number
      comment: string
      images?: string[]
      verified: boolean
    }[]
    location: {
      address: string
      coordinates?: {
        lat: number
        lng: number
      }
    }
    availability?: {
      sessionTypes?: {
        id: string
        name: string
        description: string
        price: number
      }[]
      courts?: {
        id: string
        name: string
        status: string
      }[]
      dates?: {
        date: string
        slots: {
          time: string
          status: string
        }[]
      }[]
      calendar?: {
        availableDates: number[]
        limitedDates: number[]
        bookedDates: number[]
      }
    }
  }
}

export interface AcademyFilterOptions {
  price?: {
    min: number
    max: number
  }
  rating?: number
  certificationLevel?: string[]
  sessionType?: string[]
  availabilityTimeSlots?: string[]
  amenities?: string[]
  languages?: string[]
  category?: string
  sports?: string[]
  searchQuery?: string
}
