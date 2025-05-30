"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Trophy,
  Award,
  Star,
  Target,
  Flame,
  Zap,
  Dumbbell,
  Brain,
  Calendar,
  Clock,
  MapPin,
  Activity,
} from "lucide-react"
import { getUserProgress, getTrainingStats, getLeaderboardData } from "@/services/dashboardService"
import SkillHeatMap from "@/components/dashboard/SkillHeatMap"

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 h-48">
            <div className="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    )
  }

  // Calculate user XP and level
  const userXP = 1250
  const nextLevelXP = 2000
  const xpPercentage = (userXP / nextLevelXP) * 100

  // Upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      coach: "Coach J. Dhavan",
      sport: "Badminton",
      date: "Today",
      time: "4:00 PM",
      location: "Elite Sports Academy",
      avatar: "/placeholder.svg?height=48&width=48&text=JD",
    },
    {
      id: 2,
      coach: "Coach Sarah M.",
      sport: "Tennis",
      date: "Tomorrow",
      time: "10:00 AM",
      location: "Tennis Pro Center",
      avatar: "/placeholder.svg?height=48&width=48&text=SM",
    },
  ]

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      type: "session",
      title: "Completed Badminton Training",
      description: "1 hour session with Coach J. Dhavan",
      time: "2 hours ago",
      icon: Activity,
      color: "text-green-600",
    },
    {
      id: 2,
      type: "achievement",
      title: "New Achievement Unlocked",
      description: "Power Smash Master",
      time: "1 day ago",
      icon: Trophy,
      color: "text-amber-600",
    },
    {
      id: 3,
      type: "booking",
      title: "Session Booked",
      description: "Tennis training with Coach Sarah M.",
      time: "2 days ago",
      icon: Calendar,
      color: "text-blue-600",
    },
  ]

  // Coach reviews
  const coachReviews = [
    {
      id: 1,
      coach: "Coach J. Dhavan",
      avatar: "/placeholder.svg?height=48&width=48&text=JD",
      date: "15 Apr 2025",
      text: "Mushir shows great potential in badminton. His footwork has improved significantly, but needs to work on backhand technique and court positioning.",
      focusAreas: ["Backhand technique", "Court positioning", "Match strategy"],
      rating: 4.5,
    },
    {
      id: 2,
      coach: "Coach Sarah M.",
      avatar: "/placeholder.svg?height=48&width=48&text=SM",
      date: "10 Apr 2025",
      text: "Good progress in defensive skills. Needs to improve smash power and accuracy for more effective attacking play.",
      focusAreas: ["Smash power", "Shot accuracy", "Attack transitions"],
      rating: 4.0,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl shadow-lg p-6 text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-12 opacity-10">
          <Trophy size={150} />
        </div>
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Mushir!</h1>
              <p className="opacity-90">Level 7 Athlete • Badminton Specialist • Intermediate Tier</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-3 rounded-lg mt-4 md:mt-0">
              <div className="text-center">
                <p className="text-sm opacity-90">Daily Streak</p>
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <Flame size={20} />
                  <span className="text-2xl">{progress?.dailyStreak?.current || 12} days</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Current XP: {userXP}</span>
              <span>Next Level: {nextLevelXP} XP</span>
            </div>
            <div className="h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-300 rounded-full relative"
                style={{ width: `${xpPercentage}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <Award size={16} className="text-amber-300" />
              <span>5 Achievements</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <Trophy size={16} className="text-amber-300" />
              <span>Top 10% Ranking</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg text-sm flex items-center gap-2">
              <Target size={16} className="text-amber-300" />
              <span>8 Skills Mastered</span>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <Zap className="text-red-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">7.5</h3>
          <p className="text-sm text-gray-500">Technical</p>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-red-500 rounded-full" style={{ width: "75%" }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
            <Dumbbell className="text-blue-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">7.8</h3>
          <p className="text-sm text-gray-500">Physical</p>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full" style={{ width: "78%" }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <Target className="text-green-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">6.8</h3>
          <p className="text-sm text-gray-500">Tactical</p>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: "68%" }}></div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
            <Brain className="text-purple-500" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-gray-800">7.3</h3>
          <p className="text-sm text-gray-500">Mental</p>
          <div className="mt-2 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-purple-500 rounded-full" style={{ width: "73%" }}></div>
          </div>
        </div>
      </div>

      {/* Skill Heat Map */}
      <SkillHeatMap />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Upcoming Sessions */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Sessions</h2>
            <Link href="/dashboard/bookings" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {upcomingSessions.map((session) => (
              <div
                key={session.id}
                className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-indigo-100">
                    <Image
                      src={session.avatar || "/placeholder.svg"}
                      alt={session.coach}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{session.coach}</h3>
                    <p className="text-sm text-gray-600">{session.sport} Training</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{session.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{session.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{session.location}</span>
                      </div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                    Join Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>

          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div
                    className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${activity.color}`}
                  >
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{activity.title}</h3>
                    <p className="text-sm text-gray-600">{activity.description}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Coach Feedback */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Coach Feedback</h2>
          <Link href="/dashboard/feedback" className="text-indigo-600 text-sm font-medium hover:text-indigo-700">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coachReviews.map((review) => (
            <div
              key={review.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-indigo-200 transition-colors"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-indigo-100">
                  <Image src={review.avatar || "/placeholder.svg"} alt={review.coach} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium text-gray-800">{review.coach}</h3>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={`${star <= review.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{review.date}</p>
                  <p className="text-sm text-gray-700">{review.text}</p>
                </div>
              </div>

              <div className="pl-15">
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-1 flex items-center">
                  <Target size={12} className="mr-1" />
                  Focus Areas
                </div>
                <div className="flex flex-wrap gap-2">
                  {review.focusAreas.map((area, index) => (
                    <span key={index} className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
