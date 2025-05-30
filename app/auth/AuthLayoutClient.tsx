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
    <div className="flex min-h-screen max-h-screen overflow-hidden">
      {/* Left side - Sports image with enhanced design */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/70 to-teal-700/60 z-10" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-10 z-10" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
             }} />
        
        <Image 
          src={isSignUp ? "/close-up-athlete-running.jpg" : "/close-up-athlete-running (1).jpg"} 
          alt="Sports background" 
          fill 
          className="object-cover scale-105 transition-transform duration-700 hover:scale-100" 
          priority 
        />
        
        {/* Logo with backdrop */}
        <div className="absolute top-6 left-6 z-20">
          <div className="backdrop-blur-sm bg-white/10 rounded-2xl p-3 border border-white/20">
            <Link href="/" className="block">
              <Image 
                src="/Logo.svg" 
                alt="Future Sportler" 
                width={140} 
                height={36} 
                className="h-auto filter brightness-0 invert" 
              />
            </Link>
          </div>
        </div>
        
        {/* Enhanced content section */}
        <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
          <div className="backdrop-blur-md bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl p-8 -m-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border border-emerald-500/30">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                {isSignUp ? "Get Started" : "Welcome Back"}
              </div>
              
              <h2 className="text-4xl font-bold text-white leading-tight">
                {isSignUp 
                  ? "Join our sports community" 
                  : "Welcome back to Future Sportler"
                }
              </h2>
              
              <p className="text-white/90 text-lg leading-relaxed">
                {isSignUp
                  ? "Create an account to connect with top coaches, find premium academies, and book the best courts."
                  : "Sign in to access your account and continue your sports journey with the best resources."
                }
              </p>
              
              {/* Feature highlights */}
              <div className="flex flex-wrap gap-3 pt-2">
                {["🏆 Top Coaches", "🏟️ Premium Courts", "📈 Track Progress"].map((feature, index) => (
                  <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2 text-white/80 text-sm">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth forms with improved styling */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen overflow-y-auto">
        {/* Mobile header */}
        <div className="lg:hidden bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
          <div className="flex justify-center mb-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
              <Link href="/">
                <Image 
                  src="/Logo.svg" 
                  alt="Future Sportler" 
                  width={120} 
                  height={32} 
                  className="h-auto filter brightness-0 invert" 
                />
              </Link>
            </div>
          </div>
          
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold mb-2">
              {isSignUp ? "Join Future Sportler" : "Welcome Back"}
            </h1>
            <p className="text-white/80 text-sm">
              {isSignUp ? "Start your sports journey today" : "Continue your sports journey"}
            </p>
          </div>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md">
            
            {/* Form content with enhanced styling */}
            <div className="bg-white lg:bg-white/80 lg:backdrop-blur-sm rounded-2xl lg:border lg:border-gray-200 lg:shadow-xl p-6 lg:p-8">
              {children}
            </div>

            {/* Footer links */}
            <div className="mt-8 text-center">
              <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
                <Link href="/privacy" className="hover:text-emerald-600 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-emerald-600 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/help" className="hover:text-emerald-600 transition-colors">
                  Help Center
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Background for mobile */}
        <div className="lg:hidden fixed inset-0 -z-10 bg-gradient-to-br from-emerald-50 via-white to-teal-50"></div>
      </div>
    </div>
  )
}