"use client"

import { useState } from "react"
import Image from "next/image"
import { Trophy, Medal, Award, TrendingUp, Star, Crown, Zap, Target } from "lucide-react"

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly")
  const [selectedCategory, setSelectedCategory] = useState("overall")

  const periods = [
    { id: "weekly", label: "This Week", icon: "📅" },
    { id: "monthly", label: "This Month", icon: "🗓️" },
    { id: "alltime", label: "All Time", icon: "🏆" },
  ]

  const categories = [
    { id: "overall", label: "Overall", icon: "🎯" },
    { id: "training", label: "Training", icon: "💪" },
    { id: "competitions", label: "Competitions", icon: "🏆" },
    { id: "consistency", label: "Consistency", icon: "📈" },
  ]

  const leaderboardData = [
    {
      rank: 1,
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=60&width=60&text=AJ",
      points: 2850,
      change: "+12",
      badge: "🥇",
      level: "Pro",
      streak: 15,
      achievements: 24,
    },
    {
      rank: 2,
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=60&width=60&text=SC",
      points: 2720,
      change: "+8",
      badge: "🥈",
      level: "Advanced",
      streak: 12,
      achievements: 19,
    },
    {
      rank: 3,
      name: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=60&width=60&text=MR",
      points: 2650,
      change: "+5",
      badge: "🥉",
      level: "Advanced",
      streak: 8,
      achievements: 16,
    },
    {
      rank: 4,
      name: "You",
      avatar: "/placeholder.svg?height=60&width=60&text=YU",
      points: 2420,
      change: "+15",
      badge: "🏅",
      level: "Intermediate",
      streak: 6,
      achievements: 12,
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=60&width=60&text=EW",
      points: 2380,
      change: "+3",
      badge: "🏅",
      level: "Intermediate",
      streak: 4,
      achievements: 11,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="text-yellow-500" size={24} />
      case 2:
        return <Medal className="text-gray-400" size={24} />
      case 3:
        return <Award className="text-amber-600" size={24} />
      default:
        return (
          <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
            {rank}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white">
        <div className="px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <Trophy className="text-yellow-400" size={36} />
                Leaderboard
              </h1>
              <p className="text-blue-100 text-lg">Compete with athletes and climb the ranks!</p>
            </div>

            {/* Period Selection */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {periods.map((period) => (
                <button
                  key={period.id}
                  onClick={() => setSelectedPeriod(period.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedPeriod === period.id
                      ? "bg-white text-purple-600 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {period.icon} {period.label}
                </button>
              ))}
            </div>

            {/* Category Selection */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-blue-100 hover:bg-white/20"
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Content */}
      <div className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-4xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {leaderboardData.slice(0, 3).map((user, index) => (
              <div
                key={user.rank}
                className={`relative bg-white rounded-2xl p-6 shadow-lg border-2 transition-all hover:shadow-xl ${
                  user.rank === 1
                    ? "border-yellow-300 bg-gradient-to-br from-yellow-50 to-amber-50 md:order-2 md:scale-105"
                    : user.rank === 2
                      ? "border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50 md:order-1"
                      : "border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50 md:order-3"
                }`}
              >
                {user.rank === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                      👑 CHAMPION
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <Image
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="object-cover"
                      />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      {getRankIcon(user.rank)}
                    </div>
                  </div>

                  <h3 className="font-bold text-gray-900 mb-1">{user.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{user.level}</p>

                  <div className="bg-white/80 rounded-xl p-3 mb-3">
                    <div className="text-2xl font-bold text-gray-900">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>

                  <div className="flex justify-center space-x-4 text-xs">
                    <div className="text-center">
                      <div className="font-bold text-orange-600">{user.streak}</div>
                      <div className="text-gray-500">streak</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{user.achievements}</div>
                      <div className="text-gray-500">badges</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of Leaderboard */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 px-6 py-4 border-b">
              <h2 className="text-lg font-bold text-gray-900">Full Rankings</h2>
            </div>

            <div className="divide-y divide-gray-100">
              {leaderboardData.map((user) => (
                <div
                  key={user.rank}
                  className={`p-4 md:p-6 transition-all hover:bg-gray-50 ${
                    user.isCurrentUser ? "bg-blue-50 border-l-4 border-blue-500" : ""
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className="flex-shrink-0 w-12 text-center">{getRankIcon(user.rank)}</div>

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-200">
                        <Image
                          src={user.avatar || "/placeholder.svg"}
                          alt={user.name}
                          width={56}
                          height={56}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {user.name}
                          {user.isCurrentUser && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">You</span>
                          )}
                        </h3>
                        <span className="text-lg">{user.badge}</span>
                      </div>
                      <p className="text-sm text-gray-600">{user.level}</p>

                      {/* Mobile Stats */}
                      <div className="flex space-x-4 mt-2 md:hidden">
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Zap size={12} className="text-orange-500" />
                          <span>{user.streak} streak</span>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-gray-500">
                          <Star size={12} className="text-purple-500" />
                          <span>{user.achievements} badges</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Stats */}
                    <div className="hidden md:flex items-center space-x-6">
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Zap size={14} className="text-orange-500" />
                          <span>{user.streak}</span>
                        </div>
                        <div className="text-xs text-gray-400">streak</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Star size={14} className="text-purple-500" />
                          <span>{user.achievements}</span>
                        </div>
                        <div className="text-xs text-gray-400">badges</div>
                      </div>
                    </div>

                    {/* Points & Change */}
                    <div className="text-right">
                      <div className="font-bold text-lg text-gray-900">{user.points.toLocaleString()}</div>
                      <div
                        className={`text-xs flex items-center justify-end space-x-1 ${
                          user.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp size={12} />
                        <span>{user.change}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Progress Card */}
          <div className="mt-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Your Progress</h3>
              <Target className="text-blue-200" size={24} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">4th</div>
                <div className="text-sm text-blue-200">Current Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">+15</div>
                <div className="text-sm text-blue-200">This Week</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">230</div>
                <div className="text-sm text-blue-200">To Next Rank</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-blue-200">Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
