"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"

export function SignInForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("in")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
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
      router.push("/")
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

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      // Simulate Google sign-in
      await new Promise((resolve) => setTimeout(resolve, 1000))
      router.push("/")
    } catch (err) {
      setError("Google sign-in failed. Please try again.")
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-5">
        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">{error}</div>}

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
              }}
              inputProps={{
                id: "phone",
                required: true,
                className:
                  "w-full px-3 py-2 pl-[90px] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500",
              }}
              containerClass="w-full"
              buttonClass="absolute left-0 top-0 bottom-0 flex items-center justify-center px-2 border-r border-gray-300"
              disabled={showOtpInput}
            />
          </div>

          {!showOtpInput && (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={sendingOtp || !phoneNumber || phoneNumber.length < 10}
              className="mt-2 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sendingOtp ? (
                <>
                  <Loader2 size={18} className="mr-2 animate-spin" />
                  Sending OTP...
                </>
              ) : (
                "Send OTP"
              )}
            </button>
          )}
        </div>

        {showOtpInput && (
          <div className="space-y-3 bg-gray-50 p-4 rounded-md">
            <label className="block text-sm font-medium text-gray-700 text-center">
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
                  className="w-10 h-12 text-center text-xl border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              ))}
            </div>

            <div className="flex justify-between items-center">
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
                className="py-1.5 px-4 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {verifyingOtp ? (
                  <>
                    <Loader2 size={16} className="inline mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
            </div>
          </div>
        )}

        <div className="flex items-center mt-4">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
        className="w-full flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="h-5 w-5 mr-2" aria-hidden="true" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
        </svg>
        Sign in with Google
      </button>
    </div>
  )
}
