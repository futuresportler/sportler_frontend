"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Star,
  MapPin,
  Share2,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Info,
  Users,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { CourtDetail as CourtDetailType } from "@/types/court"
import { courts } from "@/data/courts-data"

interface CourtDetailProps {
  court: CourtDetailType
}

export function CourtDetail({ court }: CourtDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    includes: true,
    rules: true,
    amenities: true,
    gallery: true,
    reviews: true,
    locations: true,
  })
  const [selectedSessionType, setSelectedSessionType] = useState<string | null>("one-hour")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCourtIndex, setCurrentCourtIndex] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [showCalendarPopup, setShowCalendarPopup] = useState(false)

  // Update the state variables to track selections
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("Morning")
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; slots: number } | null>(null)
  const [selectedDuration, setSelectedDuration] = useState("FOR 1 HOUR")

  // Refs for scroll navigation
  const overviewRef = useRef<HTMLDivElement>(null)
  const includesRef = useRef<HTMLDivElement>(null)
  const rulesRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)

  // Get similar courts (same sport)
  const similarCourts = courts
    .filter((c) => c.id !== court.id && c.sport.toLowerCase() === court.sport.toLowerCase())
    .slice(0, 9)

  const visibleCourts = 3

  // Sample dates for the horizontal scroll
  const availableDates = [
    { day: "Thu", date: "20 Mar" },
    { day: "Fri", date: "21 Mar" },
    { day: "Sat", date: "22 Mar" },
    { day: "Mon", date: "24 Mar" },
    { day: "Tue", date: "25 Mar" },
    { day: "Wed", date: "26 Mar" },
    { day: "Thu", date: "27 Mar" },
    { day: "Fri", date: "28 Mar" },
    { day: "Sat", date: "29 Mar" },
    { day: "Sun", date: "30 Mar" },
  ]

  // Sample time slots with availability
  const timeSlots = {
    Morning: [
      { time: "7:00 AM - 8:00 AM", slots: 2 },
      { time: "8:00 AM - 9:00 AM", slots: 2 },
      { time: "9:00 AM - 10:00 AM", slots: 3 },
      { time: "10:00 AM - 11:00 AM", slots: 1 },
      { time: "11:00 AM - 12:00 PM", slots: 2 },
    ],
    Afternoon: [
      { time: "12:00 PM - 1:00 PM", slots: 0 },
      { time: "1:00 PM - 2:00 PM", slots: 3 },
      { time: "2:00 PM - 3:00 PM", slots: 1 },
      { time: "3:00 PM - 4:00 PM", slots: 2 },
      { time: "4:00 PM - 5:00 PM", slots: 0 },
    ],
    Evening: [
      { time: "5:00 PM - 6:00 PM", slots: 2 },
      { time: "6:00 PM - 7:00 PM", slots: 1 },
      { time: "7:00 PM - 8:00 PM", slots: 0 },
      { time: "8:00 PM - 9:00 PM", slots: 3 },
      { time: "9:00 PM - 10:00 PM", slots: 2 },
    ],
  }

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === court.images.length - 1 ? 0 : prev + 1))
    }, 4000)
    return () => clearInterval(interval)
  }, [court.images.length])

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
  }

  // Handle tab navigation
  const handleTabClick = (tab: string) => {
    setActiveTab(tab)

    let ref = null
    switch (tab) {
      case "overview":
        ref = overviewRef
        break
      case "includes":
        ref = includesRef
        break
      case "rules":
        ref = rulesRef
        break
      case "amenities":
        ref = amenitiesRef
        break
      case "gallery":
        ref = galleryRef
        break
      case "reviews":
        ref = reviewsRef
        break
      case "locations":
        ref = locationsRef
        break
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Handle slider navigation
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? court.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === court.images.length - 1 ? 0 : prev + 1))
  }

  // Handle similar courts navigation
  const handlePrevCourt = () => {
    setCurrentCourtIndex((prev) => (prev === 0 ? similarCourts.length - visibleCourts : prev - 1))
  }

  const handleNextCourt = () => {
    setCurrentCourtIndex((prev) => (prev >= similarCourts.length - visibleCourts ? 0 : prev + 1))
  }

  // Calendar functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() - 1)
      return newMonth
    })
  }

  const handleNextMonth = () => {
    setCurrentMonth((prev) => {
      const newMonth = new Date(prev)
      newMonth.setMonth(prev.getMonth() + 1)
      return newMonth
    })
  }

  // Generate calendar days
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const days = []
  // Empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  // Days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  // Get day status (for calendar)
  const getDayStatus = (day: number) => {
    // Simulate availability - in real app, this would come from API
    if (day % 7 === 3 || day % 5 === 0) return "available"
    if (day % 8 === 0) return "limited"
    if (day % 9 === 0) return "booked"
    return "available"
  }

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-emerald-500"
      case "limited":
        return "bg-yellow-500"
      case "booked":
        return "bg-red-500"
      default:
        return "bg-gray-300"
    }
  }

  // Get visible courts for the slider
  const getVisibleCourts = () => {
    const result = []
    for (let i = 0; i < visibleCourts; i++) {
      const index = (currentCourtIndex + i) % similarCourts.length
      result.push(similarCourts[index])
    }
    return result
  }

  // Add these functions to handle selections
  const handleTimeOfDaySelect = (timeOfDay: string) => {
    setSelectedTimeOfDay(timeOfDay)
    setSelectedTimeSlot(null) // Reset time slot when changing time of day
  }

  const handleDateSelect = (index: number) => {
    setSelectedDateIndex(index)
    setSelectedTimeSlot(null) // Reset time slot when changing date
  }

  const handleTimeSlotSelect = (timeSlot: { time: string; slots: number }) => {
    setSelectedTimeSlot(timeSlot)
  }

  const handleDurationSelect = (duration: string) => {
    setSelectedDuration(duration)
  }

  // Add a function to calculate total price
  const calculateTotal = () => {
    if (!selectedTimeSlot) return 0

    // Get price based on selected duration
    let pricePerHour = 0

    switch (selectedDuration) {
      case "FOR 1 HOUR":
        pricePerHour = 499
        break
      case "FOR 2 HOURS":
        pricePerHour = 450
        break
      case "FOR 3 HOURS":
        pricePerHour = 400
        break
      case "FOR FULL DAY":
        pricePerHour = 350
        break
    }

    // Calculate hours based on duration
    let totalHours = 1
    if (selectedDuration === "FOR 2 HOURS") totalHours = 2
    if (selectedDuration === "FOR 3 HOURS") totalHours = 3
    if (selectedDuration === "FOR FULL DAY") totalHours = 8

    const subtotal = pricePerHour * totalHours
    const taxes = Math.round(subtotal * 0.18) // 18% GST
    return subtotal + taxes
  }

  const toggleCalendarPopup = () => {
    setShowCalendarPopup(!showCalendarPopup)
  }

  const handleSelectDate = (date: Date) => {
    // Format the selected date
    const formattedDate = date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })

    // In a real app, you would update available dates based on the selected date
    // For now, we'll just close the popup
    setShowCalendarPopup(false)
  }

  return (
    <>
      <Header />

      <main className="bg-gray-50 w-full">
        {/* Hero Banner with Full-Width Image Slider */}
        <div className="relative h-[500px] w-full bg-gray-200">
          {court.images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${court.name} - Image ${index + 1}`}
                fill
                className="object-cover w-full"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          ))}

          {/* Slider navigation */}
          <button
            onClick={handlePrevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronLeft size={24} className="text-gray-800" />
          </button>

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Slider indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {court.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-emerald-500" : "bg-white/50 hover:bg-white/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-10">
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Share2 size={20} className="text-gray-600" />
            </button>
            <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
              <Heart size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Court info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{court.name}</h1>
                <div className="bg-emerald-500 p-1 rounded-full">
                  <Check size={16} className="text-white" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={16}
                        className={star <= court.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">{court.reviewCount} Reviews</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{court.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">
                    {typeof court.availability === "string"
                      ? court.availability
                      : court.availability?.status || "Check availability"}
                  </span>
                </div>
                <div className="px-2 py-1 bg-emerald-600 rounded-md text-sm">₹{court.price}/hr</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-8 sticky top-16 bg-white z-20 rounded-t-lg shadow-md px-2">
                <div className="flex overflow-x-auto py-1">
                  {["overview", "includes", "rules", "amenities", "gallery", "reviews", "locations"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-6 py-3 whitespace-nowrap font-medium text-sm transition-colors ${
                        activeTab === tab
                          ? "text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50"
                          : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <div
                ref={overviewRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Overview</h2>
                  <button
                    onClick={() => toggleSection("overview")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.overview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.overview && (
                  <div className="text-gray-600 leading-relaxed space-y-4">
                    <p>{court.description}</p>
                    <p>
                      Our facility features {court.facilities.join(", ")} and more. We pride ourselves on maintaining
                      professional standards and creating a welcoming environment for all sports enthusiasts.
                    </p>
                  </div>
                )}
              </div>

              {/* Includes Section */}
              <div
                ref={includesRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Check size={20} className="text-emerald-600" />
                    </span>
                    Includes
                  </h2>
                  <button
                    onClick={() => toggleSection("includes")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.includes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.includes && (
                  <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-lg">
                    {court.includes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            item.included ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        >
                          {item.included ? (
                            <Check size={18} className="text-white" />
                          ) : (
                            <X size={18} className="text-white" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium">{item.item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rules Section */}
              <div
                ref={rulesRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-red-100 p-2 rounded-full mr-3">
                      <X size={20} className="text-red-600" />
                    </span>
                    Rules
                  </h2>
                  <button
                    onClick={() => toggleSection("rules")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.rules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.rules && (
                  <div className="space-y-5 bg-gray-50 p-6 rounded-lg">
                    {court.rules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-start bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                      >
                        <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 pt-1">{rule.rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities Section */}
              <div
                ref={amenitiesRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-emerald-100 p-2 rounded-full mr-3">
                      <Check size={20} className="text-emerald-600" />
                    </span>
                    Amenities
                  </h2>
                  <button
                    onClick={() => toggleSection("amenities")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.amenities ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.amenities && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5 bg-gray-50 p-6 rounded-lg">
                    {court.facilities.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                      >
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center mr-4">
                          <Check size={18} className="text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{facility}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Section */}
              <div
                ref={galleryRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Gallery</h2>
                  <button
                    onClick={() => toggleSection("gallery")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.gallery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.gallery && (
                  <div className="grid grid-cols-3 gap-4">
                    {court.images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden group border border-gray-200"
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white rounded-full p-2 transform scale-0 group-hover:scale-100 transition-transform">
                            <Share2 size={16} className="text-gray-800" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviews Section */}
              <div
                ref={reviewsRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
                  <button
                    onClick={() => toggleSection("reviews")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.reviews ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.reviews && (
                  <div>
                    <div className="flex items-center justify-between mb-8 bg-gray-50 p-6 rounded-lg">
                      <div className="flex items-center">
                        <div className="text-4xl font-bold mr-4 text-emerald-600">{court.rating}</div>
                        <div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={18}
                                className={star <= court.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">out of 5.0</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Recommended by 97% of Players</div>
                        <div className="flex gap-4 mt-2">
                          <div className="text-xs">
                            <div className="font-medium">Service</div>
                            <div className="flex items-center">
                              <div className="w-16 h-1 bg-yellow-400 rounded-full mr-1"></div>
                              <span>5.0</span>
                            </div>
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">Value</div>
                            <div className="flex items-center">
                              <div className="w-16 h-1 bg-yellow-400 rounded-full mr-1"></div>
                              <span>5.0</span>
                            </div>
                          </div>
                          <div className="text-xs">
                            <div className="font-medium">Location</div>
                            <div className="flex items-center">
                              <div className="w-16 h-1 bg-yellow-400 rounded-full mr-1"></div>
                              <span>5.0</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <button className="bg-emerald-600 text-white px-5 py-2.5 rounded-md text-sm hover:bg-emerald-700 transition-colors shadow-sm">
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-8">
                      {court.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-8">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                              <Image
                                src={review.avatar || "/placeholder.svg?height=48&width=48"}
                                alt={review.user}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-lg">{review.user}</h3>
                                <span className="text-sm text-gray-500">Posted on {review.date}</span>
                              </div>
                              <div className="flex mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={
                                      star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <div className="text-xs text-emerald-600 mb-2 flex items-center">
                                  <Check size={12} className="mr-1" /> Verified Purchase
                                </div>
                              )}
                              <p className="text-gray-600 mb-4 leading-relaxed">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-6">
                      <button className="text-emerald-600 text-sm font-medium flex items-center justify-center mx-auto hover:underline">
                        Load More <ChevronDown size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Section */}
              <div
                ref={locationsRef}
                className="mb-10 scroll-mt-24 bg-white rounded-lg shadow-md p-8 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                  <button
                    onClick={() => toggleSection("locations")}
                    className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full transition-colors"
                  >
                    {expandedSections.locations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.locations && (
                  <div>
                    <div className="rounded-lg h-72 mb-6 overflow-hidden border border-gray-200">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036935!2d-73.98784492426385!3d40.75798597138789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710766987019!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-lg">
                      <MapPin size={22} className="text-emerald-600" />
                      <div>
                        <h3 className="font-medium text-lg">Our Venue Location</h3>
                        <p className="text-gray-600">{court.address}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <h3 className="font-medium text-lg mb-3">Directions</h3>
                      <p className="text-gray-600">
                        Located in the heart of the city, our court is easily accessible by public transportation. The
                        nearest subway station is just a 5-minute walk away. Parking is available on-site for those
                        driving.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Booking Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 sticky top-24">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Book This Court</h3>
                  <p className="text-sm text-gray-500">Select date, time and duration</p>
                </div>

                {/* Select a slot section */}
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-medium text-lg text-emerald-800 mb-4">Select a slot</h3>

                  {/* Time of day filter */}
                  <div className="flex mb-4">
                    {["Morning", "Afternoon", "Evening"].map((time) => (
                      <button
                        key={time}
                        onClick={() => handleTimeOfDaySelect(time)}
                        className={`flex-1 py-2 text-center ${
                          selectedTimeOfDay === time
                            ? "bg-emerald-50 text-emerald-700 font-medium border-b-2 border-emerald-500"
                            : "text-gray-500 hover:bg-gray-50"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                    <button
                      onClick={toggleCalendarPopup}
                      className="ml-2 p-2 bg-gray-100 rounded hover:bg-gray-200 relative"
                    >
                      <Calendar size={18} className="text-gray-600" />
                    </button>
                    {showCalendarPopup && (
                      <div className="absolute right-0 mt-2 bg-white rounded-lg shadow-lg z-20 p-4 border border-gray-200 w-72">
                        <div className="flex justify-between items-center mb-4">
                          <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
                            <ChevronLeft size={16} />
                          </button>
                          <h3 className="font-medium">
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </h3>
                          <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
                            <ChevronRight size={16} />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                            <div key={day} className="text-xs font-medium text-gray-500">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {days.map((day, i) => (
                            <div key={i} className="aspect-square">
                              {day !== null && (
                                <button
                                  onClick={() => handleSelectDate(new Date(year, month, day))}
                                  className={`w-full h-full flex items-center justify-center text-sm rounded-full hover:bg-emerald-50 ${
                                    getDayStatus(day) === "available"
                                      ? "hover:text-emerald-600"
                                      : getDayStatus(day) === "limited"
                                        ? "text-yellow-600"
                                        : getDayStatus(day) === "booked"
                                          ? "text-red-500 line-through"
                                          : ""
                                  }`}
                                >
                                  {day}
                                  <span
                                    className={`absolute bottom-1 w-1 h-1 rounded-full ${getStatusColor(getDayStatus(day))}`}
                                  ></span>
                                </button>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between text-xs">
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 mr-1"></span>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 mr-1"></span>
                            <span>Limited</span>
                          </div>
                          <div className="flex items-center">
                            <span className="w-2 h-2 rounded-full bg-red-500 mr-1"></span>
                            <span>Booked</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Date selection with horizontal scroll */}
                  <div className="overflow-x-auto pb-2 mb-4">
                    <div className="flex space-x-2 min-w-max">
                      {availableDates.map((item, index) => (
                        <div
                          key={index}
                          onClick={() => handleDateSelect(index)}
                          className={`w-20 p-2 text-center rounded-md cursor-pointer ${
                            selectedDateIndex === index
                              ? "bg-gray-700 text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          <div className="text-xs">{item.day}</div>
                          <div className="text-xs">{item.date}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Time slots grid */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {timeSlots[selectedTimeOfDay].map((slot, index) => (
                      <div
                        key={index}
                        onClick={() => (slot.slots > 0 ? handleTimeSlotSelect(slot) : null)}
                        className={`text-center p-2 rounded cursor-pointer ${
                          selectedTimeSlot?.time === slot.time && slot.slots > 0
                            ? "bg-emerald-500 text-white"
                            : slot.slots > 0
                              ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                              : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <div className="text-xs mb-1">{slot.time.split(" - ")[0]}</div>
                        <div className="text-xs">
                          {slot.slots} {slot.slots === 1 ? "Slot" : "Slots"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Select duration section */}
                  <div className="mb-6">
                    <h3 className="font-medium text-lg text-emerald-800 mb-4">Select duration</h3>

                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { period: "FOR 1 HOUR", price: 499, originalPrice: 699, discount: 29 },
                        { period: "FOR 2 HOURS", price: 450, originalPrice: 650, discount: 31 },
                        { period: "FOR 3 HOURS", price: 400, originalPrice: 600, discount: 33 },
                        { period: "FOR FULL DAY", price: 350, originalPrice: 550, discount: 36 },
                      ].map((option) => (
                        <div
                          key={option.period}
                          onClick={() => handleDurationSelect(option.period)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedDuration === option.period
                              ? "border-emerald-500 bg-emerald-50 shadow-md transform scale-[1.02]"
                              : "border-gray-200 hover:border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          <div className="flex flex-col h-full">
                            <div className="text-xs font-medium mb-1 text-gray-600">{option.period}</div>
                            <div className="font-bold text-emerald-700 text-lg">₹{option.price}/hr</div>
                            <div className="mt-auto flex items-center justify-between">
                              <div className="text-xs text-gray-500 line-through">₹{option.originalPrice}/hr</div>
                              <div className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2 py-1 rounded-full">
                                {option.discount}% off
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Checkout section */}
                  <div className="mb-6">
                    <h3 className="font-medium text-lg text-emerald-800 mb-4">Booking Summary</h3>

                    {selectedTimeSlot ? (
                      <>
                        <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                          <div className="space-y-3 text-sm">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Time Slot</span>
                              </div>
                              <span className="text-gray-900">{selectedTimeSlot.time}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Calendar size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Duration</span>
                              </div>
                              <span className="text-gray-900">{selectedDuration.toLowerCase()}</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Calendar size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Date</span>
                              </div>
                              <span className="text-gray-900">
                                {availableDates[selectedDateIndex].day} {availableDates[selectedDateIndex].date}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Users size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Available Slots</span>
                              </div>
                              <span className="text-gray-900">{selectedTimeSlot.slots} slots</span>
                            </div>
                          </div>
                        </div>

                        {/* Order summary */}
                        <div className="bg-emerald-50 rounded-lg p-4 mb-4 border border-emerald-100">
                          <div className="flex justify-between font-medium text-gray-800 mb-2">
                            <span className="text-emerald-800">Total Amount</span>
                            <span className="text-emerald-800 text-lg">₹ {calculateTotal().toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-gray-600 bg-white p-2 rounded">
                            <div className="flex justify-between mb-1">
                              <span>Court Fee</span>
                              <span>
                                ₹{" "}
                                {(selectedDuration === "FOR 1 HOUR"
                                  ? 499
                                  : selectedDuration === "FOR 2 HOURS"
                                    ? 900
                                    : selectedDuration === "FOR 3 HOURS"
                                      ? 1200
                                      : 2800
                                ).toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxes & Platform Fee</span>
                              <span>
                                ₹{" "}
                                {Math.round(
                                  (selectedDuration === "FOR 1 HOUR"
                                    ? 499
                                    : selectedDuration === "FOR 2 HOURS"
                                      ? 900
                                      : selectedDuration === "FOR 3 HOURS"
                                        ? 1200
                                        : 2800) * 0.18,
                                ).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md">
                          <span>Pay Now ₹ {calculateTotal().toLocaleString()}</span>
                        </button>
                      </>
                    ) : (
                      <div className="text-center py-8 bg-gray-50 rounded-lg border border-gray-200">
                        <Calendar size={24} className="text-gray-400 mx-auto mb-2" />
                        <p className="text-gray-500">Please select a time slot to continue</p>
                      </div>
                    )}
                  </div>

                  {/* Request different time */}
                  <div className="mt-6">
                    <h3 className="text-center text-emerald-700 font-medium mb-3">Request a different time slot?</h3>

                    <div className="flex items-center gap-3 border border-gray-200 rounded-full p-2 pl-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src="/placeholder.svg?height=32&width=32"
                          alt="Support"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Message Support</div>
                        <div className="text-xs text-gray-500">Avg. response time: 1 hour</div>
                      </div>
                      <button className="bg-emerald-50 text-emerald-700 p-2 rounded-full">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="p-4 bg-emerald-50 rounded-b-lg border-t border-emerald-100 flex items-start">
                  <Info size={18} className="text-emerald-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-emerald-800">
                    Free cancellation up to 24 hours before your booking. Please arrive 15 minutes before your scheduled
                    time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Courts Section - Full Width */}
        <div className="w-full bg-gradient-to-b from-emerald-50 to-white py-12 mt-8">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 flex items-center">
              <span className="bg-emerald-100 p-2 rounded-full mr-3">
                <MapPin size={20} className="text-emerald-600" />
              </span>
              Similar Courts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCourts.map((similarCourt) => (
                <Link href={`/courts/${similarCourt.id}`} key={similarCourt.id}>
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full relative group transform hover:-translate-y-1">
                    <div className="relative">
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-md z-10">
                        {similarCourt.sport}
                      </div>
                      <div className="absolute top-2 right-2 z-10">
                        <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110">
                          <Heart size={16} className="text-gray-400" />
                        </button>
                      </div>
                      <Image
                        src={similarCourt.image || "/placeholder.svg"}
                        alt={similarCourt.name}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-center mb-2">
                        <h3 className="font-bold text-lg">{similarCourt.name}</h3>
                        <div className="ml-auto flex items-center bg-yellow-400 text-white rounded-full px-2 py-0.5">
                          <Star size={14} className="mr-1 fill-white" />
                          <span className="text-sm">{similarCourt.rating}</span>
                        </div>
                      </div>

                      <div className="flex items-center text-gray-600 mb-2 text-sm">
                        <MapPin size={14} className="mr-1 text-emerald-600 flex-shrink-0" />
                        <span className="truncate">{similarCourt.location}</span>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{similarCourt.description}</p>

                      <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                        <div className="flex items-center text-sm">
                          <Users size={14} className="mr-1 text-emerald-600" />
                          <span className="text-emerald-600 font-medium">{similarCourt.availability}</span>
                        </div>

                        <div className="text-sm font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                          ₹{similarCourt.price}/hr
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Link href={`/courts/${similarCourt.id}`} className="flex-1">
                          <button className="w-full bg-white border border-emerald-600 text-emerald-600 py-2 rounded-md text-sm hover:bg-emerald-50 transition-colors">
                            View Details
                          </button>
                        </Link>
                        <button className="flex-1 bg-emerald-600 text-white py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

