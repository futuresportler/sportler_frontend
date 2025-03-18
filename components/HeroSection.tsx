"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Search, ChevronDown, MapPin, Activity } from "lucide-react";

// Sample images for carousel
const heroImages = [
  "/pexels-chuck-2834917.jpg?height=500&width=500",
  "/pexels-rdne-7045428.jpg?height=500&width=500",
  "/pexels-rdne-7335042.jpg?height=500&width=500",
  "/pexels-victorfreitas-841130.jpg?height=500&width=500",
];

// Sample sport options with icons
const sportOptions = [
  { name: "Badminton", icon: "🏸" },
  { name: "Tennis", icon: "🎾" },
  { name: "Football", icon: "⚽" },
  { name: "Basketball", icon: "🏀" },
  { name: "Swimming", icon: "🏊‍♂️" },
  { name: "Cricket", icon: "🏏" },
];

// Sample city options
const cityOptions = [
  "New York",
  "London",
  "Mumbai",
  "Tokyo",
  "Sydney",
  "Paris",
  "Berlin",
];

export default function HeroSection() {
  const [currentImage, setCurrentImage] = useState(0);
  const [searchType, setSearchType] = useState("coach");
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [selectedSport, setSelectedSport] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const sportDropdownRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const carouselRef = useRef(null);

  // Handle carousel image change
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sportDropdownRef.current &&
        !sportDropdownRef.current.contains(event.target)
      ) {
        setShowSportDropdown(false);
      }

      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setShowCityDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchTypeChange = (type) => {
    setSearchType(type);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsSearching(true);

    // Simulate search completion after 1 second
    setTimeout(() => {
      setIsSearching(false);
      // You would typically navigate or update results here
    }, 1000);
  };

  return (
    <section className="relative text-white pt-16 pb-24 px-4 md:px-8 lg:px-16 overflow-hidden min-h-[85vh] flex items-center">
      {/* Background image with improved overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/banner.jpg?height=1080&width=1920"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-900/60 backdrop-blur-[2px]"></div>
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
              World Class Badminton Coaching & Premium Courts
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              Choose Your <span className="text-yellow-400">Coaches</span>
              <br />
              And Start Your <span className="text-yellow-400">Training</span>
            </h1>
            <p className="text-base mb-6 max-w-md text-white/90">
              Unleash Your Athletic Potential with Expert Coaching,
              State-of-the-Art Facilities, and Personalized Training Programs.
            </p>

            {/* Improved search type selector with animation */}
            <div className="flex max-w-xl mb-4 bg-white/10 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
              <button
                onClick={() => handleSearchTypeChange("coach")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  searchType === "coach"
                    ? "bg-white text-emerald-600 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Coach
              </button>
              <button
                onClick={() => handleSearchTypeChange("academy")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  searchType === "academy"
                    ? "bg-white text-emerald-600 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Academy
              </button>
              <button
                onClick={() => handleSearchTypeChange("turf")}
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 ${
                  searchType === "turf"
                    ? "bg-white text-emerald-600 shadow-md"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Turf
              </button>
            </div>

            {/* Enhanced search bar with dropdowns that open UPWARD */}
            <form
              onSubmit={handleSearch}
              className="relative w-full max-w-2xl z-50"
            >
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
                        <span
                          className={
                            selectedSport
                              ? "text-gray-800 font-medium"
                              : "text-gray-400"
                          }
                        >
                          {selectedSport || "Select Sport"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-300 ${
                            showSportDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Dropdown now opens UPWARD instead of downward */}
                    {showSportDropdown && (
                      <div className="absolute bottom-full left-0 right-0 bg-white z-50 shadow-xl rounded-t-xl border border-gray-100 max-h-60 overflow-y-auto">
                        {sportOptions.map((sport) => (
                          <div
                            key={sport.name}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 flex items-center gap-3 transition-colors"
                            onClick={() => {
                              setSelectedSport(sport.name);
                              setShowSportDropdown(false);
                            }}
                          >
                            <span className="text-xl">{sport.icon}</span>
                            <span>{sport.name}</span>
                          </div>
                        ))}
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
                        <span
                          className={
                            selectedCity
                              ? "text-gray-800 font-medium"
                              : "text-gray-400"
                          }
                        >
                          {selectedCity || "Choose Location"}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-300 ${
                            showCityDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>

                    {/* Dropdown now opens UPWARD instead of downward */}
                    {showCityDropdown && (
                      <div className="absolute bottom-full left-0 right-0 bg-white z-50 shadow-xl rounded-t-xl max-h-60 overflow-y-auto">
                        {cityOptions.map((city) => (
                          <div
                            key={city}
                            className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-gray-700 transition-colors"
                            onClick={() => {
                              setSelectedCity(city);
                              setShowCityDropdown(false);
                            }}
                          >
                            {city}
                          </div>
                        ))}
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
          <div
            className="relative flex justify-center mt-12 md:mt-0 z-20"
            ref={carouselRef}
          >
            {/* Enhanced image slider with better shape and styling */}
            <div className="relative w-full max-w-md h-[340px] sm:h-[400px] md:h-[440px] flex justify-center items-center">
              {/* Enhanced background glow effect */}
              <div className="absolute w-[85%] h-[85%] bg-gradient-to-br from-yellow-400/30 to-emerald-500/20 rounded-lg blur-2xl z-0 animate-pulse"></div>

              {/* Previous images with improved styling */}
              {heroImages.map((src, index) => {
                const showAsBack =
                  index !== currentImage &&
                  (index === currentImage - 1 ||
                    (currentImage === 0 && index === heroImages.length - 1));

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
                ) : null;
              })}

              {/* Current main image with improved shape from oval to modern rounded rectangle */}
              {heroImages.map((src, index) => (
                <div
                  key={`main-${index}`}
                  className={`absolute w-[90%] h-[90%] overflow-hidden transition-all duration-700 ease-in-out ${
                    currentImage === index
                      ? "opacity-100 z-10 right-0 scale-100"
                      : "opacity-0 z-0 right-8 scale-95"
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

              {/* Enhanced decorative element */}
              <div className="absolute -bottom-6 -left-6 w-20 sm:w-24 h-20 sm:h-24 z-20 drop-shadow-xl">
                <div className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-2xl -z-10 border border-white/20"></div>
                <Image
                  src="/badminton-icon.svg"
                  alt="Badminton"
                  width={60}
                  height={60}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              {/* Improved image indicators */}
              <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {heroImages.map((_, index) => (
                  <button
                    key={`dot-${index}`}
                    className={`transition-all ${
                      currentImage === index
                        ? "bg-yellow-400 w-6 h-2 rounded-full"
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
  );
}
