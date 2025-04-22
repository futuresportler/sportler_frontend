"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Bell, Search, ChevronDown, Calendar, Trophy, Sparkles } from "lucide-react"
import { getUserProfile, type UserProfile } from "@/services/dashboardService"
import { useSearchParams } from "next/navigation"

export default function DashboardHeader() {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [greeting, setGreeting] = useState("Hello")
  const [showUserMenu, setShowUserMenu] = useState(false)
  const searchParams = useSearchParams()
  const [selectedAcademyName, setSelectedAcademyName] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    async function loadUserProfile() {
      try {
        setLoading(true)
        const userData = await getUserProfile()
        setUser(userData)
        setError(null)
      } catch (err) {
        console.error("Error loading user profile:", err)
        setError("Failed to load user profile")
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  useEffect(() => {
    // Extract academy ID from URL
    const academyId = searchParams.get("academy")
    // Find the academy name based on the ID
    if (user && user.academies) {
      const academy = user.academies.find((a) => a.id === academyId)
      setSelectedAcademyName(academy ? academy.name : "Your Academy")
    }
  }, [searchParams, user])

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            {greeting}, {loading ? "Sportler" : user?.name?.split(" ")[0] || "Sportler"}!{" "}
            <Sparkles className="ml-2 text-yellow-500" size={24} />
          </h1>
          <p className="text-gray-600 mt-1">
            {selectedAcademyName
              ? `Viewing ${selectedAcademyName}`
              : "Track your progress and level up your sports journey"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 w-64"
            />
            <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Calendar size={20} />
            </button>

            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors">
              <Trophy size={20} />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 transition-colors rounded-full pl-2 pr-3 py-1"
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-200">
                <Image
                  src={user?.avatar || "/placeholder.svg?height=32&width=32&text=MS"}
                  alt="User avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-medium text-emerald-800 hidden md:inline-block">
                {loading ? "Loading..." : user?.name || "User"}
              </span>
              <ChevronDown size={16} className="text-emerald-600" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                <div className="p-3 border-b border-gray-100">
                  <p className="font-medium text-gray-800">{loading ? "Loading..." : user?.name || "User"}</p>
                  <p className="text-xs text-gray-500">{loading ? "Loading..." : user?.email || "user@example.com"}</p>
                </div>
                <ul className="py-2">
                  <li>
                    <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Profile
                    </a>
                  </li>
                  <li>
                    <a href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Settings
                    </a>
                  </li>
                  <li className="border-t border-gray-100 mt-2 pt-2">
                    <a href="/auth/signout" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                      Sign out
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-700">Current Level</p>
              <p className="text-xl font-bold text-gray-800">Beginner II</p>
            </div>
            <div className="bg-emerald-500 text-white p-2 rounded-full">
              <Trophy size={20} />
            </div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-700">Next Session</p>
              <p className="text-xl font-bold text-gray-800">Apr 20</p>
            </div>
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <Calendar size={20} />
            </div>
          </div>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-700">Streak</p>
              <p className="text-xl font-bold text-gray-800">7 Days</p>
            </div>
            <div className="bg-amber-500 text-white p-2 rounded-full">
              <Sparkles size={20} />
            </div>
          </div>
        </div>

        <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-700">Achievements</p>
              <p className="text-xl font-bold text-gray-800">5 Unlocked</p>
            </div>
            <div className="bg-purple-500 text-white p-2 rounded-full">
              <Trophy size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
