"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Trophy, Award, Star, Lock, ChevronRight, Dumbbell, Brain } from "lucide-react"

export default function SkillsPage() {
  const [selectedSkill, setSelectedSkill] = useState(null)

  const playerLevel = 7

  // Define skill tree data
  const skillTree = {
    beginner: {
      title: "Beginner",
      color: "emerald",
      icon: <Award className="text-emerald-500" size={24} />,
      unlocked: true,
      progress: 80,
      skills: [
        { id: "grip", name: "Basic Grip", completed: true },
        { id: "forehand", name: "Forehand Clear", completed: true },
        { id: "backhand", name: "Backhand Clear", completed: true },
        { id: "footwork", name: "Footwork Basics", completed: true },
        { id: "service", name: "Service", completed: true },
        { id: "netplay", name: "Net Play", completed: false },
        { id: "drive", name: "Drive", completed: false },
        { id: "drop", name: "Drop Shot", completed: false },
        { id: "smash", name: "Smash", completed: false },
        { id: "basic-strategy", name: "Basic Strategy", completed: false },
      ],
    },
    intermediate: {
      title: "Intermediate",
      color: "amber",
      icon: <Star className="text-amber-500" size={24} />,
      unlocked: true,
      progress: 30,
      skills: [
        { id: "adv-footwork", name: "Advanced Footwork", completed: true },
        { id: "deception", name: "Deceptive Shots", completed: true },
        { id: "adv-service", name: "Advanced Service", completed: true },
        { id: "defense", name: "Defensive Skills", completed: false },
        { id: "net-kill", name: "Net Kill", completed: false },
        { id: "jump-smash", name: "Jump Smash", completed: false },
        { id: "tactics", name: "Tactical Play", completed: false },
        { id: "doubles", name: "Doubles Play", completed: false },
        { id: "fitness", name: "Match Fitness", completed: false },
        { id: "mental", name: "Mental Toughness", completed: false },
      ],
    },
    advanced: {
      title: "Advanced",
      color: "blue",
      icon: <Trophy className="text-blue-500" size={24} />,
      unlocked: false,
      skills: [
        { id: "pro-footwork", name: "Professional Footwork", completed: false },
        { id: "adv-deception", name: "Advanced Deception", completed: false },
        { id: "shot-variation", name: "Shot Variation", completed: false },
        { id: "adv-defense", name: "Advanced Defense", completed: false },
        { id: "power-smash", name: "Power Smash", completed: false },
        { id: "adv-tactics", name: "Advanced Tactics", completed: false },
        { id: "match-analysis", name: "Match Analysis", completed: false },
        { id: "tournament", name: "Tournament Strategy", completed: false },
        { id: "elite-fitness", name: "Elite Fitness", completed: false },
        { id: "championship", name: "Championship Mindset", completed: false },
      ],
    },
  }

  // Skill detail data
  const skillDetails = {
    grip: {
      name: "Basic Grip",
      description: "Master the proper way to hold your racket for different shots.",
      icon: "✋",
      level: "Beginner",
      xpEarned: 50,
      completedOn: "March 15, 2025",
      stats: {
        technique: 8,
        control: 7,
        power: 4,
      },
      exercises: ["Forehand grip practice", "Backhand grip practice", "Switching grip drills"],
      nextSkills: ["forehand", "backhand"],
    },
    forehand: {
      name: "Forehand Clear",
      description: "Learn to hit powerful forehand clears to the back of the court.",
      icon: "💪",
      level: "Beginner",
      xpEarned: 75,
      completedOn: "March 22, 2025",
      stats: {
        technique: 7,
        control: 6,
        power: 8,
      },
      exercises: ["Shadow forehand practice", "Forehand clear drills", "Forehand accuracy training"],
      nextSkills: ["drop", "smash"],
    },
  }

  return (
    <div className="space-y-6">
      {/* Skill Tree Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Skill Tree</h1>
            <p className="text-gray-600">Master skills progressively to unlock new techniques and abilities</p>
          </div>

          <div className="bg-indigo-50 px-4 py-2 rounded-lg">
            <div className="text-xs text-indigo-500 uppercase tracking-wider font-medium">Total Progress</div>
            <div className="mt-1 flex items-center">
              <div className="flex-1 h-2 bg-indigo-100 rounded-full overflow-hidden mr-3">
                <div className="h-full bg-indigo-500 rounded-full" style={{ width: "42%" }} />
              </div>
              <span className="font-bold text-indigo-700">42%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skill Tree Visualization */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="flex items-center gap-4 mb-6 overflow-x-auto pb-2">
          <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
            <Award size={16} className="mr-1" />
            Beginner (8/10)
          </div>
          <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
            <Star size={16} className="mr-1" />
            Intermediate (3/10)
          </div>
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
            <Trophy size={16} className="mr-1" />
            Advanced (0/10)
          </div>
          <div className="bg-purple-50 text-purple-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
            <Brain size={16} className="mr-1" />
            Technical
          </div>
          <div className="bg-red-50 text-red-700 px-4 py-2 rounded-full font-medium text-sm flex items-center">
            <Dumbbell size={16} className="mr-1" />
            Physical
          </div>
        </div>

        <div className="relative min-h-[600px] border border-gray-200 rounded-lg p-4 mb-6">
          <div className="text-center text-gray-400 italic">
            Interactive skill tree visualization would be displayed here
          </div>
        </div>
      </div>

      {/* Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(skillTree).map(([key, level]) => (
          <div
            key={key}
            className={`bg-white rounded-xl shadow-sm border ${
              level.unlocked ? `border-${level.color}-200` : "border-gray-200 opacity-75"
            }`}
          >
            <div className={`p-4 rounded-t-xl ${level.unlocked ? `bg-${level.color}-50` : "bg-gray-50"}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  {level.icon}
                  <h2
                    className={`ml-2 text-xl font-bold ${level.unlocked ? `text-${level.color}-700` : "text-gray-500"}`}
                  >
                    {level.title}
                  </h2>
                </div>

                {!level.unlocked && (
                  <div className="bg-gray-200 rounded-full p-1">
                    <Lock size={16} className="text-gray-500" />
                  </div>
                )}
              </div>

              {level.unlocked && level.progress !== undefined && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={`text-${level.color}-600`}>Progress</span>
                    <span className={`text-${level.color}-600 font-medium`}>{level.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${level.progress}%` }}
                      transition={{ duration: 1 }}
                      className={`h-full bg-${level.color}-500 rounded-full`}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4">
              <div className="space-y-2">
                {level.skills.slice(0, 5).map((skill) => (
                  <div
                    key={skill.id}
                    className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-gray-50 ${
                      level.unlocked ? "" : "opacity-60"
                    }`}
                    onClick={() => level.unlocked && setSelectedSkill(skill.id)}
                  >
                    <div className="w-6 h-6 mr-2">
                      {level.unlocked ? (
                        skill.completed ? (
                          <div
                            className={`w-6 h-6 rounded-full bg-${level.color}-500 flex items-center justify-center`}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          </div>
                        ) : (
                          <div className={`w-6 h-6 rounded-full border-2 border-${level.color}-200`}></div>
                        )
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <Lock size={10} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <span
                      className={`${level.unlocked ? (skill.completed ? "text-gray-800" : "text-gray-600") : "text-gray-400"}`}
                    >
                      {skill.name}
                    </span>
                    {level.unlocked && skill.completed && (
                      <Star size={12} className={`ml-1 text-${level.color}-500 fill-${level.color}-500`} />
                    )}
                  </div>
                ))}
              </div>

              {level.skills.length > 5 && (
                <button
                  className={`mt-3 text-sm font-medium ${level.unlocked ? `text-${level.color}-600` : "text-gray-400"} flex items-center w-full justify-center`}
                >
                  See all {level.skills.length} skills <ChevronRight size={16} />
                </button>
              )}

              {!level.unlocked && (
                <div className="mt-4 bg-gray-100 rounded p-2 text-xs text-gray-600 text-center">
                  <Lock size={12} className="inline mr-1" />
                  Complete previous level to unlock
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Skill Detail Modal */}
      {selectedSkill && skillDetails[selectedSkill] && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="text-4xl mr-3">{skillDetails[selectedSkill].icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{skillDetails[selectedSkill].name}</h3>
                    <div className="text-sm text-gray-500">{skillDetails[selectedSkill].level} Skill</div>
                  </div>
                </div>
                <button onClick={() => setSelectedSkill(null)} className="text-gray-400 hover:text-gray-600">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <p className="text-gray-700 mb-4">{skillDetails[selectedSkill].description}</p>

              {skillDetails[selectedSkill].completedOn && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center">
                  <div className="bg-green-500 rounded-full p-1 text-white mr-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Mastered</div>
                    <div className="text-sm text-green-700">Completed on {skillDetails[selectedSkill].completedOn}</div>
                  </div>
                </div>
              )}

              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Skill Attributes</h4>
                <div className="space-y-2">
                  {Object.entries(skillDetails[selectedSkill].stats).map(([stat, value]) => (
                    <div key={stat} className="flex items-center">
                      <div className="w-24 text-sm text-gray-600 capitalize">{stat}</div>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${value * 10}%` }} />
                      </div>
                      <div className="ml-2 text-sm font-medium text-gray-700">{value}/10</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h4 className="font-medium text-gray-800 mb-2">Recommended Exercises</h4>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                  {skillDetails[selectedSkill].exercises.map((exercise, index) => (
                    <li key={index}>{exercise}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-2">XP Earned</h4>
                <div className="bg-amber-50 text-amber-700 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium">
                  <Trophy size={14} className="mr-1" />
                  {skillDetails[selectedSkill].xpEarned} XP
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 flex justify-between rounded-b-xl">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Practice Skill
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
