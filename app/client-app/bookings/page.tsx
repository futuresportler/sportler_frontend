"use client"

import { useState } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin, User, Filter, ChevronDown, Star, Phone, MessageCircle } from "lucide-react"

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")
  const [showFilters, setShowFilters] = useState(false)

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: 3 },
    { id: "completed", label: "Completed", count: 12 },
    { id: "cancelled", label: "Cancelled", count: 1 },
  ]

  const bookings = {
    upcoming: [
      {
        id: 1,
        title: "Tennis Lesson",
        coach: "John Smith",
        coachImage: "/placeholder.svg?height=40&width=40",
        date: "Today",
        time: "4:00 PM - 5:00 PM",
        location: "Central Sports Club",
        price: "$50",
        status: "confirmed",
        type: "coach",
        rating: 4.9,
      },
      {
        id: 2,
        title: "Badminton Court",
        venue: "Elite Sports Center",
        date: "Tomorrow",
        time: "6:00 PM - 7:00 PM",
        location: "Downtown Complex",
        price: "$25",
        status: "confirmed",
        type: "court",
        courtNumber: "Court 3",
      },
      {
        id: 3,
        title: "Football Training",
        academy: "Champions Academy",
        date: "March 25",
        time: "10:00 AM - 11:30 AM",
        location: "Green Field Stadium",
        price: "$60",
        status: "pending",
        type: "academy",
        sessionType: "Group Session",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Basketball Training",
        coach: "Mike Johnson",
        coachImage: "/placeholder.svg?height=40&width=40",
        date: "March 20",
        time: "3:00 PM - 4:00 PM",
        location: "City Basketball Court",
        price: "$45",
        status: "completed",
        type: "coach",
        rating: 4.8,
        canReview: true,
      },
    ],
    cancelled: [
      {
        id: 5,
        title: "Swimming Lesson",
        coach: "Sarah Wilson",
        coachImage: "/placeholder.svg?height=40&width=40",
        date: "March 18",
        time: "2:00 PM - 3:00 PM",
        location: "Aqua Sports Center",
        price: "$40",
        status: "cancelled",
        type: "coach",
        cancelReason: "Coach unavailable",
      },
    ],
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const currentBookings = bookings[activeTab] || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Filter */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">My Bookings</h2>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            <Filter size={16} />
            <span className="text-sm">Filter</span>
            <ChevronDown size={16} className={`transform transition-transform ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>All Time</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500">
                  <option>All Types</option>
                  <option>Coaches</option>
                  <option>Courts</option>
                  <option>Academies</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {tab.label}
              <span className="ml-1 text-xs opacity-75">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="p-4">
        {currentBookings.length === 0 ? (
          <div className="text-center py-12">
            <Calendar size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {activeTab} bookings</h3>
            <p className="text-gray-500 mb-6">You don't have any {activeTab} bookings at the moment.</p>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
              Explore & Book
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {currentBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                {/* Booking Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{booking.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {booking.date}
                      </div>
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {booking.time}
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="space-y-2 mb-4">
                  {booking.type === "coach" && (
                    <div className="flex items-center space-x-3">
                      <Image
                        src={booking.coachImage || "/placeholder.svg"}
                        alt={booking.coach}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{booking.coach}</span>
                          {booking.rating && (
                            <div className="flex items-center">
                              <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-xs text-gray-600">{booking.rating}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {booking.type === "court" && (
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {booking.venue} - {booking.courtNumber}
                      </span>
                    </div>
                  )}

                  {booking.type === "academy" && (
                    <div className="flex items-center space-x-2">
                      <User size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {booking.academy} - {booking.sessionType}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <MapPin size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{booking.location}</span>
                  </div>
                </div>

                {/* Price and Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="font-bold text-emerald-600">{booking.price}</span>

                  <div className="flex items-center space-x-2">
                    {booking.status === "upcoming" && (
                      <>
                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <Phone size={16} className="text-gray-600" />
                        </button>
                        <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                          <MessageCircle size={16} className="text-gray-600" />
                        </button>
                        <button className="px-4 py-2 bg-red-100 text-red-600 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors">
                          Cancel
                        </button>
                      </>
                    )}

                    {booking.status === "completed" && booking.canReview && (
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                        Write Review
                      </button>
                    )}

                    {booking.status === "cancelled" && (
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                        Book Again
                      </button>
                    )}
                  </div>
                </div>

                {/* Cancel Reason */}
                {booking.status === "cancelled" && booking.cancelReason && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-sm text-red-600">
                      <strong>Cancelled:</strong> {booking.cancelReason}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
