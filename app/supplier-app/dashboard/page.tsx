"use client"

import { useRouter } from "next/navigation"

export default function SupplierAppDashboard() {
  const router = useRouter()

  // Redirect to the main supplier dashboard with mobile-optimized layout
  return (
    <div className="p-4">
      <iframe
        src="/supplier/dashboard"
        className="w-full h-[calc(100vh-140px)] border-0 rounded-lg"
        title="Supplier Dashboard"
      />
    </div>
  )
}
