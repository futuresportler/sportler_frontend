"use client"

import Link from "next/link"
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form"

export default function ForgotPassword() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reset your password</h1>
        <p className="text-gray-600 mt-2">
          Enter your email and we&apos;ll send you instructions to reset your password
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link href="/auth/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
