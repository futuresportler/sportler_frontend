"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, Star, Search } from "lucide-react"

interface CourtsFilterProps {
  filterOptions?: any
  onFilterChange?: (options: Partial<any>) => void
}

export function CourtsFilter({ filterOptions = {}, onFilterChange = () => {} }: CourtsFilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    location: false,
    radius: false,
    priceRange: true,
    guests: false,
    reviews: true,
    availability: false,
    amenities: true,
    courtType: true,
    surfaceType: true,
    availabilityTimeSlots: true,
    bookingOptions: false,
    facilities: true,
  })

  const [priceRange, setPriceRange] = useState({
    min: filterOptions.price?.min || 10,
    max: filterOptions.price?.max || 100,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = value === "" ? (type === "min" ? 10 : 100) : Number.parseInt(value)
    const newPriceRange = {
      ...priceRange,
      [type]: numValue,
    }
    setPriceRange(newPriceRange)
  }

  const handleRatingChange = (rating: number) => {
    onFilterChange({ rating })
  }

  const handleCourtTypeChange = (type: string) => {
    const currentTypes = [...(filterOptions.courtType || [])]

    if (currentTypes.includes(type)) {
      onFilterChange({
        courtType: currentTypes.filter((t) => t !== type),
      })
    } else {
      onFilterChange({
        courtType: [...currentTypes, type],
      })
    }
  }

  const handleSurfaceTypeChange = (type: string) => {
    const currentTypes = [...(filterOptions.surfaceType || [])]

    if (currentTypes.includes(type)) {
      onFilterChange({
        surfaceType: currentTypes.filter((t) => t !== type),
      })
    } else {
      onFilterChange({
        surfaceType: [...currentTypes, type],
      })
    }
  }

  const handleTimeSlotChange = (slot: string) => {
    const currentSlots = [...(filterOptions.availabilityTimeSlots || [])]

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

  const handleFacilityChange = (facility: string) => {
    const currentFacilities = [...(filterOptions.facilities || [])]

    if (currentFacilities.includes(facility)) {
      onFilterChange({
        facilities: currentFacilities.filter((f) => f !== facility),
      })
    } else {
      onFilterChange({
        facilities: [...currentFacilities, facility],
      })
    }
  }

  const handleClearAll = () => {
    onFilterChange({
      price: { min: 10, max: 100 },
      rating: 0,
      courtType: [],
      surfaceType: [],
      availabilityTimeSlots: [],
      facilities: [],
      searchQuery: "",
      category: "",
    })
    setPriceRange({ min: 10, max: 100 })
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
              min="10"
              max="200"
              step="10"
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

      {/* Facilities */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("facilities")}
        >
          <h3 className="font-medium">Facilities</h3>
          {expandedSections.facilities ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.facilities && (
          <div className="space-y-3">
            {[
              "Changing Rooms",
              "Showers",
              "Parking",
              "Equipment Rental",
              "Cafe",
              "Spectator Seating",
              "Floodlights",
            ].map((facility) => (
              <div key={facility} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.facilities?.includes(facility)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleFacilityChange(facility)}
                >
                  {filterOptions.facilities?.includes(facility) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span>{facility}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Court Type */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("courtType")}
        >
          <h3 className="font-medium">Court Type</h3>
          {expandedSections.courtType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.courtType && (
          <div className="space-y-3">
            {["Indoor", "Outdoor", "Covered", "Rooftop"].map((type) => (
              <div key={type} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.courtType?.includes(type) ? "border-emerald-400 bg-emerald-400" : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleCourtTypeChange(type)}
                >
                  {filterOptions.courtType?.includes(type) && <div className="w-2 h-2 bg-white rounded-full"></div>}
                </div>
                <span>{type}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Surface Type */}
      <div className="mb-6">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("surfaceType")}
        >
          <h3 className="font-medium">Surface Type</h3>
          {expandedSections.surfaceType ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>

        {expandedSections.surfaceType && (
          <div className="space-y-3">
            {["Hard Court", "Clay", "Grass", "Carpet", "Synthetic"].map((type) => (
              <div key={type} className="flex items-center">
                <div
                  className={`w-5 h-5 rounded-full border ${
                    filterOptions.surfaceType?.includes(type)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleSurfaceTypeChange(type)}
                >
                  {filterOptions.surfaceType?.includes(type) && <div className="w-2 h-2 bg-white rounded-full"></div>}
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
                    filterOptions.availabilityTimeSlots?.includes(slot)
                      ? "border-emerald-400 bg-emerald-400"
                      : "border-emerald-600"
                  } mr-3 flex items-center justify-center cursor-pointer`}
                  onClick={() => handleTimeSlotChange(slot)}
                >
                  {filterOptions.availabilityTimeSlots?.includes(slot) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span>{slot}</span>
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

