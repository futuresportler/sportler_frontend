"use client"

import Image from "next/image"
import { Lock } from "lucide-react"

const competitions = [
  {
    id: 1,
    title: "City Badminton Championship",
    date: "May 15-20, 2025",
    location: "Central Sports Arena",
    eligible: true,
    image: "/placeholder.svg?height=80&width=80&text=🏆",
  },
  {
    id: 2,
    title: "Inter-Academy Tournament",
    date: "June 5-8, 2025",
    location: "Padukone Badminton Academy",
    eligible: true,
    image: "/placeholder.svg?height=80&width=80&text=🏸",
  },
  {
    id: 3,
    title: "National Junior Championship",
    date: "July 10-17, 2025",
    location: "National Sports Complex",
    eligible: false,
    image: "/placeholder.svg?height=80&width=80&text=🥇",
  },
]

export default function CompetitionsPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Competitions</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {competitions.map((competition) => (
          <div
            key={competition.id}
            className={`border rounded-lg p-4 ${
              competition.eligible
                ? "border-gray-200 hover:shadow-md transition-shadow"
                : "border-gray-200 bg-gray-50 opacity-75"
            }`}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
                <Image
                  src={competition.image || "/placeholder.svg"}
                  alt={competition.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{competition.title}</h3>
                <p className="text-xs text-gray-500">{competition.date}</p>
                <p className="text-xs text-gray-500">{competition.location}</p>
              </div>
            </div>

            {competition.eligible ? (
              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors">
                Register Now
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 w-full bg-gray-200 text-gray-600 px-3 py-2 rounded-lg text-sm">
                <Lock size={14} />
                <span>Reach Intermediate Level to Unlock</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
