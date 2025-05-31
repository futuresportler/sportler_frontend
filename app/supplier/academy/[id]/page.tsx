"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  Star,
  DollarSign,
  Award,
  Plus,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  Settings,
  BarChart3,
  UserPlus,
  BookOpen,
  Target,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

// API Response Interfaces
interface Academy {
  id: string
  name: string
  description: string
  address: string
  city: string
  state: string
  pincode: string
  phone: string
  email: string
  website?: string
  logo?: string
  coverImage?: string
  sports: string[]
  facilities: string[]
  rating: number
  totalReviews: number
  isVerified: boolean
  establishedYear: number
  totalStudents: number
  totalCoaches: number
  createdAt: string
  updatedAt: string
}

interface Coach {
  id: string
  name: string
  email: string
  mobileNumber: string
  bio: string
  hourlyRate: number
  experienceLevel: number
  sport: string
  isVerified: boolean
  avatar?: string
  specializations: string[]
  totalStudents: number
  rating: number
  createdAt: string
}

interface Batch {
  id: string
  name: string
  sport: string
  ageGroup: string
  skillLevel: string
  maxStudents: number
  currentStudents: number
  schedule: Record<string, string[]>
  monthlyFee: number
  isActive: boolean
  coaches: { id: string; name: string; isPrimary: boolean }[]
  createdAt: string
}

interface Program {
  id: string
  name: string
  description: string
  sport: string
  duration: number
  fee: number
  maxParticipants: number
  currentParticipants: number
  startDate: string
  endDate: string
  isActive: boolean
  coaches: { id: string; name: string; isPrimary: boolean }[]
  createdAt: string
}

interface AcademyAnalytics {
  totalRevenue: number
  monthlyRevenue: number
  totalBookings: number
  monthlyBookings: number
  averageRating: number
  totalReviews: number
  occupancyRate: number
  popularSports: { sport: string; count: number }[]
  revenueChart: { month: string; revenue: number }[]
  bookingTrends: { date: string; bookings: number }[]
}

const API_BASE_URL = "https://api-primary.futuresportler.com/api"

