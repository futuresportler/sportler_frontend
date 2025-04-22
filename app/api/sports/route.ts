import { NextResponse } from "next/server"

export async function GET() {
  try {
    // This is a mock implementation
    // In a real application, you would fetch this data from your database
    const sports = [
      { id: 1, name: "Badminton", popularity: "High" },
      { id: 2, name: "Tennis", popularity: "High" },
      { id: 3, name: "Football", popularity: "High" },
      { id: 4, name: "Basketball", popularity: "High" },
      { id: 5, name: "Swimming", popularity: "Medium" },
      { id: 6, name: "Cricket", popularity: "High" },
      { id: 7, name: "Golf", popularity: "Medium" },
      { id: 8, name: "Table Tennis", popularity: "Medium" },
      { id: 9, name: "Volleyball", popularity: "Medium" },
      { id: 10, name: "Rugby", popularity: "Medium" },
      { id: 11, name: "Baseball", popularity: "Medium" },
      { id: 12, name: "Hockey", popularity: "Medium" },
    ]

    return NextResponse.json(sports)
  } catch (error) {
    console.error("Error fetching sports:", error)
    return NextResponse.json({ error: "Failed to fetch sports" }, { status: 500 })
  }
}
