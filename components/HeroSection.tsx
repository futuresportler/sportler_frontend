"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Search } from "lucide-react"

// Sample images for carousel
const heroImages = [
  "/pexels-chuck-2834917.jpg?height=500&width=500",
  "/pexels-rdne-7045428.jpg?height=500&width=500",
  "/pexels-rdne-7335042.jpg?height=500&width=500",
  "/pexels-victorfreitas-841130.jpg?height=500&width=500",
]

// Sample sport options
const sportOptions = ["Badminton", "Tennis", "Football", "Basketball", "Swimming", "Cricket"]

// Sample city options
const cityOptions = ["New York", "London", "Mumbai", "Tokyo", "Sydney", "Paris", "Berlin"]

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0)
  const [searchType, setSearchType] = useState("coach")
  const [showSportDropdown, setShowSportDropdown] = useState(false)
  const [showCityDropdown, setShowCityDropdown] = useState(false)
  const [selectedSport, setSelectedSport] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  
  const dropdownRef = useRef(null)

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSportDropdown(false)
        setShowCityDropdown(false)
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchTypeChange = (type) => {
    setSearchType(type)
  }

  return (
    <section className="relative text-white pt-16 pb-12 px-4 md:px-8 lg:px-16 overflow-hidden min-h-[70vh] flex items-center">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.jpg?height=1080&width=1920" 
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-emerald-900/70 backdrop-blur-sm"></div> */}
      </div>
      
      {/* Background elements - decorative shapes */}
      <div className="absolute top-12 left-8 z-10">
        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
      </div>
      <div className="absolute bottom-0 left-0 z-10">
        <Image
          src="/bg-02.png?height=80&width=80"
          alt="Tennis ball"
          width={80}
          height={80}
          className="opacity-100"
        />
      </div>
      <div className="absolute bottom-0 right-0 z-10">
        <div className="w-16 h-16 bg-yellow-400 rounded-full opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-sm mb-2 text-yellow-300">World Class Badminton Coaching & Premium Courts</div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
              Choose Your <span className="text-yellow-400">Coaches</span>
              <br />
              And Start Your <span className="text-yellow-400">Training</span>
            </h1>
            <p className="text-sm mb-6 max-w-md">
              Unleash Your Athletic Potential with Expert Coaching, State-of-the-Art Facilities, and Personalized
              Training Programs.
            </p>

            {/* Search type selector */}
            <div className="flex max-w-xl mb-3 bg-white/20 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => handleSearchTypeChange("coach")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${searchType === "coach" ? "bg-white text-emerald-600" : "text-white hover:bg-white/10"
                  }`}
              >
                Coach
              </button>
              <button
                onClick={() => handleSearchTypeChange("academy")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${searchType === "academy" ? "bg-white text-emerald-600" : "text-white hover:bg-white/10"
                  }`}
              >
                Academy
              </button>
              <button
                onClick={() => handleSearchTypeChange("turf")}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all duration-300 ${searchType === "turf" ? "bg-white text-emerald-600" : "text-white hover:bg-white/10"
                  }`}
              >
                Turf
              </button>
            </div>

            {/* Search bar with fixed dropdowns - made wider */}
            <div className="bg-white rounded-lg shadow-lg overflow-visible w-full max-w-2xl" ref={dropdownRef}>
              <div className="flex flex-col sm:flex-row">
                {/* Sport dropdown */}
                <div className="flex-1 relative border-b sm:border-b-0 sm:border-r border-gray-200">
                  <div
                    className="px-4 py-2.5 cursor-pointer"
                    onClick={() => {
                      setShowSportDropdown(!showSportDropdown)
                      setShowCityDropdown(false)
                    }}
                  >
                    <label className="block text-xs text-gray-500 mb-1">Search for</label>
                    <div className="flex items-center justify-between">
                      <span className={selectedSport ? "text-gray-800" : "text-gray-400"}>
                        {selectedSport || "Courts"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {showSportDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white z-50 shadow-xl rounded-b-lg border border-gray-100 max-h-60 overflow-y-auto">
                      {sportOptions.map((sport) => (
                        <div
                          key={sport}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          onClick={() => {
                            setSelectedSport(sport)
                            setShowSportDropdown(false)
                          }}
                        >
                          {sport}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* City dropdown */}
                <div className="flex-1 relative">
                  <div
                    className="px-4 py-2.5 cursor-pointer"
                    onClick={() => {
                      setShowCityDropdown(!showCityDropdown)
                      setShowSportDropdown(false)
                    }}
                  >
                    <label className="block text-xs text-gray-500 mb-1">Where</label>
                    <div className="flex items-center justify-between">
                      <span className={selectedCity ? "text-gray-800" : "text-gray-400"}>
                        {selectedCity || "Choose Location"}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    </div>
                  </div>

                  {showCityDropdown && (
                    <div className="absolute top-full left-0 right-0 bg-white z-50 shadow-xl rounded-b-lg max-h-60 overflow-y-auto">
                      {cityOptions.map((city) => (
                        <div
                          key={city}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-700"
                          onClick={() => {
                            setSelectedCity(city)
                            setShowCityDropdown(false)
                          }}
                        >
                          {city}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search button - now inside the white background */}
                <div className="flex items-center px-4">
                  <button className="text-white bg-emerald-600 hover:bg-emerald-700 transition-colors rounded-md p-2">
                    <Search size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            {/* Oval-shaped image container with better proportions */}
            <div className="relative w-full max-w-md h-[420px] flex justify-center items-center">
              {/* Background glow effect */}
              <div className="absolute w-[75%] h-[75%] bg-yellow-400/20 rounded-full blur-xl z-0"></div>
              
              {/* Previous images (stacked at the back) */}
              {heroImages.map((src, index) => {
                // Only show previous images (including current)
                const showAsBack = (index !== currentImage && 
                                   ((index === currentImage - 1) || 
                                    (currentImage === 0 && index === heroImages.length - 1)));
                
                return showAsBack ? (
                  <div 
                    key={`back-${index}`}
                    className="absolute right-4 w-[80%] h-[80%] overflow-hidden z-0"
                    style={{
                      borderRadius: '50% / 60%', 
                      transform: 'scale(0.9)',
                      opacity: 0.5
                    }}
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Coach training background`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : null;
              })}
              
              {/* Current main image */}
              {heroImages.map((src, index) => (
                <div 
                  key={`main-${index}`}
                  className={`absolute w-[90%] h-[90%] overflow-hidden transition-all duration-700 ease-in-out ${
                    currentImage === index 
                      ? "opacity-100 z-10 right-0 scale-100" 
                      : "opacity-0 z-0 right-8 scale-95"
                  }`}
                  style={{
                    borderRadius: '50% / 60%',
                    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.5)'
                  }}
                >
                  {/* Inner border glow */}
                  <div className="absolute inset-0 border-2 border-yellow-400/30 z-20"
                       style={{ borderRadius: '50% / 60%' }}></div>
                  
                  <Image
                    src={src || "/placeholder.svg"}
                    alt={`Coach training ${index + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              ))}
              
              {/* Badminton equipment decorative element - with shadow */}
              <div className="absolute -bottom-6 -left-6 w-20 h-20 z-20 drop-shadow-xl">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full -z-10"></div>
              </div>
              
              {/* Image indicator dots */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentImage === index ? "bg-yellow-400 w-4" : "bg-white/50 hover:bg-white/80"
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