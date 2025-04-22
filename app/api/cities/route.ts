import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This is a mock implementation
    // In a real application, you would fetch this data from your database
    const cities = [
      { id: 1, name: "New York", country: "USA" },
      { id: 2, name: "London", country: "UK" },
      { id: 3, name: "Mumbai", country: "India" },
      { id: 4, name: "Tokyo", country: "Japan" },
      { id: 5, name: "Sydney", country: "Australia" },
      { id: 6, name: "Paris", country: "France" },
      { id: 7, name: "Berlin", country: "Germany" },
      { id: 8, name: "Toronto", country: "Canada" },
      { id: 9, name: "Dubai", country: "UAE" },
      { id: 10, name: "Singapore", country: "Singapore" },
      { id: 11, name: "Hong Kong", country: "China" },
      { id: 12, name: "Barcelona", country: "Spain" },
    ]

    return NextResponse.json(cities)
  } catch (error) {
    console.error("Error fetching cities:", error)
    return NextResponse.json({ error: "Failed to fetch cities" }, { status: 500 })
  }
}
