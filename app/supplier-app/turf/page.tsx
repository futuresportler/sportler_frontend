"use client"

import Link from "next/link"
import { Plus, MapPin, Calendar, BarChart2, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupplierAppTurf() {
  const turfOptions = [
    {
      title: "Manage Turfs",
      description: "View and manage your turfs",
      icon: MapPin,
      href: "/supplier-app/turf/manage",
      color: "bg-green-50 text-green-600 border-green-100",
    },
    {
      title: "Add New Turf",
      description: "Register a new turf",
      icon: Plus,
      href: "/supplier-app/turf/add",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Booking Calendar",
      description: "View and manage bookings",
      icon: Calendar,
      href: "/supplier-app/turf/calendar",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Time Slots",
      description: "Configure available slots",
      icon: Clock,
      href: "/supplier-app/turf/slots",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Turf Analytics",
      description: "View performance metrics",
      icon: BarChart2,
      href: "/supplier-app/turf/analytics",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700">3</div>
            <div className="text-sm text-green-600">Active Turfs</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-700">24</div>
            <div className="text-sm text-blue-600">Today's Bookings</div>
          </CardContent>
        </Card>
      </div>

      {/* Turf Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Turf Management</h2>
        <div className="grid gap-4">
          {turfOptions.map((option) => {
            const Icon = option.icon
            return (
              <Link key={option.title} href={option.href}>
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${option.color}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800">{option.title}</h3>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div>
                <p className="text-sm font-medium">Football Match</p>
                <p className="text-xs text-gray-600">Green Field Turf • 6:00 PM - 8:00 PM</p>
              </div>
              <div className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Confirmed</div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div>
                <p className="text-sm font-medium">Cricket Practice</p>
                <p className="text-xs text-gray-600">Sports Arena • 8:00 PM - 10:00 PM</p>
              </div>
              <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Confirmed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
