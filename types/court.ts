export interface Court {
    id: string
    name: string
    location: string
    rating: number
    reviewCount: number
    price: number
    pricePerHour?: number
    image: string
    sport: string
    distance: string
    availability:
      | string
      | {
          status: string
          timeSlots?: { time: string; status: string }[]
          calendar?: {
            availableDates: number[]
            limitedDates: number[]
            bookedDates: number[]
          }
        }
    amenities: string[]
    facilities?: string[]
    isIndoor: boolean
    isFavorite: boolean
    isPromoted?: boolean
    description?: string
  }
  
  export interface CourtDetail extends Court {
    description: string
    images: string[]
    address: string
    openingHours: { day: string; hours: string }[]
    facilities: string[]
    rules: { rule: string }[]
    includes: { item: string; included: boolean }[]
    reviews: {
      id: string
      user: string
      avatar: string
      rating: number
      date: string
      comment: string
      verified?: boolean
    }[]
    bookingOptions: {
      id: string
      name: string
      price: number
      duration: string
    }[]
    availableDates: string[]
  }
  
  