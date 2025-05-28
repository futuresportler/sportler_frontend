"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ThumbsUp, MessageCircle, ChevronRight } from "lucide-react"

export default function FeedbackSection() {
  const [selectedRating, setSelectedRating] = useState(0)

  const recentFeedback = [
    {
      id: 1,
      coach: "Sarah Johnson",
      session: "Tennis Training",
      date: "Yesterday",
      rating: 5,
      comment: "Excellent session! Really improved my backhand technique.",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    {
      id: 2,
      coach: "Mike Chen",
      session: "Basketball Practice",
      date: "2 days ago",
      rating: 4,
      comment: "Great coaching, learned new defensive strategies.",
      avatar: "/placeholder.svg?height=40&width=40&text=MC",
    },
  ]

  return (
    <div className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Recent Feedback</h3>
        <button className="text-orange-600 text-sm font-medium flex items-center">
          View All <ChevronRight size={16} />
        </button>
      </div>

      {/* Quick Feedback */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
        <h4 className="font-semibold text-gray-900 mb-3">Rate Your Last Session</h4>
        <div className="flex items-center space-x-2 mb-3">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => setSelectedRating(star)} className="transition-colors">
              <Star
                size={24}
                className={`${
                  star <= selectedRating ? "text-yellow-400 fill-current" : "text-gray-300"
                } hover:text-yellow-400`}
              />
            </button>
          ))}
        </div>
        <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors">
          Submit Feedback
        </button>
      </div>

      {/* Recent Feedback List */}
      <div className="space-y-3">
        {recentFeedback.map((feedback) => (
          <div key={feedback.id} className="bg-white rounded-xl p-3 shadow-sm border border-gray-100">
            <div className="flex items-start space-x-3">
              <div className="h-10 w-10 rounded-xl overflow-hidden bg-gray-100">
                <Image
                  src={feedback.avatar || "/placeholder.svg"}
                  alt={feedback.coach}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{feedback.session}</h4>
                  <span className="text-xs text-gray-500">{feedback.date}</span>
                </div>
                <p className="text-xs text-gray-600 mb-2">{feedback.coach}</p>

                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={`${i < feedback.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>

                <p className="text-sm text-gray-700">{feedback.comment}</p>
              </div>

              <div className="flex space-x-1">
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <ThumbsUp size={14} className="text-gray-400" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <MessageCircle size={14} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
