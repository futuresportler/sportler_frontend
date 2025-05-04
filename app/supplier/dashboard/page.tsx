"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Calendar, DollarSign, Users, Plus, Building2, MapPin, Clock, Star, Activity } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { KpiCards } from "@/components/dashboard/supplier/kpi-cards"
import { RecentBookings } from "@/components/dashboard/supplier/recent-bookings"
import { FeeReminders } from "@/components/dashboard/supplier/fee-reminders"
import { QuickActions } from "@/components/dashboard/supplier/quick-actions"
import { RevenueChart } from "@/components/dashboard/supplier/revenue-chart"
import { BookingSourcesChart } from "@/components/dashboard/supplier/booking-sources-chart"
import { PeakHoursChart } from "@/components/dashboard/supplier/peak-hours-chart"
import { Check, RefreshCw, MessageSquare, User, ImageIcon, BookOpen, Video, HelpCircle } from "lucide-react"
import { getOnboardingState } from "@/services/authService"

function RecentActivities() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest updates and activities</CardDescription>
      </CardHeader>
      <CardContent>
        <p>No recent activities to display.</p>
      </CardContent>
    </Card>
  )
}

function AcademyOverview({ academies, router }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Academies</h2>
        <Button onClick={() => router.push("/supplier/academy/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Academy
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academies.map((academy) => (
          <Card
            key={academy.id}
            className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-orange-50"
          >
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{academy.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {academy.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-blue-600" />
                      Bookings
                    </p>
                    <p className="text-lg font-bold text-blue-700">123</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <DollarSign className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                      Revenue
                    </p>
                    <p className="text-lg font-bold text-emerald-700">₹45K</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Users className="h-3.5 w-3.5 mr-1 text-purple-600" />
                      Students
                    </p>
                    <p className="text-lg font-bold text-purple-700">65</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1 text-amber-600" />
                      Rating
                    </p>
                    <p className="text-lg font-bold text-amber-700">4.8★</p>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full bg-white hover:bg-orange-50"
                  onClick={() => router.push(`/supplier/academy/${academy.id}`)}
                >
                  Manage Academy
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add new informative sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Coach Feedback</CardTitle>
            <CardDescription>Recent feedback from students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Vikram Singh",
                  rating: 4.9,
                  comment: "Excellent technical coaching and personalized attention",
                  sport: "Cricket",
                },
                {
                  name: "Priya Patel",
                  rating: 4.7,
                  comment: "Great at motivating students and building confidence",
                  sport: "Basketball",
                },
                {
                  name: "Rahul Sharma",
                  rating: 4.8,
                  comment: "Very knowledgeable and patient with beginners",
                  sport: "Football",
                },
              ].map((coach, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className="bg-blue-100 rounded-full p-2">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium text-gray-800">{coach.name}</h4>
                      <div className="flex items-center">
                        <span className="text-amber-500 font-medium">{coach.rating}</span>
                        <Star className="h-4 w-4 text-amber-500 ml-1 fill-amber-500" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{coach.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">{coach.sport} Coach</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Booking Platforms</CardTitle>
            <CardDescription>Distribution of bookings by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { platform: "Website", count: 78, percentage: 45, color: "bg-blue-600", icon: "globe" },
                { platform: "Playo", count: 42, percentage: 24, color: "bg-emerald-600", icon: "smartphone" },
                { platform: "Hudle", count: 35, percentage: 20, color: "bg-purple-600", icon: "layout" },
                { platform: "Offline", count: 19, percentage: 11, color: "bg-amber-600", icon: "map-pin" },
              ].map((platform, index) => (
                <div
                  key={index}
                  className="flex flex-col p-4 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-2">
                    <div
                      className={`w-10 h-10 rounded-full ${platform.color.replace("bg-", "bg-opacity-20 bg-")} flex items-center justify-center`}
                    >
                      <div className={`w-5 h-5 rounded-full ${platform.color}`}></div>
                    </div>
                    <span className="text-2xl font-bold">{platform.count}</span>
                  </div>
                  <div className="mt-1">
                    <div className="text-sm font-medium">{platform.platform}</div>
                    <div className="text-xs text-gray-500">{platform.percentage}% of total bookings</div>
                  </div>
                  <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className={`${platform.color} h-1.5 rounded-full`}
                      style={{ width: `${platform.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Popular Training Programs</CardTitle>
          <CardDescription>Most enrolled programs across your academies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Advanced Cricket Batting", enrollments: 28, revenue: "₹84K", growth: 12 },
              { name: "Junior Football Skills", enrollments: 24, revenue: "₹72K", growth: 8 },
              { name: "Basketball Fundamentals", enrollments: 18, revenue: "₹54K", growth: 15 },
              { name: "Tennis for Beginners", enrollments: 16, revenue: "₹48K", growth: 5 },
              { name: "Swimming Intermediate", enrollments: 14, revenue: "₹42K", growth: -3 },
              { name: "Athletic Conditioning", enrollments: 12, revenue: "₹36K", growth: 7 },
            ].map((program, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium text-gray-800 mb-2">{program.name}</h4>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{program.enrollments} students</span>
                  <span className="font-medium text-emerald-600">{program.revenue}</span>
                </div>
                <div className="mt-2 text-xs">
                  <span className={program.growth >= 0 ? "text-emerald-600" : "text-red-600"}>
                    {program.growth >= 0 ? "↑" : "↓"} {Math.abs(program.growth)}% from last month
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Mock function for getOnboardingState

export default function SupplierDashboard() {
  const router = useRouter()
  const [supplierModules, setSupplierModules] = useState({
    academy: { enabled: false, entities: [] },
    turf: { enabled: false, entities: [] },
    coach: { enabled: false, entities: [] },
  })

  const [activeTab, setActiveTab] = useState("overview")
  const [onboardingState, setOnboardingState] = useState({
    profileCompleted: false,
    academyAdded: false,
    academyVerified: false,
  })

  useEffect(() => {
    // Get supplier modules from localStorage
    const storedModules = localStorage.getItem("supplierModules")
    if (storedModules) {
      setSupplierModules(JSON.parse(storedModules))
    } else {
      // Mock data for development
      setSupplierModules({
        academy: {
          enabled: true,
          entities: [
            { id: 1, name: "Premier Cricket Academy", location: "Mumbai" },
            { id: 2, name: "Elite Tennis School", location: "Delhi" },
          ],
        },
        turf: {
          enabled: true,
          entities: [
            { id: 1, name: "Green Field Turf", location: "Bangalore" },
            { id: 2, name: "Sunset Sports Arena", location: "Chennai" },
          ],
        },
        coach: {
          enabled: true,
          entities: [],
        },
      })
    }

    // Get onboarding state
    const state = getOnboardingState()
    setOnboardingState(state)
  }, [])

  const hasNoEntities = supplierModules.academy.entities.length === 0 && supplierModules.turf.entities.length === 0

  // If academy is added but not verified, show verification pending message
  if (onboardingState.academyAdded && !onboardingState.academyVerified) {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Supplier Dashboard</h1>
            <p className="text-gray-600">Your business is under review.</p>
          </div>
        </div>

        <VerificationPendingDashboard />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Supplier Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your business.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </div>

      {hasNoEntities ? (
        <WelcomeCard supplierModules={supplierModules} router={router} />
      ) : (
        <>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:w-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {supplierModules.academy.enabled && <TabsTrigger value="academy">Academy</TabsTrigger>}
              {supplierModules.turf.enabled && <TabsTrigger value="turf">Turf</TabsTrigger>}
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <KpiCards />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <AnalyticsOverview />
                </div>
                <div className="space-y-6">
                  <RecentBookings />
                  <FeeReminders />
                  <QuickActions />
                </div>
              </div>

              <RecentActivities />
            </TabsContent>

            <TabsContent value="academy" className="space-y-6">
              <AcademyOverview academies={supplierModules.academy.entities} router={router} />
            </TabsContent>

            <TabsContent value="turf" className="space-y-6">
              <TurfOverview turfs={supplierModules.turf.entities} router={router} />
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  )
}

// Add a new component for the verification pending dashboard
function VerificationPendingDashboard() {
  return (
    <div className="space-y-6">
      <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="pb-2">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock size={32} className="text-amber-600" />
          </div>
          <CardTitle className="text-xl text-center">Verification in Progress</CardTitle>
          <CardDescription className="text-center">Your business is currently under review by our team</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="font-medium text-gray-800 mb-3">What happens during verification?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <Check size={12} className="text-amber-600" />
                </div>
                Our team reviews your business details for accuracy and completeness
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <Check size={12} className="text-amber-600" />
                </div>
                We may contact you for additional information if needed
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <Check size={12} className="text-amber-600" />
                </div>
                Once verified, you'll gain full access to all dashboard features
              </li>
            </ul>
          </div>

          <div className="mt-6 text-center">
            <p className="text-gray-600 mb-4">
              Verification typically takes 1-2 business days. You'll receive a notification once complete.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Status
              </Button>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Profile</CardTitle>
            <CardDescription>Enhance your business profile while you wait</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Personal Information</h4>
                    <p className="text-sm text-gray-500">Update your contact details</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <ImageIcon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Upload Photos</h4>
                    <p className="text-sm text-gray-500">Add photos of your facilities</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Upload
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <DollarSign className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Payment Details</h4>
                    <p className="text-sm text-gray-500">Set up your payment information</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources & Support</CardTitle>
            <CardDescription>Helpful information to get you started</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-700 flex items-center">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Supplier Guidelines
                </h4>
                <p className="text-sm text-blue-600 mt-1">Learn about our policies and best practices for suppliers</p>
                <Button variant="link" className="text-blue-700 p-0 h-auto mt-2">
                  Read Guidelines
                </Button>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-700 flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Tutorial Videos
                </h4>
                <p className="text-sm text-emerald-600 mt-1">Watch tutorials on how to use the supplier dashboard</p>
                <Button variant="link" className="text-emerald-700 p-0 h-auto mt-2">
                  Watch Videos
                </Button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-700 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </h4>
                <p className="text-sm text-purple-600 mt-1">Find answers to commonly asked questions</p>
                <Button variant="link" className="text-purple-700 p-0 h-auto mt-2">
                  View FAQ
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function WelcomeCard({ supplierModules, router }) {
  return (
    <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-none shadow-md">
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Your Supplier Dashboard!</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get started by adding your first academy or turf. This will help you manage bookings, track payments, and
            grow your sports business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {supplierModules.academy.enabled && (
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-5 w-5 mr-2 text-emerald-600" />
                  Add Your Academy
                </CardTitle>
                <CardDescription>Create your academy profile to manage students, batches, and fees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/sports-academy-layout.png"
                    alt="Academy"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <Button className="w-full" onClick={() => router.push("/supplier/academy/add")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Academy
                </Button>
              </CardContent>
            </Card>
          )}

          {supplierModules.turf.enabled && (
            <Card className="bg-white hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Add Your Turf
                </CardTitle>
                <CardDescription>Create your turf profile to manage bookings, time slots, and payments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <Image
                    src="/placeholder.svg?height=150&width=200&text=Turf"
                    alt="Turf"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <Button className="w-full" onClick={() => router.push("/supplier/turf/add")}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Turf
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function AnalyticsOverview() {
  // Sample data for booking sources
  const bookingSourcesData = [
    { name: "Website", value: 145, color: "#3b82f6" },
    { name: "Playo", value: 87, color: "#10b981" },
    { name: "Hudle", value: 65, color: "#8b5cf6" },
    { name: "Offline", value: 45, color: "#f59e0b" },
  ]

  // Sample data for session types
  const sessionTypesData = [
    { name: "Training", value: 120, color: "#3b82f6" },
    { name: "Fitness", value: 95, color: "#10b981" },
    { name: "Events", value: 75, color: "#8b5cf6" },
  ]

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue breakdown</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              Monthly
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[280px]">
            <RevenueChart />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-6 border-t border-gray-100">
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
              <p className="text-sm text-gray-700">Total Revenue</p>
              <p className="text-xl font-bold text-emerald-700">₹1,24,500</p>
              <p className="text-xs text-emerald-600">↑ 12% from last month</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
              <p className="text-sm text-gray-700">Bookings</p>
              <p className="text-xl font-bold text-blue-700">342</p>
              <p className="text-xs text-blue-600">↑ 8% from last month</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
              <p className="text-sm text-gray-700">Avg. Booking Value</p>
              <p className="text-xl font-bold text-purple-700">₹3,640</p>
              <p className="text-xs text-purple-600">↑ 4% from last month</p>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
              <p className="text-sm text-gray-700">Capacity Utilization</p>
              <p className="text-xl font-bold text-amber-700">72%</p>
              <p className="text-xs text-red-500">↓ 3% from last month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Booking Sources</CardTitle>
          <CardDescription>Distribution of bookings by platform</CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <BookingSourcesChart data={bookingSourcesData} />
        </CardContent>
        <CardFooter className="border-t pt-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
            <div className="text-center">
              <p className="text-xs text-gray-500">Website</p>
              <p className="text-lg font-bold text-blue-600">145</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Playo</p>
              <p className="text-lg font-bold text-emerald-600">87</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Hudle</p>
              <p className="text-lg font-bold text-purple-600">65</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Offline</p>
              <p className="text-lg font-bold text-amber-600">45</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function TurfOverview({ turfs, router }) {
  // Sample data for booking sources
  const bookingSourcesData = [
    { name: "Website", value: 120, color: "#3b82f6" },
    { name: "Playo", value: 95, color: "#10b981" },
    { name: "Hudle", value: 75, color: "#8b5cf6" },
    { name: "Offline", value: 52, color: "#f59e0b" },
  ]

  // Sample data for peak hours
  const peakHoursData = [
    { hour: "6-8 AM", bookings: 18 },
    { hour: "8-10 AM", bookings: 12 },
    { hour: "10-12 PM", bookings: 8 },
    { hour: "12-2 PM", bookings: 5 },
    { hour: "2-4 PM", bookings: 7 },
    { hour: "4-6 PM", bookings: 15 },
    { hour: "6-8 PM", bookings: 25 },
    { hour: "8-10 PM", bookings: 22 },
  ]

  // Sample data for revenue by sport
  const revenueBySport = [
    { sport: "Football", revenue: 12500, percentage: 35, color: "from-blue-500 to-blue-600", icon: "⚽" },
    { sport: "Cricket", revenue: 9800, percentage: 28, color: "from-green-500 to-green-600", icon: "🏏" },
    { sport: "Basketball", revenue: 7000, percentage: 20, color: "from-purple-500 to-purple-600", icon: "🏀" },
    { sport: "Tennis", revenue: 4200, percentage: 12, color: "from-amber-500 to-amber-600", icon: "🎾" },
    { sport: "Others", revenue: 1750, percentage: 5, color: "from-gray-500 to-gray-600", icon: "🏆" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Your Turfs</h2>
        <Button onClick={() => router.push("/supplier/turf/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Turf
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {turfs.map((turf) => (
          <Card key={turf.id} className="hover:shadow-md transition-shadow bg-gradient-to-br from-white to-green-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{turf.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="h-3.5 w-3.5 mr-1" />
                {turf.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Calendar className="h-3.5 w-3.5 mr-1 text-blue-600" />
                      Bookings
                    </p>
                    <p className="text-lg font-bold text-blue-700">87</p>
                  </div>
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <DollarSign className="h-3.5 w-3.5 mr-1 text-emerald-600" />
                      Revenue
                    </p>
                    <p className="text-lg font-bold text-emerald-700">₹32K</p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Activity className="h-3.5 w-3.5 mr-1 text-purple-600" />
                      Utilization
                    </p>
                    <p className="text-lg font-bold text-purple-700">68%</p>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-xs text-gray-700 flex items-center">
                      <Star className="h-3.5 w-3.5 mr-1 text-amber-600" />
                      Rating
                    </p>
                    <p className="text-lg font-bold text-amber-700">4.7★</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="w-1/2 bg-white hover:bg-green-50"
                    onClick={() => router.push(`/supplier/turf/${turf.id}`)}
                  >
                    Manage
                  </Button>
                  <Button className="w-1/2" onClick={() => router.push(`/supplier/turf/bookings`)}>
                    Bookings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Revenue by Sport section */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue by Sport</CardTitle>
          <CardDescription>Breakdown of revenue generated by each sport</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4">
            {[
              { sport: "Football", revenue: 12500, percentage: 35, color: "from-blue-500 to-blue-600", icon: "⚽" },
              { sport: "Cricket", revenue: 9800, percentage: 28, color: "from-green-500 to-green-600", icon: "🏏" },
              {
                sport: "Basketball",
                revenue: 7000,
                percentage: 20,
                color: "from-purple-500 to-purple-600",
                icon: "🏀",
              },
              { sport: "Tennis", revenue: 4200, percentage: 12, color: "from-amber-500 to-amber-600", icon: "🎾" },
              { sport: "Others", revenue: 1750, percentage: 5, color: "from-gray-500 to-gray-600", icon: "🏆" },
            ].map((item, index) => (
              <div key={index} className="relative overflow-hidden rounded-xl shadow-sm">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`}></div>
                <div className="relative p-4 flex flex-col h-full text-white">
                  <div className="text-2xl mb-1">{item.icon}</div>
                  <div className="text-sm font-medium mt-auto">{item.sport}</div>
                  <div className="text-lg font-bold">₹{(item.revenue / 1000).toFixed(1)}K</div>
                  <div className="text-xs opacity-80">{item.percentage}% of total</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-800">Total Revenue</span>
              <span className="font-bold text-emerald-600">₹35,250</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Booking Sources</CardTitle>
            <CardDescription>Distribution of bookings by platform</CardDescription>
          </CardHeader>
          <CardContent>
            <BookingSourcesChart data={bookingSourcesData} />
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full">
              <div className="text-center">
                <p className="text-xs text-gray-500">Website</p>
                <p className="text-lg font-bold text-blue-600">120</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Playo</p>
                <p className="text-lg font-bold text-emerald-600">95</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Hudle</p>
                <p className="text-lg font-bold text-purple-600">75</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Offline</p>
                <p className="text-lg font-bold text-amber-600">52</p>
              </div>
            </div>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
            <CardDescription>Booking distribution by time of day</CardDescription>
          </CardHeader>
          <CardContent>
            <PeakHoursChart data={peakHoursData} />
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-700">Peak Time</p>
                    <p className="text-lg font-bold text-blue-700">6-8 PM</p>
                  </div>
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-700">Avg. Duration</p>
                    <p className="text-lg font-bold text-emerald-700">1.5 hrs</p>
                  </div>
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Add Court Utilization by Day section */}
      <Card>
        <CardHeader>
          <CardTitle>Court Utilization by Day</CardTitle>
          <CardDescription>Booking patterns throughout the week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 text-center">
            {[
              { day: "Mon", percentage: 65, bookings: 12 },
              { day: "Tue", percentage: 48, bookings: 9 },
              { day: "Wed", percentage: 52, bookings: 10 },
              { day: "Thu", percentage: 58, bookings: 11 },
              { day: "Fri", percentage: 72, bookings: 14 },
              { day: "Sat", percentage: 95, bookings: 18 },
              { day: "Sun", percentage: 88, bookings: 17 },
            ].map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="font-medium text-gray-700 mb-2">{day.day}</div>
                <div className="relative w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <div
                    className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                    style={{ height: `${day.percentage}%` }}
                  ></div>
                </div>
                <div className="mt-2 text-sm font-medium">{day.percentage}%</div>
                <div className="text-xs text-gray-500">{day.bookings} bookings</div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <p className="text-sm text-gray-700">Busiest Day</p>
                <p className="text-lg font-bold text-blue-700">Saturday</p>
                <p className="text-xs text-blue-600">95% utilization</p>
              </div>
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <p className="text-sm text-gray-700">Slowest Day</p>
                <p className="text-lg font-bold text-amber-700">Tuesday</p>
                <p className="text-xs text-amber-600">48% utilization</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                <p className="text-sm text-gray-700">Weekly Average</p>
                <p className="text-lg font-bold text-emerald-700">68%</p>
                <p className="text-xs text-emerald-600">↑ 5% from last week</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
