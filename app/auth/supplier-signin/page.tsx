"use client"
import { SupplierSignInForm } from "@/components/auth/supplier-sign-in-form"

export default function SupplierSignIn() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Supplier Login</h1>
        <p className="text-gray-600 mt-2">Sign in to manage your services on DreamSports</p>
      </div>

      <SupplierSignInForm />
    </div>
  )
}
