export interface Coach {
  id: number
  name: string
  image: string
  sport: string
  hourlyRate: number
  rating: number
  reviewCount: number
  location: string
  description: string
  certificationLevel: string
  sessionTypes: string[]
  nextAvailability: string
  languages: string[]
  trainedProfessionals: boolean
  // Add availability data
  availabilityCalendar: {
    date: string
    slots: {
      time: string
      status: "available" | "limited" | "booked"
    }[]
  }[]
  shortBio?: string
  experience?: string
  lessonTypes?: {
    title: string
    description: string
  }[]
}

export interface FilterOptions {
  price: {
    min: number
    max: number
  }
  rating: number
  certificationLevel: string[]
  sessionType: string[]
  availabilityTimeSlots: string[]
  trainedProfessionals: boolean
  languages: string[]
  sport: string
  searchQuery: string
}

