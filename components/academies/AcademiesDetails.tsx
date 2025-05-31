"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import emailjs from '@emailjs/browser'
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
  Award,
  Phone,
  Mail,
  Globe,
  DollarSign,
} from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Academy } from "@/types/academy"
import { newAcademies } from "@/data/new-academies-data"

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
  //LEAD FORM 
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    try {
      // Send email notification using EmailJS
      await emailjs.send(
        'service_0alofeq', // Get from EmailJS dashboard
        'template_ddjex0y', // Get from EmailJS dashboard
        {
          to_name: 'Academy Team',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
          academy_name: academy.title,
          reply_to: formData.email,
        },
        'GyFNEhp7IkObr3jKC' // Get from EmailJS dashboard
      );

      alert('Thank you for your interest! We will contact you soon.');

    } catch (error) {
      console.error('Error sending email:', error);
      alert('error');
    }

    // Reset form
    setFormData({ name: '', email: '', phone: '', message: '' })
    setShowContactForm(false)
  }



  // UI state
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentCoachIndex, setCurrentCoachIndex] = useState(0)
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  // Refs for scroll navigation
  const overviewRef = useRef<HTMLDivElement>(null)
  const includesRef = useRef<HTMLDivElement>(null)
  const rulesRef = useRef<HTMLDivElement>(null)
  const amenitiesRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const reviewsRef = useRef<HTMLDivElement>(null)
  const locationsRef = useRef<HTMLDivElement>(null)

  // Get similar academies (same category) with null checks
  const similarAcademies = newAcademies
    ? newAcademies
      .filter((a) => a.id !== academy.id && a.category.toLowerCase() === academy.category.toLowerCase())
      .slice(0, 9)
    : []

  const visibleAcademies = 3

  // Get gallery images or use placeholder
  const galleryImages = academy.detailData.gallery || [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ]

  // Auto-rotate gallery images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [galleryImages.length])

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
    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1))
  }

  // Handle similar academies navigation
  const handlePrevAcademy = () => {
    setCurrentCoachIndex((prev) => (prev === 0 ? similarAcademies.length - visibleAcademies : prev - 1))
  }

  const handleNextAcademy = () => {
    setCurrentCoachIndex((prev) => (prev >= similarAcademies.length - visibleAcademies ? 0 : prev + 1))
    console.log(similarAcademies);
  }

  return (
    <>
      <Header />

      <main className="bg-white pt-16 w-full">
        {/* Hero Banner with Image Slider */}
        <div className="relative h-[400px] bg-gray-200">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 flex justify-center items-center bg-black ${currentImageIndex === index ? "opacity-100" : "opacity-0"
                }`}
            >
              {/* Container to maintain aspect ratio and prevent stretching */}
              <div className="relative w-full h-full flex justify-center items-center">
                <div className="relative h-full w-full" style={{ maxWidth: '80%' }}>
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${academy.title} - Image ${index + 1}`}
                    fill
                    className="object-contain"
                    style={{
                      objectPosition: 'center',
                    }}
                    priority={index === 0}
                  />
                </div>
              </div>
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

          <button
            onClick={handleNextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-colors z-10"
          >
            <ChevronRight size={24} className="text-gray-800" />
          </button>

          {/* Slider indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${currentImageIndex === index ? "bg-white" : "bg-white/50 hover:bg-white/80"
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
                {academy.rating && (
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= (academy.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm">{academy.reviewCount} Reviews</span>
                  </div>
                )}
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span className="text-sm">{academy.location}</span>
                </div>
                {academy.time && (
                  <div className="flex items-center">
                    <Clock size={16} className="mr-1" />
                    <span className="text-sm">{academy.time}</span>
                  </div>
                )}
                {academy.hourlyRate && (
                  <div className="px-2 py-1 bg-emerald-600 rounded-md text-sm">${academy.hourlyRate}/hr</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[2000px] mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4 w-full">
              {/* Tabs Navigation */}
              <div className="border-b border-gray-200 mb-8 sticky top-16 bg-white z-20 rounded-t-lg shadow-md px-2">
                <div className="flex overflow-x-auto py-1">
                  {["overview", "includes", "rules", "amenities", "gallery", "reviews", "locations"].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => handleTabClick(tab)}
                      className={`px-6 py-3 whitespace-nowrap font-medium text-sm transition-colors ${activeTab === tab
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
                    <p>{academy.detailData.overview.description}</p>
                    <p>
                      Our facility features{" "}
                      {academy.amenities && academy.amenities.length > 0
                        ? academy.amenities.join(", ")
                        : "premium amenities"}{" "}
                      and more. We pride ourselves on maintaining professional standards and creating a welcoming
                      environment for all sports enthusiasts.
                    </p>

                    {academy.sports && academy.sports.length > 0 && (
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-2">Sports Offered</h3>
                        <div className="flex flex-wrap gap-2">
                          {academy.sports.map((sport, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                              {sport}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Includes Section */}
              <div
                ref={includesRef}
                className="mb-10 scroll-mt-24 bg-gradient-to-r from-emerald-50 to-white rounded-lg shadow-md p-6 border border-gray-100"
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
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {(academy.detailData.includes || []).map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${item.checked ? "bg-emerald-500" : "bg-red-500"
                            }`}
                        >
                          {item.checked ? (
                            <Check size={14} className="text-white" />
                          ) : (
                            <X size={14} className="text-white" />
                          )}
                        </div>
                        <span className="text-gray-700 text-sm">{item.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Rules Section */}
              <div
                ref={rulesRef}
                className="mb-10 scroll-mt-24 bg-gradient-to-r from-red-50 to-white rounded-lg shadow-md p-6 border border-gray-100"
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
                  <div className="space-y-3">
                    {(academy.detailData.rules || []).map((rule, index) => (
                      <div
                        key={index}
                        className="flex items-start bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100"
                      >
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="text-gray-700 text-sm pt-1">{rule}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Amenities Section */}
              <div
                ref={amenitiesRef}
                className="mb-10 scroll-mt-24 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md p-6 border border-gray-100"
              >
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                    <span className="bg-blue-100 p-2 rounded-full mr-3">
                      <Award size={20} className="text-blue-600" />
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
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {(academy.detailData.amenities || []).map((amenity, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all border border-gray-100 text-center"
                      >
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mb-2">
                          <Check size={18} className="text-white" />
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{amenity.name}</span>
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
                    {galleryImages.map((image, index) => (
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
                        <div className="text-4xl font-bold mr-4 text-emerald-600">{academy.rating || "N/A"}</div>
                        <div>
                          <div className="flex mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                size={18}
                                className={
                                  star <= (academy.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">out of 5.0</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium">Recommended by {academy.reviewCount || 0} Players</div>
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
                      {(academy.detailData.reviews || []).map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-8">
                          <div className="flex items-start gap-4 mb-3">
                            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-gray-100">
                              <Image
                                src="/placeholder.svg?height=48&width=48"
                                alt={review.name}
                                width={48}
                                height={48}
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium text-lg">{review.name}</h3>
                                <span className="text-sm text-gray-500">Posted on {review.date}</span>
                              </div>
                              <div className="flex mb-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    size={16}
                                    className={
                                      star <= (review.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
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
                              {review.images && (
                                <div className="flex gap-3 mt-3">
                                  {review.images.map((img, idx) => (
                                    <div
                                      key={idx}
                                      className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200"
                                    >
                                      <Image
                                        src={img || "/placeholder.svg"}
                                        alt="Review image"
                                        width={64}
                                        height={64}
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
                        <p className="text-gray-600">{academy.detailData.location.address}</p>
                      </div>
                    </div>

                    <div className="mt-6 p-5 bg-gray-50 rounded-lg border border-gray-100">
                      <h3 className="font-medium text-lg mb-3">Directions</h3>
                      <p className="text-gray-600">
                        Located in {academy.location}, our academy is easily accessible by public transportation. Please
                        contact us for detailed directions from your location.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar - Academy Info */}
            <div className="lg:w-1/4 w-full">
              <div className="bg-white rounded-lg shadow-md border border-gray-100 sticky top-24">
                <div className="p-5">
                  {!showContactForm ? (
                    <>
                      <h3 className="text-lg font-bold text-gray-800 mb-4">Contact Academy</h3>

                      <div className="space-y-4">
                        {/* Contact Info */}
                        <div className="flex items-center gap-2 text-gray-700">
                          <MapPin size={18} className="text-emerald-600 flex-shrink-0" />
                          <span className="text-sm">{academy.location}</span>
                        </div>

                        {academy.phone && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Phone size={18} className="text-emerald-600 flex-shrink-0" />
                            <span className="text-sm">{academy.phone}</span>
                          </div>
                        )}

                        {academy.email && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail size={18} className="text-emerald-600 flex-shrink-0" />
                            <span className="text-sm">{academy.email}</span>
                          </div>
                        )}

                        {academy.website && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <Globe size={18} className="text-emerald-600 flex-shrink-0" />
                            <a
                              href={academy.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-emerald-600 hover:underline"
                            >
                              Visit Website
                            </a>
                          </div>
                        )}

                        {academy.hourlyRate && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign size={18} className="text-emerald-600 flex-shrink-0" />
                            <span className="text-sm font-medium">${academy.hourlyRate}/hr</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <button
                          onClick={() => setShowContactForm(true)}
                          className="w-full py-2.5 rounded-md font-medium text-white text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors"
                        >
                          Contact Academy
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Contact Form</h3>
                        <button
                          onClick={() => setShowContactForm(false)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X size={20} />
                        </button>
                      </div>

                      <form onSubmit={handleFormSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                            Message
                          </label>
                          <textarea
                            id="message"
                            name="message"
                            rows={3}
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm resize-none"
                            placeholder="Tell us about your requirements..."
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full py-2.5 rounded-md font-medium text-white text-sm bg-emerald-600 hover:bg-emerald-700 transition-colors"
                          >
                            Submit Inquiry
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>

              {/* Share Academy */}
              <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
                <h3 className="font-medium text-sm mb-3">Share Academy</h3>
                <div className="flex gap-2">
                  {[Facebook, Twitter, Instagram, Linkedin, Youtube, MessageCircle].map((Icon, index) => (
                    <a
                      key={index}
                      href="#"
                      className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-emerald-100 hover:text-emerald-600 transition-colors"
                    >
                      <Icon size={14} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Academies Section - Full Width */}
        {similarAcademies.length > 0 && (
          <div className="mt-12 py-8 w-full bg-white">
            <div className="w-full max-w-[1200px] mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Similar Academies
                </h2>
                <p className="text-gray-600 text-sm">
                  Discover other academies that match your interests
                </p>
              </div>

              <div className="relative">
                {/* Navigation buttons */}
                <button
                  onClick={handlePrevAcademy}
                  className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2.5 z-10 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <ChevronLeft size={18} className="text-gray-700" />
                </button>

                <button
                  onClick={handleNextAcademy}
                  className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2.5 z-10 hover:shadow-lg transition-all duration-200 border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300"
                >
                  <ChevronRight size={18} className="text-gray-700" />
                </button>

                {/* Academy cards slider */}
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-out gap-4"
                    style={{ transform: `translateX(-${currentCoachIndex * (100 / visibleAcademies)}%)` }}
                  >
                    {similarAcademies.map((similarAcademy) => (
                      <div key={similarAcademy.id} className="w-full md:w-1/3 flex-shrink-0">
                        <Link href={`/academies/${similarAcademy.id}`}>
                          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-300 h-full group hover:border-emerald-300">
                            <div className="relative">
                              {similarAcademy?.category && (
                                <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                                  {similarAcademy.category}
                                </div>
                              )}
                              <div className="absolute top-3 right-3 z-10">
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    // Toggle heart functionality here
                                    const heartBtn = e.currentTarget;
                                    const heartIcon = heartBtn.querySelector('svg');
                                    const isLiked = heartBtn.classList.contains('liked');

                                    if (isLiked) {
                                      heartBtn.classList.remove('liked');
                                      heartIcon.classList.remove('text-red-500', 'fill-red-500');
                                      heartIcon.classList.add('text-gray-400');
                                      heartBtn.classList.remove('bg-red-50', 'border-red-200');
                                      heartBtn.classList.add('bg-white/90', 'border-gray-200');
                                    } else {
                                      heartBtn.classList.add('liked');
                                      heartIcon.classList.remove('text-gray-400');
                                      heartIcon.classList.add('text-red-500', 'fill-red-500');
                                      heartBtn.classList.remove('bg-white/90', 'border-gray-200');
                                      heartBtn.classList.add('bg-red-50', 'border-red-200');

                                      // Add bounce animation
                                      heartBtn.classList.add('animate-pulse');
                                      setTimeout(() => heartBtn.classList.remove('animate-pulse'), 300);
                                    }
                                  }}
                                  className="p-1.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md transition-all border border-gray-200 hover:scale-110"
                                >
                                  <Heart size={14} className="text-gray-400 transition-all duration-200" />
                                </button>
                              </div>
                              <Image
                                src={similarAcademy.image || "/placeholder.svg"}
                                alt={similarAcademy.title}
                                width={350}
                                height={200}
                                className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>

                            <div className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                                  {similarAcademy.title}
                                </h3>
                                {similarAcademy.rating && (
                                  <div className="flex items-center bg-amber-400 text-white rounded-md px-2 py-0.5 ml-2 flex-shrink-0">
                                    <Star size={12} className="mr-1 fill-white" />
                                    <span className="text-xs font-medium">{similarAcademy.rating}</span>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center text-gray-600 mb-2">
                                <MapPin size={14} className="mr-1.5 text-emerald-600 flex-shrink-0" />
                                <span className="text-xs truncate">{similarAcademy.location}</span>
                              </div>

                              <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
                                {similarAcademy.description}
                              </p>

                              <div className="flex justify-between items-center py-2 border-t border-gray-100 mb-3">
                                <div className="flex items-center text-xs">
                                  <Calendar size={14} className="mr-1.5 text-emerald-600" />
                                  <span className="text-emerald-600 font-medium">
                                    {similarAcademy.nextAvailability}
                                  </span>
                                </div>

                                {similarAcademy.hourlyRate && (
                                  <div className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md">
                                    ${similarAcademy.hourlyRate}/hr
                                  </div>
                                )}
                              </div>

                              <div className="flex gap-2">
                                <Link href={`/academies/${similarAcademy.id}`} className="flex-1">
                                  <button className="w-full bg-white border border-emerald-600 text-emerald-600 py-2 rounded-md text-xs font-medium hover:bg-emerald-50 transition-all duration-200">
                                    View Details
                                  </button>
                                </Link>
                                <button className="flex-1 bg-emerald-600 text-white py-2 rounded-md text-xs font-medium hover:bg-emerald-700 transition-all duration-200 shadow-sm">
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

                {/* Pagination dots */}
                <div className="flex justify-center mt-8 space-x-2">
                  {Array.from({ length: Math.ceil(similarAcademies.length / visibleAcademies) }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCoachIndex(index * visibleAcademies)}
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${currentCoachIndex === index * visibleAcademies
                        ? "bg-blue-600 w-8"
                        : "bg-gray-300 hover:bg-gray-400"
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
