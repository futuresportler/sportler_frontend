"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  ChevronRight,
  Info,
  Star,
  Trophy,
  Target,
  Zap,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Dumbbell,
} from "lucide-react"

// Define skill categories with more sophisticated styling
const skillCategories = {
  technical: {
    name: "Technical",
    icon: <Zap size={16} />,
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    skills: [
      { name: "Forehand", value: 8.7, description: "Power and accuracy of forehand shots", trend: "up" },
      { name: "Backhand", value: 5.3, description: "Control and placement of backhand shots", trend: "down" },
      { name: "Service", value: 7.8, description: "Consistency and variety of service", trend: "up" },
      { name: "Net Play", value: 6.5, description: "Ability to control the net area", trend: "stable" },
      { name: "Smash", value: 9.1, description: "Power and placement of smash shots", trend: "up" },
      { name: "Drop Shot", value: 4.2, description: "Accuracy and deception of drop shots", trend: "down" },
    ],
  },
  physical: {
    name: "Physical",
    icon: <Dumbbell size={16} />,
    color: "sky",
    gradient: "from-sky-500 to-sky-600",
    lightBg: "bg-sky-50",
    skills: [
      { name: "Speed", value: 7.8, description: "Movement speed around the court", trend: "up" },
      { name: "Stamina", value: 8.9, description: "Ability to maintain performance over time", trend: "up" },
      { name: "Agility", value: 7.9, description: "Quickness in changing direction", trend: "stable" },
      { name: "Strength", value: 6.3, description: "Physical power in shots and movement", trend: "stable" },
      { name: "Flexibility", value: 5.8, description: "Range of motion and stretching ability", trend: "up" },
      { name: "Balance", value: 7.5, description: "Stability during complex movements", trend: "stable" },
    ],
  },
  tactical: {
    name: "Tactical",
    icon: <Target size={16} />,
    color: "amber",
    gradient: "from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    skills: [
      { name: "Court Positioning", value: 6.5, description: "Ability to position optimally on court", trend: "up" },
      { name: "Game Strategy", value: 4.8, description: "Planning and executing game plans", trend: "down" },
      { name: "Shot Selection", value: 6.8, description: "Choosing appropriate shots in situations", trend: "stable" },
      { name: "Adaptability", value: 7.2, description: "Adjusting to opponent's play style", trend: "up" },
      { name: "Match Awareness", value: 5.3, description: "Understanding match flow and momentum", trend: "stable" },
      { name: "Decision Making", value: 6.9, description: "Making quick, effective decisions", trend: "up" },
    ],
  },
  mental: {
    name: "Mental",
    icon: <Brain size={16} />,
    color: "violet",
    gradient: "from-violet-500 to-violet-600",
    lightBg: "bg-violet-50",
    skills: [
      { name: "Focus", value: 7.0, description: "Ability to maintain concentration", trend: "stable" },
      { name: "Composure", value: 5.5, description: "Staying calm under pressure", trend: "down" },
      { name: "Confidence", value: 8.5, description: "Self-belief in abilities", trend: "up" },
      { name: "Resilience", value: 9.0, description: "Bouncing back from setbacks", trend: "up" },
      { name: "Motivation", value: 8.5, description: "Drive to improve and succeed", trend: "stable" },
      { name: "Competitiveness", value: 7.8, description: "Desire to win and compete", trend: "up" },
    ],
  },
}

// Function to get a label for skill level
const getSkillLabel = (value: number) => {
  if (value >= 8.5) return "Elite"
  if (value >= 7.5) return "Advanced"
  if (value >= 6.0) return "Proficient"
  if (value >= 4.0) return "Developing"
  return "Beginner"
}

// Function to get color based on skill level
const getSkillColorClass = (value: number) => {
  if (value >= 8.5) return "emerald"
  if (value >= 7.5) return "sky"
  if (value >= 6.0) return "amber"
  if (value >= 4.0) return "orange"
  return "slate"
}

// Function to get trend icon
const getTrendIcon = (trend: string) => {
  if (trend === "up") return <ArrowUpRight size={12} className="text-emerald-500" />
  if (trend === "down") return <ArrowDownRight size={12} className="text-red-500" />
  return <TrendingUp size={12} className="text-slate-400" />
}

