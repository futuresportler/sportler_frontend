"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Award, Star, Lock, ChevronRight, Zap, Target, Dumbbell, Brain, Flame } from "lucide-react"
import { getUserProgress, getTrainingStats, getLeaderboardData } from "@/services/dashboardService"

export default function Dashboard() {
  const [progress, setProgress] = useState(null)
  const [stats, setStats] = useState(null)
  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [progressData, statsData, leaderboardData] = await Promise.all([
          getUserProgress(),
          getTrainingStats(),
          getLeaderboardData(),
        ])

        setProgress(progressData)
        setStats(statsData)
        setLeaderboard(leaderboardData)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

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

  // Determine player level
  const playerLevel = progress?.skillLevel?.current || "beginner"
  const isIntermediate = playerLevel === "intermediate" || playerLevel === "advanced"
  const isAdvanced = playerLevel === "advanced"

  // Calculate skill metrics
  const skillMetrics = {
    technique: 7.5,
    footwork: 6.8,
    stamina: 8.2,
    strategy: 6.5,
    mentalStrength: 7.0,
  }

  // Coach reviews
  const coachReviews = [
    {
      id: 1,
      coach: "Coach J. Dhavan",
      avatar: "/placeholder.svg?height=48&width=48&text=JD",
      date: "15 Apr 2025",
      text: "Mushir shows great potential in badminton. His footwork has improved significantly, but needs to work on backhand technique and court positioning.",
      focusAreas: ["Backhand technique", "Court positioning", "Match strategy"],
    },
    {
      id: 2,
      coach: "Coach Sarah M.",
      avatar: "/placeholder.svg?height=48&width=48&text=SM",
      date: "10 Apr 2025",
      text: "Good progress in defensive skills. Needs to improve smash power and accuracy for more effective attacking play.",
      focusAreas: ["Smash power", "Shot accuracy", "Attack transitions"],
    },
  ]

  // Upcoming competitions
  const competitions = [
    {
      id: 1,
      title: "City Badminton Championship",
      date: "May 15-20, 2025",
      location: "Central Sports Arena",
      eligible: isIntermediate,
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
      eligible: isAdvanced,
      image: "/placeholder.svg?height=80&width=80&text=🥇",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Player Level Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-emerald-500 to-blue-500 p-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Welcome back, Mushir!</h1>
              <p className="text-white/80">Track your progress, improve your skills, and reach new heights</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="text-xs text-white/80">Current Level</div>
                <div className="text-xl font-bold capitalize">{playerLevel}</div>
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg">
                <div className="text-xs text-white/80">Training Streak</div>
                <div className="text-xl font-bold">{progress?.dailyStreak?.current || 0} days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Level Progress */}
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-800 mb-4">Your Skill Journey</h2>

              <div className="relative mb-8">
                {/* Progress line */}
                <div className="absolute left-8 top-8 bottom-8 w-1 bg-gray-200 transform -translate-x-1/2 z-0"></div>

                {/* Advanced level */}
                <div className="relative z-10 mb-8 flex items-start">
                  <div
                    className={`relative z-20 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      isAdvanced ? "bg-blue-50 border-2 border-blue-200" : "bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    {isAdvanced ? (
                      <Trophy className="text-blue-500" size={24} />
                    ) : (
                      <Lock size={24} className="text-gray-400" />
                    )}
                  </div>
                  <div
                    className={`ml-4 flex-1 p-4 rounded-lg ${
                      isAdvanced ? "bg-blue-50 border border-blue-200" : "bg-gray-50 border border-gray-200 opacity-60"
                    }`}
                  >
                    <h4 className={`font-bold ${isAdvanced ? "text-blue-500" : "text-gray-700"}`}>Advanced Level</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Master elite techniques and strategies for competitive play
                    </p>
                    {!isAdvanced && (
                      <div className="mt-2 text-sm bg-blue-100/50 text-blue-700 px-3 py-1.5 rounded-md inline-flex items-center">
                        <Lock size={14} className="mr-1" /> Complete intermediate level to unlock
                      </div>
                    )}
                  </div>
                </div>

                {/* Intermediate level */}
                <div className="relative z-10 mb-8 flex items-start">
                  <div
                    className={`relative z-20 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      isIntermediate ? "bg-amber-50 border-2 border-amber-200" : "bg-gray-100 border-2 border-gray-200"
                    }`}
                  >
                    {isIntermediate ? (
                      <Star className="text-amber-500" size={24} />
                    ) : (
                      <Lock size={24} className="text-gray-400" />
                    )}

                    {isIntermediate && !isAdvanced && (
                      <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold">
                        {progress?.skillLevel?.progress?.intermediate?.completed || 0}/
                        {progress?.skillLevel?.progress?.intermediate?.total || 10}
                      </div>
                    )}
                  </div>
                  <div
                    className={`ml-4 flex-1 p-4 rounded-lg ${
                      isIntermediate
                        ? "bg-amber-50 border border-amber-200"
                        : "bg-gray-50 border border-gray-200 opacity-60"
                    }`}
                  >
                    <h4 className={`font-bold ${isIntermediate ? "text-amber-500" : "text-gray-700"}`}>
                      Intermediate Level
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">Develop advanced skills and tactical understanding</p>

                    {isIntermediate && !isAdvanced && (
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{
                              width: `${((progress?.skillLevel?.progress?.intermediate?.completed || 0) / (progress?.skillLevel?.progress?.intermediate?.total || 10)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <Link
                          href="/dashboard/progress"
                          className="mt-3 text-sm font-medium text-amber-500 flex items-center"
                        >
                          View Skills <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    )}

                    {!isIntermediate && (
                      <div className="mt-2 text-sm bg-amber-100/50 text-amber-700 px-3 py-1.5 rounded-md inline-flex items-center">
                        <Lock size={14} className="mr-1" /> Complete beginner level to unlock
                      </div>
                    )}
                  </div>
                </div>

                {/* Beginner level */}
                <div className="relative z-10 mb-8 flex items-start">
                  <div className="relative z-20 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-emerald-50 border-2 border-emerald-200">
                    <Award className="text-emerald-500" size={24} />

                    {playerLevel === "beginner" && (
                      <div className="absolute -right-1 -bottom-1 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center text-xs font-bold">
                        {progress?.skillLevel?.progress?.beginner?.completed || 0}/
                        {progress?.skillLevel?.progress?.beginner?.total || 10}
                      </div>
                    )}
                  </div>
                  <div className="ml-4 flex-1 p-4 rounded-lg bg-emerald-50 border border-emerald-200">
                    <h4 className="font-bold text-emerald-500">Beginner Level</h4>
                    <p className="text-sm text-gray-600 mt-1">Learn the fundamental techniques and basic strategies</p>

                    {playerLevel === "beginner" && (
                      <div className="mt-3">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-500 rounded-full"
                            style={{
                              width: `${((progress?.skillLevel?.progress?.beginner?.completed || 0) / (progress?.skillLevel?.progress?.beginner?.total || 10)) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <Link
                          href="/dashboard/progress"
                          className="mt-3 text-sm font-medium text-emerald-500 flex items-center"
                        >
                          View Skills <ChevronRight size={16} className="ml-1" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800">Performance Metrics</h2>
                <Link
                  href="/dashboard/progress"
                  className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
                >
                  View Details
                </Link>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <Zap className="text-red-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Technique</div>
                      <div className="text-sm font-bold text-gray-800">{skillMetrics.technique}/10</div>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500 rounded-full"
                        style={{ width: `${skillMetrics.technique * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <Target className="text-blue-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Footwork</div>
                      <div className="text-sm font-bold text-gray-800">{skillMetrics.footwork}/10</div>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${skillMetrics.footwork * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                    <Dumbbell className="text-amber-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Stamina</div>
                      <div className="text-sm font-bold text-gray-800">{skillMetrics.stamina}/10</div>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${skillMetrics.stamina * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Brain className="text-purple-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Strategy</div>
                      <div className="text-sm font-bold text-gray-800">{skillMetrics.strategy}/10</div>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500 rounded-full"
                        style={{ width: `${skillMetrics.strategy * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center mr-3">
                    <Flame className="text-emerald-500" size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-medium text-gray-700">Mental Strength</div>
                      <div className="text-sm font-bold text-gray-800">{skillMetrics.mentalStrength}/10</div>
                    </div>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${skillMetrics.mentalStrength * 10}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coach Reviews */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Coach Reviews</h2>
            <Link href="/dashboard/reviews" className="text-emerald-600 text-sm font-medium hover:text-emerald-700">
              View All Reviews
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coachReviews.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3 mb-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={review.avatar || "/placeholder.svg"} alt={review.coach} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{review.coach}</h3>
                    <p className="text-xs text-gray-500">{review.date}</p>
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-3">{review.text}</p>

                <div>
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">Focus Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {review.focusAreas.map((area, index) => (
                      <span key={index} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Competitions */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Upcoming Competitions</h2>
            <Link
              href="/dashboard/competitions"
              className="text-emerald-600 text-sm font-medium hover:text-emerald-700"
            >
              View All Competitions
            </Link>
          </div>

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
      </div>
    </div>
  )
}
