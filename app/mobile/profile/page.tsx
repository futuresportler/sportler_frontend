"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  User,
  Settings,
  Bell,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
  Edit,
  Star,
  Trophy,
  Calendar,
} from "lucide-react"

export default function ProfilePage() {
  const [user] = useState({
    name: "Mushir Shaikh",
    email: "mushir@example.com",
    phone: "+91 98765 43210",
    avatar: "/placeholder.svg?height=80&width=80&text=MS",
    memberSince: "January 2024",
    totalSessions: 45,
    rating: 4.8,
    achievements: 12,
  })

  const menuItems = [
    {
      icon: User,
      label: "Edit Profile",
      href: "/mobile/profile/edit",
      color: "text-blue-600",
    },
    {
      icon: Calendar,
      label: "My Schedule",
      href: "/mobile/bookings",
      color: "text-emerald-600",
    },
    {
      icon: CreditCard,
      label: "Payment Methods",
      href: "/mobile/profile/payments",
      color: "text-purple-600",
    },
    {
      icon: Bell,
      label: "Notifications",
      href: "/mobile/profile/notifications",
      color: "text-orange-600",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/mobile/profile/settings",
      color: "text-gray-600",
    },
    {
      icon: HelpCircle,
      label: "Help & Support",
      href: "/mobile/profile/help",
      color: "text-indigo-600",
    },
  ]

  const stats = [
    { label: "Sessions", value: user.totalSessions, icon: Calendar, color: "bg-blue-500" },
    { label: "Rating", value: user.rating, icon: Star, color: "bg-yellow-500" },
    { label: "Achievements", value: user.achievements, icon: Trophy, color: "bg-emerald-500" },
  ]

  return (
    <div className="space-y-6 pb-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 px-4 py-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-2xl overflow-hidden bg-white/20 backdrop-blur-sm">
                <Image
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  width={80}
                  height={80}
                  className="object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 h-8 w-8 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <Edit size={14} className="text-gray-600" />
              </button>
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold mb-1">{user.name}</h2>
              <p className="text-emerald-100 text-sm mb-1">{user.email}</p>
              <p className="text-emerald-100 text-xs">Member since {user.memberSince}</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="bg-white/15 backdrop-blur-sm rounded-2xl p-3 text-center">
                  <Icon size={20} className="text-white mx-auto mb-2" />
                  <p className="text-lg font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-emerald-100">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/mobile/bookings">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                <Calendar size={20} className="text-emerald-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">My Bookings</h4>
              <p className="text-xs text-gray-600">View your sessions</p>
            </div>
          </Link>

          <Link href="/mobile/achievements">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
              <div className="h-10 w-10 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
                <Trophy size={20} className="text-yellow-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">Achievements</h4>
              <p className="text-xs text-gray-600">View your progress</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-4">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Account</h3>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <Link key={index} href={item.href}>
                <div className="flex items-center space-x-4 p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0">
                  <div className="h-10 w-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon size={18} className={item.color} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.label}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Logout */}
      <div className="px-4">
        <button className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-center space-x-3">
            <LogOut size={18} className="text-red-600" />
            <span className="font-medium text-red-600">Sign Out</span>
          </div>
        </button>
      </div>

      {/* App Version */}
      <div className="px-4 text-center">
        <p className="text-xs text-gray-500">FutureSportler v1.0.0</p>
      </div>
    </div>
  )
}
