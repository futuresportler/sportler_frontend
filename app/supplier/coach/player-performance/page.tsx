"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronRight,
  Search,
  Star,
  Filter,
  ArrowUpDown,
  Calendar,
  Clock,
  TrendingUp,
  MessageSquare,
  BarChart3,
  UserCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
} from "recharts"

// Mock data for students
const students = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 14,
    sport: "Cricket",
    level: "Intermediate",
    joinedDate: "2023-08-15",
    attendance: 92,
    avatar: "/abstract-rs.png",
    lastSession: "2023-11-10",
    skills: {
      batting: 75,
      bowling: 60,
      fielding: 82,
      footwork: 68,
      gameAwareness: 70,
    },
    recentPerformance: [
      { date: "Oct 5", rating: 7.2 },
      { date: "Oct 12", rating: 7.5 },
      { date: "Oct 19", rating: 7.8 },
      { date: "Oct 26", rating: 7.4 },
      { date: "Nov 2", rating: 8.0 },
      { date: "Nov 9", rating: 8.2 },
    ],
    notes: "Shows great potential in batting. Needs to work on bowling technique.",
  },
  {
    id: 2,
    name: "Priya Patel",
    age: 13,
    sport: "Cricket",
    level: "Beginner",
    joinedDate: "2023-09-05",
    attendance: 88,
    avatar: "/Intersecting Paths.png",
    lastSession: "2023-11-09",
    skills: {
      batting: 55,
      bowling: 70,
      fielding: 60,
      footwork: 50,
      gameAwareness: 45,
    },
    recentPerformance: [
      { date: "Oct 5", rating: 5.8 },
      { date: "Oct 12", rating: 6.0 },
      { date: "Oct 19", rating: 6.2 },
      { date: "Oct 26", rating: 6.5 },
      { date: "Nov 2", rating: 6.8 },
      { date: "Nov 9", rating: 7.0 },
    ],
    notes: "Enthusiastic learner. Showing good progress in bowling.",
  },
  {
    id: 3,
    name: "Arjun Singh",
    age: 15,
    sport: "Cricket",
    level: "Advanced",
    joinedDate: "2023-07-20",
    attendance: 95,
    avatar: "/abstract-geometric-shapes.png",
    lastSession: "2023-11-10",
    skills: {
      batting: 85,
      bowling: 78,
      fielding: 90,
      footwork: 82,
      gameAwareness: 88,
    },
    recentPerformance: [
      { date: "Oct 5", rating: 8.5 },
      { date: "Oct 12", rating: 8.7 },
      { date: "Oct 19", rating: 8.5 },
      { date: "Oct 26", rating: 8.8 },
      { date: "Nov 2", rating: 9.0 },
      { date: "Nov 9", rating: 9.2 },
    ],
    notes: "Exceptional talent. Ready for competitive matches.",
  },
  {
    id: 4,
    name: "Ananya Reddy",
    age: 14,
    sport: "Cricket",
    level: "Intermediate",
    joinedDate: "2023-08-10",
    attendance: 90,
    avatar: "/augmented-reality-cityscape.png",
    lastSession: "2023-11-08",
    skills: {
      batting: 72,
      bowling: 65,
      fielding: 75,
      footwork: 70,
      gameAwareness: 68,
    },
    recentPerformance: [
      { date: "Oct 5", rating: 7.0 },
      { date: "Oct 12", rating: 7.2 },
      { date: "Oct 19", rating: 7.5 },
      { date: "Oct 26", rating: 7.3 },
      { date: "Nov 2", rating: 7.6 },
      { date: "Nov 9", rating: 7.8 },
    ],
    notes: "Good all-rounder. Needs to improve concentration.",
  },
  {
    id: 5,
    name: "Vikram Mehta",
    age: 16,
    sport: "Cricket",
    level: "Advanced",
    joinedDate: "2023-06-15",
    attendance: 94,
    avatar: "/virtual-meeting-diversity.png",
    lastSession: "2023-11-09",
    skills: {
      batting: 88,
      bowling: 82,
      fielding: 85,
      footwork: 80,
      gameAwareness: 86,
    },
    recentPerformance: [
      { date: "Oct 5", rating: 8.2 },
      { date: "Oct 12", rating: 8.5 },
      { date: "Oct 19", rating: 8.3 },
      { date: "Oct 26", rating: 8.6 },
      { date: "Nov 2", rating: 8.8 },
      { date: "Nov 9", rating: 9.0 },
    ],
    notes: "Strong batsman. Potential for state-level competitions.",
  },
]

