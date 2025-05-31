"use client"

import type React from "react"

import type { Academy } from "@/types/academy"
import { generateSlug } from "@/utils/slug"
import { Calendar, Clock, Eye, Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AcademiesListProps {
  academies: Academy[]
  currentPage: number
  city: string
}

export default function AcademiesList({ academies, currentPage, city }: AcademiesListProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [animateIn, setAnimateIn] = useState(false)
  const [recentlyFavorited, setRecentlyFavorited] = useState<number | null>(null)

  console.log(
    "AcademiesList rendering with",
    academies?.length,
    "academies",
    academies?.map((a) => a.id).slice(0, 3),
    "...",
  )

  console.log("AcademiesList received:", academies?.length, "academies")

  // Page transition animation
  useEffect(() => {
    setAnimateIn(false)
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [currentPage])

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()

    // Set recently favorited for animation
    setRecentlyFavorited(id)
    setTimeout(() => setRecentlyFavorited(null), 1000)

    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  if (!academies || academies.length === 0) {
    console.warn("AcademiesList: No academies data received")
    return (
      <div className="bg-white rounded-lg p-8 text-center">
        <h3 className="text-xl font-semibold mb-2">No academies found</h3>
        <p className="text-gray-600">Try adjusting your filters or search criteria</p>
        <p className="text-gray-500 mt-4">Debug info: Received {academies ? academies.length : "null"} academies</p>
      </div>
    )
  }

  return (
    <div
      className={`space-y-6 relative transition-all duration-500 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Background decorative elements */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full opacity-50 blur-xl z-0"></div>
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full opacity-50 blur-xl z-0"></div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-yellow-50 rounded-full opacity-30 blur-lg z-0"></div>
      <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-blue-50 rounded-full opacity-30 blur-lg z-0"></div>

      {academies.map((academy) => {
        const slug = generateSlug(academy.title, academy.sports?.[0])
        const academyUrl = `/${city}/academies/${slug}`

        return (
          <Link href={academyUrl} key={academy.id} className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row relative z-10 transform hover:-translate-y-1">
              <div className="relative md:w-1/3 overflow-hidden group">
                <Image
                  src={academy.detailData.gallery?.[0] || "/placeholder.svg?height=400&width=600&text=No+Image"}
                  alt={academy.title}
                  width={400}
                  height={300}
                  className="h-64 w-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => toggleFavorite(academy.id, e)}
                    className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110 ${recentlyFavorited === academy.id ? "animate-heartbeat" : ""}`}
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(academy.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                    {recentlyFavorited === academy.id && favorites.includes(academy.id) && (
                      <div className="absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full border-2 border-red-400 animate-ping-once"></div>
                    )}
                  </button>
                </div>
                {academy.hourlyRate && (
                  <div className="absolute bottom-3 left-3 bg-emerald-800 text-white px-3 py-1 rounded-md text-sm font-medium">
                    From ${academy.hourlyRate}/hr
                  </div>
                )}
                {academy?.category && (
                  <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                    {academy.category}
                  </div>
                )}
              </div>

              <div className="p-5 md:w-2/3 relative">
                {/* Subtle background pattern */}
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5">
                  <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="currentColor" strokeWidth="1" />
                    <path
                      d="M0,20 L100,20 M0,40 L100,40 M0,60 L100,60 M0,80 L100,80 M20,0 L20,100 M40,0 L40,100 M60,0 L60,100 M80,0 L80,100"
                      stroke="currentColor"
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{academy.title}</h3>
                  {academy.rating && (
                    <div className="group relative">
                      <div className="flex items-center bg-yellow-400 text-white rounded px-2 py-1 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Star size={14} className="mr-1 fill-white group-hover:animate-pulse" />
                        <span className="text-sm font-medium">{academy.rating}</span>
                        <span className="text-xs ml-1 text-white/80">{academy.reviewCount} Reviews</span>
                      </div>
                      {/* Rating background effect */}
                      <div className="absolute inset-0 bg-yellow-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 blur-md"></div>
                      <div className="absolute inset-0 bg-yellow-200 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-lg opacity-60"></div>
                    </div>
                  )}
                </div>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 text-emerald-600" />
                  <span className="text-sm">{academy.location}</span>
                  {academy.state && <span className="text-sm ml-1 text-gray-400">({academy.state})</span>}
                </div>

                <p className="text-gray-600 mb-4 text-sm">{academy.description}</p>

                <div className="flex items-center mb-4">
                  <Clock size={16} className="mr-2 text-emerald-600" />
                  <div className="text-sm">
                    <span className="text-gray-500">Available: </span>
                    <span className="text-emerald-600 font-medium">{academy.nextAvailability}</span>
                  </div>
                </div>

                {academy.sports && academy.sports.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {academy.sports.map((sport, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {sport}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-4">
                  <button className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors transform hover:scale-105">
                    <Eye size={16} className="mr-2" />
                    View Academy
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors transform hover:scale-105">
                    <Calendar size={16} className="mr-2" />
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
