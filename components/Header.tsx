"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoachDropdownOpen, setIsCoachDropdownOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const coachDropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Close mobile menu when clicking outside
    const handleClickOutside = (event) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (
        coachDropdownRef.current &&
        !coachDropdownRef.current.contains(event.target)
      ) {
        setIsCoachDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle coach dropdown
  const toggleCoachDropdown = (e) => {
    e.stopPropagation();
    setIsCoachDropdownOpen(!isCoachDropdownOpen);
  };

  return (
    <header
      className={`${
        isScrolled ? "bg-emerald-600 shadow-md" : "bg-transparent"
      } text-white py-3 px-4 md:px-8 lg:px-16 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
    >
      <div className="flex items-center">
        <Image
          src="/Logo.svg"
          alt="DreamSports"
          width={130}
          height={24}
          priority
        />
      </div>

      {/* Mobile menu backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile and desktop navigation */}
      <nav
        ref={mobileMenuRef}
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:translate-x-0 fixed md:static top-0 right-0 h-full w-4/5 max-w-xs md:w-auto md:h-auto 
        bg-emerald-700 md:bg-transparent flex flex-col md:flex-row space-y-6 md:space-y-0 
        md:space-x-8 p-6 pt-16 md:p-0 transition-transform duration-300 ease-in-out z-50 md:mx-auto
        overflow-y-auto md:overflow-visible`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute top-4 right-4 text-white md:hidden p-2 rounded-full hover:bg-emerald-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
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
        </button>

        <Link
          href="#"
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 
          relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 
          after:left-0 after:bottom-0 after:transition-all hover:after:w-full md:text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 
          relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 
          after:left-0 after:bottom-0 after:transition-all hover:after:w-full md:text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Coaches
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 
          relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 
          after:left-0 after:bottom-0 after:transition-all hover:after:w-full md:text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Academy
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 
          relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 
          after:left-0 after:bottom-0 after:transition-all hover:after:w-full md:text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Blogs
        </Link>
        <Link
          href="#"
          className="text-sm font-medium transition-all duration-200 hover:text-emerald-200 
          relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-emerald-200 
          after:left-0 after:bottom-0 after:transition-all hover:after:w-full md:text-center"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Contact Us
        </Link>

        {/* Mobile-only coach registration options */}
        <div className="md:hidden mt-6 border-t border-emerald-600 pt-6">
          <button
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg text-sm font-medium 
            transition-all duration-200 hover:bg-gray-700 flex items-center justify-between mb-3"
            onClick={toggleCoachDropdown}
          >
            <span>Register as Coach</span>
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
              className={`transition-transform duration-200 ${
                isCoachDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isCoachDropdownOpen && (
            <div className="bg-gray-700 rounded-lg p-2 mb-4 transition-all animate-fadeIn">
              <a
                href="#"
                className="block px-3 py-3 text-sm rounded-md hover:bg-gray-600 transition-colors duration-200 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register as Coach
              </a>
              <a
                href="#"
                className="block px-3 py-3 text-sm rounded-md hover:bg-gray-600 transition-colors duration-200 mb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register as Academy
              </a>
              <a
                href="#"
                className="block px-3 py-3 text-sm rounded-md hover:bg-gray-600 transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                List Your Turf
              </a>
            </div>
          )}

          <button
            className="w-full bg-white text-emerald-600 px-4 py-3 rounded-lg text-sm font-medium 
            transition-all duration-200 hover:bg-emerald-50 shadow-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Login / Register
          </button>
        </div>
      </nav>

      <div className="flex items-center space-x-3">
        {/* Desktop-only coach dropdown */}
        <div className="relative hidden md:block" ref={coachDropdownRef}>
          <button
            className="bg-gray-800 text-white px-4 py-2 rounded text-sm font-medium 
            transition-all duration-200 hover:bg-gray-700 flex items-center gap-1"
            onClick={toggleCoachDropdown}
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
              className={`transition-transform duration-200 ${
                isCoachDropdownOpen ? "rotate-180" : ""
              }`}
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>
          {isCoachDropdownOpen && (
            <div
              className="absolute top-full right-0 mt-1 bg-gray-800 text-white rounded-lg shadow-lg w-52 py-2 z-50 
              transition-all duration-200 animate-fadeIn"
            >
              <a
                href="#"
                className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                Register as Coach
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                Register as Academy
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-sm hover:bg-gray-700 transition-colors duration-200"
              >
                List Your Turf
              </a>
            </div>
          )}
        </div>

        {/* Login button (hidden on smallest screens) */}
        <button
          className="hidden sm:block bg-white text-emerald-600 px-4 py-2 rounded text-sm font-medium 
          transition-all duration-200 hover:bg-emerald-50 hover:shadow-md"
        >
          Login / Register
        </button>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-emerald-700 rounded-full transition-colors"
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Open menu"
        >
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
        </button>
      </div>
    </header>
  );
}
