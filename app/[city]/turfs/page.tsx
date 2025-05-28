import type { Metadata } from "next"
import CourtsLayout from "@/components/courts/CourtsLayout"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { formatCityForDisplay } from "@/utils/slug"

interface PageProps {
  params: Promise<{
    city: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params
  const formattedCity = formatCityForDisplay(city)

  return {
    title: `Sports Turfs in ${formattedCity} | Futuresportler`,
    description: `Book premium sports turfs in ${formattedCity}. Modern facilities, well-maintained grounds, and easy booking.`,
    keywords: `sports turfs ${formattedCity}, ground booking ${formattedCity}, sports facilities ${formattedCity}`,
  }
}

export default async function TurfsPage({ params }: PageProps) {
  const { city } = await params

  if (!city) {
    return <div>City not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CourtsLayout city={city} />
      <Footer />
    </div>
  )
}
