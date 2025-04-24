"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Booking {
  id: string
  name: string
  sport: string
  time: string
  source: string
  avatar?: string
}

interface RecentBookingsProps {
  bookings?: Booking[]
}

// Default data that would be replaced by API data in a real application
const defaultBookings: Booking[] = [
  {
    id: "b1",
    name: "Rahul Sharma",
    sport: "Cricket - Advanced Batch",
    time: "10 min ago",
    source: "SportsCentral",
    avatar: "/placeholder.svg?height=32&width=32&text=RS",
  },
  {
    id: "b2",
    name: "Priya Patel",
    sport: "Tennis - Beginners",
    time: "1 hour ago",
    source: "Direct",
    avatar: "/placeholder.svg?height=32&width=32&text=PP",
  },
  {
    id: "b3",
    name: "Arjun Singh",
    sport: "Football - Intermediate",
    time: "7 hours ago",
    source: "SportifyApp",
    avatar: "/placeholder.svg?height=32&width=32&text=AS",
  },
]

export function RecentBookings({ bookings = defaultBookings }: RecentBookingsProps) {
  const [bookingData, setBookingData] = useState(bookings)

  // Update data when props change
  useEffect(() => {
    setBookingData(bookings)
  }, [bookings])

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Recent Bookings</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700">View All</button>
      </div>
      <div className="space-y-3">
        {bookingData.map((booking) => (
          <BookingItem
            key={booking.id}
            name={booking.name}
            sport={booking.sport}
            time={booking.time}
            source={booking.source}
            avatar={booking.avatar}
          />
        ))}

        {bookingData.length === 0 && <div className="text-center py-4 text-gray-500">No recent bookings available</div>}
      </div>
    </div>
  )
}

interface BookingItemProps {
  name: string
  sport: string
  time: string
  source: string
  avatar?: string
}

function BookingItem({ name, sport, time, source, avatar }: BookingItemProps) {
  return (
    <div className="flex items-start gap-3">
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image src={avatar || "/placeholder.svg?height=32&width=32&text=U"} alt={name} fill className="object-cover" />
      </div>
      <div>
        <h3 className="font-medium text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{sport}</p>
        <div className="text-xs text-gray-400">{time}</div>
        <div className="text-xs text-blue-600">{source}</div>
      </div>
    </div>
  )
}
