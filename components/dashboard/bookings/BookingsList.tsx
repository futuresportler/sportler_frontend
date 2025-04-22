"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Clock, MapPin, Calendar, CheckCircle, XCircle, AlertCircle, Search, ChevronDown } from "lucide-react"

export default function BookingsList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("date-desc")

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBookings([
        {
          id: 1,
          title: "Footwork & Smash Training",
          coach: "Coach J. Dhavan",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=JD",
          academy: "Padukone Badminton Academy",
          date: "Sunday, April 20, 2025",
          time: "10:00 AM - 11:30 AM",
          location: "Court 3, Padukone Badminton Academy",
          status: "upcoming",
          isPaid: true,
          type: "training",
          price: 1200,
        },
        {
          id: 2,
          title: "Defensive Techniques",
          coach: "Coach Sarah M.",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=SM",
          academy: "Padukone Badminton Academy",
          date: "Wednesday, April 23, 2025",
          time: "4:00 PM - 5:30 PM",
          location: "Court 2, Padukone Badminton Academy",
          status: "upcoming",
          isPaid: true,
          type: "training",
          price: 1500,
        },
        {
          id: 3,
          title: "Doubles Strategy Session",
          coach: "Coach Rahul K.",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=RK",
          academy: "East Zone Pro Badminton Academy",
          date: "Friday, April 25, 2025",
          time: "6:00 PM - 7:30 PM",
          location: "Main Court, East Zone Pro Badminton Academy",
          status: "upcoming",
          isPaid: false,
          type: "training",
          price: 1800,
        },
        {
          id: 4,
          title: "Basic Techniques Training",
          coach: "Coach J. Dhavan",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=JD",
          academy: "Padukone Badminton Academy",
          date: "Monday, April 14, 2025",
          time: "10:00 AM - 11:30 AM",
          location: "Court 1, Padukone Badminton Academy",
          status: "completed",
          isPaid: true,
          type: "training",
          price: 1200,
          feedback: {
            rating: 4.5,
            comment: "Great session! Learned a lot about proper technique.",
          },
        },
        {
          id: 5,
          title: "Fitness Training",
          coach: "Coach Priya S.",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=PS",
          academy: "Padukone Badminton Academy",
          date: "Wednesday, April 16, 2025",
          time: "4:00 PM - 5:30 PM",
          location: "Fitness Center, Padukone Badminton Academy",
          status: "cancelled",
          isPaid: true,
          type: "fitness",
          price: 1000,
          cancellationReason: "Coach unavailable",
        },
        {
          id: 6,
          title: "Cardio Fitness",
          coach: "Coach Priya S.",
          coachAvatar: "/placeholder.svg?height=40&width=40&text=PS",
          academy: "Padukone Badminton Academy",
          date: "Monday, April 28, 2025",
          time: "5:00 PM - 6:00 PM",
          location: "Fitness Center, Padukone Badminton Academy",
          status: "upcoming",
          isPaid: true,
          type: "fitness",
          price: 800,
        },
      ])
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
            <Calendar size={12} className="mr-1" />
            Upcoming
          </div>
        )
      case "completed":
        return (
          <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </div>
        )
      case "cancelled":
        return (
          <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle size={12} className="mr-1" />
            Cancelled
          </div>
        )
      default:
        return null
    }
  }

  const getTypeBadge = (type) => {
    switch (type) {
      case "training":
        return (
          <div className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-medium">
            Training
          </div>
        )
      case "fitness":
        return (
          <div className="flex items-center text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-medium">
            Fitness
          </div>
        )
      default:
        return null
    }
  }

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    // Filter by status
    if (filter !== "all" && booking.status !== filter) {
      return false
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        booking.title.toLowerCase().includes(query) ||
        booking.coach.toLowerCase().includes(query) ||
        booking.academy.toLowerCase().includes(query) ||
        booking.location.toLowerCase().includes(query)
      )
    }

    return true
  })

  // Sort bookings
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)

    switch (sortBy) {
      case "date-asc":
        return dateA - dateB
      case "date-desc":
        return dateB - dateA
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      default:
        return dateB - dateA
    }
  })

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="p-6 space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-gray-800">Your Bookings</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookings..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              />
            </div>

            <div className="flex gap-2">
              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Bookings</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-gray-100 border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="date-desc">Newest First</option>
                  <option value="date-asc">Oldest First</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="price-asc">Price: Low to High</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="divide-y divide-gray-100">
        {sortedBookings.length > 0 ? (
          sortedBookings.map((booking) => (
            <div
              key={booking.id}
              className={`p-6 hover:bg-gray-50 transition-colors ${
                booking.status === "upcoming"
                  ? "border-l-4 border-blue-500"
                  : booking.status === "completed"
                    ? "border-l-4 border-green-500"
                    : "border-l-4 border-red-500"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                    <Image
                      src={booking.coachAvatar || "/placeholder.svg"}
                      alt={booking.coach}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-medium text-gray-800">{booking.title}</h3>
                      <div className="flex gap-1">
                        {getStatusBadge(booking.status)}
                        {getTypeBadge(booking.type)}
                        {!booking.isPaid && (
                          <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-medium">
                            <AlertCircle size={12} className="mr-1" />
                            Payment Pending
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm">
                      {booking.coach} • {booking.academy}
                    </p>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>{booking.date}</span>
                      </div>

                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span>{booking.time}</span>
                      </div>

                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{booking.location}</span>
                      </div>
                    </div>

                    {booking.status === "cancelled" && booking.cancellationReason && (
                      <div className="mt-2 text-sm text-red-600 bg-red-50 px-3 py-1.5 rounded-md inline-block">
                        Reason: {booking.cancellationReason}
                      </div>
                    )}

                    {booking.status === "completed" && booking.feedback && (
                      <div className="mt-2 text-sm bg-green-50 px-3 py-1.5 rounded-md inline-block">
                        <div className="flex items-center text-green-700">
                          <span className="font-medium mr-1">Your Rating:</span>
                          {booking.feedback.rating}/5
                        </div>
                        <div className="text-gray-600 mt-1">{booking.feedback.comment}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-2 md:flex-col lg:flex-row">
                  <div className="text-right mb-2 md:mb-0">
                    <div className="text-sm text-gray-500">Price</div>
                    <div className="font-bold text-gray-800">₹{booking.price}</div>
                  </div>

                  {booking.status === "upcoming" && (
                    <div className="flex gap-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        {booking.isPaid ? "View Details" : "Complete Payment"}
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Reschedule
                      </button>
                    </div>
                  )}

                  {booking.status === "completed" && (
                    <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      {booking.feedback ? "View Feedback" : "Leave Feedback"}
                    </button>
                  )}

                  {booking.status === "cancelled" && (
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                      Book Again
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">No bookings found</h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? "No bookings match your search criteria"
                : filter !== "all"
                  ? `You don't have any ${filter} bookings`
                  : "You haven't made any bookings yet"}
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Book a Session
            </button>
          </div>
        )}
      </div>

      {sortedBookings.length > 0 && (
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-gray-500 mb-4 sm:mb-0">
              Showing {sortedBookings.length} of {bookings.length} bookings
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Book a New Session
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
