"use client"

import type React from "react"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Home, Search, Calendar, User, Menu, Bell, ArrowLeft, Filter, X } from "lucide-react"

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationCount, setNotificationCount] = useState(3)

  // Get current page info
  const getCurrentPageInfo = () => {
    const segments = pathname.split("/").filter(Boolean)
    const currentPage = segments[segments.length - 1] || "home"

    const pageMap = {
      "client-app": { title: "Home", showBack: false },
      home: { title: "Home", showBack: false },
      explore: { title: "Explore", showBack: false },
      bookings: { title: "My Bookings", showBack: false },
      profile: { title: "Profile", showBack: false },
      more: { title: "More", showBack: false },
      coaches: { title: "Coaches", showBack: true },
      academies: { title: "Academies", showBack: true },
      courts: { title: "Courts", showBack: true },
      favorites: { title: "Favorites", showBack: true },
      achievements: { title: "Achievements", showBack: true },
      progress: { title: "Progress", showBack: true },
      settings: { title: "Settings", showBack: true },
      help: { title: "Help & Support", showBack: true },
    }

    return pageMap[currentPage] || { title: "Sportler", showBack: true }
  }

  const { title, showBack } = getCurrentPageInfo()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/client-app/search?q=${encodeURIComponent(searchQuery)}`)
      setIsSearchExpanded(false)
      setSearchQuery("")
    }
  }

  const handleBack = () => {
    router.back()
  }

  // Bottom navigation items
  const bottomNavItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      href: "/client-app",
      isActive: pathname === "/client-app" || pathname === "/client-app/home",
    },
    {
      id: "explore",
      label: "Explore",
      icon: Search,
      href: "/client-app/explore",
      isActive: pathname === "/client-app/explore",
    },
    {
      id: "bookings",
      label: "Bookings",
      icon: Calendar,
      href: "/client-app/bookings",
      isActive: pathname === "/client-app/bookings",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      href: "/client-app/profile",
      isActive: pathname === "/client-app/profile",
    },
    {
      id: "more",
      label: "More",
      icon: Menu,
      href: "/client-app/more",
      isActive: pathname === "/client-app/more",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Left side - Logo or Back button */}
          <div className="flex items-center">
            {showBack ? (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-2"
                aria-label="Go back"
              >
                <ArrowLeft size={20} className="text-gray-700" />
              </button>
            ) : (
              <Link href="/client-app" className="flex items-center">
                <Image src="/Logo.svg" alt="Sportler" width={100} height={20} priority />
              </Link>
            )}
          </div>

          {/* Center - Page Title */}
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-900 truncate">{title}</h1>
          </div>

          {/* Right side - Search, Notifications, Profile */}
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchExpanded(!isSearchExpanded)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700" />
            </button>

            {/* Notifications */}
            <button
              onClick={() => router.push("/client-app/notifications")}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
              aria-label="Notifications"
            >
              <Bell size={20} className="text-gray-700" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount > 9 ? "9+" : notificationCount}
                </span>
              )}
            </button>

            {/* Profile Avatar */}
            <button
              onClick={() => router.push("/client-app/profile")}
              className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 hover:border-emerald-500 transition-colors"
            >
              <Image
                src="/placeholder.svg?height=32&width=32"
                alt="Profile"
                width={32}
                height={32}
                className="object-cover"
              />
            </button>
          </div>
        </div>

        {/* Expandable Search Bar */}
        {isSearchExpanded && (
          <div className="px-4 pb-3 border-t border-gray-100 bg-gray-50">
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search coaches, academies, courts..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  autoFocus
                />
                <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="button"
                onClick={() => router.push("/client-app/filters")}
                className="p-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                aria-label="Filters"
              >
                <Filter size={18} />
              </button>
              <button
                type="button"
                onClick={() => setIsSearchExpanded(false)}
                className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-20">{children}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          {bottomNavItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-all duration-200 ${
                  item.isActive
                    ? "text-emerald-600 bg-emerald-50"
                    : "text-gray-500 hover:text-emerald-600 hover:bg-gray-50"
                }`}
              >
                <IconComponent size={20} className={item.isActive ? "text-emerald-600" : "text-gray-500"} />
                <span className={`text-xs mt-1 font-medium ${item.isActive ? "text-emerald-600" : "text-gray-500"}`}>
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
