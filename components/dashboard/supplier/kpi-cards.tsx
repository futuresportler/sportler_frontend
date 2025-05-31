"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Calendar, Users, TrendingUp, AlertCircle, Loader2 } from "lucide-react"
import { getSupplierAnalyticsOverview } from "@/services/analyticsService"
import { toast } from "@/hooks/use-toast"

interface KpiCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  trend?: string
  trendValue?: string
  color?: "emerald" | "blue" | "indigo" | "red" | "amber" | "purple"
  loading?: boolean
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
  refreshTrigger?: number
}

export function KpiCards({ data, refreshTrigger }: KpiCardsProps) {
  const [loading, setLoading] = useState(true)
  const [kpiData, setKpiData] = useState<KpiData>({
    totalRevenue: "₹0",
    totalEnrollments: 0,
    overallCapacity: "0%",
    feeReminders: 0,
    revenueChange: "0%",
    enrollmentsChange: "0%",
    capacityChange: "0%",
    remindersChange: "0%",
  })

  const fetchKpiData = async () => {
    try {
      setLoading(true)
      const result = await getSupplierAnalyticsOverview(6)

      if (result.success && result.data) {
        const analyticsData = result.data

        // Calculate total revenue from monthly breakdown
        const totalRevenue = analyticsData.monthlyBreakdown?.reduce((sum, month) => sum + month.revenue, 0) || 0

        // Calculate total bookings from monthly breakdown
        const totalBookings = analyticsData.monthlyBreakdown?.reduce((sum, month) => sum + month.bookings, 0) || 0

        // Calculate growth rates (comparing last month to previous month)
        const monthlyData = analyticsData.monthlyBreakdown || []
        const lastMonth = monthlyData[monthlyData.length - 1]
        const previousMonth = monthlyData[monthlyData.length - 2]

        const revenueGrowth =
          previousMonth && lastMonth
            ? (((lastMonth.revenue - previousMonth.revenue) / previousMonth.revenue) * 100).toFixed(1)
            : "0"

        const bookingsGrowth =
          previousMonth && lastMonth
            ? (((lastMonth.bookings - previousMonth.bookings) / previousMonth.bookings) * 100).toFixed(1)
            : "0"

        setKpiData({
          totalRevenue: `₹${totalRevenue.toLocaleString()}`,
          totalEnrollments: totalBookings,
          overallCapacity: "75%", // This would come from capacity analytics
          feeReminders: 0, // This would come from fee management system
          revenueChange: `${revenueGrowth}%`,
          enrollmentsChange: `${bookingsGrowth}%`,
          capacityChange: "2.1%", // This would come from capacity analytics
          remindersChange: "0%", // This would come from fee management system
        })
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch KPI data",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching KPI data:", error)
      toast({
        title: "Error",
        description: "Failed to fetch KPI data",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchKpiData()
  }, [refreshTrigger])

  // Use provided data if available, otherwise use fetched data
  const displayData = data || kpiData

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <KpiCard
        title="Total Revenue"
        value={displayData.totalRevenue}
        icon={<TrendingUp size={20} className="text-emerald-500" />}
        trend="from last month"
        trendValue={displayData.revenueChange}
        color="emerald"
        loading={loading}
      />
      <KpiCard
        title="Total Enrollments"
        value={displayData.totalEnrollments}
        icon={<Users size={20} className="text-blue-500" />}
        trend="from last month"
        trendValue={displayData.enrollmentsChange}
        color="blue"
        loading={loading}
      />
      <KpiCard
        title="Overall Capacity"
        value={displayData.overallCapacity}
        icon={<Calendar size={20} className="text-indigo-500" />}
        trend="from last month"
        trendValue={displayData.capacityChange}
        color="indigo"
        loading={loading}
      />
      <KpiCard
        title="Fee Reminders"
        value={displayData.feeReminders}
        icon={<AlertCircle size={20} className="text-red-500" />}
        trend="from last month"
        trendValue={displayData.remindersChange}
        color="red"
        loading={loading}
      />
    </div>
  )
}

function KpiCard({ title, value, icon, trend, trendValue, color = "emerald", loading }: KpiCardProps) {
  // Determine background color based on the explicit color prop
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
          {trend && trendValue && !loading && (
            <p className={`text-sm ${trendColor} mt-1`}>
              <span className="font-medium">{trendValue}</span> {trend}
            </p>
          )}
        </div>
        <div className={`p-2 rounded-full ${iconBgColor}`}>
          {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : icon}
        </div>
      </div>
      <div className="mt-4">
        {loading ? (
          <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
        ) : (
          <span className={`text-3xl font-bold ${textColor}`}>{value}</span>
        )}
      </div>
    </div>
  )
}
