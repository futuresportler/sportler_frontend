import AcademyDetail from "@/components/academies/AcademyDetail"
import { dummyAcademies } from "@/data/new-academies-data"
import { notFound } from "next/navigation"

export default function AcademyDetailPage({ params }: { params: { id: string } }) {
  const academyId = Number.parseInt(params.id)

  // Find the academy by ID
  const academy = dummyAcademies.find((a) => a.id === academyId)

  // If academy not found, return 404
  if (!academy) {
    notFound()
  }

  return <AcademyDetail academy={academy} />
}