export default function AcademyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const academyId = params.id as string

  // State management
  const [academy, setAcademy] = useState<Academy | null>(null)
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [batches, setBatches] = useState<Batch[]>([])
  const [programs, setPrograms] = useState<Program[]>([])
  const [analytics, setAnalytics] = useState<AcademyAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)

  // API call functions
  const fetchAcademyDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academies/${academyId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch academy details: ${response.statusText}`)
      }

      const data = await response.json()
      setAcademy(data)
    } catch (err) {
      console.error("Error fetching academy details:", err)
      throw err
    }
  }

  const fetchCoaches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academies/${academyId}/coaches`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch coaches: ${response.statusText}`)
      }

      const data = await response.json()
      setCoaches(data)
    } catch (err) {
      console.error("Error fetching coaches:", err)
      throw err
    }
  }

  const fetchBatches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academies/${academyId}/batches`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch batches: ${response.statusText}`)
      }

      const data = await response.json()
      setBatches(data)
    } catch (err) {
      console.error("Error fetching batches:", err)
      throw err
    }
  }

  const fetchPrograms = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academies/${academyId}/programs`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch programs: ${response.statusText}`)
      }

      const data = await response.json()
      setPrograms(data)
    } catch (err) {
      console.error("Error fetching programs:", err)
      throw err
    }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/academies/${academyId}/analytics`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch analytics: ${response.statusText}`)
      }

      const data = await response.json()
      setAnalytics(data)
    } catch (err) {
      console.error("Error fetching analytics:", err)
      throw err
    }
  }

  // Load all data
  const loadAllData = async () => {
    try {
      setError(null)
      await Promise.all([fetchAcademyDetails(), fetchCoaches(), fetchBatches(), fetchPrograms(), fetchAnalytics()])
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load academy data")
      toast.error("Failed to load academy data")
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  // Refresh data
  const handleRefresh = async () => {
    setRefreshing(true)
    await loadAllData()
    toast.success("Data refreshed successfully")
  }

  // Initial data load
  useEffect(() => {
    if (academyId) {
      loadAllData()
    }
  }, [academyId])

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Failed to Load Academy</h2>
        <p className="text-gray-600 mb-6 text-center max-w-md">{error}</p>
        <div className="flex gap-4">
          <Button onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Try Again
          </Button>
          <Button variant="outline" onClick={() => router.back()}>
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  if (!academy) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <AlertCircle className="h-16 w-16 text-gray-400 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">Academy Not Found</h2>
        <p className="text-gray-600 mb-6">The academy you're looking for doesn't exist.</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={academy.logo || "/placeholder.svg?height=64&width=64&text=A"}
              alt={academy.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{academy.name}</h1>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>
                {academy.city}, {academy.state}
              </span>
              {academy.isVerified && (
                <Badge variant="secondary" className="bg-green-100 text-green-700">
                  <Award className="h-3 w-3 mr-1" />
                  Verified
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
          <Button asChild>
            <Link href={`/supplier/academy/${academyId}/analytics`}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Link>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all batches and programs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Coaches</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{coaches.length}</div>
            <p className="text-xs text-muted-foreground">
              {coaches.filter((c) => c.isVerified).length} verified coaches
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{analytics?.monthlyRevenue?.toLocaleString() || "0"}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Academy Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{academy.rating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Based on {academy.totalReviews} reviews</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="coaches">Coaches ({coaches.length})</TabsTrigger>
          <TabsTrigger value="batches">Batches ({batches.length})</TabsTrigger>
          <TabsTrigger value="programs">Programs ({programs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Academy Information */}
            <Card>
              <CardHeader>
                <CardTitle>Academy Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Description</h4>
                  <p className="text-gray-600 text-sm">{academy.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Contact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span>{academy.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span>{academy.email}</span>
                      </div>
                      {academy.website && (
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-gray-400" />
                          <a
                            href={academy.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-800 mb-2">Details</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-500">Established:</span>
                        <span className="ml-2">{academy.establishedYear}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Sports:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {academy.sports.map((sport) => (
                            <Badge key={sport} variant="outline" className="text-xs">
                              {sport}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Facilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {academy.facilities.map((facility) => (
                      <Badge key={facility} variant="secondary" className="text-xs">
                        {facility}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start">
                  <Link href={`/supplier/academy/${academyId}/coaches/add`}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add New Coach
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/supplier/academy/${academyId}/batches/add`}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Batch
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/supplier/academy/${academyId}/programs/add`}>
                    <BookOpen className="h-4 w-4 mr-2" />
                    Create New Program
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/supplier/academy/${academyId}/fees`}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Manage Fees
                  </Link>
                </Button>

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={`/supplier/academy/${academyId}/settings`}>
                    <Settings className="h-4 w-4 mr-2" />
                    Academy Settings
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Coaches</CardTitle>
              </CardHeader>
              <CardContent>
                {coaches.length === 0 ? (
                  <div className="text-center py-8">
                    <UserPlus className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No coaches added yet</p>
                    <Button asChild className="mt-4">
                      <Link href={`/supplier/academy/${academyId}/coaches/add`}>Add First Coach</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {coaches.slice(0, 3).map((coach) => (
                      <div key={coach.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100">
                            <Image
                              src={coach.avatar || "/placeholder.svg?height=40&width=40&text=" + coach.name.charAt(0)}
                              alt={coach.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-800">{coach.name}</h4>
                            <p className="text-sm text-gray-500">{coach.sport}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">₹{coach.hourlyRate}/hr</div>
                          <div className="text-xs text-gray-500">{coach.experienceLevel}y exp</div>
                        </div>
                      </div>
                    ))}
                    {coaches.length > 3 && (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/supplier/academy/${academyId}/coaches`}>View All Coaches</Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Batches</CardTitle>
              </CardHeader>
              <CardContent>
                {batches.length === 0 ? (
                  <div className="text-center py-8">
                    <Target className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No batches created yet</p>
                    <Button asChild className="mt-4">
                      <Link href={`/supplier/academy/${academyId}/batches/add`}>Create First Batch</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {batches
                      .filter((b) => b.isActive)
                      .slice(0, 3)
                      .map((batch) => (
                        <div key={batch.id} className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-gray-800">{batch.name}</h4>
                            <p className="text-sm text-gray-500">
                              {batch.sport} • {batch.skillLevel}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">
                              {batch.currentStudents}/{batch.maxStudents}
                            </div>
                            <div className="text-xs text-gray-500">₹{batch.monthlyFee}/month</div>
                          </div>
                        </div>
                      ))}
                    {batches.length > 3 && (
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/supplier/academy/${academyId}/batches`}>View All Batches</Link>
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="coaches" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Coaches</h2>
            <Button asChild>
              <Link href={`/supplier/academy/${academyId}/coaches/add`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Coach
              </Link>
            </Button>
          </div>

          {coaches.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <UserPlus className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No coaches yet</h3>
                <p className="text-gray-500 mb-6">Start building your coaching team</p>
                <Button asChild>
                  <Link href={`/supplier/academy/${academyId}/coaches/add`}>Add First Coach</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach) => (
                <Card key={coach.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100">
                        <Image
                          src={coach.avatar || "/placeholder.svg?height=48&width=48&text=" + coach.name.charAt(0)}
                          alt={coach.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{coach.name}</h3>
                        <p className="text-sm text-gray-500">{coach.sport}</p>
                      </div>
                      {coach.isVerified && (
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Verified
                        </Badge>
                      )}
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Experience:</span>
                        <span>{coach.experienceLevel} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rate:</span>
                        <span>₹{coach.hourlyRate}/hour</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Students:</span>
                        <span>{coach.totalStudents}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Rating:</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{coach.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <Button asChild variant="outline" className="w-full">
                        <Link href={`/supplier/academy/${academyId}/coaches/${coach.id}`}>
                          View Details
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="batches" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Batches</h2>
            <Button asChild>
              <Link href={`/supplier/academy/${academyId}/batches/add`}>
                <Plus className="h-4 w-4 mr-2" />
                Create Batch
              </Link>
            </Button>
          </div>

          {batches.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No batches yet</h3>
                <p className="text-gray-500 mb-6">Create your first batch to start organizing students</p>
                <Button asChild>
                  <Link href={`/supplier/academy/${academyId}/batches/add`}>Create First Batch</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batches.map((batch) => (
                <Card key={batch.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800">{batch.name}</h3>
                      <Badge variant={batch.isActive ? "default" : "secondary"}>
                        {batch.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sport:</span>
                        <span>{batch.sport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Level:</span>
                        <span>{batch.skillLevel}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Age Group:</span>
                        <span>{batch.ageGroup}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Students:</span>
                        <span>
                          {batch.currentStudents}/{batch.maxStudents}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Monthly Fee:</span>
                        <span>₹{batch.monthlyFee}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">COACHES</h4>
                      <div className="space-y-1">
                        {batch.coaches.map((coach) => (
                          <div key={coach.id} className="flex items-center justify-between text-xs">
                            <span>{coach.name}</span>
                            {coach.isPrimary && (
                              <Badge variant="outline" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/supplier/academy/${academyId}/batches/${batch.id}`}>
                        Manage Batch
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Programs</h2>
            <Button asChild>
              <Link href={`/supplier/academy/${academyId}/programs/add`}>
                <Plus className="h-4 w-4 mr-2" />
                Create Program
              </Link>
            </Button>
          </div>

          {programs.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-2">No programs yet</h3>
                <p className="text-gray-500 mb-6">Create specialized programs to attract more students</p>
                <Button asChild>
                  <Link href={`/supplier/academy/${academyId}/programs/add`}>Create First Program</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <Card key={program.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-800">{program.name}</h3>
                      <Badge variant={program.isActive ? "default" : "secondary"}>
                        {program.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>

                    <p className="text-sm text-gray-600 mb-4">{program.description}</p>

                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Sport:</span>
                        <span>{program.sport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span>{program.duration} days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Participants:</span>
                        <span>
                          {program.currentParticipants}/{program.maxParticipants}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Fee:</span>
                        <span>₹{program.fee}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Start Date:</span>
                        <span>{new Date(program.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-gray-500 mb-2">COACHES</h4>
                      <div className="space-y-1">
                        {program.coaches.map((coach) => (
                          <div key={coach.id} className="flex items-center justify-between text-xs">
                            <span>{coach.name}</span>
                            {coach.isPrimary && (
                              <Badge variant="outline" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                      <Link href={`/supplier/academy/${academyId}/programs/${program.id}`}>
                        Manage Program
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
