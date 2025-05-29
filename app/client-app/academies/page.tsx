"use client"

export default function AcademiesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Sports Academies</h2>
          <p className="text-gray-600 mb-6">This page will integrate with your existing academies functionality.</p>
          <div className="bg-gray-50 rounded-lg p-4">
            <iframe src="/academies" className="w-full h-96 border-0 rounded-lg" title="Academies" />
          </div>
        </div>
      </div>
    </div>
  )
}
