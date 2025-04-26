"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  TrendingUp,
  Users,
  Calendar,
  Star,
  Award,
  ArrowUpRight,
  DollarSign,
  Clock,
  Target,
  ChevronRight,
  Zap,
  BarChart2,
  ThumbsUp,
  Eye,
  Share2,
} from "lucide-react"

// Mock data for the analytics
const revenueData = [
  { month: "Jan", revenue: 12500, sessions: 25 },
  { month: "Feb", revenue: 14200, sessions: 28 },
  { month: "Mar", revenue: 16800, sessions: 32 },
  { month: "Apr", revenue: 15500, sessions: 30 },
  { month: "May", revenue: 18900, sessions: 36 },
  { month: "Jun", revenue: 17200, sessions: 33 },
  { month: "Jul", revenue: 19800, sessions: 38 },
  { month: "Aug", revenue: 22500, sessions: 42 },
  { month: "Sep", revenue: 24100, sessions: 45 },
  { month: "Oct", revenue: 26800, sessions: 50 },
  { month: "Nov", revenue: 25200, sessions: 47 },
  { month: "Dec", revenue: 28500, sessions: 53 },
]

const bookingSourceData = [
  { name: "Direct", value: 45, color: "#3b82f6" },
  { name: "Website", value: 30, color: "#10b981" },
  { name: "Partner Apps", value: 15, color: "#8b5cf6" },
  { name: "Referrals", value: 10, color: "#f59e0b" },
]

const studentFeedbackData = [
  { name: "5 Stars", value: 65, color: "#10b981" },
  { name: "4 Stars", value: 25, color: "#3b82f6" },
  { name: "3 Stars", value: 7, color: "#f59e0b" },
  { name: "2 Stars", value: 2, color: "#f97316" },
  { name: "1 Star", value: 1, color: "#ef4444" },
]

const skillRatingData = [
  { name: "Technical Knowledge", score: 92 },
  { name: "Communication", score: 88 },
  { name: "Motivation", score: 95 },
  { name: "Adaptability", score: 85 },
  { name: "Patience", score: 90 },
]

const weekdayPerformanceData = [
  { day: "Mon", sessions: 8, revenue: 4000 },
  { day: "Tue", sessions: 10, revenue: 5000 },
  { day: "Wed", sessions: 12, revenue: 6000 },
  { day: "Thu", sessions: 9, revenue: 4500 },
  { day: "Fri", sessions: 11, revenue: 5500 },
  { day: "Sat", sessions: 15, revenue: 7500 },
  { day: "Sun", sessions: 14, revenue: 7000 },
]

const timeSlotPerformanceData = [
  { time: "6-8 AM", sessions: 12, revenue: 6000 },
  { time: "8-10 AM", sessions: 18, revenue: 9000 },
  { time: "10-12 PM", sessions: 15, revenue: 7500 },
  { time: "12-2 PM", sessions: 8, revenue: 4000 },
  { time: "2-4 PM", sessions: 10, revenue: 5000 },
  { time: "4-6 PM", sessions: 16, revenue: 8000 },
  { time: "6-8 PM", sessions: 20, revenue: 10000 },
  { time: "8-10 PM", sessions: 14, revenue: 7000 },
]

const studentAgeData = [
  { age: "Under 10", count: 15 },
  { age: "10-15", count: 28 },
  { age: "16-20", count: 22 },
  { age: "21-30", count: 18 },
  { age: "31-40", count: 12 },
  { age: "Over 40", count: 5 },
]

const studentRetentionData = [
  { month: "Jan", newStudents: 8, returningStudents: 18 },
  { month: "Feb", newStudents: 10, returningStudents: 20 },
  { month: "Mar", newStudents: 12, returningStudents: 22 },
  { month: "Apr", newStudents: 9, returningStudents: 24 },
  { month: "May", newStudents: 11, returningStudents: 26 },
  { month: "Jun", newStudents: 14, returningStudents: 28 },
  { month: "Jul", newStudents: 16, returningStudents: 30 },
  { month: "Aug", newStudents: 18, returningStudents: 32 },
  { month: "Sep", newStudents: 15, returningStudents: 34 },
  { month: "Oct", newStudents: 13, returningStudents: 36 },
  { month: "Nov", newStudents: 12, returningStudents: 38 },
  { month: "Dec", newStudents: 10, returningStudents: 40 },
]

