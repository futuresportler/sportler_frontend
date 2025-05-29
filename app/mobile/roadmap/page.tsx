"use client"

import { useState } from "react"
import { CheckCircle, Circle, Lock, Target, Trophy, Clock, Star, ChevronRight, Award } from "lucide-react"

export default function RoadmapPage() {
  const [selectedPath, setSelectedPath] = useState("tennis")

  const skillPaths = [
    {
      id: "tennis",
      label: "Tennis",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      id: "basketball",
      label: "Basketball",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      id: "football",
      label: "Football",
      color: "from-sky-500 to-sky-600",
      bgColor: "bg-sky-50",
      textColor: "text-sky-700",
    },
  ]

  const roadmapData = {
    tennis: [
      {
        level: 1,
        title: "Basic Fundamentals",
        description: "Learn proper grip, stance, and basic strokes",
        status: "completed",
        xp: 100,
        skills: ["Forehand", "Backhand", "Serve"],
        estimatedTime: "2 weeks",
        completedDate: "Mar 15, 2025",
      },
      {
        level: 2,
        title: "Court Movement",
        description: "Master footwork and positioning",
        status: "completed",
        xp: 150,
        skills: ["Footwork", "Court Coverage", "Balance"],
        estimatedTime: "3 weeks",
        completedDate: "Apr 2, 2025",
      },
      {
        level: 3,
        title: "Advanced Techniques",
        description: "Develop spin, power, and precision",
        status: "current",
        xp: 200,
        skills: ["Topspin", "Slice", "Volleys"],
        estimatedTime: "4 weeks",
        progress: 65,
      },
      {
        level: 4,
        title: "Match Strategy",
        description: "Learn tactical play and mental game",
        status: "locked",
        xp: 250,
        skills: ["Strategy", "Mental Toughness", "Match Play"],
        estimatedTime: "6 weeks",
      },
      {
        level: 5,
        title: "Tournament Ready",
        description: "Compete at advanced level",
        status: "locked",
        xp: 300,
        skills: ["Competition", "Pressure Handling", "Advanced Tactics"],
        estimatedTime: "8 weeks",
      },
    ],
  }

  const currentPath = skillPaths.find((path) => path.id === selectedPath)
  const currentData = roadmapData[selectedPath as keyof typeof roadmapData]
  const completedCount = currentData?.filter((item) => item.status === "completed").length || 0
  const totalXP = currentData?.reduce((sum, item) => (item.status === "completed" ? sum + item.xp : sum), 0) || 0

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-sm">
            <CheckCircle size={16} className="text-white" />
          </div>
        )
      case "current":
        return (
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-500 to-sky-600 flex items-center justify-center shadow-sm">
            <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
          </div>
        )
      case "locked":
        return (
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <Lock size={16} className="text-slate-400" />
          </div>
        )
      default:
        return (
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
            <Circle size={16} className="text-slate-400" />
          </div>
        )
    }
  }

  const getCardStyle = (status: string) => {
    switch (status) {
      case "completed":
        return "border-emerald-200 bg-gradient-to-br from-emerald-50 to-emerald-100/50"
      case "current":
        return "border-sky-200 bg-gradient-to-br from-sky-50 to-sky-100/50 shadow-sm"
      case "locked":
        return "border-slate-200 bg-gradient-to-br from-slate-50 to-slate-100/50"
      default:
        return "border-slate-200 bg-white"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-stone-50 to-neutral-100 max-w-md mx-auto">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-stone-800 text-white overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: "50px 50px, 30px 30px",
            }}
          ></div>
        </div>

        <div className="relative px-4 py-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/10 mb-4">
              <Target className="text-sky-400" size={28} />
            </div>
            <h1 className="text-2xl font-bold mb-2">Learning Roadmap</h1>
            <p className="text-slate-300">Master skills step by step</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <Trophy size={20} className="text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{completedCount}</p>
              <p className="text-xs text-slate-300">Completed</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <Star size={20} className="text-amber-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{totalXP}</p>
              <p className="text-xs text-slate-300">Total XP</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10">
              <Award size={20} className="text-emerald-400 mx-auto mb-1" />
              <p className="text-lg font-bold">{Math.round((completedCount / currentData.length) * 100)}%</p>
              <p className="text-xs text-slate-300">Progress</p>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Path Selector */}
      <div className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex space-x-2 overflow-x-auto">
          {skillPaths.map((path) => (
            <button
              key={path.id}
              onClick={() => setSelectedPath(path.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all duration-200 border font-medium ${
                selectedPath === path.id
                  ? `bg-gradient-to-r ${path.color} text-white shadow-sm border-transparent`
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 border-slate-200"
              }`}
            >
              {path.label}
            </button>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="px-4 py-6 space-y-4">
        {currentData?.map((milestone, index) => (
          <div key={milestone.level} className="relative">
            {/* Connection Line */}
            {index < currentData.length - 1 && (
              <div className="absolute left-7 top-20 w-0.5 h-8 bg-gradient-to-b from-slate-300 to-slate-200"></div>
            )}

            <div className={`rounded-2xl border p-5 ${getCardStyle(milestone.status)} transition-all hover:shadow-md`}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">{getStatusIcon(milestone.status)}</div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold text-slate-900">Level {milestone.level}</h3>
                      <span className="text-xs bg-gradient-to-r from-amber-100 to-amber-200 text-amber-700 px-2.5 py-1 rounded-full font-semibold border border-amber-300">
                        +{milestone.xp} XP
                      </span>
                    </div>
                    {milestone.status === "completed" && (
                      <span className="text-xs text-emerald-600 font-medium">✓ {milestone.completedDate}</span>
                    )}
                  </div>

                  <h4 className="font-semibold text-slate-900 mb-2">{milestone.title}</h4>
                  <p className="text-sm text-slate-600 mb-4">{milestone.description}</p>

                  {/* Progress Bar for Current Level */}
                  {milestone.status === "current" && milestone.progress && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-slate-600 font-semibold">Progress</span>
                        <span className="text-xs font-bold text-sky-600">{milestone.progress}%</span>
                      </div>
                      <div className="bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-sky-400 to-sky-500 h-full rounded-full transition-all duration-700 relative"
                          style={{ width: `${milestone.progress}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {milestone.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className={`text-xs px-3 py-1.5 rounded-full border font-medium ${
                          milestone.status === "completed"
                            ? "bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 border-emerald-300"
                            : milestone.status === "current"
                              ? "bg-gradient-to-r from-sky-100 to-sky-200 text-sky-700 border-sky-300"
                              : "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-500 border-slate-300"
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <Clock size={12} />
                      <span>{milestone.estimatedTime}</span>
                    </div>
                    {milestone.status === "current" && (
                      <button className="flex items-center space-x-1 text-sky-600 font-semibold hover:text-sky-700 transition-colors text-sm">
                        <span>Continue</span>
                        <ChevronRight size={14} />
                      </button>
                    )}
                    {milestone.status === "locked" && (
                      <span className="text-xs text-slate-400 font-medium">Locked</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom spacing */}
      <div className="h-6"></div>
    </div>
  )
}
