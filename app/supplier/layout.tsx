"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Home,
  Calendar,
  MessageSquare,
  User,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  Dumbbell,
  MapPin,
  Users,
  BarChart2,
  HelpCircle,
  ChevronDown,
  Plus,
  Clock,
  DollarSign,
} from "lucide-react"

export default function SupplierLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [supplierModules, setSupplierModules] = useState({
    academy: {
      enabled: false,
      entities: [],
    },
    turf: {
      enabled: false,
      entities: [],
    },
    coach: {
      enabled: false,
      entities: [],
    },
  })
  const pathname = usePathname()
  const router = useRouter()
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const toggleDropdown = (dropdown: string) => {
    if (openDropdown === dropdown) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(dropdown)
    }
  }

  const [selectedEntity, setSelectedEntity] = useState<{
    type: string
    id: number | null
  }>({ type: "", id: null })

  useEffect(() => {
    // Get supplier modules from localStorage
    const storedModules = localStorage.getItem("supplierModules")
    if (storedModules) {
      setSupplierModules(JSON.parse(storedModules))
    } else {
      // Mock data for development - in production this would come from API
      setSupplierModules({
        academy: {
          enabled: true,
          entities: [
            { id: 1, name: "Premier Cricket Academy", location: "Mumbai" },
            { id: 2, name: "Elite Tennis School", location: "Delhi" },
          ],
        },
        turf: {
          enabled: true,
          entities: [{ id: 1, name: "Green Field Turf", location: "Bangalore" }],
        },
        coach: {
          enabled: true,
          entities: [],
        },
      })
      // If no supplier modules found in production, redirect to login
      // router.push("/auth/supplier-signin");
    }
  }, [])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out lg:fixed lg:z-40 overflow-hidden flex flex-col`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/Logo.svg" alt="DreamSports" width={130} height={24} />
            </Link>
            <button className="lg:hidden text-gray-500 hover:text-gray-700" onClick={() => setIsSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
            {/* Main Navigation */}
            <div>
              <h4 className="text-xs font-bold text-gray-500 uppercase px-3 mb-2">Main Navigation</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/supplier/dashboard"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      pathname === "/supplier/dashboard"
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Home size={18} className="mr-3" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supplier/profile"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      pathname === "/supplier/profile"
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <User size={18} className="mr-3" />
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            {/* Conditional Navigation based on supplier type */}
            {supplierModules.academy.enabled && (
              <div>
                <div className="flex items-center justify-between px-3 mb-1">
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Academy Management</h4>
                  <button onClick={() => toggleDropdown("academy")} className="text-gray-500 hover:text-emerald-600">
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === "academy" ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <div className={`${openDropdown === "academy" ? "block" : "hidden"} space-y-1`}>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-700">Your Academies</span>
                    <button
                      onClick={() => router.push("/supplier/academy/add")}
                      className="p-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {supplierModules.academy.entities.length > 0 ? (
                    <ul className="space-y-1">
                      {supplierModules.academy.entities.map((academy) => (
                        <li key={`academy-${academy.id}`}>
                          <div className="space-y-1">
                            <Link
                              href={`/supplier/academy/${academy.id}`}
                              className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                                selectedEntity.type === "academy" && selectedEntity.id === academy.id
                                  ? "bg-emerald-50 text-emerald-700"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              onClick={() => {
                                setSelectedEntity({ type: "academy", id: academy.id })
                                setIsSidebarOpen(false)
                              }}
                            >
                              <Building2 size={16} className="mr-2" />
                              {academy.name}
                            </Link>

                            <div className="pl-8 space-y-1">
                              <Link
                                href={`/supplier/academy/${academy.id}/batches`}
                                className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg ${
                                  pathname.startsWith(`/supplier/academy/${academy.id}/batches`)
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <Users size={14} className="mr-2" />
                                Batches
                              </Link>
                              <Link
                                href={`/supplier/academy/${academy.id}/analytics`}
                                className={`flex items-center px-3 py-1.5 text-xs font-medium rounded-lg ${
                                  pathname.startsWith(`/supplier/academy/${academy.id}/analytics`)
                                    ? "bg-emerald-50 text-emerald-700"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <BarChart2 size={14} className="mr-2" />
                                Analytics
                              </Link>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">No academies yet. Add your first academy!</div>
                  )}
                </div>
              </div>
            )}

            {/* Turf Module */}
            {supplierModules.turf.enabled && (
              <div>
                <div className="flex items-center justify-between px-3 mb-1">
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Turf Management</h4>
                  <button onClick={() => toggleDropdown("turf")} className="text-gray-500 hover:text-emerald-600">
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === "turf" ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <div className={`${openDropdown === "turf" ? "block" : "hidden"} space-y-1`}>
                  <div className="flex items-center justify-between px-3 py-2">
                    <span className="text-sm font-medium text-gray-700">Your Turfs</span>
                    <button
                      onClick={() => router.push("/supplier/turf/add")}
                      className="p-1 rounded-full bg-emerald-100 text-emerald-600 hover:bg-emerald-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {supplierModules.turf.entities.length > 0 ? (
                    <ul className="space-y-1">
                      {supplierModules.turf.entities.map((turf) => (
                        <li key={`turf-${turf.id}`}>
                          <Link
                            href={`/supplier/turf/${turf.id}`}
                            className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                              selectedEntity.type === "turf" && selectedEntity.id === turf.id
                                ? "bg-emerald-50 text-emerald-700"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            onClick={() => {
                              setSelectedEntity({ type: "turf", id: turf.id })
                              setIsSidebarOpen(false)
                            }}
                          >
                            <MapPin size={16} className="mr-2" />
                            {turf.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="px-3 py-2 text-sm text-gray-500">No turfs yet. Add your first turf!</div>
                  )}

                  <ul className="space-y-1 border-t border-gray-100 pt-2 mt-2">
                    <li>
                      <Link
                        href="/supplier/turf/details"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/turf/details")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <MapPin size={16} className="mr-2" />
                        Turf Details
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/turf/calendar"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/turf/calendar")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Calendar size={16} className="mr-2" />
                        Booking Calendar
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/turf/slots"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/turf/slots")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Clock size={16} className="mr-2" />
                        Time Slots
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/turf/payments"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/turf/payments")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <DollarSign size={16} className="mr-2" />
                        Payments
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/turf/analytics"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/turf/analytics")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <BarChart2 size={16} className="mr-2" />
                        Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Coach Module */}
            {supplierModules.coach.enabled && (
              <div>
                <div className="flex items-center justify-between px-3 mb-1">
                  <h4 className="text-xs font-bold text-gray-500 uppercase">Coach Management</h4>
                  <button onClick={() => toggleDropdown("coach")} className="text-gray-500 hover:text-emerald-600">
                    <ChevronDown
                      size={16}
                      className={`transition-transform ${openDropdown === "coach" ? "rotate-180" : ""}`}
                    />
                  </button>
                </div>

                <div className={`${openDropdown === "coach" ? "block" : "hidden"} space-y-1`}>
                  <ul className="space-y-1">
                    <li>
                      <Link
                        href="/supplier/coach/profile"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/coach/profile")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Dumbbell size={16} className="mr-2" />
                        Coach Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/coach/schedule"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/coach/schedule")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Calendar size={16} className="mr-2" />
                        Schedule
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/coach/player-performance"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/coach/player-performance")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <Users size={16} className="mr-2" />
                        Player Performance
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/supplier/coach/analytics"
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg ${
                          pathname.startsWith("/supplier/coach/analytics")
                            ? "bg-emerald-50 text-emerald-700"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <BarChart2 size={16} className="mr-2" />
                        Coaching Analytics
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {/* Common Navigation */}
            <div className="border-t border-gray-200 pt-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase px-3 mb-2">Business</h4>
              <ul className="space-y-1">
                <li>
                  <Link
                    href="/supplier/bookings"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      pathname.startsWith("/supplier/bookings")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Calendar size={18} className="mr-3" />
                    Bookings
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supplier/messages"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      pathname.startsWith("/supplier/messages")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <MessageSquare size={18} className="mr-3" />
                    Messages
                  </Link>
                </li>
                <li>
                  <Link
                    href="/supplier/notifications"
                    className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg ${
                      pathname.startsWith("/supplier/notifications")
                        ? "bg-emerald-50 text-emerald-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Bell size={18} className="mr-3" />
                    <span>Notifications</span>
                    <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">3</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <Link
              href="/supplier/settings"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <Settings size={18} className="mr-3" />
              Settings
            </Link>
            <Link
              href="/supplier/help"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle size={18} className="mr-3" />
              Help & Support
            </Link>
            <Link
              href="/auth/supplier-signin"
              className="flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={() => localStorage.removeItem("supplierTypes")}
            >
              <LogOut size={18} className="mr-3" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden lg:ml-64">
        {/* Mobile header */}
        <div className="lg:hidden bg-white p-4 border-b border-gray-200 flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-4" onClick={toggleSidebar}>
            <Menu size={24} />
          </button>
          <Image src="/Logo.svg" alt="DreamSports" width={130} height={24} />
        </div>

        {/* Main content area */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  )
}
