import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    title: "Court Rent",
    image: "/pexels-athena-2961964.jpg?height=240&width=240",
    link: "Learn More",
  },
  {
    id: 2,
    title: "Group Lesson",
    image: "/pexels-pavel-danilyuk-6203586.jpg?height=240&width=240",
    link: "Learn More",
  },
  {
    id: 3,
    title: "Training Program",
    image: "/service-03.jpg?height=240&width=240",
    link: "Learn More",
  },
  {
    id: 4,
    title: "Private Lessons",
    image: "pexels-cliff-booth-4056616.jpg?height=240&width=240",
    link: "Learn More",
  },
]

export default function ExploreServices() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute  top-15 left-0 opacity-50">
        <Image src="/bg-03.png?height=150&width=150" alt="Decoration" width={130} height={130} />
      </div>
      <div className="absolute bottom-10 right-0 opacity-70">
        <Image src="/cock-shape.png?height=150&width=150" alt="Decoration" width={150} height={150} />
      </div>

      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Explore Our{" "}
          <span className="text-emerald-600 bg-gradient-to-r from-emerald-500 to-emerald-700 bg-clip-text text-transparent">
            Services
          </span>
        </h2>
        <p className="text-gray-500 text-center mb-12 max-w-3xl mx-auto">
          Fostering excellence and empowering sports growth through tailored services for athletes, coaches, and
          enthusiasts.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {services.map((service) => (
            <div key={service.id} className="flex flex-col items-center group">
              <div className="rounded-lg overflow-hidden mb-4 w-full aspect-square shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={240}
                  height={240}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white z-20">
                  <h3 className="font-medium text-center">{service.title}</h3>
                </div>
              </div>
              <Link href="#" className="text-emerald-600 text-sm hover:underline relative">
                {service.link}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-emerald-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="#"
            className="inline-flex items-center bg-gray-800 text-white px-6 py-2.5 rounded-full font-medium hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  )
}

