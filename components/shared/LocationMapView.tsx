"use client"

import { useState } from "react"
import MapView from "@/components/map/MapView"
import type { Academy } from "@/types/academy"
import type { Coach } from "@/types/coach"
import type { Court } from "@/types/court"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapIcon, ListIcon } from "lucide-react"

interface LocationMapViewProps {
  academies?: Academy[]
  coaches?: Coach[]
  courts?: Court[]
  city: string
  activeTab?: "academies" | "coaches" | "courts" | "all"
}

export default function LocationMapView({
  academies = [],
  coaches = [],
  courts = [],
  city,
  activeTab = "all",
}: LocationMapViewProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")
  const [currentTab, setCurrentTab] = useState(activeTab)

  // Transform academies to map locations
  const academyLocations = academies.map((academy) => ({
    id: academy.id,
    name: academy.name || academy.title,
    address: academy.location,
    type: "academy" as const,
    rating: academy.rating,
    hourlyRate: academy.hourlyRate,
    image: academy.image,
    sport: academy.sports?.join(", "),
    category: academy.category,
    nextAvailability: academy.nextAvailability,
    slug: `academies/${academy.id}`,
    url: `/${city}/academies/${academy.id}`,
  }))

  // Transform coaches to map locations
  const coachLocations = coaches.map((coach) => ({
    id: coach.id,
    name: coach.name,
    address: coach.location,
    type: "coach" as const,
    rating: coach.rating,
    hourlyRate: coach.hourlyRate,
    image: coach.image,
    sport: coach.sport,
    nextAvailability: coach.nextAvailability,
    slug: `coaches/${coach.id}`,
    url: `/${city}/coaches/${coach.id}`,
  }))

  // Transform courts to map locations
  const courtLocations = courts.map((court) => ({
    id: court.id,
    name: court.name,
    address: court.location,
    type: "turf" as const,
    rating: court.rating,
    price: court.price || court.pricePerHour,
    image: court.image,
    sport: court.sport,
    availability: typeof court.availability === "string" ? court.availability : court.availability?.status,
    slug: `turfs/${court.id}`,
    url: `/${city}/turfs/${court.id}`,
  }))

  // Combine locations based on active tab
  const getActiveLocations = () => {
    switch (currentTab) {
      case "academies":
        return academyLocations
      case "coaches":
        return coachLocations
      case "courts":
        return courtLocations
      case "all":
      default:
        return [...academyLocations, ...coachLocations, ...courtLocations]
    }
  }

  const handleLocationClick = (location: any) => {
    // Navigate to the location detail page
    if (location.url) {
      window.location.href = location.url
    }
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <Tabs value={currentTab} onValueChange={(value) => setCurrentTab(value as any)} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academies">Academies</TabsTrigger>
            <TabsTrigger value="coaches">Coaches</TabsTrigger>
            <TabsTrigger value="courts">Turfs</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex space-x-2 ml-4">
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="flex items-center"
          >
            <ListIcon className="w-4 h-4 mr-1" />
            List
          </Button>
          <Button
            variant={viewMode === "map" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("map")}
            className="flex items-center"
          >
            <MapIcon className="w-4 h-4 mr-1" />
            Map
          </Button>
        </div>
      </div>

      {viewMode === "map" ? (
        <div className="h-[600px] rounded-lg overflow-hidden border border-gray-200">
          <MapView locations={getActiveLocations()} city={city} onLocationClick={handleLocationClick} />
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Switch to map view to see locations</p>
        </div>
      )}
    </div>
  )
}
