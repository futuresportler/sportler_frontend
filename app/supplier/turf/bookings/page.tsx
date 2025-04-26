"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ChevronLeft, Search, CheckCircle, XCircle, ChevronDown, Download, Plus, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Sample booking data
const bookings = [
  {
    id: "BK-1001",
    customer: {
      name: "Rahul Sharma",
      email: "rahul.s@gmail.com",
      phone: "+91 98765 43210",
      avatar: "/placeholder.svg?height=40&width=40&text=RS",
    },
    turf: "Green Field Turf",
    court: "Football Court 1",
    date: "2023-08-15",
    time: "18:00 - 20:00",
    duration: "2 hours",
    amount: "₹2,000",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Online",
    source: "Website",
    createdAt: "2023-08-10",
  },
  {
    id: "BK-1002",
    customer: {
      name: "Priya Patel",
      email: "priya.p@outlook.com",
      phone: "+91 87654 32109",
      avatar: "/placeholder.svg?height=40&width=40&text=PP",
    },
    turf: "Green Field Turf",
    court: "Cricket Pitch A",
    date: "2023-08-15",
    time: "15:00 - 17:00",
    duration: "2 hours",
    amount: "₹2,500",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    source: "Playo",
    createdAt: "2023-08-09",
  },
  {
    id: "BK-1003",
    customer: {
      name: "Arjun Singh",
      email: "arjun.s@yahoo.com",
      phone: "+91 76543 21098",
      avatar: "/placeholder.svg?height=40&width=40&text=AS",
    },
    turf: "Green Field Turf",
    court: "Tennis Court 2",
    date: "2023-08-16",
    time: "09:00 - 11:00",
    duration: "2 hours",
    amount: "₹1,800",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "Pay at Venue",
    source: "Phone",
    createdAt: "2023-08-11",
  },
  {
    id: "BK-1004",
    customer: {
      name: "Neha Gupta",
      email: "neha.g@gmail.com",
      phone: "+91 65432 10987",
      avatar: "/placeholder.svg?height=40&width=40&text=NG",
    },
    turf: "Green Field Turf",
    court: "Basketball Court",
    date: "2023-08-16",
    time: "17:00 - 19:00",
    duration: "2 hours",
    amount: "₹1,600",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Card",
    source: "Website",
    createdAt: "2023-08-10",
  },
  {
    id: "BK-1005",
    customer: {
      name: "Vikram Mehta",
      email: "vikram.m@hotmail.com",
      phone: "+91 54321 09876",
      avatar: "/placeholder.svg?height=40&width=40&text=VM",
    },
    turf: "Sunset Sports Arena",
    court: "Football Court 2",
    date: "2023-08-17",
    time: "18:00 - 20:00",
    duration: "2 hours",
    amount: "₹2,200",
    status: "cancelled",
    paymentStatus: "refunded",
    paymentMethod: "Online",
    source: "Hudle",
    createdAt: "2023-08-08",
  },
  {
    id: "BK-1006",
    customer: {
      name: "Ananya Reddy",
      email: "ananya.r@gmail.com",
      phone: "+91 43210 98765",
      avatar: "/placeholder.svg?height=40&width=40&text=AR",
    },
    turf: "Sunset Sports Arena",
    court: "Badminton Court 1",
    date: "2023-08-17",
    time: "10:00 - 12:00",
    duration: "2 hours",
    amount: "₹1,400",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "UPI",
    source: "Website",
    createdAt: "2023-08-11",
  },
  {
    id: "BK-1007",
    customer: {
      name: "Karthik Nair",
      email: "karthik.n@outlook.com",
      phone: "+91 32109 87654",
      avatar: "/placeholder.svg?height=40&width=40&text=KN",
    },
    turf: "Green Field Turf",
    court: "Cricket Pitch B",
    date: "2023-08-18",
    time: "15:00 - 18:00",
    duration: "3 hours",
    amount: "₹3,600",
    status: "confirmed",
    paymentStatus: "paid",
    paymentMethod: "Card",
    source: "Playo",
    createdAt: "2023-08-12",
  },
  {
    id: "BK-1008",
    customer: {
      name: "Divya Sharma",
      email: "divya.s@yahoo.com",
      phone: "+91 21098 76543",
      avatar: "/placeholder.svg?height=40&width=40&text=DS",
    },
    turf: "Sunset Sports Arena",
    court: "Tennis Court 1",
    date: "2023-08-18",
    time: "08:00 - 10:00",
    duration: "2 hours",
    amount: "₹1,800",
    status: "pending",
    paymentStatus: "pending",
    paymentMethod: "Pay at Venue",
    source: "Phone",
    createdAt: "2023-08-13",
  },
]

