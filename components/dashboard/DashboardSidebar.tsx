"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  User,
  Heart,
  Bell,
  Award,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart2,
  Trophy,
  Users,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Progress Tracker", href: "/dashboard/progress", icon: BarChart2 },
    { name: "Competitions", href: "/dashboard/competitions", icon: Trophy },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Users },
    { name: "Achievements", href: "/dashboard/achievements", icon: Award },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Profile", href: "/dashboard/profile", icon: User },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full bg-emerald-600 text-white shadow-lg"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-screen w-64 bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out lg:static lg:z-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-100">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image src="/Logo.svg" alt="FutureSportler" fill className="object-contain" />
              </div>
              <span className="text-xl font-bold text-emerald-600">FutureSportler</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? "bg-emerald-50 text-emerald-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-emerald-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon size={20} className={`mr-3 ${isActive ? "text-emerald-600" : "text-gray-500"}`} />
                      <span className="font-medium">{item.name}</span>
                      {item.name === "Notifications" && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                          3
                        </span>
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-emerald-100">
                <Image src="/placeholder.svg?height=40&width=40&text=MS" alt="User" fill className="object-cover" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-800">Mushir S.</p>
                <p className="text-xs text-gray-500">Badminton Enthusiast</p>
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <LogOut size={16} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}
