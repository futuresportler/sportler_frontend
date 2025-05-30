"use client"

import { useState, useEffect } from "react"
import { CourtsHeader } from "./CourtsHeader"
import { CourtsFilter } from "./CourtsFilter"
import { CourtsGrid } from "./CourtsGrid"
import { CourtsList } from "./CourtsList"
import { CourtsSearchBar } from "./CourtsSearchBar"
import type { Court } from "@/types/court"
import LocationMapView from "@/components/shared/LocationMapView"
import { Button } from "@/components/ui/button"
import { MapIcon, GridIcon, ListIcon } from "lucide-react"
import Header from "../Header"

interface CourtsLayoutProps {
  city: string
}

export function CourtsLayout({ city }: CourtsLayoutProps) {
  const [courts, setCourts] = useState<Court[]>([])
  const [filteredCourts, setFilteredCourts] = useState<Court[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filterOptions, setFilterOptions] = useState({
    price: { min: 0, max: 10000 },
    rating: 0,
    sport: "",
    isIndoor: null as boolean | null,
    amenities: [] as string[],
    searchQuery: "",
  })

  useEffect(() => {
    const fetchCourts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/turfs?city=${city}`)
        const data = await response.json()
        setCourts(data)
        setFilteredCourts(data)
      } catch (error) {
        console.error("Error fetching courts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourts()
  }, [city])

  const handleFilterChange = (newFilterOptions: Partial<typeof filterOptions>) => {
    const updatedFilterOptions = { ...filterOptions, ...newFilterOptions }
    setFilterOptions(updatedFilterOptions)

    // Apply filters
    let filtered = [...courts]

    // Filter by search query
    if (updatedFilterOptions.searchQuery) {
      const query = updatedFilterOptions.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (court) =>
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query) ||
          court.sport.toLowerCase().includes(query),
      )
    }

    // Filter by price
    if (updatedFilterOptions.price) {
      filtered = filtered.filter(
        (court) =>
          (court.price || court.pricePerHour || 0) >= updatedFilterOptions.price.min &&
          (court.price || court.pricePerHour || 0) <= updatedFilterOptions.price.max,
      )
    }

    // Filter by rating
    if (updatedFilterOptions.rating && updatedFilterOptions.rating > 0) {
      filtered = filtered.filter((court) => court.rating >= updatedFilterOptions.rating)
    }

    // Filter by sport
    if (updatedFilterOptions.sport) {
      filtered = filtered.filter((court) => court.sport === updatedFilterOptions.sport)
    }

    // Filter by indoor/outdoor
    if (updatedFilterOptions.isIndoor !== null) {
      filtered = filtered.filter((court) => court.isIndoor === updatedFilterOptions.isIndoor)
    }

    // Filter by amenities
    if (updatedFilterOptions.amenities.length > 0) {
      filtered = filtered.filter((court) =>
        updatedFilterOptions.amenities.every((amenity) => court.amenities.includes(amenity)),
      )
    }

    setFilteredCourts(filtered)
  }

  const handleSearch = (query: string) => {
    handleFilterChange({ searchQuery: query })
  }

  return (
    <>
      <Header />
      <div className="h-screen w-screen overflow-hidden flex flex-col">
        <CourtsHeader city={city} />
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Filter */}
          <div className="w-full md:w-1/4 border-r border-gray-200 overflow-y-auto p-4 bg-white">
            <CourtsFilter onFilterChange={handleFilterChange} filterOptions={filterOptions} />
          </div>

          {/* Main Content */}
          <div className="w-full md:w-3/4 overflow-y-auto p-4">
            {/* Search and View Switch */}
            <div className="mb-6">
              <CourtsSearchBar onSearch={handleSearch} />
              <div className="flex justify-end mt-4 gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="flex items-center gap-1"
                >
                  <GridIcon className="w-4 h-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="flex items-center gap-1"
                >
                  <ListIcon className="w-4 h-4" />
                  List
                </Button>
                <Button
                  variant={viewMode === "map" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("map")}
                  className="flex items-center gap-1"
                >
                  <MapIcon className="w-4 h-4" />
                  Map
                </Button>
              </div>
            </div>

            {/* Content Area */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              </div>
            ) : (
              <>
                {viewMode === "grid" && <CourtsGrid courts={filteredCourts} city={city} />}
                {viewMode === "list" && <CourtsList courts={filteredCourts} city={city} />}
                {viewMode === "map" && <LocationMapView courts={filteredCourts} city={city} activeTab="courts" />}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )

}
