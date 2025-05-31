"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, UserPlus, X } from "lucide-react"
import { inviteCoachToAcademy, type InviteCoachRequest } from "@/services/invitationService"

interface InviteCoachModalProps {
  isOpen: boolean
  onClose: () => void
  academyId: string
  onInviteSent?: () => void
}

const SPORTS_OPTIONS = [
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
  "Boxing",
  "Wrestling",
  "Gymnastics",
  "Martial Arts",
]

const EXPERIENCE_LEVELS = [
  { value: "beginner", label: "Beginner (0-2 years)" },
  { value: "intermediate", label: "Intermediate (3-5 years)" },
  { value: "advanced", label: "Advanced (6-10 years)" },
  { value: "expert", label: "Expert (10+ years)" },
] as const

export function InviteCoachModal({ isOpen, onClose, academyId, onInviteSent }: InviteCoachModalProps) {
  const [formData, setFormData] = useState<InviteCoachRequest>({
    phoneNumber: "",
    email: "",
    name: "",
    bio: "",
    specialization: [],
    role: "coach",
    experienceLevel: "intermediate",
    certifications: [],
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<Record<keyof InviteCoachRequest, string>>>({})
  const [newSpecialization, setNewSpecialization] = useState("")
  const [newCertification, setNewCertification] = useState("")

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InviteCoachRequest, string>> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Coach name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required"
    } else if (!/^\+?[1-9]\d{1,14}$/.test(formData.phoneNumber.replace(/\s/g, ""))) {
      newErrors.phoneNumber = "Please enter a valid phone number"
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required"
    } else if (formData.bio.length < 20) {
      newErrors.bio = "Bio should be at least 20 characters long"
    }

    if (formData.specialization.length === 0) {
      newErrors.specialization = "At least one specialization is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Format phone number to ensure it starts with +
      const formattedPhoneNumber = formData.phoneNumber.startsWith("+")
        ? formData.phoneNumber
        : `+${formData.phoneNumber.replace(/^\+/, "")}`

      const inviteData: InviteCoachRequest = {
        ...formData,
        phoneNumber: formattedPhoneNumber,
      }

      const result = await inviteCoachToAcademy(academyId, inviteData)

      if (result.success) {
        toast.success(result.message || "Coach invitation sent successfully!")
        onInviteSent?.()
        handleClose()
      } else {
        toast.error(result.message || "Failed to send coach invitation")
      }
    } catch (error) {
      console.error("Error sending coach invitation:", error)
      toast.error("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({
      phoneNumber: "",
      email: "",
      name: "",
      bio: "",
      specialization: [],
      role: "coach",
      experienceLevel: "intermediate",
      certifications: [],
    })
    setErrors({})
    setNewSpecialization("")
    setNewCertification("")
    onClose()
  }

  const handleInputChange = (field: keyof InviteCoachRequest, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const addSpecialization = () => {
    if (newSpecialization.trim() && !formData.specialization.includes(newSpecialization.trim())) {
      handleInputChange("specialization", [...formData.specialization, newSpecialization.trim()])
      setNewSpecialization("")
    }
  }

  const removeSpecialization = (spec: string) => {
    handleInputChange(
      "specialization",
      formData.specialization.filter((s) => s !== spec),
    )
  }

  const addCertification = () => {
    if (newCertification.trim() && !formData.certifications.includes(newCertification.trim())) {
      handleInputChange("certifications", [...formData.certifications, newCertification.trim()])
      setNewCertification("")
    }
  }

  const removeCertification = (cert: string) => {
    handleInputChange(
      "certifications",
      formData.certifications.filter((c) => c !== cert),
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Coach
          </DialogTitle>
          <DialogDescription>
            Send an invitation to a coach to join your academy. They will receive a notification and can accept or
            decline the invitation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coach-name">Coach Name *</Label>
              <Input
                id="coach-name"
                placeholder="Enter coach's full name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="coach-email">Email Address *</Label>
              <Input
                id="coach-email"
                type="email"
                placeholder="coach@example.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="coach-phone">Phone Number *</Label>
              <Input
                id="coach-phone"
                placeholder="+91 98765 43210"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                className={errors.phoneNumber ? "border-red-500" : ""}
              />
              {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience-level">Experience Level *</Label>
              <Select
                value={formData.experienceLevel}
                onValueChange={(value) => handleInputChange("experienceLevel", value as any)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_LEVELS.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coach-bio">Bio *</Label>
            <Textarea
              id="coach-bio"
              placeholder="Tell us about the coach's background, experience, and achievements..."
              value={formData.bio}
              onChange={(e) => handleInputChange("bio", e.target.value)}
              className={errors.bio ? "border-red-500" : ""}
              rows={3}
            />
            {errors.bio && <p className="text-sm text-red-500">{errors.bio}</p>}
            <p className="text-xs text-gray-500">{formData.bio.length}/500 characters</p>
          </div>

          <div className="space-y-2">
            <Label>Specializations *</Label>
            <div className="flex gap-2">
              <Select value={newSpecialization} onValueChange={setNewSpecialization}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a sport" />
                </SelectTrigger>
                <SelectContent>
                  {SPORTS_OPTIONS.filter((sport) => !formData.specialization.includes(sport)).map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="button" onClick={addSpecialization} disabled={!newSpecialization}>
                Add
              </Button>
            </div>
            {formData.specialization.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.specialization.map((spec) => (
                  <Badge key={spec} variant="secondary" className="flex items-center gap-1">
                    {spec}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeSpecialization(spec)} />
                  </Badge>
                ))}
              </div>
            )}
            {errors.specialization && <p className="text-sm text-red-500">{errors.specialization}</p>}
          </div>

          <div className="space-y-2">
            <Label>Certifications (Optional)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Enter certification name"
                value={newCertification}
                onChange={(e) => setNewCertification(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCertification())}
              />
              <Button type="button" onClick={addCertification} disabled={!newCertification}>
                Add
              </Button>
            </div>
            {formData.certifications.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.certifications.map((cert) => (
                  <Badge key={cert} variant="outline" className="flex items-center gap-1">
                    {cert}
                    <X className="h-3 w-3 cursor-pointer" onClick={() => removeCertification(cert)} />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending Invitation...
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
