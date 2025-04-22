"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Camera, Save, Loader2, CheckCircle, X } from "lucide-react"
import { getUserProfile } from "@/services/dashboardService"

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    primarySport: "",
    secondarySports: [],
    experience: "",
    goals: "",
    preferredTrainingDays: [],
    preferredTrainingTime: "",
  })
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)

  const sportOptions = [
    "Badminton",
    "Tennis",
    "Football",
    "Basketball",
    "Swimming",
    "Cricket",
    "Volleyball",
    "Table Tennis",
    "Golf",
    "Hockey",
    "Rugby",
    "Baseball",
  ]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const timeOptions = [
    "Early Morning (5AM-8AM)",
    "Morning (8AM-12PM)",
    "Afternoon (12PM-4PM)",
    "Evening (4PM-8PM)",
    "Night (8PM-11PM)",
  ]

  const experienceOptions = [
    "Beginner (0-1 years)",
    "Novice (1-2 years)",
    "Intermediate (2-5 years)",
    "Advanced (5-10 years)",
    "Expert (10+ years)",
  ]

  useEffect(() => {
    async function loadUserProfile() {
      try {
        const userData = await getUserProfile()
        setUser(userData)
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          bio: userData.bio || "",
          location: userData.location || "",
          primarySport: userData.primarySport || "",
          secondarySports: userData.secondarySports || [],
          experience: userData.experience || "",
          goals: userData.goals || "",
          preferredTrainingDays: userData.preferredTrainingDays || [],
          preferredTrainingTime: userData.preferredTrainingTime || "",
        })
        setImagePreview(userData.avatar || null)
      } catch (error) {
        console.error("Error loading user profile:", error)
        setError("Failed to load profile data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    loadUserProfile()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target

    if (name === "secondarySports") {
      setFormData((prev) => ({
        ...prev,
        secondarySports: checked
          ? [...prev.secondarySports, value]
          : prev.secondarySports.filter((sport) => sport !== value),
      }))
    } else if (name === "preferredTrainingDays") {
      setFormData((prev) => ({
        ...prev,
        preferredTrainingDays: checked
          ? [...prev.preferredTrainingDays, value]
          : prev.preferredTrainingDays.filter((day) => day !== value),
      }))
    }
  }

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setSuccess(false)
    setError("")

    try {
      // Simulate API call to update profile
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would upload the image and form data to your backend
      // const formDataToSend = new FormData()
      // if (profileImage) {
      //   formDataToSend.append('profileImage', profileImage)
      // }
      // Object.entries(formData).forEach(([key, value]) => {
      //   formDataToSend.append(key, value)
      // })
      // const response = await fetch('/api/profile', {
      //   method: 'PUT',
      //   body: formDataToSend
      // })

      setSuccess(true)

      // Auto-hide success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Failed to update profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse mx-auto md:mx-0"></div>
            <div className="flex-1 space-y-4">
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Edit Profile</h1>

        {success && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center text-emerald-700">
            <CheckCircle size={20} className="mr-2" />
            Profile updated successfully!
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center text-red-700">
            <X size={20} className="mr-2" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 cursor-pointer group"
                onClick={handleImageClick}
              >
                <Image
                  src={imagePreview || "/placeholder.svg?height=128&width=128&text=MS"}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera size={24} className="text-white" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" className="hidden" />
              <button
                type="button"
                onClick={handleImageClick}
                className="mt-3 text-sm text-emerald-600 hover:text-emerald-700"
              >
                Change Photo
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Tell us about yourself..."
            />
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Sports Preferences</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="primarySport" className="block text-sm font-medium text-gray-700 mb-1">
                  Primary Sport
                </label>
                <select
                  id="primarySport"
                  name="primarySport"
                  value={formData.primarySport}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select your primary sport</option>
                  {sportOptions.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select your experience level</option>
                  {experienceOptions.map((exp) => (
                    <option key={exp} value={exp}>
                      {exp}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Sports (Optional)</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {sportOptions
                  .filter((sport) => sport !== formData.primarySport)
                  .map((sport) => (
                    <div key={sport} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`sport-${sport}`}
                        name="secondarySports"
                        value={sport}
                        checked={formData.secondarySports.includes(sport)}
                        onChange={handleCheckboxChange}
                        className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`sport-${sport}`} className="ml-2 text-sm text-gray-700">
                        {sport}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Training Preferences</h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Training Days</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {daysOfWeek.map((day) => (
                  <div key={day} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`day-${day}`}
                      name="preferredTrainingDays"
                      value={day}
                      checked={formData.preferredTrainingDays.includes(day)}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor={`day-${day}`} className="ml-2 text-sm text-gray-700">
                      {day}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="preferredTrainingTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Training Time
                </label>
                <select
                  id="preferredTrainingTime"
                  name="preferredTrainingTime"
                  value={formData.preferredTrainingTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select preferred time</option>
                  {timeOptions.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="goals" className="block text-sm font-medium text-gray-700 mb-1">
                  Training Goals
                </label>
                <input
                  id="goals"
                  name="goals"
                  type="text"
                  value={formData.goals}
                  onChange={handleInputChange}
                  placeholder="e.g., Improve technique, Prepare for competition"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
