"use client"

import { useState, useEffect } from "react"
import { Flame, Award, Info } from "lucide-react"
import { getUserProfile, getUserProgress, type UserProfile, type ProgressData } from "@/services/dashboardService"

interface ProgressTrackerProps {
  academyId?: string
}

export default function ProgressTracker({ academyId }: ProgressTrackerProps) {
  const [showStreakInfo, setShowStreakInfo] = useState(false)
  const [showConsistencyInfo, setShowConsistencyInfo] = useState(false)
  const [user, setUser] = useState<UserProfile | null>(null)
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [userProfile, userProgress] = await Promise.all([getUserProfile(), getUserProgress(academyId)])
        setUser(userProfile)
        setProgress(userProgress)
        setError(null)
      } catch (err) {
        console.error("Error loading progress data:", err)
        setError("Failed to load progress data")
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [academyId])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-100 rounded-xl p-5 h-48 animate-pulse"></div>
          <div className="bg-gray-100 rounded-xl p-5 h-48 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-bold text-gray-800">Progress Tracker</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{user?.currentAcademy?.name || "Your Academy"}</h2>
        <div className="bg-emerald-100 text-emerald-800 text-xs font-medium px-3 py-1 rounded-full">
          Joined on{" "}
          {new Date(user?.joinedDate || "").toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
      </div>

      <p className="text-gray-600 mb-6">You're making great progress! Keep up the good work.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Daily Streak Card */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Flame size={120} />
          </div>

          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold flex items-center">
              Daily Streak
              <button
                onClick={() => setShowStreakInfo(!showStreakInfo)}
                className="ml-2 text-white/80 hover:text-white"
              >
                <Info size={16} />
              </button>
            </h3>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
              {progress?.dailyStreak?.current || 0} days
            </div>
          </div>

          {showStreakInfo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 text-sm">
              Complete activities daily to build your streak. Don't break the chain!
            </div>
          )}

          <div className="mb-3">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress?.dailyStreak?.percentage || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-white/80">
              <span>0</span>
              <span>{progress?.dailyStreak?.max || 10} days</span>
            </div>
          </div>

          <p className="text-sm text-white/90">Complete your daily training to level up as you move forward.</p>

          <button className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Complete Today
          </button>
        </div>

        {/* Consistency Level Card */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl p-5 text-white relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
            <Award size={120} />
          </div>

          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold flex items-center">
              Consistency Level
              <button
                onClick={() => setShowConsistencyInfo(!showConsistencyInfo)}
                className="ml-2 text-white/80 hover:text-white"
              >
                <Info size={16} />
              </button>
            </h3>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
              Level {progress?.consistencyLevel?.current || 0}
            </div>
          </div>

          {showConsistencyInfo && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mb-3 text-sm">
              Consistency measures how regularly you attend sessions and complete training.
            </div>
          )}

          <div className="mb-3">
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${progress?.consistencyLevel?.percentage || 0}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs mt-1 text-white/80">
              <span>Level {progress?.consistencyLevel?.current || 0}</span>
              <span>Level {progress?.consistencyLevel?.next || 0}</span>
            </div>
          </div>

          <p className="text-sm text-white/90">Remain more active by being consistent with your training schedule.</p>

          <button className="mt-3 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Learn More
          </button>
        </div>
      </div>
    </div>
  )
}
