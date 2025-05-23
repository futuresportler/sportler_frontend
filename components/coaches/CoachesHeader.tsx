"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"

// Sample images for the slider
const headerImages = [
  "./pexels-pixabay-209977.jpg?height=300&width=1920",
  "./pexels-pixabay-163444.jpg?height=300&width=1920",
  "./pexels-jim-de-ramos-395808-1263349.jpg?height=300&width=1920",
]

export default function CoachesHeader() {
  const [currentImage, setCurrentImage] = useState(0)

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev === headerImages.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-[300px]">
      {/* Background image slider */}
      {headerImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Coaches header background ${index + 1}`}
            fill
            
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gray-10"></div>
        </div>
      ))}

      {/* Background decorative elements */}
      <div className="absolute top-4 left-4 z-10">
        <div className="w-3 h-3 bg-emerald-300 rounded-full opacity-70"></div>
      </div>
      <div className="absolute bottom-4 right-4 z-10">
        <div className="w-5 h-5 bg-yellow-400 rounded-full opacity-50"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-16 px-4 h-full flex flex-col justify-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">Coaches Directory</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="text-emerald-200 hover:text-white">
            Home
          </Link>
          <span className="mx-2 text-white">›</span>
          <span className="text-white">Coaches</span>
        </div>
      </div>
    </div>
  )
}

