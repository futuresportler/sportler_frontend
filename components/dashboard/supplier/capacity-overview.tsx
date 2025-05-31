"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"

interface CapacityData {
  overall: number
  academies: number
  turfs: number
  trend: number
  peakHours: { time: string; utilization: number }[]
}

interface CapacityOverviewProps {
  data?: CapacityData
}

const defaultData: CapacityData = {
  overall: 72,
  academies: 68,
  turfs: 76,
  trend: -3.2,
  peakHours: [
    { time: "6-8 AM", utilization: 45 },
    { time: "8-10 AM", utilization: 62 },
    { time: "10-12 PM", utilization: 78 },
    { time: "12-2 PM", utilization: 55 },
    { time: "2-4 PM", utilization: 48 },
    { time: "4-6 PM", utilization: 85 },
    { time: "6-8 PM", utilization: 92 },
    { time: "8-10 PM", utilization: 74 },
  ],
}

export function CapacityOverview({ data = defaultData }: CapacityOverviewProps) {
  const [capacityData, setCapacityData] = useState(data)

  useEffect(() => {
    setCapacityData(data)
  }, [data])

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 80) return "text-red-600"
    if (utilization >= 60) return "text-yellow-600"
    return "text-green-600"
  }

  const getUtilizationBg = (utilization: number) => {
    if (utilization >= 80) return "bg-red-100"
    if (utilization >= 60) return "bg-yellow-100"
    return "bg-green-100"
  }

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Capacity Overview
        </CardTitle>
        <CardDescription>Current utilization across all facilities</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Overall Capacity */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Overall Capacity</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">{capacityData.overall}%</span>
              <Badge variant={capacityData.trend >= 0 ? "default" : "destructive"} className="text-xs">
                {capacityData.trend >= 0 ? (
                  <TrendingUp className="h-3 w-3 mr-1" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1" />
                )}
                {Math.abs(capacityData.trend)}%
              </Badge>
            </div>
          </div>
          <Progress value={capacityData.overall} className="h-2" />
        </div>

        {/* Facility Breakdown */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">By Facility Type</h4>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Academies</span>
              <span className="text-sm font-medium">{capacityData.academies}%</span>
            </div>
            <Progress value={capacityData.academies} className="h-1.5" />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">Turfs</span>
              <span className="text-sm font-medium">{capacityData.turfs}%</span>
            </div>
            <Progress value={capacityData.turfs} className="h-1.5" />
          </div>
        </div>

        {/* Peak Hours */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">Peak Hours Utilization</h4>
          <div className="grid grid-cols-2 gap-2">
            {capacityData.peakHours.map((hour, index) => (
              <div key={index} className={`p-2 rounded-lg ${getUtilizationBg(hour.utilization)}`}>
                <div className="text-xs font-medium">{hour.time}</div>
                <div className={`text-sm font-bold ${getUtilizationColor(hour.utilization)}`}>{hour.utilization}%</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 mb-2">Optimization Tips</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Consider dynamic pricing for peak hours (6-8 PM)</li>
            <li>• Promote off-peak slots with discounts</li>
            <li>• Add more capacity during high-demand periods</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
