"use client";

import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  User,
  CalendarIcon,
  Search,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import {
  getUserBookings,
  type Booking,
  type BookingFilters,
} from "@/services/bookingService";

export default function BookingsPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sessions, setSessions] = useState([]);
  const [view, setView] = useState("calendar"); // calendar or list
  const [filterType, setFilterType] = useState("all"); // all, training, fitness
  const [filterStatus, setFilterStatus] = useState("all"); // all, upcoming, completed, cancelled
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBookings, setTotalBookings] = useState(0);

  // Mock user ID - in real app, get from auth context
  const userId = "current-user-id";

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const filters: BookingFilters = {
        limit: 50,
        offset: 0,
      };

      if (filterType !== "all") {
        filters.supplier = filterType === "training" ? "coach" : "academy";
      }

      if (filterStatus !== "all") {
        filters.status = filterStatus;
      }

      const result = await getUserBookings(userId, filters);
      if (result.success && result.data) {
        setBookings(result.data.bookings);
        setTotalBookings(result.data.total);
      } else {
        console.error("Failed to fetch bookings:", result.error);
        setBookings([]);
        setTotalBookings(0);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setBookings([]);
      setTotalBookings(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [filterType, filterStatus]);

  // Convert bookings to sessions for selected date
  useEffect(() => {
    const dateString = selectedDate.toISOString().split("T")[0];
    const dayBookings = bookings.filter((booking) => {
      const bookingDate = new Date(booking.date).toISOString().split("T")[0];
      return bookingDate === dateString;
    });

    const convertedSessions = dayBookings.map((booking) => ({
      id: booking.bookingId,
      title: booking.details?.title || `${booking.supplierType} Session`,
      time:
        new Date(booking.date).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }) +
        " - " +
        new Date(
          new Date(booking.date).getTime() + 90 * 60000
        ).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      coach: booking.details?.coachName || "Coach",
      coachAvatar:
        booking.details?.coachAvatar ||
        "/placeholder.svg?height=48&width=48&text=C",
      location: booking.details?.location || "Training Venue",
      academy: booking.details?.academyName || "Academy",
      type: booking.supplierType === "coach" ? "training" : "fitness",
      status: booking.status,
      isPaid: booking.details?.isPaid || true,
      price: booking.details?.price || 1200,
    }));

    setSessions(convertedSessions);
  }, [selectedDate, bookings]);

  // Generate booking dates from real data
  const bookingDates = {};
  bookings.forEach((booking) => {
    const date = new Date(booking.date);
    const dateString = date.toISOString().split("T")[0];
    if (!bookingDates[dateString]) {
      bookingDates[dateString] = {
        count: 1,
        type: booking.supplierType === "coach" ? "training" : "fitness",
      };
    } else {
      bookingDates[dateString].count++;
    }
  });

  // Calendar navigation
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Calendar helpers
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const monthName = currentMonth.toLocaleString("default", { month: "long" });

  // Generate days array
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null); // Empty cells for days before the first day of the month
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i);
    const dateString = date.toISOString().split("T")[0];
    const hasBooking = bookingDates[dateString] !== undefined;
    const isSelected =
      selectedDate &&
      selectedDate.getDate() === i &&
      selectedDate.getMonth() === month &&
      selectedDate.getFullYear() === year;
    const isToday = new Date().getDate() === i && new Date().getMonth() === month && new Date().getFullYear() === year

    days.push({
      day: i,
      date,
      dateString,
      hasBooking,
      bookingType: hasBooking ? bookingDates[dateString].type : null,
      bookingCount: hasBooking ? bookingDates[dateString].count : 0,
      isSelected,
      isToday,
    });
  }

  // Convert bookings for list view
  const allBookings = bookings.map((booking) => ({
    id: booking.bookingId,
    title: booking.details?.title || `${booking.supplierType} Session`,
    coach: booking.details?.coachName || "Coach",
    coachAvatar:
      booking.details?.coachAvatar ||
      "/placeholder.svg?height=48&width=48&text=C",
    academy: booking.details?.academyName || "Academy",
    date: new Date(booking.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    time:
      new Date(booking.date).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }) +
      " - " +
      new Date(
        new Date(booking.date).getTime() + 90 * 60000
      ).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    location: booking.details?.location || "Training Venue",
    status: booking.status,
    isPaid: booking.details?.isPaid || true,
    type: booking.supplierType === "coach" ? "training" : "fitness",
    price: booking.details?.price || 1200,
  }));

  // Filter bookings for list view
  const filteredBookings = allBookings.filter((booking) => {
    if (filterStatus !== "all" && booking.status !== filterStatus) return false;
    if (filterType !== "all" && booking.type !== filterType) return false;
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "upcoming":
        return (
          <div className="flex items-center text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-medium">
            <CalendarIcon size={12} className="mr-1" />
            Upcoming
          </div>
        );
      case "completed":
        return (
          <div className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-xs font-medium">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </div>
        );
      case "cancelled":
        return (
          <div className="flex items-center text-red-600 bg-red-50 px-3 py-1 rounded-full text-xs font-medium">
            <XCircle size={12} className="mr-1" />
            Cancelled
          </div>
        );
      default:
        return null;
    }
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "training":
        return (
          <div className="flex items-center text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-medium">
            Training
          </div>
        );
      case "fitness":
        return (
          <div className="flex items-center text-purple-600 bg-purple-50 px-3 py-1 rounded-full text-xs font-medium">
            Fitness
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white border-b border-gray-200">
        <div className="px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Your Bookings</h1>
              <p className="text-gray-600 text-sm md:text-base">

                Manage your training sessions and track your progress

              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setView("calendar")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${view === "calendar"

                    ? "bg-indigo-600 text-white shadow-sm"

                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                📅 Calendar View
              </button>
              <button
                onClick={() => setView("list")}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${view === "list"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                📋 List View
              </button>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all shadow-sm">
                ➕ Book New Session
              </button>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-12 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading your bookings...</p>
          </div>
        </div>
      ) : view === "calendar" ? (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Calendar Header */}
            <div className="bg-gray-50 border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  {monthName} {year}
                </h2>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={prevMonth}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Previous month"
                  >
                    <ChevronLeft size={16} className="text-gray-600" />
                  </button>
                  <button
                    onClick={nextMonth}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                    aria-label="Next month"
                  >
                    <ChevronRight size={16} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="p-4">
              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div key={index} className="aspect-square">
                    {day !== null && (
                      <button
                        onClick={() => setSelectedDate(day.date)}
                        className={`w-full h-full flex flex-col items-center justify-center rounded-lg text-sm relative transition-all ${day.isSelected
                            ? "bg-indigo-600 text-white font-medium shadow-sm"
                            : day.isToday
                              ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                              : day.hasBooking
                                ? "bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200"
                                : "hover:bg-gray-100 text-gray-700"
                          }`}
                      >
                        <span>{day.day}</span>
                        {day.hasBooking && (
                          <div className="absolute bottom-1 flex space-x-0.5">
                            {Array.from({ length: day.bookingCount }).map((_, i) => (
                              <div
                                key={i}
                                className={`w-1.5 h-1.5 rounded-full ${day.isSelected
                                    ? "bg-white"
                                    : day.bookingType === "training"
                                      ? "bg-blue-500"
                                      : "bg-purple-500"
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
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">
                {selectedDate.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </h3>
              <div className="flex items-center space-x-4 text-xs">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-gray-600">Training</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-gray-600">Fitness</span>
                </div>
              </div>
            </div>

            {sessions.length > 0 ? (
              <div className="space-y-4">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className={`p-4 rounded-lg border ${session.type === "training"
                        ? "border-blue-200 bg-blue-50"
                        : "border-purple-200 bg-purple-50"
                      } hover:shadow-md transition-all`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={session.coachAvatar || "/placeholder.svg"}
                            alt={session.coach}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">
                            {session.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {session.coach}
                          </p>
                        </div>
                      </div>
                      <div
                        className={`text-xs px-2 py-1 rounded-full ${session.status === "upcoming"
                            ? "bg-green-100 text-green-700"
                            : session.status === "completed"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-700"
                          }`}
                      >
                        {session.status.charAt(0).toUpperCase() +
                          session.status.slice(1)}
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

                    <div className="mt-4 flex justify-between items-center">
                      <div className="text-sm font-bold text-gray-800">
                        ₹{session.price}
                      </div>
                      <div className="flex space-x-2">
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
                            {session.feedback
                              ? "View Feedback"
                              : "Leave Feedback"}
                          </button>
                        )}
                      </div>
                    </div>

                    {session.status === "completed" && session.feedback && (
                      <div className="mt-3 text-sm bg-green-50 px-3 py-1.5 rounded-md">
                        <div className="flex items-center text-green-700">
                          <span className="font-medium mr-1">Your Rating:</span>
                          {session.feedback.rating}/5
                        </div>
                        <div className="text-gray-600 mt-1">
                          {session.feedback.comment}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                <CalendarIcon size={48} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">
                  No sessions scheduled for this day
                </p>
                <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Book a Session
                </button>
              </div>
            )}
          </div>

          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-gray-800">Monthly Summary</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                View Full Calendar
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Total Sessions</div>
                <div className="text-2xl font-bold text-gray-800">
                  {totalBookings}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Upcoming</div>
                <div className="text-2xl font-bold text-green-600">
                  {bookings.filter((b) => b.status === "upcoming").length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Completed</div>
                <div className="text-2xl font-bold text-blue-600">
                  {bookings.filter((b) => b.status === "completed").length}
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="text-sm text-gray-500 mb-1">Cancelled</div>
                <div className="text-2xl font-bold text-red-600">
                  {bookings.filter((b) => b.status === "cancelled").length}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">All Bookings</h2>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-full md:w-64 text-sm"
                  />
                </div>
                <div className="relative">
                  <Filter
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 appearance-none bg-white text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="training">Training</option>
                    <option value="fitness">Fitness</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div
                  key={booking.id}
                  className={`p-6 hover:bg-gray-50 transition-colors ${booking.status === "upcoming"
                      ? "border-l-4 border-blue-500"
                      : booking.status === "completed"
                        ? "border-l-4 border-green-500"
                        : "border-l-4 border-red-500"
                    }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border-2 border-slate-100">
                        <Image
                          src={booking.coachAvatar || "/placeholder.svg"}
                          alt={booking.coach}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                          <h3 className="font-medium text-slate-900">
                            {booking.title}
                          </h3>
                          <div className="flex gap-2">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.status === "upcoming"
                                  ? "bg-sky-100 text-sky-700 border border-sky-200"
                                  : booking.status === "completed"
                                    ? "bg-emerald-100 text-emerald-700 border border-emerald-200"
                                    : "bg-slate-100 text-slate-700 border border-slate-200"
                                }`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${booking.type === "training"
                                  ? "bg-violet-100 text-violet-700 border border-violet-200"
                                  : "bg-amber-100 text-amber-700 border border-amber-200"
                                }`}
                            >
                              {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)}
                            </span>
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm mb-3">
                          {booking.coach} • {booking.academy}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-slate-600">
                          <div className="flex items-center">
                            <CalendarIcon
                              size={14}
                              className="mr-2 text-slate-400 flex-shrink-0"
                            />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock
                              size={14}
                              className="mr-2 text-slate-400 flex-shrink-0"
                            />
                            <span>{booking.time}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin
                              size={14}
                              className="mr-2 text-slate-400 flex-shrink-0"
                            />
                            <span className="truncate">{booking.location}</span>
                          </div>
                        </div>

                        {booking.status === "cancelled" &&
                          booking.cancellationReason && (
                            <div className="mt-3 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                              <span className="font-medium">Cancelled:</span> {booking.cancellationReason}
                            </div>
                          )}

                        {booking.status === "completed" && booking.feedback && (
                          <div className="mt-3 text-sm bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                            <div className="flex items-center text-emerald-700 mb-1">
                              <span className="font-medium mr-1">
                                Your Rating:
                              </span>
                              <span className="font-semibold">{booking.feedback.rating}/5</span>
                            </div>
                            <div className="text-slate-600">
                              {booking.feedback.comment}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-sm text-slate-500">Price</div>
                        <div className="font-semibold text-slate-900">
                          ₹{booking.price}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        {booking.status === "upcoming" && (
                          <>
                            <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              {booking.isPaid
                                ? "View Details"
                                : "Complete Payment"}
                            </button>
                            <button className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                              Reschedule
                            </button>
                          </>
                        )}

                        {booking.status === "completed" && (
                          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            {booking.feedback
                              ? "View Feedback"
                              : "Leave Feedback"}
                          </button>
                        )}

                        {booking.status === "cancelled" && (
                          <button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Book Again
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CalendarIcon size={24} className="text-slate-400" />
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">
                  No bookings found
                </h3>
                <p className="text-slate-600 mb-6">
                  {filterStatus !== "all" || filterType !== "all"
                    ? "No bookings match your filter criteria"
                    : "You haven't made any bookings yet"}
                </p>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book a Session
                </button>
              </div>
            )}
          </div>

          {filteredBookings.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-sm text-slate-500 mb-4 sm:mb-0">
                  Showing {filteredBookings.length} of {totalBookings} bookings
                </div>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
                  Book a New Session
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
