"use client"

import { BookingSourcesChart } from "@/components/dashboard/supplier/booking-sources-chart"
import { PeakHoursChart } from "@/components/dashboard/supplier/peak-hours-chart"
import { RevenueChart } from "@/components/dashboard/supplier/revenue-chart"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/hooks/use-toast"
import { getAcademyCoachFeedback, getAcademyMonthlyMetrics } from "@/services/academyAnalyticsService"
import { getSupplierAnalyticsOverview } from "@/services/analyticsService"
import { getTurfMonthlyMetrics, getTurfRevenueBySport, getTurfUtilization } from "@/services/turfAnalyticsService"
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  Calendar,
  DollarSign,
  Download,
  Loader2,
  MapPin,
  RefreshCw,
  Star,
  Target,
  Users,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface AnalyticsData {
  overview: {
    totalRevenue: number
    totalBookings: number
    averageRating: number
    totalCustomers: number
    revenueGrowth: number
    bookingsGrowth: number
    ratingGrowth: number
    customersGrowth: number
  }
  academies: {
    totalRevenue: number
    totalStudents: number
    averageRating: number
    monthlyMetrics: any[]
    coachFeedback: any[]
  }
  turfs: {
    totalRevenue: number
    totalBookings: number
    utilization: number
    monthlyMetrics: any[]
    revenueBySport: any[]
  }
  monthlyBreakdown: any[]
  bookingSources: any[]
  peakHours: any[]
}

