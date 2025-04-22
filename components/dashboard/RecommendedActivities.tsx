"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Calendar, ArrowRight } from "lucide-react"
import { getRecommendedActivities, type RecommendedActivity } from "@/services/dashboardService"

export default function RecommendedActivities() {
  const [activities, setActivities] = useState<RecommendedActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadActivities() {
      try {
        setLoading(true)
        const activitiesData = await getRecommendedActivities()
        setActivities(activitiesData)
        setError(null)
      } catch (err) {
        console.error("Error loading recommended activities:", err)
        setError("Failed to load recommended activities")
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-gray-50 animate-pulse">
              <div className="w-12 h-12 rounded-lg bg-gray-200"></div>
              <div className="flex-1">
                <div className="h-4 w-3/4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
              </div>
              <div className="h-8 w-24 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended Activity</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-gray-800">Recommended Activity</h2>
        <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 flex items-center">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      {activities.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No recommended activities available at the moment</p>
        </div>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-blue-100 flex-shrink-0">
                <Image src={activity.image || "/placeholder.svg"} alt={activity.title} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 truncate">{activity.title}</h3>
                <div className="flex items-center text-gray-500 text-sm mt-1">
                  <Calendar size={14} className="mr-1" />
                  <span>{activity.dateRange}</span>
                </div>
              </div>

              <div className="flex items-center">
                <div className="relative w-6 h-6 rounded-full overflow-hidden mr-2">
                  <Image
                    src={activity.academy.logo || "/placeholder.svg"}
                    alt={activity.academy.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span className="text-xs text-gray-500 hidden md:inline">{activity.academy.name}</span>
              </div>

              <button className="bg-emerald-50 hover:bg-emerald-100 text-emerald-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap">
                Register now
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
