import type React from "react"
import { Plus, Users, FileText, ArrowDownToLine } from "lucide-react"

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 gap-3">
        <ActionButton title="Add Batch" icon={<Plus size={20} />} />
        <ActionButton title="New Enrollment" icon={<Users size={20} />} />
        <ActionButton title="Create Invoice" icon={<FileText size={20} />} />
        <ActionButton title="Export Report" icon={<ArrowDownToLine size={20} />} />
      </div>
    </div>
  )
}

interface ActionButtonProps {
  title: string
  icon: React.ReactNode
}

function ActionButton({ title, icon }: ActionButtonProps) {
  return (
    <button className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="text-2xl text-blue-600 mb-1">{icon}</div>
      <div className="text-sm font-medium text-gray-700">{title}</div>
    </button>
  )
}
