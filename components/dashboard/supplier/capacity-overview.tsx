"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface SportCapacity {
  sport: string
  maxCapacity: number
  utilized: number
  openSpots: number
  status: "Available" | "Almost Full" | "Full"
}

interface CapacityOverviewProps {
  data?: SportCapacity[]
}

// Default data that would be replaced by API data in a real application
const defaultData: SportCapacity[] = [
  {
    sport: "Cricket",
    maxCapacity: 120,
    utilized: 98,
    openSpots: 22,
    status: "Almost Full",
  },
  {
    sport: "Football",
    maxCapacity: 80,
    utilized: 45,
    openSpots: 35,
    status: "Available",
  },
  {
    sport: "Basketball",
    maxCapacity: 60,
    utilized: 60,
    openSpots: 0,
    status: "Full",
  },
  {
    sport: "Tennis",
    maxCapacity: 40,
    utilized: 28,
    openSpots: 12,
    status: "Available",
  },
  {
    sport: "Swimming",
    maxCapacity: 50,
    utilized: 32,
    openSpots: 18,
    status: "Available",
  },
]

export function CapacityOverview({ data = defaultData }: CapacityOverviewProps) {
  const [capacityData, setCapacityData] = useState(data)
  const [timeframe, setTimeframe] = useState("weekly")

  // Update data when props change
  useEffect(() => {
    setCapacityData(data)
  }, [data])

  // This would be replaced with an API call in a real application
  const handleTimeframeChange = (newTimeframe: string) => {
    setTimeframe(newTimeframe)
    // In a real app, you would fetch new data based on the timeframe
    // For now, we'll just use the same data
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Capacity Overview by Sport</h2>
        <div>
          <button
            className={`text-sm ${timeframe === "weekly" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"} px-2 py-1 rounded`}
            onClick={() => handleTimeframeChange("weekly")}
          >
            Weekly
          </button>
          <button
            className={`text-sm ${timeframe === "monthly" ? "text-blue-600 font-medium" : "text-gray-500 hover:text-gray-700"} px-2 py-1 rounded`}
            onClick={() => handleTimeframeChange("monthly")}
          >
            Monthly
          </button>
        </div>
      </div>
      <div className="relative h-48 overflow-hidden rounded-lg">
        <Image src="/sports-academy-layout.png" alt="Capacity Overview" fill className="object-cover" />
      </div>
      <table className="w-full mt-4">
        <thead>
          <tr className="text-left text-gray-500">
            <th>Sport</th>
            <th>Max Capacity</th>
            <th>Utilized</th>
            <th>Open Spots</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {capacityData.map((item, index) => (
            <tr key={index}>
              <td>{item.sport}</td>
              <td>{item.maxCapacity}</td>
              <td>{item.utilized}</td>
              <td>{item.openSpots}</td>
              <td>
                <span
                  className={`
                  px-2 py-1 rounded-full text-xs
                  ${
                    item.status === "Available"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Almost Full"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
                  }
                `}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
