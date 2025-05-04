import Link from "next/link"
import { ClipboardCheck, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface VerificationPendingProps {
  academyName?: string
  submissionDate?: string
  message?: string
}

export function VerificationPending({
  academyName = "Your Academy",
  submissionDate,
  message,
}: VerificationPendingProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card className="border-none shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={36} className="text-amber-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Verification in Progress</CardTitle>
          <CardDescription className="text-gray-600 text-lg mt-2">{academyName} is under review</CardDescription>
        </CardHeader>
        <CardContent className="text-center px-6 py-8">
          <div className="mb-8">
            <p className="text-gray-600 mb-4">
              {message ||
                "Our team is currently reviewing your academy details. This process typically takes 1-2 business days."}
            </p>
            <p className="text-gray-600">
              You'll receive a notification once the verification is complete, and you'll gain full access to your
              supplier dashboard.
            </p>
            {submissionDate && <p className="text-gray-500 mt-4 text-sm">Submitted on: {submissionDate}</p>}
          </div>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-medium text-blue-800 mb-3 flex items-center">
              <ClipboardCheck size={20} className="mr-2" />
              While you wait, you can:
            </h3>
            <ul className="text-blue-700 space-y-2 text-left list-disc pl-6">
              <li>Complete your profile information if you haven't already</li>
              <li>Prepare any additional documents that might be requested</li>
              <li>Explore the DreamSports platform as a user</li>
              <li>Check out our supplier guidelines and best practices</li>
            </ul>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/supplier/profile" passHref>
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                Review Your Profile
              </Button>
            </Link>
            <Link href="/supplier/academy/add" passHref>
              <Button variant="outline" className="border-emerald-500 text-emerald-600 hover:bg-emerald-50">
                View Submitted Academy
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 p-4 text-center rounded-b-lg">
          <p className="text-gray-600 text-sm w-full">
            Need help?{" "}
            <Link href="/contact" className="text-emerald-600 hover:underline">
              Contact our support team
            </Link>
          </p>
        </CardFooter>
      </Card>

      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">What happens next?</h2>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-emerald-600 font-medium">1</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Verification Complete</h3>
              <p className="text-gray-600">
                Once your academy is verified, you'll receive an email notification and SMS alert.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-emerald-600 font-medium">2</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Dashboard Access</h3>
              <p className="text-gray-600">
                You'll gain full access to your supplier dashboard with all features and analytics.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-emerald-600 font-medium">3</span>
            </div>
            <div>
              <h3 className="font-medium text-gray-800">Start Managing Your Academy</h3>
              <p className="text-gray-600">
                Begin managing bookings, adding programs, and growing your business on DreamSports.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
