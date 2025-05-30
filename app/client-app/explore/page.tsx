"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, MapPin, Filter, Grid, List, Search } from "lucide-react"

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    { id: "all", label: "All", count: 156 },
    { id: "coaches", label: "Coaches", count: 45 },
    { id: "academies", label: "Academies", count: 32 },
    { id: "courts", label: "Courts", count: 79 },
  ]

  const exploreItems = [
    {
      id: 1,
      title: "Elite Tennis Academy",
      subtitle: "Professional Tennis Training",
      rating: 4.9,
      reviews: 124,
      location: "Downtown Sports Complex",
      price: "$50/hour",
      image: "/placeholder.svg?height=120&width=120",
      type: "academy",
      featured: true,
    },
    {
      id: 2,
      title: "John Smith",
      subtitle: "Certified Basketball Coach",
      rating: 4.8,
      reviews: 89,
      location: "Central Park Courts",
      price: "$40/hour",
      image: "/placeholder.svg?height=120&width=120",
      type: "coach",
      featured: false,
    },
    {
      id: 3,
      title: "Premium Badminton Court",
      subtitle: "Air-conditioned Indoor Court",
      rating: 4.7,
      reviews: 156,
      location: "Sports City Complex",
      price: "$25/hour",
      image: "/placeholder.svg?height=120&width=120",
      type: "court",
      featured: true,
    },
    {
      id: 4,
      title: "Champions Football Academy",
      subtitle: "Youth Development Program",
      rating: 4.9,
      reviews: 203,
      location: "Green Field Stadium",
      price: "$60/month",
      image: "/placeholder.svg?height=120&width=120",
      type: "academy",
      featured: false,
    },
  ]

  const filteredItems = exploreItems.filter((item) => {
    if (activeTab === "all") return true
    if (activeTab === "coaches") return item.type === "coach"
    if (activeTab === "academies") return item.type === "academy"
    if (activeTab === "courts") return item.type === "court"
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white p-4 border-b border-gray-200">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search coaches, academies, courts..."
            className="w-full px-4 py-3 pl-10 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 bg-emerald-600 text-white rounded-lg">
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex space-x-1">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                activeTab === category.id ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {category.label}
              <span className="ml-1 text-xs opacity-75">({category.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-900">
          {categories.find((c) => c.id === activeTab)?.label} ({filteredItems.length})
        </h2>
        <div className="flex items-center space-x-2">
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

      {/* Content Grid/List */}
      <div className="p-4">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="relative">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={300}
                    height={200}
                    className="w-full h-40 object-cover"
                  />
                  {item.featured && (
                    <div className="absolute top-2 left-2 bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
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
                    <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                    <span className="font-bold text-emerald-600">{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
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
                    {item.featured && (
                      <div className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs px-1 py-0.5 rounded-full">
                        ★
                      </div>
                    )}
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

      {/* Load More Button */}
      <div className="p-4 text-center">
        <button className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-emerald-700 transition-colors">
          Load More Results
        </button>
      </div>
    </div>
  )
}