export default function SupplierAnalyticsPage() {
  const router = useRouter()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [timeRange, setTimeRange] = useState("6")
  const [activeTab, setActiveTab] = useState("overview")

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      // Fetch overview data
      const overviewResult = await getSupplierAnalyticsOverview(Number.parseInt(timeRange))

      // Fetch academy data
      const academyMetricsResult = await getAcademyMonthlyMetrics("academy-1", Number.parseInt(timeRange))
      const academyFeedbackResult = await getAcademyCoachFeedback("academy-1")

      // Fetch turf data
      const turfMetricsResult = await getTurfMonthlyMetrics("turf-1", Number.parseInt(timeRange))
      const turfUtilizationResult = await getTurfUtilization("turf-1")
      const turfRevenueBySportResult = await getTurfRevenueBySport("turf-1", Number.parseInt(timeRange))

      if (overviewResult.success && overviewResult.data) {
        const overview = overviewResult.data
        const monthlyData = overview.monthlyBreakdown || []

        // Calculate growth rates
        const lastMonth = monthlyData[monthlyData.length - 1]
        const previousMonth = monthlyData[monthlyData.length - 2]

        const revenueGrowth =
          previousMonth && lastMonth ? ((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100 : 0

        const bookingsGrowth =
          previousMonth && lastMonth
            ? ((lastMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100
            : 0

        const totalRevenue = monthlyData.reduce((sum, month) => sum + month.revenue, 0)
        const totalBookings = monthlyData.reduce((sum, month) => sum + month.bookings, 0)

        setAnalyticsData({
          overview: {
            totalRevenue,
            totalBookings,
            averageRating: 4.6,
            totalCustomers: 1250,
            revenueGrowth,
            bookingsGrowth,
            ratingGrowth: 2.3,
            customersGrowth: 8.7,
          },
          academies: {
            totalRevenue: academyMetricsResult.success
              ? academyMetricsResult.data?.reduce((sum, m) => sum + m.revenue, 0) || 0
              : 0,
            totalStudents: 450,
            averageRating: academyFeedbackResult.success ? academyFeedbackResult.data?.averageRating || 4.5 : 4.5,
            monthlyMetrics: academyMetricsResult.success ? academyMetricsResult.data || [] : [],
            coachFeedback: academyFeedbackResult.success ? academyFeedbackResult.data?.feedback || [] : [],
          },
          turfs: {
            totalRevenue: turfMetricsResult.success
              ? turfMetricsResult.data?.reduce((sum, m) => sum + m.revenue, 0) || 0
              : 0,
            totalBookings: turfMetricsResult.success
              ? turfMetricsResult.data?.reduce((sum, m) => sum + m.bookings, 0) || 0
              : 0,
            utilization: turfUtilizationResult.success ? turfUtilizationResult.data?.currentUtilization || 0 : 0,
            monthlyMetrics: turfMetricsResult.success ? turfMetricsResult.data || [] : [],
            revenueBySport: turfRevenueBySportResult.success ? turfRevenueBySportResult.data || [] : [],
          },
          monthlyBreakdown: monthlyData,
          bookingSources: [
            { name: "Direct Website", value: 145, color: "#3b82f6" },
            { name: "Partner Apps", value: 87, color: "#10b981" },
            { name: "Referrals", value: 65, color: "#8b5cf6" },
            { name: "Walk-ins", value: 45, color: "#f59e0b" },
          ],
          peakHours: [
            { hour: "6-8 AM", bookings: 18 },
            { hour: "8-10 AM", bookings: 12 },
            { hour: "10-12 PM", bookings: 8 },
            { hour: "12-2 PM", bookings: 5 },
            { hour: "2-4 PM", bookings: 7 },
            { hour: "4-6 PM", bookings: 15 },
            { hour: "6-8 PM", bookings: 25 },
            { hour: "8-10 PM", bookings: 22 },
          ],
        })

        toast({
          title: "Success",
          description: "Analytics data loaded successfully",
        })
      } else {
        throw new Error("Failed to fetch analytics data")
      }
    } catch (error) {
      console.error("Error fetching analytics:", error)
      toast({
        title: "Error",
        description: "Failed to load analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await fetchAnalyticsData()
  }

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your analytics report is being generated",
    })
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [timeRange])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading analytics data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">Last 3 months</SelectItem>
              <SelectItem value="6">Last 6 months</SelectItem>
              <SelectItem value="12">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
            Refresh
          </Button>
          <Button variant="outline" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Overview */}
      {analyticsData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{analyticsData.overview.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {analyticsData.overview.revenueGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={analyticsData.overview.revenueGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                  {Math.abs(analyticsData.overview.revenueGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalBookings.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {analyticsData.overview.bookingsGrowth >= 0 ? (
                  <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                )}
                <span className={analyticsData.overview.bookingsGrowth >= 0 ? "text-green-600" : "text-red-600"}>
                  {Math.abs(analyticsData.overview.bookingsGrowth).toFixed(1)}%
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.averageRating.toFixed(1)}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-600">{analyticsData.overview.ratingGrowth.toFixed(1)}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.overview.totalCustomers.toLocaleString()}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                <span className="text-green-600">{analyticsData.overview.customersGrowth.toFixed(1)}%</span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="academies">Academies</TabsTrigger>
          <TabsTrigger value="turfs">Turfs</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trends</CardTitle>
                <CardDescription>Monthly revenue and booking trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <RevenueChart data={analyticsData?.monthlyBreakdown} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Booking Sources</CardTitle>
                <CardDescription>Distribution of bookings by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BookingSourcesChart data={analyticsData?.bookingSources} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Peak Hours Analysis</CardTitle>
                <CardDescription>Booking distribution by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <PeakHoursChart data={analyticsData?.peakHours} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Summary</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Academy Revenue</p>
                        <p className="text-xl font-bold text-blue-700">
                          ₹{analyticsData?.academies.totalRevenue.toLocaleString()}
                        </p>
                      </div>
                      <Building2 className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Turf Revenue</p>
                        <p className="text-xl font-bold text-green-700">
                          ₹{analyticsData?.turfs.totalRevenue.toLocaleString()}
                        </p>
                      </div>
                      <MapPin className="h-8 w-8 text-green-600" />
                    </div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Students</p>
                        <p className="text-xl font-bold text-purple-700">{analyticsData?.academies.totalStudents}</p>
                      </div>
                      <Users className="h-8 w-8 text-purple-600" />
                    </div>
                  </div>
                  <div className="bg-amber-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Turf Utilization</p>
                        <p className="text-xl font-bold text-amber-700">
                          {analyticsData?.turfs.utilization.toFixed(1)}%
                        </p>
                      </div>
                      <Activity className="h-8 w-8 text-amber-600" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Detailed revenue breakdown and trends</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <RevenueChart data={analyticsData?.monthlyBreakdown} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>Key revenue indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Average Monthly Revenue</span>
                    <span className="font-bold">
                      ₹{Math.round(analyticsData?.overview.totalRevenue / Number.parseInt(timeRange)).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Revenue per Booking</span>
                    <span className="font-bold">
                      ₹
                      {Math.round(
                        analyticsData?.overview.totalRevenue / analyticsData?.overview.totalBookings,
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Academy Contribution</span>
                    <span className="font-bold">
                      {((analyticsData?.academies.totalRevenue / analyticsData?.overview.totalRevenue) * 100).toFixed(
                        1,
                      )}
                      %
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Turf Contribution</span>
                    <span className="font-bold">
                      {((analyticsData?.turfs.totalRevenue / analyticsData?.overview.totalRevenue) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Growth Trends</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Revenue Growth</span>
                      <Badge variant={analyticsData?.overview.revenueGrowth >= 0 ? "default" : "destructive"}>
                        {analyticsData?.overview.revenueGrowth >= 0 ? "+" : ""}
                        {analyticsData?.overview.revenueGrowth.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Booking Growth</span>
                      <Badge variant={analyticsData?.overview.bookingsGrowth >= 0 ? "default" : "destructive"}>
                        {analyticsData?.overview.bookingsGrowth >= 0 ? "+" : ""}
                        {analyticsData?.overview.bookingsGrowth.toFixed(1)}%
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="academies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Academy Revenue</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{analyticsData?.academies.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((analyticsData?.academies.totalRevenue / analyticsData?.overview.totalRevenue) * 100).toFixed(1)}%
                  of total revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.academies.totalStudents}</div>
                <p className="text-xs text-muted-foreground">Across all academies</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Academy Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.academies.averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">Average across all academies</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Academy Performance</CardTitle>
              <CardDescription>Monthly metrics and trends for your academies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <RevenueChart data={analyticsData?.academies.monthlyMetrics} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Coach Feedback</CardTitle>
                <CardDescription>Recent feedback from academy coaches</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.academies.coachFeedback.length > 0 ? (
                  <div className="space-y-4">
                    {analyticsData.academies.coachFeedback.slice(0, 3).map((feedback, index) => (
                      <div key={index} className="border-l-4 border-blue-500 pl-4">
                        <p className="text-sm text-gray-600">{feedback.comment}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-gray-500">Coach: {feedback.coachName}</span>
                          <div className="flex items-center ml-auto">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs ml-1">{feedback.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No feedback available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Manage your academies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" onClick={() => router.push("/supplier/academy/add")}>
                  <Building2 className="h-4 w-4 mr-2" />
                  Add New Academy
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/supplier/invitations")}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Invite Coaches
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="h-4 w-4 mr-2" />
                  Create Batch
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="turfs" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Turf Revenue</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">₹{analyticsData?.turfs.totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  {((analyticsData?.turfs.totalRevenue / analyticsData?.overview.totalRevenue) * 100).toFixed(1)}% of
                  total revenue
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.turfs.totalBookings}</div>
                <p className="text-xs text-muted-foreground">Across all turfs</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{analyticsData?.turfs.utilization.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">Average across all turfs</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Turf Performance</CardTitle>
              <CardDescription>Monthly metrics and trends for your turfs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <RevenueChart data={analyticsData?.turfs.monthlyMetrics} />
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Sport</CardTitle>
                <CardDescription>Sport-wise revenue breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                {analyticsData?.turfs.revenueBySport.length > 0 ? (
                  <div className="space-y-4">
                    {analyticsData.turfs.revenueBySport.map((sport, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="font-medium">{sport.sport}</span>
                        <div className="text-right">
                          <div className="font-bold">₹{sport.revenue.toLocaleString()}</div>
                          <div className="text-xs text-gray-500">{sport.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No sport data available</p>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Peak Hours</CardTitle>
                <CardDescription>Busiest times for your turfs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  <PeakHoursChart data={analyticsData?.peakHours} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
