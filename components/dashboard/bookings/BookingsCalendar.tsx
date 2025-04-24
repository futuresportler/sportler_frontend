"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CalendarIcon, Clock, MapPin, User } from "lucide-react"

export default function BookingsCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [sessions, setSessions] = useState([])

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  // Calendar helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay()
  }

  // Sample booking dates with session counts
  const bookingDates = {
    "2025-04-10": { count: 1, type: "training" },
    "2025-04-14": { count: 1, type: "training" },
    "2025-04-16": { count: 1, type: "fitness" },
    "2025-04-20": { count: 2, type: "training" },
    "2025-04-23": { count: 1, type: "training" },
    "2025-04-25": { count: 1, type: "training" },
    "2025-04-28": { count: 1, type: "fitness" },
  }

  // Sample sessions for the selected date
  useEffect(() => {
    const dateString = selectedDate.toISOString().split("T")[0]

    // Mock sessions based on the selected date
    if (bookingDates[dateString]) {
      if (dateString === "2025-04-20") {
        setSessions([
          {
            id: 1,
            title: "Footwork & Smash Training",
            time: "10:00 AM - 11:30 AM",
            coach: "Coach J. Dhavan",
            location: "Court 3, Padukone Badminton Academy",
            type: "training",
            status: "upcoming",
          },
          {
            id: 2,
            title: "Fitness Session",
            time: "4:00 PM - 5:00 PM",
            coach: "Coach Sarah M.",
            location: "Fitness Center, Padukone Badminton Academy",
            type: "fitness",
            status: "upcoming",
          },
        ])
      } else if (dateString === "2025-04-14" || dateString === "2025-04-16") {
        setSessions([
          {
            id: 3,
            title: bookingDates[dateString].type === "training" ? "Basic Techniques Training" : "Fitness Training",
            time: "10:00 AM - 11:30 AM",
            coach: "Coach J. Dhavan",
            location: "Court 1, Padukone Badminton Academy",
            type: bookingDates[dateString].type,
            status: "completed",
          },
        ])
      } else {
        setSessions([
          {
            id: 4,
            title: bookingDates[dateString].type === "training" ? "Training Session" : "Fitness Session",
            time: "4:00 PM - 5:30 PM",
            coach: bookingDates[dateString].type === "training" ? "Coach Rahul K." : "Coach Priya S.",
            location:
              bookingDates[dateString].type === "training"
                ? "Court 2, Padukone Badminton Academy"
                : "Fitness Center, Padukone Badminton Academy",
            type: bookingDates[dateString].type,
            status: "upcoming",
          },
        ])
      }
    } else {
      setSessions([])
    }
  }, [selectedDate])

  // Generate calendar
  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const monthName = currentMonth.toLocaleString("default", { month: "long" })

  // Generate days array
  const days = []
  for (let i = 0; i < firstDay; i++) {
    days.push(null) // Empty cells for days before the first day of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    const dateString = date.toISOString().split("T")[0]
    const hasBooking = bookingDates[dateString] !== undefined
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year

    days.push({
      day: i,
      date,
      dateString,
      hasBooking,
      bookingType: hasBooking ? bookingDates[dateString].type : null,
      bookingCount: hasBooking ? bookingDates[dateString].count : 0,
      isSelected,
    })
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Calendar</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="text-lg font-medium">
              {monthName} {year}
            </span>

            <button
              onClick={nextMonth}
              className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
              aria-label="Next month"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
            <div key={day} className="text-xs font-medium text-white/80">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day !== null && (
                <button
                  onClick={() => setSelectedDate(day.date)}
                  className={`w-full h-full flex flex-col items-center justify-center rounded-lg text-sm relative transition-all ${
                    day.isSelected
                      ? "bg-white text-blue-600 font-bold shadow-lg transform scale-105"
                      : day.hasBooking
                        ? day.bookingType === "training"
                          ? "bg-blue-400/30 text-white hover:bg-blue-400/50"
                          : "bg-purple-400/30 text-white hover:bg-purple-400/50"
                        : "hover:bg-white/10 text-white"
                  }`}
                >
                  <span>{day.day}</span>
                  {day.hasBooking && (
                    <div className="absolute bottom-1 flex space-x-0.5">
                      {Array.from({ length: day.bookingCount }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-1 rounded-full ${
                            day.bookingType === "training" ? "bg-blue-300" : "bg-purple-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-1"></div>
              <span className="text-xs text-gray-500">Training</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-purple-400 mr-1"></div>
              <span className="text-xs text-gray-500">Fitness</span>
            </div>
          </div>
        </div>

        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`p-4 rounded-lg border ${
                  session.type === "training" ? "border-blue-200 bg-blue-50" : "border-purple-200 bg-purple-50"
                } hover:shadow-md transition-all`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{session.title}</h4>
                  <div
                    className={`text-xs px-2 py-1 rounded-full ${
                      session.status === "upcoming"
                        ? "bg-green-100 text-green-700"
                        : session.status === "completed"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-red-100 text-red-700"
                    }`}
                  >
                    {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600 mt-3">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-gray-500" />
                    <span>{session.time}</span>
                  </div>
                  <div className="flex items-center">
                    <User size={14} className="mr-2 text-gray-500" />
                    <span>{session.coach}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-2 text-gray-500" />
                    <span className="truncate">{session.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  {session.status === "upcoming" && (
                    <>
                      <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                        Check In
                      </button>
                      <button className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors">
                        Reschedule
                      </button>
                    </>
                  )}
                  {session.status === "completed" && (
                    <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Leave Feedback
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <CalendarIcon size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">No sessions scheduled for this day</p>
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
              Book a Session
            </button>
          </div>
        )}
      </div>

      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-gray-800">Monthly Summary</h3>
          <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">View Full Calendar</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Total Sessions</div>
            <div className="text-2xl font-bold text-gray-800">8</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Upcoming</div>
            <div className="text-2xl font-bold text-green-600">5</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Completed</div>
            <div className="text-2xl font-bold text-blue-600">2</div>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-500 mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-red-600">1</div>
          </div>
        </div>
      </div>
    </div>
  )
}
