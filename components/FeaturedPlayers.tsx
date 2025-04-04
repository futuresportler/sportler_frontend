import Image from "next/image"
import Link from "next/link"
import { Star, Heart, MapPin, Calendar } from "lucide-react"
import { featuredPlayers } from "@/data/dummy-data"

export default function FeaturedPlayers() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Image src="/placeholder.svg?height=120&width=120" alt="Decoration" width={120} height={120} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Image src="/placeholder.svg?height=120&width=120" alt="Decoration" width={120} height={120} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Featured{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Academy
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Advanced sports venues offer the latest facilities, dynamic and unique environments for enhanced badminton
          performance.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredPlayers.map((player) => (
            <Link href={`/academies/${player.id}`} key={player.id}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={player.image || "/placeholder.svg"}
                    alt={player.title}
                    width={400}
                    height={200}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded">
                    ${player.id * 50 + 400}/hr
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className="bg-yellow-400 text-white rounded px-1 py-0.5 text-xs flex items-center mr-2 shadow-sm">
                        <Star size={12} className="mr-1" />
                        <span>{player.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500">{player.id * 100} Reviews</span>
                    </div>
                    <Heart size={18} className="text-gray-300 cursor-pointer hover:text-red-500 transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg mb-1">{player.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{player.description}</p>
                  <div className="flex items-start mb-2">
                    <MapPin size={16} className="text-gray-400 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-500">{player.location}</span>
                  </div>
                  <div className="flex items-start mb-4">
                    <Calendar size={16} className="text-gray-400 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <span className="text-gray-500">Next Availability: </span>
                      <span className="text-emerald-600">15 May 2023</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center">
                      <Image
                        src="/placeholder.svg?height=32&width=32"
                        alt="Coach"
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm">{player.coach}</span>
                    </div>
                    <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 hover:border-gray-400 transition-colors">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/academies"
            className="inline-flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Featured
          </Link>
        </div>
      </div>
    </section>
  )
}

