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
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  MessageCircle,
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Zap,
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
  const [selectedDate, setSelectedDate] = useState<string>("Today")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCourtIndex, setCurrentCourtIndex] = useState(0)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedCalendarDate, setSelectedCalendarDate] = useState<number | null>(null)

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

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "limited":
        return "Limited"
      case "booked":
        return "Booked"
      default:
        return "Unknown"
    }
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
    // Check if court.availability.calendar exists
    if (!court.availability || !court.availability.calendar) {
      return "unavailable"
    }

    const { availableDates, limitedDates, bookedDates } = court.availability.calendar

    if (bookedDates && bookedDates.includes(day)) return "booked"
    if (limitedDates && limitedDates.includes(day)) return "limited"
    if (availableDates && availableDates.includes(day)) return "available"

    return "unavailable"
  }

  // Get session type icon
  const getSessionTypeIcon = (type: string) => {
    switch (type) {
      case "one-hour":
        return <Clock size={20} className="text-emerald-600" />
      case "two-hours":
        return <Clock size={20} className="text-emerald-600" />
      case "half-day":
        return <Calendar size={20} className="text-emerald-600" />
      case "full-day":
        return <Calendar size={20} className="text-emerald-600" />
      default:
        return <Clock size={20} className="text-emerald-600" />
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

  // Get availability string
  const getAvailabilityString = () => {
    if (typeof court.availability === "string") {
      return court.availability
    }
    return court.availability?.status || "Check availability"
  }

  // Get time slots safely
  const getTimeSlots = () => {
    if (typeof court.availability === "object" && court.availability.timeSlots) {
      return court.availability.timeSlots
    }
    return []
  }

  return (
    <>
      <Header />

      <main className="bg-white pt-16 w-full">
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
                  <span className="text-sm">{getAvailabilityString()}</span>
                </div>
                <div className="px-2 py-1 bg-emerald-600 rounded-md text-sm">${court.price}/hr</div>
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

              {/* Similar Courts Section */}
              <div className="mt-16 bg-gradient-to-br from-emerald-50 to-white rounded-lg shadow-md p-8 w-full">
                <h2 className="text-2xl font-bold mb-8 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-full mr-3">
                    <MapPin size={20} className="text-emerald-600" />
                  </span>
                  Similar Courts
                </h2>

                <div className="relative">
                  {/* Slider navigation buttons */}
                  <button
                    onClick={handlePrevCourt}
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50 border border-gray-100"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>

                  <button
                    onClick={handleNextCourt}
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50 border border-gray-100"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>

                  {/* Courts slider */}
                  <div className="overflow-hidden py-4">
                    <div
                      className="flex transition-transform duration-500 ease-in-out gap-6"
                      style={{ transform: `translateX(-${currentCourtIndex * (100 / visibleCourts)}%)` }}
                    >
                      {similarCourts.map((similarCourt) => (
                        <div key={similarCourt.id} className="w-full md:w-1/3 flex-shrink-0">
                          <Link href={`/courts/${similarCourt.id}`}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full relative group transform hover:-translate-y-1">
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
                                    <Calendar size={14} className="mr-1 text-emerald-600" />
                                    <span className="text-emerald-600 font-medium">{similarCourt.availability}</span>
                                  </div>

                                  <div className="text-sm font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                                    ${similarCourt.price}/hr
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
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Slider dots */}
                  <div className="flex justify-center mt-6 space-x-2">
                    {Array.from({ length: Math.ceil(similarCourts.length / visibleCourts) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCourtIndex(index * visibleCourts)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentCourtIndex === index * visibleCourts
                            ? "bg-emerald-600"
                            : "bg-gray-300 hover:bg-gray-400"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3">
              {/* Booking Card */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-8 sticky top-24 border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Book This Court</h3>
                    <p className="text-sm text-gray-500">Check availability and book your session</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starts From:</div>
                    <div className="text-xl font-bold text-emerald-600">${court.price}/hr</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  {/* Session Type selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Session Type</label>
                    <div className="space-y-2">
                      {court.bookingOptions.map((session) => (
                        <div
                          key={session.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors border ${
                            selectedSessionType === session.id
                              ? "bg-emerald-50 border-emerald-200"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedSessionType(session.id)}
                        >
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <div className="mr-3 bg-emerald-100 p-2 rounded-full">
                                {getSessionTypeIcon(session.id)}
                              </div>
                              <div>
                                <span className="font-medium block">{session.name}</span>
                                <span className="text-xs text-gray-500">{session.duration}</span>
                              </div>
                            </div>
                            <div className="text-emerald-600 font-medium">${session.price}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Calendar toggle */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">Select Date</label>
                      <button
                        onClick={() => setShowCalendar(!showCalendar)}
                        className="text-emerald-600 text-sm font-medium flex items-center"
                      >
                        <Calendar size={16} className="mr-1" />
                        {showCalendar ? "Hide Calendar" : "Show Calendar"}
                      </button>
                    </div>

                    {showCalendar && (
                      <div className="mb-4 border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <button onClick={handlePrevMonth} className="p-1 rounded-full hover:bg-gray-100">
                            <ChevronLeft size={20} />
                          </button>
                          <h4 className="font-medium">
                            {currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                          </h4>
                          <button onClick={handleNextMonth} className="p-1 rounded-full hover:bg-gray-100">
                            <ChevronRight size={20} />
                          </button>
                        </div>

                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                            <div key={i} className="text-center text-xs font-medium text-gray-500">
                              {day}
                            </div>
                          ))}
                        </div>

                        <div className="grid grid-cols-7 gap-1">
                          {days.map((day, index) => (
                            <div key={index}>
                              {day !== null ? (
                                <button
                                  className={`h-8 w-full rounded-md text-sm ${
                                    selectedCalendarDate === day
                                      ? "bg-emerald-600 text-white"
                                      : day === new Date().getDate() &&
                                          month === new Date().getMonth() &&
                                          year === new Date().getFullYear()
                                        ? "bg-emerald-100 text-emerald-700 font-bold"
                                        : getDayStatus(day) === "available"
                                          ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                                          : getDayStatus(day) === "limited"
                                            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-100"
                                            : getDayStatus(day) === "booked"
                                              ? "bg-red-50 text-red-700 cursor-not-allowed opacity-50"
                                              : "bg-gray-50 text-gray-400 cursor-not-allowed"
                                  }`}
                                  disabled={getDayStatus(day) === "booked" || getDayStatus(day) === "unavailable"}
                                  onClick={() => setSelectedCalendarDate(day)}
                                >
                                  {day}
                                </button>
                              ) : (
                                <div className="h-8 w-full"></div>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between mt-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div>
                            <span>Available</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                            <span>Limited</span>
                          </div>
                          <div className="flex items-center">
                            <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                            <span>Booked</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Time slot selection */}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                      <div className="grid grid-cols-3 gap-2">
                        {getTimeSlots().map((slot) => (
                          <button
                            key={slot.time}
                            className={`py-2 px-3 rounded text-sm border ${
                              selectedTimeSlot === slot.time
                                ? "bg-emerald-600 text-white border-emerald-600"
                                : slot.status === "booked"
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : `bg-white text-gray-700 border-gray-200 hover:bg-gray-50`
                            }`}
                            disabled={slot.status === "booked"}
                            onClick={() => setSelectedTimeSlot(slot.time)}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors font-medium flex items-center justify-center">
                      <Zap size={18} className="mr-2" />
                      Book Now
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full mr-1"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></div>
                      <span>Limited</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-1"></div>
                      <span>Booked</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Share Venue */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold mb-4">Share Court</h3>

                <div className="flex gap-2">
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}

