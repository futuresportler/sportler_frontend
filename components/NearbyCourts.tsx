import Image from "next/image"
import Link from "next/link"
import { Star, MapPin, Heart } from "lucide-react"
import { nearbyCourts } from "@/data/dummy-data"

export default function NearbyCourts() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-5 opacity-40 rotate-180">
        <Image src="/football.png?height=120&width=120" alt="Decoration" width={120} height={120} />
      </div>
     

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Find Courts{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Near You
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12">
        Discover the Best Sports Courts Near You
Step into Excellence – Join a Winning Academy Today

        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {nearbyCourts.map((court) => (
            <div
              key={court.id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px]"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={court.image || "/placeholder.svg"}
                  alt={court.title}
                  width={400}
                  height={200}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md hover:shadow-lg transition-shadow transform hover:scale-110">
                  <Heart size={16} className="text-gray-400 hover:text-red-500 transition-colors" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{court.title}</h3>
                <div className="flex items-start mb-3">
                  <MapPin size={16} className="text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-500">
                    {court.id === 1
                      ? "1 Crowthorne Road, 4th Street, NY"
                      : court.id === 2
                        ? "Hope Street, Battersea, SW11 2DA"
                        : "Lonsdale Road, Barnes, SW13 9QL"}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center bg-yellow-400 text-white rounded px-2 py-1 shadow-sm transform hover:scale-105 transition-transform">
                    <Star size={14} className="mr-1" />
                    <span className="text-sm">{court.rating}</span>
                  </div>
                  <div className="bg-emerald-500 text-white px-2 py-1 rounded text-xs flex items-center shadow-sm">
                    <span>{court.id * 2.1 + 0.1} Miles Away</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

