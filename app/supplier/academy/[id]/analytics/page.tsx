"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  ArrowUpRight,
  TrendingUp,
  Eye,
  MousePointer,
  Calendar,
  Users,
  Zap,
  HelpCircle,
  CheckCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip as UITooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function AcademyAnalyticsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const academyId = params.id
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for analytics
  const visitsData = [
    { name: "Apr 1", value: 120 },
    { name: "Apr 5", value: 150 },
    { name: "Apr 10", value: 180 },
    { name: "Apr 15", value: 220 },
    { name: "Apr 20", value: 250 },
    { name: "Apr 25", value: 280 },
    { name: "Apr 30", value: 310 },
  ]

  const conversionData = [
    { name: "Apr 1", visits: 120, inquiries: 24, enrollments: 8 },
    { name: "Apr 5", visits: 150, inquiries: 30, enrollments: 12 },
    { name: "Apr 10", visits: 180, inquiries: 45, enrollments: 18 },
    { name: "Apr 15", visits: 220, inquiries: 55, enrollments: 22 },
    { name: "Apr 20", visits: 250, inquiries: 62, enrollments: 25 },
    { name: "Apr 25", visits: 280, inquiries: 70, enrollments: 28 },
    { name: "Apr 30", visits: 310, inquiries: 78, enrollments: 32 },
  ]

  const sourceData = [
    { name: "Direct Search", value: 45 },
    { name: "Social Media", value: 25 },
    { name: "Referrals", value: 15 },
    { name: "Ads", value: 10 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  const programPopularityData = [
    { name: "Junior Cricket", students: 45 },
    { name: "Advanced Batting", students: 32 },
    { name: "Fast Bowling", students: 28 },
    { name: "Cricket Fitness", students: 20 },
    { name: "Weekend Camp", students: 15 },
  ]

  return (
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
              <span>Profile Views</span>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,542</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                12.5%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Inquiries</span>
              <MousePointer className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                8.3%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Enrollments</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                15.2%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Conversion Rate</span>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">31.8%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                3.5%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
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
                <CardTitle>Profile Views</CardTitle>
                <CardDescription>Number of times your academy profile was viewed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={visitsData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <Tooltip
                        formatter={(value) => [`${value} views`, "Views"]}
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
                <CardDescription>From profile views to enrollments</CardDescription>
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

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>Key metrics for your academy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Click-to-Inquiry Rate</h4>
                      <p className="text-2xl font-bold">6.9%</p>
                    </div>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">Percentage of profile views that result in an inquiry</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Previous: 5.8%</span>
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      1.1%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "69%" }}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Inquiry-to-Enrollment Rate</h4>
                      <p className="text-2xl font-bold">31.8%</p>
                    </div>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">Percentage of inquiries that convert to enrollments</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Previous: 28.3%</span>
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      3.5%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "31.8%" }}></div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium">Overall Conversion Rate</h4>
                      <p className="text-2xl font-bold">2.2%</p>
                    </div>
                    <TooltipProvider>
                      <UITooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="w-[200px] text-xs">Percentage of profile views that convert to enrollments</p>
                        </TooltipContent>
                      </UITooltip>
                    </TooltipProvider>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Previous: 1.6%</span>
                    <span className="text-emerald-600 flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      0.6%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Traffic Sources Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your profile views are coming from</CardDescription>
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
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Traffic Breakdown</CardTitle>
                <CardDescription>Detailed analysis of your traffic sources</CardDescription>
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
                        <span className="font-bold">{source.value}%</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${source.value}%`,
                            backgroundColor: COLORS[index % COLORS.length],
                          }}
                        ></div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {index === 0 && "Direct searches on DreamSports platform"}
                        {index === 1 && "From social media platforms (Instagram, Facebook)"}
                        {index === 2 && "Referred by other users or websites"}
                        {index === 3 && "From paid advertisements"}
                        {index === 4 && "Other sources"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Ways to improve your traffic and visibility</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Optimize Your Profile</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Complete all sections of your profile and add high-quality images to improve visibility in search
                    results.
                  </p>
                  <Button variant="outline" className="bg-white text-blue-700 border-blue-300">
                    Edit Profile
                  </Button>
                </div>

                <div className="p-4 rounded-lg border bg-emerald-50 border-emerald-200">
                  <h3 className="font-medium text-emerald-800 mb-2">Increase Social Media Presence</h3>
                  <p className="text-sm text-emerald-700 mb-3">
                    Share your academy profile on social media platforms to drive more traffic.
                  </p>
                  <Button variant="outline" className="bg-white text-emerald-700 border-emerald-300">
                    Share Profile
                  </Button>
                </div>

                <div className="p-4 rounded-lg border bg-purple-50 border-purple-200">
                  <h3 className="font-medium text-purple-800 mb-2">Run Targeted Ads</h3>
                  <p className="text-sm text-purple-700 mb-3">
                    Create targeted ads to reach potential students in your area.
                  </p>
                  <Button variant="outline" className="bg-white text-purple-700 border-purple-300">
                    Create Ad
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
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
                    <YAxis dataKey="name" type="category" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Program Performance</CardTitle>
                <CardDescription>Conversion rates by program</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    { name: "Junior Cricket", views: 850, inquiries: 120, enrollments: 45, conversionRate: 5.3 },
                    { name: "Advanced Batting", views: 620, inquiries: 85, enrollments: 32, conversionRate: 5.2 },
                    { name: "Fast Bowling", views: 580, inquiries: 72, enrollments: 28, conversionRate: 4.8 },
                    { name: "Cricket Fitness", views: 420, inquiries: 55, enrollments: 20, conversionRate: 4.8 },
                    { name: "Weekend Camp", views: 320, inquiries: 40, enrollments: 15, conversionRate: 4.7 },
                  ].map((program, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{program.name}</h3>
                        <span className="text-sm font-bold text-emerald-600">{program.conversionRate}% CR</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Views</span>
                          <span className="font-medium">{program.views}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Inquiries</span>
                          <span className="font-medium">{program.inquiries}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Enrollments</span>
                          <span className="font-medium">{program.enrollments}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{ width: `${(program.enrollments / program.views) * 100 * 5}%` }}
                        ></div>
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
                        <h3 className="font-medium mb-1">Highlight Junior Cricket Program</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          This is your best performing program. Consider featuring it prominently on your profile.
                        </p>
                        <Button variant="outline" size="sm">
                          Feature Program
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Add More Weekend Camp Sessions</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Weekend Camp has a good conversion rate but lower views. Consider adding more sessions.
                        </p>
                        <Button variant="outline" size="sm">
                          Add Sessions
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
                        <h3 className="font-medium mb-1">Improve Fast Bowling Program Description</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          This program has good views but lower conversion. Enhance the description and add
                          testimonials.
                        </p>
                        <Button variant="outline" size="sm">
                          Edit Description
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Promotional Tools</CardTitle>
                <CardDescription>Additional ways to promote your academy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Zap className="h-5 w-5 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Limited-Time Offer</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Create a special offer or discount to attract new students.
                        </p>
                        <Button variant="outline" size="sm">
                          Create Offer
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Users className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Referral Program</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Encourage existing students to refer friends and family.
                        </p>
                        <Button variant="outline" size="sm">
                          Setup Referrals
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg border">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-full">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Free Trial Session</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          Offer a free trial session to potential students.
                        </p>
                        <Button variant="outline" size="sm">
                          Setup Trial
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Promotion Performance</CardTitle>
                <CardDescription>Track the performance of your promotions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Summer Camp Promotion</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Views</span>
                        <span className="font-medium">245</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Clicks</span>
                        <span className="font-medium">78</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Enrollments</span>
                        <span className="font-medium">12</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Click-through rate: 31.8%</span>
                      <span className="text-emerald-600">Conversion: 15.4%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Early Bird Discount</h3>
                      <Badge className="bg-amber-100 text-amber-800">Ended</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Views</span>
                        <span className="font-medium">180</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Clicks</span>
                        <span className="font-medium">65</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Enrollments</span>
                        <span className="font-medium">8</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Click-through rate: 36.1%</span>
                      <span className="text-emerald-600">Conversion: 12.3%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Referral Program</h3>
                      <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Referrals</span>
                        <span className="font-medium">32</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Inquiries</span>
                        <span className="font-medium">18</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-muted-foreground">Enrollments</span>
                        <span className="font-medium">7</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Inquiry rate: 56.3%</span>
                      <span className="text-emerald-600">Conversion: 38.9%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
