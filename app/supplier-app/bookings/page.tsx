"use client"

import { useState } from "react"
import { Clock, MapPin, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SupplierAppBookings() {
  const [activeTab, setActiveTab] = useState("today")

  const bookings = [
    {
      id: 1,
      customerName: "Rahul Sharma",
      sport: "Football",
      venue: "Green Field Turf",
      time: "6:00 PM - 8:00 PM",
      date: "Today",
      status: "confirmed",
      amount: "₹1,200",
    },
    {
      id: 2,
      customerName: "Priya Patel",
      sport: "Cricket",
      venue: "Sports Arena",
      time: "8:00 PM - 10:00 PM",
      date: "Today",
      status: "confirmed",
      amount: "₹1,500",
    },
    {
      id: 3,
      customerName: "Amit Kumar",
      sport: "Tennis",
      venue: "Elite Tennis Academy",
      time: "7:00 AM - 8:00 AM",
      date: "Tomorrow",
      status: "pending",
      amount: "₹800",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-amber-100 text-amber-700"
      case "cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-3">
            <div className="text-xl font-bold text-emerald-700">12</div>
            <div className="text-xs text-emerald-600">Today</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3">
            <div className="text-xl font-bold text-blue-700">8</div>
            <div className="text-xs text-blue-600">Tomorrow</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3">
            <div className="text-xl font-bold text-purple-700">45</div>
            <div className="text-xs text-purple-600">This Week</div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="today">Today</TabsTrigger>
          <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
          <TabsTrigger value="week">This Week</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="space-y-3">
            {bookings.map((booking) => (
              <Card key={booking.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <User size={16} className="text-gray-500" />
                        <span className="font-medium text-gray-800">{booking.customerName}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <MapPin size={14} />
                          <span>
                            {booking.venue} • {booking.sport}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Clock size={14} />
                          <span>{booking.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-semibold text-emerald-600">{booking.amount}</div>
                      <div className="text-xs text-gray-500">{booking.date}</div>
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <div className="flex space-x-2 mt-3 pt-3 border-t border-gray-100">
                      <Button size="sm" className="flex-1">
                        Accept
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        Decline
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
