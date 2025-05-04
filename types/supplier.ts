export interface SupplierProfile {
  id?: string
  name: string
  email: string
  phone: string
  governmentId: string
  governmentIdType: string
  address: string
  city: string
  state: string
  pincode: string
  businessName: string
  gstNumber: string
  bankAccountName: string
  bankAccountNumber: string
  ifscCode: string
  upiId: string
  bio: string
  profileCompleted: boolean
  createdAt?: string
  updatedAt?: string
}

// This interface represents the actual API schema
export interface SupplierApiData {
  supplierId?: string
  email?: string
  mobile_number: string
  profilePicture?: string
  isVerified?: boolean
  isOAuth?: boolean
  firebaseUID?: string
  role?: "owner" | "employee" | "reviewer" | "manager" | "admin"
  module?: string[]
  location?: any
  status?: "active" | "inactive" | "suspended"
  gstNumber?: string
  bankAccountNumber?: string
  accountHolderName?: string
  ifscCode?: string
  upiId?: string
  createdAt?: string
  updatedAt?: string
}

export interface SupplierOnboardingState {
  profileCompleted: boolean
  academyAdded: boolean
  academyVerified: boolean
}

export interface Academy {
  academyId: string
  name: string
  description: string
  foundedYear: number
  supplierId: string
  managerId: string
  sports: string[]
  facilities: string[]
  achievements: string[]
  ageGroups: string[]
  classTypes: string[]
  location: {
    type: string
    coordinates: number[]
    crs: {
      type: string
      properties: {
        name: string
      }
    }
  }
  city: string
  address: string
  phone: string
  email: string
  website: string
  socialMediaLinks: {
    facebook: string
    twitter: string
    instagram: string
    youtube: string
  }
  photos: string[]
  videos: string[]
  operatingHours: any
  totalStudents: number
  totalPrograms: number
  rating: string
  reviewsCount: number
  isVerified: boolean
  createdAt: string
  updatedAt: string
  deletedAt: null | string
}
