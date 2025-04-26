"use client"
import { useState } from "react"
import { Calendar, Clock, MapPin, CheckCircle, XCircle, Info, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"

// Types
interface Session {
  id: string
  title: string
  startTime: string
  endTime: string
  location: string
  type: "group" | "individual"
  sport: string
  ageGroup: string
  attendees: number
  maxAttendees: number
  status: "scheduled" | "cancelled" | "completed"
}

interface Booking {
  id: string
  studentName: string
  studentImage: string
  age: number
  sessionId: string
  sessionTitle: string
  sessionDate: string
  sessionTime: string
  location: string
  status: "pending" | "accepted" | "declined"
  requestDate: string
}

// Helper functions to replace date-fns
const formatDate = (date: Date, format: string): string => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const fullDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const fullMonths = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const dayOfWeek = date.getDay()

  if (format === "EEE") {
    return days[dayOfWeek]
  } else if (format === "EEEE") {
    return fullDays[dayOfWeek]
  } else if (format === "d") {
    return day.toString()
  } else if (format === "MMM d") {
    return `${months[month]} ${day}`
  } else if (format === "MMM d, yyyy") {
    return `${months[month]} ${day}, ${year}`
  } else if (format === "MMMM d, yyyy") {
    return `${fullMonths[month]} ${day}, ${year}`
  } else if (format === "MMMM yyyy") {
    return `${fullMonths[month]} ${year}`
  } else if (format === "h:mm a") {
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const ampm = hours >= 12 ? "pm" : "am"
    const hour12 = hours % 12 || 12
    return `${hour12}:${minutes.toString().padStart(2, "0")} ${ampm}`
  }

  return date.toLocaleDateString()
}

const startOfWeek = (date: Date, options?: { weekStartsOn: number }): Date => {
  const result = new Date(date)
  const dayOfWeek = result.getDay()
  const diff = (dayOfWeek + 7 - (options?.weekStartsOn || 0)) % 7
  result.setDate(result.getDate() - diff)
  result.setHours(0, 0, 0, 0)
  return result
}

const addDays = (date: Date, days: number): Date => {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

const isSameDay = (dateA: Date, dateB: Date): boolean => {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  )
}

const parseISO = (dateString: string): Date => {
  return new Date(dateString)
}

