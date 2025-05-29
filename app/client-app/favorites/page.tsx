"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star, MapPin, Filter, Grid, List } from "lucide-react"

export default function FavoritesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("grid")

  const tabs = [
    { id: "all", label: "All", count: 12 },
    { id: "coaches", label: "Coaches", count: 5 },
    { id: "academies", label: "Academies", count: 4 },
    { id: "courts", label: "Courts", count: 3 },
  ]

  const favorites = [
    {
      id: 1,
      title: "John Smith",
      subtitle: "Tennis Coach",
      rating: 4.9,
      reviews: 124,
      location: "Central Sports Club",
      price: "$50/hour",
      image: "/placeholder.svg?height=120&width=120",
      type: "coach",
      addedDate: "2 days ago",
    },
    {
      id: 2,
      title: "Elite Tennis Academy",
      subtitle: "Professional Training",
      rating: 4.8,
      reviews: 89,
      location: "Downtown Complex",
      price: "$60/month",
      image: "/placeholder.svg?height=120&width=120",
      type: "academy",
      addedDate: "1 week ago",
    },
    {
      id: 3,
      title: "Premium Badminton Court",
      subtitle: "Indoor Court #3",
      rating: 4.7,
      reviews: 156,
      location: "Sports City",
      price: "$25/hour",
      image: "/placeholder.svg?height=120&width=120",
      type: "court",
      addedDate: "3 days ago",
    },
  ]

  const filteredFavorites = favorites.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "coaches") return item.type === "coach"
    if (activeTab === "academies") return item.type === "academy"
    if (activeTab === "courts") return item.type === "court"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">My Favorites</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Filter size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>

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

      {/* Content */}
      <div className="p-4">
        {filteredFavorites.length === 0 ? (
          <div className="text-center py-12">
            <Heart size={48} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-500 mb-6">Start adding your favorite coaches, academies, and courts!</p>
            <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
              Explore Now
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredFavorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  <button className="absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full">
                    <Heart size={16} className="text-red-500 fill-red-500" />
                  </button>
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                    <div className="flex items-center">
                      <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                      <span className="text-xs font-medium">{item.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-2">{item.subtitle}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={14} className="mr-1" />
                    {item.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Added {item.addedDate}</span>
                    <span className="font-bold text-emerald-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFavorites.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <button className="absolute -top-1 -right-1 p-1 bg-white rounded-full shadow-md">
                      <Heart size={12} className="text-red-500 fill-red-500" />
                    </button>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500 mb-1">{item.subtitle}</p>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin size={14} className="mr-1" />
                      {item.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-gray-500 ml-1">({item.reviews})</span>
                      </div>
                      <span className="font-bold text-emerald-600">{item.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
