"use client"

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { useState } from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [animating, setAnimating] = useState(false)

  const handlePageChange = (page: number) => {
    if (page === currentPage) return

    setAnimating(true)
    setTimeout(() => {
      onPageChange(page)
      setAnimating(false)
    }, 300)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    // Calculate range of pages to show
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    let endPage = startPage + maxPagesToShow - 1

    if (endPage > totalPages) {
      endPage = totalPages
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
            currentPage === i
              ? "bg-emerald-600 text-white scale-110 shadow-md"
              : "bg-white text-gray-700 hover:bg-gray-100 hover:scale-105"
          }`}
        >
          {i}
        </button>,
      )
    }

    return pages
  }

  return (
    <div
      className={`flex justify-center items-center space-x-2 p-4 transition-opacity duration-300 ${animating ? "opacity-50" : "opacity-100"}`}
    >
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1 || animating}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105 border border-gray-200"
        }`}
      >
        <ChevronsLeft size={18} />
      </button>

      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || animating}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105 border border-gray-200"
        }`}
      >
        <ChevronLeft size={18} />
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || animating}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105 border border-gray-200"
        }`}
      >
        <ChevronRight size={18} />
      </button>

      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages || animating}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-white text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:scale-105 border border-gray-200"
        }`}
      >
        <ChevronsRight size={18} />
      </button>
    </div>
  )
}

