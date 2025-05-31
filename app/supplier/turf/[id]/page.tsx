"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  ChevronLeft,
  Clock,
  DollarSign,
  Edit,
  Mail,
  MapPin,
  Phone,
  Settings,
  Star,
  Trash2,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { turfService } from "../../../../services/turfService"

export default function TurfDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const turfId = params.id
  const [turf, setTurf] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTurfData = async () => {
      try {
        setLoading(true)

        // Fetch turf profile and dashboard data
        const [turfResponse, dashboardResponse] = await Promise.all([
          turfService.getTurfById(turfId),
          turfService.getTurfDashboard(turfId),
        ])

        const turfData = turfResponse.data
        const dashboardData = dashboardResponse.data

        // Transform API data to match component expectations
        const transformedTurf = {
          id: turfData.turfId,
          name: turfData.name,
          location: turfData.city,
          address: turfData.fullAddress,
          description: turfData.description || "",
          phone: turfData.contactPhone,
          email: turfData.contactEmail,
          turfType: turfData.turfType,
          sportTypes: turfData.sportsAvailable,
          facilities: turfData.facilities || [],
          pricing: {
            hourly: turfService.formatPrice(turfData.hourlyRate),
            halfDay: turfData.halfDayRate ? turfService.formatPrice(turfData.halfDayRate) : "N/A",
            fullDay: turfData.fullDayRate ? turfService.formatPrice(turfData.fullDayRate) : "N/A",
          },
          openingTime: turfData.openingTime.slice(0, 5), // Remove seconds
          closingTime: turfData.closingTime.slice(0, 5),
          rating: turfData.rating,
          reviewCount: turfData.totalReviews,
          images: turfData.images || [turfData.mainImage || "/placeholder.svg?height=300&width=500&text=Turf+Image"],
          courts: turfData.grounds?.length || 0,
          bookings: {
            today:
              dashboardData.upcomingBookings?.filter(
                (b) => new Date(b.date).toDateString() === new Date().toDateString(),
              ).length || 0,
            week: dashboardData.upcomingBookings?.length || 0,
            month: dashboardData.upcomingBookings?.length || 0, // This would need separate API call for monthly data
          },
          revenue: {
            today: "₹0", // This would need separate analytics API
            week: "₹0",
            month: "₹0",
          },
          utilization: "0%", // This would need separate analytics API
          popularSports:
            turfData.sportsAvailable?.map((sport, index) => ({
              name: sport,
              percentage: Math.max(20, 100 - index * 15), // Mock calculation
            })) || [],
        }

        setTurf(transformedTurf)
      } catch (error) {
        console.error("Error fetching turf data:", error)
        // Handle error appropriately
      } finally {
        setLoading(false)
      }
    }

    fetchTurfData()
  }, [turfId])

  if (loading) {
    return <div className="flex items-center justify-center h-96">Loading turf details...</div>
  }

  if (!turf) {
    return <div className="flex items-center justify-center h-96">Turf not found</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/supplier/dashboard">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      {/* Turf Header */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden">
            <Image src={turf.images[0] || "/placeholder.svg"} alt={turf.name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-3xl font-bold text-white mb-2">{turf.name}</h1>
              <div className="flex items-center text-white gap-2">
                <MapPin className="h-4 w-4" />
                <span>{turf.location}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="md:w-1/3 flex flex-col gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-gray-700 flex items-center">
                    <Calendar className="h-3.5 w-3.5 mr-1 text-blue-600" />
                    Today's Bookings
                  </p>
                  <p className="text-lg font-bold text-blue-700">{turf.bookings.today}</p>
                </div>
                <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                  <p className="text-xs text-gray-700 flex items-center">
                    <DollarSign className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                    Today's Revenue
                  </p>
                  <p className="text-lg font-bold text-emerald-700">{turf.revenue.today}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                  <p className="text-xs text-gray-700 flex items-center">
                    <Users className="h-3.5 w-3.5 mr-1 text-purple-600" />
                    Total Courts
                  </p>
                  <p className="text-lg font-bold text-purple-700">{turf.courts}</p>
                </div>
                <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                  <p className="text-xs text-gray-700 flex items-center">
                    <Star className="h-3.5 w-3.5 mr-1 text-amber-600" />
                    Rating
                  </p>
                  <p className="text-lg font-bold text-amber-700">{turf.rating}★</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => router.push(`/supplier/turf/${turfId}/courts`)}>Manage Courts</Button>
            <Button variant="outline" onClick={() => router.push(`/supplier/turf/bookings`)}>
              <Calendar className="h-4 w-4 mr-2" />
              Bookings
            </Button>
          </div>
        </div>
      </div>

      {/* Turf Details Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="courts">Courts</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{turf.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <Phone className="h-4 w-4 mr-2 text-gray-500" />
                        {turf.phone}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Mail className="h-4 w-4 mr-2 text-gray-500" />
                        {turf.email}
                      </div>
                      <div className="flex items-start text-gray-700">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500 mt-0.5" />
                        <span>{turf.address}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Operating Hours</h3>
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-700">
                        <Clock className="h-4 w-4 mr-2 text-gray-500" />
                        {turf.openingTime} - {turf.closingTime}
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                        Open all days
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sports & Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Sports Available</h3>
                    <div className="flex flex-wrap gap-2">
                      {turf.sportTypes.map((sport, index) => (
                        <Badge key={index} variant="secondary">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {turf.facilities.map((facility, index) => (
                        <Badge key={index} variant="outline">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Hourly Rate</span>
                    <span>{turf.pricing.hourly}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <span className="font-medium">Half Day Rate</span>
                    <span>{turf.pricing.halfDay}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Full Day Rate</span>
                    <span>{turf.pricing.fullDay}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                * Prices may vary based on the specific court and time slot
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular Sports</CardTitle>
                <CardDescription>Based on booking data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {turf.popularSports.map((sport, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{sport.name}</span>
                        <span>{sport.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${sport.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Court Gallery</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {turf.images.map((image, index) => (
                  <div key={index} className="relative h-48 rounded-lg overflow-hidden">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Court image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View All Photos
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Management</CardTitle>
              <CardDescription>Manage all your turf bookings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Booking management content will appear here.</p>
              <Button className="mt-4" onClick={() => router.push("/supplier/turf/bookings")}>
                Go to Bookings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="courts" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Court Management</CardTitle>
              <CardDescription>Manage all your turf courts and facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Court management content will appear here.</p>
              <Button className="mt-4" onClick={() => router.push(`/supplier/turf/${turfId}/courts`)}>
                Manage Courts
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Turf Settings</CardTitle>
              <CardDescription>Manage your turf settings and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Turf Details
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Manage Pricing
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="h-4 w-4 mr-2" />
                  Update Operating Hours
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Turf
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
