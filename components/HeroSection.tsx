"use client"

import { Activity, ChevronDown, MapPin, Search } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useRef, useState } from "react"

// Sample images for carousel
const heroImages = [
  "/pexels-chuck-2834917.jpg?height=500&width=500",
  "/pexels-rdne-7045428.jpg?height=500&width=500",
  "/pexels-rdne-7335042.jpg?height=500&width=500",
  "/pexels-victorfreitas-841130.jpg?height=500&width=500",
]

// API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [searchType, setSearchType] = useState("coach")
  const [showSportDropdown, setShowSportDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [selectedSport, setSelectedSport] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [isSearching, setIsSearching] = useState(false)

  const sportDropdownRef = useRef(null)
  const cityDropdownRef = useRef(null)
  const carouselRef = useRef(null)
  const router = useRouter()

  const [sportOptions, setSportOptions] = useState([])
  const [cityOptions, setCityOptions] = useState([])
  const [isLoadingSports, setIsLoadingSports] = useState(true)
  const [isLoadingCities, setIsLoadingCities] = useState(true)

  // Handle carousel image change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sportDropdownRef.current && !sportDropdownRef.current.contains(event.target)) {
        setShowSportDropdown(false)
      }

      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setShowCityDropdown(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    // Fetch sports data
    const fetchSports = async () => {
      setIsLoadingSports(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/sports`)
        if (response.ok) {
          const data = await response.json()
          // Map the data to the format we need
          const formattedSports = data.map((sport) => ({
            name: sport.name,
            icon: getSportIcon(sport.name), // Helper function to get icon
          }))
          setSportOptions(formattedSports)
        } else {
          console.error("Failed to fetch sports")
          // Fallback to default sports if API fails
          setSportOptions([
            { name: "Badminton", icon: "🏸" },
            { name: "Tennis", icon: "🎾" },
            { name: "Football", icon: "⚽" },
            { name: "Basketball", icon: "🏀" },
            { name: "Swimming", icon: "🏊‍♂️" },
            { name: "Cricket", icon: "🏏" },
          ])
        }
      } catch (error) {
        console.error("Error fetching sports:", error)
        // Fallback to default sports if API fails
        setSportOptions([
          { name: "Badminton", icon: "🏸" },
          { name: "Tennis", icon: "🎾" },
          { name: "Football", icon: "⚽" },
          { name: "Basketball", icon: "🏀" },
          { name: "Swimming", icon: "🏊‍♂️" },
          { name: "Cricket", icon: "🏏" },
        ])
      } finally {
        setIsLoadingSports(false)
      }
    }

    // Fetch cities data
    const fetchCities = async () => {
      setIsLoadingCities(true)
      try {
        const response = await fetch(`${API_BASE_URL}/api/cities`)
        if (response.ok) {
          const data = await response.json()
          setCityOptions(data.map((city) => city.name))
        } else {
          console.error("Failed to fetch cities")
          // Fallback to default cities if API fails
          setCityOptions(["New York", "London", "Mumbai", "Tokyo", "Sydney", "Paris", "Berlin"])
        }
      } catch (error) {
        console.error("Error fetching cities:", error)
        // Fallback to default cities if API fails
        setCityOptions(["New York", "London", "Mumbai", "Tokyo", "Sydney", "Paris", "Berlin"])
      } finally {
        setIsLoadingCities(false)
      }
    }

    fetchSports()
    fetchCities()
  }, [])

  const getSportIcon = useCallback((sportName) => {
    const sportIcons = {
      Badminton: "🏸",
      Tennis: "🎾",
      Football: "⚽",
      Basketball: "🏀",
      Swimming: "🏊‍♂️",
      Cricket: "🏏",
      Golf: "⛳",
      "Table Tennis": "🏓",
      Volleyball: "🏐",
      Rugby: "🏉",
      Baseball: "⚾",
      Hockey: "🏑",
    }
    return sportIcons[sportName] || "🎯" // Default icon if not found
  }, [])

  const handleSearchTypeChange = (type) => {
    setSearchType(type)
  }

  const handleSearch = async (e) => {
    e.preventDefault()

    // Validate that at least one filter is selected
    if (!selectedSport && !selectedCity) {
      // Show an error or notification that at least one filter is required
      alert("Please select at least a sport or location to search")
      return
    }

    setIsSearching(true)

    // Determine the API endpoint and target page based on search type
    let apiEndpoint
    let targetPage

    switch (searchType) {
      case "coach":
        apiEndpoint = `${API_BASE_URL}/api/coaches`
        targetPage = "/coaches"
        break
      case "academy":
        apiEndpoint = `${API_BASE_URL}/api/academies`
        targetPage = "/academies"
        break
      case "turf":
        apiEndpoint = `${API_BASE_URL}/api/turfs`
        targetPage = "/courts"
        break
      default:
        apiEndpoint = `${API_BASE_URL}/api/coaches`
        targetPage = "/coaches"
    }

    // Build query parameters for API call
    const queryParams = new URLSearchParams()
    if (selectedCity) queryParams.append("city", selectedCity)
    if (selectedSport) queryParams.append("sport", selectedSport)

    try {
      // Make API call to get search results
      const response = await fetch(`${apiEndpoint}?${queryParams.toString()}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      // Check if we have results
      const hasResults =
        data.success &&
        data.data &&
        ((data.data.coaches && data.data.coaches.length > 0) ||
          (data.data.academies && data.data.academies.length > 0) ||
          (data.data.turfs && data.data.turfs.length > 0))

      console.log("Search results:", data)

      // Navigate to the appropriate page with query parameters
      router.push(`${targetPage}?${queryParams.toString()}`)
    } catch (error) {
      console.error("Error searching:", error)
      // Still navigate to the page even if the API call fails
      router.push(`${targetPage}?${queryParams.toString()}`)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <section className="relative text-white pt-16 pb-24 px-4 md:px-8 lg:px-16 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image with improved overlay */}
      <div className="absolute inset-0 z-0">
        <Image src="/banner.jpg?height=1080&width=1920" alt="Background" fill className="object-cover" priority />
        {/* <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-900/60 backdrop-blur-[2px]"></div> */}
      </div>

      {/* Enhanced background elements */}
      <div className="absolute top-12 left-8 z-10">
        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
      </div>
      <div className="absolute bottom-0 left-0 z-10">
        <Image
          src="/bg-02.png?height=80&width=80"
          alt="Tennis ball"
          width={80}
          height={80}
          className="opacity-100 animate-bounce-slow"
        />
      </div>
      <div className="absolute bottom-20 right-20 z-10 hidden md:block">
        <div className="w-24 h-24 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative z-40">
            <div className="inline-block px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 text-sm mb-4 backdrop-blur-sm border border-yellow-400/30">
              World Class Sports Coaching & Premium Courts
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Become the <span className="text-yellow-400">Athlete </span>
              <br />
              You Were Meant <br></br> <span className="text-yellow-400">to Be </span>
            </h1>
            <p className="text-base mb-6 max-w-md text-white/90">
              Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized
              Training Programs.
            </p>

            {/* Improved search type selector with animation */}
            <div
              className="flex max-w-xl mb-4 bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/10"
              role="tablist"
              aria-label="Search categories"
            >
              <button
                onClick={() => handleSearchTypeChange("coach")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${searchType === "coach" ? "bg-white text-emerald-600 shadow-md" : "text-white hover:bg-white/10"
                  }`}
                role="tab"
                aria-selected={searchType === "coach"}
                aria-controls="search-form"
              >
                Coach
              </button>
              <button
                onClick={() => handleSearchTypeChange("academy")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${searchType === "academy" ? "bg-white text-emerald-600 shadow-md" : "text-white hover:bg-white/10"
                  }`}
                role="tab"
                aria-selected={searchType === "academy"}
                aria-controls="search-form"
              >
                Academy
              </button>
              <button
                onClick={() => handleSearchTypeChange("turf")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${searchType === "turf" ? "bg-white text-emerald-600 shadow-md" : "text-white hover:bg-white/10"
                  }`}
                role="tab"
                aria-selected={searchType === "turf"}
                aria-controls="search-form"
              >
                Turf
              </button>
            </div>

            {/* Enhanced search bar with dropdowns that open UPWARD */}
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl z-50">
              <div className="bg-white rounded-xl shadow-2xl overflow-visible w-full">
                <div className="flex flex-col sm:flex-row">
                  {/* Sport dropdown */}
                  <div
                    className="flex-1 relative border-b sm:border-b-0 sm:border-r border-gray-200"
                    ref={sportDropdownRef}
                  >
                    <div
                      className="px-4 py-3.5 cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => setShowSportDropdown(!showSportDropdown)}
                    >
                      <label className="block text-xs text-gray-500 font-medium mb-1">
                        <div className="flex items-center gap-1.5">
                          <Activity size={14} className="text-emerald-500" />
                          <span>Search for</span>
                        </div>
                      </label>
                      <div className="flex items-center justify-between">
                        <span className={selectedSport ? "text-gray-800 font-medium" : "text-gray-400"}>
                          {selectedSport || "Select Sport"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-300 ${showSportDropdown ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </div>

                    {/* Dropdown now opens UPWARD instead of downward */}
                    {showSportDropdown && (
                      <div className="absolute bottom-full left-0 right-0 bg-white z-50 shadow-xl rounded-t-xl border border-gray-100 max-h-60 overflow-y-auto">
                        {isLoadingSports ? (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            <div className="inline-block h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Loading sports...
                          </div>
                        ) : sportOptions.length > 0 ? (
                          sportOptions.map((sport) => (
                            <div
                              key={sport.name}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 flex items-center gap-3 transition-colors"
                              onClick={() => {
                                setSelectedSport(sport.name)
                                setShowSportDropdown(false)
                              }}
                            >
                              <span className="text-xl">{sport.icon}</span>
                              <span>{sport.name}</span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-center">No sports available</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* City dropdown */}
                  <div className="flex-1 relative" ref={cityDropdownRef}>
                    <div
                      className="px-4 py-3.5 cursor-pointer transition-colors hover:bg-gray-50"
                      onClick={() => setShowCityDropdown(!showCityDropdown)}
                    >
                      <label className="block text-xs text-gray-500 font-medium mb-1">
                        <div className="flex items-center gap-1.5">
                          <MapPin size={14} className="text-emerald-500" />
                          <span>Where</span>
                        </div>
                      </label>
                      <div className="flex items-center justify-between">
                        <span className={selectedCity ? "text-gray-800 font-medium" : "text-gray-400"}>
                          {selectedCity || "Choose Location"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-300 ${showCityDropdown ? "rotate-180" : ""
                            }`}
                        />
                      </div>
                    </div>

                    {/* Dropdown now opens UPWARD instead of downward */}
                    {showCityDropdown && (
                      <div className="absolute bottom-full left-0 right-0 bg-white z-50 shadow-xl rounded-t-xl max-h-60 overflow-y-auto">
                        {isLoadingCities ? (
                          <div className="px-4 py-3 text-gray-500 text-center">
                            <div className="inline-block h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mr-2"></div>
                            Loading locations...
                          </div>
                        ) : cityOptions.length > 0 ? (
                          cityOptions.map((city) => (
                            <div
                              key={city}
                              className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                              onClick={() => {
                                setSelectedCity(city)
                                setShowCityDropdown(false)
                              }}
                            >
                              {city}
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-gray-500 text-center">No locations available</div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Enhanced search button with loading state */}
                  <div className="flex items-center justify-center sm:justify-start p-3 sm:px-4">
                    <button
                      type="submit"
                      className="w-full sm:w-auto text-white bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-lg p-3 flex items-center justify-center"
                      disabled={isSearching}
                    >
                      {isSearching ? (
                        <div className="h-6 w-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <Search size={22} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>

            {/* REMOVED extra space that was pushing elements apart */}
          </div>

          {/* IMPROVED SLIDER SECTION */}
          <div className="relative flex justify-center mt-12 md:mt-0 z-20" ref={carouselRef}>
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px] md:h-[440px] flex justify-center items-center">
              <div className="absolute w-[85%] h-[85%] bg-yellow-400/30 to-emerald-500/20 rounded-lg blur-2xl z-0 animate-pulse"></div>

              {/* Previous images with improved styling */}
              {heroImages.map((src, index) => {
                const showAsBack =
                  index !== currentImage &&
                  (index === currentImage - 1 || (currentImage === 0 && index === heroImages.length - 1))

                return showAsBack ? (
                  <div
                    key={`back-${index}`}
                    className="absolute right-4 w-[80%] h-[80%] overflow-hidden z-0"
                    style={{
                      borderRadius: "16px",
                      transform: "scale(0.92) rotate(-2deg)",
                      opacity: 0.5,
                    }}
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Coach training background`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null
              })}

              {/* Current main image with improved shape from oval to modern rounded rectangle */}
              {heroImages.map((src, index) => (
                <div
                  key={`main-${index}`}
                  className={`absolute w-[90%] h-[90%] overflow-hidden transition-all duration-700 ease-in-out ${currentImage === index ? "opacity-100 z-10 right-0 scale-100" : "opacity-0 z-0 right-8 scale-95"
                    }`}
                  style={{
                    borderRadius: "24px",
                    boxShadow: "0 20px 50px -15px rgba(0, 0, 0, 0.6)",
                  }}
                >
                  {/* Enhanced inner border glow */}
                  <div
                    className="absolute inset-0 border-2 border-yellow-400/40 z-20"
                    style={{ borderRadius: "24px" }}
                  ></div>

                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Coach training ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />

                  {/* Subtle gradient overlay on image for better text contrast */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-60"
                    style={{ borderRadius: "24px" }}
                  ></div>
                </div>
              ))}

              {/* Image indicator dots */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`w-2 h-2 rounded-full transition-all ${currentImage === index
                        ? "bg-yellow-400 w-4 h-2 rounded-full"
                        : "bg-white/40 hover:bg-white/70 w-2 h-2 rounded-full"
                      }`}
                    onClick={() => setCurrentImage(index)}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
