import type React from "react"
import type { Metadata } from "next"
import AuthLayoutClient from "./AuthLayoutClient"

export const metadata: Metadata = {
  title: "Authentication - DreamSports",
  description: "Sign in or create an account with DreamSports",
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <AuthLayoutClient>{children}</AuthLayoutClient>
}
