"use client"

import { useRouter } from "next/navigation"

export default function SupplierAppAcademyManage() {
  const router = useRouter()

  return (
    <div className="h-full">
      <iframe src="/supplier/academy" className="w-full h-[calc(100vh-140px)] border-0" title="Academy Management" />
    </div>
  )
}
