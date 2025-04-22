"use client"

import { useState, useEffect } from "react"

interface Reminder {
  id: string
  name: string
  sport: string
  overdue: string
}

interface FeeRemindersProps {
  reminders?: Reminder[]
}

// Default data that would be replaced by API data in a real application
const defaultReminders: Reminder[] = [
  {
    id: "r1",
    name: "Rohit Kumar",
    sport: "Cricket",
    overdue: "30 days",
  },
  {
    id: "r2",
    name: "Neha Gupta",
    sport: "Tennis",
    overdue: "15 days",
  },
  {
    id: "r3",
    name: "Amit Verma",
    sport: "Swimming",
    overdue: "5 days",
  },
]

export function FeeReminders({ reminders = defaultReminders }: FeeRemindersProps) {
  const [reminderData, setReminderData] = useState(reminders)

  // Update data when props change
  useEffect(() => {
    setReminderData(reminders)
  }, [reminders])

  // This would be replaced with an API call in a real application
  const handleSendAll = () => {
    console.log("Sending reminders to all users")
    // In a real app, you would call an API endpoint here
  }

  // This would be replaced with an API call in a real application
  const handleSendReminder = (id: string) => {
    console.log(`Sending reminder to user with ID: ${id}`)
    // In a real app, you would call an API endpoint here
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-800">Fee Reminders Pending</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700" onClick={handleSendAll}>
          Send All
        </button>
      </div>
      <div className="space-y-3">
        {reminderData.map((reminder) => (
          <ReminderItem
            key={reminder.id}
            id={reminder.id}
            name={reminder.name}
            sport={reminder.sport}
            overdue={reminder.overdue}
            onSendReminder={handleSendReminder}
          />
        ))}

        {reminderData.length === 0 && <div className="text-center py-4 text-gray-500">No fee reminders pending</div>}
      </div>
    </div>
  )
}

interface ReminderItemProps {
  id: string
  name: string
  sport: string
  overdue: string
  onSendReminder: (id: string) => void
}

function ReminderItem({ id, name, sport, overdue, onSendReminder }: ReminderItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">
          {sport} - {overdue} overdue
        </p>
      </div>
      <button className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs" onClick={() => onSendReminder(id)}>
        Remind
      </button>
    </div>
  )
}
