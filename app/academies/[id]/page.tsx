import { notFound } from "next/navigation"
import AcademyDetail from "@/components/academies/AcademiesDetails"
import { newAcademies } from "@/data/new-academies-data"

export default async function AcademyDetailPage({ params }: { params: { id: string } }) {
  const id = params.id
  const academyId = Number.parseInt(id)

  // In a real application, you would fetch the specific academy by ID
  // For now, we're using the sample data
  const academy = newAcademies.find((a) => a.id === academyId)

  if (!academy) {
    notFound()
  }

  return <AcademyDetail academy={academy} />
}
