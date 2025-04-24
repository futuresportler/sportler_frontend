"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronLeft, Phone, Mail, MapPin, Calendar, Clock, Edit, Download, Send, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

export default function PlayerDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [newNote, setNewNote] = useState("")

  // Mock player data - in a real app, you would fetch this based on the ID
  const player = {
    id: Number.parseInt(params.id),
    name: "Rahul Sharma",
    age: 14,
    dob: "12 May 2009",
    gender: "Male",
    sport: "Cricket",
    batch: "Evening Batch",
    level: "Intermediate",
    joinDate: "15 Jan 2023",
    attendance: 92,
    fees: {
      status: "paid",
      dueDate: null,
      history: [
        { date: "1 Apr 2023", amount: "₹5,000", status: "paid" },
        { date: "1 Mar 2023", amount: "₹5,000", status: "paid" },
        { date: "1 Feb 2023", amount: "₹5,000", status: "paid" },
      ],
    },
    performance: 85,
    image: "/placeholder.svg?height=300&width=300&query=cricket player",
    contact: "+91 98765 43210",
    email: "rahul.sharma@gmail.com",
    parent: "Vikram Sharma",
    parentContact: "+91 98765 43211",
    parentEmail: "vikram.sharma@gmail.com",
    address: "123 Main Street, Andheri West, Mumbai, Maharashtra 400053",
    emergencyContact: "+91 98765 43212",
    medicalInfo: "No allergies or medical conditions",
    coach: "Ajay Patel",
    lastSession: "Yesterday, 5:00 PM",
    nextSession: "Tomorrow, 5:00 PM",
    skills: [
      { name: "Batting", score: 82 },
      { name: "Bowling", score: 75 },
      { name: "Fielding", score: 90 },
      { name: "Game Awareness", score: 78 },
      { name: "Fitness", score: 88 },
    ],
    attendance_history: [
      { date: "1 May 2023", status: "present" },
      { date: "3 May 2023", status: "present" },
      { date: "5 May 2023", status: "absent" },
      { date: "8 May 2023", status: "present" },
      { date: "10 May 2023", status: "present" },
      { date: "12 May 2023", status: "present" },
      { date: "15 May 2023", status: "present" },
    ],
    notes: [
      {
        id: 1,
        date: "10 May 2023",
        author: "Ajay Patel",
        content:
          "Rahul showed excellent progress in his batting technique today. His footwork has improved significantly. Need to work on his off-side play.",
      },
      {
        id: 2,
        date: "3 May 2023",
        author: "Fitness Coach",
        content: "Completed all fitness drills with good form. Endurance has improved since last month's assessment.",
      },
      {
        id: 3,
        date: "25 Apr 2023",
        author: "Ajay Patel",
        content:
          "Struggling with yorker deliveries. Need to schedule extra practice sessions to work on this specific skill.",
      },
    ],
    upcoming_sessions: [
      { date: "18 May 2023", time: "5:00 PM - 7:00 PM", type: "Regular Training" },
      { date: "20 May 2023", time: "5:00 PM - 7:00 PM", type: "Regular Training" },
      { date: "22 May 2023", time: "5:00 PM - 7:00 PM", type: "Regular Training" },
      { date: "25 May 2023", time: "5:00 PM - 7:00 PM", type: "Regular Training" },
    ],
    performance_history: [
      { month: "Jan", score: 72 },
      { month: "Feb", score: 75 },
      { month: "Mar", score: 79 },
      { month: "Apr", score: 82 },
      { month: "May", score: 85 },
    ],
    achievements: [
      {
        date: "Apr 2023",
        title: "Player of the Month",
        description: "Recognized for consistent performance and improvement",
      },
      {
        date: "Mar 2023",
        title: "Best Fielder Award",
        description: "Awarded for exceptional fielding skills during practice matches",
      },
    ],
  }

  const getPerformanceColor = (score) => {
    if (score >= 90) return "text-green-600"
    if (score >= 75) return "text-emerald-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getProgressColor = (score) => {
    if (score >= 90) return "bg-green-600"
    if (score >= 75) return "bg-emerald-600"
    if (score >= 60) return "bg-yellow-600"
    return "bg-red-600"
  }

  const handleAddNote = () => {
    if (newNote.trim()) {
      // In a real app, you would save this to the database
      alert("Note added successfully!")
      setNewNote("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/supplier/academy/players">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Players
          </Link>
        </Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Player Profile Card */}
        <div className="w-full lg:w-1/3 space-y-6">
          <Card className="bg-white">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={player.image || "/placeholder.svg"}
                    alt={player.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover border-4 border-white shadow-md"
                  />
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-sm"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-2xl font-bold">{player.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                    {player.sport}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {player.level}
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-2">
                  {player.age} years • {player.batch}
                </p>
                <div className="grid grid-cols-3 gap-4 w-full mt-6">
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold">{player.attendance}%</span>
                    <span className="text-xs text-muted-foreground">Attendance</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className={`text-lg font-bold ${getPerformanceColor(player.performance)}`}>
                      {player.performance}%
                    </span>
                    <span className="text-xs text-muted-foreground">Performance</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-lg font-bold text-emerald-600">
                      {player.fees.status === "paid" ? "Paid" : "Due"}
                    </span>
                    <span className="text-xs text-muted-foreground">Fees</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">{player.contact}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{player.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Address</p>
                    <p className="text-sm text-muted-foreground">{player.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Date of Birth</p>
                    <p className="text-sm text-muted-foreground">{player.dob}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">Joined On</p>
                    <p className="text-sm text-muted-foreground">{player.joinDate}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Parent/Guardian Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div>
                      <p className="text-sm font-medium">{player.parent}</p>
                      <p className="text-sm text-muted-foreground">{player.parentContact}</p>
                      <p className="text-sm text-muted-foreground">{player.parentEmail}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Emergency Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">{player.emergencyContact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Medical Information</h3>
                <p className="text-sm text-muted-foreground">{player.medicalInfo}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 space-y-6">
          <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="fees">Fees</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Skills Assessment</CardTitle>
                  <CardDescription>Current skill levels across different areas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {player.skills.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className={`text-sm font-medium ${getPerformanceColor(skill.score)}`}>
                            {skill.score}/100
                          </span>
                        </div>
                        <Progress
                          value={skill.score}
                          className="h-2"
                          indicatorClassName={getProgressColor(skill.score)}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Upcoming Sessions</CardTitle>
                    <CardDescription>Next scheduled training sessions</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    View Calendar
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {player.upcoming_sessions.map((session, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg">
                            <Calendar className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{session.date}</p>
                            <p className="text-sm text-muted-foreground">{session.time}</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {session.type}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Coach Notes</CardTitle>
                    <CardDescription>Observations and feedback from coaches</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-4">
                      {player.notes.map((note) => (
                        <div key={note.id} className="p-4 rounded-lg border">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium">{note.author}</p>
                            <p className="text-sm text-muted-foreground">{note.date}</p>
                          </div>
                          <p className="text-sm">{note.content}</p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Add New Note</h4>
                      <div className="space-y-2">
                        <Textarea
                          placeholder="Enter your observations or feedback..."
                          value={newNote}
                          onChange={(e) => setNewNote(e.target.value)}
                          className="min-h-[100px]"
                        />
                        <Button onClick={handleAddNote} className="w-full">
                          <Send className="h-4 w-4 mr-2" />
                          Add Note
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Recognitions and milestones</CardDescription>
                </CardHeader>
                <CardContent>
                  {player.achievements.length > 0 ? (
                    <div className="space-y-4">
                      {player.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                          <div className="bg-yellow-100 text-yellow-700 p-2 rounded-lg">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.11"></path>
                              <path d="M15 7a4 4 0 1 0-8 0"></path>
                              <path d="M17.16 3.86A7.86 7.86 0 0 1 19 9.18a7.85 7.85 0 0 1-2.32 5.59"></path>
                              <path d="M6.84 3.86A7.86 7.86 0 0 0 5 9.18a7.85 7.85 0 0 0 2.32 5.59"></path>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">{achievement.title}</p>
                            <p className="text-sm text-muted-foreground">{achievement.date}</p>
                            <p className="text-sm mt-1">{achievement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-muted-foreground">No achievements recorded yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Performance Trend</CardTitle>
                  <CardDescription>Monthly performance scores</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-end justify-between gap-2">
                    {player.performance_history.map((item) => (
                      <div key={item.month} className="flex flex-col items-center gap-2 w-full">
                        <div
                          className={`w-full rounded-t-md ${getProgressColor(item.score)}`}
                          style={{ height: `${item.score * 2}px` }}
                        ></div>
                        <span className="text-xs font-medium">{item.month}</span>
                        <span className="text-xs text-muted-foreground">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Skill Breakdown</CardTitle>
                    <CardDescription>Detailed skill assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {player.skills.map((skill) => (
                        <div key={skill.name} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{skill.name}</span>
                            <span className={`text-sm font-medium ${getPerformanceColor(skill.score)}`}>
                              {skill.score}/100
                            </span>
                          </div>
                          <Progress
                            value={skill.score}
                            className="h-2"
                            indicatorClassName={getProgressColor(skill.score)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white">
                  <CardHeader>
                    <CardTitle>Coach Recommendations</CardTitle>
                    <CardDescription>Areas to focus on</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 rounded-lg border bg-yellow-50">
                        <p className="font-medium text-yellow-800">Batting Technique</p>
                        <p className="text-sm text-yellow-700 mt-1">
                          Work on off-side play and footwork against spin bowling
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border bg-emerald-50">
                        <p className="font-medium text-emerald-800">Fielding</p>
                        <p className="text-sm text-emerald-700 mt-1">
                          Continue to maintain excellent fielding standards
                        </p>
                      </div>
                      <div className="p-3 rounded-lg border bg-blue-50">
                        <p className="font-medium text-blue-800">Game Awareness</p>
                        <p className="text-sm text-blue-700 mt-1">
                          Focus on strategic decision making during practice matches
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Attendance Tab */}
            <TabsContent value="attendance" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Attendance Overview</CardTitle>
                  <CardDescription>Current month attendance record</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <span className="text-sm">Present</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <span className="text-sm">Absent</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-gray-300"></div>
                      <span className="text-sm">No Session</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
                      const record = player.attendance_history.find(
                        (a) => Number.parseInt(a.date.split(" ")[0]) === day,
                      )
                      const status = record ? record.status : "no-session"
                      return (
                        <div
                          key={day}
                          className={`h-10 flex items-center justify-center rounded-md text-sm font-medium ${
                            status === "present"
                              ? "bg-green-100 text-green-800"
                              : status === "absent"
                                ? "bg-red-100 text-red-800"
                                : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {day}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Attendance History</CardTitle>
                  <CardDescription>Detailed attendance records</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-2 p-4 bg-muted/50 text-sm font-medium">
                      <div>Date</div>
                      <div>Status</div>
                      <div>Notes</div>
                    </div>
                    <div className="divide-y">
                      {player.attendance_history.map((record, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 p-4 items-center">
                          <div>{record.date}</div>
                          <div>
                            <Badge
                              className={
                                record.status === "present"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {record.status === "present" ? "Present" : "Absent"}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {record.status === "absent" ? "Informed absence due to illness" : "-"}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Fees Tab */}
            <TabsContent value="fees" className="space-y-6">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Fee Status</CardTitle>
                  <CardDescription>Current payment status and history</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-emerald-50 border border-emerald-200 mb-6">
                    <div>
                      <h3 className="font-medium text-emerald-800">Current Status</h3>
                      <p className="text-sm text-emerald-700">All fees are paid up to date</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">Paid</Badge>
                  </div>

                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-2 p-4 bg-muted/50 text-sm font-medium">
                      <div>Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      {player.fees.history.map((record, index) => (
                        <div key={index} className="grid grid-cols-3 gap-2 p-4 items-center">
                          <div>{record.date}</div>
                          <div className="font-medium">{record.amount}</div>
                          <div>
                            <Badge
                              className={
                                record.status === "paid"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : record.status === "due"
                                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                    : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {record.status === "paid" ? "Paid" : record.status === "due" ? "Due" : "Overdue"}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download Receipt
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardHeader>
                  <CardTitle>Payment Schedule</CardTitle>
                  <CardDescription>Upcoming fee payments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-3 gap-2 p-4 bg-muted/50 text-sm font-medium">
                      <div>Due Date</div>
                      <div>Amount</div>
                      <div>Status</div>
                    </div>
                    <div className="divide-y">
                      <div className="grid grid-cols-3 gap-2 p-4 items-center">
                        <div>1 Jun 2023</div>
                        <div className="font-medium">₹5,000</div>
                        <div>
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Upcoming</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-4 items-center">
                        <div>1 Jul 2023</div>
                        <div className="font-medium">₹5,000</div>
                        <div>
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Scheduled</Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 p-4 items-center">
                        <div>1 Aug 2023</div>
                        <div className="font-medium">₹5,000</div>
                        <div>
                          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Scheduled</Badge>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end mt-4">
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Record Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
