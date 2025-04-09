"use client"

import { useState, useEffect, useRef } from "react"
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

export default function AcademiesLayout() {
  // State to hold the academies data
  const [academies, setAcademies] = useState<Academy[]>([])
  const [filteredAcademies, setFilteredAcademies] = useState<Academy[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
    sports: [],
    category: "",
    searchQuery: "",
  })

  // Load academies data
  useEffect(() => {
    console.log("Loading academies data from newAcademies:", newAcademies.length)

    if (newAcademies && newAcademies.length > 0) {
      // Set the academies directly without the timeout
      setAcademies(newAcademies)
      setFilteredAcademies(newAcademies)
      setIsLoading(false)
    } else {
      console.error("No academies data found in newAcademies")
      setIsLoading(false)
    }
  }, [])

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
    console.log("Filtering academies:", academies.length, "academies available")
    if (academies.length === 0) return

    // Check if any filters are active
    const hasActiveFilters =
      (filterOptions.category && filterOptions.category !== "All Categories") ||
      (filterOptions.sports && filterOptions.sports.length > 0) ||
      (filterOptions.price && (filterOptions.price.min > 50 || filterOptions.price.max < 500)) ||
      (filterOptions.rating && filterOptions.rating > 0) ||
      (filterOptions.certificationLevel && filterOptions.certificationLevel.length > 0) ||
      (filterOptions.sessionType && filterOptions.sessionType.length > 0) ||
      (filterOptions.searchQuery && filterOptions.searchQuery.length > 0) ||
      (filterOptions.amenities && filterOptions.amenities.length > 0) ||
      (filterOptions.languages && filterOptions.languages.length > 0) ||
      sortBy !== "relevance"

    // If no filters are active, just use all academies
    if (!hasActiveFilters) {
      console.log("No active filters, showing all academies")
      setFilteredAcademies(academies)
      setCurrentPage(1)
      return
    }

    let result = [...academies]

    // Filter by category (case insensitive)
    if (filterOptions.category && filterOptions.category !== "All Categories") {
      result = result.filter((academy) => academy.category.toLowerCase() === filterOptions.category?.toLowerCase())
    }

    // Filter by sports
    if (filterOptions.sports && filterOptions.sports.length > 0) {
      result = result.filter((academy) => academy.sports?.some((sport) => filterOptions.sports?.includes(sport)))
    }

    // Filter by price range
    if (filterOptions.price) {
      result = result.filter(
        (academy) =>
          academy.hourlyRate !== undefined &&
          academy.hourlyRate >= filterOptions.price!.min &&
          academy.hourlyRate <= filterOptions.price!.max,
      )
    }

    // Filter by rating
    if (filterOptions.rating && filterOptions.rating > 0) {
      result = result.filter((academy) => academy.rating !== undefined && academy.rating >= filterOptions.rating!)
    }

    // Filter by certification level
    if (filterOptions.certificationLevel && filterOptions.certificationLevel.length > 0) {
      result = result.filter(
        (academy) =>
          academy.certificationLevel && filterOptions.certificationLevel?.includes(academy.certificationLevel),
      )
    }

    // Filter by session type
    if (filterOptions.sessionType && filterOptions.sessionType.length > 0) {
      result = result.filter((academy) =>
        academy.sessionTypes?.some((type) => filterOptions.sessionType?.includes(type)),
      )
    }

    // Filter by search query (case insensitive)
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      result = result.filter(
        (academy) =>
          academy.title.toLowerCase().includes(query) ||
          academy.location.toLowerCase().includes(query) ||
          academy.description.toLowerCase().includes(query) ||
          academy.category.toLowerCase().includes(query) ||
          academy.sports?.some((sport) => sport.toLowerCase().includes(query)),
      )
    }

    // Filter by amenities
    if (filterOptions.amenities && filterOptions.amenities.length > 0) {
      result = result.filter((academy) =>
        academy.amenities.some((amenity) => filterOptions.amenities?.includes(amenity)),
      )
    }

    // Filter by languages
    if (filterOptions.languages && filterOptions.languages.length > 0) {
      result = result.filter((academy) => academy.languages.some((lang) => filterOptions.languages?.includes(lang)))
    }

    // Sort academies
    if (sortBy === "price-low") {
      result.sort((a, b) => (a.hourlyRate || 0) - (b.hourlyRate || 0))
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.hourlyRate || 0) - (a.hourlyRate || 0))
    } else if (sortBy === "rating") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
    }

    setFilteredAcademies(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filterOptions, sortBy, academies])

  const handleFilterChange = (newOptions: Partial<AcademyFilterOptions>) => {
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

  console.log("Rendering with:", {
    isLoading,
    academiesCount: academies.length,
    filteredCount: filteredAcademies.length,
    currentCount: currentAcademies.length,
    currentPage,
    totalPages,
  })

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
              <p className="text-gray-700 font-medium">
                {isLoading ? "Loading academies..." : `${filteredAcademies.length} academies are listed`}
              </p>
            </div>

            <div className="pb-6 flex-1">
              {isLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
                </div>
              ) : filteredAcademies.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                  <h3 className="text-xl font-semibold mb-2">No academies found</h3>
                  <p className="text-gray-600">Try adjusting your filters or search criteria</p>
                </div>
              ) : viewMode === "grid" ? (
                <AcademiesGrid academies={currentAcademies} currentPage={currentPage} />
              ) : viewMode === "list" ? (
                <AcademiesList academies={currentAcademies} currentPage={currentPage} />
              ) : (
                <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map view coming soon</p>
                </div>
              )}
            </div>

            {!isLoading && filteredAcademies.length > 0 && (
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
