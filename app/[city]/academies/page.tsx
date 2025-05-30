import type { Metadata } from "next"
import AcademiesLayout from "@/components/academies/AcademiesLayout"
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
    title: `Sports Academies in ${formattedCity} | Futuresportler`,
    description: `Find top sports academies in ${formattedCity}. Professional training, expert coaches, and world-class facilities.`,
    keywords: `sports academies ${formattedCity}, training centers ${formattedCity}, sports coaching ${formattedCity}`,
  }
}

export default async function AcademiesPage({ params }: PageProps) {
  const { city } = await params

  if (!city) {
    return <div>City not found</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <AcademiesLayout city={city} />
      <Footer />
    </div>
  )
}
