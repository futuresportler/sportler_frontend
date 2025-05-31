"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Star, Users, Building, SlidersHorizontal, X, ChevronDown } from "lucide-react"
import MobileAppLayout from "../../../components/dashboard/mobile/MobileAppLayout"

export default function MobileSearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedSport, setSelectedSport] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100])

  const filterTabs = [
    { id: "all", label: "All" },
    { id: "coaches", label: "Coaches" },
    { id: "academies", label: "Academies" },
    { id: "courts", label: "Courts" },
  ]

  const sports = ["Tennis", "Basketball", "Football", "Cricket", "Badminton", "Swimming"]
  const locations = ["Downtown", "North Side", "South Side", "East Side", "West Side"]

  const searchResults = [
    {
      id: 1,
      type: "coach",
      name: "Sarah Johnson",
      sport: "Tennis",
      rating: 4.9,
      students: 150,
      price: "$50/hr",
      location: "Downtown",
      image: "/placeholder.svg?height=60&width=60&text=SJ",
    },
    {
      id: 2,
      type: "academy",
      name: "Elite Sports Academy",
      sports: ["Tennis", "Basketball"],
      rating: 4.7,
      distance: "0.5 km",
      location: "North Side",
      image: "/placeholder.svg?height=60&width=60&text=ESA",
    },
    {
      id: 3,
      type: "court",
      name: "Central Tennis Court",
      sport: "Tennis",
      rating: 4.6,
      price: "$25/hr",
      location: "Downtown",
      image: "/placeholder.svg?height=60&width=60&text=CTC",
    },
  ]

  return (
    <MobileAppLayout>
      <div className="space-y-4">
        {/* Search Header */}
        <div className="bg-white px-4 py-4 border-b border-gray-100">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for coaches, academies, courts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-12 py-3 bg-gray-50 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
            />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 transition-colors"
            >
              <SlidersHorizontal size={16} className="text-white" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200 ${
                  activeFilter === tab.id
                    ? "bg-emerald-500 text-white shadow-md"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white mx-4 rounded-xl shadow-lg border border-gray-100 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="p-1 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Sport Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sport</label>
              <div className="relative">
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                >
                  <option value="">All Sports</option>
                  {sports.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-3 bg-gray-50 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none"
                >
                  <option value="">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>

            {/* Apply Filters Button */}
            <button className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:bg-emerald-600 transition-colors">
              Apply Filters
            </button>
          </div>
        )}

        {/* Search Results */}
        <div className="px-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{searchResults.length} Results Found</h3>
            <button className="text-emerald-600 text-sm font-medium flex items-center">
              Sort by <ChevronDown size={16} className="ml-1" />
            </button>
          </div>

          {searchResults.map((result) => (
            <Link
              key={result.id}
              href={`/${result.type === "coach" ? "coaches" : result.type === "academy" ? "academies" : "courts"}/${result.id}`}
            >
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="flex items-center space-x-4">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-gray-100">
                    <Image src={result.image || "/placeholder.svg"} alt={result.name} fill className="object-cover" />
                    <div className="absolute top-1 right-1">
                      {result.type === "coach" && (
                        <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users size={10} className="text-white" />
                        </div>
                      )}
                      {result.type === "academy" && (
                        <div className="h-5 w-5 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Building size={10} className="text-white" />
                        </div>
                      )}
                      {result.type === "court" && (
                        <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center">
                          <MapPin size={10} className="text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{result.name}</h4>
                    <p className="text-sm text-gray-600">
                      {result.type === "coach" && `${result.sport} Coach`}
                      {result.type === "academy" && result.sports?.join(", ")}
                      {result.type === "court" && `${result.sport} Court`}
                    </p>

                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1">
                        <Star size={14} className="text-yellow-400 fill-current" />
                        <span className="text-sm font-medium">{result.rating}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin size={14} className="text-gray-400" />
                        <span className="text-sm text-gray-600">{result.location || result.distance}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-emerald-600">{result.price || "View Details"}</p>
                    {result.type === "coach" && result.students && (
                      <p className="text-xs text-gray-500">{result.students} students</p>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More */}
        <div className="px-4 pb-6">
          <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors">
            Load More Results
          </button>
        </div>
      </div>
    </MobileAppLayout>
  )
}
