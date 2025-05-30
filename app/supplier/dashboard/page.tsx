"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Calendar,
  DollarSign,
  Users,
  Plus,
  Building2,
  MapPin,
  Clock,
  Star,
  Activity,
  User,
  AlertCircle,
  CheckCircle,
  RefreshCw,
  MessageSquare,
  ImageIcon,
  BookOpen,
  Video,
  HelpCircle,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { KpiCards } from "@/components/dashboard/supplier/kpi-cards"
import { RecentBookings } from "@/components/dashboard/supplier/recent-bookings"
import { FeeReminders } from "@/components/dashboard/supplier/fee-reminders"
import { QuickActions } from "@/components/dashboard/supplier/quick-actions"
import { RevenueChart } from "@/components/dashboard/supplier/revenue-chart"
import { BookingSourcesChart } from "@/components/dashboard/supplier/booking-sources-chart"
import { PeakHoursChart } from "@/components/dashboard/supplier/peak-hours-chart"
import {
  getOnboardingState,
  getSupplierModules,
  markProfileCompleted,
  markAcademyAdded,
  markTurfAdded,
  markCoachAdded,
  markAcademyVerified,
} from "@/services/authService"

export default function SupplierDashboard() {
  const router = useRouter()
  const [onboardingState, setOnboardingState] = useState({
    profileCompleted: false,
    academyAdded: false,
    turfAdded: false,
    coachAdded: false,
    anyEntityAdded: false,
    academyVerified: false,
  })
  const [supplierModules, setSupplierModules] = useState({
    academy: { enabled: false, entities: [] },
    turf: { enabled: false, entities: [] },
    coach: { enabled: false, entities: [] },
  })
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Navigation guard - redirect to profile if not completed
    const state = getOnboardingState()
    if (!state.profileCompleted) {
      router.push("/supplier/profile?newUser=true")
      return
    }

    // Get onboarding state and supplier modules
    const modules = getSupplierModules()

    setOnboardingState(state)
    setSupplierModules(modules)

    // Set default tab based on state
    if (!state.profileCompleted) {
      setActiveTab("profile-required")
    } else if (!state.anyEntityAdded) {
      setActiveTab("getting-started")
    } else if (state.anyEntityAdded && !state.academyVerified) {
      setActiveTab("verification-pending")
    } else {
      setActiveTab("overview")
    }
  }, [router])

  // Full dashboard - everything is verified
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

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 lg:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          {supplierModules.academy.enabled && supplierModules.academy.entities.length > 0 && (
            <TabsTrigger value="academy">Academy</TabsTrigger>
          )}
          {supplierModules.turf.enabled && supplierModules.turf.entities.length > 0 && (
            <TabsTrigger value="turf">Turf</TabsTrigger>
          )}
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
    </div>
  )
}

