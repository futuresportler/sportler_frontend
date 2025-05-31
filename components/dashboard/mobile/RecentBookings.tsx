"use client"

import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Star, ChevronRight } from "lucide-react"

export default function () {
  const bookings = [
    {
      id: 1,
      title: "Tennis Training",
      coach: "Sarah Johnson",
      date: "Today",
      time: "4:00 PM",
      location: "Court 3, Elite Academy",
      status: "upcoming",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 2,
      title: "Basketball Practice",
      coach: "Mike Chen",
      date: "Yesterday",
      time: "6:00 PM",
      location: "Indoor Court",
      status: "completed",
      rating: 5,
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
    {
      id: 3,
      title: "Swimming Session",
      coach: "Lisa Wong",
      date: "May 20",
      time: "8:00 AM",
      location: "Olympic Pool",
      status: "completed",
      rating: 4,
      avatar: "/placeholder.svg?height=40&width=40&text=LW",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-700"
      case "completed":
        return "bg-green-100 text-green-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Bookings</h3>
        <Link href="/mobile/bookings" className="text-purple-600 text-sm font-medium flex items-center">
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-3">
        {bookings.map((booking) => (
          <div key={booking.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-gray-100">
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
                  <h4 className="font-semibold text-gray-900 text-sm">{booking.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(booking.status)}`}>
                    {booking.status}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mb-1">{booking.coach}</p>
                <div className="flex items-center space-x-3 text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Calendar size={10} />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock size={10} />
                    <span>{booking.time}</span>
                  </div>
                </div>

                {booking.status === "completed" && booking.rating && (
                  <div className="flex items-center space-x-1 mt-1">
                    <span className="text-xs text-gray-500">Rating:</span>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={10}
                          className={`${i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-right">
                {booking.status === "upcoming" && (
                  <button className="text-xs bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-colors">
                    Check In
                  </button>
                )}
                {booking.status === "completed" && (
                  <button className="text-xs bg-emerald-500 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-colors">
                    Book Again
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
