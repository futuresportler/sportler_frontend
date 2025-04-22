"use client"

import { useState, useEffect } from "react"
import { getAchievements, type AchievementData } from "@/services/dashboardService"

interface AchievementCardsProps {
  academyId?: string
}

export default function AchievementCards({ academyId }: AchievementCardsProps) {
  const [achievements, setAchievements] = useState<AchievementData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAchievements() {
      try {
        setLoading(true)
        const achievementsData = await getAchievements(academyId)
        setAchievements(achievementsData)
        setError(null)
      } catch (err) {
        console.error("Error loading achievements:", err)
        setError("Failed to load achievements data")
      } finally {
        setLoading(false)
      }
    }

    loadAchievements()
  }, [academyId])

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Achievements</h2>
          <div className="text-red-500 text-center py-4">{error}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">Coaches Booked</h2>
        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold">{achievements?.coachesBooked || 0}</div>
          <div className="text-white/80">
            Book another session with your favorite coach.
            <button className="block mt-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Message them now
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
        <h2 className="text-lg font-bold mb-4">Academy Joined</h2>
        <div className="flex items-center justify-between">
          <div className="text-5xl font-bold">{achievements?.academiesJoined || 0}</div>
          <div className="text-white/80">
            Find an academy for your next training period.
            <button className="block mt-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Explore academies
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Achievements</h2>
        {achievements?.achievements && achievements.achievements.length > 0 ? (
          <div className="space-y-3">
            {achievements.achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border ${
                  achievement.unlocked ? "border-yellow-200 bg-yellow-50" : "border-gray-200 bg-gray-50 opacity-60"
                }`}
              >
                <div className="flex items-center">
                  <div className="text-2xl mr-3">{achievement.icon}</div>
                  <div>
                    <h3 className="font-medium text-gray-800">{achievement.title}</h3>
                    <p className="text-sm text-gray-500">{achievement.description}</p>
                  </div>
                  {!achievement.unlocked && <div className="ml-auto text-sm text-gray-500">🔒 Locked</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>No achievements available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}
