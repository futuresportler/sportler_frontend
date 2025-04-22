"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Calendar,
  MessageSquare,
  User,
  Heart,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Award,
  Trophy,
  BarChart2,
  Users,
} from "lucide-react"
import { getUserAcademies } from "@/services/dashboardService"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [academies, setAcademies] = useState([])
  const [selectedAcademy, setSelectedAcademy] = useState(null)
  const [isAcademyDropdownOpen, setIsAcademyDropdownOpen] = useState(false)

  useEffect(() => {
    async function loadAcademies() {
      const academyData = await getUserAcademies()
      setAcademies(academyData)
      setSelectedAcademy(academyData[0]?.id || null) // Select the first academy by default
    }

    loadAcademies()
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const toggleAcademyDropdown = () => {
    setIsAcademyDropdownOpen(!isAcademyDropdownOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/Logo.svg" alt="DreamSports" width={130} height={24} />
            </Link>
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase px-3 mb-2">Main Navigation</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700"
                  >
                    <Home size={18} className="mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/progress"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <BarChart2 size={18} className="mr-3" />
                    Progress Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/competitions"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Trophy size={18} className="mr-3" />
                    Competitions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/leaderboard"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Users size={18} className="mr-3" />
                    Leaderboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/achievements"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Award size={18} className="mr-3" />
                    Achievements
                  </Link>
                </li>
              </ul>
            </div>

            {/* Academy Dropdown */}
            {academies.length > 0 && (
              <div className="py-2">
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-3 mb-1">
                  <button
                    onClick={toggleAcademyDropdown}
                    className="flex items-center justify-between w-full text-sm font-bold text-gray-700 hover:text-emerald-600 transition-colors"
                  >
                    Your Academies
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${isAcademyDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                {isAcademyDropdownOpen && (
                  <ul className="mt-2 space-y-1 pl-2">
                    {academies.map((academy) => (
                      <li key={academy.id}>
                        <Link
                          href={`/dashboard/academy/${academy.id}`}
                          className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                            selectedAcademy === academy.id
                              ? "bg-emerald-50 text-emerald-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                          onClick={() => {
                            setSelectedAcademy(academy.id)
                            setIsSidebarOpen(false)
                          }}
                        >
                          <Image
                            src={academy.logo || "/placeholder.svg?height=24&width=24&text=A"}
                            alt={academy.name}
                            width={24}
                            height={24}
                            className="mr-3 rounded-full"
                          />
                          {academy.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/dashboard/find-academy"
                        className="flex items-center px-3 py-2 text-sm font-medium rounded-lg text-emerald-600 hover:bg-emerald-50"
                      >
                        <span className="w-6 h-6 mr-3 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                          +
                        </span>
                        Find New Academy
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            )}

            {/* Other Navigation */}
            <div className="border-t border-gray-200 pt-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase px-3 mb-2">Manage</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/dashboard/bookings"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Calendar size={18} className="mr-3" />
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/messages"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <MessageSquare size={18} className="mr-3" />
                    Messages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/favorites"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Heart size={18} className="mr-3" />
                    Favorites
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/notifications"
                    className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
                  >
                    <Bell size={18} className="mr-3" />
                    <span>Notifications</span>
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link
              href="/dashboard/settings"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Settings size={18} className="mr-3" />
              Settings
            </Link>
            <Link
              href="/auth/signin"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Mobile header */}
        <div className="lg:hidden bg-white p-4 border-b border-gray-200 flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-4" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Image src="/Logo.svg" alt="DreamSports" width={130} height={24} />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
