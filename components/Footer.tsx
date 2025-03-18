import Image from "next/image"
import Link from "next/link"
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          {/* Space for SEO content */}
          <div className="mb-8">
            {/* SEO content will go here */}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Image src="/Logo.svg" alt="DreamSports" width={150} height={30} className="mb-4" />
            <p className="text-gray-400 text-sm mb-4">
              Connecting athletes with coaches and venues for an enhanced sporting experience.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Facebook</span>
                <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">
                  <FaFacebook size={16} />
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">
                  <FaTwitter size={16} />
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Instagram</span>
                <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">
                  <FaInstagram size={16} />
                </div>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">LinkedIn</span>
                <div className="w-8 h-8 border border-gray-600 rounded-full flex items-center justify-center">
                  <FaLinkedin size={16} />
                </div>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Coaches
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Venues
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <Link href="#" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold mb-4">Contact Info</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-start">
                <span className="mr-2">📍</span>
                <span>42 Jubilee Hills Road, Hyderabad 500033, India</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">📞</span>
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">✉️</span>
                <span>info@dreamsports.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-sm text-gray-400 flex flex-col md:flex-row justify-between items-center">
          <p>© {currentYear} Sportler. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}