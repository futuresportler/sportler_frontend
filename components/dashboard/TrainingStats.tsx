"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Calendar } from "lucide-react"
import { getTrainingStats, type TrainingStats as TrainingStatsType } from "@/services/dashboardService"

export default function TrainingStats() {
  const [stats, setStats] = useState<TrainingStatsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true)
        const statsData = await getTrainingStats()
        setStats(statsData)
        setError(null)
      } catch (err) {
        console.error("Error loading training stats:", err)
        setError("Failed to load training statistics")
      } finally {
        setLoading(false)
      }
    }

    loadStats()
  }, [])

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 h-full">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse mb-4"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="grid grid-cols-1 gap-4 h-full">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="text-red-500 text-center py-4">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-4 h-full">
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Total Training Hours</h2>
            <p className="text-gray-600 text-sm mt-1">
              Keep going! You're ahead of {stats?.percentileRank}% people at your level.
            </p>
          </div>
          <div className="bg-emerald-50 p-2 rounded-full">
            <TrendingUp size={20} className="text-emerald-600" />
          </div>
        </div>

        <div className="mt-4 flex items-end">
          <span className="text-4xl font-bold text-emerald-600">{stats?.totalHours}</span>
          <span className="text-lg text-emerald-600 ml-1 mb-1">hrs</span>
        </div>

        <div className="mt-2 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${stats?.percentComplete}%` }}></div>
        </div>
        <div className="flex justify-between text-xs mt-1 text-gray-500">
          <span>0 hrs</span>
          <span>Target: {stats?.targetHours} hrs</span>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Upcoming Sessions</h2>
            <p className="text-gray-600 text-sm mt-1">Make sure to not miss any sessions. Consistency is the key!</p>
          </div>
          <div className="bg-blue-50 p-2 rounded-full">
            <Calendar size={20} className="text-blue-600" />
          </div>
        </div>

        <div className="mt-4 flex items-center">
          <span className="text-4xl font-bold text-blue-600">{stats?.upcomingSessions}</span>
          <span className="ml-3 text-gray-600">sessions this month</span>
        </div>

        <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          View Schedule
        </button>
      </div>
    </div>
  )
}
