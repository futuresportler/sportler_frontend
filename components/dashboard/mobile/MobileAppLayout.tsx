"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Home, Search, User, Calendar, Bell, Trophy } from "lucide-react"

interface MobileAppLayoutProps {
  children: React.ReactNode
}

export default function MobileAppLayout({ children }: MobileAppLayoutProps) {
  const [activeTab, setActiveTab] = useState("home")
  const [showNotifications, setShowNotifications] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Set active tab based on current path
    if (pathname === "/") setActiveTab("home")
    else if (pathname.includes("/search")) setActiveTab("search")
    else if (pathname.includes("/dashboard")) setActiveTab("dashboard")
    else if (pathname.includes("/profile")) setActiveTab("profile")
  }, [pathname])

  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/",
      color: "text-emerald-500",
    },
    {
      id: "search",
      label: "Explore",
      icon: Search,
      href: "/mobile/search",
      color: "text-blue-500",
    },
    {
      id: "dashboard",
      label: "Dashboard",
      icon: Calendar,
      href: "/dashboard",
      color: "text-purple-500",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      color: "text-orange-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative h-8 w-8">
              <Image src="/Logo.svg" alt="FutureSportler" fill className="object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">FutureSportler</h1>
              <p className="text-xs text-gray-500">Your Sports Journey</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <Bell size={20} className="text-gray-600" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">3</span>
              </span>
            </button>

            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">MS</span>
            </div>
          </div>
        </div>

        {/* Notifications Dropdown */}
        {showNotifications && (
          <div className="absolute top-full right-4 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {[
                { title: "Training Session Reminder", time: "5 min ago", type: "calendar" },
                { title: "New Achievement Unlocked!", time: "1 hour ago", type: "trophy" },
                { title: "Coach Message", time: "2 hours ago", type: "message" },
              ].map((notification, index) => (
                <div key={index} className="p-4 border-b border-gray-50 hover:bg-gray-50">
                  <div className="flex items-start space-x-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      {notification.type === "calendar" && <Calendar size={16} className="text-emerald-600" />}
                      {notification.type === "trophy" && <Trophy size={16} className="text-yellow-600" />}
                      {notification.type === "message" && <User size={16} className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 h-16">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
                  isActive ? "bg-gray-50" : "hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <div
                  className={`p-1.5 rounded-lg transition-all duration-200 ${
                    isActive ? `bg-gradient-to-r from-emerald-400 to-blue-500` : ""
                  }`}
                >
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? "text-white" : "text-gray-500"}`}
                  />
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-200 ${
                    isActive ? "text-emerald-600" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
