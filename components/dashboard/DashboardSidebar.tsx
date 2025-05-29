"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Calendar,
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
  Search,
  Building,
  MapPin,
} from "lucide-react"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Explore Coaches", href: "/dashboard/explore/coaches", icon: Users },
    { name: "Explore Academies", href: "/dashboard/explore/academies", icon: Building },
    { name: "Explore Courts", href: "/dashboard/explore/courts", icon: MapPin },
    { name: "Roadmap", href: "/dashboard/progress", icon: BarChart2 },
    { name: "Competitions", href: "/dashboard/competitions", icon: Trophy },
    { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Search },
    { name: "Achievements", href: "/dashboard/achievements", icon: Award },
    { name: "Bookings", href: "/dashboard/bookings", icon: Calendar },
    { name: "Profile", href: "/dashboard/profile", icon: User },
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
          className="p-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all duration-200"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 h-screen w-72 bg-gradient-to-b from-white to-gray-50 shadow-xl z-40 transition-transform duration-300 ease-in-out lg:static lg:z-0 border-r border-gray-100`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-100 bg-white">
            <Link href="/dashboard" className="flex items-center">
              <div className="relative h-10 w-10 mr-3 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">FS</span>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  FutureSportler
                </span>
                <p className="text-xs text-gray-500">Sports Training Platform</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                        isActive
                          ? "bg-gradient-to-r from-emerald-500 to-blue-500 text-white shadow-lg"
                          : "text-gray-700 hover:bg-white hover:shadow-md hover:text-emerald-600"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon
                        size={20}
                        className={`mr-3 transition-colors ${
                          isActive ? "text-white" : "text-gray-500 group-hover:text-emerald-600"
                        }`}
                      />
                      <span className="font-medium">{item.name}</span>
                      {item.name === "Notifications" && (
                        <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                          3
                        </span>
                      )}
                      {isActive && <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-gray-100 bg-white">
            <div className="flex items-center mb-4">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-100 to-blue-100">
                <Image src="/placeholder.svg?height=48&width=48&text=MS" alt="User" fill className="object-cover" />
              </div>
              <div className="ml-3">
                <p className="font-semibold text-gray-900">Mushir S.</p>
                <p className="text-xs text-gray-500">Level 7 • Badminton Pro</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center px-4 py-3 text-sm text-gray-700 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium">
              <LogOut size={16} className="mr-2" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  )
}
