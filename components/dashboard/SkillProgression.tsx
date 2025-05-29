"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Check, Lock, ChevronRight, Star } from "lucide-react"
import Link from "next/link"

interface Skill {
  id: string
  name: string
  description: string
  xp: number
  progress: number
  mastered: boolean
  icon: string
}

interface SkillCategory {
  id: string
  name: string
  icon: string
  skills: Skill[]
  unlockedAt: number
  color: string
}

export default function SkillsProgression() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>("technical")

  const playerLevel = 7

  const skillCategories: SkillCategory[] = [
    {
      id: "technical",
      name: "Technical Skills",
      icon: "🏸",
      color: "indigo",
      unlockedAt: 1,
      skills: [
        {
          id: "grip",
          name: "Basic Grip",
          description: "Master the proper way to hold your racket",
          xp: 50,
          progress: 100,
          mastered: true,
          icon: "✋",
        },
        {
          id: "forehand",
          name: "Forehand Clear",
          description: "Learn to hit powerful forehand clears",
          xp: 75,
          progress: 100,
          mastered: true,
          icon: "💪",
        },
        {
          id: "backhand",
          name: "Backhand Clear",
          description: "Develop your backhand clear technique",
          xp: 75,
          progress: 85,
          mastered: false,
          icon: "🔄",
        },
        {
          id: "smash",
          name: "Smash",
          description: "Master the offensive smash shot",
          xp: 100,
          progress: 60,
          mastered: false,
          icon: "💥",
        },
        {
          id: "net",
          name: "Net Play",
          description: "Learn precise shots at the net",
          xp: 75,
          progress: 40,
          mastered: false,
          icon: "🕸️",
        },
      ],
    },
    {
      id: "physical",
      name: "Physical Development",
      icon: "💪",
      color: "red",
      unlockedAt: 3,
      skills: [
        {
          id: "footwork",
          name: "Basic Footwork",
          description: "Learn fundamental movement patterns",
          xp: 75,
          progress: 100,
          mastered: true,
          icon: "👣",
        },
        {
          id: "stamina",
          name: "Stamina Building",
          description: "Improve your endurance during matches",
          xp: 100,
          progress: 70,
          mastered: false,
          icon: "🏃",
        },
        {
          id: "agility",
          name: "Agility Training",
          description: "Enhance your ability to change directions quickly",
          xp: 75,
          progress: 50,
          mastered: false,
          icon: "⚡",
        },
        {
          id: "strength",
          name: "Core Strength",
          description: "Develop power in your core muscles",
          xp: 100,
          progress: 30,
          mastered: false,
          icon: "🏋️",
        },
      ],
    },
    {
      id: "tactical",
      name: "Tactical Awareness",
      icon: "🧠",
      color: "amber",
      unlockedAt: 5,
      skills: [
        {
          id: "strategy",
          name: "Basic Strategy",
          description: "Understand fundamental game strategies",
          xp: 75,
          progress: 80,
          mastered: false,
          icon: "♟️",
        },
        {
          id: "position",
          name: "Court Positioning",
          description: "Learn effective court coverage",
          xp: 100,
          progress: 45,
          mastered: false,
          icon: "📍",
        },
        {
          id: "reading",
          name: "Reading Opponents",
          description: "Anticipate your opponent's shots",
          xp: 125,
          progress: 20,
          mastered: false,
          icon: "👁️",
        },
      ],
    },
    {
      id: "advanced",
      name: "Advanced Techniques",
      icon: "🏆",
      color: "purple",
      unlockedAt: 10,
      skills: [
        {
          id: "deception",
          name: "Deceptive Shots",
          description: "Learn to disguise your shots",
          xp: 150,
          progress: 0,
          mastered: false,
          icon: "🎭",
        },
        {
          id: "jump-smash",
          name: "Jump Smash",
          description: "Master the powerful jump smash technique",
          xp: 175,
          progress: 0,
          mastered: false,
          icon: "🦘",
        },
        {
          id: "defense",
          name: "Advanced Defense",
          description: "Develop elite defensive skills",
          xp: 150,
          progress: 0,
          mastered: false,
          icon: "🛡️",
        },
      ],
    },
  ]

  const toggleCategory = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null)
    } else {
      setExpandedCategory(categoryId)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Trophy size={24} className="text-indigo-600 mr-2" />
          <h2 className="text-xl font-bold text-gray-800">Skills Progression</h2>
        </div>
        <Link
          href="/dashboard/skills"
          className="text-indigo-600 text-sm font-medium hover:underline flex items-center"
        >
          Full Skill Tree <ChevronRight size={16} />
        </Link>
      </div>

      <div className="space-y-5">
        {skillCategories.map((category) => {
          const isUnlocked = playerLevel >= category.unlockedAt
          const isExpanded = expandedCategory === category.id
          const masteredCount = category.skills.filter((skill) => skill.mastered).length
          const totalSkills = category.skills.length
          const masteredPercentage = (masteredCount / totalSkills) * 100

          return (
            <div
              key={category.id}
              className={`border rounded-lg overflow-hidden ${isUnlocked ? `border-${category.color}-200` : "border-gray-200 opacity-75"}`}
            >
              <div
                className={`p-4 cursor-pointer ${isUnlocked ? `bg-${category.color}-50` : "bg-gray-50"}`}
                onClick={() => isUnlocked && toggleCategory(category.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="text-2xl mr-3">{category.icon}</div>
                    <div>
                      <h3 className={`font-bold ${isUnlocked ? `text-${category.color}-700` : "text-gray-400"}`}>
                        {category.name}
                      </h3>
                      <div className="flex items-center text-sm">
                        <span className={`${isUnlocked ? `text-${category.color}-600` : "text-gray-400"}`}>
                          {masteredCount}/{totalSkills} Skills
                        </span>
                        {isUnlocked && (
                          <div className="ml-2 flex">
                            {Array.from({ length: Math.min(3, Math.ceil(masteredPercentage / 33.33)) }).map((_, i) => (
                              <Star
                                key={i}
                                size={12}
                                className={`${i < Math.ceil(masteredPercentage / 33.33) ? `text-${category.color}-500 fill-${category.color}-500` : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    {!isUnlocked ? (
                      <div className="flex items-center text-gray-400 text-sm mr-2">
                        <Lock size={14} className="mr-1" />
                        Unlocks at level {category.unlockedAt}
                      </div>
                    ) : (
                      <div className="text-gray-400 mr-3 text-sm">{masteredPercentage.toFixed(0)}% Complete</div>
                    )}

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={`transform transition-transform ${isExpanded ? "rotate-180" : ""} ${isUnlocked ? `text-${category.color}-500` : "text-gray-300"}`}
                    >
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Progress bar */}
                {isUnlocked && (
                  <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${masteredPercentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-${category.color}-500 rounded-full`}
                    />
                  </div>
                )}
              </div>

              {/* Expanded skills list */}
              {isUnlocked && isExpanded && (
                <div className="p-4 bg-white border-t border-gray-100">
                  <div className="grid grid-cols-1 gap-3">
                    {category.skills.map((skill) => (
                      <div key={skill.id} className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {skill.mastered ? (
                            <div
                              className={`w-5 h-5 rounded-full bg-${category.color}-500 flex items-center justify-center`}
                            >
                              <Check size={12} className="text-white" />
                            </div>
                          ) : (
                            <div className="relative">
                              <div className={`w-5 h-5 rounded-full border-2 border-${category.color}-200`}></div>
                              {skill.progress > 0 && (
                                <svg viewBox="0 0 36 36" className="absolute -top-1 -left-1 w-7 h-7">
                                  <path
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none"
                                    stroke={
                                      category.color === "indigo"
                                        ? "#6366f1"
                                        : category.color === "red"
                                          ? "#ef4444"
                                          : category.color === "amber"
                                            ? "#f59e0b"
                                            : "#a855f7"
                                    }
                                    strokeWidth="2"
                                    strokeDasharray="100"
                                    strokeDashoffset={100 - skill.progress}
                                    className="stroke-current"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex justify-between">
                            <div className="flex items-center">
                              <span className="text-lg mr-2">{skill.icon}</span>
                              <h4 className="font-medium text-gray-800">{skill.name}</h4>
                            </div>
                            <div className="text-xs font-bold">
                              {skill.mastered ? (
                                <span className="text-green-600">MASTERED</span>
                              ) : (
                                <span className={`text-${category.color}-600`}>+{skill.xp} XP</span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{skill.description}</p>

                          {!skill.mastered && skill.progress > 0 && (
                            <div className="mt-2 flex items-center">
                              <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden mr-2">
                                <div
                                  className={`h-full bg-${category.color}-500 rounded-full`}
                                  style={{ width: `${skill.progress}%` }}
                                />
                              </div>
                              <span className="text-xs text-gray-500">{skill.progress}%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