const recentFeedback = [
  {
    id: 1,
    studentName: "Rahul Sharma",
    rating: 5,
    comment: "Coach Vikram has transformed my game completely. His technical insights are exceptional.",
    date: "2 days ago",
    sport: "Cricket",
  },
  {
    id: 2,
    studentName: "Priya Patel",
    rating: 5,
    comment: "Amazing coach! Very patient and explains techniques in a way that's easy to understand.",
    date: "5 days ago",
    sport: "Tennis",
  },
  {
    id: 3,
    studentName: "Arjun Singh",
    rating: 4,
    comment: "Great sessions, always challenging and fun. Has helped me improve my footwork tremendously.",
    date: "1 week ago",
    sport: "Football",
  },
  {
    id: 4,
    studentName: "Ananya Desai",
    rating: 5,
    comment: "The best coach I've ever had. Truly understands how to develop young talent.",
    date: "2 weeks ago",
    sport: "Basketball",
  },
]

export default function CoachAnalytics() {
  const [timeRange, setTimeRange] = useState("year")

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Coaching Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance, revenue, and student feedback to grow your coaching business.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-blue-900">₹2,45,600</div>
              <div className="p-2 bg-blue-200 rounded-full">
                <DollarSign className="h-5 w-5 text-blue-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">12.5%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-emerald-800">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-emerald-900">459</div>
              <div className="p-2 bg-emerald-200 rounded-full">
                <Calendar className="h-5 w-5 text-emerald-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">8.3%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-purple-800">Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-purple-900">4.8/5</div>
              <div className="p-2 bg-purple-200 rounded-full">
                <Star className="h-5 w-5 text-purple-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">0.2</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-800">Total Students</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold text-amber-900">128</div>
              <div className="p-2 bg-amber-200 rounded-full">
                <Users className="h-5 w-5 text-amber-700" />
              </div>
            </div>
            <div className="flex items-center mt-2 text-sm">
              <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
              <span className="text-emerald-600 font-medium">15.2%</span>
              <span className="text-gray-600 ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue" className="flex items-center">
            <BarChart2 className="h-4 w-4 mr-2" />
            Revenue
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Bookings
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center">
            <Zap className="h-4 w-4 mr-2" />
            Profile Boost
          </TabsTrigger>
        </TabsList>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Revenue & Sessions</CardTitle>
                <CardDescription>Monthly revenue and number of coaching sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value, name) => {
                          if (name === "revenue") return [`₹${value}`, "Revenue"]
                          return [value, "Sessions"]
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="revenue"
                        name="Revenue (₹)"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="sessions"
                        name="Sessions"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4, strokeWidth: 2 }}
                        activeDot={{ r: 6, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Weekday Performance</CardTitle>
                <CardDescription>Sessions and revenue by day of week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={weekdayPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value, name) => {
                          if (name === "revenue") return [`₹${value}`, "Revenue"]
                          return [value, "Sessions"]
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sessions" name="Sessions" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="revenue" name="Revenue (₹)" fill="#10b981" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Slot Performance</CardTitle>
                <CardDescription>Sessions and revenue by time of day</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={timeSlotPerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        formatter={(value, name) => {
                          if (name === "revenue") return [`₹${value}`, "Revenue"]
                          return [value, "Sessions"]
                        }}
                      />
                      <Legend />
                      <Bar dataKey="sessions" name="Sessions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="revenue" name="Revenue (₹)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Insights</CardTitle>
              <CardDescription>Key metrics and opportunities to increase your revenue</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Average Session Rate</h3>
                  <div className="text-3xl font-bold text-blue-600">₹535</div>
                  <p className="text-sm text-gray-500">Your average rate per coaching session</p>
                  <div className="flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600 font-medium">5.2%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Revenue per Student</h3>
                  <div className="text-3xl font-bold text-emerald-600">₹1,918</div>
                  <p className="text-sm text-gray-500">Average revenue generated per student</p>
                  <div className="flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600 font-medium">8.7%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Projected Annual Revenue</h3>
                  <div className="text-3xl font-bold text-purple-600">₹29,47,200</div>
                  <p className="text-sm text-gray-500">Based on your current growth rate</p>
                  <div className="flex items-center text-sm">
                    <TrendingUp className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600 font-medium">15.3%</span>
                    <span className="text-gray-600 ml-1">projected growth</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Revenue Growth Opportunities</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <Users className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">Group Sessions</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Increase your revenue by 40% by adding more group sessions to your schedule.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                          Learn more <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-emerald-100 rounded-full mr-4">
                        <Target className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-900">Premium Packages</h4>
                        <p className="text-sm text-emerald-700 mt-1">
                          Create premium coaching packages to increase your average revenue per student.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-emerald-600 mt-2">
                          Learn more <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Booking Sources</CardTitle>
                <CardDescription>Where your bookings are coming from</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bookingSourceData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {bookingSourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Direct bookings are your highest source at 45%. Focus on increasing website bookings for better
                  visibility.
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Student Demographics</CardTitle>
                <CardDescription>Age distribution of your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentAgeData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="age" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Bar dataKey="count" name="Students" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Your primary audience is in the 10-15 age group. Consider expanding your offerings for the 21-30 age
                  group.
                </p>
              </CardFooter>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Student Retention</CardTitle>
                <CardDescription>New vs. returning students over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={studentRetentionData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend />
                      <Bar dataKey="newStudents" name="New Students" stackId="a" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      <Bar
                        dataKey="returningStudents"
                        name="Returning Students"
                        stackId="a"
                        fill="#10b981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Your student retention rate is excellent at 78%. Focus on converting new students to returning ones.
                </p>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Booking Optimization</CardTitle>
              <CardDescription>Insights to help you optimize your booking schedule</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Peak Booking Times</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      6-8 PM
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      8-10 AM
                    </Badge>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      4-6 PM
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    These time slots have the highest booking rates. Consider increasing your availability during these
                    hours.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Popular Session Types</h3>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Individual
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Group (4-6)
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Specialized
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    These session types are most popular with your students. Consider expanding these offerings.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Booking Conversion Rate</h3>
                  <div className="text-3xl font-bold text-purple-600">78%</div>
                  <p className="text-sm text-gray-500">Percentage of inquiries that convert to actual bookings</p>
                  <div className="flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600 font-medium">12.3%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Booking Growth Opportunities</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-4">
                        <Clock className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">Optimize Schedule</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Adjust your availability to match peak demand times and increase bookings by up to 25%.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-purple-600 mt-2">
                          View recommendations <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-amber-100 rounded-full mr-4">
                        <Users className="h-5 w-5 text-amber-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-amber-900">Referral Program</h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Implement a student referral program to increase bookings through word-of-mouth.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-amber-600 mt-2">
                          Set up program <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Rating Distribution</CardTitle>
                <CardDescription>Breakdown of your student ratings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={studentFeedbackData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {studentFeedbackData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`${value}%`, "Percentage"]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  90% of your ratings are 4 stars or higher. Focus on converting 4-star ratings to 5-star ratings.
                </p>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Ratings</CardTitle>
                <CardDescription>How students rate your coaching skills</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillRatingData.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.score}%</span>
                    </div>
                    <Progress value={skill.score} className="h-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  Your motivation and technical knowledge are your highest-rated skills. Consider improving
                  adaptability.
                </p>
              </CardFooter>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Feedback</CardTitle>
                <CardDescription>Latest comments from your students</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFeedback.map((feedback) => (
                    <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h4 className="font-medium">{feedback.studentName}</h4>
                            <Badge className="ml-2 bg-blue-100 text-blue-800 border-blue-200">{feedback.sport}</Badge>
                          </div>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-xs text-gray-500 ml-2">{feedback.date}</span>
                          </div>
                        </div>
                        <ThumbsUp className="h-5 w-5 text-emerald-500" />
                      </div>
                      <p className="mt-2 text-gray-700">{feedback.comment}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Feedback
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Feedback Insights</CardTitle>
              <CardDescription>Key takeaways from your student feedback</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Feedback Response Rate</h3>
                  <div className="text-3xl font-bold text-blue-600">82%</div>
                  <p className="text-sm text-gray-500">Percentage of students who provide feedback after sessions</p>
                  <div className="flex items-center text-sm">
                    <ArrowUpRight className="h-4 w-4 text-emerald-600 mr-1" />
                    <span className="text-emerald-600 font-medium">7.5%</span>
                    <span className="text-gray-600 ml-1">from last month</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Most Appreciated Qualities</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Technical Knowledge
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Patience
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Motivation
                    </Badge>
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                      Clear Explanations
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">
                    These qualities are most frequently mentioned in positive feedback
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Areas for Improvement</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Session Pacing
                    </Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Personalization
                    </Badge>
                    <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                      Follow-up Materials
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500">Focus on these areas to improve your overall rating</p>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Feedback Action Plan</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <Award className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">Leverage Your Strengths</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Highlight your technical knowledge and motivational skills in your profile to attract more
                          students.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                          Update profile <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-4">
                        <Target className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">Improvement Plan</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Create a personalized improvement plan based on student feedback to enhance your coaching.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-purple-600 mt-2">
                          Create plan <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Boost Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Profile Visibility</CardTitle>
                <CardDescription>How visible your profile is on the platform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium">Overall Visibility Score</span>
                    <span className="text-sm font-medium">72/100</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <div className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Profile Completeness</span>
                      <span className="text-sm font-medium">90%</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Search Ranking</span>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Review Count</span>
                      <span className="text-sm font-medium">68%</span>
                    </div>
                    <Progress value={68} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Media Content</span>
                      <span className="text-sm font-medium">55%</span>
                    </div>
                    <Progress value={55} className="h-2" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Boost Your Profile</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profile Performance</CardTitle>
                <CardDescription>How your profile is performing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex flex-col">
                      <span className="text-sm text-blue-700">Profile Views</span>
                      <span className="text-2xl font-bold text-blue-900">1,245</span>
                      <div className="flex items-center text-xs mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                        <span className="text-emerald-600 font-medium">18.3%</span>
                        <span className="text-gray-600 ml-1">vs last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <div className="flex flex-col">
                      <span className="text-sm text-emerald-700">Inquiry Rate</span>
                      <span className="text-2xl font-bold text-emerald-900">8.7%</span>
                      <div className="flex items-center text-xs mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                        <span className="text-emerald-600 font-medium">2.1%</span>
                        <span className="text-gray-600 ml-1">vs last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex flex-col">
                      <span className="text-sm text-purple-700">Saved Profiles</span>
                      <span className="text-2xl font-bold text-purple-900">342</span>
                      <div className="flex items-center text-xs mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                        <span className="text-emerald-600 font-medium">12.5%</span>
                        <span className="text-gray-600 ml-1">vs last month</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                    <div className="flex flex-col">
                      <span className="text-sm text-amber-700">Search Appearances</span>
                      <span className="text-2xl font-bold text-amber-900">2,876</span>
                      <div className="flex items-center text-xs mt-1">
                        <ArrowUpRight className="h-3 w-3 text-emerald-600 mr-1" />
                        <span className="text-emerald-600 font-medium">15.7%</span>
                        <span className="text-gray-600 ml-1">vs last month</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-medium mb-2">Top Search Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Cricket Coach
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Batting Technique
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Mumbai
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Advanced Training
                    </Badge>
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                      Youth Coach
                    </Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Detailed Analytics
                </Button>
              </CardFooter>
            </Card>

            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Profile Boost Recommendations</CardTitle>
                <CardDescription>Actions to increase your profile visibility and bookings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-blue-100 rounded-full mr-4">
                        <Eye className="h-5 w-5 text-blue-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-blue-900">Add Media Content</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Profiles with videos and photos get 3x more views. Add coaching demonstration videos.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-blue-600 mt-2">
                          Upload media <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-emerald-100 rounded-full mr-4">
                        <Star className="h-5 w-5 text-emerald-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-emerald-900">Request Reviews</h4>
                        <p className="text-sm text-emerald-700 mt-1">
                          Encourage your students to leave reviews. Profiles with 10+ reviews get 70% more inquiries.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-emerald-600 mt-2">
                          Send requests <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                    <div className="flex items-start">
                      <div className="p-2 bg-purple-100 rounded-full mr-4">
                        <Share2 className="h-5 w-5 text-purple-700" />
                      </div>
                      <div>
                        <h4 className="font-medium text-purple-900">Share Your Profile</h4>
                        <p className="text-sm text-purple-700 mt-1">
                          Share your profile on social media to increase visibility and attract more students.
                        </p>
                        <Button variant="link" className="p-0 h-auto text-purple-600 mt-2">
                          Share now <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Premium Boost Options</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                      <div className="flex items-start">
                        <div className="p-2 bg-amber-200 rounded-full mr-4">
                          <Zap className="h-5 w-5 text-amber-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-amber-900">Featured Coach</h4>
                          <p className="text-sm text-amber-700 mt-1">
                            Get featured in the "Top Coaches" section on the homepage and category pages.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-amber-900 font-bold">₹1,999/month</span>
                            <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                              Get Featured
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start">
                        <div className="p-2 bg-blue-200 rounded-full mr-4">
                          <Award className="h-5 w-5 text-blue-700" />
                        </div>
                        <div>
                          <h4 className="font-medium text-blue-900">Verified Pro Badge</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            Get a verified pro badge on your profile to stand out and build trust with potential
                            students.
                          </p>
                          <div className="mt-2 flex items-center justify-between">
                            <span className="text-blue-900 font-bold">₹999/month</span>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Get Verified
                            </Button>
                          </div>
                        </div>
                      </div>
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
