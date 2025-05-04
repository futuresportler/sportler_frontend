import { NextResponse } from "next/server"
import { newAcademies } from "@/data/new-academies-data"

export async function GET() {
  try {
    // Simulate fetching data (replace with actual data fetching logic if needed)
    // const academies = await loadExternalAcademies(); // Example: Fetch from a database or external API

    // Ensure newAcademies is an array
    if (!Array.isArray(newAcademies)) {
      console.error("Academies data is not an array:", newAcademies)
      return NextResponse.json({ error: "Invalid academies data format" }, { status: 500 })
    }

    return NextResponse.json(newAcademies)
  } catch (error) {
    console.error("Error fetching academies:", error)
    return NextResponse.json({ error: "Failed to fetch academies" }, { status: 500 })
  }
}

// Example function to simulate loading external academies (replace with your actual logic)
// async function loadExternalAcademies() {
//   // Replace this with your actual data fetching logic (e.g., from a database)
//   return newAcademies;
// }
