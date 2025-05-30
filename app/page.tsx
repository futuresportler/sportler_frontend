import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FeaturedPlayers from "@/components/FeaturedPlayers"
import FeaturedCoaches from "@/components/FeaturedCoaches"
import NearbyCourts from "@/components/NearbyCourts"
import CtaSection from "@/components/CtaSection"
import ExploreServices from "@/components/ExploreServices"
import OurFeatures from "@/components/OurFeatures"
import LatestNews from "@/components/LatestNews"
import Testimonials from "@/components/Testimonials"
import Footer from "@/components/Footer"
import ChatbotButton from "@/components/ChatbotButton"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-0">
        <HeroSection />
        <FeaturedPlayers />
        <FeaturedCoaches />
        <NearbyCourts />
        <CtaSection />
        <ExploreServices />
        <OurFeatures />
        <LatestNews />
        <Testimonials />
        <ChatbotButton />

      </main>
      <Footer />
    </div>
  )
}

