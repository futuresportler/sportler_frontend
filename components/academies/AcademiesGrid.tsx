"use client"

import type React from "react"

import type { Academy } from "@/types/academy"
import { generateSlug } from "@/utils/slug"
import { Calendar, Clock, Eye, Heart, MapPin, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface AcademiesGridProps {
  academies: Academy[]
  currentPage: number
  city: string
}

export default function AcademiesGrid({ academies, currentPage, city }: AcademiesGridProps) {
  const [favorites, setFavorites] = useState<number[]>([])
  const [animateIn, setAnimateIn] = useState(false)
  const [recentlyFavorited, setRecentlyFavorited] = useState<number | null>(null)

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

  return (
    <div
      className={`grid md:grid-cols-2 lg:grid-cols-2 gap-6 relative transition-all duration-500 ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
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
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 flex flex-col h-full relative z-10 transform hover:-translate-y-1 hover:scale-[1.01]">
              <div className="relative overflow-hidden group">
                <Image
                  src={academy.detailData.gallery?.[0] || "/placeholder.svg?height=200&width=400"}
                  alt={academy.title}
                  width={600}
                  height={400}
                  className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-110"
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
                <div className="absolute bottom-3 left-3 bg-emerald-800 text-white px-3 py-1 rounded-md text-sm font-medium transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  {academy.hourlyRate ? `$${academy.hourlyRate}/hr` : "Contact for pricing"}
                </div>
                <div className="absolute top-3 left-3 bg-blue-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                  {academy.category}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col relative">
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

                <h3 className="text-xl font-bold mb-2 relative">{academy.title}</h3>

                <div className="flex items-center text-gray-600 mb-3">
                  <MapPin size={16} className="mr-1 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm">{academy.location}</span>
                </div>

                <p className="text-gray-600 mb-4 text-sm flex-grow">{academy.description}</p>

                <div className="flex justify-between mb-4 space-x-2">
                  <button className="flex items-center justify-center px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm transform hover:scale-105">
                    <Eye size={16} className="mr-2" />
                    View Academy
                  </button>
                  <button className="flex items-center justify-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors text-sm transform hover:scale-105">
                    <Calendar size={16} className="mr-2" />
                    Book Now
                  </button>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-emerald-600" />
                    <div className="text-sm">
                      <span className="text-gray-500">Hours: </span>
                      <span className="text-emerald-600 font-medium">{academy.time}</span>
                    </div>
                  </div>

                  <div className="group relative">
                    <div className="flex items-center bg-yellow-400 text-white rounded px-2 py-1 transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                      <Star size={14} className="mr-1 fill-white group-hover:animate-pulse" />
                      <span className="text-sm font-medium">{academy.rating}</span>
                      <span className="text-xs ml-1 text-white/80">{academy.reviewCount}</span>
                    </div>
                    {/* Rating background effect */}
                    <div className="absolute inset-0 bg-yellow-300 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 blur-md"></div>
                    <div className="absolute inset-0 bg-yellow-200 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 blur-lg opacity-60"></div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
