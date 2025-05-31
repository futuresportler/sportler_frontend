"use client"

import { useState, useEffect } from "react"
import CoachesHeader from "./CoachesHeader"
import CoachesFilter from "./CoachesFilter"
import CoachesGrid from "./CoachesGrid"
import CoachesList from "./CoachesList"
import CoachesSearchBar from "./CoachesSearchBar"
import type { Coach, FilterOptions } from "@/types/coach"
import LocationMapView from "@/components/shared/LocationMapView"
import { Button } from "@/components/ui/button"
import { MapIcon, GridIcon, ListIcon } from "lucide-react"

interface CoachesLayoutProps {
  city: string
}

export default function CoachesLayout({ city }: CoachesLayoutProps) {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    price: { min: 0, max: 10000 },
    rating: 0,
    certificationLevel: [],
    sessionType: [],
    availabilityTimeSlots: [],
    trainedProfessionals: false,
    languages: [],
    sport: "",
    searchQuery: "",
  })

  useEffect(() => {
    const fetchCoaches = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/coaches?city=${city}`)
        const data = await response.json()
        setCoaches(data)
        setFilteredCoaches(data)
      } catch (error) {
        console.error("Error fetching coaches:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCoaches()
  }, [city])

  const handleFilterChange = (newFilterOptions: Partial<FilterOptions>) => {
    const updatedFilterOptions = { ...filterOptions, ...newFilterOptions }
    setFilterOptions(updatedFilterOptions)

    // Apply filters
    let filtered = [...coaches]

    // Filter by search query
    if (updatedFilterOptions.searchQuery) {
      const query = updatedFilterOptions.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (coach) =>
          coach.name.toLowerCase().includes(query) ||
          coach.description.toLowerCase().includes(query) ||
          coach.location.toLowerCase().includes(query) ||
          coach?.sport.toLowerCase().includes(query),
      )
    }

    // Filter by price
    if (updatedFilterOptions.price) {
      filtered = filtered.filter(
        (coach) =>
          coach.hourlyRate >= updatedFilterOptions.price.min && coach.hourlyRate <= updatedFilterOptions.price.max,
      )
    }

    // Filter by rating
    if (updatedFilterOptions.rating && updatedFilterOptions.rating > 0) {
      filtered = filtered.filter((coach) => coach.rating >= updatedFilterOptions.rating)
    }

    // Filter by sport
    if (updatedFilterOptions?.sport) {
      filtered = filtered.filter((coach) => coach?.sport === updatedFilterOptions?.sport)
    }

    setFilteredCoaches(filtered)
  }

  const handleSearch = (query: string) => {
    handleFilterChange({ searchQuery: query })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <CoachesHeader city={city} />
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-1/4">
          <CoachesFilter onFilterChange={handleFilterChange} filterOptions={filterOptions} />
        </div>
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <CoachesSearchBar onSearch={handleSearch} />
            <div className="flex justify-end mt-4 space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="flex items-center"
              >
                <GridIcon className="w-4 h-4 mr-1" />
                Grid
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="flex items-center"
              >
                <ListIcon className="w-4 h-4 mr-1" />
                List
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="flex items-center"
              >
                <MapIcon className="w-4 h-4 mr-1" />
                Map
              </Button>
            </div>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : (
            <>
              {viewMode === "grid" && <CoachesGrid coaches={filteredCoaches} city={city} />}
              {viewMode === "list" && <CoachesList coaches={filteredCoaches} city={city} />}
              {viewMode === "map" && <LocationMapView coaches={filteredCoaches} city={city} activeTab="coaches" />}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
