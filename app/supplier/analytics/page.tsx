"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ArrowUpRight, TrendingUp, Eye, MousePointer, CreditCard, Users, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export default function AnalyticsPage() {
  const router = useRouter()
  const [timeRange, setTimeRange] = useState("30days")
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for analytics
  const revenueData = [
    { name: "Apr 1", value: 12500 },
    { name: "Apr 5", value: 15000 },
    { name: "Apr 10", value: 18000 },
    { name: "Apr 15", value: 22000 },
    { name: "Apr 20", value: 25000 },
    { name: "Apr 25", value: 28000 },
    { name: "Apr 30", value: 31000 },
  ]

  const enrollmentData = [
    { name: "Apr 1", value: 120 },
    { name: "Apr 5", value: 135 },
    { name: "Apr 10", value: 148 },
    { name: "Apr 15", value: 162 },
    { name: "Apr 20", value: 175 },
    { name: "Apr 25", value: 188 },
    { name: "Apr 30", value: 200 },
  ]

  const academyPerformanceData = [
    { name: "Premier Cricket Academy", views: 1250, inquiries: 180, enrollments: 45, revenue: 125000 },
    { name: "Elite Tennis School", views: 980, inquiries: 145, enrollments: 32, revenue: 96000 },
  ]

  const platformData = [
    { name: "Website", value: 45 },
    { name: "Mobile App", value: 35 },
    { name: "Referrals", value: 15 },
    { name: "Other", value: 5 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics Overview</h1>
          <p className="text-gray-600">Track performance across all your academies and turfs</p>
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
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span>Total Revenue</span>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹2,21,000</div>
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
              <span>Total Enrollments</span>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200</div>
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
              <span>Profile Views</span>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4,522</div>
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
            <div className="text-2xl font-bold">4.4%</div>
            <div className="flex items-center mt-1">
              <span className="text-xs text-emerald-600 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                0.5%
              </span>
              <span className="text-xs text-muted-foreground ml-1">vs last period</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="academies">Academies</TabsTrigger>
          <TabsTrigger value="platforms">Platforms</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue across all academies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <Tooltip
                        formatter={(value) => [`₹${value}`, "Revenue"]}
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
                <CardTitle>Enrollment Trend</CardTitle>
                <CardDescription>Monthly enrollments across all academies</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={enrollmentData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <YAxis tick={{ fill: "#6b7280" }} axisLine={{ stroke: "#e5e7eb" }} />
                      <Tooltip
                        formatter={(value) => [`${value} students`, "Enrollments"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Platform Distribution</CardTitle>
              <CardDescription>Where your enrollments are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={platformData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {platformData.map((entry, index) => (
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
                </div>
                <div className="lg:col-span-2">
                  <div className="space-y-4">
                    {platformData.map((platform, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div
                              className="w-3 h-3 rounded-full mr-2"
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="font-medium">{platform.name}</span>
                          </div>
                          <span className="font-bold">{platform.value}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2">
                          <div
                            className="h-2 rounded-full"
                            style={{
                              width: `${platform.value}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          ></div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {index === 0 && "Direct enrollments through your website profile"}
                          {index === 1 && "Enrollments through the mobile app"}
                          {index === 2 && "Referred by existing students or partners"}
                          {index === 3 && "Other sources including offline enrollments"}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Academies Tab */}
        <TabsContent value="academies" className="space-y-6">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Academy Performance</CardTitle>
              <CardDescription>Performance metrics for each of your academies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {academyPerformanceData.map((academy, index) => (
                  <div key={index} className="p-4 rounded-lg border">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={`/placeholder-icon.png?height=48&width=48&text=${academy.name.charAt(0)}`}
                            alt={academy.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{academy.name}</h3>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {index === 0 ? "Cricket" : "Tennis"}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{index === 0 ? "Mumbai" : "Delhi"}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/supplier/academy/${index + 1}/analytics`}>View Details</Link>
                        </Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-3 rounded-lg bg-blue-50 border border-blue-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Profile Views</span>
                          <Eye className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="text-xl font-bold text-blue-700">{academy.views}</div>
                        <div className="text-xs text-blue-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          12.5% vs last month
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Inquiries</span>
                          <MousePointer className="h-4 w-4 text-emerald-600" />
                        </div>
                        <div className="text-xl font-bold text-emerald-700">{academy.inquiries}</div>
                        <div className="text-xs text-emerald-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          8.3% vs last month
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-purple-50 border border-purple-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Enrollments</span>
                          <Users className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="text-xl font-bold text-purple-700">{academy.enrollments}</div>
                        <div className="text-xs text-purple-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          15.2% vs last month
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-100">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-gray-600">Revenue</span>
                          <CreditCard className="h-4 w-4 text-amber-600" />
                        </div>
                        <div className="text-xl font-bold text-amber-700">₹{(academy.revenue / 1000).toFixed(0)}K</div>
                        <div className="text-xs text-amber-600 flex items-center mt-1">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          10.5% vs last month
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Conversion Funnel</h4>
                        <span className="text-xs text-muted-foreground">
                          Inquiry Rate: {((academy.inquiries / academy.views) * 100).toFixed(1)}% | Conversion Rate:{" "}
                          {((academy.enrollments / academy.inquiries) * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-600 rounded-full" style={{ width: "100%" }}></div>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                          <span className="text-xs">{academy.views} Views</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
                          <span className="text-xs">
                            {academy.inquiries} Inquiries ({((academy.inquiries / academy.views) * 100).toFixed(1)}%)
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-purple-600"></div>
                          <span className="text-xs">
                            {academy.enrollments} Enrollments (
                            {((academy.enrollments / academy.inquiries) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Suggestions to improve academy performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border bg-blue-50 border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-2">Optimize Premier Cricket Academy Profile</h3>
                  <p className="text-sm text-blue-700 mb-3">
                    Add more high-quality images and complete all profile sections to improve visibility in search
                    results.
                  </p>
                  <Button variant="outline" className="bg-white text-blue-700 border-blue-300">
                    Edit Profile
                  </Button>
                </div>

                <div className="p-4 rounded-lg border bg-emerald-50 border-emerald-200">
                  <h3 className="font-medium text-emerald-800 mb-2">Improve Elite Tennis School Conversion</h3>
                  <p className="text-sm text-emerald-700 mb-3">
                    The inquiry-to-enrollment rate is lower than average. Consider offering a free trial session.
                  </p>
                  <Button variant="outline" className="bg-white text-emerald-700 border-emerald-300">
                    Setup Trial
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platforms Tab */}
        <TabsContent value="platforms" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
                <CardDescription>Where your enrollments are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={platformData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {platformData.map((entry, index) => (
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
                <CardTitle>Platform Performance</CardTitle>
                <CardDescription>Performance metrics by platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Website",
                      views: 2500,
                      inquiries: 175,
                      enrollments: 90,
                      conversionRate: 3.6,
                      color: COLORS[0],
                    },
                    {
                      name: "Mobile App",
                      views: 1800,
                      inquiries: 126,
                      enrollments: 70,
                      conversionRate: 3.9,
                      color: COLORS[1],
                    },
                    {
                      name: "Referrals",
                      views: 650,
                      inquiries: 52,
                      enrollments: 30,
                      conversionRate: 4.6,
                      color: COLORS[2],
                    },
                    {
                      name: "Other",
                      views: 250,
                      inquiries: 18,
                      enrollments: 10,
                      conversionRate: 4.0,
                      color: COLORS[3],
                    },
                  ].map((platform, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: platform.color }}></div>
                          <span className="font-medium">{platform.name}</span>
                        </div>
                        <span className="text-sm font-bold">{platform.conversionRate}% Conversion Rate</span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Views</span>
                          <span className="font-medium">{platform.views}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Inquiries</span>
                          <span className="font-medium">{platform.inquiries}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Enrollments</span>
                          <span className="font-medium">{platform.enrollments}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full"
                          style={{
                            width: `${platform.conversionRate * 10}%`,
                            backgroundColor: platform.color,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Platform Optimization</CardTitle>
              <CardDescription>Recommendations to improve performance across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Website Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Your website has the highest traffic but lower conversion rate. Improve the inquiry form and add
                    more testimonials.
                  </p>
                  <Button variant="outline" size="sm">
                    Optimize Website
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Mobile App Engagement</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Encourage more users to download and use the mobile app for better engagement.
                  </p>
                  <Button variant="outline" size="sm">
                    Promote App
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Referral Program</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Referrals have the highest conversion rate. Implement a formal referral program.
                  </p>
                  <Button variant="outline" size="sm">
                    Setup Referrals
                  </Button>
                </div>

                <div className="p-4 rounded-lg border">
                  <h3 className="font-medium mb-2">Cross-Platform Consistency</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ensure consistent messaging and branding across all platforms.
                  </p>
                  <Button variant="outline" size="sm">
                    Review Branding
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
