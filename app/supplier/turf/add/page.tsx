"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Phone, Mail, ArrowLeft, Clock, DollarSign, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AddTurf() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    address: "",
    description: "",
    phone: "",
    email: "",
    turfType: "outdoor",
    sportTypes: {
      cricket: false,
      football: false,
      tennis: false,
      badminton: false,
      basketball: false,
      other: false,
    },
    facilities: {
      changingRooms: false,
      parking: false,
      floodlights: false,
      equipment: false,
      refreshments: false,
      spectatorSeating: false,
    },
    pricing: {
      hourly: "",
      halfDay: "",
      fullDay: "",
    },
    openingTime: "06:00",
    closingTime: "22:00",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNestedChange = (category: string, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [field]: value,
      },
    }))
  }

  const handleSportChange = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sportTypes: {
        ...prev.sportTypes,
        [sport]: !prev.sportTypes[sport as keyof typeof prev.sportTypes],
      },
    }))
  }

  const handleFacilityChange = (facility: string) => {
    setFormData((prev) => ({
      ...prev,
      facilities: {
        ...prev.facilities,
        [facility]: !prev.facilities[facility as keyof typeof prev.facilities],
      },
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, you would send this data to your API
      console.log("Submitting turf data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing modules from localStorage
      const storedModules = localStorage.getItem("supplierModules")
      const supplierModules = storedModules
        ? JSON.parse(storedModules)
        : {
            academy: { enabled: false, entities: [] },
            turf: { enabled: true, entities: [] },
            coach: { enabled: false, entities: [] },
          }

      // Add new turf
      const newTurf = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        sportTypes: Object.keys(formData.sportTypes).filter(
          (sport) => formData.sportTypes[sport as keyof typeof formData.sportTypes],
        ),
      }

      supplierModules.turf.enabled = true
      supplierModules.turf.entities.push(newTurf)

      // Save updated modules to localStorage
      localStorage.setItem("supplierModules", JSON.stringify(supplierModules))

      // Redirect to dashboard
      router.push("/supplier/dashboard")
    } catch (error) {
      console.error("Error adding turf:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="flex items-center mb-6">
        <Link href="/supplier/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Add New Turf</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the basic details about your turf</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Turf Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Green Field Turf"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">City/Location</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g. Bangalore"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter the complete address of your turf"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Turf Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your turf, its features, and what makes it special"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g. +91 9876543210"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g. info@yourturf.com"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Turf Details</CardTitle>
                <CardDescription>Specify the type of turf and sports offered</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Turf Type</Label>
                  <RadioGroup
                    defaultValue={formData.turfType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, turfType: value }))}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="indoor" id="indoor" />
                      <Label htmlFor="indoor">Indoor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="outdoor" id="outdoor" />
                      <Label htmlFor="outdoor">Outdoor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="hybrid" id="hybrid" />
                      <Label htmlFor="hybrid">Hybrid (Both)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label>Sports Available</Label>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.keys(formData.sportTypes).map((sport) => (
                      <div key={sport} className="flex items-center space-x-2">
                        <Checkbox
                          id={`sport-${sport}`}
                          checked={formData.sportTypes[sport as keyof typeof formData.sportTypes]}
                          onCheckedChange={() => handleSportChange(sport)}
                        />
                        <Label htmlFor={`sport-${sport}`} className="capitalize">
                          {sport === "other" ? "Other Sports" : sport}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Facilities Available</CardTitle>
                <CardDescription>Select all facilities available at your turf</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {Object.keys(formData.facilities).map((facility) => (
                    <div key={facility} className="flex items-center space-x-2">
                      <Checkbox
                        id={`facility-${facility}`}
                        checked={formData.facilities[facility as keyof typeof formData.facilities]}
                        onCheckedChange={() => handleFacilityChange(facility)}
                      />
                      <Label htmlFor={`facility-${facility}`} className="capitalize">
                        {facility.replace(/([A-Z])/g, " $1").trim()}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Operating Hours & Pricing</CardTitle>
              <CardDescription>Set your operating hours and pricing structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="openingTime">Opening Time</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="openingTime"
                      name="openingTime"
                      type="time"
                      value={formData.openingTime}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="closingTime">Closing Time</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="closingTime"
                      name="closingTime"
                      type="time"
                      value={formData.closingTime}
                      onChange={handleChange}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hourlyRate">Hourly Rate (₹)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="hourlyRate"
                      name="pricing.hourly"
                      type="number"
                      value={formData.pricing.hourly}
                      onChange={(e) => handleNestedChange("pricing", "hourly", e.target.value)}
                      className="pl-10"
                      placeholder="e.g. 1000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="halfDayRate">Half Day Rate (₹)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="halfDayRate"
                      name="pricing.halfDay"
                      type="number"
                      value={formData.pricing.halfDay}
                      onChange={(e) => handleNestedChange("pricing", "halfDay", e.target.value)}
                      className="pl-10"
                      placeholder="e.g. 4500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullDayRate">Full Day Rate (₹)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="fullDayRate"
                      name="pricing.fullDay"
                      type="number"
                      value={formData.pricing.fullDay}
                      onChange={(e) => handleNestedChange("pricing", "fullDay", e.target.value)}
                      className="pl-10"
                      placeholder="e.g. 8000"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Turf Images</CardTitle>
              <CardDescription>Upload images of your turf to showcase your facilities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label htmlFor="mainImage">Main Image</Label>
                  <Input id="mainImage" type="file" accept="image/*" onChange={handleImageChange} />
                  <p className="text-sm text-gray-500">This will be the primary image shown on your turf profile</p>
                </div>

                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 h-40">
                  {previewImage ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={previewImage || "/placeholder.svg"}
                        alt="Turf preview"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <Calendar className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">Image preview will appear here</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Turf"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </form>
    </div>
  )
}
