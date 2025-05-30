"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createCoach, type CreateCoachData } from "@/services/coachService"
import { Loader2 } from "lucide-react"

interface AddCoachModalProps {
  isOpen: boolean
  onClose: () => void
  academyId: string
  onCoachAdded: () => void
}

const sportOptions = [
  "Cricket",
  "Football",
  "Basketball",
  "Tennis",
  "Badminton",
  "Swimming",
  "Athletics",
  "Hockey",
  "Volleyball",
  "Table Tennis",
]

export function AddCoachModal({ isOpen, onClose, academyId, onCoachAdded }: AddCoachModalProps) {
  const [formData, setFormData] = useState<CreateCoachData>({
    name: "",
    email: "",
    mobileNumber: "",
    bio: "",
    hourlyRate: 0,
    experienceLevel: 0,
    sport: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: keyof CreateCoachData, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    // Basic validation
    if (!formData.name || !formData.email || !formData.mobileNumber || !formData.sport) {
      setError("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    if (formData.hourlyRate < 0 || formData.experienceLevel < 0) {
      setError("Hourly rate and experience level must be positive numbers")
      setIsLoading(false)
      return
    }

    try {
      const result = await createCoach(academyId, formData)

      if (result.success) {
        // Reset form
        setFormData({
          name: "",
          email: "",
          mobileNumber: "",
          bio: "",
          hourlyRate: 0,
          experienceLevel: 0,
          sport: "",
        })
        onCoachAdded()
        onClose()
      } else {
        setError(result.error || "Failed to create coach")
      }
    } catch (error) {
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    if (!isLoading) {
      setFormData({
        name: "",
        email: "",
        mobileNumber: "",
        bio: "",
        hourlyRate: 0,
        experienceLevel: 0,
        sport: "",
      })
      setError(null)
      onClose()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Coach</DialogTitle>
          <DialogDescription>Fill in the details to add a new coach to your academy.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter coach name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Enter email address"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number *</Label>
              <Input
                id="mobileNumber"
                value={formData.mobileNumber}
                onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                placeholder="Enter mobile number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sport">Sport *</Label>
              <Select value={formData.sport} onValueChange={(value) => handleInputChange("sport", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {sportOptions.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  min="0"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange("hourlyRate", Number.parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experienceLevel">Experience (Years)</Label>
                <Input
                  id="experienceLevel"
                  type="number"
                  min="0"
                  value={formData.experienceLevel}
                  onChange={(e) => handleInputChange("experienceLevel", Number.parseInt(e.target.value) || 0)}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange("bio", e.target.value)}
                placeholder="Enter coach bio and experience"
                className="min-h-[100px]"
              />
            </div>
          </div>

          {error && <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">{error}</div>}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Coach"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
