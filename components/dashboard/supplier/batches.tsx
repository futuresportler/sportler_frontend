"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Batch {
  id: number
  batchTime: string
  schedule: string
  sport: string
  maxCapacity: number
  enrolled: number
  availableSlots: number
  coach: string
  fees: number
  ageGroup: string
}

interface BatchesProps {
  initialBatches?: Batch[]
  sportOptions?: string[]
  totalBatches?: number
  averageUtilization?: string
  openCapacity?: number
  utilizationTrend?: string
  openCapacityTrend?: string
}

// Default data that would be replaced by API data in a real application
const defaultBatches: Batch[] = [
  {
    id: 1,
    batchTime: "4:00 PM - 6:00 PM",
    schedule: "Mon, Wed, Fri",
    sport: "Cricket",
    maxCapacity: 30,
    enrolled: 24,
    availableSlots: 6,
    coach: "Vikram Singh",
    fees: 5000,
    ageGroup: "8-12",
  },
  {
    id: 2,
    batchTime: "5:00 PM - 7:00 PM",
    schedule: "Tue, Thu, Sat",
    sport: "Football",
    maxCapacity: 30,
    enrolled: 22,
    availableSlots: 8,
    coach: "Rahul Sharma",
    fees: 6000,
    ageGroup: "13-16",
  },
  {
    id: 3,
    batchTime: "7:00 PM - 9:00 PM",
    schedule: "Mon, Wed, Fri",
    sport: "Basketball",
    maxCapacity: 20,
    enrolled: 12,
    availableSlots: 8,
    coach: "Priya Patel",
    fees: 5500,
    ageGroup: "10-14",
  },
]

const defaultSportOptions = ["All Sports", "Cricket", "Football", "Basketball", "Tennis", "Swimming", "Athletics"]

export function Batches({
  initialBatches = defaultBatches,
  sportOptions = defaultSportOptions,
  totalBatches = 24,
  averageUtilization = "76%",
  openCapacity = 87,
  utilizationTrend = "4.2% from last month",
  openCapacityTrend = "12 fewer spots than last month",
}: BatchesProps) {
  const [batches, setBatches] = useState<Batch[]>(initialBatches)
  const [selectedSport, setSelectedSport] = useState("All Sports")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter batches based on selected sport and search query
  const filteredBatches = batches
    .filter((batch) => selectedSport === "All Sports" || batch.sport === selectedSport)
    .filter((batch) => {
      if (!searchQuery) return true
      const query = searchQuery.toLowerCase()
      return (
        batch.batchTime.toLowerCase().includes(query) ||
        batch.schedule.toLowerCase().includes(query) ||
        batch.sport.toLowerCase().includes(query) ||
        batch.coach.toLowerCase().includes(query) ||
        batch.ageGroup.toLowerCase().includes(query)
      )
    })

  // This would be replaced with an API call in a real application
  const handleAddBatch = () => {
    console.log("Adding new batch")
    // In a real app, you would open a modal or navigate to a form
  }

  // This would be replaced with an API call in a real application
  const handleEditBatch = (id: number) => {
    console.log(`Editing batch with ID: ${id}`)
    // In a real app, you would open a modal or navigate to a form
  }

  // This would be replaced with an API call in a real application
  const handleDeleteBatch = (id: number) => {
    console.log(`Deleting batch with ID: ${id}`)
    // In a real app, you would call an API endpoint and then update the state
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Batches</h2>
        <div>
          <Button variant="outline" size="sm" className="mr-2">
            <Filter size={16} className="mr-2" />
            Filter
          </Button>
          <Button size="sm" onClick={handleAddBatch}>
            + Add Batch
          </Button>
        </div>
      </div>

      <div className="flex space-x-4 overflow-x-auto mb-4">
        {sportOptions.map((sport) => (
          <button
            key={sport}
            className={`px-3 py-1 rounded-full ${
              selectedSport === sport ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setSelectedSport(sport)}
          >
            {sport}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Kpi title="Total Batches" value={totalBatches} trend={`${initialBatches.length} batches shown`} />
        <Kpi title="Average Utilization" value={averageUtilization} trend={utilizationTrend} />
        <Kpi title="Open Capacity" value={openCapacity} trend={openCapacityTrend} />
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-gray-800">All Batches</h3>
        <Input
          type="text"
          placeholder="Search batches..."
          className="w-64"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">S.No</TableHead>
              <TableHead>Batch Time</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Sport</TableHead>
              <TableHead>Max Capacity</TableHead>
              <TableHead>Enrolled</TableHead>
              <TableHead>Available Slots</TableHead>
              <TableHead>Coach (optional)</TableHead>
              <TableHead>Fees (INR)</TableHead>
              <TableHead>Age Group</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.length > 0 ? (
              filteredBatches.map((batch, index) => (
                <TableRow key={batch.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{batch.batchTime}</TableCell>
                  <TableCell>{batch.schedule}</TableCell>
                  <TableCell>{batch.sport}</TableCell>
                  <TableCell>{batch.maxCapacity}</TableCell>
                  <TableCell>{batch.enrolled}</TableCell>
                  <TableCell>{batch.availableSlots}</TableCell>
                  <TableCell>{batch.coach}</TableCell>
                  <TableCell>{batch.fees}</TableCell>
                  <TableCell>{batch.ageGroup}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleEditBatch(batch.id)}>
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteBatch(batch.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} className="text-center py-4 text-gray-500">
                  No batches found matching your criteria
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Batch Insights</h3>
          <p className="text-sm text-gray-600">Most Popular Sport: Cricket</p>
          <p className="text-sm text-gray-600">Highest Occupancy: Football Advanced</p>
          <p className="text-sm text-gray-600">Lowest Occupancy: Basketball Intermediate</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-gray-800 mb-2">Coach Spotlight</h3>
          <div className="flex items-center">
            <Image
              src="/placeholder.svg?height=40&width=40&text=PP"
              alt="Coach Priya Patel"
              width={40}
              height={40}
              className="rounded-full mr-3"
            />
            <div>
              <h4 className="font-medium text-gray-800">Coach Priya Patel</h4>
              <p className="text-sm text-gray-600">Basketball Coach</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface KpiProps {
  title: string
  value: string | number
  trend?: string
}

function Kpi({ title, value, trend }: KpiProps) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h3 className="font-medium text-gray-800">{title}</h3>
      <div className="text-2xl font-bold text-blue-600">{value}</div>
      {trend && <p className="text-sm text-gray-600">{trend}</p>}
    </div>
  )
}
