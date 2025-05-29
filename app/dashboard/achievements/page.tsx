"use client"

import { useState } from "react"
import { Trophy, Medal, Star, Target, Zap, Calendar, Users, TrendingUp, Award, Lock } from "lucide-react"

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedFilter, setSelectedFilter] = useState("all") // all, earned, locked

  const categories = [
    { id: "all", name: "All", icon: Trophy, count: 24 },
    { id: "training", name: "Training", icon: Target, count: 8 },
    { id: "competitions", name: "Competitions", icon: Medal, count: 6 },
    { id: "social", name: "Social", icon: Users, count: 4 },
    { id: "milestones", name: "Milestones", icon: Star, count: 6 },
  ]

  const achievements = [
    {
      id: 1,
      title: "First Victory",
      description: "Win your first competition",
      category: "competitions",
      points: 100,
      rarity: "common",
      earned: true,
      earnedDate: "2024-03-15",
      icon: Trophy,
      progress: 100,
      requirement: "Win 1 competition",
    },
    {
      id: 2,
      title: "Training Streak",
      description: "Complete 7 consecutive training sessions",
      category: "training",
      points: 150,
      rarity: "uncommon",
      earned: true,
      earnedDate: "2024-03-20",
      icon: Zap,
      progress: 100,
      requirement: "7 day streak",
    },
    {
      id: 3,
      title: "Social Butterfly",
      description: "Train with 10 different partners",
      category: "social",
      points: 75,
      rarity: "common",
      earned: false,
      icon: Users,
      progress: 60,
      requirement: "Train with 10 partners",
      currentProgress: "6/10 partners",
    },
    {
      id: 4,
      title: "Champion",
      description: "Win 5 competitions in a month",
      category: "competitions",
      points: 500,
      rarity: "legendary",
      earned: false,
      icon: Medal,
      progress: 40,
      requirement: "Win 5 competitions",
      currentProgress: "2/5 competitions",
    },
    {
      id: 5,
      title: "Skill Master",
      description: "Reach expert level in any skill",
      category: "milestones",
      points: 300,
      rarity: "rare",
      earned: true,
      earnedDate: "2024-04-01",
      icon: Star,
      progress: 100,
      requirement: "Expert level skill",
    },
    {
      id: 6,
      title: "Consistency King",
      description: "Train for 30 consecutive days",
      category: "training",
      points: 250,
      rarity: "rare",
      earned: false,
      icon: Calendar,
      progress: 73,
      requirement: "30 day streak",
      currentProgress: "22/30 days",
    },
    {
      id: 7,
      title: "Rising Star",
      description: "Reach top 10 in leaderboard",
      category: "milestones",
      points: 200,
      rarity: "uncommon",
      earned: false,
      icon: TrendingUp,
      progress: 0,
      requirement: "Top 10 ranking",
      currentProgress: "Current rank: #15",
    },
    {
      id: 8,
      title: "Perfect Score",
      description: "Get 100% accuracy in a training session",
      category: "training",
      points: 100,
      rarity: "common",
      earned: true,
      earnedDate: "2024-03-25",
      icon: Target,
      progress: 100,
      requirement: "100% accuracy",
    },
  ]

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "from-slate-400 to-slate-500"
      case "uncommon":
        return "from-emerald-400 to-teal-500"
      case "rare":
        return "from-sky-400 to-indigo-500"
      case "epic":
        return "from-violet-400 to-purple-500"
      case "legendary":
        return "from-amber-400 to-orange-500"
      default:
        return "from-slate-400 to-slate-500"
    }
  }

  const getRarityBadge = (rarity) => {
    const colors = {
      common: "bg-slate-50 text-slate-600 border border-slate-200",
      uncommon: "bg-emerald-50 text-emerald-600 border border-emerald-200",
      rare: "bg-sky-50 text-sky-600 border border-sky-200",
      epic: "bg-violet-50 text-violet-600 border border-violet-200",
      legendary: "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-600 border border-amber-200",
    }
    return colors[rarity] || colors.common
  }

  const filteredAchievements = achievements.filter((achievement) => {
    if (selectedCategory !== "all" && achievement.category !== selectedCategory) return false
    if (selectedFilter === "earned" && !achievement.earned) return false
    if (selectedFilter === "locked" && achievement.earned) return false
    return true
  })

  const stats = {
    totalEarned: achievements.filter((a) => a.earned).length,
    totalPoints: achievements.filter((a) => a.earned).reduce((sum, a) => sum + a.points, 0),
    totalAchievements: achievements.length,
    completionRate: Math.round((achievements.filter((a) => a.earned).length / achievements.length) * 100),
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800 text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
              backgroundSize: "50px 50px",
            }}
          ></div>
        </div>

        <div className="relative px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <div className="p-2 rounded-full bg-amber-500/20 backdrop-blur-sm">
                  <Trophy className="text-amber-400" size={32} />
                </div>
                Achievements
              </h1>
              <p className="text-slate-300 text-lg">Unlock badges and showcase your progress</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-emerald-400">{stats.totalEarned}</div>
                <div className="text-sm text-slate-300">Earned</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-amber-400">{stats.totalPoints}</div>
                <div className="text-sm text-slate-300">Points</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-sky-400">{stats.completionRate}%</div>
                <div className="text-sm text-slate-300">Complete</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20">
                <div className="text-2xl font-bold text-violet-400">{stats.totalAchievements}</div>
                <div className="text-sm text-slate-300">Total</div>
              </div>
            </div>

            {/* Category Selection */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      selectedCategory === category.id
                        ? "bg-white text-slate-700 shadow-lg border border-white/20"
                        : "bg-white/10 text-slate-200 hover:bg-white/20 border border-white/10"
                    }`}
                  >
                    <IconComponent size={16} />
                    {category.name}
                    <span className="bg-white/20 text-xs px-2 py-0.5 rounded-full">{category.count}</span>
                  </button>
                )
              })}
            </div>

            {/* Filter Selection */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { id: "all", name: "All" },
                { id: "earned", name: "Earned" },
                { id: "locked", name: "Locked" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedFilter === filter.id
                      ? "bg-white/20 text-white border border-white/30"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements Content */}
      <div className="px-4 md:px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAchievements.map((achievement) => {
              const IconComponent = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md hover:border-slate-300 ${
                    achievement.earned ? "" : "opacity-80"
                  }`}
                >
                  {/* Achievement Header */}
                  <div
                    className={`bg-gradient-to-br ${getRarityColor(achievement.rarity)} p-4 relative overflow-hidden`}
                  >
                    {/* Subtle pattern for earned achievements */}
                    {achievement.earned && (
                      <div className="absolute inset-0 opacity-20">
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage: `linear-gradient(45deg, transparent 40%, white 50%, transparent 60%)`,
                            backgroundSize: "20px 20px",
                          }}
                        ></div>
                      </div>
                    )}

                    <div className="relative flex items-center justify-between">
                      <div
                        className={`p-3 rounded-xl ${achievement.earned ? "bg-white/25 backdrop-blur-sm" : "bg-white/15"}`}
                      >
                        {achievement.earned ? (
                          <IconComponent size={24} className="text-white" />
                        ) : (
                          <Lock size={24} className="text-white/70" />
                        )}
                      </div>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getRarityBadge(achievement.rarity)}`}
                      >
                        {achievement.rarity.charAt(0).toUpperCase() + achievement.rarity.slice(1)}
                      </div>
                    </div>
                  </div>

                  {/* Achievement Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3
                          className={`font-semibold text-lg mb-1 ${achievement.earned ? "text-slate-900" : "text-slate-500"}`}
                        >
                          {achievement.title}
                        </h3>
                        <p className={`text-sm ${achievement.earned ? "text-slate-600" : "text-slate-400"}`}>
                          {achievement.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${achievement.earned ? "text-slate-700" : "text-slate-400"}`}
                        >
                          {achievement.points}
                        </div>
                        <div className="text-xs text-slate-500">points</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {!achievement.earned && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-600 font-medium">Progress</span>
                          <span className="text-slate-500">{achievement.currentProgress}</span>
                        </div>
                        <div className="w-full bg-slate-100 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-slate-400 to-slate-500 h-2 rounded-full transition-all"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}

                    {/* Achievement Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-sm text-slate-500">
                        {achievement.earned ? (
                          <span className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                          </span>
                        ) : (
                          <span>{achievement.requirement}</span>
                        )}
                      </div>
                      {achievement.earned && (
                        <div className="flex items-center gap-1 text-emerald-600 text-sm font-medium">
                          <Award size={14} />
                          Completed
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Empty State */}
          {filteredAchievements.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy size={32} className="text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No achievements found</h3>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                {selectedFilter === "earned"
                  ? "You haven't earned any achievements in this category yet"
                  : selectedFilter === "locked"
                    ? "All achievements in this category have been earned"
                    : "No achievements match your current filters"}
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("all")
                  setSelectedFilter("all")
                }}
                className="bg-slate-700 hover:bg-slate-800 text-white px-8 py-3 rounded-xl font-medium transition-colors"
              >
                View All Achievements
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
