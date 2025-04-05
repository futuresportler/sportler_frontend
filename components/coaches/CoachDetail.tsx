"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  MapPin,
  Star,
  Calendar,
  Clock,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Share2,
  Heart,
  Award,
  Users,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Globe,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Coach } from "@/types/coach"
import { dummyCoaches } from "@/data/coaches-data"

interface CoachDetailProps {
  coach: Coach
}

export default function CoachDetail({ coach }: CoachDetailProps) {
  // Refs for scroll navigation
  const bioRef = useRef<HTMLDivElement>(null)
  const lessonRef = useRef<HTMLDivElement>(null)
  const coachingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const locationRef = useRef<HTMLDivElement>(null)

  const [activeTab, setActiveTab] = useState("lesson")
  const [expandedSections, setExpandedSections] = useState({
    bio: true,
    lesson: true,
    coaching: true,
    gallery: true,
    reviews: true,
    location: true,
  })
  const [selectedDate, setSelectedDate] = useState<string | null>(coach.availabilityCalendar?.[0]?.date || null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [expandedDate, setExpandedDate] = useState<string | null>(null)
  const [showOtherAvailability, setShowOtherAvailability] = useState(false)
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showCalendarPopup, setShowCalendarPopup] = useState(false)

  // Update the state variables to track selections
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState("Morning")
  const [selectedDateIndex, setSelectedDateIndex] = useState(0)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ time: string; slots: number } | null>(null)
  const [selectedDuration, setSelectedDuration] = useState("FOR 1 DAY")

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

  // Get similar coaches (same sport)
  const similarCoaches = dummyCoaches
    .filter((c) => c.id !== coach.id && c.sport.toLowerCase() === coach.sport.toLowerCase())
    .slice(0, 6)

  const visibleCoaches = 3

  // Handle tab navigation
  const scrollToSection = (section: string) => {
    setActiveTab(section)

    let ref = null
    switch (section) {
      case "bio":
        ref = bioRef
        break
      case "lesson":
        ref = lessonRef
        break
      case "coaching":
        ref = coachingRef
        break
      case "gallery":
        ref = galleryRef
        break
      case "reviews":
        ref = reviewsRef
        break
      case "locations":
        ref = locationRef
        break
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }))
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
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

  // Get day status (for calendar)
  const getDayStatus = (day: number) => {
    // Simulate availability - in real app, this would come from API
    if (day % 7 === 3 || day % 5 === 0) return "available"
    if (day % 8 === 0) return "limited"
    if (day % 9 === 0) return "booked"
    return "available"
  }

  // Handle slider navigation
  const handlePrevCoach = () => {
    setCurrentCoachIndex((prev) => (prev === 0 ? similarCoaches.length - visibleCoaches : prev - 1))
  }

  const handleNextCoach = () => {
    setCurrentCoachIndex((prev) => (prev >= similarCoaches.length - visibleCoaches ? 0 : prev + 1))
  }

  // Get visible coaches for the slider
  const getVisibleCoaches = () => {
    const result = []
    for (let i = 0; i < visibleCoaches; i++) {
      const index = (currentCoachIndex + i) % similarCoaches.length
      result.push(similarCoaches[index])
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
    const totalHours = 60 // Default to 60 hours

    switch (selectedDuration) {
      case "FOR 1 DAY":
        pricePerHour = 322
        break
      case "FOR 1 WEEK":
        pricePerHour = 300
        break
      case "FOR 1 MONTH":
        pricePerHour = 276
        break
      case "FOR 3 MONTHS":
        pricePerHour = 249
        break
    }

    const subtotal = pricePerHour * totalHours
    const taxes = 1245 // Example tax amount
    return subtotal + taxes
  }

  // Toggle review modal
  const toggleReviewModal = () => {
    setShowReviewModal(!showReviewModal)
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

      <main className="bg-gray-50 pt-16">
        {/* Coach Profile Header */}
        <div className="bg-gray-900 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-start gap-6">
            <div className="flex-shrink-0">
              <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-emerald-500">
                <Image src={coach.image || "/placeholder.svg"} alt={coach.name} fill className="object-cover" />
                <div className="absolute bottom-0 right-0 bg-emerald-500 rounded-full p-1">
                  <CheckCircle size={16} className="text-white" />
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-2">
                    {coach.name}
                    <CheckCircle size={20} className="text-emerald-500" />
                  </h1>
                  <p className="text-gray-300">
                    {coach.sport} Coach • {coach.certificationLevel} • {coach.location}
                  </p>
                </div>

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors w-full md:w-auto">
                  Follow Coach
                </button>
              </div>

              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                  <Star size={16} className="text-yellow-400 fill-yellow-400" />
                  <span>{coach.rating}</span>
                  <span className="text-gray-400">({coach.reviewCount})</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                  <Calendar size={16} />
                  <span>{coach.sessionTypes.join(", ")}</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                  <Clock size={16} />
                  <span>Experience: {coach.experience || "5+ Years"}</span>
                </div>

                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full">
                  <Globe size={16} />
                  <span>{coach.languages.join(", ")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto mb-6 bg-white rounded-lg shadow-sm sticky top-16 z-10">
              <button
                onClick={() => scrollToSection("bio")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "bio" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Bio
              </button>
              <button
                onClick={() => scrollToSection("lesson")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "lesson" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Lesson With Me
              </button>
              <button
                onClick={() => scrollToSection("coaching")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "coaching" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Coaching
              </button>
              <button
                onClick={() => scrollToSection("gallery")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "gallery" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Gallery
              </button>
              <button
                onClick={() => scrollToSection("reviews")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "reviews" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Reviews
              </button>
              <button
                onClick={() => scrollToSection("locations")}
                className={`px-4 py-3 whitespace-nowrap font-medium ${activeTab === "locations" ? "text-emerald-600 border-b-2 border-emerald-600" : "text-gray-600 hover:text-emerald-600"}`}
              >
                Locations
              </button>
            </div>

            {/* Short Bio Section */}
            <div ref={bioRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("bio")}
              >
                <h2 className="text-lg font-bold">Short Bio</h2>
                {expandedSections.bio ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.bio && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <p className="text-gray-600 mb-4">
                    {coach.shortBio ||
                      `${coach.name} is a ${coach.certificationLevel.toLowerCase()} ${coach.sport.toLowerCase()} coach with years of experience coaching beginners and advanced skill levels.`}
                  </p>

                  <button className="text-emerald-600 text-sm font-medium flex items-center">Read More</button>
                </div>
              )}
            </div>

            {/* Lesson With Me Section */}
            <div ref={lessonRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("lesson")}
              >
                <h2 className="text-lg font-bold">Lesson With Me</h2>
                {expandedSections.lesson ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.lesson && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row gap-6 mb-6">
                    <div className="md:w-1/2">
                      <p className="text-gray-600 mb-4">
                        I offer personalized lessons tailored to your needs. Choose from individual, 2 player, or small
                        group sessions for a customized experience anywhere. Together we'll take the process of
                        improvement step by step.
                      </p>

                      <ul className="space-y-2 text-gray-600">
                        <li className="flex items-start">
                          <div className="bg-emerald-100 p-1 rounded-full mr-2 mt-1">
                            <CheckCircle size={14} className="text-emerald-600" />
                          </div>
                          <span>Personalized training plans</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-emerald-100 p-1 rounded-full mr-2 mt-1">
                            <CheckCircle size={14} className="text-emerald-600" />
                          </div>
                          <span>Technique refinement and skill development</span>
                        </li>
                        <li className="flex items-start">
                          <div className="bg-emerald-100 p-1 rounded-full mr-2 mt-1">
                            <CheckCircle size={14} className="text-emerald-600" />
                          </div>
                          <span>Strategy and match preparation</span>
                        </li>
                      </ul>
                    </div>

                    <div className="md:w-1/2 relative h-48 md:h-auto rounded-lg overflow-hidden">
                      <Image
                        src="/placeholder.svg?height=300&width=400"
                        alt="Coaching session"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  <h3 className="font-medium mb-3">Lesson Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    {coach.lessonTypes?.map((lesson, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:border-emerald-200 hover:bg-emerald-50 transition-colors"
                      >
                        <h3 className="font-medium mb-2">{lesson.title}</h3>
                        <p className="text-sm text-gray-500">{lesson.description}</p>
                      </div>
                    )) || (
                      <>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-medium mb-2">Single Lesson</h3>
                          <p className="text-sm text-gray-500">One-on-one personalized coaching</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-medium mb-2">2 Player Lesson</h3>
                          <p className="text-sm text-gray-500">Training with a partner</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-medium mb-2">Small Group Session</h3>
                          <p className="text-sm text-gray-500">3-6 players per session</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Coaching Section */}
            <div ref={coachingRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("coaching")}
              >
                <h2 className="text-lg font-bold">Coaching</h2>
                {expandedSections.coaching ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.coaching && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-1/2">
                      <p className="text-gray-600 mb-4">
                        Experience transformative coaching tailored to your needs. Whether individual, partner, or small
                        group sessions, unlock your potential with personalized instruction for success.
                      </p>

                      <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-4">
                        <h3 className="font-medium mb-2 text-emerald-800">Coaching Philosophy</h3>
                        <p className="text-sm text-gray-600">
                          My coaching approach focuses on developing both technical skills and mental strength. I
                          believe in creating a positive learning environment where players can grow at their own pace
                          while being challenged to reach their full potential.
                        </p>
                      </div>
                    </div>

                    <div className="md:w-1/2">
                      <h3 className="font-medium mb-3">Coaching Specialties</h3>
                      <div className="space-y-3">
                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="bg-emerald-100 p-2 rounded-full mr-3">
                            <Award size={18} className="text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Technical Development</h4>
                            <p className="text-sm text-gray-500">Refining strokes and movement patterns</p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="bg-emerald-100 p-2 rounded-full mr-3">
                            <Users size={18} className="text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Match Strategy</h4>
                            <p className="text-sm text-gray-500">Tactical approaches for competitive play</p>
                          </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                          <div className="bg-emerald-100 p-2 rounded-full mr-3">
                            <Award size={18} className="text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-medium">Mental Conditioning</h4>
                            <p className="text-sm text-gray-500">Building focus, resilience and confidence</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Gallery Section */}
            <div ref={galleryRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("gallery")}
              >
                <h2 className="text-lg font-bold">Gallery</h2>
                {expandedSections.gallery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.gallery && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="relative aspect-square rounded-lg overflow-hidden group">
                        <Image
                          src={`/placeholder.svg?height=300&width=300`}
                          alt="Gallery image"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="bg-white rounded-full p-2">
                            <Share2 size={16} className="text-gray-800" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="text-center mt-4">
                    <button className="text-emerald-600 text-sm font-medium flex items-center justify-center mx-auto">
                      Load More <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div ref={reviewsRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("reviews")}
              >
                <h2 className="text-lg font-bold">Reviews</h2>
                {expandedSections.reviews ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.reviews && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-3xl font-bold mr-2">4.8</div>
                      <div>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              size={16}
                              className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-yellow-400"}
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500">Based on {coach.reviewCount} reviews</div>
                      </div>
                    </div>

                    <button
                      onClick={toggleReviewModal}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 rounded-md text-sm transition-colors"
                    >
                      Write a Review
                    </button>
                  </div>

                  <div className="space-y-4">
                    {/* Review Item */}
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Reviewer"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Amanda Perfect</h3>
                            <span className="text-sm text-gray-500">Posted on 05/04/2023</span>
                          </div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={14} className="text-yellow-400 fill-yellow-400" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            If you're looking for a coach that goes the friendly matches with open 3 technique in
                            competitive match, it's the best place.
                          </p>
                          <div className="flex gap-2 mt-2">
                            {[1, 2, 3, 4, 5].map((img) => (
                              <div key={img} className="w-12 h-12 rounded-md overflow-hidden">
                                <Image
                                  src="/placeholder.svg?height=48&width=48"
                                  alt="Review image"
                                  width={48}
                                  height={48}
                                  className="object-cover"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Review Item */}
                    <div className="border-b border-gray-100 pb-4">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Reviewer"
                            width={40}
                            height={40}
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-medium">Elena Rodriguez</h3>
                            <span className="text-sm text-gray-500">Posted on 03/04/2023</span>
                          </div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={14}
                                className={star <= 4 ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                              />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">
                            Awesome. My very committed to play. If you're looking for a coach that goes the friendly
                            matches with open 3 technique in competitive match, it's the best place.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <button className="text-emerald-600 text-sm font-medium flex items-center justify-center mx-auto">
                      Load More <ChevronDown size={16} className="ml-1" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Location Section */}
            <div ref={locationRef} className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden scroll-mt-24">
              <div
                className="flex justify-between items-center p-4 cursor-pointer"
                onClick={() => toggleSection("location")}
              >
                <h2 className="text-lg font-bold">Location</h2>
                {expandedSections.location ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections.location && (
                <div className="p-4 pt-0 border-t border-gray-100">
                  <div className="rounded-lg h-48 mb-4 overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036935!2d-73.98784492426385!3d40.7579859<merged_code>
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036935!2d-73.98784492426385!3d40.75798597138789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1710766987019!5m2!1sen!2sus"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={false}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-medium">Our Venue Location</h3>
                      <p className="text-gray-600 text-sm">123 Main Street, New York, USA</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden sticky top-24">
              <div className="p-4">
                {/* Select a slot section */}
                <div className="mb-6">
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
                        { period: "FOR 1 DAY", price: 322, originalPrice: 495, discount: 35 },
                        { period: "FOR 1 WEEK", price: 300, originalPrice: 460, discount: 35 },
                        { period: "FOR 1 MONTH", price: 276, originalPrice: 500, discount: 45 },
                        { period: "FOR 3 MONTHS", price: 249, originalPrice: 510, discount: 51 },
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
                                <span className="text-gray-700 font-medium">Starting Date</span>
                              </div>
                              <span className="text-gray-900">
                                {availableDates[selectedDateIndex].day} {availableDates[selectedDateIndex].date}
                              </span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Calendar size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Ending Date</span>
                              </div>
                              <span className="text-gray-900">Sun 22 June</span>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Clock size={16} className="text-emerald-600 mr-2" />
                                <span className="text-gray-700 font-medium">Total Hours</span>
                              </div>
                              <span className="text-gray-900">60 hours</span>
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
                              <span>Coaching Fee (60 hrs x ₹ 249/hr)</span>
                              <span>₹ {(249 * 60).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxes & Platform Fee</span>
                              <span>₹ 1,245</span>
                            </div>
                          </div>
                        </div>

                        <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors flex items-center justify-center gap-2 shadow-md">
                          <span>Proceed to pay ₹ {calculateTotal().toLocaleString()}</span>
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
                          src={coach.image || "/placeholder.svg?height=32&width=32"}
                          alt={coach.name}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">Message {coach.name}</div>
                        <div className="text-xs text-gray-500">Avg. response time: 1 hour</div>
                      </div>
                      <button className="bg-emerald-50 text-emerald-700 p-2 rounded-full">
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Keep the "Listing By Owner" section as is */}
              <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <h2 className="text-lg font-bold">Listing By Owner</h2>
                </div>

                <div className="p-4">
                  <div className="bg-gray-100 rounded-lg h-32 mb-4 relative overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=128&width=300"
                      alt="Manchester Academy"
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h3 className="font-medium">Sarah Sports Academy</h3>
                  <p className="text-sm text-gray-500 mb-2">@sarahsports</p>
                  <p className="text-sm text-gray-600 mb-4">Member since: 2020</p>

                  <h3 className="font-medium mb-2">Share Venue</h3>
                  <div className="flex gap-2">
                    {[Facebook, Twitter, Instagram, Linkedin, Youtube].map((Icon, index) => (
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
        </div>

        {/* Similar Coaches Section */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Similar {coach.sport} Coaches</h2>

          <div className="relative">
            {/* Slider navigation buttons */}
            <button
              onClick={handlePrevCoach}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50"
            >
              <ChevronLeft size={24} className="text-gray-600" />
            </button>

            <button
              onClick={handleNextCoach}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50"
            >
              <ChevronRight size={24} className="text-gray-600" />
            </button>

            {/* Coaches slider */}
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentCoachIndex * (100 / visibleCoaches)}%)` }}
              >
                {similarCoaches.map((similarCoach) => (
                  <div key={similarCoach.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                    <Link href={`/coaches/${similarCoach.id}`}>
                      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full relative group">
                        <div className="relative">
                          <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md z-10">
                            {similarCoach.certificationLevel}
                          </div>
                          <div className="absolute top-2 right-2 z-10">
                            <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110">
                              <Heart size={16} className="text-gray-400" />
                            </button>
                          </div>
                          <Image
                            src={similarCoach.image || "/placeholder.svg"}
                            alt={similarCoach.name}
                            width={400}
                            height={300}
                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>

                        <div className="p-4">
                          <div className="flex items-center mb-2">
                            <h3 className="font-bold text-lg">{similarCoach.name}</h3>
                            <div className="ml-auto flex items-center bg-yellow-400 text-white rounded px-2 py-0.5">
                              <Star size={14} className="mr-1 fill-white" />
                              <span className="text-sm">{similarCoach.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center text-gray-600 mb-2 text-sm">
                            <MapPin size={14} className="mr-1 text-emerald-600" />
                            <span>{similarCoach.location}</span>
                          </div>

                          <p className="text-gray-600 text-sm mb-3">
                            {similarCoach.description.length > 80
                              ? similarCoach.description.substring(0, 80) + "..."
                              : similarCoach.description}
                          </p>

                          <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                            <div className="flex items-center text-sm">
                              <Calendar size={14} className="mr-1 text-emerald-600" />
                              <span className="text-gray-600">Next Available:</span>
                              <span className="text-emerald-600 ml-1 font-medium">{similarCoach.nextAvailability}</span>
                            </div>

                            <div className="text-sm text-yellow-600 font-medium">${similarCoach.hourlyRate}/hr</div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <Link href={`/coaches/${similarCoach.id}`} className="flex-1">
                              <button className="w-full bg-white border border-emerald-600 text-emerald-600 py-1.5 rounded text-sm hover:bg-emerald-50 transition-colors">
                                View Profile
                              </button>
                            </Link>
                            <button className="flex-1 bg-emerald-600 text-white py-1.5 rounded text-sm hover:bg-emerald-700 transition-colors">
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
              {Array.from({ length: Math.ceil(similarCoaches.length / visibleCoaches) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentCoachIndex(index * visibleCoaches)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentCoachIndex === index * visibleCoaches ? "bg-emerald-600" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-bold">Write a Review</h2>
              <button onClick={toggleReviewModal} className="text-gray-500 hover:text-gray-700">
                <X size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="text-yellow-400 hover:scale-110 transition-transform">
                      <Star size={24} className="fill-yellow-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Review
                </label>
                <textarea
                  id="review"
                  rows={4}
                  className="w-full border border-gray-300 rounded-md p-2 text-sm"
                  placeholder="Share your experience with this coach..."
                ></textarea>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Add Photos (optional)</label>
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-md">
                  <div className="text-center">
                    <div className="mt-1 flex justify-center">
                      <button className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-md text-sm font-medium">
                        Upload Photos
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={toggleReviewModal}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700">
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}

