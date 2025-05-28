"use client"

import { useState } from "react"
import { Calendar, MapPin, Users, Trophy, Clock, Lock } from "lucide-react"

export default function CompetitionsPage() {
  const [selectedTab, setSelectedTab] = useState("upcoming")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const tabs = [
    { id: "upcoming", label: "Upcoming", icon: "🚀", count: 6 },
    { id: "ongoing", label: "Live", icon: "🔴", count: 2 },
    { id: "completed", label: "Completed", icon: "✅", count: 12 },
  ]

  const categories = [
    { id: "all", label: "All Sports", icon: "🏆" },
    { id: "badminton", label: "Badminton", icon: "🏸" },
    { id: "tennis", label: "Tennis", icon: "🎾" },
    { id: "basketball", label: "Basketball", icon: "🏀" },
    { id: "football", label: "Football", icon: "⚽" },
  ]

  const competitions = {
    upcoming: [
      {
        id: 1,
        title: "City Badminton Championship",
        subtitle: "Open Tournament",
        date: "May 15-20, 2025",
        time: "9:00 AM onwards",
        location: "Central Sports Arena",
        participants: 128,
        maxParticipants: 128,
        prizePool: "₹50,000",
        registrationFee: "₹500",
        eligible: true,
        difficulty: "Intermediate",
        sport: "badminton",
        image: "/placeholder.svg?height=120&width=120&text=🏆",
        organizer: "Sports Authority",
        deadline: "May 10, 2025",
        features: ["Live Streaming", "Professional Referees", "Medals & Certificates"],
      },
      {
        id: 2,
        title: "Inter-Academy Tournament",
        subtitle: "Team Championship",
        date: "June 5-8, 2025",
        time: "10:00 AM - 6:00 PM",
        location: "Padukone Badminton Academy",
        participants: 64,
        maxParticipants: 96,
        prizePool: "₹25,000",
        registrationFee: "₹300",
        eligible: true,
        difficulty: "Beginner",
        sport: "badminton",
        image: "/placeholder.svg?height=120&width=120&text=🏸",
        organizer: "Academy Network",
        deadline: "May 30, 2025",
        features: ["Team Format", "Coaching Support", "Refreshments"],
      },
      {
        id: 3,
        title: "National Junior Championship",
        subtitle: "Elite Competition",
        date: "July 10-17, 2025",
        time: "8:00 AM - 8:00 PM",
        location: "National Sports Complex",
        participants: 45,
        maxParticipants: 64,
        prizePool: "₹1,00,000",
        registrationFee: "₹1,000",
        eligible: false,
        difficulty: "Advanced",
        sport: "badminton",
        image: "/placeholder.svg?height=120&width=120&text=🥇",
        organizer: "National Sports Federation",
        deadline: "June 15, 2025",
        features: ["National Recognition", "Ranking Points", "Media Coverage"],
        requirements: "Minimum State Level Participation Required",
      },
    ],
    ongoing: [
      {
        id: 4,
        title: "Weekend Warriors Cup",
        subtitle: "Live Tournament",
        date: "May 22-23, 2025",
        time: "Currently Live",
        location: "Sports Hub Arena",
        participants: 32,
        maxParticipants: 32,
        prizePool: "₹15,000",
        status: "Quarter Finals",
        sport: "tennis",
        image: "/placeholder.svg?height=120&width=120&text=🎾",
        liveMatches: 4,
      },
    ],
    completed: [
      {
        id: 5,
        title: "Spring Badminton League",
        subtitle: "Completed",
        date: "April 1-15, 2025",
        location: "Multiple Venues",
        participants: 96,
        yourRank: 8,
        totalPrize: "₹30,000",
        sport: "badminton",
        image: "/placeholder.svg?height=120&width=120&text=🏅",
        yourPrize: "₹2,000",
      },
    ],
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-700"
      case "Intermediate":
        return "bg-yellow-100 text-yellow-700"
      case "Advanced":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getSportIcon = (sport: string) => {
    switch (sport) {
      case "badminton":
        return "🏸"
      case "tennis":
        return "🎾"
      case "basketball":
        return "🏀"
      case "football":
        return "⚽"
      default:
        return "🏆"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white">
        <div className="px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
                <Trophy className="text-yellow-400" size={36} />
                Competitions
              </h1>
              <p className="text-purple-100 text-lg">Join tournaments and showcase your skills!</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-purple-100">Participated</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-purple-100">Won</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold">₹8,500</div>
                <div className="text-sm text-purple-100">Prize Money</div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold">85</div>
                <div className="text-sm text-purple-100">Ranking Points</div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    selectedTab === tab.id
                      ? "bg-white text-purple-600 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  <span className="bg-white/30 text-xs px-2 py-0.5 rounded-full">{tab.count}</span>
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-purple-100 hover:bg-white/20"
                  }`}
                >
                  {category.icon} {category.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Competitions Content */}
      <div className="px-4 md:px-6 py-6 md:py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitions[selectedTab as keyof typeof competitions].map((competition: any) => (
              <div
                key={competition.id}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden transition-all hover:shadow-xl hover:scale-105 ${
                  !competition.eligible && selectedTab === "upcoming" ? "opacity-75" : ""
                }`}
              >
                {/* Competition Image & Status */}
                <div className="relative h-32 bg-gradient-to-br from-purple-400 to-pink-400">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">{getSportIcon(competition.sport)}</div>
                  </div>

                  {selectedTab === "upcoming" && (
                    <div className="absolute top-3 right-3">
                      {competition.eligible ? (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          ✅ Eligible
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                          <Lock size={10} />
                          Locked
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTab === "ongoing" && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium animate-pulse">
                        🔴 LIVE
                      </div>
                    </div>
                  )}

                  {selectedTab === "completed" && competition.yourRank && (
                    <div className="absolute top-3 right-3">
                      <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        #{competition.yourRank} Place
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3">
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(competition.difficulty || "")}`}
                    >
                      {competition.difficulty}
                    </div>
                  </div>
                </div>

                {/* Competition Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-lg text-gray-900 mb-1">{competition.title}</h3>
                    <p className="text-sm text-gray-600">{competition.subtitle}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-purple-500" />
                      <span>{competition.date}</span>
                    </div>

                    {competition.time && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock size={16} className="mr-2 text-purple-500" />
                        <span>{competition.time}</span>
                      </div>
                    )}

                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin size={16} className="mr-2 text-purple-500" />
                      <span>{competition.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-purple-500" />
                      <span>
                        {competition.participants}
                        {competition.maxParticipants && `/${competition.maxParticipants}`} participants
                      </span>
                    </div>
                  </div>

                  {/* Prize & Registration */}
                  {selectedTab === "upcoming" && (
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Prize Pool</span>
                        <span className="font-bold text-purple-600">{competition.prizePool}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Registration</span>
                        <span className="font-bold text-gray-900">{competition.registrationFee}</span>
                      </div>
                    </div>
                  )}

                  {selectedTab === "ongoing" && (
                    <div className="bg-red-50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Current Stage</span>
                        <span className="font-bold text-red-600">{competition.status}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Live Matches</span>
                        <span className="font-bold text-gray-900">{competition.liveMatches}</span>
                      </div>
                    </div>
                  )}

                  {selectedTab === "completed" && competition.yourPrize && (
                    <div className="bg-green-50 rounded-xl p-4 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Your Prize</span>
                        <span className="font-bold text-green-600">{competition.yourPrize}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Final Rank</span>
                        <span className="font-bold text-gray-900">#{competition.yourRank}</span>
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {selectedTab === "upcoming" && (
                    <div className="space-y-2">
                      {competition.eligible ? (
                        <>
                          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl">
                            🚀 Register Now
                          </button>
                          <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium transition-colors">
                            📋 View Details
                          </button>
                        </>
                      ) : (
                        <div className="text-center">
                          <button className="w-full bg-gray-200 text-gray-500 py-3 px-4 rounded-xl font-medium cursor-not-allowed flex items-center justify-center gap-2">
                            <Lock size={16} />
                            {competition.requirements || "Requirements Not Met"}
                          </button>
                          <p className="text-xs text-gray-500 mt-2">Complete more tournaments to unlock</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedTab === "ongoing" && (
                    <div className="space-y-2">
                      <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                        📺 Watch Live
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium transition-colors">
                        📊 View Bracket
                      </button>
                    </div>
                  )}

                  {selectedTab === "completed" && (
                    <div className="space-y-2">
                      <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                        📊 View Results
                      </button>
                      <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl text-sm font-medium transition-colors">
                        🔄 Join Similar
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {competitions[selectedTab as keyof typeof competitions].length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No competitions found</h3>
              <p className="text-gray-600 mb-6">
                {selectedTab === "upcoming"
                  ? "No upcoming competitions match your criteria"
                  : selectedTab === "ongoing"
                    ? "No live competitions at the moment"
                    : "You haven't participated in any competitions yet"}
              </p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-medium transition-colors">
                Explore Competitions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
