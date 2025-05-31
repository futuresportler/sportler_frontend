"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TooltipProvider } from "@/components/ui/tooltip"
import { toast } from "@/hooks/use-toast"
import {
  ArrowUpRight,
  Calendar,
  CheckCircle,
  ChevronLeft,
  Eye,
  Loader2,
  RefreshCw,
  TrendingUp,
  Users,
} from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

// Import analytics services
import {
  getAcademyBookingPlatforms,
  getAcademyCoachFeedback,
  getAcademyMonthlyMetrics,
  getAcademyPopularPrograms,
} from "@/services/academyAnalyticsService"
import { getFeedbackAnalytics } from "@/services/analyticsService"

// Types
interface AnalyticsData {
  monthlyMetrics: any[]
  coachFeedback: any[]
  bookingPlatforms: any[]
  popularPrograms: any[]
  conversionRates: any[]
  feedbackAnalytics: any
}

export default function AcademyAnalyticsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const academyId = params.id
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    monthlyMetrics: [],
    coachFeedback: [],
    bookingPlatforms: [],
    popularPrograms: [],
    conversionRates: [],
    feedbackAnalytics: null,
  })

  // Fetch analytics data
  const fetchAnalyticsData = async () => {
    try {
      setLoading(true)

      const [
        monthlyMetricsResult,
        coachFeedbackResult,
        bookingPlatformsResult,
        popularProgramsResult,
        feedbackAnalyticsResult,
      ] = await Promise.all([
        getAcademyMonthlyMetrics(academyId),
        getAcademyCoachFeedback(academyId),
        getAcademyBookingPlatforms(academyId, 6),
        getAcademyPopularPrograms(academyId, 5),
        getFeedbackAnalytics("academy", academyId),
      ])

      setAnalyticsData({
        monthlyMetrics: monthlyMetricsResult.success ? monthlyMetricsResult.data || [] : [],
        coachFeedback: coachFeedbackResult.success ? coachFeedbackResult.data?.feedback || [] : [],
        bookingPlatforms: bookingPlatformsResult.success ? bookingPlatformsResult.data || [] : [],
        popularPrograms: popularProgramsResult.success ? popularProgramsResult.data || [] : [],
        conversionRates: [], // Will be populated with conversion rate data
        feedbackAnalytics: feedbackAnalyticsResult.success ? feedbackAnalyticsResult.data : null,
      })

      if (!monthlyMetricsResult.success) {
        toast({
          title: "Error",
          description: monthlyMetricsResult.error || "Failed to fetch monthly metrics",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching analytics data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch analytics data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Refresh analytics data
  const handleRefreshAnalytics = async () => {
    try {
      setRefreshing(true)
      await fetchAnalyticsData()
      toast({
        title: "Success",
        description: "Analytics data refreshed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to refresh analytics data",
        variant: "destructive",
      })
    } finally {
      setRefreshing(false)
    }
  }

  useEffect(() => {
    fetchAnalyticsData()
  }, [academyId, timeRange])

  // Calculate metrics from data
  const calculateMetrics = () => {
    const { monthlyMetrics, feedbackAnalytics } = analyticsData

    const totalEnrollments = monthlyMetrics.reduce((sum, metric) => sum + (metric.enrollments || 0), 0)
    const totalRevenue = monthlyMetrics.reduce((sum, metric) => sum + (metric.revenue || 0), 0)
    const averageRating = feedbackAnalytics?.averageRating || 0
    const totalFeedback = feedbackAnalytics?.totalFeedback || 0

    return {
      totalEnrollments,
      totalRevenue,
      averageRating,
      totalFeedback,
    }
  }

  const metrics = calculateMetrics()

  // Prepare chart data
  const visitsData = analyticsData.monthlyMetrics.map((metric, index) => ({
    name: metric.month || `Month ${index + 1}`,
    value: metric.enrollments || 0,
  }))

  const conversionData = analyticsData.monthlyMetrics.map((metric, index) => ({
    name: metric.month || `Month ${index + 1}`,
    visits: (metric.enrollments || 0) * 10, // Estimated visits
    inquiries: (metric.enrollments || 0) * 3, // Estimated inquiries
    enrollments: metric.enrollments || 0,
  }))

  const sourceData = analyticsData.bookingPlatforms.map((platform, index) => ({
    name: platform.platform || `Platform ${index + 1}`,
    value: platform.bookings || 0,
  }))

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const programPopularityData = analyticsData.popularPrograms.map((program) => ({
    name: program.name || "Unknown Program",
    students: program.enrollments || 0,
  }))

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading analytics data...</span>
        </div>
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/supplier/academy/${academyId}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Academy
              </Link>
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Academy Analytics</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleRefreshAnalytics} disabled={refreshing}>
              {refreshing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
              Refresh
            </Button>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Total Enrollments</span>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.totalEnrollments}</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-emerald-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  Based on monthly data
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Total Revenue</span>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{metrics.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-emerald-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  From all programs
                </span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Average Rating</span>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics.averageRating.toFixed(1)}/5</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">From {metrics.totalFeedback} reviews</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center justify-between">
                <span>Active Programs</span>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analyticsData.popularPrograms.length}</div>
              <div className="flex items-center mt-1">
                <span className="text-xs text-muted-foreground">Popular programs</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="promotion">Promotion</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Monthly Enrollments</CardTitle>
                  <CardDescription>Number of new enrollments over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={visitsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                        <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                        <Tooltip
                          formatter={(value) => [`${value} enrollments`, "Enrollments"]}
                          contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#3b82f6"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>From inquiries to enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={conversionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                        <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                        <Tooltip
                          formatter={(value, name) => {
                            const formattedName =
                              name === "visits" ? "Profile Views" : name === "inquiries" ? "Inquiries" : "Enrollments"
                            return [`${value}`, formattedName]
                          }}
                          contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                        />
                        <Legend />
                        <Bar dataKey="visits" fill="#3b82f6" name="Profile Views" />
                        <Bar dataKey="inquiries" fill="#10b981" name="Inquiries" />
                        <Bar dataKey="enrollments" fill="#8b5cf6" name="Enrollments" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coach Feedback Section */}
            {analyticsData.coachFeedback.length > 0 && (
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Coach Performance</CardTitle>
                  <CardDescription>Feedback ratings for academy coaches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analyticsData.coachFeedback.map((coach, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium">Coach {coach.coachId}</h3>
                        <div className="flex items-center mt-2">
                          <span className="text-2xl font-bold text-yellow-600">{coach.averageRating.toFixed(1)}</span>
                          <span className="text-sm text-muted-foreground ml-2">({coach.totalFeedback} reviews)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Traffic Sources Tab */}
          <TabsContent value="traffic" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Booking Sources</CardTitle>
                  <CardDescription>Where your bookings are coming from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => [`${value} bookings`, "Count"]}
                          contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Platform Breakdown</CardTitle>
                  <CardDescription>Detailed analysis of booking sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sourceData.map((source, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-medium">{source.name}</span>
                          </div>
                          <span className="font-bold">{source.value} bookings</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${(source.value / Math.max(...sourceData.map((s) => s.value))) * 100}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Program Popularity</CardTitle>
                <CardDescription>Enrollment distribution across programs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={programPopularityData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis type="number" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fill: "#6b7280" }}
                        axisLine={{ stroke: "#e5e7eb" }}
                      />
                      <Tooltip
                        formatter={(value) => [`${value} students`, "Enrolled"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      />
                      <Bar dataKey="students" fill="#8b5cf6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Program Performance Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Program Performance</CardTitle>
                  <CardDescription>Detailed metrics by program</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.popularPrograms.map((program, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <h3 className="font-medium">{program.name}</h3>
                        <div className="grid grid-cols-2 gap-4 mt-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Enrollments</span>
                            <div className="font-bold">{program.enrollments}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Program ID</span>
                            <div className="font-bold">{program.programId}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Program Recommendations</CardTitle>
                  <CardDescription>Suggestions to improve program performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <TrendingUp className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Promote Top Programs</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Focus marketing efforts on your most popular programs to maximize enrollment.
                          </p>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border">
                      <div className="flex items-start gap-3">
                        <div className="bg-emerald-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Expand Successful Programs</h3>
                          <p className="text-sm text-muted-foreground mb-2">
                            Consider adding more batches for programs with high enrollment.
                          </p>
                          <Button variant="outline" size="sm">
                            Add Batches
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Promotion Tab */}
          <TabsContent value="promotion" className="space-y-6">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Boost Your Academy</CardTitle>
                <CardDescription className="text-blue-700">
                  Increase visibility and attract more students with our promotion options
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-white border-2 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Basic Boost</CardTitle>
                      <CardDescription>Increase visibility in search results</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold mb-2">
                        ₹999<span className="text-sm font-normal">/month</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Higher ranking in search results
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          "Featured" badge on your profile
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Basic analytics dashboard
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Select Plan</Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-white border-2 border-indigo-300 relative">
                    <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
                      POPULAR
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Premium Boost</CardTitle>
                      <CardDescription>Featured placement and enhanced visibility</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold mb-2">
                        ₹2,499<span className="text-sm font-normal">/month</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          All Basic Boost features
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Featured in "Recommended Academies"
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Priority in search results
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Advanced analytics dashboard
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700">Select Plan</Button>
                    </CardFooter>
                  </Card>

                  <Card className="bg-white border-2 border-blue-200">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Elite Boost</CardTitle>
                      <CardDescription>Maximum visibility and premium features</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-3xl font-bold mb-2">
                        ₹4,999<span className="text-sm font-normal">/month</span>
                      </div>
                      <ul className="space-y-2 mb-4">
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          All Premium Boost features
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Featured on homepage banner
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Email marketing to potential students
                        </li>
                        <li className="flex items-center text-sm">
                          <CheckCircle className="h-4 w-4 text-emerald-600 mr-2" />
                          Dedicated account manager
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Select Plan</Button>
                    </CardFooter>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </TooltipProvider>
  )
}
