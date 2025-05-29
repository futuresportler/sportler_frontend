"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Star,
  Calendar,
  Users,
  Trophy,
  TrendingUp,
  Clock,
  ChevronRight,
  Play,
  Target,
  Award,
} from "lucide-react"

export default function ClientHomePage() {
  const [selectedSport, setSelectedSport] = useState("All")

  const quickActions = [
    {
      title: "Find Coaches",
      description: "Expert trainers near you",
      icon: Users,
      color: "bg-blue-500",
      href: "/client-app/coaches",
    },
    {
      title: "Book Courts",
      description: "Premium facilities",
      icon: Calendar,
      color: "bg-emerald-500",
      href: "/client-app/courts",
    },
    {
      title: "Join Academy",
      description: "Professional training",
      icon: Trophy,
      color: "bg-purple-500",
      href: "/client-app/academies",
    },
    {
      title: "Track Progress",
      description: "Monitor your growth",
      icon: TrendingUp,
      color: "bg-orange-500",
      href: "/client-app/progress",
    },
  ]

  const upcomingBookings = [
    {
      id: 1,
      title: "Tennis Lesson with John",
      time: "Today, 4:00 PM",
      location: "Central Sports Club",
      type: "coach",
    },
    {
      id: 2,
      title: "Badminton Court Booking",
      time: "Tomorrow, 6:00 PM",
      location: "Elite Sports Center",
      type: "court",
    },
  ]

  const featuredContent = [
    {
      id: 1,
      title: "Top Rated Tennis Coach",
      subtitle: "Sarah Williams",
      rating: 4.9,
      image: "/placeholder.svg?height=120&width=120",
      type: "coach",
    },
    {
      id: 2,
      title: "Premium Badminton Academy",
      subtitle: "Champions Academy",
      rating: 4.8,
      image: "/placeholder.svg?height=120&width=120",
      type: "academy",
    },
    {
      id: 3,
      title: "Modern Football Turf",
      subtitle: "Green Field Sports",
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=120",
      type: "court",
    },
  ]

  const achievements = [
    { title: "Sessions Completed", value: "24", icon: Target },
    { title: "Hours Trained", value: "48", icon: Clock },
    { title: "Achievements", value: "8", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Welcome Section */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-b-3xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">Good Morning!</h2>
            <p className="text-emerald-100">Ready for your next session?</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Play size={20} className="text-white ml-1" />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {achievements.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white/10 rounded-xl p-3 text-center">
                <IconComponent size={20} className="text-white mx-auto mb-1" />
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-emerald-100">{stat.title}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon
            return (
              <Link
                key={index}
                href={action.href}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center mb-3`}>
                  <IconComponent size={20} className="text-white" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-500">{action.description}</p>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Upcoming Bookings */}
      {upcomingBookings.length > 0 && (
        <div className="px-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">Upcoming</h3>
            <Link href="/client-app/bookings" className="text-emerald-600 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{booking.title}</h4>
                    <div className="flex items-center text-sm text-gray-500 mb-1">
                      <Clock size={14} className="mr-1" />
                      {booking.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      {booking.location}
                    </div>
                  </div>
                  <ChevronRight size={20} className="text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Featured Content */}
      <div className="px-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Featured</h3>
          <Link href="/client-app/explore" className="text-emerald-600 text-sm font-medium">
            Explore All
          </Link>
        </div>
        <div className="space-y-4">
          {featuredContent.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{item.subtitle}</p>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">{item.rating}</span>
                    <span className="text-xs text-gray-500 ml-2 capitalize">{item.type}</span>
                  </div>
                </div>
                <ChevronRight size={20} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continue Training Section */}
      <div className="px-6 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-bold mb-2">Continue Your Journey</h3>
          <p className="text-purple-100 mb-4">You're 3 sessions away from your monthly goal!</p>
          <Link
            href="/client-app/progress"
            className="inline-flex items-center bg-white text-purple-600 px-4 py-2 rounded-lg font-medium text-sm hover:bg-purple-50 transition-colors"
          >
            View Progress
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  )
}
