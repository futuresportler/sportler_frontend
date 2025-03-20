"use client"

import { useState, useEffect, useRef } from "react"
import CoachesHeader from "./CoachesHeader"
import CoachesFilter from "./CoachesFilter"
import CoachesGrid from "./CoachesGrid"
import CoachesList from "./CoachesList"
import CoachesSearchBar from "./CoachesSearchBar"
import Pagination from "./Pagination"
import type { Coach, FilterOptions } from "../../types/coach"
import { dummyCoaches } from "../../data/coaches-data"
import Header from "@/components/Header"

export default function CoachesLayout() {
  const [coaches, setCoaches] = useState<Coach[]>(dummyCoaches)
  const [filteredCoaches, setFilteredCoaches] = useState<Coach[]>(dummyCoaches)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState<"grid" | "list" | "map">("grid")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [sortBy, setSortBy] = useState("relevance")
  const [filterSectionHeight, setFilterSectionHeight] = useState(0)
  const filterRef = useRef<HTMLDivElement>(null)
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    price: { min: 50, max: 500 },
    rating: 0,
    certificationLevel: [],
    sessionType: [],
    availabilityTimeSlots: [],
    trainedProfessionals: false,
    languages: [],
    sport: "",
    searchQuery: "",
  })

  const coachesPerPage = 6
  const totalPages = Math.ceil(filteredCoaches.length / coachesPerPage)

  // Get current coaches for pagination
  const indexOfLastCoach = currentPage * coachesPerPage
  const indexOfFirstCoach = indexOfLastCoach - coachesPerPage
  const currentCoaches = filteredCoaches.slice(indexOfFirstCoach, indexOfLastCoach)

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

  // Filter coaches based on filter options
  useEffect(() => {
    let result = [...dummyCoaches]

    // Filter by sport (case insensitive)
    if (filterOptions.sport && filterOptions.sport !== "All Sports") {
      result = result.filter((coach) => coach.sport.toLowerCase() === filterOptions.sport.toLowerCase())
    }

    // Filter by price range
    result = result.filter(
      (coach) => coach.hourlyRate >= filterOptions.price.min && coach.hourlyRate <= filterOptions.price.max,
    )

    // Filter by rating
    if (filterOptions.rating > 0) {
      result = result.filter((coach) => coach.rating >= filterOptions.rating)
    }

    // Filter by certification level
    if (filterOptions.certificationLevel.length > 0) {
      result = result.filter((coach) => filterOptions.certificationLevel.includes(coach.certificationLevel))
    }

    // Filter by session type
    if (filterOptions.sessionType.length > 0) {
      result = result.filter((coach) => coach.sessionTypes.some((type) => filterOptions.sessionType.includes(type)))
    }

    // Filter by search query (case insensitive)
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      result = result.filter(
        (coach) =>
          coach.name.toLowerCase().includes(query) ||
          coach.location.toLowerCase().includes(query) ||
          coach.description.toLowerCase().includes(query) ||
          coach.sport.toLowerCase().includes(query),
      )
    }

    // Filter by trained professionals
    if (filterOptions.trainedProfessionals) {
      result = result.filter((coach) => coach.trainedProfessionals)
    }

    // Filter by languages
    if (filterOptions.languages.length > 0) {
      result = result.filter((coach) => coach.languages.some((lang) => filterOptions.languages.includes(lang)))
    }

    // Sort coaches
    if (sortBy === "price-low") {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredCoaches(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filterOptions, sortBy])

  const handleFilterChange = (newOptions: Partial<FilterOptions>) => {
    setFilterOptions((prev) => ({ ...prev, ...newOptions }))
  }

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen)
  }

  useEffect(() => {
    // Add custom scrollbar styling and animations
    const style = document.createElement("style")
    style.textContent = `
      .scrollbar-thin::-webkit-scrollbar {
        width: 6px;
      }
      .scrollbar-thin::-webkit-scrollbar-track {
        background: transparent;
      }
      .scrollbar-thin::-webkit-scrollbar-thumb {
        background-color: rgba(16, 185, 129, 0.2);
        border-radius: 20px;
      }
      .scrollbar-thin:hover::-webkit-scrollbar-thumb {
        background-color: rgba(16, 185, 129, 0.4);
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
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CoachesHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <CoachesSearchBar
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
            <CoachesFilter filterOptions={filterOptions} onFilterChange={handleFilterChange} />
          </div>

          <div className="flex-1 flex flex-col">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-700 font-medium">{filteredCoaches.length} coaches are listed</p>
            </div>

            <div
              className="overflow-y-auto pr-2 pb-4 flex-1 scrollbar-thin"
              style={{
                height: "calc(100vh - 350px)",
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(16, 185, 129, 0.2) transparent",
              }}
            >
              {viewMode === "grid" ? (
                <CoachesGrid coaches={currentCoaches} currentPage={currentPage} />
              ) : viewMode === "list" ? (
                <CoachesList coaches={currentCoaches} currentPage={currentPage} />
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
      <div className="fixed bottom-1/4 right-10 w-40 h-40 bg-blue-50 rounded-full opacity-20 blur-xl z-0"></div>
    </div>
  )
}

