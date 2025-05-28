"use client"

import type React from "react"

import type { Court } from "@/types/court"
import { generateSlug } from "@/utils/slug"
import { Clock, Heart, MapPin, Star, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface CourtsListProps {
  courts: Court[]
  currentPage?: number
  city: string
}

export function CourtsList({ courts, currentPage = 1, city }: CourtsListProps) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [animateIn, setAnimateIn] = useState(false)
  const [recentlyFavorited, setRecentlyFavorited] = useState<string | null>(null)

  // Page transition animation
  useEffect(() => {
    setAnimateIn(false)
    const timer = setTimeout(() => {
      setAnimateIn(true)
    }, 50)
    return () => clearTimeout(timer)
  }, [currentPage])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
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
      className={`space-y-6 relative transition-all duration-500 w-full ${animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
    >
      {courts.map((court) => {
        const slug = generateSlug(court.name, court.sport)
        const courtUrl = `/${city}/turfs/${slug}`

        return (
          <Link href={courtUrl} key={court.id} className="block w-full">
            <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row relative z-10 transform hover:-translate-y-1 w-full">
              <div className="relative md:w-1/3 overflow-hidden group">
                <Image
                  src={court.image || "/placeholder.svg"}
                  alt={court.name}
                  width={400}
                  height={300}
                  className="w-full h-64 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => toggleFavorite(court.id, e)}
                    className={`p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110 ${recentlyFavorited === court.id ? "animate-heartbeat" : ""
                      }`}
                  >
                    <Heart
                      size={20}
                      className={favorites.includes(court.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                    />
                    {recentlyFavorited === court.id && favorites.includes(court.id) && (
                      <div className="absolute -top-1 -right-1 -left-1 -bottom-1 rounded-full border-2 border-red-400 animate-ping-once"></div>
                    )}
                  </button>
                </div>
                <div className="absolute top-3 left-3 bg-emerald-500 text-white px-3 py-1 rounded-md text-sm font-medium">
                  {court.sport}
                </div>
                <div className="absolute bottom-3 left-3 bg-emerald-800 text-white px-3 py-1 rounded-md text-sm font-medium">
                  ₹{court.price}/hr
                </div>
              </div>

              <div className="p-5 md:w-2/3 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-bold truncate">{court.name}</h3>
                  <div className="flex items-center bg-yellow-400 text-white rounded-full px-2 py-0.5">
                    <Star size={14} className="mr-1 fill-white" />
                    <span className="text-sm">{court.rating}</span>
                    <span className="text-xs ml-1 text-white/80">{court.reviewCount} Reviews</span>
                  </div>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1 text-emerald-600 flex-shrink-0" />
                  <span className="text-sm">{court.location}</span>
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">{court.description}</p>

                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm">
                    <Users size={16} className="mr-1 text-emerald-600" />
                    <span className="text-emerald-600 font-medium">{court.availability}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock size={16} className="mr-1 text-gray-500" />
                    <span className="text-gray-600">{court.isIndoor ? "Indoor" : "Outdoor"}</span>
                  </div>
                </div>

                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex gap-4">
                    <Link href={courtUrl} className="flex-1">
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
            </div>
          </Link>
        )
      })}
    </div>
  )
}
