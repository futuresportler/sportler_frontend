"use client"

import { useState, useEffect } from "react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

interface RevenueChartProps {
  data?: Array<{
    month: string
    revenue: number
    bookings: number
  }>
}

// This would be fetched from an API in a real application
const defaultRevenueData = [
  { month: "Jan", revenue: 25000, bookings: 120 },
  { month: "Feb", revenue: 30000, bookings: 145 },
  { month: "Mar", revenue: 42000, bookings: 180 },
  { month: "Apr", revenue: 38000, bookings: 165 },
  { month: "May", revenue: 50000, bookings: 210 },
  { month: "Jun", revenue: 45000, bookings: 190 },
  { month: "Jul", revenue: 55000, bookings: 230 },
  { month: "Aug", revenue: 60000, bookings: 250 },
  { month: "Sep", revenue: 58000, bookings: 240 },
  { month: "Oct", revenue: 70000, bookings: 280 },
  { month: "Nov", revenue: 65000, bookings: 260 },
  { month: "Dec", revenue: 75000, bookings: 300 },
]

export function RevenueChart({ data = defaultRevenueData }: RevenueChartProps) {
  const [chartData, setChartData] = useState(data)

  // Update chart data when props change
  useEffect(() => {
    setChartData(data)
  }, [data])

  return (
    <Card className="bg-white shadow-md rounded-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Revenue Trend</CardTitle>
        <CardDescription className="text-sm text-gray-500">Monthly revenue and bookings</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[280px] w-full mt-4 mb-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis
                dataKey="month"
                tick={{ fill: "#4a5568" }}
                axisLine={{ stroke: "#cbd5e0" }}
                tickLine={{ stroke: "#cbd5e0" }}
                dy={10}
              />
              <YAxis
                yAxisId="left"
                tick={{ fill: "#4a5568" }}
                tickFormatter={(value) => `₹${value / 1000}k`}
                axisLine={{ stroke: "#cbd5e0" }}
                tickLine={{ stroke: "#cbd5e0" }}
                width={60}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fill: "#4a5568" }}
                axisLine={{ stroke: "#cbd5e0" }}
                tickLine={{ stroke: "#cbd5e0" }}
                width={30}
              />
              <RechartsTooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                        <p className="font-medium text-gray-900">{label}</p>
                        <p className="text-indigo-700">Revenue: ₹{payload[0].value.toLocaleString()}</p>
                        <p className="text-teal-600">Bookings: {payload[1].value}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ paddingTop: "10px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#4338ca"
                strokeWidth={2}
                activeDot={{ r: 6, stroke: "#4338ca", strokeWidth: 1, fill: "#fff" }}
                name="Revenue (₹)"
                dot={{ stroke: "#4338ca", strokeWidth: 1, fill: "#fff", r: 3 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="bookings"
                stroke="#14b8a6"
                strokeWidth={2}
                activeDot={{ r: 6, stroke: "#14b8a6", strokeWidth: 1, fill: "#fff" }}
                name="Bookings"
                dot={{ stroke: "#14b8a6", strokeWidth: 1, fill: "#fff", r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
