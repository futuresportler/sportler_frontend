"use client"

import { useState, useEffect } from "react"
import { Trophy, Star, Award } from "lucide-react"
import { getUserProgress, type ProgressData } from "@/services/dashboardService"

interface SkillProgressProps {
  academyId?: string
}

export default function SkillProgress({ academyId }: SkillProgressProps) {
  const [activeLevel, setActiveLevel] = useState("beginner")
  const [progress, setProgress] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showSkillDetails, setShowSkillDetails] = useState(false)

  useEffect(() => {
    async function loadProgress() {
      try {
        setLoading(true)
        const progressData = await getUserProgress(academyId)
        setProgress(progressData)
        setActiveLevel(progressData?.skillLevel?.current || "beginner")
        setError(null)
      } catch (err) {
        console.error("Error loading skill progress:", err)
        setError("Failed to load skill progress data")
      } finally {
        setLoading(false)
      }
    }

    loadProgress()
  }, [academyId])

  // This would be fetched from the backend in a real application
  const skills = {
    beginner: [
      {
        id: "b1",
        name: "Basic Grip",
        completed: true,
        description: "Master the proper way to hold your racket",
        icon: "🏸",
      },
      {
        id: "b2",
        name: "Forehand Clear",
        completed: true,
        description: "Learn to hit powerful forehand clears",
        icon: "💪",
      },
      {
        id: "b3",
        name: "Backhand Clear",
        completed: true,
        description: "Develop your backhand clear technique",
        icon: "🔄",
      },
      {
        id: "b4",
        name: "Footwork Basics",
        completed: true,
        description: "Learn the fundamental footwork patterns",
        icon: "👣",
      },
      { id: "b5", name: "Service", completed: true, description: "Master the basic service techniques", icon: "🎯" },
      {
        id: "b6",
        name: "Net Play",
        completed: false,
        description: "Learn to control the shuttle at the net",
        icon: "🕸️",
      },
      { id: "b7", name: "Drive", completed: false, description: "Develop your flat, fast drive shots", icon: "⚡" },
      { id: "b8", name: "Drop Shot", completed: false, description: "Learn to play delicate drop shots", icon: "🪶" },
      { id: "b9", name: "Smash", completed: false, description: "Develop your offensive smash technique", icon: "💥" },
      {
        id: "b10",
        name: "Basic Strategy",
        completed: false,
        description: "Understand fundamental game strategies",
        icon: "🧠",
      },
    ],
    intermediate: [
      {
        id: "i1",
        name: "Advanced Footwork",
        completed: false,
        description: "Master complex movement patterns",
        icon: "🏃",
      },
      { id: "i2", name: "Deceptive Shots", completed: false, description: "Learn to disguise your shots", icon: "🎭" },
      {
        id: "i3",
        name: "Advanced Service",
        completed: false,
        description: "Master various service techniques",
        icon: "🎯",
      },
      {
        id: "i4",
        name: "Defensive Skills",
        completed: false,
        description: "Improve your defensive capabilities",
        icon: "🛡️",
      },
      { id: "i5", name: "Net Kill", completed: false, description: "Master the attacking net kill shot", icon: "⚔️" },
      {
        id: "i6",
        name: "Jump Smash",
        completed: false,
        description: "Learn the powerful jump smash technique",
        icon: "🦘",
      },
      {
        id: "i7",
        name: "Tactical Play",
        completed: false,
        description: "Develop strategic thinking during matches",
        icon: "♟️",
      },
      {
        id: "i8",
        name: "Doubles Play",
        completed: false,
        description: "Learn effective doubles strategies",
        icon: "👥",
      },
      {
        id: "i9",
        name: "Match Fitness",
        completed: false,
        description: "Build stamina for competitive play",
        icon: "🏋️",
      },
      {
        id: "i10",
        name: "Mental Toughness",
        completed: false,
        description: "Develop mental resilience for matches",
        icon: "🧠",
      },
    ],
    advanced: [
      {
        id: "a1",
        name: "Professional Footwork",
        completed: false,
        description: "Master elite movement techniques",
        icon: "🏆",
      },
      {
        id: "a2",
        name: "Advanced Deception",
        completed: false,
        description: "Master complex deceptive techniques",
        icon: "🎭",
      },
      {
        id: "a3",
        name: "Shot Variation",
        completed: false,
        description: "Develop a wide array of shot variations",
        icon: "🎯",
      },
      {
        id: "a4",
        name: "Advanced Defense",
        completed: false,
        description: "Master elite defensive techniques",
        icon: "🛡️",
      },
      {
        id: "a5",
        name: "Power Smash",
        completed: false,
        description: "Perfect the powerful smash technique",
        icon: "💥",
      },
      { id: "a6", name: "Advanced Tactics", completed: false, description: "Master complex tactical play", icon: "♟️" },
      {
        id: "a7",
        name: "Match Analysis",
        completed: false,
        description: "Learn to analyze matches effectively",
        icon: "📊",
      },
      {
        id: "a8",
        name: "Tournament Strategy",
        completed: false,
        description: "Develop strategies for tournaments",
        icon: "🏆",
      },
      {
        id: "a9",
        name: "Elite Fitness",
        completed: false,
        description: "Achieve top-level physical conditioning",
        icon: "💪",
      },
      {
        id: "a10",
        name: "Championship Mindset",
        completed: false,
        description: "Develop the mindset of a champion",
        icon: "👑",
      },
    ],
  }

  const levels = [
    {
      id: "advanced",
      name: "Advanced",
      completed: progress?.skillLevel?.progress?.advanced?.completed || 0,
      total: progress?.skillLevel?.progress?.advanced?.total || 10,
      locked: true,
      color: "blue",
      icon: <Trophy className="text-blue-500" size={24} />,
      bgColor: "bg-blue-500",
      textColor: "text-blue-500",
      borderColor: "border-blue-200",
      bgLight: "bg-blue-50",
      description: "Master elite techniques and strategies for competitive play",
    },
    {
      id: "intermediate",
      name: "Intermediate",
      completed: progress?.skillLevel?.progress?.intermediate?.completed || 0,
      total: progress?.skillLevel?.progress?.intermediate?.total || 10,
      locked: true,
      color: "amber",
      icon: <Star className="text-amber-500" size={24} />,
      bgColor: "bg-amber-500",
      textColor: "text-amber-500",
      borderColor: "border-amber-200",
      bgLight: "bg-amber-50",
      description: "Develop advanced skills and tactical understanding",
    },
    {
      id: "beginner",
      name: "Beginner",
      completed: progress?.skillLevel?.progress?.beginner?.completed || 5,
      total: progress?.skillLevel?.progress?.beginner?.total || 10,
      locked: false,
      color: "emerald",
      icon: <Award className="text-emerald-500" size={24} />,
      bgColor: "bg-emerald-500",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-200",
      bgLight: "bg-emerald-50",
      description: "Learn the fundamental techniques and basic strategies",
    },
  ]

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skill Progress</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  const activeSkills = skills[activeLevel as keyof typeof skills] || []
  const completedSkills = activeSkills.filter((skill) => skill.completed).length
  const activeSkillLevel = levels.find((level) => level.id === activeLevel)
  const progressPercentage = (completedSkills / activeSkills.length) * 100

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Skill Progress</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {levels.map((level) => (
          <div
            key={level.id}
            className={`p-4 rounded-xl shadow-sm flex items-center justify-between transition-colors ${
              level.id === activeLevel
                ? `bg-${level.color}-50 text-${level.color}-700 border border-${level.color}-200`
                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
            }`}
            style={{ border: `1px solid ${level.borderColor}` }}
          >
            <div>
              <div className="flex items-center mb-2">
                <span className="text-4xl mr-2">{level.icon}</span>
                <div>
                  <h3 className="font-semibold text-lg">{level.name} Level</h3>
                  <p className="text-sm text-gray-500">{level.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  Completed: {level.completed}/{level.total}
                </div>
                <div className="w-24">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(level.completed / level.total) * 100}%`,
                        backgroundColor: level.bgColor,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
