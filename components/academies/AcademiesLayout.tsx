"use client"

import { useState, useEffect, useRef } from "react"
import { useSearchParams } from "next/navigation"
import AcademiesHeader from "./AcademiesHeader"
import AcademiesFilter from "./AcademiesFilter"
import AcademiesGrid from "./AcademiesGrid"
import AcademiesList from "./AcademiesList"
import AcademiesSearchBar from "./AcademiesSearchBar"
import Pagination from "@/components/coaches/Pagination"
import type { Academy, AcademyFilterOptions } from "@/types/academy"
import { newAcademies } from "@/data/new-academies-data"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { extractSearchParams } from "@/utils/search-params"

export default function AcademiesLayout() {
  const searchParams = useSearchParams()
  // Make sure we're using academiesData consistently
  const [academies] = useState<Academy[]>(newAcademies)
  const [filteredAcademies, setFilteredAcademies] = useState<Academy[]>(newAcademies)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterSectionHeight, setFilterSectionHeight] = useState(0)
  const filterRef = useRef<HTMLDivElement>(null)
  const [filterOptions, setFilterOptions] = useState<AcademyFilterOptions>({
    price: { min: 50, max: 500 },
    rating: 0,
    certificationLevel: [],
    sessionType: [],
    availabilityTimeSlots: [],
    amenities: [],
    languages: [],
    category: "",
    searchQuery: "",
  })

  // Extract search parameters from URL
  useEffect(() => {
    if (searchParams) {
      const { sport, location } = extractSearchParams(searchParams)

      // Update filter options based on search parameters
      if (sport || location) {
        setFilterOptions((prev) => ({
          ...prev,
          category: sport || prev.category,
          searchQuery: location || prev.searchQuery,
        }))
      }
    }
  }, [searchParams])

  const academiesPerPage = 6
  const totalPages = Math.ceil(filteredAcademies.length / academiesPerPage)

  // Get current academies for pagination
  const indexOfLastAcademy = currentPage * academiesPerPage
  const indexOfFirstAcademy = indexOfLastAcademy - academiesPerPage
  const currentAcademies = filteredAcademies.slice(indexOfFirstAcademy, indexOfLastAcademy)

  // Measure filter section height for matching scroll area
  useEffect(() => {
    if (filterRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          setFilterSectionHeight(entry.contentRect.height)
        }
      })

      resizeObserver.observe(filterRef.current)
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, [])

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  // Filter academies based on filter options
  useEffect(() => {
    // Always start with the full list of academies
    let result = [...academies]

    console.log("Filtering academies with options:", filterOptions)
    console.log("Starting with", result.length, "academies")

    // Filter by category (case insensitive)
    if (filterOptions.category && filterOptions.category !== "All Categories") {
      result = result.filter((academy) => {
        // Check if category matches (case insensitive)
        const categoryMatch = academy.category?.toLowerCase().includes(filterOptions.category.toLowerCase())

        // Check if any sport matches (case insensitive)
        const sportsMatch = academy.sports?.some((sport) =>
          sport.toLowerCase().includes(filterOptions.category.toLowerCase()),
        )

        return categoryMatch || sportsMatch
      })
      console.log("After category filter:", result.length, "academies")
    }

    // Filter by price range if hourlyRate exists
    result = result.filter((academy) => {
      // If hourlyRate doesn't exist, don't filter it out
      if (academy.hourlyRate === undefined) return true
      return academy.hourlyRate >= filterOptions.price.min && academy.hourlyRate <= filterOptions.price.max
    })
    console.log("After price filter:", result.length, "academies")

    // Filter by rating if rating exists
    if (filterOptions.rating > 0) {
      result = result.filter((academy) => {
        // If rating doesn't exist, don't filter it out
        if (academy.rating === undefined) return false
        return academy.rating >= filterOptions.rating
      })
      console.log("After rating filter:", result.length, "academies")
    }

    // Filter by certification level if it exists
    if (filterOptions.certificationLevel.length > 0) {
      result = result.filter((academy) => {
        // If certificationLevel doesn't exist, don't filter it out
        if (!academy.certificationLevel) return false
        return filterOptions.certificationLevel.includes(academy.certificationLevel)
      })
      console.log("After certification filter:", result.length, "academies")
    }

    // Filter by session type if it exists
    if (filterOptions.sessionType.length > 0) {
      result = result.filter((academy) => {
        // If sessionTypes doesn't exist, don't filter it out
        if (!academy.sessionTypes || academy.sessionTypes.length === 0) return false
        return academy.sessionTypes.some((type) => filterOptions.sessionType.includes(type))
      })
      console.log("After session type filter:", result.length, "academies")
    }

    // Filter by search query (case insensitive) - this will handle location searches
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      result = result.filter(
        (academy) =>
          (academy.title && academy.title.toLowerCase().includes(query)) ||
          (academy.location && academy.location.toLowerCase().includes(query)) ||
          (academy.description && academy.description.toLowerCase().includes(query)) ||
          (academy.category && academy.category.toLowerCase().includes(query)),
      )
      console.log("After search query filter:", result.length, "academies")
    }

    // Filter by amenities if they exist
    if (filterOptions.amenities.length > 0) {
      result = result.filter((academy) => {
        // If amenities doesn't exist, don't filter it out
        if (!academy.amenities || academy.amenities.length === 0) return false
        return academy.amenities.some((amenity) => filterOptions.amenities.includes(amenity))
      })
      console.log("After amenities filter:", result.length, "academies")
    }

    // Filter by languages if they exist
    if (filterOptions.languages.length > 0) {
      result = result.filter((academy) => {
        // If languages doesn't exist, don't filter it out
        if (!academy.languages || academy.languages.length === 0) return false
        return academy.languages.some((lang) => filterOptions.languages.includes(lang))
      })
      console.log("After languages filter:", result.length, "academies")
    }

    // Sort academies
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0))
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0))
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    console.log("Final filtered academies:", result.length)
    setFilteredAcademies(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filterOptions, sortBy, academies])

  const handleFilterChange = (newOptions: Partial<AcademyFilterOptions>) => {
    console.log("Filter changed:", newOptions)
    setFilterOptions((prev) => ({ ...prev, ...newOptions }))
  }

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  useEffect(() => {
    // Add custom scrollbar styling and animations
    const style = document.createElement("style")
    style.textContent = `
      html {
        scroll-behavior: smooth;
      }
      
      @keyframes heartbeat {
        0% { transform: scale(1); }
        25% { transform: scale(1.2); }
        50% { transform: scale(1); }
        75% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      .animate-heartbeat {
        animation: heartbeat 0.8s ease-in-out;
      }
      
      @keyframes ping-once {
        0% { transform: scale(0.8); opacity: 1; }
        100% { transform: scale(2); opacity: 0; }
      }
      
      .animate-ping-once {
        animation: ping-once 0.8s cubic-bezier(0, 0, 0.2, 1) forwards;
      }
    `
    document.head.appendChild(style)

    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header />
      <AcademiesHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <AcademiesSearchBar
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleFilterSidebar={toggleFilterSidebar}
        />

        <div className="flex mt-6 gap-6">
          <div
            ref={filterRef}
            className={`${isFilterOpen ? "block" : "hidden"} md:block w-full md:w-72 lg:w-80 flex-shrink-0`}
          >
            <AcademiesFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-700 font-medium">{filteredAcademies.length} academies are listed</p>
              <button
                className="md:hidden bg-emerald-600 text-white px-3 py-1 rounded-md text-sm"
                onClick={toggleFilterSidebar}
              >
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div className="pb-6 flex-1">
              {filteredAcademies.length > 0 ? (
                viewMode === "grid" ? (
                  <AcademiesGrid academies={currentAcademies} currentPage={currentPage} />
                ) : viewMode === "list" ? (
                  <AcademiesList academies={currentAcademies} currentPage={currentPage} />
                ) : (
                  <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Map view coming soon</p>
                  </div>
                )
              ) : (
                <div className="bg-white rounded-lg p-8 text-center shadow-sm">
                  <p className="text-gray-600 mb-2">No academies found matching your filters.</p>
                  <button
                    onClick={() =>
                      setFilterOptions({
                        price: { min: 50, max: 500 },
                        rating: 0,
                        certificationLevel: [],
                        sessionType: [],
                        availabilityTimeSlots: [],
                        amenities: [],
                        languages: [],
                        category: "",
                        searchQuery: "",
                      })
                    }
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>

            {filteredAcademies.length > 0 && (
              <div className="mt-auto pt-4 bg-white rounded-lg shadow-sm">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="fixed top-1/4 left-10 w-32 h-32 bg-emerald-50 rounded-full opacity-20 blur-xl z-0"></div>
      <div className="fixed bottom-1/4 right-10 w-40 h-40 bg-blue-50 rounded-full opacity-20 blur-xl z-0"></div>

      <Footer />
    </div>
  )
}
