import { Header } from "@/components/Header"
import { CourtDetail } from "@/components/courts/CourtDetail"
import { courtDetail } from "@/data/courts-data"

export default function CourtDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch the court data based on the ID
  // For now, we'll use the dummy data
  return (
    <div className="min-h-screen bg-gray-50 w-full">
      <Header />
      <CourtDetail court={courtDetail} />
    </div>
  )
}

