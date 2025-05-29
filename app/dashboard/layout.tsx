"use client"
import type { ReactNode } from "react"
import { useState, useEffect } from "react"
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

        {/* Scrollable Content with margin-left and gap */}
        <main className="md:ml-[300px] w-full p-3 md:p-5 overflow-y-auto max-h-screen">
          {/* 270px = 256px (w-64) + 14px (~10px gap) */}
          {children}
        </main>
      </div>
    </div>
  )
}
