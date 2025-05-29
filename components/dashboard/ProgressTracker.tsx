"use client"

import { useState, useEffect } from "react"
import { Flame, Award, Info, Trophy, Target, Brain, CheckCircle, Zap } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
  const [activeTab, setActiveTab] = useState<"stats" | "badges" | "quests">("stats")

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
      <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100">
        <div className="h-5 w-40 bg-gray-200 rounded animate-pulse mb-3"></div>
        <div className="h-3 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="bg-gray-100 rounded-xl p-4 h-32 md:h-40 animate-pulse"></div>
          <div className="bg-gray-100 rounded-xl p-4 h-32 md:h-40 animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-3 md:p-4 border border-gray-100">
        <h2 className="text-base md:text-lg font-bold text-gray-800">Progress Tracker</h2>
        <div className="text-red-500 text-center py-3 md:py-4">{error}</div>
      </div>
    )
  }

  // Badges the user has earned
  const badges = [
    {
      name: "Consistency Champion",
      icon: <Flame size={20} className="text-amber-500" />,
      level: 3,
      xp: 200,
      description: "Complete training 5 days in a row",
    },
    {
      name: "Technique Master",
      icon: <Target size={20} className="text-indigo-500" />,
      level: 2,
      xp: 150,
      description: "Score 8+ on technique drills",
    },
    {
      name: "Strategic Thinker",
      icon: <Brain size={20} className="text-purple-500" />,
      level: 1,
      xp: 100,
      description: "Apply advanced strategy in matches",
    },
    {
      name: "Endurance Pro",
      icon: <Zap size={20} className="text-blue-500" />,
      level: 2,
      xp: 150,
      description: "Complete 10 stamina workouts",
    },
  ]

  // Daily and weekly quests
  const quests = [
    {
      name: "Daily Training",
      description: "Complete today's training program",
      xp: 50,
      timeLeft: "7 hours",
      completed: false,
    },
    { name: "Coach Challenge", description: "Master the footwork drill", xp: 75, timeLeft: "2 days", completed: true },
    {
      name: "Weekly Tournament",
      description: "Participate in the weekend tournament",
      xp: 150,
      timeLeft: "5 days",
      completed: false,
    },
    {
      name: "Skills Assessment",
      description: "Complete your monthly skills test",
      xp: 200,
      timeLeft: "2 weeks",
      completed: false,
    },
  ]

  return (
    <div className="bg-white rounded-xl shadow-lg p-3 md:p-4 border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg mr-2">
            <Trophy size={18} className="text-white" />
          </div>
          <div>
            <h2 className="text-sm md:text-base font-bold text-gray-800">
              {user?.currentAcademy?.name || "Your Academy"}
            </h2>
            <p className="text-[10px] md:text-xs text-gray-500">
              Joined on{" "}
              {new Date(user?.joinedDate || "").toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="hidden md:block bg-indigo-100 text-indigo-800 text-xs font-medium px-2 py-0.5 rounded-full">
          Level {progress?.consistencyLevel?.current || 0}
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-3">
        <button
          onClick={() => setActiveTab("stats")}
          className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium border-b-2 transition-colors ${
            activeTab === "stats"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Trophy size={14} className="inline mr-1" />
          Progress Stats
        </button>
        <button
          onClick={() => setActiveTab("badges")}
          className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium border-b-2 transition-colors ${
            activeTab === "badges"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Award size={14} className="inline mr-1" />
          Badges
        </button>
        <button
          onClick={() => setActiveTab("quests")}
          className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm font-medium border-b-2 transition-colors ${
            activeTab === "quests"
              ? "border-indigo-500 text-indigo-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          <Target size={14} className="inline mr-1" />
          Quests
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "stats" && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-3"
          >
            {/* Daily Streak Card */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-lg p-3 text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <Flame size={80} />
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm md:text-base font-bold flex items-center">
                  Daily Streak
                  <button
                    onClick={() => setShowStreakInfo(!showStreakInfo)}
                    className="ml-1 text-white/80 hover:text-white"
                  >
                    <Info size={14} />
                  </button>
                </h3>
                <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold">
                  {progress?.dailyStreak?.current || 0} days
                </div>
              </div>

              {showStreakInfo && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-2 text-xs">
                  Complete activities daily to build your streak. Don't break the chain!
                </div>
              )}

              <div className="mb-2">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress?.dailyStreak?.percentage || 0}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-white rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-[10px] mt-0.5 text-white/80">
                  <span>0</span>
                  <span>{progress?.dailyStreak?.max || 10} days</span>
                </div>
              </div>

              <p className="text-xs text-white/90">Complete your daily training to level up as you move forward.</p>

              <button className="mt-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                Complete Today
              </button>
            </div>

            {/* Consistency Level Card */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg p-3 text-white relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <Award size={80} />
              </div>

              <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm md:text-base font-bold flex items-center">
                  Player Level
                  <button
                    onClick={() => setShowConsistencyInfo(!showConsistencyInfo)}
                    className="ml-1 text-white/80 hover:text-white"
                  >
                    <Info size={14} />
                  </button>
                </h3>
                <div className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full text-xs font-bold">
                  {progress?.consistencyLevel?.current || 0}
                </div>
              </div>

              {showConsistencyInfo && (
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-2 text-xs">
                  Maintain a consistent training schedule to level up your player level.
                </div>
              )}

              <div className="mb-2">
                <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress?.consistencyLevel?.percentage || 0}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-white rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                  </motion.div>
                </div>
                <div className="flex justify-between text-[10px] mt-0.5 text-white/80">
                  <span>0</span>
                  <span>{progress?.consistencyLevel?.max || 10}</span>
                </div>
              </div>

              <p className="text-xs text-white/90">
                Consistent training improves your skills and helps you climb the ranks.
              </p>

              <button className="mt-2 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                View Training Plan
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === "badges" && (
          <motion.div
            key="badges"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3"
          >
            {badges.map((badge, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="rounded-full bg-gray-100 p-1.5 mr-2">{badge.icon}</div>
                    <h4 className="text-sm font-semibold text-gray-800">{badge.name}</h4>
                  </div>
                  <div className="text-xs text-gray-500">Level {badge.level}</div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                <div className="flex justify-end items-center text-gray-500 text-xs">
                  <Award size={12} className="mr-1" />
                  {badge.xp} XP
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === "quests" && (
          <motion.div
            key="quests"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            {quests.map((quest, index) => (
              <div
                key={index}
                className={`bg-white rounded-lg shadow-md p-3 border ${
                  quest.completed ? "border-green-200 bg-green-50" : "border-gray-100"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-semibold text-gray-800">{quest.name}</h4>
                  {quest.completed ? (
                    <div className="text-green-500 text-xs font-medium flex items-center">
                      Completed <CheckCircle size={12} className="ml-1" />
                    </div>
                  ) : (
                    <div className="text-gray-500 text-xs">{quest.timeLeft}</div>
                  )}
                </div>
                <p className="text-xs text-gray-600 mb-2">{quest.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-gray-500 text-xs">
                    <Trophy size={12} className="mr-1" />
                    {quest.xp} XP
                  </div>
                  {!quest.completed && (
                    <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-xs font-medium transition-colors">
                      Start Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
