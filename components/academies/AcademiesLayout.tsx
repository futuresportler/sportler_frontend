"use client"

import { useState, useEffect } from "react"
import AcademiesHeader from "./AcademiesHeader"
import AcademiesFilter from "./AcademiesFilter"
import AcademiesGrid from "./AcademiesGrid"
import AcademiesList from "./AcademiesList"
import AcademiesSearchBar from "./AcademiesSearchBar"
import type { Academy, AcademyFilterOptions } from "@/types/academy"
import LocationMapView from "@/components/shared/LocationMapView"
import { Button } from "@/components/ui/button"
import { MapIcon, GridIcon, ListIcon } from "lucide-react"

interface AcademiesLayoutProps {
  city: string
}

export default function AcademiesLayout({ city }: AcademiesLayoutProps) {
  const [academies, setAcademies] = useState<Academy[]>([])
  const [filteredAcademies, setFilteredAcademies] = useState<Academy[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [filterOptions, setFilterOptions] = useState<AcademyFilterOptions>({
    price: { min: 0, max: 10000 },
    rating: 0,
    certificationLevel: [],
    sessionType: [],
    availabilityTimeSlots: [],
    amenities: [],
    languages: [],
    category: "",
    sports: [],
    searchQuery: "",
  })

  useEffect(() => {
    const fetchAcademies = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/academies?city=${city}`)
        const data = await response.json()
        setAcademies(data)
        setFilteredAcademies(data)
      } catch (error) {
        console.error("Error fetching academies:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAcademies()
  }, [city])

  const handleFilterChange = (newFilterOptions: Partial<AcademyFilterOptions>) => {
    const updatedFilterOptions = { ...filterOptions, ...newFilterOptions }
    setFilterOptions(updatedFilterOptions)

    // Apply filters
    let filtered = [...academies]

    // Filter by search query
    if (updatedFilterOptions.searchQuery) {
      const query = updatedFilterOptions.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (academy) =>
          academy.title.toLowerCase().includes(query) ||
          academy.description.toLowerCase().includes(query) ||
          academy.location.toLowerCase().includes(query) ||
          academy.sports?.some((sport) => sport.toLowerCase().includes(query)),
      )
    }

    // Filter by price
    if (updatedFilterOptions.price) {
      filtered = filtered.filter(
        (academy) =>
          academy.hourlyRate &&
          academy.hourlyRate >= updatedFilterOptions.price!.min &&
          academy.hourlyRate <= updatedFilterOptions.price!.max,
      )
    }

    // Filter by rating
    if (updatedFilterOptions.rating && updatedFilterOptions.rating > 0) {
      filtered = filtered.filter((academy) => academy.rating && academy.rating >= updatedFilterOptions.rating!)
    }

    // Filter by sports
    if (updatedFilterOptions.sports && updatedFilterOptions.sports.length > 0) {
      filtered = filtered.filter((academy) =>
        academy.sports?.some((sport) => updatedFilterOptions.sports!.includes(sport)),
      )
    }

    // Filter by category
    if (updatedFilterOptions.category) {
      filtered = filtered.filter((academy) => academy.category === updatedFilterOptions.category)
    }

    setFilteredAcademies(filtered)
  }

  const handleSearch = (query: string) => {
    handleFilterChange({ searchQuery: query })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <AcademiesHeader city={city} />
      <div className="flex flex-col md:flex-row gap-6 mt-8">
        <div className="w-full md:w-1/4">
          <AcademiesFilter onFilterChange={handleFilterChange} filterOptions={filterOptions} />
        </div>
        <div className="w-full md:w-3/4">
          <div className="mb-6">
            <AcademiesSearchBar onSearch={handleSearch} />
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
              {viewMode === "grid" && <AcademiesGrid academies={filteredAcademies} city={city} />}
              {viewMode === "list" && <AcademiesList academies={filteredAcademies} city={city} />}
              {viewMode === "map" && (
                <LocationMapView academies={filteredAcademies} city={city} activeTab="academies" />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
