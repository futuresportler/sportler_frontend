"use client"

import { useState, useEffect } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface BookingSource {
  name: string
  value: number
  color: string
}

interface BookingSourcesChartProps {
  data?: BookingSource[]
  title?: string
}

// Default data that would be replaced by API data in a real application
const defaultData: BookingSource[] = [
  { name: "Direct", value: 540, color: "#2563eb" }, // Indigo-500
  { name: "Website", value: 620, color: "#059669" }, // Emerald-500
  { name: "Partner Apps", value: 210, color: "#8b5cf6" }, // Purple-500
  { name: "Referrals", value: 170, color: "#ea580c" }, // Orange-500
]

export function BookingSourcesChart({ data = defaultData, title }: BookingSourcesChartProps) {
  const [chartData, setChartData] = useState(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle>Booking Sources</CardTitle>
        <CardDescription>Distribution of bookings by platform</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} bookings`, "Count"]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
