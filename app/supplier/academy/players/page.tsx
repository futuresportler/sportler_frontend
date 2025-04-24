"use client"

import { useState } from "react"
import { Search, Filter, Download, ChevronRight, UserPlus } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AcademyPlayersPage() {
  const [viewType, setViewType] = useState("all")
  const [sortBy, setSortBy] = useState("name-asc")
  const [selectedBatch, setSelectedBatch] = useState("all")
  const [selectedSport, setSelectedSport] = useState("all")
  const [selectedLevel, setSelectedLevel] = useState("all")

  // Mock data for players
  const players = [
    {
      id: 1,
      name: "Rahul Sharma",
      age: 14,
      sport: "Cricket",
      batch: "Evening Batch",
      level: "Intermediate",
      joinDate: "15 Jan 2023",
      attendance: 92,
      fees: { status: "paid", dueDate: null },
      performance: 85,
      image: "/diverse-students-studying.png",
      contact: "+91 98765 43210",
      parent: "Vikram Sharma",
      parentContact: "+91 98765 43211",
      address: "123 Main Street, Mumbai",
      emergencyContact: "+91 98765 43212",
      medicalInfo: "No allergies",
      coach: "Ajay Patel",
      lastSession: "Yesterday",
      nextSession: "Tomorrow, 5:00 PM",
    },
    {
      id: 2,
      name: "Priya Patel",
      age: 12,
      sport: "Tennis",
      batch: "Morning Batch",
      level: "Beginner",
      joinDate: "3 Mar 2023",
      attendance: 88,
      fees: { status: "due", dueDate: "15 May 2023" },
      performance: 72,
      image: "/focused-learner.png",
      contact: "+91 98765 43213",
      parent: "Meera Patel",
      parentContact: "+91 98765 43214",
      address: "456 Park Avenue, Delhi",
      emergencyContact: "+91 98765 43215",
      medicalInfo: "Mild asthma",
      coach: "Sania Mirza",
      lastSession: "2 days ago",
      nextSession: "Today, 10:00 AM",
    },
    {
      id: 3,
      name: "Arjun Singh",
      age: 16,
      sport: "Football",
      batch: "Weekend Batch",
      level: "Advanced",
      joinDate: "10 Dec 2022",
      attendance: 95,
      fees: { status: "paid", dueDate: null },
      performance: 92,
      image: "/placeholder.svg?key=11k75",
      contact: "+91 98765 43216",
      parent: "Gurpreet Singh",
      parentContact: "+91 98765 43217",
      address: "789 Stadium Road, Chandigarh",
      emergencyContact: "+91 98765 43218",
      medicalInfo: "No known issues",
      coach: "Sunil Chhetri",
      lastSession: "Last weekend",
      nextSession: "This weekend, 9:00 AM",
    },
    {
      id: 4,
      name: "Ananya Gupta",
      age: 13,
      sport: "Badminton",
      batch: "Evening Batch",
      level: "Intermediate",
      joinDate: "5 Feb 2023",
      attendance: 90,
      fees: { status: "overdue", dueDate: "1 Apr 2023" },
      performance: 78,
      image: "/placeholder.svg?key=daavf",
      contact: "+91 98765 43219",
      parent: "Rajesh Gupta",
      parentContact: "+91 98765 43220",
      address: "101 Racquet Lane, Bangalore",
      emergencyContact: "+91 98765 43221",
      medicalInfo: "Peanut allergy",
      coach: "Saina Nehwal",
      lastSession: "Yesterday",
      nextSession: "Tomorrow, 6:00 PM",
    },
    {
      id: 5,
      name: "Mohammed Khan",
      age: 15,
      sport: "Cricket",
      batch: "Morning Batch",
      level: "Advanced",
      joinDate: "20 Nov 2022",
      attendance: 97,
      fees: { status: "paid", dueDate: null },
      performance: 94,
      image: "/placeholder.svg?key=b58of",
      contact: "+91 98765 43222",
      parent: "Imran Khan",
      parentContact: "+91 98765 43223",
      address: "202 Cricket Avenue, Hyderabad",
      emergencyContact: "+91 98765 43224",
      medicalInfo: "No known issues",
      coach: "Rahul Dravid",
      lastSession: "Today",
      nextSession: "Day after tomorrow, 8:00 AM",
    },
    {
      id: 6,
      name: "Kavya Reddy",
      age: 11,
      sport: "Swimming",
      batch: "Weekend Batch",
      level: "Beginner",
      joinDate: "12 Apr 2023",
      attendance: 85,
      fees: { status: "due", dueDate: "15 May 2023" },
      performance: 68,
      image: "/placeholder.svg?height=100&width=100&query=young swimmer",
      contact: "+91 98765 43225",
      parent: "Lakshmi Reddy",
      parentContact: "+91 98765 43226",
      address: "303 Pool Street, Chennai",
      emergencyContact: "+91 98765 43227",
      medicalInfo: "Chlorine sensitivity",
      coach: "Michael Phelps",
      lastSession: "Last weekend",
      nextSession: "This weekend, 11:00 AM",
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800"
      case "due":
        return "bg-yellow-100 text-yellow-800"
      case "overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPerformanceColor = (performance) => {
    if (performance >= 90) return "text-green-600"
    if (performance >= 75) return "text-emerald-600"
    if (performance >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const filteredPlayers = players.filter((player) => {
    if (selectedBatch !== "all" && player.batch !== selectedBatch) return false
    if (selectedSport !== "all" && player.sport !== selectedSport) return false
    if (selectedLevel !== "all" && player.level !== selectedLevel) return false

    if (viewType === "due-fees") {
      return player.fees.status === "due" || player.fees.status === "overdue"
    }
    if (viewType === "high-performers") {
      return player.performance >= 85
    }
    if (viewType === "low-attendance") {
      return player.attendance < 85
    }
    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Academy Players</h1>
          <p className="text-muted-foreground">
            Manage all your academy players, track performance, and monitor attendance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <UserPlus className="h-4 w-4 mr-2" />
            Add New Player
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">126</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Players</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">118</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">93.6%</span> active rate
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fee Collection</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹1.2L</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">₹24K</span> pending
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-2/3 space-y-4">
          <Card className="bg-white">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Player Management</CardTitle>
                <Tabs defaultValue="all" className="w-[400px]" onValueChange={setViewType}>
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="due-fees">Due Fees</TabsTrigger>
                    <TabsTrigger value="high-performers">Top Performers</TabsTrigger>
                    <TabsTrigger value="low-attendance">Low Attendance</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search players..." className="w-full pl-8 bg-white" />
                </div>
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Batches</SelectItem>
                      <SelectItem value="Morning Batch">Morning Batch</SelectItem>
                      <SelectItem value="Evening Batch">Evening Batch</SelectItem>
                      <SelectItem value="Weekend Batch">Weekend Batch</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Select Sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Sports</SelectItem>
                      <SelectItem value="Cricket">Cricket</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Football">Football</SelectItem>
                      <SelectItem value="Badminton">Badminton</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                    </SelectContent>
                  </Select>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        More Filters
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[200px]">
                      <DropdownMenuItem>Age Group</DropdownMenuItem>
                      <DropdownMenuItem>Join Date</DropdownMenuItem>
                      <DropdownMenuItem>Performance</DropdownMenuItem>
                      <DropdownMenuItem>Fee Status</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="rounded-md border">
                <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
                  <div className="col-span-4">Player</div>
                  <div className="col-span-2">Batch & Level</div>
                  <div className="col-span-2">Attendance</div>
                  <div className="col-span-2">Fees Status</div>
                  <div className="col-span-2">Performance</div>
                </div>
                <div className="divide-y">
                  {filteredPlayers.length > 0 ? (
                    filteredPlayers.map((player) => (
                      <div
                        key={player.id}
                        className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
                      >
                        <div className="col-span-4">
                          <div className="flex items-center gap-3">
                            <Image
                              src={player.image || "/placeholder.svg"}
                              alt={player.name}
                              width={40}
                              height={40}
                              className="rounded-full object-cover"
                            />
                            <div>
                              <Link
                                href={`/supplier/academy/players/${player.id}`}
                                className="font-medium hover:underline"
                              >
                                {player.name}
                              </Link>
                              <div className="text-sm text-muted-foreground flex items-center gap-2">
                                <span>{player.age} years</span>
                                <span>•</span>
                                <span>{player.sport}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <div className="font-medium">{player.batch}</div>
                          <div className="text-sm text-muted-foreground">{player.level}</div>
                        </div>
                        <div className="col-span-2">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`h-2.5 rounded-full ${
                                  player.attendance >= 90
                                    ? "bg-green-600"
                                    : player.attendance >= 75
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                }`}
                                style={{ width: `${player.attendance}%` }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium">{player.attendance}%</span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <Badge className={getStatusColor(player.fees.status)}>
                            {player.fees.status === "paid"
                              ? "Paid"
                              : player.fees.status === "due"
                                ? `Due: ${player.fees.dueDate}`
                                : `Overdue: ${player.fees.dueDate}`}
                          </Badge>
                        </div>
                        <div className="col-span-2 flex items-center justify-between">
                          <span className={`font-medium ${getPerformanceColor(player.performance)}`}>
                            {player.performance}%
                          </span>
                          <Link href={`/supplier/academy/players/${player.id}`}>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-muted-foreground">No players match your filters.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/3 space-y-4">
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Players by Sport</CardTitle>
              <CardDescription>Distribution across different sports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                      <span>Cricket</span>
                    </div>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "33%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                      <span>Football</span>
                    </div>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-purple-500"></div>
                      <span>Tennis</span>
                    </div>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: "19%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                      <span>Badminton</span>
                    </div>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                      <span>Swimming</span>
                    </div>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-cyan-500 h-2 rounded-full" style={{ width: "6%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
              <CardDescription>Players by age group</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>8-10 years</span>
                    <span className="font-medium">28</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "22%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>11-13 years</span>
                    <span className="font-medium">45</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "36%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>14-16 years</span>
                    <span className="font-medium">38</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>17-19 years</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-emerald-500 h-2 rounded-full" style={{ width: "12%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