export default function SkillHeatMap() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof skillCategories>("technical")
  const [selectedSkill, setSelectedSkill] = useState<null | {
    name: string
    value: number
    description: string
    trend: string
  }>(null)

  // Get top skills across all categories
  const allSkills = Object.values(skillCategories).flatMap((category) => category.skills)
  const topSkills = [...allSkills].sort((a, b) => b.value - a.value).slice(0, 3)
  const improvementSkills = [...allSkills].sort((a, b) => a.value - b.value).slice(0, 3)

  const activeSkillCategory = skillCategories[activeCategory]

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-slate-200">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-900 mb-1">Skill Analysis</h2>
          <p className="text-sm text-slate-600">Comprehensive skill assessment across all categories</p>
        </div>
        <div className="flex flex-wrap mt-3 md:mt-0 space-x-1 bg-slate-100 p-1 rounded-xl">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key as keyof typeof skillCategories)}
              className={`px-3 py-2 text-sm rounded-lg flex items-center gap-2 transition-all duration-200 ${
                activeCategory === key
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-sm`
                  : "text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span className={activeCategory === key ? "text-white" : `text-${category.color}-500`}>
                {category.icon}
              </span>
              <span className="hidden sm:inline font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Grid */}
        <div className="lg:col-span-2">
          <div
            className={`${activeSkillCategory.lightBg} rounded-xl p-4 border border-${activeSkillCategory.color}-200`}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {activeSkillCategory.skills.map((skill) => {
                const skillColorClass = getSkillColorClass(skill.value)
                const skillLabel = getSkillLabel(skill.value)

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative cursor-pointer group"
                    onClick={() => setSelectedSkill(skill)}
                  >
                    <div
                      className={`h-24 rounded-xl bg-gradient-to-br from-${skillColorClass}-500 to-${skillColorClass}-600 p-3 transition-all duration-200 group-hover:scale-105 group-hover:shadow-lg border border-${skillColorClass}-400/20`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-white text-sm leading-tight">{skill.name}</h3>
                        <div className="bg-white/20 backdrop-blur-sm rounded-full h-6 w-6 flex items-center justify-center">
                          <span className="text-xs font-bold text-white">{skill.value}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <span className="inline-block bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md font-medium">
                          {skillLabel}
                        </span>
                        <span className="flex items-center">{getTrendIcon(skill.trend)}</span>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Skill Details */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          {selectedSkill ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900">{selectedSkill.name}</h3>
                <div
                  className={`h-10 w-10 rounded-xl bg-gradient-to-br from-${getSkillColorClass(selectedSkill.value)}-500 to-${getSkillColorClass(selectedSkill.value)}-600 flex items-center justify-center text-white font-bold shadow-sm`}
                >
                  {selectedSkill.value}
                </div>
              </div>

              <p className="text-sm text-slate-600 mb-4">{selectedSkill.description}</p>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Skill Level</span>
                  <span className="text-xs font-bold text-slate-700">{getSkillLabel(selectedSkill.value)}</span>
                </div>
                <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r from-${getSkillColorClass(selectedSkill.value)}-400 to-${getSkillColorClass(selectedSkill.value)}-500 transition-all duration-500`}
                    style={{ width: `${selectedSkill.value * 10}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-slate-400">0</span>
                  <span className="text-xs text-slate-400">10</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Trend</span>
                  {getTrendIcon(selectedSkill.trend)}
                </div>
                <span
                  className={`text-sm font-medium ${
                    selectedSkill.trend === "up"
                      ? "text-emerald-600"
                      : selectedSkill.trend === "down"
                        ? "text-red-600"
                        : "text-slate-600"
                  }`}
                >
                  {selectedSkill.trend === "up"
                    ? "Improving"
                    : selectedSkill.trend === "down"
                      ? "Needs Focus"
                      : "Stable"}
                </span>
              </div>

              <button
                className={`w-full py-3 rounded-xl text-sm font-semibold transition-all bg-gradient-to-r from-${getSkillColorClass(selectedSkill.value)}-500 to-${getSkillColorClass(selectedSkill.value)}-600 text-white hover:shadow-lg`}
              >
                <Target size={14} className="inline mr-2" />
                Train This Skill
              </button>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-slate-900 mb-4">Skill Insights</h3>

              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Trophy size={14} className="text-amber-500" />
                    Top Skills
                  </h4>
                  <div className="space-y-2">
                    {topSkills.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">{skill.name}</span>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-semibold text-${getSkillColorClass(skill.value)}-600`}>
                            {skill.value}
                          </span>
                          <Star
                            size={12}
                            className={`${skill.value >= 8.5 ? "text-amber-500 fill-amber-500" : "text-slate-400"}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white p-3 rounded-lg border border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                    <Target size={14} className="text-sky-500" />
                    Focus Areas
                  </h4>
                  <div className="space-y-2">
                    {improvementSkills.map((skill) => (
                      <div key={skill.name} className="flex justify-between items-center">
                        <span className="text-sm text-slate-600">{skill.name}</span>
                        <div className="flex items-center gap-1">
                          <span className={`text-sm font-semibold text-${getSkillColorClass(skill.value)}-600`}>
                            {skill.value}
                          </span>
                          {getTrendIcon(skill.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-sky-50 p-3 rounded-lg border border-sky-200">
                <div className="flex items-start gap-2">
                  <Info size={14} className="text-sky-500 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-sky-700">
                    Click on any skill tile to see detailed analysis, training recommendations, and progress tracking.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap justify-between items-center">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            <span className="text-xs text-slate-600">8.5-10: Elite</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-sky-500"></div>
            <span className="text-xs text-slate-600">7.5-8.5: Advanced</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span className="text-xs text-slate-600">6-7.5: Proficient</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-slate-600">4-6: Developing</span>
          </div>
        </div>
        <button className="text-sky-600 text-sm font-semibold flex items-center hover:text-sky-700 transition-colors mt-2 md:mt-0">
          View Full Report
          <ChevronRight size={14} className="ml-1" />
        </button>
      </div>
    </div>
  )
}
