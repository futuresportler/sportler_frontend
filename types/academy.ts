export interface Academy {
    id: number
    title: string
    image: string
    category: string
    description: string
    hourlyRate: number
    rating: number
    reviewCount: number
    location: string
    coach: string
    time: string
    amenities: string[]
    certificationLevel: string
    sessionTypes: string[]
    nextAvailability: string
    languages: string[]
    featured: boolean
  }
  
  export interface AcademyFilterOptions {
    price: {
      min: number
      max: number
    }
    rating: number
    certificationLevel: string[]
    sessionType: string[]
    availabilityTimeSlots: string[]
    amenities: string[]
    languages: string[]
    category: string
    searchQuery: string
  }
  
  