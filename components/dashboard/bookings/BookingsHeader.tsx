import { Calendar, Plus, ChevronDown, Grid, List } from "lucide-react"

export default function BookingsHeader() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center">
            Your Bookings <Calendar className="ml-2 text-blue-500" size={28} />
          </h1>
          <p className="text-gray-600 mt-1">Manage your sessions and appointments</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex rounded-lg overflow-hidden border border-gray-200">
            <button className="px-3 py-2 bg-blue-50 text-blue-600 border-r border-gray-200">
              <Grid size={18} />
            </button>
            <button className="px-3 py-2 bg-white text-gray-500 hover:bg-gray-50">
              <List size={18} />
            </button>
          </div>

          <div className="relative">
            <select className="appearance-none bg-white border border-gray-200 text-gray-700 py-2 px-4 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Next Month</option>
              <option>Custom Range</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <ChevronDown size={16} />
            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center">
            <Plus size={16} className="mr-1" />
            New Booking
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="text-sm text-blue-600 mb-1">Total Bookings</div>
          <div className="text-2xl font-bold text-gray-800">8</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="text-sm text-green-600 mb-1">Upcoming</div>
          <div className="text-2xl font-bold text-gray-800">5</div>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="text-sm text-purple-600 mb-1">Completed</div>
          <div className="text-2xl font-bold text-gray-800">2</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="text-sm text-red-600 mb-1">Cancelled</div>
          <div className="text-2xl font-bold text-gray-800">1</div>
        </div>
      </div>
    </div>
  )
}