// Profile completion required component
function ProfileCompletionRequired({ router }) {
  const handleCompleteProfile = () => {
    // For demo purposes, mark profile as completed
    markProfileCompleted()
    router.push("/supplier/profile")
  }

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <AlertCircle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Please complete your profile to access all supplier features and start managing your business.
        </AlertDescription>
      </Alert>

      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-none shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User size={36} className="text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Complete Your Profile</CardTitle>
          <CardDescription className="text-gray-600 text-lg mt-2">
            Set up your business information to get started
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center px-6 py-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              Your profile helps customers find and trust your business. Complete your profile to unlock:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Building2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-800">Business Management</h3>
                <p className="text-sm text-gray-600">Manage academies, turfs, and coaching services</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Calendar className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-800">Booking System</h3>
                <p className="text-sm text-gray-600">Accept and manage customer bookings</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <DollarSign className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-800">Payment Processing</h3>
                <p className="text-sm text-gray-600">Secure payment collection and tracking</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <Activity className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-medium text-gray-800">Analytics & Insights</h3>
                <p className="text-sm text-gray-600">Track performance and grow your business</p>
              </div>
            </div>
          </div>

          <Button size="lg" onClick={handleCompleteProfile} className="bg-blue-600 hover:bg-blue-700">
            Complete Your Profile
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

// Getting started component
function GettingStartedDashboard({ router }) {
  const handleAddAcademy = () => {
    markAcademyAdded()
    router.push("/supplier/academy/add")
  }

  const handleAddTurf = () => {
    markTurfAdded()
    router.push("/supplier/turf/add")
  }

  const handleAddCoach = () => {
    markCoachAdded()
    router.push("/supplier/coach/add")
  }

  return (
    <div className="space-y-6">
      <Alert className="border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Great! Your profile is complete. Now choose what you'd like to add to your DreamSports platform.
        </AlertDescription>
      </Alert>

      <Card className="bg-gradient-to-br from-emerald-50 to-blue-50 border-none shadow-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">What would you like to add?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Choose one or more options to start building your presence on DreamSports. You can always add more later.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building2 className="h-6 w-6 mr-2 text-emerald-600 group-hover:text-emerald-700" />
                  Sports Academy
                </CardTitle>
                <CardDescription>
                  Manage students, batches, training programs, and fees for your sports academy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Building2 className="h-12 w-12 text-emerald-600" />
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Student enrollment management</li>
                  <li>• Batch scheduling and tracking</li>
                  <li>• Fee collection and reminders</li>
                  <li>• Performance analytics</li>
                </ul>
                <Button className="w-full" onClick={handleAddAcademy}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Academy
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-6 w-6 mr-2 text-blue-600 group-hover:text-blue-700" />
                  Sports Turf
                </CardTitle>
                <CardDescription>
                  Manage court bookings, time slots, and facility rentals for your sports turf
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-12 w-12 text-blue-600" />
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Court booking management</li>
                  <li>• Time slot configuration</li>
                  <li>• Pricing and availability</li>
                  <li>• Utilization analytics</li>
                </ul>
                <Button className="w-full" onClick={handleAddTurf}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Turf
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-6 w-6 mr-2 text-purple-600 group-hover:text-purple-700" />
                  Coaching Services
                </CardTitle>
                <CardDescription>Offer personal coaching, manage schedules, and track student progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center">
                    <Users className="h-12 w-12 text-purple-600" />
                  </div>
                </div>
                <ul className="text-sm text-gray-600 space-y-1 mb-4">
                  <li>• Personal coaching sessions</li>
                  <li>• Schedule management</li>
                  <li>• Student progress tracking</li>
                  <li>• Performance reports</li>
                </ul>
                <Button className="w-full" onClick={handleAddCoach}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Coaching
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              You can add multiple services and manage them all from your dashboard
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Verification pending component
function VerificationPendingDashboard({ router, onboardingState }) {
  const handleSimulateVerification = () => {
    // For demo purposes, mark as verified
    markAcademyVerified()
    window.location.reload()
  }

  const getAddedServices = () => {
    const services = []
    if (onboardingState.academyAdded) services.push("Academy")
    if (onboardingState.turfAdded) services.push("Turf")
    if (onboardingState.coachAdded) services.push("Coaching")
    return services
  }

  const addedServices = getAddedServices()

  return (
    <div className="space-y-6">
      <Alert className="border-amber-200 bg-amber-50">
        <Clock className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          Your {addedServices.join(", ")} {addedServices.length > 1 ? "are" : "is"} currently under review. Verification
          typically takes 1-2 business days.
        </AlertDescription>
      </Alert>

      <Card className="border-none shadow-lg bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="pb-2">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <Clock size={32} className="text-amber-600" />
          </div>
          <CardTitle className="text-xl text-center">Verification in Progress</CardTitle>
          <CardDescription className="text-center">
            Your {addedServices.join(" and ")} {addedServices.length > 1 ? "are" : "is"} currently under review
          </CardDescription>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-medium text-gray-800 mb-3">Services Under Review:</h3>
            <div className="space-y-2">
              {onboardingState.academyAdded && (
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <div className="flex items-center">
                    <Building2 className="h-5 w-5 text-amber-600 mr-2" />
                    <span className="font-medium">Sports Academy</span>
                  </div>
                  <span className="text-xs bg-amber-200 text-amber-800 px-2 py-1 rounded-full">Pending</span>
                </div>
              )}
              {onboardingState.turfAdded && (
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-blue-600 mr-2" />
                    <span className="font-medium">Sports Turf</span>
                  </div>
                  <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Pending</span>
                </div>
              )}
              {onboardingState.coachAdded && (
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-purple-600 mr-2" />
                    <span className="font-medium">Coaching Services</span>
                  </div>
                  <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded-full">Pending</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <h3 className="font-medium text-gray-800 mb-3">What happens during verification?</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <CheckCircle size={12} className="text-amber-600" />
                </div>
                Our team reviews your business details for accuracy and completeness
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <CheckCircle size={12} className="text-amber-600" />
                </div>
                We may contact you for additional information if needed
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 bg-amber-100 rounded-full p-1">
                  <CheckCircle size={12} className="text-amber-600" />
                </div>
                Once verified, you'll gain full access to all dashboard features
              </li>
            </ul>
          </div>

          <div className="text-center">
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
              <Button variant="outline" onClick={handleSimulateVerification}>
                Simulate Verification (Demo)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Complete Your Setup</CardTitle>
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
                <p className="text-sm text-blue-600 mt-1">Learn about our policies and best practices</p>
                <Button variant="link" className="text-blue-700 p-0 h-auto mt-2">
                  Read Guidelines
                </Button>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-700 flex items-center">
                  <Video className="h-4 w-4 mr-2" />
                  Tutorial Videos
                </h4>
                <p className="text-sm text-emerald-600 mt-1">Watch tutorials on using the dashboard</p>
                <Button variant="link" className="text-emerald-700 p-0 h-auto mt-2">
                  Watch Videos
                </Button>
              </div>

              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-700 flex items-center">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  FAQ
                </h4>
                <p className="text-sm text-purple-600 mt-1">Find answers to common questions</p>
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
    </div>
  )
}

function AnalyticsOverview() {
  const bookingSourcesData = [
    { name: "Website", value: 145, color: "#3b82f6" },
    { name: "Playo", value: 87, color: "#10b981" },
    { name: "Hudle", value: 65, color: "#8b5cf6" },
    { name: "Offline", value: 45, color: "#f59e0b" },
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
  const bookingSourcesData = [
    { name: "Website", value: 120, color: "#3b82f6" },
    { name: "Playo", value: 95, color: "#10b981" },
    { name: "Hudle", value: 75, color: "#8b5cf6" },
    { name: "Offline", value: 52, color: "#f59e0b" },
  ]

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
    </div>
  )
}
