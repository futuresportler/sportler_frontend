"use client"

import Link from "next/link"
import { Plus, Building2, Users, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SupplierAppAcademy() {
  const academyOptions = [
    {
      title: "Manage Academies",
      description: "View and manage your academies",
      icon: Building2,
      href: "/supplier-app/academy/manage",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      title: "Add New Academy",
      description: "Register a new academy",
      icon: Plus,
      href: "/supplier-app/academy/add",
      color: "bg-emerald-50 text-emerald-600 border-emerald-100",
    },
    {
      title: "Students & Batches",
      description: "Manage students and batches",
      icon: Users,
      href: "/supplier-app/academy/students",
      color: "bg-purple-50 text-purple-600 border-purple-100",
    },
    {
      title: "Academy Analytics",
      description: "View performance metrics",
      icon: BarChart2,
      href: "/supplier-app/academy/analytics",
      color: "bg-amber-50 text-amber-600 border-amber-100",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-700">2</div>
            <div className="text-sm text-blue-600">Active Academies</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-emerald-700">156</div>
            <div className="text-sm text-emerald-600">Total Students</div>
          </CardContent>
        </Card>
      </div>

      {/* Academy Options */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Academy Management</h2>
        <div className="grid gap-4">
          {academyOptions.map((option) => {
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

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New student enrolled</p>
                <p className="text-xs text-gray-500">Elite Tennis Academy • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Batch schedule updated</p>
                <p className="text-xs text-gray-500">Cricket Academy • 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Fee payment received</p>
                <p className="text-xs text-gray-500">Elite Tennis Academy • 1 day ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
