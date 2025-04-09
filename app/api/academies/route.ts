import { NextResponse } from "next/server"

// This is a placeholder for your actual data
// In a real application, you would:
// 1. Import your JSON data
// 2. Process it with loadExternalAcademies
// 3. Return it

export async function GET() {
  // For demonstration purposes, we're returning a simple response
  // In your actual implementation, you would:
  // 1. Import your 380+ academies JSON data
  // 2. Process it with loadExternalAcademies
  // 3. Return it

  // Example:
  import academiesData from '@/data/your-academies-data.json'
  const formattedData = loadExternalAcademies(academiesData)
  return NextResponse.json(formattedData)
}