// Calendar data for the week view
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const timeSlots = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
]

// Sample calendar bookings
const calendarBookings = [
  {
    day: "Mon",
    start: "09:00",
    end: "11:00",
    court: "Football Court 1",
    customer: "Rahul Sharma",
    status: "confirmed",
  },
  { day: "Mon", start: "15:00", end: "17:00", court: "Cricket Pitch A", customer: "Priya Patel", status: "confirmed" },
  { day: "Tue", start: "18:00", end: "20:00", court: "Basketball Court", customer: "Neha Gupta", status: "confirmed" },
  { day: "Wed", start: "10:00", end: "12:00", court: "Tennis Court 2", customer: "Arjun Singh", status: "pending" },
  {
    day: "Thu",
    start: "16:00",
    end: "18:00",
    court: "Football Court 2",
    customer: "Vikram Mehta",
    status: "cancelled",
  },
  {
    day: "Fri",
    start: "08:00",
    end: "10:00",
    court: "Badminton Court 1",
    customer: "Ananya Reddy",
    status: "confirmed",
  },
  { day: "Sat", start: "14:00", end: "17:00", court: "Cricket Pitch B", customer: "Karthik Nair", status: "confirmed" },
  { day: "Sun", start: "19:00", end: "21:00", court: "Tennis Court 1", customer: "Divya Sharma", status: "pending" },
]

