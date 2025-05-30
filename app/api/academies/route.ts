import { NextResponse } from "next/server"

const API_BASE_URL = "https://api-primary.futuresportler.com"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get("city")

    // Build the external API URL
    const apiUrl = new URL(`${API_BASE_URL}/api/academies`)
    if (city) {
      apiUrl.searchParams.append("city", city)
    }

    // Forward other query parameters
    searchParams.forEach((value, key) => {
      if (key !== "city") {
        apiUrl.searchParams.append(key, value)
      }
    })

    const response = await fetch(apiUrl.toString(), {
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching academies:", error)
    return NextResponse.json({ error: "Failed to fetch academies" }, { status: 500 })
  }
}
