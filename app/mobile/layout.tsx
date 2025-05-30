"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, Search, Calendar, User, Bell, Menu } from "lucide-react"

interface MobileLayoutProps {
  children: React.ReactNode
}

export default function MobileLayout({ children }: MobileLayoutProps) {
  const [activeTab, setActiveTab] = useState("explore")
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/mobile" || pathname === "/mobile/explore") setActiveTab("explore")
    else if (pathname.includes("/mobile/home")) setActiveTab("home")
    else if (pathname.includes("/mobile/bookings")) setActiveTab("bookings")
    else if (pathname.includes("/mobile/profile")) setActiveTab("profile")
  }, [pathname])

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/mobile/home",
      activeColor: "bg-blue-500",
      inactiveColor: "text-gray-500",
    },
    {
      id: "explore",
      label: "Explore",
      icon: Search,
      href: "/mobile/explore",
      activeColor: "bg-emerald-500",
      inactiveColor: "text-gray-500",
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: Calendar,
      href: "/mobile/bookings",
      activeColor: "bg-purple-500",
      inactiveColor: "text-gray-500",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/mobile/profile",
      activeColor: "bg-orange-500",
      inactiveColor: "text-gray-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col max-w-md mx-auto relative">
      {/* Status Bar Simulation */}
      <div className="h-6 bg-black flex items-center justify-between px-4 text-white text-xs">
        <span>9:41</span>
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
          </div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1 bg-white rounded-sm m-0.5"></div>
          </div>
        </div>
      </div>

      {/* App Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-6 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-8 w-8 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">FS</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FutureSportler</h1>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Bell size={18} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">2</span>
              </span>
            </button>

            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
              <Menu size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20 overflow-y-auto">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                className="flex flex-col items-center justify-center space-y-1 transition-all duration-200 hover:bg-gray-50"
                onClick={() => setActiveTab(item.id)}
              >
                <div
                  className={`p-2 rounded-xl transition-all duration-300 ${
                    isActive ? `${item.activeColor} shadow-lg transform scale-110` : "bg-transparent"
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? "text-white" : item.inactiveColor}`}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isActive ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 w-8 h-1 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-t-full"></div>
                )}
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
