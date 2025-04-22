"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, Clock, MapPin } from "lucide-react"
import { getUpcomingSession, type UpcomingSession as UpcomingSessionType } from "@/services/dashboardService"

export default function UpcomingSession() {
  const [session, setSession] = useState<UpcomingSessionType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadSession() {
      try {
        setLoading(true)
        const sessionData = await getUpcomingSession()
        setSession(sessionData)
        setError(null)
      } catch (err) {
        console.error("Error loading upcoming session:", err)
        setError("Failed to load upcoming session data")
      } finally {
        setLoading(false)
      }
    }

    loadSession()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
          <div className="flex-1 space-y-3">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Next Session</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-full">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Next Session</h2>

      <div className="flex items-start gap-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-emerald-100">
          <Image
            src={session?.coach?.avatar || "/placeholder.svg?height=48&width=48&text=JD"}
            alt={`Coach ${session?.coach?.name || "Profile"}`}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap justify-between items-start gap-2">
            <div>
              <h3 className="font-medium text-gray-800">Assigned Coach</h3>
              <p className="text-gray-600">Coach {session?.coach?.name}</p>
            </div>

            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-lg text-sm">
              {session?.dayOfWeek}, {session?.date}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2 text-emerald-600" />
              <span>
                {session?.startTime} - {session?.endTime}
              </span>
            </div>

            <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-2 text-emerald-600" />
              <span>{session?.location}</span>
            </div>

            <div className="flex items-center text-gray-600">
              <Calendar size={16} className="mr-2 text-emerald-600" />
              <span>{session?.sessionType}</span>
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1">
              Check In
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
