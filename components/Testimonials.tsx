"use client"

import { useEffect, useState, useRef } from "react"
import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tennis Player",
    rating: 5,
    comment: "The coaching I received was exceptional. My technique improved dramatically in just a few sessions.",
    image: "/featured-05.jpg?height=40&width=40",
  },
  {
    id: 2,
    name: "David Chen",
    role: "Badminton Enthusiast",
    rating: 4,
    comment:
      "Booking courts has never been easier. The facilities are top-notch and the coaches are very professional.",
    image: "/featured-06.jpg?height=40&width=40",
  },
  {
    id: 3,
    name: "Lisa Thompson",
    role: "Parent",
    rating: 5,
    comment:
      "My children have improved so much since joining the junior program. The coaches make learning fun and engaging.",
    image: "/featured-12.jpg?height=40&width=40",
  },
  {
    id: 4,
    name: "Michael Brown",
    role: "Badminton Player",
    rating: 4.5,
    comment: "The training programs are well-structured and the coaches are very knowledgeable. Highly recommended!",
    image: "/featured-11.jpg?height=40&width=40",
  },
  {
    id: 5,
    name: "Jennifer Lee",
    role: "Tennis Enthusiast",
    rating: 5,
    comment: "I've been playing tennis for years, but the coaching here has taken my game to a whole new level.",
    image: "/featured-08.jpg?height=40&width=40",
  },
]

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const visibleTestimonials = 3
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((current) => (current === testimonials.length - visibleTestimonials ? 0 : current + 1))
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} size={16} className="text-yellow-400 fill-yellow-400 mr-1" />)
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative mr-1">
          <Star size={16} className="text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
          </div>
        </div>,
      )
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} className="text-yellow-400 mr-1" />)
    }

    return stars
  }

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <Image src="/placeholder.svg?height=100&width=100" alt="Decoration" width={100} height={100} />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10">
        <Image src="/placeholder.svg?height=100&width=100" alt="Decoration" width={100} height={100} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Our{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Testimonials
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-8">
          Hear what our satisfied clients have to say about their experience with us.
        </p>

        <div className="relative" ref={containerRef}>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 mb-6 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * (100 / visibleTestimonials)}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                  <div className="bg-white p-6 rounded-lg shadow-md h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                      <div className="flex shadow-md rounded-full p-1 bg-white">{renderStars(testimonial.rating)}</div>
                      <span className="text-sm font-medium ml-2">{testimonial.rating}</span>
                    </div>
                    <p className="text-gray-600 mb-6 text-sm italic">"{testimonial.comment}"</p>
                    <div className="flex items-center">
                      <div className="rounded-full overflow-hidden mr-3 shadow-md">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{testimonial.name}</h4>
                        <p className="text-xs text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: testimonials.length - visibleTestimonials + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  activeIndex === index ? "bg-emerald-600" : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

