import type React from "react"
import type { Metadata } from "next"
import AuthLayoutClient from "./AuthLayoutClient"

export const metadata: Metadata = {
  title: "Authentication - Future Sportler",
  description: "Sign in or create an account with Future Sportler",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>
}
