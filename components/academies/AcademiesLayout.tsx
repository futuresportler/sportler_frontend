"use client"

import { useState, useEffect, useRef } from "react"
import AcademiesHeader from "./AcademiesHeader"
import AcademiesFilter from "./AcademiesFilter"
import AcademiesGrid from "./AcademiesGrid"
import AcademiesList from "./AcademiesList"
import AcademiesSearchBar from "./AcademiesSearchBar"
import Pagination from "@/components/coaches/Pagination"
import type { Academy, AcademyFilterOptions } from "@/types/academy"
import { dummyAcademies } from "@/data/academies-data"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function AcademiesLayout() {
  const [academies, setAcademies] = useState<Academy[]>(dummyAcademies)
  const [filteredAcademies, setFilteredAcademies] = useState<Academy[]>(dummyAcademies)
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
    let result = [...dummyAcademies]

    // Filter by category (case insensitive)
    if (filterOptions.category && filterOptions.category !== "All Categories") {
      result = result.filter((academy) => academy.category.toLowerCase() === filterOptions.category.toLowerCase())
    }

    // Filter by price range
    result = result.filter(
      (academy) => academy.hourlyRate >= filterOptions.price.min && academy.hourlyRate <= filterOptions.price.max,
    )

    // Filter by rating
    if (filterOptions.rating > 0) {
      result = result.filter((academy) => academy.rating >= filterOptions.rating)
    }

    // Filter by certification level
    if (filterOptions.certificationLevel.length > 0) {
      result = result.filter((academy) => filterOptions.certificationLevel.includes(academy.certificationLevel))
    }

    // Filter by session type
    if (filterOptions.sessionType.length > 0) {
      result = result.filter((academy) => academy.sessionTypes.some((type) => filterOptions.sessionType.includes(type)))
    }

    // Filter by search query (case insensitive)
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase()
      result = result.filter(
        (academy) =>
          academy.title.toLowerCase().includes(query) ||
          academy.location.toLowerCase().includes(query) ||
          academy.description.toLowerCase().includes(query) ||
          academy.category.toLowerCase().includes(query),
      )
    }

    // Filter by amenities
    if (filterOptions.amenities.length > 0) {
      result = result.filter((academy) =>
        academy.amenities.some((amenity) => filterOptions.amenities.includes(amenity)),
      )
    }

    // Filter by languages
    if (filterOptions.languages.length > 0) {
      result = result.filter((academy) => academy.languages.some((lang) => filterOptions.languages.includes(lang)))
    }

    // Sort academies
    if (sortBy === "price-low") {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    setFilteredAcademies(result)
    // Reset to first page when filters change
    setCurrentPage(1)
  }, [filterOptions, sortBy])

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
                <AcademiesGrid academies={currentAcademies} currentPage={currentPage} />
              ) : viewMode === "list" ? (
                <AcademiesList academies={currentAcademies} currentPage={currentPage} />
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

      <Footer />
    </div>
  )
}

