"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Home, Calendar, User, Bell, Building2, MapPin, Menu, ChevronLeft, Search, Filter } from "lucide-react"
import { getOnboardingState } from "../../services/authService"

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const [onboardingState, setOnboardingState] = useState({
        profileCompleted: false,
        academyAdded: false,
        academyVerified: false,
    })
    const pathname = usePathname()
    const router = useRouter()
    const [showSearch, setShowSearch] = useState(false)

    useEffect(() => {
        if (typeof window === "undefined") return

        // Get current onboarding state
        const currentState = getOnboardingState()
        setOnboardingState(currentState)
    }, [pathname, router])

    // Get page title based on current route
    const getPageTitle = () => {
        if (pathname.includes("/dashboard")) return "Dashboard"
        if (pathname.includes("/academy")) return "Academy"
        if (pathname.includes("/turf")) return "Turf"
        if (pathname.includes("/coach")) return "Coach"
        if (pathname.includes("/bookings")) return "Bookings"
        if (pathname.includes("/messages")) return "Messages"
        if (pathname.includes("/profile")) return "Profile"
        if (pathname.includes("/analytics")) return "Analytics"
        if (pathname.includes("/settings")) return "Settings"
        return "Sportler"
    }

    // Check if current page needs back button
    const needsBackButton = () => {
        return (
            pathname !== "/supplier-app/dashboard" && !pathname.endsWith("/supplier-app") && pathname.split("/").length > 3
        )
    }

    // Main navigation items for bottom nav
    const mainNavItems = [
        {
            name: "Dashboard",
            href: "/supplier-app/dashboard",
            icon: Home,
            active: pathname === "/supplier-app/dashboard",
        },
        {
            name: "Academy",
            href: "/supplier-app/academy",
            icon: Building2,
            active: pathname.includes("/academy"),
        },
        {
            name: "Turf",
            href: "/supplier-app/turf",
            icon: MapPin,
            active: pathname.includes("/turf"),
        },
        {
            name: "Bookings",
            href: "/supplier-app/bookings",
            icon: Calendar,
            active: pathname.includes("/bookings"),
        },
        {
            name: "More",
            href: "/supplier-app/more",
            icon: Menu,
            active: pathname.includes("/more") || pathname.includes("/profile") || pathname.includes("/settings"),
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Top Navigation Bar */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    {needsBackButton() ? (
                        <button
                            onClick={() => router.back()}
                            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors"
                        >
                            <ChevronLeft size={20} className="text-gray-600" />
                        </button>
                    ) : (
                        <Link href="/supplier-app/dashboard">
                            <Image src="/Logo.svg" alt="Sportler" width={32} height={32} />
                        </Link>
                    )}
                    <h1 className="text-lg font-semibold text-gray-800">{getPageTitle()}</h1>
                </div>

                <div className="flex items-center space-x-2">
                    {/* Search Button */}
                    <button
                        onClick={() => setShowSearch(!showSearch)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    >
                        <Search size={20} className="text-gray-600" />
                    </button>

                    {/* Notifications */}
                    <Link
                        href="/supplier-app/notifications"
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
                    >
                        <Bell size={20} className="text-gray-600" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                            3
                        </span>
                    </Link>

                    {/* Profile Avatar */}
                    <Link
                        href="/supplier-app/profile"
                        className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center"
                    >
                        <User size={16} className="text-emerald-600" />
                    </Link>
                </div>
            </header>

            {/* Search Bar (Expandable) */}
            {showSearch && (
                <div className="bg-white border-b border-gray-200 px-4 py-3">
                    <div className="flex items-center space-x-2">
                        <div className="flex-1 relative">
                            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search academies, bookings, students..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                autoFocus
                            />
                        </div>
                        <button className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                            <Filter size={16} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 pb-20 overflow-y-auto">
                <Suspense>{children}</Suspense>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-50">
                <div className="flex items-center justify-around">
                    {mainNavItems.map((item) => {
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-colors min-w-[60px] ${item.active
                                        ? "bg-emerald-50 text-emerald-600"
                                        : "text-gray-600 hover:text-emerald-600 hover:bg-gray-50"
                                    }`}
                            >
                                <Icon size={20} className="mb-1" />
                                <span className="text-xs font-medium">{item.name}</span>
                            </Link>
                        )
                    })}
                </div>
            </nav>
        </div>
    )
}
