"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Check, Loader2 } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"
import { auth } from "@/lib/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { supplierSignup, saveAuthTokens } from "@/services/authService"

// Set this to true for development/testing, false for production
const IS_DEVELOPMENT = process.env.NODE_ENV === "development"

export function MultiRoleSignUpForm() {
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("in")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [roles, setRoles] = useState({
    coach: false,
    academy: false,
    turf: false,
  })
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const recaptchaVerifierRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    // Cleanup function to clear recaptcha when component unmounts
    return () => {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
        recaptchaVerifierRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Get the country dial code from the countryCodes object
  const getCountryDialCode = (code) => {
    const countryCodes = {
      in: "91",
      us: "1",
      gb: "44",
      ca: "1",
      au: "61",
      de: "49",
      fr: "33",
    }
    return countryCodes[code] || "91" // Default to India if code not found
  }

  // Format phone number with country code if not already included
  const formatPhoneWithCountryCode = () => {
    if (phoneNumber.startsWith("+")) {
      return phoneNumber // Already has country code
    }

    const dialCode = getCountryDialCode(countryCode)

    // Remove leading zeros if any
    const cleanNumber = phoneNumber.replace(/^0+/, "")

    // Check if number already includes the country code
    if (cleanNumber.startsWith(dialCode)) {
      return `+${cleanNumber}`
    }

    return `+${dialCode}${cleanNumber}`
  }

  // Setup reCAPTCHA verifier
  const setupRecaptcha = () => {
    try {
      // Clear existing recaptcha if any
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
        recaptchaVerifierRef.current = null
      }

      // Create a new div element for the recaptcha container
      const recaptchaContainer = document.getElementById("recaptcha-container")
      if (recaptchaContainer) {
        // Clear previous content
        recaptchaContainer.innerHTML = ""

        // Create a new div with a unique ID
        const newRecaptchaElement = document.createElement("div")
        const uniqueId = `recaptcha-${Date.now()}`
        newRecaptchaElement.id = uniqueId
        recaptchaContainer.appendChild(newRecaptchaElement)

        // Create a visible reCAPTCHA
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, uniqueId, {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA verified:", response)
            sendOtpAfterRecaptcha()
          },
          "expired-callback": () => {
            setError("reCAPTCHA expired. Please solve the reCAPTCHA again.")
            if (recaptchaVerifierRef.current) {
              recaptchaVerifierRef.current.clear()
              recaptchaVerifierRef.current = null
              setSendingOtp(false)
            }
          },
        })

        recaptchaVerifierRef.current.render().catch((error) => {
          console.error("Error rendering reCAPTCHA:", error)
          setError("Failed to load verification. Please refresh and try again.")
          setSendingOtp(false)
        })
      } else {
        throw new Error("Recaptcha container not found")
      }
    } catch (err) {
      console.error("Error setting up reCAPTCHA:", err)
      setError("Failed to initialize verification. Please refresh and try again.")
      setSendingOtp(false)
    }
  }

  const sendOtpAfterRecaptcha = async () => {
    try {
      // Format phone number with country code
      const formattedPhoneNumber = formatPhoneWithCountryCode()
      console.log("Sending OTP to:", formattedPhoneNumber)

      if (!recaptchaVerifierRef.current) {
        throw new Error("reCAPTCHA not initialized")
      }

      // Send OTP via Firebase
      const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifierRef.current).catch(
        (error) => {
          console.error("Error in signInWithPhoneNumber:", error)

          // Handle specific Firebase errors
          if (error.code === "auth/invalid-app-credential") {
            throw new Error("Verification failed. Please try again in a few minutes.")
          } else if (error.code === "auth/captcha-check-failed") {
            throw new Error("reCAPTCHA verification failed. Please solve the reCAPTCHA again.")
          } else if (error.code === "auth/quota-exceeded") {
            throw new Error("SMS quota exceeded. Please try again tomorrow.")
          } else if (error.code === "auth/invalid-phone-number") {
            throw new Error("Invalid phone number format. Please check and try again.")
          } else {
            throw error
          }
        },
      )

      setConfirmationResult(confirmation)
      setShowOtpInput(true)
      setCountdown(30)
      setSendingOtp(false)
    } catch (err) {
      console.error("Error sending OTP:", err)
      setError(err.message || "Failed to send OTP. Please try again.")
      setSendingOtp(false)

      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
        recaptchaVerifierRef.current = null
      }
    }
  }

  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    if (!roles.academy && !roles.turf && !roles.coach) {
      setError("Please select at least one role")
      return
    }

    setError("")
    setSendingOtp(true)

    // Setup reCAPTCHA with a slight delay
    setTimeout(() => {
      setupRecaptcha()
    }, 100)
  }

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    if (value && !/^\d+$/.test(value)) {
      return
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleVerifyOtp = async () => {
    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }

    setError("")
    setVerifyingOtp(true)

    try {
      if (!confirmationResult) {
        throw new Error("Verification session expired. Please request a new OTP.")
      }

      // Verify OTP with Firebase
      const userCredential = await confirmationResult.confirm(otpValue)

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken()

      // Format phone number with country code for API
      const formattedPhoneNumber = formatPhoneWithCountryCode()
      console.log("Calling API with phone:", formattedPhoneNumber)

      // Mock API response for development
      if (IS_DEVELOPMENT) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Mock response
        const mockResponse = {
          success: true,
          message: "Supplier created successfully",
          data: {
            supplier: {
              isVerified: false,
              isOAuth: false,
              module: [],
              status: "active",
              role: "owner",
              mobile_number: formattedPhoneNumber,
              supplierId: "dev-supplier-id-" + Math.random().toString(36).substring(2, 9),
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
              email: null,
              profilePicture: null,
              firebaseUID: null,
              location: null,
              gstNumber: null,
              bankAccountNumber: null,
              accountHolderName: null,
              ifscCode: null,
              upiId: null,
              deletedAt: null,
            },
            tokens: {
              accessToken: "dev-access-token-" + Math.random().toString(36).substring(2, 15),
              refreshToken: "dev-refresh-token-" + Math.random().toString(36).substring(2, 15),
            },
          },
        }

        // Save tokens to localStorage
        saveAuthTokens(mockResponse.data.tokens.accessToken, mockResponse.data.tokens.refreshToken)
      } else {
        // Call actual supplier signup API in production
        const response = await supplierSignup(formattedPhoneNumber, idToken)

        // Save tokens to localStorage
        saveAuthTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken)
      }

      // Store supplier types in localStorage for dashboard to use
      localStorage.setItem("supplierTypes", JSON.stringify(roles))

      setIsPhoneVerified(true)
      setShowOtpInput(false)
    } catch (err) {
      console.error("Error verifying OTP:", err)
      setError(`Verification failed: ${err.message || "Invalid OTP. Please try again."}`)
    } finally {
      setVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setSendingOtp(true)
    setError("")

    // Clear any existing verification first
    if (recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current.clear()
      recaptchaVerifierRef.current = null
    }

    // Setup reCAPTCHA again for resending OTP with a slight delay
    setTimeout(() => {
      setupRecaptcha()
    }, 100)
  }

  const handleRoleChange = (role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [role]: !prevRoles[role],
    }))
  }

  const handleGoogleSignUp = async () => {
    console.log("Google Sign-Up initiated")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!fullName.trim()) {
      setError("Please enter your full name")
      return
    }

    if (!isPhoneVerified) {
      setError("Please verify your phone number")
      return
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms of service")
      return
    }

    const selectedRoles = Object.keys(roles).filter((role) => roles[role])
    if (selectedRoles.length === 0) {
      setError("Please select at least one role")
      return
    }

    setIsLoading(true)

    try {
      // User is already registered at this point through the OTP verification
      // Just redirect to supplier dashboard
      router.push("/supplier/dashboard")
    } catch (err) {
      console.error("Error during sign up:", err)
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Auto-verify OTP in development mode
  useEffect(() => {
    if (IS_DEVELOPMENT && showOtpInput && otp.join("") === "123456") {
      handleVerifyOtp()
    }
  }, [otp, showOtpInput])

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-8">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Join as a Partner</h2>
          <p className="text-gray-600 mb-8">Create your account to offer your sports services</p>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          {IS_DEVELOPMENT && (
            <div className="mb-6 p-4 rounded-lg bg-blue-50 text-blue-700 text-sm">
              Development mode: reCAPTCHA verification and OTP will be auto-completed
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your full name"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative mb-2">
                <PhoneInput
                  country={countryCode}
                  value={phoneNumber}
                  onChange={(phone, data) => {
                    setPhoneNumber(phone)
                    setCountryCode(data.countryCode)
                    setIsPhoneVerified(false)
                  }}
                  inputProps={{
                    id: "phone",
                    required: true,
                    className: "w-full px-3 py-3 pl-[90px] rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500",
                    placeholder: "Enter your phone number",
                  }}
                  containerClass="w-full"
                  buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-2 border-r border-gray-300"
                  disabled={showOtpInput || isPhoneVerified}
                />
                {isPhoneVerified && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center px-2 py-1 bg-emerald-50 text-emerald-500 rounded-full">
                    <Check size={16} className="mr-1" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>

              {!isPhoneVerified && !showOtpInput && (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={sendingOtp || !phoneNumber || phoneNumber.length < 10}
                  className="mt-2 w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {sendingOtp ? (
                    <>
                      <Loader2 size={18} className="inline mr-2 animate-spin" />
                      {IS_DEVELOPMENT ? "Auto-verifying..." : "Preparing verification..."}
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              )}
            </div>

            {/* reCAPTCHA container */}
            {sendingOtp && !showOtpInput && (
              <div className="flex justify-center my-4">
                <div id="recaptcha-container" className="min-h-[78px] w-full flex justify-center"></div>
              </div>
            )}

            {/* OTP Input */}
            {showOtpInput && !isPhoneVerified && (
              <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                <label className="block text-center text-sm font-medium text-gray-700 mb-4">
                  Enter the 6-digit code sent to {IS_DEVELOPMENT ? "+15555555555 (Test)" : formatPhoneWithCountryCode()}
                </label>

                <div className="flex justify-center gap-3 mb-6">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-14 text-center text-lg font-semibold rounded-md border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || sendingOtp}
                    className="text-sm text-emerald-600 hover:text-emerald-700 disabled:text-gray-400"
                  >
                    {countdown > 0 ? `Resend in ${countdown}s` : "Resend OTP"}
                  </button>

                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    disabled={verifyingOtp || otp.join("").length !== 6}
                    className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {verifyingOtp ? (
                      <>
                        <Loader2 size={16} className="inline mr-2 animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Register as:</label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: "coach", label: "Coach" },
                  { id: "academy", label: "Academy" },
                  { id: "turf", label: "Turf" }
                ].map((role) => (
                  <div
                    key={role.id}
                    className={`flex items-center p-4 rounded-lg border transition-all duration-200 ${
                      roles[role.id] 
                        ? "bg-emerald-50 border-emerald-300" 
                        : "bg-white border-gray-200 hover:border-emerald-200"
                    }`}
                  >
                    <input
                      id={role.id}
                      type="checkbox"
                      className="h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                      checked={roles[role.id]}
                      onChange={() => handleRoleChange(role.id)}
                      disabled={showOtpInput}
                    />
                    <label htmlFor={role.id} className="ml-3 text-sm font-medium text-gray-700">
                      {role.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms Agreement */}
            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-5 w-5 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
              />
              <label htmlFor="terms" className="ml-3 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700 underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !isPhoneVerified || !agreeToTerms}
              className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="inline mr-2 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>

            {/* Social Login Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
                </svg>
                Apple
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}