// Mock data
const mockSessions: Session[] = [
  {
    id: "1",
    title: "Cricket Batting Technique",
    startTime: "2023-06-10T09:00:00",
    endTime: "2023-06-10T10:30:00",
    location: "DreamSports Academy, Field 2",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 8,
    maxAttendees: 10,
    status: "scheduled",
  },
  {
    id: "2",
    title: "Advanced Bowling",
    startTime: "2023-06-10T11:00:00",
    endTime: "2023-06-10T12:30:00",
    location: "DreamSports Academy, Field 2",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 6,
    maxAttendees: 8,
    status: "scheduled",
  },
  {
    id: "3",
    title: "Personal Training - Rahul",
    startTime: "2023-06-10T14:00:00",
    endTime: "2023-06-10T15:00:00",
    location: "DreamSports Academy, Field 1",
    type: "individual",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 1,
    maxAttendees: 1,
    status: "scheduled",
  },
  {
    id: "4",
    title: "Fielding Drills",
    startTime: "2023-06-11T09:00:00",
    endTime: "2023-06-11T10:30:00",
    location: "DreamSports Academy, Field 3",
    type: "group",
    sport: "Cricket",
    ageGroup: "6-12",
    attendees: 12,
    maxAttendees: 15,
    status: "scheduled",
  },
  {
    id: "5",
    title: "Cricket for Beginners",
    startTime: "2023-06-12T16:00:00",
    endTime: "2023-06-12T17:30:00",
    location: "City Sports Complex",
    type: "group",
    sport: "Cricket",
    ageGroup: "0-6",
    attendees: 6,
    maxAttendees: 8,
    status: "scheduled",
  },
  {
    id: "6",
    title: "Personal Training - Priya",
    startTime: "2023-06-13T10:00:00",
    endTime: "2023-06-13T11:00:00",
    location: "DreamSports Academy, Field 1",
    type: "individual",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 1,
    maxAttendees: 1,
    status: "scheduled",
  },
  {
    id: "7",
    title: "Team Practice",
    startTime: "2023-06-14T15:00:00",
    endTime: "2023-06-14T17:00:00",
    location: "National Stadium",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 15,
    maxAttendees: 15,
    status: "scheduled",
  },
  {
    id: "8",
    title: "Wicket Keeping Masterclass",
    startTime: "2023-06-15T09:00:00",
    endTime: "2023-06-15T11:00:00",
    location: "DreamSports Academy, Field 2",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 5,
    maxAttendees: 6,
    status: "scheduled",
  },
  {
    id: "9",
    title: "Batting Fundamentals",
    startTime: "2023-06-11T13:00:00",
    endTime: "2023-06-11T14:30:00",
    location: "DreamSports Academy, Field 1",
    type: "group",
    sport: "Cricket",
    ageGroup: "6-12",
    attendees: 8,
    maxAttendees: 10,
    status: "scheduled",
  },
  {
    id: "10",
    title: "Personal Training - Amit",
    startTime: "2023-06-12T09:30:00",
    endTime: "2023-06-12T10:30:00",
    location: "DreamSports Academy, Field 1",
    type: "individual",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 1,
    maxAttendees: 1,
    status: "scheduled",
  },
  {
    id: "11",
    title: "Advanced Batting",
    startTime: "2023-06-13T16:00:00",
    endTime: "2023-06-13T17:30:00",
    location: "City Sports Complex",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 6,
    maxAttendees: 8,
    status: "scheduled",
  },
  {
    id: "12",
    title: "Spin Bowling Workshop",
    startTime: "2023-06-14T09:00:00",
    endTime: "2023-06-14T11:00:00",
    location: "DreamSports Academy, Field 3",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 7,
    maxAttendees: 8,
    status: "scheduled",
  },
  {
    id: "13",
    title: "Personal Training - Sneha",
    startTime: "2023-06-15T14:00:00",
    endTime: "2023-06-15T15:00:00",
    location: "DreamSports Academy, Field 1",
    type: "individual",
    sport: "Cricket",
    ageGroup: "6-12",
    attendees: 1,
    maxAttendees: 1,
    status: "scheduled",
  },
  {
    id: "14",
    title: "Cricket Strategy Session",
    startTime: "2023-06-16T10:00:00",
    endTime: "2023-06-16T12:00:00",
    location: "DreamSports Academy, Classroom",
    type: "group",
    sport: "Cricket",
    ageGroup: "12-22",
    attendees: 12,
    maxAttendees: 15,
    status: "scheduled",
  },
]

const mockBookings: Booking[] = [
  {
    id: "b1",
    studentName: "Arjun Sharma",
    studentImage: "/abstract-geometric-shapes.png",
    age: 14,
    sessionId: "1",
    sessionTitle: "Cricket Batting Technique",
    sessionDate: "2023-06-10",
    sessionTime: "09:00 - 10:30",
    location: "DreamSports Academy, Field 2",
    status: "pending",
    requestDate: "2023-06-05",
  },
  {
    id: "b2",
    studentName: "Meera Patel",
    studentImage: "/musical-performance.png",
    age: 10,
    sessionId: "4",
    sessionTitle: "Fielding Drills",
    sessionDate: "2023-06-11",
    sessionTime: "09:00 - 10:30",
    location: "DreamSports Academy, Field 3",
    status: "pending",
    requestDate: "2023-06-06",
  },
  {
    id: "b3",
    studentName: "Raj Kumar",
    studentImage: "/intertwined-initials.png",
    age: 16,
    sessionId: "7",
    sessionTitle: "Team Practice",
    sessionDate: "2023-06-14",
    sessionTime: "15:00 - 17:00",
    location: "National Stadium",
    status: "pending",
    requestDate: "2023-06-07",
  },
]

