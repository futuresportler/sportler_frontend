"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Trophy, Users, ArrowRight } from "lucide-react"
import { getLeaderboardData, type LeaderboardEntry } from "@/services/dashboardService"

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true)
        const data = await getLeaderboardData()
        setLeaderboardData(data)
        setError(null)
      } catch (err) {
        console.error("Error loading leaderboard data:", err)
        setError("Failed to load leaderboard data")
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  const filteredData =
    activeTab === "all" ? leaderboardData : leaderboardData.filter((item) => item.sport.toLowerCase() === activeTab)

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="flex border-b border-gray-200 mb-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse mr-2"></div>
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Leaderboard</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Leaderboard</h2>
        <button className="text-emerald-600 text-sm font-medium hover:text-emerald-700 flex items-center">
          View All <ArrowRight size={16} className="ml-1" />
        </button>
      </div>

      <p className="text-gray-600 text-sm mb-4">View your ranking and compete with other sportlers</p>

      <div className="flex border-b border-gray-200 mb-4">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "all"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("all")}
        >
          <Users size={16} className="inline mr-2" />
          All Sports
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "badminton"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("badminton")}
        >
          Badminton
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "tennis"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("tennis")}
        >
          Tennis
        </button>
      </div>

      {filteredData.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No leaderboard data available for this sport</p>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-500 px-4 py-2">
            <span>Rank</span>
            <span>Activity Points</span>
          </div>

          {filteredData.map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-3 rounded-lg ${
                item.isCurrentUser ? "bg-emerald-50 border border-emerald-100" : "hover:bg-gray-50"
              } transition-colors`}
            >
              <div className="w-8 text-center font-bold">
                {item.rank === 1 && <Trophy size={18} className="text-yellow-500 mx-auto" />}
                {item.rank === 2 && <Trophy size={18} className="text-gray-400 mx-auto" />}
                {item.rank === 3 && <Trophy size={18} className="text-amber-600 mx-auto" />}
                {item.rank > 3 && <span className="text-gray-500">#{item.rank}</span>}
              </div>

              <div className="relative w-10 h-10 rounded-full overflow-hidden mx-4">
                <Image src={item.avatar || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center">
                  <h3 className="font-medium text-gray-800 truncate">{item.name}</h3>
                  {item.isCurrentUser && (
                    <span className="ml-2 bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded-full">You</span>
                  )}
                </div>
                <p className="text-xs text-gray-500">{item.sport}</p>
              </div>

              <div className="font-bold text-gray-800">{item.points}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
