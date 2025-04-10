"use client"

import { useState } from "react"
import type { AcademyFilterOptions } from "@/types/academy"
import { ChevronDown, ChevronUp, Star, Search } from "lucide-react"

interface AcademiesFilterProps {
  filterOptions: AcademyFilterOptions
  onFilterChange: (options: Partial<AcademyFilterOptions>) => void
}

export default function AcademiesFilter({ filterOptions, onFilterChange }: AcademiesFilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: false,
    radius: false,
    priceRange: true,
    guests: false,
    reviews: true,
    availability: false,
    amenities: true,
    certificationLevel: true,
    sessionType: true,
    availabilityTimeSlots: true,
    trainingMode: false,
    languages: true,
  })

  const [priceRange, setPriceRange] = useState({ min: filterOptions.price.min, max: filterOptions.price.max })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? (type === "min" ? 0 : 1000) : Number.parseInt(value)
    const newPriceRange = {
      ...priceRange,
      [type]: numValue,
    }
    setPriceRange(newPriceRange)
  }

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating })
  }

  const handleCertificationChange = (level: string) => {
    const currentLevels = [...filterOptions.certificationLevel]

    if (currentLevels.includes(level)) {
      onFilterChange({
        certificationLevel: currentLevels.filter((l) => l !== level),
      })
    } else {
      onFilterChange({
        certificationLevel: [...currentLevels, level],
      })
    }
  }

  const handleSessionTypeChange = (type: string) => {
    const currentTypes = [...filterOptions.sessionType]

    if (currentTypes.includes(type)) {
      onFilterChange({
        sessionType: currentTypes.filter((t) => t !== type),
      })
    } else {
      onFilterChange({
        sessionType: [...currentTypes, type],
      })
    }
  }

  const handleTimeSlotChange = (slot: string) => {
    const currentSlots = [...filterOptions.availabilityTimeSlots]

    if (currentSlots.includes(slot)) {
      onFilterChange({
        availabilityTimeSlots: currentSlots.filter((s) => s !== slot),
      })
    } else {
      onFilterChange({
        availabilityTimeSlots: [...currentSlots, slot],
      })
    }
  }

  const handleLanguageChange = (language: string) => {
    const currentLanguages = [...filterOptions.languages]

    if (currentLanguages.includes(language)) {
      onFilterChange({
        languages: currentLanguages.filter((l) => l !== language),
      })
    } else {
      onFilterChange({
        languages: [...currentLanguages, language],
      })
    }
  }

  const handleAmenityChange = (amenity: string) => {
    const currentAmenities = [...filterOptions.amenities]

    if (currentAmenities.includes(amenity)) {
      onFilterChange({
        amenities: currentAmenities.filter((a) => a !== amenity),
      })
    } else {
      onFilterChange({
        amenities: [...currentAmenities, amenity],
      })
    }
  }

  const handleClearAll = () => {
    onFilterChange({
      price: { min: 50, max: 500 },
      rating: 0,
      certificationLevel: [],
      sessionType: [],
      availabilityTimeSlots: [],
      amenities: [],
      languages: [],
      searchQuery: "",
      category: "",
    })
    setPriceRange({ min: 50, max: 500 })
  }

  const applyPriceFilter = () => {
    onFilterChange({
      price: priceRange,
    })
  }

  return (
    <div className="bg-white text-gray-800 rounded-lg p-6 sticky top-24 shadow-md border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-emerald-800">Filter</h2>
        <button onClick={handleClearAll} className="text-emerald-600 text-sm hover:text-emerald-800">
          Clear All
        </button>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("priceRange")}
        >
          <h3 className="font-medium">Price Range</h3>
          {expandedSections.priceRange ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.priceRange && (
          <div>
            <div className="flex justify-between mb-2">
              <span>₹{priceRange.min}/hr</span>
              <span>₹{priceRange.max}/hr</span>
            </div>

            <input
              type="range"
              min="50"
              max="1000"
              step="50"
              value={priceRange.min}
              onChange={(e) => handlePriceChange("min", e.target.value)}
              className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer mb-4"
            />

            <div className="flex gap-4">
              <div className="w-1/2">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceChange("min", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-gray-800 placeholder-gray-400"
                />
              </div>
              <div className="w-1/2">
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceChange("max", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-gray-800 placeholder-gray-400"
                />
              </div>
            </div>

            <button
              onClick={applyPriceFilter}
              className="mt-3 w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-md text-sm transition-colors"
            >
              Apply Price Filter
            </button>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4 cursor-pointer" onClick={() => toggleSection("reviews")}>
          <h3 className="font-medium">Rating</h3>
          {expandedSections.reviews ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.reviews && (
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button key={star} onClick={() => handleRatingChange(star)} className="mr-2">
                <Star
                  size={24}
                  className={`${filterOptions.rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                />
              </button>
            ))}
            {filterOptions.rating > 0 && (
              <button onClick={() => handleRatingChange(0)} className="ml-2 text-xs text-emerald-600 hover:underline">
                Clear
              </button>
            )}
          </div>
        )}
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("amenities")}
        >
          <h3 className="font-medium">Amenities</h3>
          {expandedSections.amenities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.amenities && (
          <div className="space-y-3">
            {[
              "Sports Clubs",
              "Archery Classes",
              "Indoor Courts",
              "Outdoor Courts",
              "Locker Rooms",
              "Pro Shop",
              "Cafeteria",
              "Fitness Center",
              "Video Analysis",
            ].map((amenity) => (
              <div key={amenity} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.amenities.includes(amenity)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleAmenityChange(amenity)}
                >
                  {filterOptions.amenities.includes(amenity) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Certification Level */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("certificationLevel")}
        >
          <h3 className="font-medium">Certification Level</h3>
          {expandedSections.certificationLevel ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.certificationLevel && (
          <div className="space-y-3">
            {["Beginner", "Intermediate", "Advanced", "Professional"].map((level) => (
              <div key={level} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.certificationLevel.includes(level)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleCertificationChange(level)}
                >
                  {filterOptions.certificationLevel.includes(level) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span>{level}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Session Type */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("sessionType")}
        >
          <h3 className="font-medium">Session Type</h3>
          {expandedSections.sessionType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.sessionType && (
          <div className="space-y-3">
            {["Private Lessons", "Group Training", "Workshops", "Camps", "Team Training"].map((type) => (
              <div key={type} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.sessionType.includes(type)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleSessionTypeChange(type)}
                >
                  {filterOptions.sessionType.includes(type) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability Time Slots */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("availabilityTimeSlots")}
        >
          <h3 className="font-medium">Availability Time Slots</h3>
          {expandedSections.availabilityTimeSlots ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.availabilityTimeSlots && (
          <div className="space-y-3">
            {["Morning", "Afternoon", "Evening", "Weekend", "Weekday"].map((slot) => (
              <div key={slot} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.availabilityTimeSlots.includes(slot)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleTimeSlotChange(slot)}
                >
                  {filterOptions.availabilityTimeSlots.includes(slot) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span>{slot}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Languages Spoken */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("languages")}
        >
          <h3 className="font-medium">Languages Spoken</h3>
          {expandedSections.languages ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.languages && (
          <div className="space-y-3">
            {["Hindi", "English", "Spanish", "French", "Mandarin"].map((language) => (
              <div key={language} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.languages.includes(language)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleLanguageChange(language)}
                >
                  {filterOptions.languages.includes(language) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{language}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <button className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md flex items-center justify-center">
        <Search size={18} className="mr-2" />
        Search Now
      </button>
    </div>
  )
}
