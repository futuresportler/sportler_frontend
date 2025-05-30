"use client"
import type { ReactNode } from "react"
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
import ChatbotButton from "@/components/ChatbotButton"
import DashboardSidebar from "@/components/dashboard/DashboardSidebar"


export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="md:flex">
        {/* Fixed Sidebar */}
        <div className="hidden md:block fixed top-0 left-0 h-screen w-64 z-10">
          <DashboardSidebar />
        </div>
        <ChatbotButton />


        {/* Scrollable Content with margin-left and gap */}
        <main className="md:ml-[300px] w-full p-3 md:p-5 overflow-y-auto max-h-screen">
          {/* 270px = 256px (w-64) + 14px (~10px gap) */}
          {children}
        </main>
      </div>
    </div>
  )
}
