import Image from "next/image"
import Link from "next/link"

const features = [
  {
    id: 1,
    title: "Group Coaching",
    description: "Accelerate your skills with tailored group coaching sessions for badminton players game.",
    icon: "/coache-icon-01.svg?height=48&width=48",
    link: "Learn More",
  },
  {
    id: 2,
    title: "Private Coaching",
    description: "Find private badminton coaches and academies for a personalized approach to skill enhancement.",
    icon: "/coache-icon-02.svg?height=48&width=48",
    link: "Learn More",
  },
  {
    id: 3,
    title: "Equipment Store",
    description: "Your one-stop shop for high-quality badminton equipment, enhancing your on-court performance.",
    icon: "/coache-icon-03.svg?height=48&width=48",
    link: "Learn More",
  },
  {
    id: 4,
    title: "Innovative Lessons",
    description:
      "Enhance your badminton skills with innovative lessons, combining modern techniques and training methods.",
    icon: "/coache-icon-04.svg?height=48&width=48",
    link: "Learn More",
  },
  {
    id: 5,
    title: "Sport Community",
    description:
      "Upgrade your game with engaging lessons and a supportive community. Join us now and take your skills to new heights.",
    icon: "/coache-icon-05.svg?height=48&width=48",
    link: "Learn More",
  },
  {
    id: 6,
    title: "Court Rental",
    description: "Enjoy uninterrupted badminton sessions at DreamSports with our premium court rental services.",
    icon: "/coache-icon-06.svg?height=48&width=48",
    link: "Learn More",
  },
]

export default function OurFeatures() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-emerald-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Image src="/placeholder.svg?height=150&width=150" alt="Decoration" width={150} height={150} />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10">
        <Image src="/placeholder.svg?height=150&width=150" alt="Decoration" width={150} height={150} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Our{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Features
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Discover your potential with our comprehensive training, expert trainers, and advanced facilities. Join us to
          improve your athletic career.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:translate-y-[-5px]"
            >
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-3 rounded-full">
                  <Image src={feature.icon || "/placeholder.svg"} alt={feature.title} width={48} height={48} />
                </div>
              </div>
              <h3 className="font-bold text-lg text-center mb-3">{feature.title}</h3>
              <p className="text-sm text-gray-500 text-center mb-4">{feature.description}</p>
              <div className="text-center">
                <Link href="#" className="text-emerald-600 text-sm font-medium hover:underline">
                  {feature.link}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

