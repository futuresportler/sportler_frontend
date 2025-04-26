"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ChevronLeft,
  Plus,
  Filter,
  Search,
  Calendar,
  Users,
  Clock,
  Edit,
  Trash2,
  MoreHorizontal,
  Layers,
  DollarSign,
} from "lucide-react"
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
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

export default function CourtsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const turfId = params.id
  const [activeTab, setActiveTab] = useState("all-sports")
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddCourtOpen, setIsAddCourtOpen] = useState(false)

  // Mock data for courts
  const [courts, setCourts] = useState([
    {
      id: "1",
      name: "Main Football Court",
      sport: "Football",
      surface: "Artificial Turf",
      dimensions: "100m x 64m",
      capacity: 22,
      hourlyRate: "₹2,000",
      features: ["Floodlights", "Changing Rooms", "Spectator Seating"],
      availability: "24/7",
      status: "Active",
      maintenanceSchedule: "Every Monday",
      bookingRate: "85%",
    },
    {
      id: "2",
      name: "Cricket Pitch 1",
      sport: "Cricket",
      surface: "Natural Grass",
      dimensions: "Standard",
      capacity: 22,
      hourlyRate: "₹2,500",
      features: ["Floodlights", "Changing Rooms", "Practice Nets"],
      availability: "6:00 AM - 10:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Tuesday",
      bookingRate: "78%",
    },
    {
      id: "3",
      name: "Basketball Court A",
      sport: "Basketball",
      surface: "Hardwood",
      dimensions: "28m x 15m",
      capacity: 10,
      hourlyRate: "₹1,200",
      features: ["Floodlights", "Covered Area"],
      availability: "6:00 AM - 10:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Wednesday",
      bookingRate: "65%",
    },
    {
      id: "4",
      name: "Tennis Court 1",
      sport: "Tennis",
      surface: "Clay",
      dimensions: "23.77m x 10.97m",
      capacity: 4,
      hourlyRate: "₹800",
      features: ["Floodlights"],
      availability: "6:00 AM - 9:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Thursday",
      bookingRate: "72%",
    },
    {
      id: "5",
      name: "Tennis Court 2",
      sport: "Tennis",
      surface: "Hard Court",
      dimensions: "23.77m x 10.97m",
      capacity: 4,
      hourlyRate: "₹900",
      features: ["Floodlights", "Covered Area"],
      availability: "6:00 AM - 9:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Thursday",
      bookingRate: "68%",
    },
    {
      id: "6",
      name: "Futsal Court",
      sport: "Football",
      surface: "Artificial Turf",
      dimensions: "40m x 20m",
      capacity: 10,
      hourlyRate: "₹1,500",
      features: ["Floodlights", "Covered Area"],
      availability: "24/7",
      status: "Active",
      maintenanceSchedule: "Every Friday",
      bookingRate: "90%",
    },
    {
      id: "7",
      name: "Badminton Court 1",
      sport: "Badminton",
      surface: "Synthetic",
      dimensions: "13.4m x 6.1m",
      capacity: 4,
      hourlyRate: "₹600",
      features: ["Indoor", "Air Conditioned"],
      availability: "6:00 AM - 10:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Saturday",
      bookingRate: "75%",
    },
    {
      id: "8",
      name: "Badminton Court 2",
      sport: "Badminton",
      surface: "Synthetic",
      dimensions: "13.4m x 6.1m",
      capacity: 4,
      hourlyRate: "₹600",
      features: ["Indoor", "Air Conditioned"],
      availability: "6:00 AM - 10:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Saturday",
      bookingRate: "70%",
    },
    {
      id: "9",
      name: "Volleyball Court",
      sport: "Volleyball",
      surface: "Sand",
      dimensions: "18m x 9m",
      capacity: 12,
      hourlyRate: "₹1,000",
      features: ["Floodlights"],
      availability: "6:00 AM - 8:00 PM",
      status: "Maintenance",
      maintenanceSchedule: "Currently under maintenance",
      bookingRate: "0%",
    },
    {
      id: "10",
      name: "Multi-purpose Court",
      sport: "Multiple",
      surface: "Synthetic",
      dimensions: "30m x 20m",
      capacity: 20,
      hourlyRate: "₹1,800",
      features: ["Floodlights", "Changing Rooms", "Equipment Rental"],
      availability: "6:00 AM - 10:00 PM",
      status: "Active",
      maintenanceSchedule: "Every Sunday",
      bookingRate: "82%",
    },
  ])

  // Filter courts based on active tab and search query
  const filteredCourts = courts.filter((court) => {
    const matchesTab = activeTab === "all-sports" || court.sport.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch =
      court.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.surface.toLowerCase().includes(searchQuery.toLowerCase()) ||
      court.sport.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  // Calculate statistics
  const totalCourts = courts.length
  const activeCourts = courts.filter((court) => court.status === "Active").length
  const averageBookingRate = Math.round(
    courts.reduce((acc, court) => {
      const rate = Number.parseFloat(court.bookingRate.replace("%", ""))
      return court.status === "Active" ? acc + rate : acc
    }, 0) / activeCourts,
  )

  // Get unique sports for tabs
  const sports = ["All Sports", ...new Set(courts.map((court) => court.sport))]

  const handleAddCourt = (formData) => {
    // In a real app, you would save the new court to the database
    console.log("Adding new court:", formData)
    setIsAddCourtOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/supplier/turf/${turfId}`}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Turf
            </Link>
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Courts</h1>
        </div>
        <div className="flex items-center gap-2">
          <AddCourtDialog isOpen={isAddCourtOpen} setIsOpen={setIsAddCourtOpen} onAddCourt={handleAddCourt} />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Manage your turf's courts and facilities across all sports</h2>
      </div>

      {/* Court Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Courts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{totalCourts}</div>
            <p className="text-sm text-emerald-600 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> 2 new courts this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Average Booking Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{averageBookingRate}%</div>
            <p className="text-sm text-emerald-600 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> 5.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Active Courts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{activeCourts}</div>
            <p className="text-sm text-emerald-600 flex items-center mt-1">
              <span className="inline-block mr-1">↑</span> All courts operational
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
          <h3 className="text-lg font-semibold">All Courts</h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search courts..."
                className="pl-8 w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setIsAddCourtOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Court
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <div className="grid grid-cols-12 gap-2 p-4 bg-muted/50 text-sm font-medium">
            <div className="col-span-3">Court Name</div>
            <div className="col-span-2">Surface</div>
            <div className="col-span-1">Capacity</div>
            <div className="col-span-1">Rate</div>
            <div className="col-span-2">Features</div>
            <div className="col-span-1">Booking Rate</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>
          <div className="divide-y">
            {filteredCourts.map((court) => (
              <div
                key={court.id}
                className="grid grid-cols-12 gap-2 p-4 items-center hover:bg-muted/30 transition-colors"
              >
                <div className="col-span-3">
                  <div className="font-medium">{court.name}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <Badge variant="outline" className="text-xs">
                      {court.sport}
                    </Badge>
                    <span className="text-xs">•</span>
                    <span className="text-xs">{court.dimensions}</span>
                  </div>
                </div>
                <div className="col-span-2">
                  <div className="text-sm flex items-start gap-1">
                    <Layers className="h-3.5 w-3.5 mt-0.5 text-muted-foreground" />
                    <span>{court.surface}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>{court.capacity}</span>
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm">{court.hourlyRate}</div>
                  <div className="text-xs text-muted-foreground">per hour</div>
                </div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-1">
                    {court.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {court.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{court.features.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="text-sm">{court.bookingRate}</div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                    <div className="bg-emerald-600 h-1.5 rounded-full" style={{ width: court.bookingRate }}></div>
                  </div>
                </div>
                <div className="col-span-1">
                  <Badge
                    className={
                      court.status === "Active" ? "bg-emerald-100 text-emerald-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {court.status}
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
                        <Calendar className="h-4 w-4 mr-2" />
                        View Bookings
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

function AddCourtDialog({ isOpen, setIsOpen, onAddCourt }) {
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    surface: "",
    dimensions: "",
    capacity: "",
    hourlyRate: "",
    features: {
      floodlights: false,
      changingRooms: false,
      spectatorSeating: false,
      covered: false,
      airConditioned: false,
      equipmentRental: false,
    },
    availability: "",
    maintenanceSchedule: "",
  })

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleFeatureChange = (feature) => {
    setFormData((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddCourt(formData)
    setFormData({
      name: "",
      sport: "",
      surface: "",
      dimensions: "",
      capacity: "",
      hourlyRate: "",
      features: {
        floodlights: false,
        changingRooms: false,
        spectatorSeating: false,
        covered: false,
        airConditioned: false,
        equipmentRental: false,
      },
      availability: "",
      maintenanceSchedule: "",
    })
  }

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus className="h-4 w-4 mr-2" />
        Add Court
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Court</DialogTitle>
            <DialogDescription>Create a new court or facility for your turf.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Court Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    placeholder="e.g. Main Football Court"
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
                      <SelectItem value="Football">Football</SelectItem>
                      <SelectItem value="Cricket">Cricket</SelectItem>
                      <SelectItem value="Basketball">Basketball</SelectItem>
                      <SelectItem value="Tennis">Tennis</SelectItem>
                      <SelectItem value="Badminton">Badminton</SelectItem>
                      <SelectItem value="Volleyball">Volleyball</SelectItem>
                      <SelectItem value="Multiple">Multiple</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="surface">Surface Type</Label>
                  <Select value={formData.surface} onValueChange={(value) => handleChange("surface", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select surface" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Artificial Turf">Artificial Turf</SelectItem>
                      <SelectItem value="Natural Grass">Natural Grass</SelectItem>
                      <SelectItem value="Hardwood">Hardwood</SelectItem>
                      <SelectItem value="Clay">Clay</SelectItem>
                      <SelectItem value="Hard Court">Hard Court</SelectItem>
                      <SelectItem value="Synthetic">Synthetic</SelectItem>
                      <SelectItem value="Sand">Sand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dimensions">Dimensions</Label>
                  <Input
                    id="dimensions"
                    value={formData.dimensions}
                    onChange={(e) => handleChange("dimensions", e.target.value)}
                    placeholder="e.g. 100m x 64m"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacity</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleChange("capacity", e.target.value)}
                    placeholder="Max players"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                    </div>
                    <Input
                      id="hourlyRate"
                      value={formData.hourlyRate}
                      onChange={(e) => handleChange("hourlyRate", e.target.value)}
                      className="pl-10"
                      placeholder="e.g. 2000"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="floodlights"
                      checked={formData.features.floodlights}
                      onCheckedChange={() => handleFeatureChange("floodlights")}
                    />
                    <Label htmlFor="floodlights">Floodlights</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="changingRooms"
                      checked={formData.features.changingRooms}
                      onCheckedChange={() => handleFeatureChange("changingRooms")}
                    />
                    <Label htmlFor="changingRooms">Changing Rooms</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="spectatorSeating"
                      checked={formData.features.spectatorSeating}
                      onCheckedChange={() => handleFeatureChange("spectatorSeating")}
                    />
                    <Label htmlFor="spectatorSeating">Spectator Seating</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="covered"
                      checked={formData.features.covered}
                      onCheckedChange={() => handleFeatureChange("covered")}
                    />
                    <Label htmlFor="covered">Covered Area</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="airConditioned"
                      checked={formData.features.airConditioned}
                      onCheckedChange={() => handleFeatureChange("airConditioned")}
                    />
                    <Label htmlFor="airConditioned">Air Conditioned</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="equipmentRental"
                      checked={formData.features.equipmentRental}
                      onCheckedChange={() => handleFeatureChange("equipmentRental")}
                    />
                    <Label htmlFor="equipmentRental">Equipment Rental</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="availability">Availability Hours</Label>
                  <Input
                    id="availability"
                    value={formData.availability}
                    onChange={(e) => handleChange("availability", e.target.value)}
                    placeholder="e.g. 6:00 AM - 10:00 PM"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceSchedule">Maintenance Schedule</Label>
                  <Input
                    id="maintenanceSchedule"
                    value={formData.maintenanceSchedule}
                    onChange={(e) => handleChange("maintenanceSchedule", e.target.value)}
                    placeholder="e.g. Every Monday"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Additional Information</Label>
                <Textarea
                  id="description"
                  placeholder="Any additional details about the court"
                  className="min-h-[80px]"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Court</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
