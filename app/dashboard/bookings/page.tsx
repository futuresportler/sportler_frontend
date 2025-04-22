"use client"

import { useState, useEffect } from "react"
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  CalendarIcon,
  Filter,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react"
import Image from "next/image"

export default function BookingsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sessions, setSessions] = useState([])
  const [view, setView] = useState("calendar") // calendar or list
  const [filterType, setFilterType] = useState("all") // all, training, fitness
  const [filterStatus, setFilterStatus] = useState("all") // all, upcoming, completed, cancelled

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Calendar helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Sample booking dates with session counts
  const bookingDates = {
    "2025-04-10": { count: 1, type: "training" },
    "2025-04-14": { count: 1, type: "training" },
    "2025-04-16": { count: 1, type: "fitness" },
    "2025-04-20": { count: 2, type: "training" },
    "2025-04-23": { count: 1, type: "training" },
    "2025-04-25": { count: 1, type: "training" },
    "2025-04-28": { count: 1, type: "fitness" },
  }

  // Sample sessions for the selected date
  useEffect(() => {
    const dateString = selectedDate.toISOString().split("T")[0]

    // Mock sessions based on the selected date
    if (bookingDates[dateString]) {
      if (dateString === "2025-04-20") {
        setSessions([
          {
            id: 1,
            title: "Footwork & Smash Training",
            time: "10:00 AM - 11:30 AM",
            coach: "Coach J. Dhavan",
            coachAvatar: "/placeholder.svg?height=48&width=48&text=JD",
            location: "Court 3, Padukone Badminton Academy",
            academy: "Padukone Badminton Academy",
            type: "training",
            status: "upcoming",
            isPaid: true,
            price: 1200,
          },
          {
            id: 2,
            title: "Fitness Session",
            time: "4:00 PM - 5:00 PM",
            coach: "Coach Sarah M.",
            coachAvatar: "/placeholder.svg?height=48&width=48&text=SM",
            location: "Fitness Center, Padukone Badminton Academy",
            academy: "Padukone Badminton Academy",
            type: "fitness",
            status: "upcoming",
            isPaid: true,
            price: 800,
          },
        ])
      } else if (dateString === "2025-04-14" || dateString === "2025-04-16") {
        setSessions([
          {
            id: 3,
            title: bookingDates[dateString].type === "training" ? "Basic Techniques Training" : "Fitness Training",
            time: "10:00 AM - 11:30 AM",
            coach: "Coach J. Dhavan",
            coachAvatar: "/placeholder.svg?height=48&width=48&text=JD",
            location: "Court 1, Padukone Badminton Academy",
            academy: "Padukone Badminton Academy",
            type: bookingDates[dateString].type,
            status: "completed",
            isPaid: true,
            price: 1200,
            feedback: {
              rating: 4.5,
              comment: "Great session! Learned a lot about proper technique.",
            },
          },
        ])
      } else {
        setSessions([
          {
            id: 4,
            title: bookingDates[dateString].type === "training" ? "Training Session" : "Fitness Session",
            time: "4:00 PM - 5:30 PM",
            coach: bookingDates[dateString].type === "training" ? "Coach Rahul K." : "Coach Priya S.",
            coachAvatar:
              bookingDates[dateString].type === "training"
                ? "/placeholder.svg?height=48&width=48&text=RK"
                : "/placeholder.svg?height=48&width=48&text=PS",
            location:
              bookingDates[dateString].type === "training"
                ? "Court 2, Padukone Badminton Academy"
                : "Fitness Center, Padukone Badminton Academy",
            academy: "Padukone Badminton Academy",
            type: bookingDates[dateString].type,
            status: "upcoming",
            isPaid: true,
            price: bookingDates[dateString].type === "training" ? 1200 : 800,
          },
        ])
      }
    } else {
      setSessions([])
    }
  }, [selectedDate])

  // Generate calendar
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Generate days array
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null) // Empty cells for days before the first day of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dateString = date.toISOString().split("T")[0]
    const hasBooking = bookingDates[dateString] !== undefined
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year

    days.push({
      day: i,
      date,
      dateString,
      hasBooking,
      bookingType: hasBooking ? bookingDates[dateString].type : null,
      bookingCount: hasBooking ? bookingDates[dateString].count : 0,
      isSelected,
    })
  }

  // Get all bookings for list view
  const allBookings = [
    {
      id: 1,
      title: "Footwork & Smash Training",
      coach: "Coach J. Dhavan",
      coachAvatar: "/placeholder.svg?height=48&width=48&text=JD",
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
      coachAvatar: "/placeholder.svg?height=48&width=48&text=SM",
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
      coachAvatar: "/placeholder.svg?height=48&width=48&text=RK",
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
      coachAvatar: "/placeholder.svg?height=48&width=48&text=JD",
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
      coachAvatar: "/placeholder.svg?height=48&width=48&text=PS",
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
      coachAvatar: "/placeholder.svg?height=48&width=48&text=PS",
      academy: "Padukone Badminton Academy",
      date: "Monday, April 28, 2025",
      time: "5:00 PM - 6:00 PM",
      location: "Fitness Center, Padukone Badminton Academy",
      status: "upcoming",
      isPaid: true,
      type: "fitness",
      price: 800,
    },
  ]

  // Filter bookings for list view
  const filteredBookings = allBookings.filter((booking) => {
    if (filterStatus !== "all" && booking.status !== filterStatus) return false
    if (filterType !== "all" && booking.type !== filterType) return false
    return true
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
            <CalendarIcon size={12} className="mr-1" />
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Your Bookings</h1>
          <p className="text-gray-600">Manage your training sessions and bookings</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("calendar")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "calendar" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            Calendar View
          </button>
          <button
            onClick={() => setView("list")}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              view === "list" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            } transition-colors`}
          >
            List View
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Book New Session
          </button>
        </div>
      </div>

      {view === "calendar" ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Calendar</h2>
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Previous month"
                >
                  <ChevronLeft size={18} />
                </button>

                <span className="text-lg font-medium">
                  {monthName} {year}
                </span>

                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Next month"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="text-xs font-medium text-white/80">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day, index) => (
                <div key={index} className="aspect-square">
                  {day !== null && (
                    <button
                      onClick={() => setSelectedDate(day.date)}
                      className={`w-full h-full flex flex-col items-center justify-center rounded-lg text-sm relative transition-all ${
                        day.isSelected
                          ? "bg-white text-blue-600 font-bold shadow-lg transform scale-105"
                          : day.hasBooking
                            ? day.bookingType === "training"
                              ? "bg-blue-400/30 text-white hover:bg-blue-400/50"
                              : "bg-purple-400/30 text-white hover:bg-purple-400/50"
                            : "hover:bg-white/10 text-white"
                      }`}
                    >
                      <span>{day.day}</span>
                      {day.hasBooking && (
                        <div className="absolute bottom-1 flex space-x-0.5">
                          {Array.from({ length: day.bookingCount }).map((_, i) => (
                            <div
                              key={i}
                              className={`w-1 h-1 rounded-full ${
                                day.bookingType === "training" ? "bg-blue-300" : "bg-purple-300"
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-800">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
                  <span className="text-xs text-gray-500">Training</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
                  <span className="text-xs text-gray-500">Fitness</span>
                </div>
              </div>
            </div>

            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border ${
                      session.type === "training" ? "border-blue-200 bg-blue-50" : "border-purple-200 bg-purple-50"
                    } hover:shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={session.coachAvatar || "/placeholder.svg"}
                            alt={session.coach}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{session.title}</h4>
                          <p className="text-sm text-gray-600">{session.coach}</p>
                        </div>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${
                          session.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : session.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                        }`}
                      >
                        {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mt-3">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-2 text-gray-500" />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center">
                        <User size={14} className="mr-2 text-gray-500" />
                        <span>{session.coach}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin size={14} className="mr-2 text-gray-500" />
                        <span className="truncate">{session.location}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm font-bold text-gray-800">₹{session.price}</div>
                      <div className="flex space-x-2">
                        {session.status === "upcoming" && (
                          <>
                            <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                              Check In
                            </button>
                            <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                              Reschedule
                            </button>
                          </>
                        )}
                        {session.status === "completed" && (
                          <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                            {session.feedback ? "View Feedback" : "Leave Feedback"}
                          </button>
                        )}
                      </div>
                    </div>

                    {session.status === "completed" && session.feedback && (
                      <div className="mt-3 text-sm bg-green-50 px-3 py-1.5 rounded-md">
                        <div className="flex items-center text-green-700">
                          <span className="font-medium mr-1">Your Rating:</span>
                          {session.feedback.rating}/5
                        </div>
                        <div className="text-gray-600 mt-1">{session.feedback.comment}</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <CalendarIcon size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">No sessions scheduled for this day</p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Book a Session
                </button>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Monthly Summary</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                View Full Calendar
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Total Sessions</div>
                <div className="text-2xl font-bold text-gray-800">8</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Upcoming</div>
                <div className="text-2xl font-bold text-green-600">5</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Completed</div>
                <div className="text-2xl font-bold text-blue-600">2</div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Cancelled</div>
                <div className="text-2xl font-bold text-red-600">1</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                  />
                </div>
                <div className="relative">
                  <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
                  >
                    <option value="all">All Types</option>
                    <option value="training">Training</option>
                    <option value="fitness">Fitness</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
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
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm">
                          {booking.coach} • {booking.academy}
                        </p>

                        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center">
                            <CalendarIcon size={14} className="mr-2 text-blue-600 flex-shrink-0" />
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
                  <CalendarIcon size={24} className="text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">No bookings found</h3>
                <p className="text-gray-500 mb-6">
                  {filterStatus !== "all" || filterType !== "all"
                    ? "No bookings match your filter criteria"
                    : "You haven't made any bookings yet"}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book a Session
                </button>
              </div>
            )}
          </div>

          {filteredBookings.length > 0 && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-gray-500 mb-4 sm:mb-0">
                  Showing {filteredBookings.length} of {allBookings.length} bookings
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book a New Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
