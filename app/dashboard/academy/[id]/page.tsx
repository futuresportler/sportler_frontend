"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  TrendingUp,
  Calendar,
  Award,
  Star,
  Users,
  Clock,
  CheckCircle,
  ChevronRight,
  Target,
  Zap,
  Dumbbell,
  Trophy,
} from "lucide-react"
import { getUserProgress, getTrainingStats, getLeaderboardData, getUserAcademies } from "@/services/dashboardService"

export default function AcademyDashboard() {
  const params = useParams()
  const academyId = params.id

  const [academy, setAcademy] = useState(null)
  const [progress, setProgress] = useState(null)
  const [stats, setStats] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        // Load academy details
        const academies = await getUserAcademies()
        const currentAcademy = academies.find((a) => a.id === academyId)
        setAcademy(currentAcademy)

        // Load academy-specific data
        const [progressData, statsData, leaderboardData] = await Promise.all([
          getUserProgress(academyId),
          getTrainingStats(academyId),
          getLeaderboardData(academyId),
        ])

        setProgress(progressData)
        setStats(statsData)
        setLeaderboard(leaderboardData)
      } catch (error) {
        console.error("Error loading academy dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (academyId) {
      loadData()
    }
  }, [academyId])

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-64">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }

  if (!academy) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <span className="text-red-500 text-2xl">!</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Academy Not Found</h2>
        <p className="text-gray-600 mb-6">
          The academy you're looking for doesn't exist or you don't have access to it.
        </p>
        <Link
          href="/dashboard"
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Back to Dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Academy Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white/20">
                <Image
                  src={academy.logo || "/placeholder.svg?height=64&width=64&text=A"}
                  alt={academy.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">{academy.name}</h1>
                <p className="text-white/80">Your academy-specific progress and achievements</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="text-xs text-white/80">Classes Attended</div>
                <div className="text-xl font-bold">{stats?.sessionsCompleted || 0}</div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="text-xs text-white/80">Current Streak</div>
                <div className="text-xl font-bold">{progress?.dailyStreak?.current || 0} days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Academy Progress */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skill Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Skill Progress</h2>
              <Link
                href={`/dashboard/academy/${academyId}/skills`}
                className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
              >
                View All Skills <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="space-y-4">
              {/* Skill progress bars */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">Forehand</div>
                  <div className="text-sm font-bold text-gray-800">75%</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "75%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">Backhand</div>
                  <div className="text-sm font-bold text-gray-800">60%</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">Footwork</div>
                  <div className="text-sm font-bold text-gray-800">85%</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">Smash</div>
                  <div className="text-sm font-bold text-gray-800">45%</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "45%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="text-sm font-medium text-gray-700">Net Play</div>
                  <div className="text-sm font-bold text-gray-800">70%</div>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: "70%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Recent Sessions</h2>
              <Link
                href={`/dashboard/academy/${academyId}/sessions`}
                className="text-sm text-indigo-600 font-medium hover:text-indigo-700"
              >
                View All Sessions
              </Link>
            </div>

            <div className="space-y-4">
              {/* Session cards */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Footwork & Smash Training</h3>
                  <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-medium">
                    <CheckCircle size={12} className="mr-1" />
                    Completed
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2 text-indigo-600" />
                    <span>April 14, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-indigo-600" />
                    <span>10:00 AM - 11:30 AM</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-2 text-indigo-600" />
                    <span>Coach J. Dhavan</span>
                  </div>
                </div>

                <div className="mt-3 text-sm bg-blue-50 p-3 rounded-md">
                  <div className="font-medium text-blue-700 mb-1">Coach Feedback:</div>
                  <p className="text-gray-700">
                    Good progress on footwork. Focus on backhand technique in next session.
                  </p>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-gray-800">Basic Techniques Training</h3>
                  <div className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full text-xs font-medium">
                    <CheckCircle size={12} className="mr-1" />
                    Completed
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-2 text-indigo-600" />
                    <span>April 10, 2025</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-indigo-600" />
                    <span>4:00 PM - 5:30 PM</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-2 text-indigo-600" />
                    <span>Coach Sarah M.</span>
                  </div>
                </div>

                <div className="mt-3 text-sm bg-blue-50 p-3 rounded-md">
                  <div className="font-medium text-blue-700 mb-1">Coach Feedback:</div>
                  <p className="text-gray-700">Excellent grip and stance. Need to work on timing and shot placement.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Performance Metrics</h2>
              <Link
                href={`/dashboard/academy/${academyId}/performance`}
                className="text-sm text-indigo-600 font-medium hover:text-indigo-700 flex items-center"
              >
                View Details <ChevronRight size={16} className="ml-1" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <Zap className="text-red-500" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Technique</div>
                  <div className="text-xl font-bold text-gray-800">7.5/10</div>
                  <div className="text-xs text-emerald-600">+0.5 since last month</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  <Target className="text-blue-500" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Accuracy</div>
                  <div className="text-xl font-bold text-gray-800">8.2/10</div>
                  <div className="text-xs text-emerald-600">+0.7 since last month</div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 flex items-center">
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mr-4">
                  <Dumbbell className="text-amber-500" size={24} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Stamina</div>
                  <div className="text-xl font-bold text-gray-800">6.8/10</div>
                  <div className="text-xs text-emerald-600">+1.2 since last month</div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <div className="text-sm font-medium text-gray-700 mb-2">Overall Progress</div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "72%" }}></div>
              </div>
              <div className="flex justify-between text-xs mt-1 text-gray-500">
                <span>Beginner</span>
                <span>Intermediate</span>
                <span>Advanced</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Academy Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Academy Stats</h2>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <Calendar className="text-indigo-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Sessions Completed</div>
                  <div className="text-xl font-bold text-gray-800">{stats?.sessionsCompleted || 12}</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                  <TrendingUp className="text-emerald-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Training Hours</div>
                  <div className="text-xl font-bold text-gray-800">{stats?.totalHours || 20} hrs</div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                  <Star className="text-amber-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Skill Level</div>
                  <div className="text-xl font-bold text-gray-800 capitalize">
                    {progress?.skillLevel?.current || "beginner"}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <Award className="text-blue-600" size={20} />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Achievements</div>
                  <div className="text-xl font-bold text-gray-800">5</div>
                </div>
              </div>
            </div>
          </div>

          {/* Academy Leaderboard */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-800">Academy Leaderboard</h2>
              <Link
                href={`/dashboard/academy/${academyId}/leaderboard`}
                className="text-sm text-indigo-600 font-medium hover:text-indigo-700"
              >
                View Full Leaderboard
              </Link>
            </div>

            <div className="space-y-2">
              {leaderboard.slice(0, 5).map((item, index) => (
                <div
                  key={item.id}
                  className={`flex items-center p-3 rounded-lg ${
                    item.isCurrentUser ? "bg-indigo-50 border border-indigo-100" : "hover:bg-gray-50"
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
                        <span className="ml-2 bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">You</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.sport}</p>
                  </div>

                  <div className="font-bold text-gray-800">{item.points}</div>
                </div>
              ))}
            </div>

            <button className="mt-4 w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Improve Your Ranking
            </button>
          </div>

          {/* Upcoming Sessions */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Upcoming Sessions</h2>

            <div className="space-y-3">
              <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">Footwork & Smash Training</h3>
                <div className="text-sm text-gray-600 mt-1">Sunday, April 20, 2025</div>
                <div className="text-sm text-gray-600">10:00 AM - 11:30 AM</div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <Users size={14} className="mr-1 text-indigo-600" />
                  Coach J. Dhavan
                </div>
                <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>

              <div className="border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow">
                <h3 className="font-medium text-gray-800">Defensive Techniques</h3>
                <div className="text-sm text-gray-600 mt-1">Wednesday, April 23, 2025</div>
                <div className="text-sm text-gray-600">4:00 PM - 5:30 PM</div>
                <div className="text-sm text-gray-600 flex items-center mt-1">
                  <Users size={14} className="mr-1 text-indigo-600" />
                  Coach Sarah M.
                </div>
                <button className="mt-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                  View Details
                </button>
              </div>
            </div>

            <Link
              href={`/dashboard/bookings?academy=${academyId}`}
              className="mt-4 block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors text-center"
            >
              View All Bookings
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
