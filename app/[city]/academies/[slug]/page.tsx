import type { Metadata } from "next"
import { notFound } from "next/navigation"
import AcademiesDetails from "@/components/academies/AcademiesDetails"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { fetchAcademiesByCity, findAcademyBySlug } from "@/services/apiService"
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

    // Fetch academy data
    const academies = await fetchAcademiesByCity(city)
    const academy = findAcademyBySlug(academies, slug)

    if (!academy) {
      return {
        title: `Academy Not Found | Futuresportler`,
        description: `The requested academy could not be found.`,
      }
    }

    const academyName = academy.name || "Academy"
    const sport = academy.sport || "Sports"

    return {
      title: `${academyName} – ${sport} Academy in ${formattedCity} | Futuresportler`,
      description: `Join ${academyName}, a premier ${sport} academy in ${formattedCity}. Expert coaching, top-notch facilities, and personalized training await. Enroll now!`,
      keywords: `${academyName}, ${sport} academy ${formattedCity}, sports training ${formattedCity}, ${sport} coaching`,
      openGraph: {
        title: `${academyName} – ${sport} Academy in ${formattedCity}`,
        description: `Join ${academyName}, a premier ${sport} academy in ${formattedCity}. Expert coaching, top-notch facilities, and personalized training await.`,
        images: academy.images?.[0] ? [academy.images[0]] : [],
        locale: "en_IN",
        type: "website",
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: `Academy | Futuresportler`,
      description: `Find top sports academies and training centers.`,
    }
  }
}

export default async function AcademyDetailPage({ params }: PageProps) {
  try {
    const { city, slug } = await params

    // Fetch academy data
    const academies = await fetchAcademiesByCity(city)
    const academy = findAcademyBySlug(academies, slug)

    if (!academy) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <AcademiesDetails academy={academy} city={city} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading academy:", error)
    notFound()
  }
}
