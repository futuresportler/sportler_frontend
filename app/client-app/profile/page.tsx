"use client"

import { useState } from "react"
import Image from "next/image"
import {
  User,
  Edit,
  Star,
  Trophy,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Camera,
  ChevronRight,
  Target,
  Clock,
  Award,
  TrendingUp,
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  const userStats = [
    { label: "Sessions Completed", value: "24", icon: Target, color: "text-blue-600" },
    { label: "Hours Trained", value: "48", icon: Clock, color: "text-emerald-600" },
    { label: "Achievements", value: "8", icon: Award, color: "text-purple-600" },
    { label: "Avg Rating", value: "4.9", icon: Star, color: "text-yellow-600" },
  ]

  const recentActivity = [
    {
      id: 1,
      type: "session",
      title: "Tennis Lesson Completed",
      subtitle: "with John Smith",
      date: "2 hours ago",
      icon: Trophy,
    },
    {
      id: 2,
      type: "achievement",
      title: "Achievement Unlocked",
      subtitle: "10 Sessions Milestone",
      date: "1 day ago",
      icon: Award,
    },
    {
      id: 3,
      type: "booking",
      title: "Court Booked",
      subtitle: "Badminton Court #3",
      date: "2 days ago",
      icon: Calendar,
    },
  ]

  const preferences = [
    { label: "Favorite Sports", value: "Tennis, Badminton" },
    { label: "Skill Level", value: "Intermediate" },
    { label: "Training Goals", value: "Fitness, Competition" },
    { label: "Preferred Time", value: "Evening (6-8 PM)" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white/20">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Profile"
                width={80}
                height={80}
                className="object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-white text-emerald-600 rounded-full flex items-center justify-center">
              <Camera size={14} />
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">Alex Johnson</h1>
            <p className="text-emerald-100">Sports Enthusiast</p>
            <div className="flex items-center mt-2">
              <MapPin size={14} className="mr-1" />
              <span className="text-sm text-emerald-100">New York, USA</span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
          >
            <Edit size={18} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <div key={index} className="bg-white/10 rounded-xl p-3 text-center">
                <IconComponent size={20} className="text-white mx-auto mb-1" />
                <div className="text-lg font-bold">{stat.value}</div>
                <div className="text-xs text-emerald-100">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6 space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
            <button className="text-emerald-600 text-sm font-medium">Edit</button>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <User size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-900">Alex Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">alex.johnson@email.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sports Preferences */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Sports Preferences</h2>
            <button className="text-emerald-600 text-sm font-medium">Edit</button>
          </div>
          <div className="space-y-3">
            {preferences.map((pref, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <span className="text-gray-600">{pref.label}</span>
                <span className="font-medium text-gray-900">{pref.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
            <button className="text-emerald-600 text-sm font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const IconComponent = activity.icon
              return (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <IconComponent size={18} className="text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{activity.title}</h3>
                    <p className="text-sm text-gray-500">{activity.subtitle}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.date}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Progress Overview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Progress Overview</h2>
            <button className="flex items-center text-emerald-600 text-sm font-medium">
              View Details
              <ChevronRight size={16} className="ml-1" />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Monthly Goal</span>
                <span className="text-sm font-medium text-gray-900">24/30 sessions</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "80%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Skill Progress</span>
                <span className="text-sm font-medium text-gray-900">Intermediate</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow">
            <TrendingUp size={24} className="text-emerald-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">View Progress</span>
          </button>
          <button className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center hover:shadow-md transition-shadow">
            <Trophy size={24} className="text-purple-600 mx-auto mb-2" />
            <span className="text-sm font-medium text-gray-900">Achievements</span>
          </button>
        </div>
      </div>
    </div>
  )
}
