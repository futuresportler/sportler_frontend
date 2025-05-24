"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"

export default function AuthLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isSignUp = pathname === "/auth/signup"

  return (
    <div className="flex min-h-screen">
      {/* Left side - Sports image (hidden on mobile) */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-800/50 z-10" />
        <Image src="/images/auth-background.jpg" alt="Sports background" fill className="object-cover" priority />
        <div className="absolute top-8 left-8 z-20">
          <Link href="/">
            <Image src="/Logo.svg" alt="Future Sportler" width={150} height={40} className="h-auto" />
          </Link>
        </div>
        <div className="absolute bottom-12 left-8 right-8 text-white z-20">
          <h2 className="text-3xl font-bold mb-4">
            {isSignUp ? "Join our sports community" : "Welcome back to Future Sportler"}
          </h2>
          <p className="text-white/80">
            {isSignUp
              ? "Create an account to connect with top coaches, find premium academies, and book the best courts."
              : "Sign in to access your account and continue your sports journey with the best resources."}
          </p>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo and background */}
          <div className="md:hidden">
            <div className="flex justify-center mb-8">
              <Link href="/">
                <Image src="/Logo.svg" alt="Future Sportler" width={150} height={40} className="h-auto" />
              </Link>
            </div>

            {/* Mobile background - subtle gradient */}
            <div className="fixed inset-0 -z-10 bg-gradient-to-b from-emerald-50 to-white"></div>
          </div>

          {/* Auth form */}
          <div>{children}</div>
              
        </div>
      </div>
    </div>
  )
}
