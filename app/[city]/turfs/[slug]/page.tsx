import type { Metadata } from "next"
import { notFound } from "next/navigation"
import {CourtDetail} from "@/components/courts/CourtDetail"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { fetchTurfsByCity, findTurfBySlug } from "@/services/apiService"
import { formatCityForDisplay } from "@/utils/slug"

interface PageProps {
  params: Promise<{
    city: string
    slug: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const { city, slug } = await params
    const formattedCity = formatCityForDisplay(city)

    // Fetch turf data
    const turfs = await fetchTurfsByCity(city)
    const turf = findTurfBySlug(turfs, slug)

    if (!turf) {
      return {
        title: `Turf Not Found | Futuresportler`,
        description: `The requested turf could not be found.`,
      }
    }

    const turfName = turf.name || "Turf"
    const sport = turf.sport || "Sports"

    return {
      title: `${turfName} – ${sport} Turf in ${formattedCity} | Futuresportler`,
      description: `Book ${turfName}, a premium ${sport} turf in ${formattedCity}. Modern facilities, well-maintained grounds, and convenient booking. Reserve your slot now!`,
      keywords: `${turfName}, ${sport} turf ${formattedCity}, ground booking ${formattedCity}, ${sport} facilities`,
      openGraph: {
        title: `${turfName} – ${sport} Turf in ${formattedCity}`,
        description: `Book ${turfName}, a premium ${sport} turf in ${formattedCity}. Modern facilities, well-maintained grounds, and convenient booking.`,
        images: turf.images?.[0] ? [turf.images[0]] : [],
        locale: "en_IN",
        type: "website",
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: `Turf | Futuresportler`,
      description: `Find premium sports turfs and facilities.`,
    }
  }
}

export default async function TurfDetailPage({ params }: PageProps) {
  try {
    const { city, slug } = await params

    // Fetch turf data
    const turfs = await fetchTurfsByCity(city)
    const turf = findTurfBySlug(turfs, slug)

    if (!turf) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CourtDetail court={turf} city={city} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading turf:", error)
    notFound()
  }
}
