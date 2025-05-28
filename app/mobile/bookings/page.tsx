"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, MapPin, CheckCircle, XCircle, AlertCircle, Plus, Filter } from "lucide-react"

export default function BookingsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ]

  const bookings = {
    upcoming: [
      {
        id: 1,
        title: "Tennis Training",
        coach: "Sarah Johnson",
        date: "Today",
        time: "4:00 PM - 5:30 PM",
        location: "Court 3, Elite Academy",
        price: "₹1,200",
        status: "confirmed",
        avatar: "/placeholder.svg?height=48&width=48&text=SJ",
      },
      {
        id: 2,
        title: "Basketball Practice",
        coach: "Mike Chen",
        date: "Tomorrow",
        time: "6:00 PM - 7:00 PM",
        location: "Indoor Court, Sports Center",
        price: "₹1,000",
        status: "pending",
        avatar: "/placeholder.svg?height=48&width=48&text=MC",
      },
      {
        id: 3,
        title: "Swimming Session",
        coach: "Lisa Wong",
        date: "May 25",
        time: "8:00 AM - 9:00 AM",
        location: "Olympic Pool, Aqua Center",
        price: "₹800",
        status: "confirmed",
        avatar: "/placeholder.svg?height=48&width=48&text=LW",
      },
    ],
    completed: [
      {
        id: 4,
        title: "Tennis Training",
        coach: "Sarah Johnson",
        date: "May 20",
        time: "4:00 PM - 5:30 PM",
        location: "Court 3, Elite Academy",
        price: "₹1,200",
        status: "completed",
        rating: 5,
        avatar: "/placeholder.svg?height=48&width=48&text=SJ",
      },
      {
        id: 5,
        title: "Fitness Training",
        coach: "John Doe",
        date: "May 18",
        time: "7:00 AM - 8:00 AM",
        location: "Gym, Fitness Center",
        price: "₹600",
        status: "completed",
        rating: 4,
        avatar: "/placeholder.svg?height=48&width=48&text=JD",
      },
    ],
    cancelled: [
      {
        id: 6,
        title: "Football Training",
        coach: "Alex Smith",
        date: "May 15",
        time: "5:00 PM - 6:30 PM",
        location: "Field 2, Sports Complex",
        price: "₹900",
        status: "cancelled",
        reason: "Weather conditions",
        avatar: "/placeholder.svg?height=48&width=48&text=AS",
      },
    ],
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} className="text-green-500" />
      case "pending":
        return <AlertCircle size={16} className="text-yellow-500" />
      case "cancelled":
        return <XCircle size={16} className="text-red-500" />
      case "completed":
        return <CheckCircle size={16} className="text-blue-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      case "completed":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="space-y-4 pb-6">
      {/* Header */}
      <div className="bg-white px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">My Bookings</h1>
          <div className="flex space-x-2">
            <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
            <Link href="/mobile/book-session">
              <button className="p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors">
                <Plus size={18} className="text-white" />
              </button>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedTab === tab.id ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-4 space-y-3">
        {bookings[selectedTab as keyof typeof bookings].map((booking) => (
          <div key={booking.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-2xl overflow-hidden bg-gray-100">
                <Image
                  src={booking.avatar || "/placeholder.svg"}
                  alt={booking.coach}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-semibold text-gray-900">{booking.title}</h3>
                  {getStatusIcon(booking.status)}
                </div>
                <p className="text-sm text-gray-600 mb-2">{booking.coach}</p>

                <div className="space-y-1 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={12} />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={12} />
                    <span>{booking.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin size={12} />
                    <span className="truncate">{booking.location}</span>
                  </div>
                </div>

                {booking.status === "cancelled" && booking.reason && (
                  <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded-lg">
                    Reason: {booking.reason}
                  </div>
                )}

                {booking.status === "completed" && booking.rating && (
                  <div className="mt-2 flex items-center space-x-1">
                    <span className="text-xs text-gray-500">Your rating:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${i < booking.rating! ? "text-yellow-400" : "text-gray-300"}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                <p className="font-bold text-gray-900 mb-2">{booking.price}</p>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>

                {booking.status === "upcoming" && (
                  <div className="mt-3 space-y-1">
                    <button className="w-full text-xs bg-emerald-500 text-white py-1.5 px-3 rounded-lg hover:bg-emerald-600 transition-colors">
                      {booking.status === "confirmed" ? "Check In" : "Confirm"}
                    </button>
                    <button className="w-full text-xs bg-gray-100 text-gray-700 py-1.5 px-3 rounded-lg hover:bg-gray-200 transition-colors">
                      Reschedule
                    </button>
                  </div>
                )}

                {booking.status === "completed" && (
                  <button className="mt-3 w-full text-xs bg-blue-500 text-white py-1.5 px-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Book Again
                  </button>
                )}

                {booking.status === "cancelled" && (
                  <button className="mt-3 w-full text-xs bg-emerald-500 text-white py-1.5 px-3 rounded-lg hover:bg-emerald-600 transition-colors">
                    Book Again
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {bookings[selectedTab as keyof typeof bookings].length === 0 && (
        <div className="px-4 py-12 text-center">
          <div className="h-16 w-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Calendar size={24} className="text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No {selectedTab} bookings</h3>
          <p className="text-gray-500 mb-6">
            {selectedTab === "upcoming"
              ? "You don't have any upcoming sessions"
              : selectedTab === "completed"
                ? "No completed sessions yet"
                : "No cancelled bookings"}
          </p>
          <Link href="/mobile/explore">
            <button className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-600 transition-colors">
              Book a Session
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}