// Performance history data for charts
const performanceHistory = [
  { month: "Jun", batting: 65, bowling: 55, fielding: 70 },
  { month: "Jul", batting: 68, bowling: 58, fielding: 72 },
  { month: "Aug", batting: 70, bowling: 62, fielding: 75 },
  { month: "Sep", batting: 73, bowling: 65, fielding: 78 },
  { month: "Oct", batting: 75, bowling: 68, fielding: 80 },
  { month: "Nov", batting: 78, bowling: 70, fielding: 82 },
]

export default function PlayerPerformancePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
  const [sortBy, setSortBy] = useState("name")
  const [filterLevel, setFilterLevel] = useState("all")

  // Filter and sort students
  const filteredStudents = students
    .filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLevel = filterLevel === "all" || student.level === filterLevel
      return matchesSearch && matchesLevel
    })
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "level") return a.level.localeCompare(b.level)
      if (sortBy === "attendance") return b.attendance - a.attendance
      return 0
    })

  // Handle student selection
  const handleStudentSelect = (student: any) => {
    setSelectedStudent(student)
  }

  // Handle feedback submission
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would save the feedback to a database
    alert("Feedback submitted successfully!")
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Player Performance</h1>
          <p className="text-muted-foreground">Track, evaluate, and provide feedback on your students' performance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Students List Panel */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle>Students</CardTitle>
              <CardDescription>{filteredStudents.length} students enrolled</CardDescription>
              <div className="flex items-center space-x-2 mt-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterLevel} onValueChange={setFilterLevel}>
                  <SelectTrigger className="w-[130px]">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center"
                  onClick={() => setSortBy("name")}
                >
                  Name
                  {sortBy === "name" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center"
                  onClick={() => setSortBy("level")}
                >
                  Level
                  {sortBy === "level" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs flex items-center"
                  onClick={() => setSortBy("attendance")}
                >
                  Attendance
                  {sortBy === "attendance" && <ArrowUpDown className="ml-1 h-3 w-3" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedStudent?.id === student.id ? "bg-primary/10 border-l-4 border-primary" : "hover:bg-muted"
                    }`}
                    onClick={() => handleStudentSelect(student)}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          <span className="mr-2">{student.age} yrs</span>
                          <Badge variant="outline" className="text-xs">
                            {student.level}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-sm font-medium">{student.attendance}%</div>
                      <div className="text-xs text-muted-foreground">Attendance</div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Performance Details Panel */}
          <Card className="lg:col-span-2">
            {selectedStudent ? (
              <>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{selectedStudent.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Calendar className="h-4 w-4 mr-1" />
                        Joined{" "}
                        {new Date(selectedStudent.joinedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                        <span className="mx-2">•</span>
                        <Clock className="h-4 w-4 mr-1" />
                        Last session:{" "}
                        {new Date(selectedStudent.lastSession).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Badge
                        variant={
                          selectedStudent.level === "Beginner"
                            ? "secondary"
                            : selectedStudent.level === "Intermediate"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {selectedStudent.level}
                      </Badge>
                      <Badge variant="outline">{selectedStudent.sport}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="performance">
                    <TabsList className="mb-4">
                      <TabsTrigger value="performance">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Performance
                      </TabsTrigger>
                      <TabsTrigger value="feedback">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Feedback
                      </TabsTrigger>
                      <TabsTrigger value="history">
                        <TrendingUp className="h-4 w-4 mr-2" />
                        History
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="performance" className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Skill Assessment</h3>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Batting</span>
                              <span className="text-sm text-muted-foreground">{selectedStudent.skills.batting}%</span>
                            </div>
                            <Progress value={selectedStudent.skills.batting} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Bowling</span>
                              <span className="text-sm text-muted-foreground">{selectedStudent.skills.bowling}%</span>
                            </div>
                            <Progress value={selectedStudent.skills.bowling} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Fielding</span>
                              <span className="text-sm text-muted-foreground">{selectedStudent.skills.fielding}%</span>
                            </div>
                            <Progress value={selectedStudent.skills.fielding} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Footwork</span>
                              <span className="text-sm text-muted-foreground">{selectedStudent.skills.footwork}%</span>
                            </div>
                            <Progress value={selectedStudent.skills.footwork} className="h-2" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm font-medium">Game Awareness</span>
                              <span className="text-sm text-muted-foreground">
                                {selectedStudent.skills.gameAwareness}%
                              </span>
                            </div>
                            <Progress value={selectedStudent.skills.gameAwareness} className="h-2" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-3">Recent Performance</h3>
                        <div className="h-[200px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={selectedStudent.recentPerformance}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis domain={[0, 10]} />
                              <Tooltip />
                              <Line
                                type="monotone"
                                dataKey="rating"
                                stroke="#2563eb"
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-2">Coach's Notes</h3>
                        <p className="text-muted-foreground">{selectedStudent.notes}</p>
                      </div>
                    </TabsContent>

                    <TabsContent value="feedback">
                      <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-medium mb-2">Session Feedback</h3>
                            <Textarea
                              placeholder="Provide detailed feedback about today's session..."
                              className="min-h-[120px]"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Batting Technique</label>
                                  <span className="text-sm text-muted-foreground" id="batting-value">
                                    7.5
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[7.5]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("batting-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Bowling Accuracy</label>
                                  <span className="text-sm text-muted-foreground" id="bowling-value">
                                    6.0
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[6.0]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("bowling-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Fielding Skills</label>
                                  <span className="text-sm text-muted-foreground" id="fielding-value">
                                    8.0
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[8.0]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("fielding-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                            </div>

                            <div className="space-y-4">
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Footwork</label>
                                  <span className="text-sm text-muted-foreground" id="footwork-value">
                                    6.5
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[6.5]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("footwork-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Game Awareness</label>
                                  <span className="text-sm text-muted-foreground" id="awareness-value">
                                    7.0
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[7.0]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("awareness-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <label className="text-sm font-medium">Overall Performance</label>
                                  <span className="text-sm text-muted-foreground" id="overall-value">
                                    7.2
                                  </span>
                                </div>
                                <Slider
                                  defaultValue={[7.2]}
                                  max={10}
                                  step={0.1}
                                  onValueChange={(value) => {
                                    document.getElementById("overall-value")!.innerText = value[0].toString()
                                  }}
                                />
                              </div>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Areas for Improvement</h3>
                            <Textarea
                              placeholder="Suggest specific areas where the student can improve..."
                              className="min-h-[80px]"
                            />
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-2">Homework/Practice Assignments</h3>
                            <Textarea
                              placeholder="Assign specific drills or exercises for practice..."
                              className="min-h-[80px]"
                            />
                          </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Save as Draft</Button>
                          <Button type="submit">Submit Feedback</Button>
                        </div>
                      </form>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Performance Trends</h3>
                          <div className="h-[250px]">
                            <ResponsiveContainer width="100%" height="100%">
                              <BarChart data={performanceHistory}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="batting" name="Batting" fill="#2563eb" />
                                <Bar dataKey="bowling" name="Bowling" fill="#16a34a" />
                                <Bar dataKey="fielding" name="Fielding" fill="#d97706" />
                              </BarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium mb-3">Previous Feedback</h3>
                          <div className="space-y-4">
                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">November 2, 2023</CardTitle>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <CardDescription>Coach Vikram</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">
                                  Great improvement in batting technique. The front foot movement has become more
                                  confident. Still needs to work on the pull shot against short deliveries. Fielding has
                                  been exceptional.
                                </p>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">October 19, 2023</CardTitle>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= 4 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <CardDescription>Coach Vikram</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">
                                  Showing good progress in all areas. Batting stance has improved significantly. Bowling
                                  action is more consistent now. Needs to focus on game awareness and decision-making
                                  during pressure situations.
                                </p>
                              </CardContent>
                            </Card>

                            <Card>
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle className="text-base">October 5, 2023</CardTitle>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${star <= 3 ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <CardDescription>Coach Vikram</CardDescription>
                              </CardHeader>
                              <CardContent>
                                <p className="text-sm">
                                  Good effort today. Batting technique needs refinement, especially against spin
                                  bowling. Fielding is a strong point. Recommended additional practice for bowling
                                  accuracy.
                                </p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-[600px] text-center p-6">
                <UserCircle className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium mb-2">Select a Student</h3>
                <p className="text-muted-foreground max-w-md">
                  Select a student from the list to view their performance details, provide feedback, and track their
                  progress.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
