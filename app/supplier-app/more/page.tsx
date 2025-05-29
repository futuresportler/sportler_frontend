"use client"

import Link from "next/link"
import {
  User,
  Settings,
  HelpCircle,
  MessageSquare,
  Bell,
  BarChart2,
  DollarSign,
  Shield,
  LogOut,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function SupplierAppMore() {
  const menuItems = [
    {
      title: "Profile",
      description: "Manage your account details",
      icon: User,
      href: "/supplier-app/profile",
      color: "text-blue-600",
    },
    {
      title: "Messages",
      description: "Chat with customers",
      icon: MessageSquare,
      href: "/supplier-app/messages",
      color: "text-emerald-600",
      badge: "3",
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: BarChart2,
      href: "/supplier-app/analytics",
      color: "text-purple-600",
    },
    {
      title: "Payments",
      description: "Manage earnings & payouts",
      icon: DollarSign,
      href: "/supplier-app/payments",
      color: "text-emerald-600",
    },
    {
      title: "Notifications",
      description: "Notification preferences",
      icon: Bell,
      href: "/supplier-app/notifications",
      color: "text-amber-600",
    },
    {
      title: "Settings",
      description: "App settings & preferences",
      icon: Settings,
      href: "/supplier-app/settings",
      color: "text-gray-600",
    },
    {
      title: "Privacy & Security",
      description: "Manage your privacy settings",
      icon: Shield,
      href: "/supplier-app/privacy",
      color: "text-red-600",
    },
    {
      title: "Help & Support",
      description: "Get help and contact support",
      icon: HelpCircle,
      href: "/supplier-app/help",
      color: "text-blue-600",
    },
  ]

  return (
    <div className="p-4 space-y-6">
      {/* Profile Section */}
      <Card className="bg-gradient-to-r from-emerald-50 to-blue-50 border-emerald-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <User size={24} className="text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">John Doe</h3>
              <p className="text-sm text-gray-600">Academy Owner</p>
              <p className="text-xs text-emerald-600">Premium Member</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <div className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.title} href={item.href}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-gray-50`}>
                      <Icon size={20} className={item.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium text-gray-800">{item.title}</h3>
                        {item.badge && (
                          <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      {/* Logout */}
      <Card className="border-red-200">
        <CardContent className="p-4">
          <button className="flex items-center space-x-4 w-full text-left">
            <div className="p-2 rounded-lg bg-red-50">
              <LogOut size={20} className="text-red-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-red-600">Logout</h3>
              <p className="text-sm text-gray-600">Sign out of your account</p>
            </div>
          </button>
        </CardContent>
      </Card>

      {/* App Version */}
      <div className="text-center text-xs text-gray-500 pt-4">Sportler Supplier App v1.0.0</div>
    </div>
  )
}
    