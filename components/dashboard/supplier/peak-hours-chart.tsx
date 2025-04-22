"use client"

import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface PeakHour {
  hour: string
  bookings: number
}

interface PeakHoursChartProps {
  data?: PeakHour[]
  title?: string
}

// Default data that would be replaced by API data in a real application
const defaultData: PeakHour[] = [
  { hour: "6-8 AM", bookings: 45 },
  { hour: "8-10 AM", bookings: 85 },
  { hour: "10-12 PM", bookings: 120 },
  { hour: "12-2 PM", bookings: 70 },
  { hour: "2-4 PM", bookings: 65 },
  { hour: "4-6 PM", bookings: 130 },
  { hour: "6-8 PM", bookings: 150 },
  { hour: "8-10 PM", bookings: 90 },
]

export function PeakHoursChart({ data = defaultData, title }: PeakHoursChartProps) {
  const [chartData, setChartData] = useState(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader>
        <CardTitle>Peak Hours Analysis</CardTitle>
        <CardDescription>Booking distribution by time of day</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="hour" tick={{ fill: "#4a5568" }} axisLine={{ stroke: "#e5e7eb" }} />
              <YAxis tick={{ fill: "#4a5568" }} axisLine={{ stroke: "#e5e7eb" }} />
              <Tooltip
                formatter={(value) => [`${value} bookings`, "Count"]}
                contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e5e7eb" }}
              />
              <Bar dataKey="bookings" fill="#6d28d9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
