import Image from "next/image"
import { Check } from "lucide-react"

export default function CtaSection() {
  return (
    <section className="relative py-16 px-4 md:px-8 lg:px-16 bg-gray-900 text-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/private-bg-01.jpg?height=600&width=1200"
          alt="Badminton player"
          fill
          className="object-cover opacity-80"
        />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 p-8 rounded-lg">
            <div className="flex space-x-4 mb-6">
              <button className="bg-white text-gray-800 px-4 py-2 rounded text-sm">Become A Coach</button>
              <button className="bg-gray-800 text-white px-4 py-2 rounded text-sm">Become A Venue Member</button>
            </div>

            <h2 className="text-3xl font-bold mb-4">Earn Money Renting Out Your Private Coaches On Sportler</h2>

            <p className="mb-6 text-emerald-100">
              Join our network of private facility owners, offering rentals to local players, coaches, and teams.
            </p>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start">
                <div className="bg-emerald-500 rounded-full p-1 mr-3 mt-0.5">
                  <Check className="text-white" size={14} />
                </div>
                <span>$1,000,000 liability insurance</span>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 rounded-full p-1 mr-3 mt-0.5">
                  <Check className="text-white" size={14} />
                </div>
                <span>Build of Trust</span>
              </li>
              <li className="flex items-start">
                <div className="bg-emerald-500 rounded-full p-1 mr-3 mt-0.5">
                  <Check className="text-white" size={14} />
                </div>
                <span>Protected Environment for Your Activities</span>
              </li>
            </ul>

            <button className="bg-gray-800 text-white px-6 py-2.5 rounded flex items-center">
              <span className="mr-2">✨</span>
              Join With Us
            </button>
          </div>

          {/* Right side is empty to allow the background image to show */}
          <div></div>
        </div>
      </div>
    </section>
  )
}

