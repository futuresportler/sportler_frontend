"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Clock, Heart, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react"

const latestNews = [
  {
    id: 1,
    title: "Mastering the Art of Dribbling: Essential Skills for Every Footballer",
    category: "Football",
    description: "Learn key dribbling techniques to outmaneuver opponents on the field.",
    image: "/new-01.jpg?height=200&width=400",
    author: "Orlando Waters",
    authorImage: "/featured-06.jpg?height=32&width=32",
    date: "15 May 2023",
    readTime: "10 Min To Read",
    likes: 45,
    comments: 45
  },
  {
    id: 2,
    title: "Basketball Shooting Drills: Improve Your Accuracy and Range",
    category: "Basketball",
    description: "Enhance your shooting skills with these effective drills and techniques.",
    image: "/new-02.jpg?height=200&width=400",
    author: "Nichols",
    authorImage: "/featured-08.jpg?height=32&width=32",
    date: "16 Jun 2023",
    readTime: "12 Min To Read",
    likes: 35,
    comments: 35
  },
  {
    id: 3,
    title: "Tennis Strategies: How to Dominate the Court Like a Pro",
    category: "Tennis",
    description: "Discover winning strategies to improve your tennis gameplay.",
    image: "/news-03.jpg?height=200&width=400",
    author: "Joanna Le",
    authorImage: "/featured-11.jpg?height=32&width=32",
    date: "11 May 2023",
    readTime: "14 Min To Read",
    likes: 25,
    comments: 25
  },
  {
    id: 4,
    title: "Cricket Fielding Tactics: How to Save Runs and Take Stunning Catches",
    category: "Cricket",
    description: "Master fielding techniques to make an impact on the cricket pitch.",
    image: "/new-04.jpg?height=200&width=400",
    author: "Michael Chen",
    authorImage: "/placeholder.svg?height=32&width=32",
    date: "20 Apr 2023",
    readTime: "8 Min To Read",
    likes: 55,
    comments: 30
  },
  {
    id: 5,
    title: "Strength Training for Swimmers: Enhance Your Speed and Endurance",
    category: "Swimming",
    description: "Build muscle strength and endurance to improve your swimming performance.",
    image: "/news-05.jpg?height=200&width=400",
    author: "Sarah Williams",
    authorImage: "/featured-05.jpg?height=32&width=32",
    date: "5 May 2023",
    readTime: "11 Min To Read",
    likes: 40,
    comments: 20
  }
];


export default function LatestNews() {
  const [startIndex, setStartIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleNews = 3

  const handlePrev = () => {
    if (isTransitioning || startIndex === 0) return

    setIsTransitioning(true)
    setStartIndex((prev) => Math.max(0, prev - 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  const handleNext = () => {
    if (isTransitioning || startIndex >= latestNews.length - visibleNews) return

    setIsTransitioning(true)
    setStartIndex((prev) => Math.min(latestNews.length - visibleNews, prev + 1))

    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  return (
    <section className="py-16 px-4 md:px-8  lg:px-16 bg-white relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          The Latest{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            News
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Get the latest buzz from the badminton world- stay informed and inspired by the thrilling updates and
          remarkable achievements in the sport.
        </p>

        <div className="relative overflow-hidden " ref={containerRef}>
          <div
            className="flex transition-transform duration-500 mb-6 ease-in-out"
            style={{ transform: `translateX(-${startIndex * (100 / visibleNews)}%)` }}
          >
            {latestNews.map((news) => (
              <div key={news.id} className="w-full md:w-1/3 flex-shrink-0 px-3">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full">
                  <div className="h-48 overflow-hidden relative">
                    <Image
                      src={news.image || "/placeholder.svg"}
                      alt={news.title}
                      width={400}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      {news.category}
                    </div>
                    <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-md">
                      <Heart size={16} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center mb-3">
                      <Image
                        src={news.authorImage || "/placeholder.svg"}
                        alt={news.author}
                        width={32}
                        height={32}
                        className="rounded-full mr-2"
                      />
                      <span className="text-sm">{news.author}</span>
                      <div className="flex items-center ml-auto text-xs text-gray-500">
                        <span className="mr-1">📅</span>
                        <span>{news.date}</span>
                      </div>
                    </div>
                    <h3 className="font-bold mb-3 text-lg">{news.title}</h3>
                    <div className="flex items-center justify-between text-xs text-gray-500 mt-4">
                      <div className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        <span>{news.readTime}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart size={14} className="mr-1" />
                        <span>{news.likes}</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={14} className="mr-1" />
                        <span>{news.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            disabled={startIndex === 0 || isTransitioning}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-emerald-600 transition-all duration-300 ${
              startIndex === 0 || isTransitioning ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
            }`}
            aria-label="Previous news"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={handleNext}
            disabled={startIndex >= latestNews.length - visibleNews || isTransitioning}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 bg-white rounded-full shadow-md p-2 text-gray-600 hover:text-emerald-600 transition-all duration-300 ${
              startIndex >= latestNews.length - visibleNews || isTransitioning
                ? "opacity-50 cursor-not-allowed"
                : "hover:scale-110"
            }`}
            aria-label="Next news"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div className="text-center mt-8">
          <Link
            href="#"
            className="inline-flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md hover:scale-105 transform transition-transform duration-300"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}

