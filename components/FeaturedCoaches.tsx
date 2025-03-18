import Image from "next/image"
import Link from "next/link"
import { featuredCoaches } from "@/data/dummy-data"

export default function FeaturedCoaches() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 opacity-40">
        <Image src="/dumbbell.png?height=120&width=120" alt="Decoration" width={120} height={120} />
      </div>
      {/* <div className="absolute bottom-0 right-10 opacity-40">
        <Image src="/weightlifting.png?height=120&width=120" alt="Decoration" width={120} height={120} />
      </div> */}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Featured{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Coaches
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12">
          Discover top coaches who have trained athletes and achieved remarkable success.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {featuredCoaches.map((coach) => (
            <div
              key={coach.id}
              className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px] hover:bg-emerald-600 group"
            >
              <div className={`h-64 overflow-hidden ${coach.background}`}>
                <Image
                  src={coach.image || "/placeholder.svg"}
                  alt={coach.name}
                  width={250}
                  height={300}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-extrabold mb-1 text-lg group-hover:text-white transition-colors">{coach.name}</h3>
                <p className="text-sm text-gray-500 group-hover:text-white transition-colors">{coach.role}</p>
                {coach.featured && (
                  <div className="mt-2">
                    <span className="inline-block bg-emerald-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
                      Featured
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Coaches
          </Link>
        </div>
      </div>
    </section>
  )
}

