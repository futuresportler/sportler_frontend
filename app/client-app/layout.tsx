import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./ClientLayout"

export const metadata: Metadata = {
  title: "Sportler - Your Sports Companion",
  description: "Find coaches, book courts, join academies - all in one app",
}

export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}
