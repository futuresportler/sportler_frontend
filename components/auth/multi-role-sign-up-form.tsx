"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Check, Loader2 } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"
import Image from "next/image"

export function MultiRoleSignUpForm() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
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
  const router = useRouter()

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

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

    try {
      // Simulate API call to send OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setShowOtpInput(true)
      setCountdown(30)
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setSendingOtp(false)
    }
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
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Store supplier types in localStorage for dashboard to use
      localStorage.setItem("supplierTypes", JSON.stringify(roles))
      setIsPhoneVerified(true)
      setShowOtpInput(false)
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setVerifyingOtp(false)
    }
  }

  const handleResendOtp = async () => {
    if (countdown > 0) return

    setSendingOtp(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCountdown(30)
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setSendingOtp(false)
    }
  }

  const handleRoleChange = (role) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [role]: !prevRoles[role],
    }))
  }

  const handleGoogleSignUp = async () => {
    // Placeholder for Google Sign-Up logic
    console.log("Google Sign-Up initiated")
  }

  const handleSubmit = async (e: React.FormEvent) => {
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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store supplier types in localStorage for dashboard to use
      localStorage.setItem("supplierTypes", JSON.stringify(roles))

      // Redirect to supplier dashboard after successful sign up
      router.push("/supplier/dashboard")
    } catch (err) {
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-full w-full overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-12">
        <div className="mx-auto w-full max-w-sm">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">Join as a Partner</h2>
          <p className="mb-8 text-sm text-gray-600">Create your account to offer your sports services</p>

          {error && <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="relative">
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
                    className:
                      "w-full rounded-lg border border-gray-300 bg-white px-3 py-3 pl-[90px] text-gray-900 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500",
                    placeholder: "Enter your phone number",
                  }}
                  containerClass="w-full"
                  buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-2 border-r border-gray-300"
                  disabled={showOtpInput || isPhoneVerified}
                />
                {isPhoneVerified && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center rounded-full bg-emerald-50 px-2 py-1 text-emerald-500">
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
                  className="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {sendingOtp ? (
                    <>
                      <Loader2 size={18} className="mr-2 inline animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              )}
            </div>

            {showOtpInput && !isPhoneVerified && (
              <div className="space-y-4 rounded-lg border border-gray-100 bg-gray-50 p-5">
                <label className="block text-center text-sm font-medium text-gray-700">
                  Enter the 6-digit code sent to {phoneNumber}
                </label>

                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="h-12 w-10 rounded-md border border-gray-300 text-center text-lg font-semibold shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
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
                    className="rounded-lg bg-emerald-600 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {verifyingOtp ? (
                      <>
                        <Loader2 size={16} className="mr-2 inline animate-spin" />
                        Verifying...
                      </>
                    ) : (
                      "Verify"
                    )}
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Register as:</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div
                  className={`flex items-center p-4 rounded-lg border shadow-sm transition-all duration-200 ${roles.coach ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200 hover:border-emerald-300"}`}
                >
                  <input
                    id="coach"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={roles.coach}
                    onChange={() => handleRoleChange("coach")}
                    disabled={showOtpInput}
                  />
                  <label htmlFor="coach" className="ml-3 text-sm font-medium text-gray-700">
                    Coach
                  </label>
                </div>
                <div
                  className={`flex items-center p-4 rounded-lg border shadow-sm transition-all duration-200 ${roles.academy ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200 hover:border-emerald-300"}`}
                >
                  <input
                    id="academy"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={roles.academy}
                    onChange={() => handleRoleChange("academy")}
                    disabled={showOtpInput}
                  />
                  <label htmlFor="academy" className="ml-3 text-sm font-medium text-gray-700">
                    Academy
                  </label>
                </div>
                <div
                  className={`flex items-center p-4 rounded-lg border shadow-sm transition-all duration-200 ${roles.turf ? "bg-emerald-50 border-emerald-300" : "bg-white border-gray-200 hover:border-emerald-300"}`}
                >
                  <input
                    id="turf"
                    type="checkbox"
                    className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                    checked={roles.turf}
                    onChange={() => handleRoleChange("turf")}
                    disabled={showOtpInput}
                  />
                  <label htmlFor="turf" className="ml-3 text-sm font-medium text-gray-700">
                    Turf
                  </label>
                </div>
              </div>
            </div>

            <div className="flex items-center rounded-lg bg-gray-50 p-4">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
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

            <button
              type="submit"
              disabled={isLoading || !isPhoneVerified || !agreeToTerms}
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="mr-2 inline animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>

          <div className="my-8 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 flex-shrink text-sm text-gray-400">Or continue with</span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleGoogleSignUp}
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
              </svg>
              Google
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              <svg className="mr-2 h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.955 4.45z" />
              </svg>
              Apple
            </button>
          </div>
        </div>
      </div>
      <div className="hidden relative lg:block lg:w-1/2">
        <Image src="/images/auth/multi-role-illustration.jpg" alt="Sports illustration" fill className="object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-black/60 to-transparent p-12 text-center text-white">
          <h3 className="mb-2 text-2xl font-bold">Build Your Sports Business</h3>
          <p className="text-lg">Share your expertise and facilities with passionate athletes.</p>
        </div>
      </div>
    </div>
  )
}
