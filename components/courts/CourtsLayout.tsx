"use client"

import { useState, useEffect, useRef } from "react"
import { CourtsHeader } from "./CourtsHeader"
import { CourtsFilter } from "./CourtsFilter"
import { CourtsGrid } from "./CourtsGrid"
import { CourtsList } from "./CourtsList"
import { CourtsSearchBar } from "./CourtsSearchBar"
import Pagination from "@/components/coaches/Pagination"
import type { Court } from "@/types/court"
import { courts } from "@/data/courts-data"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export function CourtsLayout() {
  const [filteredCourts, setFilteredCourts] = useState<Court[]>(courts)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterSectionHeight, setFilterSectionHeight] = useState(0)
  const filterRef = useRef<HTMLDivElement>(null)
  const [filterOptions, setFilterOptions] = useState<any>({
    price: { min: 10, max: 100 },
    rating: 0,
    courtType: [],
    surfaceType: [],
    availabilityTimeSlots: [],
    facilities: [],
    category: "",
    searchQuery: "",
  })

  const courtsPerPage = 6
  const totalPages = Math.ceil(filteredCourts.length / courtsPerPage)

  // Get current courts for pagination
  const indexOfLastCourt = currentPage * courtsPerPage
  const indexOfFirstCourt = indexOfLastCourt - courtsPerPage
  const currentCourts = filteredCourts.slice(indexOfFirstCourt, indexOfLastCourt)

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

  // Filter courts based on filter options
  useEffect(() => {
    let result = [...courts]

    // Filter by category (case insensitive)
    if (filterOptions.category && filterOptions.category !== "All Categories") {
      result = result.filter((court) => court.sport.toLowerCase() === filterOptions.category.toLowerCase())
    }

    // Filter by price range
    result = result.filter((court) => court.price >= filterOptions.price.min && court.price <= filterOptions.price.max)

    // Filter by rating
    if (filterOptions.rating > 0) {
      result = result.filter((court) => court.rating >= filterOptions.rating)
    }

    // Filter by court type
    if (filterOptions.courtType.length > 0) {
      result = result.filter((court) => filterOptions.courtType.includes(court.type))
    }

    // Filter by surface type
    if (filterOptions.surfaceType.length > 0) {
      result = result.filter((court) => filterOptions.surfaceType.includes(court.surface))
    }

    // Filter by search query (case insensitive)
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      result = result.filter(
        (court) =>
          court.name.toLowerCase().includes(query) ||
          court.location.toLowerCase().includes(query) ||
          court.description.toLowerCase().includes(query) ||
          court.sport.toLowerCase().includes(query),
      )
    }

    // Filter by facilities
    if (filterOptions.facilities.length > 0) {
      result = result.filter((court) =>
        court.facilities.some((facility: string) => filterOptions.facilities.includes(facility)),
      )
    }

    // Sort courts
    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredCourts(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filterOptions, sortBy])

  const handleFilterChange = (newOptions: Partial<any>) => {
    setFilterOptions((prev: any) => ({ ...prev, ...newOptions }))
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
      <CourtsHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CourtsSearchBar
          onFilterChange={handleFilterChange}
          filterOptions={filterOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          toggleFilterSidebar={toggleFilterSidebar}
        />

        <div className="flex flex-col md:flex-row mt-6 gap-6">
          <div
            ref={filterRef}
            className={`${isFilterOpen ? "block" : "hidden"} md:block w-full md:w-72 lg:w-80 flex-shrink-0`}
          >
            <CourtsFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-700 font-medium">{filteredCourts.length} courts are listed</p>
              <button
                className="md:hidden bg-emerald-600 text-white px-3 py-1 rounded-md text-sm"
                onClick={toggleFilterSidebar}
              >
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>
            </div>

            <div className="pb-6 flex-1">
              {viewMode === "grid" ? (
                <CourtsGrid courts={currentCourts} currentPage={currentPage} />
              ) : viewMode === "list" ? (
                <CourtsList courts={currentCourts} currentPage={currentPage} />
              ) : (
                <div className="h-[600px] bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Map view coming soon</p>
                </div>
              )}
            </div>

            <div className="mt-auto pt-4 bg-white rounded-lg shadow-sm">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={paginate} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating background elements */}
      <div className="fixed top-1/4 left-10 w-32 h-32 bg-emerald-50 rounded-full opacity-20 blur-xl z-0"></div>
      <div className="fixed bottom-1/4 right-10 w-40 h-40 bg-emerald-50 rounded-full opacity-20 blur-xl z-0"></div>

      <Footer />
    </div>
  )
}

