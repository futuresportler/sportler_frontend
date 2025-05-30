"use client"
import { SignInForm } from "@/components/auth/sign-in-form"

export default function SignIn() {
  return (
    <div className="w-full">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
        <p className="text-gray-600 text-sm">
          Sign in to access your DreamSports account
        </p>
      </div>
      <SignInForm />
    </div>
  )
}