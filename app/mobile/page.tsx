"use client"

import { useState } from "react"
import { User, Home, Calendar, MessageSquare, Settings, ChevronRight, Target } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import RecentBookings from "../../components/dashboard/mobile/RecentBookings"
import FeedbackSection from "../../components/dashboard/mobile/FeedbackSection"

const MobilePage = () => {
  const [selectedTab, setSelectedTab] = useState("home")

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold">Good Morning, John!</h1>
            <p className="text-sm text-gray-500">Ready to train?</p>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedTab === "home" && (
          <div className="space-y-6 pb-6">
            {/* User Level Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mx-4">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <User size={20} className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Level 2</h3>
                  <p className="text-sm text-gray-600">Tennis Enthusiast</p>
                </div>
              </div>
            </div>

            {/* Featured Coaches Preview */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Featured Coaches</h3>
                <Link href="/mobile/coaches" className="text-purple-600 text-sm font-medium flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-2">
                {/* Coach Card - Example */}
                <div className="w-48 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/28347943?v=4" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h4 className="mt-2 font-semibold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Tennis Coach</p>
                </div>
                {/* Add more coach cards here */}
                <div className="w-48 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/28347943?v=4" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h4 className="mt-2 font-semibold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Tennis Coach</p>
                </div>
                <div className="w-48 bg-white rounded-xl p-3 shadow-sm border border-gray-100">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src="https://avatars.githubusercontent.com/u/28347943?v=4" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <h4 className="mt-2 font-semibold text-gray-900">John Doe</h4>
                  <p className="text-sm text-gray-600">Tennis Coach</p>
                </div>
              </div>
            </div>

            {/* Featured Academies Preview */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Featured Academies</h3>
                <Link href="/mobile/academies" className="text-purple-600 text-sm font-medium flex items-center">
                  View All <ChevronRight size={16} />
                </Link>
              </div>

              <div className="flex space-x-4 overflow-x-auto pb-2">
                {/* Academy Card - Example */}
                <div className="w-64 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="h-20 w-full bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                    <Skeleton className="h-16 w-16 rounded-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Tennis Academy Name</h4>
                  <p className="text-sm text-gray-600">Location, City</p>
                </div>
                {/* Add more academy cards here */}
                <div className="w-64 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="h-20 w-full bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                    <Skeleton className="h-16 w-16 rounded-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Tennis Academy Name</h4>
                  <p className="text-sm text-gray-600">Location, City</p>
                </div>
                <div className="w-64 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="h-20 w-full bg-gray-100 rounded-xl mb-2 flex items-center justify-center">
                    <Skeleton className="h-16 w-16 rounded-xl" />
                  </div>
                  <h4 className="font-semibold text-gray-900">Tennis Academy Name</h4>
                  <p className="text-sm text-gray-600">Location, City</p>
                </div>
              </div>
            </div>

            {/* Roadmap Section */}
            <div className="px-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Learning Path</h3>
                <Link href="/mobile/roadmap" className="text-purple-600 text-sm font-medium flex items-center">
                  View Roadmap <ChevronRight size={16} />
                </Link>
              </div>

              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-100 flex items-center justify-center">
                    <Target size={20} className="text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Advanced Techniques</h4>
                    <p className="text-sm text-gray-600">Level 3 • Tennis</p>
                    <div className="bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-purple-500 h-2 rounded-full w-2/3"></div>
                    </div>
                  </div>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">65%</span>
                </div>
              </div>
            </div>

            {/* Recent Bookings */}
            <RecentBookings />

            {/* Feedback Section */}
            <FeedbackSection />
          </div>
        )}

        {selectedTab === "bookings" && <div>Bookings Content</div>}
        {selectedTab === "messages" && <div>Messages Content</div>}
        {selectedTab === "settings" && <div>Settings Content</div>}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white p-4 shadow-md border-t border-gray-200">
        <div className="flex justify-around">
          <button
            onClick={() => setSelectedTab("home")}
            className={cn("flex flex-col items-center", selectedTab === "home" ? "text-purple-600" : "text-gray-500")}
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </button>
          <button
            onClick={() => setSelectedTab("bookings")}
            className={cn(
              "flex flex-col items-center",
              selectedTab === "bookings" ? "text-purple-600" : "text-gray-500",
            )}
          >
            <Calendar size={20} />
            <span className="text-xs">Bookings</span>
          </button>
          <button
            onClick={() => setSelectedTab("messages")}
            className={cn(
              "flex flex-col items-center",
              selectedTab === "messages" ? "text-purple-600" : "text-gray-500",
            )}
          >
            <MessageSquare size={20} />
            <span className="text-xs">Messages</span>
          </button>
          <button
            onClick={() => setSelectedTab("settings")}
            className={cn(
              "flex flex-col items-center",
              selectedTab === "settings" ? "text-purple-600" : "text-gray-500",
            )}
          >
            <Settings size={20} />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default MobilePage
