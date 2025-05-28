import type { Metadata } from "next"
import { notFound } from "next/navigation"
import CoachDetail from "@/components/coaches/CoachDetail"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { fetchCoachesByCity, findCoachBySlug } from "@/services/apiService"
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

    // Fetch coach data
    const coaches = await fetchCoachesByCity(city)
    const coach = findCoachBySlug(coaches, slug)

    if (!coach) {
      return {
        title: `Coach Not Found | Futuresportler`,
        description: `The requested coach could not be found.`,
      }
    }

    const coachName = coach.name || "Coach"
    const sport = coach.sport || "Sports"

    return {
      title: `${coachName} – ${sport} Coach in ${formattedCity} | Futuresportler`,
      description: `Train with ${coachName}, a professional ${sport} coach in ${formattedCity}. Expert guidance, personalized training programs, and proven results. Book your session now!`,
      keywords: `${coachName}, ${sport} coach ${formattedCity}, personal trainer ${formattedCity}, ${sport} training`,
      openGraph: {
        title: `${coachName} – ${sport} Coach in ${formattedCity}`,
        description: `Train with ${coachName}, a professional ${sport} coach in ${formattedCity}. Expert guidance, personalized training programs, and proven results.`,
        images: coach.image ? [coach.image] : [],
        locale: "en_IN",
        type: "website",
      },
    }
  } catch (error) {
    console.error("Error generating metadata:", error)
    return {
      title: `Coach | Futuresportler`,
      description: `Find professional sports coaches and trainers.`,
    }
  }
}

export default async function CoachDetailPage({ params }: PageProps) {
  try {
    const { city, slug } = await params

    // Fetch coach data
    const coaches = await fetchCoachesByCity(city)
    const coach = findCoachBySlug(coaches, slug)

    if (!coach) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CoachDetail coach={coach} city={city} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.error("Error loading coach:", error)
    notFound()
  }
}
