import type { Court } from "@/types/court"
import { Star, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface SimilarCourtsProps {
  courts: Court[]
}

export function SimilarCourts({ courts }: SimilarCourtsProps) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Similar Courts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courts.map((court) => (
          <Link
            href={`/courts/${court.id}`}
            key={court.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="h-40 overflow-hidden relative">
              <Image
                src={court.image || "/placeholder.svg?height=300&width=400"}
                alt={court.name}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
              {court.isPromoted && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{court.name}</h3>
              <div className="flex items-start mb-2">
                <MapPin size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-500">{court.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center bg-yellow-400 text-white rounded px-2 py-1 shadow-sm">
                    <Star size={14} className="mr-1" />
                    <span className="text-sm">{court.rating}</span>
                  </div>
                </div>
                <div className="text-emerald-600 font-semibold">${court.pricePerHour}/hr</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

