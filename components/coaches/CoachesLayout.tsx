"use client"

import { fetchCoachesByCity, transformApiCoachToCoach } from "@/services/apiService"
import type { Coach, FilterOptions } from "@/types/coach"
import { applySearchFilters, extractSearchParams } from "@/utils/search-params"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import CoachesFilter from "./CoachesFilter"
import CoachesGrid from "./CoachesGrid"
import CoachesHeader from "./CoachesHeader"
import CoachesList from "./CoachesList"
import CoachesSearchBar from "./CoachesSearchBar"
import { Pagination } from "./Pagination"

interface CoachesLayoutProps {
  city: string
}

export default function CoachesLayout({ city }: CoachesLayoutProps) {
  const searchParams = useSearchParams()
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<Partial<FilterOptions>>({})
  const itemsPerPage = 6

  // Load coaches from API
  useEffect(() => {
    async function loadCoaches() {
      setLoading(true)
      try {
        const apiCoaches = await fetchCoachesByCity(city)
        const transformedCoaches = apiCoaches.map(transformApiCoachToCoach)
        setCoaches(transformedCoaches)
      } catch (error) {
        console.error("Error loading coaches:", error)
        setCoaches([])
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      loadCoaches()
    }
  }, [city])

  // Extract search parameters
  const searchFilters = useMemo(() => {
    return extractSearchParams(searchParams, city)
  }, [searchParams, city])

  // Apply filters and search
  const filteredCoaches = useMemo(() => {
    let filtered = [...coaches]

    // Apply search filters
    filtered = applySearchFilters(filtered, {
      sport: searchFilters.sport,
      location: searchFilters.location,
    })

    // Apply additional filters
    if (filters.price) {
      filtered = filtered.filter(
        (coach) => coach.hourlyRate >= filters.price!.min && coach.hourlyRate <= filters.price!.max,
      )
    }

    if (filters.rating) {
      filtered = filtered.filter((coach) => coach.rating >= filters.rating!)
    }

    if (filters.certificationLevel && filters.certificationLevel.length > 0) {
      filtered = filtered.filter((coach) => filters.certificationLevel!.includes(coach.certificationLevel))
    }

    if (filters.sessionType && filters.sessionType.length > 0) {
      filtered = filtered.filter((coach) => coach.sessionTypes.some((type) => filters.sessionType!.includes(type)))
    }

    if (filters.languages && filters.languages.length > 0) {
      filtered = filtered.filter((coach) => coach.languages.some((lang) => filters.languages!.includes(lang)))
    }

    if (filters.trainedProfessionals !== undefined) {
      filtered = filtered.filter((coach) => coach.trainedProfessionals === filters.trainedProfessionals)
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (coach) =>
          coach.name.toLowerCase().includes(query) ||
          coach.description.toLowerCase().includes(query) ||
          coach.location.toLowerCase().includes(query) ||
          coach.sport.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [coaches, searchFilters, filters])

  // Pagination
  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCoaches = filteredCoaches.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFiltersChange = (newFilters: Partial<FilterOptions>) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading coaches...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CoachesHeader city={city} />
      <div className="container mx-auto px-4 py-8">
        <CoachesSearchBar onFiltersChange={handleFiltersChange} city={city} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <CoachesFilter onFiltersChange={handleFiltersChange} />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCoaches.length)} of{" "}
                {filteredCoaches.length} coaches in {city}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${viewMode === "grid" ? "bg-emerald-600 text-white" : "bg-white text-gray-600"}`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${viewMode === "list" ? "bg-emerald-600 text-white" : "bg-white text-gray-600"}`}
                >
                  List
                </button>
              </div>
            </div>

            {paginatedCoaches.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No coaches found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <CoachesGrid coaches={paginatedCoaches} currentPage={currentPage} city={city} />
                ) : (
                  <CoachesList coaches={paginatedCoaches} currentPage={currentPage} city={city} />
                )}

                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
