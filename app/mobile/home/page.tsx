"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Target, TrendingUp, Award, Clock, ChevronRight, Play, Trophy, Zap } from "lucide-react"

export default function HomePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")

  const quickStats = [
    { label: "Training Hours", value: "24", change: "+3", icon: Clock, color: "bg-blue-500" },
    { label: "Skill Level", value: "7.2", change: "+0.3", icon: TrendingUp, color: "bg-emerald-500" },
    { label: "Achievements", value: "12", change: "+2", icon: Award, color: "bg-purple-500" },
    { label: "Streak", value: "5", change: "+1", icon: Zap, color: "bg-orange-500" },
  ]

  const upcomingSessions = [
    {
      id: 1,
      title: "Tennis Training",
      coach: "Sarah Johnson",
      time: "4:00 PM - 5:30 PM",
      date: "Today",
      location: "Court 3, Elite Academy",
      type: "training",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 2,
      title: "Basketball Practice",
      coach: "Mike Chen",
      time: "6:00 PM - 7:00 PM",
      date: "Tomorrow",
      location: "Indoor Court, Sports Center",
      type: "practice",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
  ]

  const recentAchievements = [
    {
      id: 1,
      title: "Perfect Form",
      description: "Maintained perfect form for 10 consecutive shots",
      icon: Target,
      color: "bg-emerald-500",
      date: "2 hours ago",
      points: 50,
    },
    {
      id: 2,
      title: "5-Day Streak",
      description: "Completed training for 5 consecutive days",
      icon: Zap,
      color: "bg-orange-500",
      date: "Yesterday",
      points: 100,
    },
  ]

  const recommendedActivities = [
    {
      id: 1,
      title: "Improve Backhand",
      description: "Based on your recent performance",
      duration: "30 min",
      difficulty: "Intermediate",
      image: "/placeholder.svg?height=80&width=120&text=Backhand",
    },
    {
      id: 2,
      title: "Cardio Workout",
      description: "Boost your endurance",
      duration: "45 min",
      difficulty: "Beginner",
      image: "/placeholder.svg?height=80&width=120&text=Cardio",
    },
  ]

  return (
    <div className="space-y-6 pb-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 px-4 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-bold">Good Evening, Mushir!</h2>
              <p className="text-emerald-100">Ready to train today?</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Trophy className="text-white" size={24} />
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white/15 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Icon size={20} className="text-white" />
                    <span className="text-xs text-emerald-100 bg-white/20 px-2 py-1 rounded-full">{stat.change}</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-emerald-100">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Upcoming Sessions</h3>
          <Link href="/mobile/bookings" className="text-emerald-600 text-sm font-medium flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {upcomingSessions.map((session) => (
            <div key={session.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-2xl overflow-hidden bg-gray-100">
                  <Image
                    src={session.avatar || "/placeholder.svg"}
                    alt={session.coach}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900">{session.title}</h4>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        session.type === "training" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {session.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{session.coach}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>{session.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{session.time}</span>
                    </div>
                  </div>
                </div>

                <button className="h-10 w-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                  <Play size={16} className="text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Recent Achievements</h3>
          <Link href="/mobile/achievements" className="text-emerald-600 text-sm font-medium flex items-center">
            View All <ChevronRight size={16} />
          </Link>
        </div>

        <div className="space-y-3">
          {recentAchievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div key={achievement.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 rounded-2xl ${achievement.color} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{achievement.date}</span>
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-medium">
                        +{achievement.points} pts
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recommended Activities */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Recommended for You</h3>

        <div className="grid grid-cols-1 gap-3">
          {recommendedActivities.map((activity) => (
            <div key={activity.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
              <div className="flex">
                <div className="relative h-20 w-28 bg-gray-100">
                  <Image
                    src={activity.image || "/placeholder.svg"}
                    alt={activity.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 p-4">
                  <h4 className="font-semibold text-gray-900 mb-1">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{activity.duration}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        activity.difficulty === "Beginner"
                          ? "bg-green-100 text-green-700"
                          : activity.difficulty === "Intermediate"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {activity.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center pr-4">
                  <button className="h-8 w-8 rounded-xl bg-emerald-500 hover:bg-emerald-600 flex items-center justify-center transition-colors">
                    <Play size={12} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
