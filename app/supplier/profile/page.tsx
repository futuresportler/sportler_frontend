"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Image from "next/image"
import { Camera, Save, Loader2, CheckCircle, X, ArrowRight } from "lucide-react"
import { updateOnboardingState } from "@/services/authService"
import type { SupplierProfile } from "@/types/supplier"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { getSupplierProfile, updateSupplierProfile } from "@/services/supplierService"
import { checkAcademyVerificationStatus } from "@/services/academyService"

export default function SupplierProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isNewUser = searchParams.get("newUser") === "true"

  const [supplierTypes, setSupplierTypes] = useState({
    academy: false,
    turf: false,
    coach: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState("")
  const [error, setError] = useState("")
  const [formData, setFormData] = useState<SupplierProfile>({
    name: "",
    email: "",
    phone: "",
    governmentId: "",
    governmentIdType: "aadhar",
    address: "",
    city: "",
    state: "",
    pincode: "",
    businessName: "",
    gstNumber: "",
    bankAccountName: "",
    bankAccountNumber: "",
    ifscCode: "",
    upiId: "",
    bio: "",
    profileCompleted: false,
  })
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Get supplier types from localStorage
    const storedTypes = localStorage.getItem("supplierTypes")
    if (storedTypes) {
      setSupplierTypes(JSON.parse(storedTypes))
    } else {
      // Default to academy if no types are stored
      setSupplierTypes({
        academy: true,
        turf: false,
        coach: false,
      })
      localStorage.setItem(
        "supplierTypes",
        JSON.stringify({
          academy: true,
          turf: false,
          coach: false,
        }),
      )
    }

    // Fetch supplier profile data
    const fetchSupplierProfile = async () => {
      try {
        const profileResponse = await getSupplierProfile()

        // If we have profile data, update the form
        if (profileResponse.success && profileResponse.data) {
          const supplierData = profileResponse.data

          // Map API data to form fields
          setFormData({
            name: supplierData.name || formData.name || "",
            email: supplierData.email || "",
            phone: supplierData.mobile_number || "",
            governmentId: formData.governmentId || "", // Keep existing value
            governmentIdType: formData.governmentIdType || "aadhar", // Keep existing value
            address: formData.address || "", // Keep existing value
            city: formData.city || "", // Keep existing value
            state: formData.state || "", // Keep existing value
            pincode: formData.pincode || "", // Keep existing value
            businessName: formData.businessName || "", // Keep existing value
            gstNumber: supplierData.gstNumber || "",
            bankAccountName: supplierData.accountHolderName || "",
            bankAccountNumber: supplierData.bankAccountNumber || "",
            ifscCode: supplierData.ifscCode || "",
            upiId: supplierData.upiId || "",
            bio: formData.bio || "", // Keep existing value
            profileCompleted: supplierData.isVerified || false,
          })

          // If the profile has an image URL, set it as the preview
          if (supplierData.profilePicture) {
            setImagePreview(supplierData.profilePicture)
          }

          // Update supplier types based on modules
          if (supplierData.module && Array.isArray(supplierData.module)) {
            const newTypes = {
              academy: supplierData.module.includes("academy") || supplierData.academyProfiles?.length > 0,
              turf: supplierData.module.includes("turf") || supplierData.turfProfiles?.length > 0,
              coach: supplierData.module.includes("coach") || supplierData.coachProfile !== null,
            }
            setSupplierTypes(newTypes)
            localStorage.setItem("supplierTypes", JSON.stringify(newTypes))
          } else {
            // Infer supplier types from the presence of profiles
            const newTypes = {
              academy: Array.isArray(supplierData.academyProfiles) && supplierData.academyProfiles.length > 0,
              turf: Array.isArray(supplierData.turfProfiles) && supplierData.turfProfiles.length > 0,
              coach: supplierData.coachProfile !== null,
            }
            setSupplierTypes(newTypes)
            localStorage.setItem("supplierTypes", JSON.stringify(newTypes))
          }

          // Check if this is truly a new user (no academy created yet)
          if (isNewUser && Array.isArray(supplierData.academyProfiles) && supplierData.academyProfiles.length > 0) {
            // User has academies, so they're not really a new user anymore
            router.replace("/supplier/profile")
          }
        } else if (isNewUser) {
          // For new users with no profile, pre-fill minimal data
          setFormData({
            ...formData,
            phone: localStorage.getItem("userPhone") || "",
          })
        }
      } catch (error) {
        console.error("Error fetching supplier profile:", error)
        // For new users or if there's an error, pre-fill minimal data
        if (isNewUser) {
          setFormData({
            ...formData,
            phone: localStorage.getItem("userPhone") || "",
          })
        }
      } finally {
        setLoading(false)
      }
    }

    fetchSupplierProfile()
  }, [isNewUser, router])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setProfileImage(file)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  // Update the handleSubmit function to ensure proper redirection after profile completion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSuccess("")
    setError("")

    try {
      // Validate required fields
      const requiredFields = ["name", "email", "phone", "address", "city", "state", "pincode"]
      const missingFields = requiredFields.filter((field) => !formData[field as keyof SupplierProfile])

      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(", ")}`)
      }

      // Create form data for the API request
      const formDataToSend = new FormData()

      // Add profile image if it exists
      if (profileImage) {
        formDataToSend.append("profileImage", profileImage)
      }

      // Add all form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataToSend.append(key, value.toString())
        }
      })

      // Add supplier types as module array
      const moduleArray: string[] = []
      if (supplierTypes.academy) moduleArray.push("academy")
      if (supplierTypes.turf) moduleArray.push("turf")
      if (supplierTypes.coach) moduleArray.push("coach")
      formDataToSend.append("module", JSON.stringify(moduleArray))

      // Update the profile
      const result = await updateSupplierProfile(formDataToSend)

      if (!result.success) {
        throw new Error(result.message)
      }

      // Update onboarding state
      updateOnboardingState({ profileCompleted: true })

      setSuccess(result.message || "Profile updated successfully!")

      // Check if user already has an academy or is in verification state
      const { hasAcademy } = await checkAcademyVerificationStatus()

      // Only redirect to academy creation for new users who haven't created an academy yet
      if (isNewUser && !hasAcademy) {
        setTimeout(() => {
          router.push("/supplier/academy/add")
        }, 1500)
      }
    } catch (error: any) {
      console.error("Error updating profile:", error)
      setError(error.message || "Failed to update profile. Please try again.")
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
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            {isNewUser ? "Complete Your Profile" : "Supplier Profile"}
          </h1>

          {isNewUser && (
            <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm">Step 1 of 2: Profile Setup</div>
          )}
        </div>

        {isNewUser && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <AlertTitle className="text-blue-800">Welcome to DreamSports!</AlertTitle>
            <AlertDescription className="text-blue-700">
              Please complete your profile information to continue with the onboarding process. After this, you'll be
              able to add your academy details.
            </AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 bg-emerald-50 border-emerald-200">
            <CheckCircle size={20} className="text-emerald-600" />
            <AlertTitle className="text-emerald-800">Success</AlertTitle>
            <AlertDescription className="text-emerald-700">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <X size={20} className="mr-2" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row gap-8 mb-8">
            <div className="flex flex-col items-center">
              <div
                className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-emerald-100 cursor-pointer group"
                onClick={handleImageClick}
              >
                <Image
                  src={imagePreview || "/placeholder.svg?height=128&width=128&text=Profile"}
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
                {imagePreview ? "Change Photo" : "Add Photo"}
              </button>
            </div>

            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
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
                  Email*
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
                  Phone Number*
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-100"
                  required
                  disabled
                />
                <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed</p>
              </div>

              <div>
                <label htmlFor="governmentIdType" className="block text-sm font-medium text-gray-700 mb-1">
                  Government ID Type*
                </label>
                <select
                  id="governmentIdType"
                  name="governmentIdType"
                  value={formData.governmentIdType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="aadhar">Aadhar Card</option>
                  <option value="pan">PAN Card</option>
                  <option value="voter">Voter ID</option>
                  <option value="driving">Driving License</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Government ID</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="governmentId" className="block text-sm font-medium text-gray-700 mb-1">
                  {formData.governmentIdType === "aadhar"
                    ? "Aadhar Number*"
                    : formData.governmentIdType === "pan"
                      ? "PAN Number*"
                      : formData.governmentIdType === "voter"
                        ? "Voter ID Number*"
                        : "Driving License Number*"}
                </label>
                <input
                  id="governmentId"
                  name="governmentId"
                  type="text"
                  value={formData.governmentId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Address*</h2>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Street Address*
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City*
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State*
                  </label>
                  <input
                    id="state"
                    name="state"
                    type="text"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode*
                  </label>
                  <input
                    id="pincode"
                    name="pincode"
                    type="text"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Business Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                  Business Name
                </label>
                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="gstNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  GST Number (Optional)
                </label>
                <input
                  id="gstNumber"
                  name="gstNumber"
                  type="text"
                  value={formData.gstNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Payment Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="bankAccountName" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account Holder Name
                </label>
                <input
                  id="bankAccountName"
                  name="bankAccountName"
                  type="text"
                  value={formData.bankAccountName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="bankAccountNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  Bank Account Number
                </label>
                <input
                  id="bankAccountNumber"
                  name="bankAccountNumber"
                  type="text"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="ifscCode" className="block text-sm font-medium text-gray-700 mb-1">
                  IFSC Code
                </label>
                <input
                  id="ifscCode"
                  name="ifscCode"
                  type="text"
                  value={formData.ifscCode}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>

              <div>
                <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID (Optional)
                </label>
                <input
                  id="upiId"
                  name="upiId"
                  type="text"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
              Bio / Description
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="Tell us about your business..."
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Saving...
                </>
              ) : isNewUser ? (
                <>
                  Continue to Academy Setup <ArrowRight size={18} className="ml-2" />
                </>
              ) : (
                <>
                  <Save size={18} className="mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
