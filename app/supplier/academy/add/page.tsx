"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  Building2,
  MapPin,
  Mail,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Globe,
  Trophy,
  Camera,
  Upload,
  Plus,
  Minus,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PhoneInput } from "@/components/ui/phone-input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AddAcademy() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)

  const [currentStep, setCurrentStep] = useState(1)
  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [videoPreview, setVideoPreview] = useState<string | null>(null)
  const [batchCount, setBatchCount] = useState(1)
  const [coachCount, setCoachCount] = useState(1)
  const [championCount, setChampionCount] = useState(0)
  const [isOwnerManager, setIsOwnerManager] = useState(true)

  const totalSteps = 6

  const [formData, setFormData] = useState({
    // Basic Information
    name: "",
    location: "",
    address: "",
    yearEstablished: new Date().getFullYear().toString(),
    description: "",
    phone: "",
    email: "",
    website: "",
    socialMedia: {
      facebook: "",
      instagram: "",
      twitter: "",
      youtube: "",
    },

    // Sports & Classes
    sports: {
      cricket: false,
      football: false,
      tennis: false,
      badminton: false,
      basketball: false,
      swimming: false,
      athletics: false,
      other: false,
    },
    otherSports: "",
    ageGroups: {
      infant: false, // 0-6
      children: false, // 6-12
      teens: false, // 12-22
    },
    classTypes: {
      oneOnOne: false,
      group: false,
    },

    // Coaches
    coaches: Array(coachCount).fill({
      name: "",
      specialization: "",
      experience: "",
      certification: "",
    }),

    // Batches & Fees
    batches: Array(batchCount).fill({
      name: "",
      timing: "",
      ageGroup: "",
      capacity: "",
      fee: "",
    }),

    // Owner & Manager
    owner: {
      name: "",
      phone: "",
      email: "",
      idType: "aadhar",
      idNumber: "",
    },
    manager: {
      name: "",
      phone: "",
      email: "",
      idType: "aadhar",
      idNumber: "",
    },

    // Business Details
    gstNumber: "",
    champions: Array(championCount).fill({
      name: "",
      achievement: "",
      year: "",
    }),

    // Payment Details
    paymentDetails: {
      accountNumber: "",
      ifscCode: "",
      accountName: "",
      upiId: "",
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // Handle nested properties
    if (name.includes(".")) {
      const [parent, child] = name.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSportChange = (sport: string) => {
    setFormData((prev) => ({
      ...prev,
      sports: {
        ...prev.sports,
        [sport]: !prev.sports[sport as keyof typeof prev.sports],
      },
    }))
  }

  const handleAgeGroupChange = (group: string) => {
    setFormData((prev) => ({
      ...prev,
      ageGroups: {
        ...prev.ageGroups,
        [group]: !prev.ageGroups[group as keyof typeof prev.ageGroups],
      },
    }))
  }

  const handleClassTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      classTypes: {
        ...prev.classTypes,
        [type]: !prev.classTypes[type as keyof typeof prev.classTypes],
      },
    }))
  }

  const handleBatchChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedBatches = [...prev.batches]
      updatedBatches[index] = {
        ...updatedBatches[index],
        [field]: value,
      }
      return {
        ...prev,
        batches: updatedBatches,
      }
    })
  }

  const handleCoachChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedCoaches = [...prev.coaches]
      updatedCoaches[index] = {
        ...updatedCoaches[index],
        [field]: value,
      }
      return {
        ...prev,
        coaches: updatedCoaches,
      }
    })
  }

  const handleChampionChange = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const updatedChampions = [...prev.champions]
      updatedChampions[index] = {
        ...updatedChampions[index],
        [field]: value,
      }
      return {
        ...prev,
        champions: updatedChampions,
      }
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newPreviews = Array.from(files).map((file) => URL.createObjectURL(file))
      setPreviewImages((prev) => [...prev, ...newPreviews])
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setVideoPreview(URL.createObjectURL(file))
    }
  }

  const addBatch = () => {
    setBatchCount((prev) => prev + 1)
    setFormData((prev) => ({
      ...prev,
      batches: [...prev.batches, { name: "", timing: "", ageGroup: "", capacity: "", fee: "" }],
    }))
  }

  const removeBatch = (index: number) => {
    if (batchCount > 1) {
      setBatchCount((prev) => prev - 1)
      setFormData((prev) => ({
        ...prev,
        batches: prev.batches.filter((_, i) => i !== index),
      }))
    }
  }

  const addCoach = () => {
    setCoachCount((prev) => prev + 1)
    setFormData((prev) => ({
      ...prev,
      coaches: [...prev.coaches, { name: "", specialization: "", experience: "", certification: "" }],
    }))
  }

  const removeCoach = (index: number) => {
    if (coachCount > 1) {
      setCoachCount((prev) => prev - 1)
      setFormData((prev) => ({
        ...prev,
        coaches: prev.coaches.filter((_, i) => i !== index),
      }))
    }
  }

  const addChampion = () => {
    setChampionCount((prev) => prev + 1)
    setFormData((prev) => ({
      ...prev,
      champions: [...prev.champions, { name: "", achievement: "", year: "" }],
    }))
  }

  const removeChampion = (index: number) => {
    if (championCount > 0) {
      setChampionCount((prev) => prev - 1)
      setFormData((prev) => ({
        ...prev,
        champions: prev.champions.filter((_, i) => i !== index),
      }))
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
      window.scrollTo(0, 0)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // In a real app, you would send this data to your API
      console.log("Submitting academy data:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Get existing modules from localStorage
      const storedModules = localStorage.getItem("supplierModules")
      const supplierModules = storedModules
        ? JSON.parse(storedModules)
        : {
            academy: { enabled: true, entities: [] },
            turf: { enabled: false, entities: [] },
            coach: { enabled: false, entities: [] },
          }

      // Add new academy
      const newAcademy = {
        id: Date.now(),
        name: formData.name,
        location: formData.location,
        sports: Object.keys(formData.sports).filter((sport) => formData.sports[sport as keyof typeof formData.sports]),
        yearEstablished: formData.yearEstablished,
      }

      supplierModules.academy.enabled = true
      supplierModules.academy.entities.push(newAcademy)

      // Save updated modules to localStorage
      localStorage.setItem("supplierModules", JSON.stringify(supplierModules))

      // Redirect to dashboard
      router.push("/supplier/dashboard")
    } catch (error) {
      console.error("Error adding academy:", error)
    }
  }

  const renderStepIndicator = () => {
    return (
      <div className="flex items-center justify-between mb-8 px-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep > index + 1
                  ? "bg-emerald-500 text-white"
                  : currentStep === index + 1
                    ? "bg-emerald-100 border-2 border-emerald-500 text-emerald-700"
                    : "bg-gray-100 text-gray-400"
              }`}
            >
              {currentStep > index + 1 ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
            </div>
            <span
              className={`text-xs mt-1 ${currentStep === index + 1 ? "text-emerald-700 font-medium" : "text-gray-500"}`}
            >
              {index === 0 && "Basic Info"}
              {index === 1 && "Sports & Classes"}
              {index === 2 && "Coaches"}
              {index === 3 && "Batches & Fees"}
              {index === 4 && "Owner & Manager"}
              {index === 5 && "Business Details"}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="container max-w-5xl py-6">
      <div className="flex items-center mb-6">
        <Link href="/supplier/dashboard" className="mr-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Add New Academy</h1>
      </div>

      {renderStepIndicator()}

      <form onSubmit={handleSubmit}>
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Provide the basic details about your academy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Academy Name*</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Building2 className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g. Premier Cricket Academy"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year of Establishment*</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <Select
                      value={formData.yearEstablished}
                      onValueChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          yearEstablished: value,
                        }))
                      }}
                    >
                      <SelectTrigger className="pl-10">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 50 }, (_, i) => (
                          <SelectItem key={i} value={(new Date().getFullYear() - i).toString()}>
                            {new Date().getFullYear() - i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">City/Location*</Label>
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
                      placeholder="e.g. Mumbai"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone*</Label>
                  <div className="relative">
                    <PhoneInput
                      value={formData.phone}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          phone: value,
                        }))
                      }}
                      inputProps={{
                        className: "w-full",
                        placeholder: "Enter phone number",
                        required: true,
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Full Address*</Label>
                <Textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter the complete address of your academy"
                  required
                  className="min-h-[100px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email*</Label>
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
                      placeholder="e.g. info@youracademy.com"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Globe className="h-5 w-5 text-gray-400" />
                    </div>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="e.g. www.youracademy.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Social Media Links (Optional)</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    name="socialMedia.facebook"
                    value={formData.socialMedia.facebook}
                    onChange={handleChange}
                    placeholder="Facebook URL"
                  />
                  <Input
                    name="socialMedia.instagram"
                    value={formData.socialMedia.instagram}
                    onChange={handleChange}
                    placeholder="Instagram URL"
                  />
                  <Input
                    name="socialMedia.twitter"
                    value={formData.socialMedia.twitter}
                    onChange={handleChange}
                    placeholder="Twitter URL"
                  />
                  <Input
                    name="socialMedia.youtube"
                    value={formData.socialMedia.youtube}
                    onChange={handleChange}
                    placeholder="YouTube URL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Academy Description*</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your academy, its mission, and what makes it special"
                  required
                  className="min-h-[120px]"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Sports & Classes */}
        {currentStep === 2 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Sports & Classes</CardTitle>
              <CardDescription>Tell us about the sports and classes you offer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Sports Available*</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {Object.keys(formData.sports).map((sport) => (
                    <div key={sport} className="flex items-center space-x-2">
                      <Checkbox
                        id={`sport-${sport}`}
                        checked={formData.sports[sport as keyof typeof formData.sports]}
                        onCheckedChange={() => handleSportChange(sport)}
                      />
                      <Label htmlFor={`sport-${sport}`} className="capitalize">
                        {sport === "other" ? "Other Sports" : sport}
                      </Label>
                    </div>
                  ))}
                </div>
                {formData.sports.other && (
                  <div className="mt-2">
                    <Input
                      placeholder="Please specify other sports"
                      value={formData.otherSports}
                      onChange={(e) => setFormData((prev) => ({ ...prev, otherSports: e.target.value }))}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <Label>Age Groups*</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="age-infant"
                      checked={formData.ageGroups.infant}
                      onCheckedChange={() => handleAgeGroupChange("infant")}
                    />
                    <Label htmlFor="age-infant">0-6 years (Infants)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="age-children"
                      checked={formData.ageGroups.children}
                      onCheckedChange={() => handleAgeGroupChange("children")}
                    />
                    <Label htmlFor="age-children">6-12 years (Children)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="age-teens"
                      checked={formData.ageGroups.teens}
                      onCheckedChange={() => handleAgeGroupChange("teens")}
                    />
                    <Label htmlFor="age-teens">12-22 years (Teens/Young Adults)</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Class Types*</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="class-one-on-one"
                      checked={formData.classTypes.oneOnOne}
                      onCheckedChange={() => handleClassTypeChange("oneOnOne")}
                    />
                    <Label htmlFor="class-one-on-one">One-on-One Training</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="class-group"
                      checked={formData.classTypes.group}
                      onCheckedChange={() => handleClassTypeChange("group")}
                    />
                    <Label htmlFor="class-group">Group Classes</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Photos & Videos</Label>
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="photos">Academy Photos</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Photos
                      </Button>
                      <input
                        ref={fileInputRef}
                        id="photos"
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>

                    {previewImages.length > 0 ? (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
                        {previewImages.map((src, index) => (
                          <div key={index} className="relative aspect-square rounded-md overflow-hidden border">
                            <Image
                              src={src || "/placeholder.svg"}
                              alt={`Academy preview ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Camera className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Upload photos of your academy facilities</p>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="video">Academy Video (Geolocation will be captured)</Label>
                      <Button type="button" variant="outline" size="sm" onClick={() => videoInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Video
                      </Button>
                      <input
                        ref={videoInputRef}
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                    </div>

                    {videoPreview ? (
                      <div className="mt-4 rounded-md overflow-hidden border">
                        <video src={videoPreview} controls className="w-full h-auto max-h-[300px]" />
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Camera className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">Upload a video tour of your academy</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Video should be live & geolocation will be captured
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Coaches */}
        {currentStep === 3 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Coaches Information</CardTitle>
              <CardDescription>Provide details about your coaching staff</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.coaches.map((coach, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Coach #{index + 1}</h3>
                    {coachCount > 1 && (
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeCoach(index)}>
                        <Minus className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`coach-name-${index}`}>Coach Name*</Label>
                      <Input
                        id={`coach-name-${index}`}
                        value={coach.name}
                        onChange={(e) => handleCoachChange(index, "name", e.target.value)}
                        placeholder="Full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`coach-specialization-${index}`}>Specialization*</Label>
                      <Input
                        id={`coach-specialization-${index}`}
                        value={coach.specialization}
                        onChange={(e) => handleCoachChange(index, "specialization", e.target.value)}
                        placeholder="e.g. Cricket Batting, Tennis"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`coach-experience-${index}`}>Years of Experience*</Label>
                      <Input
                        id={`coach-experience-${index}`}
                        value={coach.experience}
                        onChange={(e) => handleCoachChange(index, "experience", e.target.value)}
                        placeholder="e.g. 5"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`coach-certification-${index}`}>Certifications</Label>
                      <Input
                        id={`coach-certification-${index}`}
                        value={coach.certification}
                        onChange={(e) => handleCoachChange(index, "certification", e.target.value)}
                        placeholder="e.g. BCCI Level 2, ITF Level 1"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" className="w-full" onClick={addCoach}>
                <Plus className="h-4 w-4 mr-2" /> Add Another Coach
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Batches & Fees */}
        {currentStep === 4 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Batches, Timings & Fees</CardTitle>
              <CardDescription>Provide details about your training batches and fee structure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.batches.map((batch, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Batch #{index + 1}</h3>
                    {batchCount > 1 && (
                      <Button type="button" variant="destructive" size="sm" onClick={() => removeBatch(index)}>
                        <Minus className="h-4 w-4 mr-1" /> Remove
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`batch-name-${index}`}>Batch Name*</Label>
                      <Input
                        id={`batch-name-${index}`}
                        value={batch.name}
                        onChange={(e) => handleBatchChange(index, "name", e.target.value)}
                        placeholder="e.g. Morning Batch, Advanced Batch"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`batch-timing-${index}`}>Timing*</Label>
                      <Input
                        id={`batch-timing-${index}`}
                        value={batch.timing}
                        onChange={(e) => handleBatchChange(index, "timing", e.target.value)}
                        placeholder="e.g. Mon-Fri, 6:00 AM - 8:00 AM"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`batch-age-${index}`}>Age Group*</Label>
                      <Select
                        value={batch.ageGroup}
                        onValueChange={(value) => handleBatchChange(index, "ageGroup", value)}
                      >
                        <SelectTrigger id={`batch-age-${index}`}>
                          <SelectValue placeholder="Select age group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-6">0-6 years</SelectItem>
                          <SelectItem value="6-12">6-12 years</SelectItem>
                          <SelectItem value="12-22">12-22 years</SelectItem>
                          <SelectItem value="all">All ages</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`batch-capacity-${index}`}>Capacity*</Label>
                      <Input
                        id={`batch-capacity-${index}`}
                        value={batch.capacity}
                        onChange={(e) => handleBatchChange(index, "capacity", e.target.value)}
                        placeholder="e.g. 20"
                        type="number"
                        required
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor={`batch-fee-${index}`}>Monthly Fee (₹)*</Label>
                      <Input
                        id={`batch-fee-${index}`}
                        value={batch.fee}
                        onChange={(e) => handleBatchChange(index, "fee", e.target.value)}
                        placeholder="e.g. 2500"
                        type="number"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" className="w-full" onClick={addBatch}>
                <Plus className="h-4 w-4 mr-2" /> Add Another Batch
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 5: Owner & Manager */}
        {currentStep === 5 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Owner & Manager Information</CardTitle>
              <CardDescription>Provide details about the academy's ownership and management</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-lg font-medium">Owner Details</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="owner-name">Owner Name*</Label>
                    <Input
                      id="owner-name"
                      value={formData.owner.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          owner: {
                            ...prev.owner,
                            name: e.target.value,
                          },
                        }))
                      }
                      placeholder="Full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner-phone">Phone Number*</Label>
                    <PhoneInput
                      value={formData.owner.phone}
                      onChange={(value) => {
                        setFormData((prev) => ({
                          ...prev,
                          owner: {
                            ...prev.owner,
                            phone: value,
                          },
                        }))
                      }}
                      inputProps={{
                        id: "owner-phone",
                        className: "w-full",
                        placeholder: "Enter phone number",
                        required: true,
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner-email">Email*</Label>
                    <Input
                      id="owner-email"
                      type="email"
                      value={formData.owner.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          owner: {
                            ...prev.owner,
                            email: e.target.value,
                          },
                        }))
                      }
                      placeholder="Email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="owner-id-type">ID Type*</Label>
                    <Select
                      value={formData.owner.idType}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          owner: {
                            ...prev.owner,
                            idType: value,
                          },
                        }))
                      }
                    >
                      <SelectTrigger id="owner-id-type">
                        <SelectValue placeholder="Select ID type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="aadhar">Aadhar Card</SelectItem>
                        <SelectItem value="pan">PAN Card</SelectItem>
                        <SelectItem value="voter">Voter ID</SelectItem>
                        <SelectItem value="driving">Driving License</SelectItem>
                        <SelectItem value="passport">Passport</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="owner-id-number">ID Number*</Label>
                    <Input
                      id="owner-id-number"
                      value={formData.owner.idNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          owner: {
                            ...prev.owner,
                            idNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter ID number"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is-owner-manager"
                  checked={isOwnerManager}
                  onCheckedChange={(checked) => {
                    setIsOwnerManager(checked as boolean)
                    if (checked) {
                      // Copy owner details to manager
                      setFormData((prev) => ({
                        ...prev,
                        manager: {
                          ...prev.owner,
                        },
                      }))
                    }
                  }}
                />
                <Label htmlFor="is-owner-manager">Owner is also the manager</Label>
              </div>

              {!isOwnerManager && (
                <div className="p-4 border rounded-lg space-y-4">
                  <h3 className="text-lg font-medium">Manager Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="manager-name">Manager Name*</Label>
                      <Input
                        id="manager-name"
                        value={formData.manager.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manager: {
                              ...prev.manager,
                              name: e.target.value,
                            },
                          }))
                        }
                        placeholder="Full name"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manager-phone">Phone Number*</Label>
                      <PhoneInput
                        value={formData.manager.phone}
                        onChange={(value) => {
                          setFormData((prev) => ({
                            ...prev,
                            manager: {
                              ...prev.manager,
                              phone: value,
                            },
                          }))
                        }}
                        inputProps={{
                          id: "manager-phone",
                          className: "w-full",
                          placeholder: "Enter phone number",
                          required: true,
                        }}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manager-email">Email*</Label>
                      <Input
                        id="manager-email"
                        type="email"
                        value={formData.manager.email}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manager: {
                              ...prev.manager,
                              email: e.target.value,
                            },
                          }))
                        }
                        placeholder="Email address"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="manager-id-type">ID Type*</Label>
                      <Select
                        value={formData.manager.idType}
                        onValueChange={(value) =>
                          setFormData((prev) => ({
                            ...prev,
                            manager: {
                              ...prev.manager,
                              idType: value,
                            },
                          }))
                        }
                      >
                        <SelectTrigger id="manager-id-type">
                          <SelectValue placeholder="Select ID type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aadhar">Aadhar Card</SelectItem>
                          <SelectItem value="pan">PAN Card</SelectItem>
                          <SelectItem value="voter">Voter ID</SelectItem>
                          <SelectItem value="driving">Driving License</SelectItem>
                          <SelectItem value="passport">Passport</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="manager-id-number">ID Number*</Label>
                      <Input
                        id="manager-id-number"
                        value={formData.manager.idNumber}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            manager: {
                              ...prev.manager,
                              idNumber: e.target.value,
                            },
                          }))
                        }
                        placeholder="Enter ID number"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="button" onClick={nextStep}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 6: Business Details */}
        {currentStep === 6 && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Business & Payment Details</CardTitle>
              <CardDescription>Provide business and payment information for your academy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label htmlFor="gst-number">GST Number (Optional)</Label>
                <Input
                  id="gst-number"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, gstNumber: e.target.value }))}
                  placeholder="e.g. 22AAAAA0000A1Z5"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Champions & Achievements</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addChampion}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>

                {championCount > 0 ? (
                  <div className="space-y-4">
                    {formData.champions.map((champion, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">Champion #{index + 1}</h3>
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeChampion(index)}>
                            <Minus className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`champion-name-${index}`}>Name</Label>
                            <Input
                              id={`champion-name-${index}`}
                              value={champion.name}
                              onChange={(e) => handleChampionChange(index, "name", e.target.value)}
                              placeholder="Champion's name"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`champion-achievement-${index}`}>Achievement</Label>
                            <Input
                              id={`champion-achievement-${index}`}
                              value={champion.achievement}
                              onChange={(e) => handleChampionChange(index, "achievement", e.target.value)}
                              placeholder="e.g. National Gold Medalist"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor={`champion-year-${index}`}>Year</Label>
                            <Input
                              id={`champion-year-${index}`}
                              value={champion.year}
                              onChange={(e) => handleChampionChange(index, "year", e.target.value)}
                              placeholder="e.g. 2022"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center p-4 border border-dashed rounded-lg">
                    <Trophy className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">
                      Add details of any state/national champions your academy has produced
                    </p>
                  </div>
                )}
              </div>

              <div className="p-4 border rounded-lg space-y-4">
                <h3 className="text-lg font-medium">Payment Details</h3>
                <p className="text-sm text-gray-500">UPI is the preferred payment mode</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="account-number">Bank Account Number*</Label>
                    <Input
                      id="account-number"
                      value={formData.paymentDetails.accountNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentDetails: {
                            ...prev.paymentDetails,
                            accountNumber: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter account number"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ifsc-code">IFSC Code*</Label>
                    <Input
                      id="ifsc-code"
                      value={formData.paymentDetails.ifscCode}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentDetails: {
                            ...prev.paymentDetails,
                            ifscCode: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g. SBIN0000123"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="account-name">Account Holder Name*</Label>
                    <Input
                      id="account-name"
                      value={formData.paymentDetails.accountName}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentDetails: {
                            ...prev.paymentDetails,
                            accountName: e.target.value,
                          },
                        }))
                      }
                      placeholder="Enter account holder name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upi-id">UPI ID*</Label>
                    <Input
                      id="upi-id"
                      value={formData.paymentDetails.upiId}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentDetails: {
                            ...prev.paymentDetails,
                            upiId: e.target.value,
                          },
                        }))
                      }
                      placeholder="e.g. yourname@upi"
                      required
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="button" variant="outline" onClick={prevStep}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              <Button type="submit">Create Academy</Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </div>
  )
}
