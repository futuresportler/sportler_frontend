"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  User,
  Heart,
  Star,
  HelpCircle,
  Shield,
  CreditCard,
  Bell,
  MapPin,
  Share2,
  LogOut,
  ChevronRight,
  Moon,
  Globe,
  Download,
  Gift,
  Users,
  BookOpen,
} from "lucide-react"

export default function MorePage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)

  const menuSections = [
    {
      title: "Account",
      items: [
        {
          icon: User,
          label: "Edit Profile",
          href: "/client-app/profile/edit",
          description: "Update your personal information",
        },
        {
          icon: Heart,
          label: "Favorites",
          href: "/client-app/favorites",
          description: "Your saved coaches and venues",
          badge: "12",
        },
        {
          icon: Star,
          label: "Reviews & Ratings",
          href: "/client-app/reviews",
          description: "Manage your reviews",
        },
        {
          icon: CreditCard,
          label: "Payment Methods",
          href: "/client-app/payments",
          description: "Manage cards and billing",
        },
      ],
    },
    {
      title: "App Settings",
      items: [
        {
          icon: Bell,
          label: "Notifications",
          href: "/client-app/notifications-settings",
          description: "Push notifications and alerts",
          toggle: true,
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Moon,
          label: "Dark Mode",
          description: "Switch to dark theme",
          toggle: true,
          value: isDarkMode,
          onChange: setIsDarkMode,
        },
        {
          icon: Globe,
          label: "Language",
          href: "/client-app/language",
          description: "English",
        },
        {
          icon: MapPin,
          label: "Location",
          href: "/client-app/location",
          description: "New York, USA",
        },
      ],
    },
    {
      title: "Support & Info",
      items: [
        {
          icon: HelpCircle,
          label: "Help & Support",
          href: "/client-app/help",
          description: "FAQs and contact support",
        },
        {
          icon: Shield,
          label: "Privacy & Security",
          href: "/client-app/privacy",
          description: "Privacy settings and data",
        },
        {
          icon: BookOpen,
          label: "Terms of Service",
          href: "/client-app/terms",
          description: "Legal terms and conditions",
        },
        {
          icon: Share2,
          label: "Share App",
          action: "share",
          description: "Invite friends to join",
        },
      ],
    },
    {
      title: "Premium",
      items: [
        {
          icon: Gift,
          label: "Upgrade to Premium",
          href: "/client-app/premium",
          description: "Unlock exclusive features",
          highlight: true,
        },
        {
          icon: Users,
          label: "Refer Friends",
          href: "/client-app/referral",
          description: "Earn rewards for referrals",
          badge: "New",
        },
      ],
    },
  ]

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Sportler App",
          text: "Check out this amazing sports app!",
          url: "https://sportler.app",
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText("https://sportler.app")
      alert("App link copied to clipboard!")
    }
  }

  const handleLogout = () => {
    // Add logout logic here
    if (confirm("Are you sure you want to logout?")) {
      // Perform logout
      console.log("Logging out...")
    }
  }

  const handleItemClick = (item: any) => {
    if (item.action === "share") {
      handleShare()
    } else if (item.href) {
      // Navigation will be handled by Link component
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Profile Header */}
      <div className="bg-white p-6 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
            <Image
              src="/placeholder.svg?height=64&width=64"
              alt="Profile"
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900">Alex Johnson</h2>
            <p className="text-gray-500">alex.johnson@email.com</p>
            <div className="flex items-center mt-1">
              <Star size={14} className="text-yellow-400 fill-yellow-400 mr-1" />
              <span className="text-sm text-gray-600">4.9 rating • 24 sessions</span>
            </div>
          </div>
          <Link href="/client-app/profile" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <ChevronRight size={18} className="text-gray-600" />
          </Link>
        </div>
      </div>

      {/* Menu Sections */}
      <div className="p-4 space-y-6">
        {menuSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">{section.title}</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {section.items.map((item, itemIndex) => {
                const IconComponent = item.icon
                const content = (
                  <div
                    key={itemIndex}
                    className={`flex items-center p-4 hover:bg-gray-50 transition-colors ${
                      item.highlight ? "bg-gradient-to-r from-emerald-50 to-emerald-100" : ""
                    }`}
                    onClick={() => handleItemClick(item)}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                        item.highlight
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                      }`}
                    >
                      <IconComponent size={18} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h4
                          className={`font-medium ${
                            item.highlight ? "text-emerald-900" : "text-gray-900"
                          } group-hover:text-emerald-600`}
                        >
                          {item.label}
                        </h4>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 bg-emerald-600 text-white text-xs rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className={`text-sm ${item.highlight ? "text-emerald-700" : "text-gray-500"}`}>
                        {item.description}
                      </p>
                    </div>
                    {item.toggle ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={item.value}
                          onChange={(e) => item.onChange?.(e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                      </label>
                    ) : (
                      <ChevronRight size={18} className="text-gray-400" />
                    )}
                  </div>
                )

                return item.href ? (
                  <Link key={itemIndex} href={item.href} className="block group">
                    {content}
                  </Link>
                ) : (
                  <div key={itemIndex} className="group cursor-pointer">
                    {content}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* App Info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">Sportler App</h4>
              <p className="text-sm text-gray-500">Version 2.1.0</p>
            </div>
            <button className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <Download size={16} className="text-gray-600" />
              <span className="text-sm text-gray-600">Update</span>
            </button>
          </div>
        </div>

        {/* Logout Button */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={handleLogout}
            className="w-full flex items-center p-4 hover:bg-red-50 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4 group-hover:bg-red-200">
              <LogOut size={18} className="text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-medium text-red-600">Logout</h4>
              <p className="text-sm text-red-500">Sign out of your account</p>
            </div>
            <ChevronRight size={18} className="text-red-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
