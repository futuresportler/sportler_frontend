import CoachDetail from "@/components/coaches/CoachDetail"
import { dummyCoaches } from "@/data/coaches-data"
import { notFound } from "next/navigation"

export default function CoachDetailPage({ params }: { params: { id: string } }) {
    if (!params?.id || isNaN(Number(params.id))) {
      notFound(); // Handle invalid or missing ID
    }
  
    const coachId = Number.parseInt(params.id, 10);
    const coach = dummyCoaches.find((c) => c.id === coachId);
  
    if (!coach) {
      notFound();
    }
  
    return <CoachDetail coach={coach} />;
  }
  

