"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Plus, Filter, Search, Calendar, Users, Clock, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createBatch } from "@/services/academyService"

export default function BatchesPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const academyId = params.id
  const [activeTab, setActiveTab] = useState("all-sports")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddBatchOpen, setIsAddBatchOpen] = useState(false)

  // Mock data for batches
  const [batches, setBatches] = useState([
    {
      id: "1",
      name: "Morning Batch",
      sport: "Cricket",
      level: "Advanced",
      schedule: "Mon, Wed, Fri @ 6:00 AM - 8:00 AM",
      coach: "Ajay Patel",
      capacity: 30,
      enrolled: 28,
      fee: "₹15,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "2",
      name: "Evening Batch",
      sport: "Cricket",
      level: "Intermediate",
      schedule: "Mon, Wed, Fri @ 5:00 PM - 7:00 PM",
      coach: "Rahul Dravid",
      capacity: 35,
      enrolled: 32,
      fee: "₹12,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "3",
      name: "Weekend Batch",
      sport: "Cricket",
      level: "Beginner",
      schedule: "Sat, Sun @ 9:00 AM - 12:00 PM",
      coach: "Zaheer Khan",
      capacity: 50,
      enrolled: 45,
      fee: "₹10,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "4",
      name: "Morning Batch",
      sport: "Football",
      level: "Beginner",
      schedule: "Tue, Thu @ 7:00 AM - 9:00 AM",
      coach: "Sunil Chhetri",
      capacity: 25,
      enrolled: 18,
      fee: "₹8,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "5",
      name: "Evening Batch",
      sport: "Football",
      level: "Intermediate",
      schedule: "Tue, Thu, Sat @ 5:00 PM - 7:00 PM",
      coach: "Gurpreet Singh",
      capacity: 30,
      enrolled: 22,
      fee: "₹10,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "6",
      name: "Morning Batch",
      sport: "Basketball",
      level: "Beginner",
      schedule: "Mon, Wed, Fri @ 7:00 AM - 9:00 AM",
      coach: "Satnam Singh",
      capacity: 20,
      enrolled: 12,
      fee: "₹8,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "7",
      name: "Evening Batch",
      sport: "Basketball",
      level: "Intermediate",
      schedule: "Tue, Thu @ 5:00 PM - 7:00 PM",
      coach: "Amjyot Singh",
      capacity: 25,
      enrolled: 15,
      fee: "₹10,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "8",
      name: "Morning Batch",
      sport: "Tennis",
      level: "Beginner",
      schedule: "Tue, Thu, Sat @ 8:00 AM - 10:00 AM",
      coach: "Sania Mirza",
      capacity: 15,
      enrolled: 8,
      fee: "₹12,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "9",
      name: "Evening Batch",
      sport: "Tennis",
      level: "Intermediate",
      schedule: "Mon, Wed, Fri @ 4:00 PM - 6:00 PM",
      coach: "Rohan Bopanna",
      capacity: 15,
      enrolled: 10,
      fee: "₹15,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "10",
      name: "Morning Batch",
      sport: "Swimming",
      level: "Beginner",
      schedule: "Mon, Wed, Fri @ 6:00 AM - 8:00 AM",
      coach: "Virdhawal Khade",
      capacity: 20,
      enrolled: 12,
      fee: "₹10,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "11",
      name: "Evening Batch",
      sport: "Swimming",
      level: "Intermediate",
      schedule: "Tue, Thu @ 5:00 PM - 7:00 PM",
      coach: "Sajan Prakash",
      capacity: 20,
      enrolled: 15,
      fee: "₹12,000",
      paymentType: "Monthly",
      status: "Active",
    },
    {
      id: "12",
      name: "Morning Batch",
      sport: "Athletics",
      level: "Beginner",
      schedule: "Mon, Wed, Fri @ 6:00 AM - 8:00 AM",
      coach: "Neeraj Chopra",
      capacity: 25,
      enrolled: 15,
      fee: "₹8,000",
      paymentType: "Monthly",
      status: "Active",
    },
  ])

  // Filter batches based on active tab and search query
  const filteredBatches = batches.filter((batch) => {
    const matchesTab = activeTab === "all-sports" || batch.sport.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch =
      batch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.coach.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.level.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Calculate statistics
  const totalBatches = batches.length
  const averageUtilization = Math.round(
    batches.reduce((acc, batch) => acc + (batch.enrolled / batch.capacity) * 100, 0) / totalBatches,
  )
  const openCapacity = batches.reduce((acc, batch) => acc + (batch.capacity - batch.enrolled), 0)

  // Get unique sports for tabs
  const sports = ["All Sports", ...new Set(batches.map((batch) => batch.sport))]

  const handleAddBatch = (formData) => {
    // In a real app, you would save the new batch to the database
    console.log("Adding new batch:", formData)
    setIsAddBatchOpen(false)
  }

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
          <h1 className="text-2xl font-bold text-gray-800">Batches</h1>
        </div>
        <div className="flex items-center gap-2">
          <AddBatchDialog
            isOpen={isAddBatchOpen}
            setIsOpen={setIsAddBatchOpen}
            onAddBatch={handleAddBatch}
            params={params}
            setBatches={setBatches}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Manage your academy's batches and capacities across all sports</h2>
      </div>

      {/* Batch Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Batches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalBatches}</div>
            <p className="text-sm text-emerald-600 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> 3 new batches this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Average Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageUtilization}%</div>
            <p className="text-sm text-emerald-600 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> 4.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Open Capacity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{openCapacity}</div>
            <p className="text-sm text-red-600 flex items-center mt-1">
              <span className="inline-block mr-1">↓</span> 12 fewer spots than last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Sports Tabs */}
      <Tabs defaultValue="all-sports" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="flex overflow-x-auto pb-2 mb-2">
          {sports.map((sport) => (
            <TabsTrigger
              key={sport}
              value={sport === "All Sports" ? "all-sports" : sport.toLowerCase()}
              className="px-4 py-2"
            >
              {sport}
            </TabsTrigger>
          ))}
        </TabsList>

        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">All Batches</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search batches..."
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setIsAddBatchOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Batch
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
            <div className="col-span-3">Batch Name</div>
            <div className="col-span-2">Schedule</div>
            <div className="col-span-2">Coach</div>
            <div className="col-span-1">Capacity</div>
            <div className="col-span-1">Enrolled</div>
            <div className="col-span-1">Fee</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
          <div className="divide-y">
            {filteredBatches.map((batch) => (
              <div
                key={batch.id}
                className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
              >
                <div className="col-span-3">
                  <div className="font-medium">{batch.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {batch.sport}
                    </Badge>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{batch.level}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm flex items-start gap-1">
                    <Calendar className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                    <span>{batch.schedule}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm">{batch.coach}</div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm">{batch.capacity}</div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm">{batch.enrolled}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div
                      className="bg-emerald-600 h-1.5 rounded-full"
                      style={{ width: `${(batch.enrolled / batch.capacity) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm">{batch.fee}</div>
                  <div className="text-xs text-muted-foreground">{batch.paymentType}</div>
                </div>
                <div className="col-span-1">
                  <Badge
                    className={
                      batch.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {batch.status}
                  </Badge>
                </div>
                <div className="col-span-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Users className="h-4 w-4 mr-2" />
                        View Students
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Clock className="h-4 w-4 mr-2" />
                        Manage Schedule
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Tabs>
    </div>
  )
}

function AddBatchDialog({ isOpen, setIsOpen, onAddBatch, params, setBatches }) {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    level: "",
    schedule: "",
    coach: "",
    capacity: "",
    fee: "",
    paymentType: "",
    ageGroup: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Format the data for the API
      const batchData = {
        name: formData.name,
        academyId: params.id,
        sport: formData.sport,
        level: formData.level,
        schedule: formData.schedule,
        coach: formData.coach,
        capacity: Number.parseInt(formData.capacity),
        fee: formData.fee,
        paymentType: formData.paymentType,
        ageGroup: formData.ageGroup || "All ages", // Add this field
      }

      // Call the API to create the batch
      const result = await createBatch(batchData)

      if (result.success) {
        // Add the new batch to the local state with a temporary ID
        const newBatch = {
          id: `temp-${Date.now()}`,
          ...formData,
          status: "Active",
          enrolled: 0,
        }

        setBatches((prev) => [...prev, newBatch])

        // Reset the form
        setFormData({
          name: "",
          sport: "",
          level: "",
          schedule: "",
          coach: "",
          capacity: "",
          fee: "",
          paymentType: "",
          ageGroup: "",
        })

        // Close the dialog
        setIsOpen(false)
      } else {
        // Handle error
        console.error("Failed to create batch:", result.error)
        alert(`Failed to create batch: ${result.error}`)
      }
    } catch (error) {
      console.error("Error creating batch:", error)
      alert("An error occurred while creating the batch")
    }
  }

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Batch
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Add New Batch</DialogTitle>
            <DialogDescription>Create a new training batch for your academy.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Batch Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Morning Batch"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sport">Sport</Label>
                  <Select value={formData.sport} onValueChange={(value) => handleChange("sport", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cricket">Cricket</SelectItem>
                      <SelectItem value="Football">Football</SelectItem>
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Swimming">Swimming</SelectItem>
                      <SelectItem value="Athletics">Athletics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select value={formData.level} onValueChange={(value) => handleChange("level", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coach">Coach</Label>
                  <Input
                    id="coach"
                    value={formData.coach}
                    onChange={(e) => handleChange("coach", e.target.value)}
                    placeholder="Coach name"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule">Schedule</Label>
                <Input
                  id="schedule"
                  value={formData.schedule}
                  onChange={(e) => handleChange("schedule", e.target.value)}
                  placeholder="e.g. Mon, Wed, Fri @ 6:00 AM - 8:00 AM"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    placeholder="Max students"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fee">Fee</Label>
                  <Input
                    id="fee"
                    value={formData.fee}
                    onChange={(e) => handleChange("fee", e.target.value)}
                    placeholder="e.g. ₹10,000"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentType">Payment Type</Label>
                <Select value={formData.paymentType} onValueChange={(value) => handleChange("paymentType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="One-time">One-time</SelectItem>
                    <SelectItem value="Monthly">Monthly</SelectItem>
                    <SelectItem value="Quarterly">Quarterly</SelectItem>
                    <SelectItem value="Yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="ageGroup">Age Group</Label>
                <Input
                  id="ageGroup"
                  value={formData.ageGroup}
                  onChange={(e) => handleChange("ageGroup", e.target.value)}
                  placeholder="e.g. 10-12 years"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Batch</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