export default function CoachSchedulePage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedSession, setSelectedSession] = useState<Session | null>(null)
  const [bookings, setBookings] = useState<Booking[]>(mockBookings)
  const [openSessionDialog, setOpenSessionDialog] = useState(false)
  const [viewMode, setViewMode] = useState<"month" | "week" | "day" | "list">("month")

  // Generate month days
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  // Generate week days
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 }) // Start from Sunday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))

  // Get sessions for a specific day
  const getSessionsForDay = (date: Date) => {
    return mockSessions.filter((session) => {
      const sessionDate = parseISO(session.startTime)
      return isSameDay(sessionDate, date)
    })
  }

  // Handle booking response
  const handleBookingResponse = (bookingId: string, accept: boolean) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: accept ? "accepted" : "declined" } : booking,
      ),
    )
  }

  // Navigate to previous period
  const goToPrevious = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    } else if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, -7))
    } else if (viewMode === "day") {
      setCurrentDate(addDays(currentDate, -1))
    }
  }

  // Navigate to next period
  const goToNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    } else if (viewMode === "week") {
      setCurrentDate(addDays(currentDate, 7))
    } else if (viewMode === "day") {
      setCurrentDate(addDays(currentDate, 1))
    }
  }

  // Go to today
  const goToToday = () => {
    setCurrentDate(new Date())
  }

  // Get color based on session type
  const getSessionColor = (type: string) => {
    switch (type) {
      case "individual":
        return "bg-blue-100 border-l-4 border-blue-500 hover:bg-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-900/70"
      case "group":
        return "bg-emerald-100 border-l-4 border-emerald-500 hover:bg-emerald-200 dark:bg-emerald-900/50 dark:hover:bg-emerald-900/70"
      default:
        return "bg-purple-100 border-l-4 border-purple-500 hover:bg-purple-200 dark:bg-purple-900/50 dark:hover:bg-purple-900/70"
    }
  }

  // Render month view
  const renderMonthView = () => {
    // Create calendar grid with empty cells for days before the first of the month
    const calendarDays = []

    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-32 border border-muted/20 bg-muted/5 p-1"></div>)
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const isToday = isSameDay(date, new Date())
      const sessions = getSessionsForDay(date)

      calendarDays.push(
        <div
          key={day}
          className={`h-32 border border-muted/20 p-1 relative ${isToday ? "bg-blue-50/30 dark:bg-blue-950/20" : ""}`}
        >
          <div
            className={`absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full text-sm ${
              isToday ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {day}
          </div>

          <div className="mt-6 space-y-1 max-h-24 overflow-y-auto">
            {sessions.map((session) => (
              <div
                key={session.id}
                className={`text-xs p-1 rounded-md cursor-pointer truncate shadow-sm ${getSessionColor(session.type)}`}
                onClick={() => {
                  setSelectedSession(session)
                  setOpenSessionDialog(true)
                }}
              >
                {formatDate(parseISO(session.startTime), "h:mm a")} - {session.title}
              </div>
            ))}
          </div>
        </div>,
      )
    }

    return (
      <div className="grid grid-cols-7 gap-0">
        {/* Day headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center py-2 font-medium text-muted-foreground bg-muted/10 border border-muted/20"
          >
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {calendarDays}
      </div>
    )
  }

  // Render week view
  const renderWeekView = () => {
    return (
      <div className="flex flex-col">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b bg-muted/5">
          {weekDays.map((day, index) => (
            <div key={index} className="text-center py-3 border-r last:border-r-0">
              <div className="font-medium text-sm text-muted-foreground">{formatDate(day, "EEE")}</div>
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center mx-auto mt-1 font-semibold ${
                  isSameDay(day, new Date())
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted/20 transition-colors"
                }`}
              >
                {formatDate(day, "d")}
              </div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="flex">
          {/* Time labels */}
          <div className="w-16 bg-muted/5 border-r border-muted/20">
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
              <div key={hour} className="h-20 border-b border-muted/20 flex items-start justify-end pr-2 pt-1">
                <span className="text-xs font-medium text-muted-foreground">
                  {hour % 12 === 0 ? 12 : hour % 12}
                  {hour < 12 ? "am" : "pm"}
                </span>
              </div>
            ))}
          </div>

          {/* Week grid */}
          <div className="flex-1 grid grid-cols-7">
            {weekDays.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className={`border-r last:border-r-0 ${
                  isSameDay(day, new Date()) ? "bg-blue-50/30 dark:bg-blue-950/20" : ""
                }`}
              >
                {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
                  const date = new Date(day)
                  date.setHours(hour)

                  // Get sessions for this hour
                  const hourSessions = mockSessions.filter((session) => {
                    const sessionStart = parseISO(session.startTime)
                    const sessionEnd = parseISO(session.endTime)

                    return (
                      isSameDay(sessionStart, day) && sessionStart.getHours() <= hour && sessionEnd.getHours() > hour
                    )
                  })

                  return (
                    <div key={hour} className="h-20 border-b border-muted/20 relative">
                      {hourSessions.map((session, sessionIndex) => {
                        const sessionStart = parseISO(session.startTime)
                        const sessionStartHour = sessionStart.getHours()
                        const sessionStartMinute = sessionStart.getMinutes()

                        // Only render if this is the starting hour
                        if (sessionStartHour === hour) {
                          return (
                            <div
                              key={sessionIndex}
                              className={`absolute left-0 right-0 mx-1 rounded-md p-1.5 shadow-sm cursor-pointer ${getSessionColor(session.type)}`}
                              style={{
                                top: `${(sessionStartMinute / 60) * 100}%`,
                              }}
                              onClick={() => {
                                setSelectedSession(session)
                                setOpenSessionDialog(true)
                              }}
                            >
                              <div className="font-medium text-xs truncate">{session.title}</div>
                              <div className="text-xs truncate opacity-80">{formatDate(sessionStart, "h:mm a")}</div>
                            </div>
                          )
                        }
                        return null
                      })}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Render day view
  const renderDayView = () => {
    return (
      <div className="flex flex-col">
        {/* Day header */}
        <div className="text-center py-4 border-b bg-muted/5">
          <div className="font-medium text-muted-foreground">{formatDate(currentDate, "EEEE")}</div>
          <div
            className={`rounded-full w-10 h-10 flex items-center justify-center mx-auto mt-1 font-semibold text-lg ${
              isSameDay(currentDate, new Date()) ? "bg-primary text-primary-foreground" : ""
            }`}
          >
            {formatDate(currentDate, "d")}
          </div>
        </div>

        {/* Time slots */}
        <div className="flex">
          {/* Time labels */}
          <div className="w-20 bg-muted/5 border-r border-muted/20">
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => (
              <div key={hour} className="h-24 border-b border-muted/20 flex items-start justify-end pr-3 pt-2">
                <span className="text-sm font-medium text-muted-foreground">
                  {hour % 12 === 0 ? 12 : hour % 12}
                  {hour < 12 ? "am" : "pm"}
                </span>
              </div>
            ))}
          </div>

          {/* Day schedule */}
          <div className="flex-1">
            {Array.from({ length: 12 }, (_, i) => i + 8).map((hour) => {
              const date = new Date(currentDate)
              date.setHours(hour)

              // Get sessions for this hour
              const hourSessions = mockSessions.filter((session) => {
                const sessionStart = parseISO(session.startTime)
                const sessionEnd = parseISO(session.endTime)

                return (
                  isSameDay(sessionStart, currentDate) &&
                  sessionStart.getHours() <= hour &&
                  sessionEnd.getHours() > hour
                )
              })

              return (
                <div
                  key={hour}
                  className={`h-24 border-b border-muted/20 relative ${
                    isSameDay(currentDate, new Date()) && hour === new Date().getHours()
                      ? "bg-blue-50/30 dark:bg-blue-950/20"
                      : ""
                  }`}
                >
                  {hourSessions.map((session, sessionIndex) => {
                    const sessionStart = parseISO(session.startTime)
                    const sessionEnd = parseISO(session.endTime)
                    const sessionStartHour = sessionStart.getHours()
                    const sessionStartMinute = sessionStart.getMinutes()
                    const sessionDuration = (sessionEnd.getTime() - sessionStart.getTime()) / (1000 * 60 * 60)

                    // Only render if this is the starting hour
                    if (sessionStartHour === hour) {
                      return (
                        <div
                          key={sessionIndex}
                          className={`absolute left-0 right-0 mx-2 rounded-md p-2 shadow-sm cursor-pointer ${getSessionColor(session.type)}`}
                          style={{
                            top: `${(sessionStartMinute / 60) * 100}%`,
                            height: `${Math.min(sessionDuration, 1) * 100}%`,
                          }}
                          onClick={() => {
                            setSelectedSession(session)
                            setOpenSessionDialog(true)
                          }}
                        >
                          <div className="font-medium truncate">{session.title}</div>
                          <div className="flex items-center text-xs mt-1 truncate opacity-80">
                            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                            {formatDate(sessionStart, "h:mm a")} - {formatDate(sessionEnd, "h:mm a")}
                          </div>
                          <div className="flex items-center text-xs mt-0.5 truncate opacity-80">
                            <MapPin className="h-3 w-3 mr-1 flex-shrink-0" />
                            {session.location.split(",")[0]}
                          </div>
                        </div>
                      )
                    }
                    return null
                  })}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Render list view
  const renderListView = () => {
    // Get all sessions for the current month
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    const monthSessions = mockSessions
      .filter((session) => {
        const sessionDate = parseISO(session.startTime)
        return sessionDate >= monthStart && sessionDate <= monthEnd
      })
      .sort((a, b) => {
        return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      })

    // Group sessions by date
    const sessionsByDate: Record<string, Session[]> = {}
    monthSessions.forEach((session) => {
      const dateStr = formatDate(parseISO(session.startTime), "MMM d, yyyy")
      if (!sessionsByDate[dateStr]) {
        sessionsByDate[dateStr] = []
      }
      sessionsByDate[dateStr].push(session)
    })

    return (
      <div className="space-y-6">
        {Object.entries(sessionsByDate).map(([dateStr, sessions]) => (
          <div key={dateStr}>
            <h3 className="font-medium text-lg mb-2 sticky top-0 bg-background py-2">{dateStr}</h3>
            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`p-3 rounded-md shadow-sm cursor-pointer ${getSessionColor(session.type)}`}
                  onClick={() => {
                    setSelectedSession(session)
                    setOpenSessionDialog(true)
                  }}
                >
                  <div className="font-medium">{session.title}</div>
                  <div className="flex items-center text-sm mt-1">
                    <Clock className="h-4 w-4 mr-1.5" />
                    {formatDate(parseISO(session.startTime), "h:mm a")} -{" "}
                    {formatDate(parseISO(session.endTime), "h:mm a")}
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <MapPin className="h-4 w-4 mr-1.5" />
                    {session.location}
                  </div>
                  <div className="flex items-center text-sm mt-1">
                    <Badge variant="outline" className="capitalize">
                      {session.type}
                    </Badge>
                    <span className="ml-2 text-xs text-muted-foreground">
                      {session.attendees}/{session.maxAttendees} attendees
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Coach Schedule</h1>
        <Button variant="default" className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Session
        </Button>
      </div>

      <Card className="border-none shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-2xl">{formatDate(currentDate, "MMMM yyyy")}</CardTitle>
            <CardDescription>View and manage your coaching sessions</CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-md border border-muted/30 bg-background">
              <Button variant="ghost" size="sm" className="rounded-r-none border-r" onClick={goToPrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="rounded-none border-r" onClick={goToToday}>
                Today
              </Button>
              <Button variant="ghost" size="sm" className="rounded-l-none" onClick={goToNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex items-center rounded-md border border-muted/30 bg-background">
              <Button
                variant={viewMode === "month" ? "default" : "ghost"}
                size="sm"
                className="rounded-r-none border-r"
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
              <Button
                variant={viewMode === "week" ? "default" : "ghost"}
                size="sm"
                className="rounded-none border-r"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button
                variant={viewMode === "day" ? "default" : "ghost"}
                size="sm"
                className="rounded-none border-r"
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                List
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {viewMode === "month" && renderMonthView()}
          {viewMode === "week" && renderWeekView()}
          {viewMode === "day" && renderDayView()}
          {viewMode === "list" && <div className="p-4">{renderListView()}</div>}
        </CardContent>
      </Card>

      {/* Incoming Bookings */}
      <Card className="border-none shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 pb-4">
          <CardTitle>Incoming Bookings</CardTitle>
          <CardDescription>Manage student booking requests</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="accepted">Accepted</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>
            <TabsContent value="pending">
              <ScrollArea className="h-[400px] pr-4">
                {bookings
                  .filter((b) => b.status === "pending")
                  .map((booking) => (
                    <Card
                      key={booking.id}
                      className="mb-4 border border-muted/30 shadow-sm hover:shadow transition-shadow"
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={booking.studentImage || "/placeholder.svg"} alt={booking.studentName} />
                              <AvatarFallback>
                                {booking.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{booking.studentName}</CardTitle>
                              <CardDescription>Age: {booking.age}</CardDescription>
                            </div>
                          </div>
                          <Badge>New</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{booking.sessionTitle}</div>
                              <div>
                                {booking.sessionDate} • {booking.sessionTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleBookingResponse(booking.id, false)}>
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline
                        </Button>
                        <Button size="sm" onClick={() => handleBookingResponse(booking.id, true)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                {bookings.filter((b) => b.status === "pending").length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Info className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No pending booking requests</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="accepted">
              <ScrollArea className="h-[400px] pr-4">
                {bookings
                  .filter((b) => b.status === "accepted")
                  .map((booking) => (
                    <Card
                      key={booking.id}
                      className="mb-4 border border-muted/30 shadow-sm hover:shadow transition-shadow"
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={booking.studentImage || "/placeholder.svg"} alt={booking.studentName} />
                              <AvatarFallback>
                                {booking.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{booking.studentName}</CardTitle>
                              <CardDescription>Age: {booking.age}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="success">Accepted</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{booking.sessionTitle}</div>
                              <div>
                                {booking.sessionDate} • {booking.sessionTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {bookings.filter((b) => b.status === "accepted").length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Info className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No accepted bookings</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="declined">
              <ScrollArea className="h-[400px] pr-4">
                {bookings
                  .filter((b) => b.status === "declined")
                  .map((booking) => (
                    <Card
                      key={booking.id}
                      className="mb-4 border border-muted/30 shadow-sm hover:shadow transition-shadow"
                    >
                      <CardHeader className="p-4">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarImage src={booking.studentImage || "/placeholder.svg"} alt={booking.studentName} />
                              <AvatarFallback>
                                {booking.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-base">{booking.studentName}</CardTitle>
                              <CardDescription>Age: {booking.age}</CardDescription>
                            </div>
                          </div>
                          <Badge variant="destructive">Declined</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start">
                            <Calendar className="h-4 w-4 mr-2 mt-0.5" />
                            <div>
                              <div className="font-medium">{booking.sessionTitle}</div>
                              <div>
                                {booking.sessionDate} • {booking.sessionTime}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{booking.location}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                {bookings.filter((b) => b.status === "declined").length === 0 && (
                  <div className="flex flex-col items-center justify-center h-40 text-center">
                    <Info className="h-12 w-12 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No declined bookings</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Session Details Dialog */}
      <Dialog open={openSessionDialog} onOpenChange={setOpenSessionDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedSession?.title}</DialogTitle>
            <DialogDescription>Session details and attendee information</DialogDescription>
          </DialogHeader>

          {selectedSession && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h4>
                  <p className="text-sm">
                    {formatDate(parseISO(selectedSession.startTime), "MMMM d, yyyy")}
                    <br />
                    {formatDate(parseISO(selectedSession.startTime), "h:mm a")} -{" "}
                    {formatDate(parseISO(selectedSession.endTime), "h:mm a")}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Location</h4>
                  <p className="text-sm">{selectedSession.location}</p>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Session Type</h4>
                  <Badge variant="outline" className="capitalize">
                    {selectedSession.type}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Sport</h4>
                  <p className="text-sm">{selectedSession.sport}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Age Group</h4>
                  <p className="text-sm">{selectedSession.ageGroup}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Attendees</h4>
                  <p className="text-sm">
                    {selectedSession.attendees} / {selectedSession.maxAttendees}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Attendee List</h4>
                <div className="space-y-2">
                  {/* Mock attendees - in a real app, you'd fetch this data */}
                  {Array.from({ length: selectedSession.attendees }).map((_, i) => (
                    <div key={i} className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={`/diverse-students-studying.png?height=32&width=32&query=Student ${i + 1}`} />
                        <AvatarFallback>S{i + 1}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Student {i + 1}</p>
                        <p className="text-xs text-muted-foreground">Age: {10 + Math.floor(Math.random() * 10)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenSessionDialog(false)}>
              Close
            </Button>
            <Button>Edit Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
