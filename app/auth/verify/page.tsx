"use client"

import { useSearchParams } from "next/navigation"
import { PhoneVerificationForm } from "@/components/auth/phone-verification-form"

export default function VerifyPhone() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const provider = searchParams.get("provider") || ""

  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Verify your phone</h1>
        <p className="text-gray-600 mt-2">We need to verify your phone number to complete your registration</p>
      </div>

      <PhoneVerificationForm email={email} provider={provider} />
    </div>
  )
}
