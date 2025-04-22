"use client"

import { useState, useEffect } from "react"
import { getPerformanceMetrics, type PerformanceMetrics as PerformanceMetricsType } from "@/services/dashboardService"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Star, TrendingUp, MessageCircle } from "lucide-react"

export default function PerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetricsType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("skills")

  useEffect(() => {
    async function loadMetrics() {
      try {
        setLoading(true)
        const metricsData = await getPerformanceMetrics()
        setMetrics(metricsData)
        setError(null)
      } catch (err) {
        console.error("Error loading performance metrics:", err)
        setError("Failed to load performance metrics")
      } finally {
        setLoading(false)
      }
    }

    loadMetrics()
  }, [])

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="h-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-4">Performance Metrics</h2>
        <div className="text-red-500 text-center py-4">{error}</div>
      </div>
    )
  }

  const skillRatings = metrics?.skillRatings || {}
  const recentProgress = metrics?.recentProgress || []
  const coachFeedback = metrics?.coachFeedback || []

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Performance Metrics</h2>

      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "skills"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("skills")}
        >
          <Star size={16} className="inline mr-2" />
          Skill Ratings
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "progress"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("progress")}
        >
          <TrendingUp size={16} className="inline mr-2" />
          Progress
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "feedback"
              ? "border-emerald-500 text-emerald-600"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("feedback")}
        >
          <MessageCircle size={16} className="inline mr-2" />
          Coach Feedback
        </button>
      </div>

      {activeTab === "skills" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(skillRatings).map(([skill, rating]) => (
              <div key={skill} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800 capitalize">{skill}</h3>
                  <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-sm font-medium">
                    {rating}/10
                  </div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${(Number(rating) / 10) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Coach's Tip:</strong> Focus on improving your strategy skills to advance to the next level.
            </p>
          </div>
        </div>
      )}

      {activeTab === "progress" && (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={recentProgress} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
              />
              <YAxis domain={[0, 10]} />
              <Tooltip
                formatter={(value) => [`${value}/10`, "Rating"]}
                labelFormatter={(date) =>
                  new Date(date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
                }
              />
              <Line type="monotone" dataKey="rating" stroke="#10b981" activeDot={{ r: 8 }} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>

          {recentProgress.length > 1 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Your performance has improved by{" "}
                <span className="font-medium text-emerald-600">
                  {(
                    ((recentProgress[recentProgress.length - 1]?.rating - recentProgress[0]?.rating) /
                      recentProgress[0]?.rating) *
                    100
                  ).toFixed(1)}
                  %
                </span>{" "}
                in the last month
              </p>
            </div>
          )}
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="space-y-4">
          {coachFeedback.map((feedback) => (
            <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium text-gray-800">Coach {feedback.coach}</h3>
                  <p className="text-xs text-gray-500">
                    {new Date(feedback.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < feedback.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700">{feedback.message}</p>
            </div>
          ))}

          {coachFeedback.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-2 opacity-30" />
              <p>No feedback available yet</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