export default function TurfBookingsPage() {
  const router = useRouter()
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")
  const [selectedTurf, setSelectedTurf] = useState("all")

  // Filter bookings based on search query and filters
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    const searchLower = searchQuery.toLowerCase()
    const matchesSearch =
      booking.id.toLowerCase().includes(searchLower) ||
      booking.customer.name.toLowerCase().includes(searchLower) ||
      booking.court.toLowerCase().includes(searchLower)

    // Status filter
    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    // Date filter (simplified for demo)
    const matchesDate = dateFilter === "all" // In a real app, implement proper date filtering

    // Turf filter
    const matchesTurf = selectedTurf === "all" || booking.turf.includes(selectedTurf)

    return matchesSearch && matchesStatus && matchesDate && matchesTurf
  })

  const openBookingDetails = (booking) => {
    setSelectedBooking(booking)
    setIsDetailsOpen(true)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Confirmed</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Cancelled</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200">Paid</Badge>
      case "pending":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">Pending</Badge>
      case "refunded":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Refunded</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="container py-6">
      <div className="flex items-center mb-6">
        <Link href="/supplier/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold">Turf Bookings</h1>
          <p className="text-gray-500">Manage all your turf bookings in one place</p>
        </div>
      </div>

      <div className="mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="col-span-1 md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search bookings by ID, customer or court..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Select value={selectedTurf} onValueChange={setSelectedTurf}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Turf" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Turfs</SelectItem>
                  <SelectItem value="Green Field">Green Field Turf</SelectItem>
                  <SelectItem value="Sunset Sports">Sunset Sports Arena</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          </TabsList>

          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Booking
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Court</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow
                      key={booking.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => openBookingDetails(booking)}
                    >
                      <TableCell className="font-medium">{booking.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={booking.customer.avatar || "/placeholder.svg"}
                              alt={booking.customer.name}
                            />
                            <AvatarFallback>
                              {booking.customer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{booking.customer.name}</div>
                            <div className="text-xs text-gray-500">{booking.source}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{booking.court}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span>
                            {new Date(booking.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                          <span className="text-sm text-gray-500">{booking.time}</span>
                        </div>
                      </TableCell>
                      <TableCell>{booking.amount}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(booking.paymentStatus)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation()
                                openBookingDetails(booking)
                              }}
                            >
                              View Details
                            </DropdownMenuItem>
                            {booking.status === "pending" && (
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Confirm Booking</DropdownMenuItem>
                            )}
                            {booking.status !== "cancelled" && (
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>Reschedule</DropdownMenuItem>
                            )}
                            {booking.status !== "cancelled" && (
                              <DropdownMenuItem className="text-red-600" onClick={(e) => e.stopPropagation()}>
                                Cancel Booking
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredBookings.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                        No bookings found matching your filters
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-gray-500">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="calendar" className="mt-0">
          <Card>
            <CardHeader className="pb-0">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <h3 className="text-lg font-medium">August 14 - 20, 2023</h3>
                  <Button variant="outline" size="sm">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  Today
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-8 gap-2">
                {/* Time column */}
                <div className="col-span-1">
                  <div className="h-12"></div> {/* Empty header cell */}
                  {timeSlots.map((time, index) => (
                    <div key={index} className="h-16 text-xs text-gray-500 flex items-start justify-end pr-2 -mt-2">
                      {time}
                    </div>
                  ))}
                </div>

                {/* Days columns */}
                {weekDays.map((day, dayIndex) => (
                  <div key={dayIndex} className="col-span-1">
                    <div className="h-12 text-center font-medium border-b">
                      <div>{day}</div>
                      <div className="text-sm text-gray-500">{14 + dayIndex}</div>
                    </div>
                    <div className="relative">
                      {timeSlots.map((time, timeIndex) => (
                        <div key={timeIndex} className="h-16 border-b border-gray-100"></div>
                      ))}

                      {/* Render bookings for this day */}
                      {calendarBookings
                        .filter((booking) => booking.day === day)
                        .map((booking, index) => {
                          const startHour = Number.parseInt(booking.start.split(":")[0])
                          const endHour = Number.parseInt(booking.end.split(":")[0])
                          const duration = endHour - startHour
                          const startIndex = timeSlots.findIndex((t) => t === booking.start)

                          let bgColor = "bg-blue-100 border-blue-200 text-blue-800"
                          if (booking.status === "confirmed") bgColor = "bg-green-100 border-green-200 text-green-800"
                          if (booking.status === "pending") bgColor = "bg-yellow-100 border-yellow-200 text-yellow-800"
                          if (booking.status === "cancelled") bgColor = "bg-red-100 border-red-200 text-red-800"

                          return (
                            <div
                              key={index}
                              className={`absolute left-0 right-0 mx-1 p-1 rounded-md border ${bgColor} text-xs overflow-hidden`}
                              style={{
                                top: `${startIndex * 4}rem`,
                                height: `${duration * 4}rem`,
                              }}
                            >
                              <div className="font-medium">{booking.court}</div>
                              <div>{booking.customer}</div>
                              <div>
                                {booking.start} - {booking.end}
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Booking Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedBooking && (
            <>
              <DialogHeader>
                <DialogTitle>Booking Details</DialogTitle>
                <DialogDescription>Booking ID: {selectedBooking.id}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Customer Information</h4>
                    <div className="flex items-center gap-3 mt-2">
                      <Avatar>
                        <AvatarImage
                          src={selectedBooking.customer.avatar || "/placeholder.svg"}
                          alt={selectedBooking.customer.name}
                        />
                        <AvatarFallback>
                          {selectedBooking.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{selectedBooking.customer.name}</p>
                        <p className="text-sm text-gray-500">{selectedBooking.customer.email}</p>
                        <p className="text-sm text-gray-500">{selectedBooking.customer.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Booking Information</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">Turf</p>
                        <p className="font-medium">{selectedBooking.turf}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Court</p>
                        <p className="font-medium">{selectedBooking.court}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-medium">
                          {new Date(selectedBooking.date).toLocaleDateString("en-US", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Time</p>
                        <p className="font-medium">{selectedBooking.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium">{selectedBooking.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Source</p>
                        <p className="font-medium">{selectedBooking.source}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Payment Information</h4>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-gray-500">Amount</p>
                        <p className="font-medium">{selectedBooking.amount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">{selectedBooking.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p>{getPaymentStatusBadge(selectedBooking.paymentStatus)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Booking Status</p>
                        <p>{getStatusBadge(selectedBooking.status)}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Additional Information</h4>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">Created On</p>
                      <p className="font-medium">
                        {new Date(selectedBooking.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between items-center">
                <div>
                  {selectedBooking.status !== "cancelled" && (
                    <Button variant="destructive" size="sm">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancel Booking
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  {selectedBooking.status === "pending" && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Confirm Booking
                    </Button>
                  )}
                  <Button variant="outline" size="sm" onClick={() => setIsDetailsOpen(false)}>
                    Close
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
