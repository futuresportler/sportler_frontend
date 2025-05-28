"use client"

import { Pagination } from "@/components/ui/pagination"
import { fetchAcademiesByCity, transformApiAcademyToAcademy } from "@/services/apiService"
import type { Academy, AcademyFilterOptions } from "@/types/academy"
import { applySearchFilters, extractSearchParams } from "@/utils/search-params"
import { useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import AcademiesFilter from "./AcademiesFilter"
import AcademiesGrid from "./AcademiesGrid"
import AcademiesHeader from "./AcademiesHeader"
import AcademiesList from "./AcademiesList"
import AcademiesSearchBar from "./AcademiesSearchBar"

interface AcademiesLayoutProps {
  city: string
}

export default function AcademiesLayout({ city }: AcademiesLayoutProps) {
  const searchParams = useSearchParams()
  const [academies, setAcademies] = useState<Academy[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState<AcademyFilterOptions>({})
  const itemsPerPage = 6

  // Load academies from API
  useEffect(() => {
    async function loadAcademies() {
      setLoading(true)
      try {
        const apiAcademies = await fetchAcademiesByCity(city)
        const transformedAcademies = apiAcademies.map(transformApiAcademyToAcademy)
        setAcademies(transformedAcademies)
      } catch (error) {
        console.error("Error loading academies:", error)
        setAcademies([])
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      loadAcademies()
    }
  }, [city])

  // Extract search parameters
  const searchFilters = useMemo(() => {
    return extractSearchParams(searchParams, city)
  }, [searchParams, city])

  // Apply filters and search
  const filteredAcademies = useMemo(() => {
    let filtered = [...academies]

    // Apply search filters
    filtered = applySearchFilters(filtered, {
      sport: searchFilters.sport,
      location: searchFilters.location,
    })

    // Apply additional filters
    if (filters.price) {
      filtered = filtered.filter(
        (academy) =>
          academy.hourlyRate && academy.hourlyRate >= filters.price!.min && academy.hourlyRate <= filters.price!.max,
      )
    }

    if (filters.rating) {
      filtered = filtered.filter((academy) => academy.rating && academy.rating >= filters.rating!)
    }

    if (filters.certificationLevel && filters.certificationLevel.length > 0) {
      filtered = filtered.filter(
        (academy) => academy.certificationLevel && filters.certificationLevel!.includes(academy.certificationLevel),
      )
    }

    if (filters.sessionType && filters.sessionType.length > 0) {
      filtered = filtered.filter(
        (academy) => academy.sessionTypes && academy.sessionTypes.some((type) => filters.sessionType!.includes(type)),
      )
    }

    if (filters.languages && filters.languages.length > 0) {
      filtered = filtered.filter(
        (academy) => academy.languages && academy.languages.some((lang) => filters.languages!.includes(lang)),
      )
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      filtered = filtered.filter(
        (academy) =>
          academy.title.toLowerCase().includes(query) ||
          academy.description.toLowerCase().includes(query) ||
          academy.location.toLowerCase().includes(query) ||
          (academy.sports && academy.sports.some((sport) => sport.toLowerCase().includes(query))),
      )
    }

    return filtered
  }, [academies, searchFilters, filters])

  // Pagination
  const totalPages = Math.ceil(filteredAcademies.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedAcademies = filteredAcademies.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleFiltersChange = (newFilters: AcademyFilterOptions) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-emerald-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading academies...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AcademiesHeader city={city} />
      <div className="container mx-auto px-4 py-8">
        <AcademiesSearchBar onFiltersChange={handleFiltersChange} city={city} />

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <AcademiesFilter onFiltersChange={handleFiltersChange} />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredAcademies.length)} of{" "}
                {filteredAcademies.length} academies in {city}
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

            {paginatedAcademies.length === 0 ? (
              <div className="bg-white rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No academies found</h3>
                <p className="text-gray-600">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <>
                {viewMode === "grid" ? (
                  <AcademiesGrid academies={paginatedAcademies} currentPage={currentPage} city={city} />
                ) : (
                  <AcademiesList academies={paginatedAcademies} currentPage={currentPage} city={city} />
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
