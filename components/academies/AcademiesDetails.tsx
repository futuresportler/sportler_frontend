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
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Academy } from "@/types/academy"
import { dummyAcademies } from "@/data/academies-data"
import { academyDetailData } from "@/data/academy-detail-data"

interface AcademyDetailProps {
  academy: Academy
}

export default function AcademyDetail({ academy }: AcademyDetailProps) {
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
  const [selectedCourt, setSelectedCourt] = useState<string | null>("court1")
  const [selectedDate, setSelectedDate] = useState<string>("Today")
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0)

  // Refs for scroll navigation
  const overviewRef = useRef<HTMLDivElement>(null)
  const includesRef = useRef<HTMLDivElement>(null)
  const rulesRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)

  // Get similar academies (same category)
  const similarAcademies = dummyAcademies
    .filter((a) => a.id !== academy.id && a.category.toLowerCase() === academy.category.toLowerCase())
    .slice(0, 6)

  const visibleAcademies = 3

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === academyDetailData.gallery.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
    setCurrentImageIndex((prev) => (prev === 0 ? academyDetailData.gallery.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === academyDetailData.gallery.length - 1 ? 0 : prev + 1))
  }

  // Handle similar academies navigation
  const handlePrevAcademy = () => {
    setCurrentCoachIndex((prev) => (prev === 0 ? similarAcademies.length - visibleAcademies : prev - 1))
  }

  const handleNextAcademy = () => {
    setCurrentCoachIndex((prev) => (prev >= similarAcademies.length - visibleAcademies ? 0 : prev + 1))
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

  // Get visible academies for the slider
  const getVisibleAcademies = () => {
    const result = []
    for (let i = 0; i < visibleAcademies; i++) {
      const index = (currentCoachIndex + i) % similarAcademies.length
      result.push(similarAcademies[index])
    }
    return result
  }

  return (
    <>
      <Header />

      <main className="bg-white pt-16">
        {/* Hero Banner with Image Slider */}
        <div className="relative h-[400px] bg-gray-200">
          {academyDetailData.gallery.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                currentImageIndex === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${academy.title} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
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
            {academyDetailData.gallery.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentImageIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
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

          {/* Academy info overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white z-10">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{academy.title}</h1>
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
                        className={star <= academy.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm">{academy.reviewCount} Reviews</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{academy.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="text-sm">{academy.time}</span>
                </div>
                <div className="px-2 py-1 bg-emerald-600 rounded-md text-sm">${academy.hourlyRate}/hr</div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-6 sticky top-16 bg-white z-20 rounded-t-lg shadow-sm">
                <div className="flex overflow-x-auto">
                  {["overview", "includes", "rules", "amenities", "gallery", "reviews", "locations"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-4 py-3 whitespace-nowrap font-medium text-sm ${
                        activeTab === tab
                          ? "text-emerald-600 border-b-2 border-emerald-600"
                          : "text-gray-600 hover:text-emerald-600"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overview Section */}
              <div ref={overviewRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Overview</h2>
                  <button onClick={() => toggleSection("overview")}>
                    {expandedSections.overview ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.overview && (
                  <div className="text-gray-600">
                    <p className="mb-4">{academyDetailData.overview.description}</p>
                    <p>
                      Our facility features {academy.amenities.join(", ")} and more. We pride ourselves on maintaining
                      professional standards and creating a welcoming environment for all sports enthusiasts.
                    </p>
                  </div>
                )}
              </div>

              {/* Includes Section */}
              <div ref={includesRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <span className="bg-emerald-100 p-2 rounded-full mr-2">
                      <Check size={18} className="text-emerald-600" />
                    </span>
                    Includes
                  </h2>
                  <button onClick={() => toggleSection("includes")}>
                    {expandedSections.includes ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.includes && (
                  <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    {academyDetailData.includes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                            item.checked ? "bg-emerald-500" : "bg-red-500"
                          }`}
                        >
                          {item.checked ? (
                            <Check size={16} className="text-white" />
                          ) : (
                            <X size={16} className="text-white" />
                          )}
                        </div>
                        <span className="text-gray-700 font-medium">{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rules Section */}
              <div ref={rulesRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <span className="bg-red-100 p-2 rounded-full mr-2">
                      <X size={18} className="text-red-600" />
                    </span>
                    Rules
                  </h2>
                  <button onClick={() => toggleSection("rules")}>
                    {expandedSections.rules ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.rules && (
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    {academyDetailData.rules.map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-start bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 pt-1">{rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities Section */}
              <div ref={amenitiesRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold flex items-center">
                    <span className="bg-emerald-100 p-2 rounded-full mr-2">
                      <Check size={18} className="text-emerald-600" />
                    </span>
                    Amenities
                  </h2>
                  <button onClick={() => toggleSection("amenities")}>
                    {expandedSections.amenities ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.amenities && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                    {academyDetailData.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white p-3 rounded-md shadow-sm hover:shadow-md transition-all"
                      >
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center mr-3">
                          <Check size={16} className="text-white" />
                        </div>
                        <span className="text-gray-700 font-medium">{amenity.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Gallery Section */}
              <div ref={galleryRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Gallery</h2>
                  <button onClick={() => toggleSection("gallery")}>
                    {expandedSections.gallery ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.gallery && (
                  <div className="grid grid-cols-3 gap-2">
                    {academyDetailData.gallery.map((image, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
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
              <div ref={reviewsRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Reviews</h2>
                  <button onClick={() => toggleSection("reviews")}>
                    {expandedSections.reviews ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.reviews && (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center">
                        <div className="text-3xl font-bold mr-2">{academy.rating}</div>
                        <div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={16}
                                className={star <= academy.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
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

                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-md text-sm hover:bg-emerald-700 transition-colors">
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-6">
                      {academyDetailData.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6">
                          <div className="flex items-start gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                              <Image
                                src="/placeholder.svg?height=40&width=40"
                                alt={review.name}
                                width={40}
                                height={40}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{review.name}</h3>
                                <span className="text-sm text-gray-500">Posted on {review.date}</span>
                              </div>
                              <div className="flex mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={14}
                                    className={
                                      star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                    }
                                  />
                                ))}
                              </div>
                              {review.verified && (
                                <div className="text-xs text-emerald-600 mb-2">✓ Verified Purchase</div>
                              )}
                              <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
                              {review.images && (
                                <div className="flex gap-2 mt-2">
                                  {review.images.map((img, idx) => (
                                    <div key={idx} className="w-12 h-12 rounded-md overflow-hidden">
                                      <Image
                                        src={img || "/placeholder.svg"}
                                        alt="Review image"
                                        width={48}
                                        height={48}
                                        className="object-cover"
                                      />
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="text-center mt-4">
                      <button className="text-emerald-600 text-sm font-medium flex items-center justify-center mx-auto hover:underline">
                        Load More <ChevronDown size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Location Section */}
              <div ref={locationsRef} className="mb-8 scroll-mt-24 bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Location</h2>
                  <button onClick={() => toggleSection("locations")}>
                    {expandedSections.locations ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>

                {expandedSections.locations && (
                  <div>
                    <div className="rounded-lg h-64 mb-4 overflow-hidden">
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

                    <div className="flex items-center gap-2 text-gray-700">
                      <MapPin size={18} className="text-emerald-600" />
                      <div>
                        <h3 className="font-medium">Our Venue Location</h3>
                        <p className="text-sm">{academyDetailData.location.address}</p>
                      </div>
                    </div>

                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-medium text-sm mb-2">Directions</h3>
                      <p className="text-xs text-gray-600">
                        Located in the heart of the city, our academy is easily accessible by public transportation. The
                        nearest subway station is just a 5-minute walk away. Parking is available on-site for those
                        driving.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Similar Academies Section */}
              <div className="mt-12 bg-gradient-to-br from-emerald-50 to-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center">
                  <span className="bg-emerald-100 p-2 rounded-full mr-2">
                    <MapPin size={18} className="text-emerald-600" />
                  </span>
                  Similar Academies
                </h2>

                <div className="relative">
                  {/* Slider navigation buttons */}
                  <button
                    onClick={handlePrevAcademy}
                    className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50 border border-gray-100"
                  >
                    <ChevronLeft size={24} className="text-gray-600" />
                  </button>

                  <button
                    onClick={handleNextAcademy}
                    className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 z-10 hover:bg-emerald-50 border border-gray-100"
                  >
                    <ChevronRight size={24} className="text-gray-600" />
                  </button>

                  {/* Academies slider */}
                  <div className="overflow-hidden py-4">
                    <div
                      className="flex transition-transform duration-500 ease-in-out gap-6"
                      style={{ transform: `translateX(-${currentCoachIndex * (100 / visibleAcademies)}%)` }}
                    >
                      {similarAcademies.map((similarAcademy) => (
                        <div key={similarAcademy.id} className="w-full md:w-1/3 flex-shrink-0">
                          <Link href={`/academies/${similarAcademy.id}`}>
                            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full relative group transform hover:-translate-y-1">
                              <div className="relative">
                                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md z-10">
                                  {similarAcademy.category}
                                </div>
                                <div className="absolute top-2 right-2 z-10">
                                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110">
                                    <Heart size={16} className="text-gray-400" />
                                  </button>
                                </div>
                                <Image
                                  src={similarAcademy.image || "/placeholder.svg"}
                                  alt={similarAcademy.title}
                                  width={400}
                                  height={300}
                                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-20"></div>
                              </div>

                              <div className="p-5">
                                <div className="flex items-center mb-2">
                                  <h3 className="font-bold text-lg">{similarAcademy.title}</h3>
                                  <div className="ml-auto flex items-center bg-yellow-400 text-white rounded-full px-2 py-0.5">
                                    <Star size={14} className="mr-1 fill-white" />
                                    <span className="text-sm">{similarAcademy.rating}</span>
                                  </div>
                                </div>

                                <div className="flex items-center text-gray-600 mb-2 text-sm">
                                  <MapPin size={14} className="mr-1 text-emerald-600 flex-shrink-0" />
                                  <span className="truncate">{similarAcademy.location}</span>
                                </div>

                                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{similarAcademy.description}</p>

                                <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                                  <div className="flex items-center text-sm">
                                    <Calendar size={14} className="mr-1 text-emerald-600" />
                                    <span className="text-emerald-600 font-medium">
                                      {similarAcademy.nextAvailability}
                                    </span>
                                  </div>

                                  <div className="text-sm font-medium px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                                    ${similarAcademy.hourlyRate}/hr
                                  </div>
                                </div>

                                <div className="flex gap-2 mt-4">
                                  <Link href={`/academies/${similarAcademy.id}`} className="flex-1">
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
                    {Array.from({ length: Math.ceil(similarAcademies.length / visibleAcademies) }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentCoachIndex(index * visibleAcademies)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentCoachIndex === index * visibleAcademies
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
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6 sticky top-24">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Book A Court</h3>
                    <p className="text-sm text-gray-500">Check availability and book your court</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500">Starts From:</div>
                    <div className="text-xl font-bold text-emerald-600">${academy.hourlyRate}/hr</div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mb-4">
                  {/* Court selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Court</label>
                    <div className="space-y-2">
                      {academyDetailData.availability.courts.map((court) => (
                        <div
                          key={court.id}
                          className={`p-3 rounded-md cursor-pointer transition-colors border ${
                            selectedCourt === court.id
                              ? "bg-emerald-50 border-emerald-200"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedCourt(court.id)}
                        >
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{court.name}</span>
                            <div
                              className={`px-2 py-0.5 rounded-full text-xs text-white ${getStatusColor(court.status)}`}
                            >
                              {getStatusText(court.status)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Date selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <div className="grid grid-cols-3 gap-2">
                      {academyDetailData.availability.dates.map((date) => (
                        <button
                          key={date.date}
                          className={`py-2 px-3 rounded text-sm border ${
                            selectedDate === date.date
                              ? "bg-emerald-600 text-white border-emerald-600"
                              : "bg-white text-gray-700 border-gray-200 hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedDate(date.date)}
                        >
                          {date.date}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slot selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-3 gap-2">
                      {academyDetailData.availability.dates
                        .find((date) => date.date === selectedDate)
                        ?.slots.map((slot) => (
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

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors font-medium">
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

              {/* Request For Availability */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="font-bold mb-4">Request For Availability</h3>

                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-600 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter Name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-600 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter Email Address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-600 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter Phone Number"
                    />
                  </div>

                  <div>
                    <label htmlFor="purpose" className="block text-sm text-gray-600 mb-1">
                      Purpose
                    </label>
                    <input
                      type="text"
                      id="purpose"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter Purpose"
                    />
                  </div>

                  <div>
                    <label htmlFor="court" className="block text-sm text-gray-600 mb-1">
                      Court
                    </label>
                    <select
                      id="court"
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-white"
                    >
                      <option value="">Select Court</option>
                      {academyDetailData.availability.courts.map((court) => (
                        <option key={court.id} value={court.id}>
                          {court.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="details" className="block text-sm text-gray-600 mb-1">
                      Details
                    </label>
                    <textarea
                      id="details"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      placeholder="Enter Details"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input type="checkbox" id="terms" className="mt-1 mr-2" />
                    <label htmlFor="terms" className="text-xs text-gray-600">
                      By clicking "Send Request", I agree to DreamSports' Terms of Service and acknowledge that I have
                      read the Privacy Policy.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-md transition-colors font-medium"
                  >
                    Send Request
                  </button>
                </form>
              </div>

              {/* Share Venue */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-bold mb-4">Share Venue</h3>

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

