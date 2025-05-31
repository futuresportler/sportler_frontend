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
import { toast } from "sonner"
import { Loader2, UserPlus } from "lucide-react"
import { inviteManagerToAcademy, type InviteManagerRequest } from "@/services/invitationService"

interface InviteManagerModalProps {
  isOpen: boolean
  onClose: () => void
  academyId: string
  onInviteSent?: () => void
}

export function InviteManagerModal({ isOpen, onClose, academyId, onInviteSent }: InviteManagerModalProps) {
  const [formData, setFormData] = useState<InviteManagerRequest>({
    phoneNumber: "",
    email: "",
    name: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Partial<InviteManagerRequest>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<InviteManagerRequest> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Manager name is required"
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

      const inviteData: InviteManagerRequest = {
        ...formData,
        phoneNumber: formattedPhoneNumber,
      }

      const result = await inviteManagerToAcademy(academyId, inviteData)

      if (result.success) {
        toast.success(result.message || "Manager invitation sent successfully!")
        onInviteSent?.()
        handleClose()
      } else {
        toast.error(result.message || "Failed to send manager invitation")
      }
    } catch (error) {
      console.error("Error sending manager invitation:", error)
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
    })
    setErrors({})
    onClose()
  }

  const handleInputChange = (field: keyof InviteManagerRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite Manager
          </DialogTitle>
          <DialogDescription>
            Send an invitation to a manager to help you manage this academy. They will receive a notification and can
            accept or decline the invitation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="manager-name">Manager Name *</Label>
            <Input
              id="manager-name"
              placeholder="Enter manager's full name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager-email">Email Address *</Label>
            <Input
              id="manager-email"
              type="email"
              placeholder="manager@example.com"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="manager-phone">Phone Number *</Label>
            <Input
              id="manager-phone"
              placeholder="+91 98765 43210"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
              className={errors.phoneNumber ? "border-red-500" : ""}
            />
            {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
            <p className="text-xs text-gray-500">Include country code (e.g., +91 for India)</p>
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
