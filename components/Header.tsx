"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCoachDropdownOpen, setIsCoachDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Add a small delay before closing the dropdown
  const handleDropdownClose = () => {
    setTimeout(() => {
      setIsCoachDropdownOpen(false)
    }, 300)
  }

  return (
    <header
      className={`${
        isScrolled ? "bg-emerald-600 shadow-md" : "bg-transparent"
      } text-white py-3 px-4 md:px-8 lg:px-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="flex items-center">
        <Image src="/Logo.svg" alt="DreamSports" width={130} height={24} />
      </div>

      <nav
        className={`${
          isMobileMenuOpen ? "flex" : "hidden"
        } md:flex absolute md:static top-full left-0 right-0 bg-emerald-600 md:bg-transparent flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-8 p-4 md:p-0 md:mx-auto`}
      >
        <Link 
          href="#" 
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
        >
          Home
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
        >
          Coaches
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
        >
          Academy
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
        >
          Blogs
        </Link>
        <Link 
          href="#" 
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 after:left-0 after:bottom-0 after:transition-all hover:after:w-full"
        >
          Contact Us
        </Link>
      </nav>

      <div className="flex items-center space-x-4">
        <div 
          className="relative hidden sm:block"
          onMouseEnter={() => setIsCoachDropdownOpen(true)}
          onMouseLeave={handleDropdownClose}
        >
          <button 
            className="bg-gray-800 text-white px-5 py-2 rounded text-sm font-medium transition-all duration-200 hover:bg-gray-700 flex items-center gap-1"
          >
            Register as Coach
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </button>
          {isCoachDropdownOpen && (
            <div 
              className="absolute top-full left-0 mt-1 bg-gray-800 text-white rounded shadow-lg w-48 py-1 z-50 transition-all duration-200"
            >
              <a 
                href="#" 
                className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                Register as Coach
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                Register as Academy
              </a>
              <a 
                href="#" 
                className="block px-4 py-2 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                List Your Turf
              </a>
            </div>
          )}
        </div>
        <button className="bg-white text-emerald-600 px-5 py-2 rounded text-sm font-medium transition-all duration-200 hover:bg-emerald-50 hover:shadow-md">
          Login / Register
        </button>
        <button 
          className="md:hidden text-white" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
      </div>
    </header>
  )
}