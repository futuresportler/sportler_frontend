"use client"

import type React from "react"
import { Calendar, Users, TrendingUp, AlertCircle } from "lucide-react"

interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendValue?: string
  color?: "emerald" | "blue" | "indigo" | "red" | "amber" | "purple"
}

interface KpiData {
  totalRevenue: string | number
  totalEnrollments: number
  overallCapacity: string
  feeReminders: number
  revenueChange: string
  enrollmentsChange: string
  capacityChange: string
  remindersChange: string
}

interface KpiCardsProps {
  data?: KpiData
}

// Default data that would be replaced by API data in a real application
const defaultData: KpiData = {
  totalRevenue: "₹124,500",
  totalEnrollments: 342,
  overallCapacity: "72%",
  feeReminders: 28,
  revenueChange: "7.2%",
  enrollmentsChange: "5.3%",
  capacityChange: "2.1%",
  remindersChange: "12.5%",
}

export function KpiCards({ data = defaultData }: KpiCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KpiCard
        title="Total Revenue"
        value={data.totalRevenue}
        icon={<TrendingUp size={20} className="text-emerald-500" />}
        trend="from last month"
        trendValue={data.revenueChange}
        color="emerald"
      />
      <KpiCard
        title="Total Enrollments"
        value={data.totalEnrollments}
        icon={<Users size={20} className="text-blue-500" />}
        trend="from last month"
        trendValue={data.enrollmentsChange}
        color="blue"
      />
      <KpiCard
        title="Overall Capacity"
        value={data.overallCapacity}
        icon={<Calendar size={20} className="text-indigo-500" />}
        trend="from last month"
        trendValue={data.capacityChange}
        color="indigo"
      />
      <KpiCard
        title="Fee Reminders"
        value={data.feeReminders}
        icon={<AlertCircle size={20} className="text-red-500" />}
        trend="from last month"
        trendValue={data.remindersChange}
        color="red"
      />
    </div>
  )
}

function KpiCard({ title, value, icon, trend, trendValue, color = "emerald" }: KpiCardProps) {
  // Determine background color based on the explicit color prop instead of trying to parse the icon
  let bgColor = "bg-white"
  let borderColor = "border-gray-100"
  let iconBgColor = "bg-gray-100"
  let textColor = "text-gray-800"
  let trendColor = "text-gray-700"

  if (color === "emerald") {
    bgColor = "bg-emerald-50"
    borderColor = "border-emerald-200"
    iconBgColor = "bg-emerald-100"
    textColor = "text-emerald-800"
    trendColor = "text-emerald-600"
  } else if (color === "blue") {
    bgColor = "bg-blue-50"
    borderColor = "border-blue-200"
    iconBgColor = "bg-blue-100"
    textColor = "text-blue-800"
    trendColor = "text-blue-600"
  } else if (color === "indigo") {
    bgColor = "bg-indigo-50"
    borderColor = "border-indigo-200"
    iconBgColor = "bg-indigo-100"
    textColor = "text-indigo-800"
    trendColor = "text-indigo-600"
  } else if (color === "red") {
    bgColor = "bg-red-50"
    borderColor = "border-red-200"
    iconBgColor = "bg-red-100"
    textColor = "text-red-800"
    trendColor = "text-red-600"
  } else if (color === "amber") {
    bgColor = "bg-amber-50"
    borderColor = "border-amber-200"
    iconBgColor = "bg-amber-100"
    textColor = "text-amber-800"
    trendColor = "text-amber-600"
  } else if (color === "purple") {
    bgColor = "bg-purple-50"
    borderColor = "border-purple-200"
    iconBgColor = "bg-purple-100"
    textColor = "text-purple-800"
    trendColor = "text-purple-600"
  }

  return (
    <div className={`rounded-xl shadow-md p-4 border ${borderColor} ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{title}</h2>
          {trend && trendValue && (
            <p className={`text-sm ${trendColor} mt-1`}>
              <span className="font-medium">{trendValue}</span> {trend}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-full ${iconBgColor}`}>{icon}</div>
      </div>
      <div className="mt-4">
        <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
      </div>
    </div>
  )
}
