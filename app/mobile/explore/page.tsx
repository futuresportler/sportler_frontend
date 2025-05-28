"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  MapPin,
  Star,
  Users,
  Building,
  Target,
  Filter,
  Heart,
  ChevronRight,
  TrendingUp,
  Award,
  Clock,
} from "lucide-react"

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: "All", icon: Target, gradient: "from-gray-400 to-gray-600" },
    { id: "coaches", label: "Coaches", icon: Users, gradient: "from-blue-400 to-blue-600" },
    { id: "academies", label: "Academies", icon: Building, gradient: "from-emerald-400 to-emerald-600" },
    { id: "courts", label: "Courts", icon: MapPin, gradient: "from-purple-400 to-purple-600" },
  ]

  const featuredCoaches = [
    {
      id: 1,
      name: "Sarah Johnson",
      sport: "Tennis",
      rating: 4.9,
      students: 150,
      image: "/placeholder.svg?height=80&width=80&text=SJ",
      price: "₹1,200/hr",
      verified: true,
      experience: "8 years",
    },
    {
      id: 2,
      name: "Mike Chen",
      sport: "Basketball",
      rating: 4.8,
      students: 120,
      image: "/placeholder.svg?height=80&width=80&text=MC",
      price: "₹1,000/hr",
      verified: true,
      experience: "6 years",
    },
    {
      id: 3,
      name: "Priya Sharma",
      sport: "Badminton",
      rating: 4.7,
      students: 95,
      image: "/placeholder.svg?height=80&width=80&text=PS",
      price: "₹800/hr",
      verified: false,
      experience: "4 years",
    },
  ]

  const nearbyAcademies = [
    {
      id: 1,
      name: "Elite Sports Academy",
      sports: ["Tennis", "Basketball", "Swimming"],
      distance: "0.5 km",
      rating: 4.7,
      image: "/placeholder.svg?height=120&width=200&text=ESA",
      students: 500,
      facilities: ["Indoor Courts", "Swimming Pool", "Gym"],
    },
    {
      id: 2,
      name: "Champions Training Center",
      sports: ["Football", "Cricket", "Athletics"],
      distance: "1.2 km",
      rating: 4.6,
      image: "/placeholder.svg?height=120&width=200&text=CTC",
      students: 350,
      facilities: ["Outdoor Fields", "Indoor Nets", "Fitness Center"],
    },
  ]

  const quickActions = [
    {
      title: "Find Courts",
      subtitle: "Book nearby courts",
      icon: MapPin,
      gradient: "from-purple-400 to-purple-600",
      href: "/mobile/courts",
    },
    {
      title: "Live Sessions",
      subtitle: "Join ongoing sessions",
      icon: Clock,
      gradient: "from-red-400 to-red-600",
      href: "/mobile/live-sessions",
    },
    {
      title: "Tournaments",
      subtitle: "Upcoming competitions",
      icon: Award,
      gradient: "from-yellow-400 to-yellow-600",
      href: "/mobile/tournaments",
    },
    {
      title: "Progress",
      subtitle: "Track your improvement",
      icon: TrendingUp,
      gradient: "from-green-400 to-green-600",
      href: "/mobile/progress",
    },
  ]

  return (
    <div className="space-y-6 pb-6">
      {/* Hero Search Section */}
      <div className="bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 px-4 py-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Discover Your Sport</h2>
            <p className="text-emerald-100">Find coaches, academies & courts near you</p>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search coaches, academies, courts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-4 bg-white/95 backdrop-blur-sm rounded-2xl border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-900 placeholder-gray-500"
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 transition-colors">
              <Filter size={16} className="text-white" />
            </button>
          </div>

          {/* Category Pills */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {categories.map((category) => {
              const Icon = category.icon
              const isSelected = selectedCategory === category.id
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-2xl whitespace-nowrap transition-all duration-300 ${
                    isSelected
                      ? "bg-white text-gray-900 shadow-lg transform scale-105"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{category.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <Link key={index} href={action.href}>
                <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div
                    className={`h-12 w-12 rounded-xl bg-gradient-to-r ${action.gradient} flex items-center justify-center mb-3`}
                  >
                    <Icon size={24} className="text-white" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-1">{action.title}</h4>
                  <p className="text-xs text-gray-600">{action.subtitle}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Featured Coaches */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Top Coaches</h3>
          <Link href="/coaches" className="text-emerald-600 text-sm font-medium flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {featuredCoaches.map((coach) => (
            <Link key={coach.id} href={`/coaches/${coach.id}`}>
              <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl overflow-hidden bg-gray-100">
                      <Image
                        src={coach.image || "/placeholder.svg"}
                        alt={coach.name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    </div>
                    {coach.verified && (
                      <div className="absolute -top-1 -right-1 h-6 w-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs">✓</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{coach.name}</h4>
                      {coach.verified && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {coach.sport} Coach • {coach.experience}
                    </p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{coach.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{coach.students}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-emerald-600 mb-2">{coach.price}</p>
                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                      <Heart size={16} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Nearby Academies */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Nearby Academies</h3>
          <Link href="/academies" className="text-emerald-600 text-sm font-medium flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="space-y-4">
          {nearbyAcademies.map((academy) => (
            <Link key={academy.id} href={`/academies/${academy.id}`}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="relative h-32 bg-gradient-to-r from-emerald-400 to-blue-500">
                  <Image src={academy.image || "/placeholder.svg"} alt={academy.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <MapPin size={12} className="text-emerald-600" />
                    <span className="text-xs font-medium">{academy.distance}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h4 className="font-bold text-white text-lg mb-1">{academy.name}</h4>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-white">{academy.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users size={14} className="text-white/80" />
                        <span className="text-sm text-white/80">{academy.students}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {academy.sports.slice(0, 3).map((sport, index) => (
                      <span key={index} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                        {sport}
                      </span>
                    ))}
                    {academy.sports.length > 3 && (
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        +{academy.sports.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {academy.facilities.slice(0, 2).map((facility, index) => (
                      <span key={index} className="text-xs text-gray-600">
                        {facility}
                        {index < academy.facilities.slice(0, 2).length - 1 && " • "}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
