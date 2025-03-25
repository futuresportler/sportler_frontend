"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Calendar, Heart } from "lucide-react"
import { dummyCoaches } from "@/data/coaches-data"

interface SimilarCoachesProps {
  currentCoachId: number
}

export default function SimilarCoaches({ currentCoachId }: SimilarCoachesProps) {
  const [favorites, setFavorites] = useState<number[]>([])

  // Get 3 similar coaches (excluding current coach)
  const similarCoaches = dummyCoaches.filter((coach) => coach.id !== currentCoachId).slice(0, 3)

  const toggleFavorite = (id: number, e: React.MouseEvent) => {
    e.preventDefault()
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {similarCoaches.map((coach) => (
        <Link href={`/coaches/${coach.id}`} key={coach.id}>
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full relative group">
            <div className="relative">
              <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-md z-10">
                Featured
              </div>
              <div className="absolute top-2 right-2 z-10">
                <button
                  onClick={(e) => toggleFavorite(coach.id, e)}
                  className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all transform hover:scale-110"
                >
                  <Heart
                    size={16}
                    className={favorites.includes(coach.id) ? "text-red-500 fill-red-500" : "text-gray-400"}
                  />
                </button>
              </div>
              <Image
                src={coach.image || "/placeholder.svg"}
                alt={coach.name}
                width={400}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="p-4">
              <div className="flex items-center mb-2">
                <h3 className="font-bold text-lg">{coach.name}</h3>
                <div className="ml-auto flex items-center bg-yellow-400 text-white rounded px-2 py-0.5">
                  <Star size={14} className="mr-1 fill-white" />
                  <span className="text-sm">{coach.rating}</span>
                </div>
              </div>

              <div className="flex items-center text-gray-600 mb-2 text-sm">
                <MapPin size={14} className="mr-1 text-emerald-600" />
                <span>{coach.location}</span>
              </div>

              <p className="text-gray-600 text-sm mb-3">
                {coach.description.length > 80 ? coach.description.substring(0, 80) + "..." : coach.description}
              </p>

              <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                <div className="flex items-center text-sm">
                  <Calendar size={14} className="mr-1 text-emerald-600" />
                  <span className="text-gray-600">Next Available:</span>
                  <span className="text-emerald-600 ml-1 font-medium">{coach.nextAvailability}</span>
                </div>

                <div className="text-sm text-yellow-600 font-medium">${coach.hourlyRate}/hr</div>
              </div>

              <div className="flex gap-2 mt-3">
                <button className="flex-1 bg-white border border-emerald-600 text-emerald-600 py-1.5 rounded text-sm hover:bg-emerald-50 transition-colors">
                  View Profile
                </button>
                <button className="flex-1 bg-emerald-600 text-white py-1.5 rounded text-sm hover:bg-emerald-700 transition-colors">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

