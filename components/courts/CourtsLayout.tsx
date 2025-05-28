"use client"

import { Pagination } from "@/components/ui/pagination"
import { fetchTurfsByCity, transformApiTurfToCourt } from "@/services/apiService"
import type { Court } from "@/types/court"
import { applySearchFilters, extractSearchParams } from "@/utils/search-params"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import { CourtsFilter } from "./CourtsFilter"
import { CourtsGrid } from "./CourtsGrid"
import { CourtsHeader } from "./CourtsHeader"
import { CourtsList } from "./CourtsList"
import { CourtsSearchBar } from "./CourtsSearchBar"

interface CourtsLayoutProps {
  city: string
}

export function CourtsLayout({ city }: CourtsLayoutProps) {
  const searchParams = useSearchParams()
  const [courts, setCourts] = useState<Court[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<any>({})
  const itemsPerPage = 12

  // Load courts from API
  useEffect(() => {
    async function loadCourts() {
      setLoading(true)
      try {
        const apiTurfs = await fetchTurfsByCity(city)
        const transformedCourts = apiTurfs.map(transformApiTurfToCourt)
        setCourts(transformedCourts)
      } catch (error) {
        console.error("Error loading courts:", error)
        setCourts([])
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      loadCourts()
    }
  }, [city])

  // Extract search parameters
  const searchFilters = useMemo(() => {
    return extractSearchParams(searchParams, city)
  }, [searchParams, city])

  // Apply filters and search
  const filteredCourts = useMemo(() => {
    let filtered = [...courts]

    // Apply search filters
    filtered = applySearchFilters(filtered, {
      sport: searchFilters.sport,
      location: searchFilters.location,
    })

    // Apply additional filters
    if (filters.price) {
      filtered = filtered.filter((court) => court.price >= filters.price.min && court.price <= filters.price.max)
    }

    if (filters.rating) {
      filtered = filtered.filter((court) => court.rating >= filters.rating)
    }

    if (filters.isIndoor !== undefined) {
      filtered = filtered.filter((court) => court.isIndoor === filters.isIndoor)
    }

    if (filters.amenities && filters.amenities.length > 0) {
      filtered = filtered.filter((court) =>
        filters.amenities.some((amenity: string) => court.amenities.includes(amenity)),
      )
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (court) =>
          court.name.toLowerCase().includes(query) ||
          court.description?.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query) ||
          court.sport.toLowerCase().includes(query),
      )
    }

    return filtered
  }, [courts, searchFilters, filters])

  // Pagination
  const totalPages = Math.ceil(filteredCourts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedCourts = filteredCourts.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading courts...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <CourtsHeader city={city} />
      <div className="container mx-auto px-4 py-8 w-full">
        <CourtsSearchBar onFiltersChange={handleFiltersChange} city={city} />

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="lg:w-1/4">
            <CourtsFilter onFiltersChange={handleFiltersChange} />
          </div>

          <div className="lg:w-3/4 w-full">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredCourts.length)} of{" "}
                {filteredCourts.length} courts in {city}
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

            {paginatedCourts.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No courts found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <CourtsGrid courts={paginatedCourts} currentPage={currentPage} city={city} />
                ) : (
                  <CourtsList courts={paginatedCourts} currentPage={currentPage} city={city} />
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
