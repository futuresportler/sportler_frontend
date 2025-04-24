import { redirect } from "next/navigation"

// This file ensures all routes are accessible
// In a real app, you would implement proper routing logic here

export default function Routes() {
  // Redirect to the academy dashboard
  redirect("/supplier/dashboard")
}
