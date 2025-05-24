"use client"
import { useState, useRef, useEffect } from "react"
import { auth } from "@/lib/firebase"
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { Loader2, Check } from "lucide-react"
import { PhoneInput } from "@/components/ui/phone-input"

export function PhoneAuthentication({ onVerified }) {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("in")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [confirmationResult, setConfirmationResult] = useState(null)

  const recaptchaVerifierRef = useRef(null)
  const recaptchaContainerRef = useRef(null)

  // Clear reCAPTCHA when component unmounts
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear()
        } catch (error) {
          // Silent error handling for cleanup
        }
        recaptchaVerifierRef.current = null
      }
    }
  }, [])

  // Countdown timer for OTP resend
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  // Format phone number with country code
  const formatPhoneWithCountryCode = () => {
    if (phoneNumber.startsWith("+")) {
      return phoneNumber
    }

    const dialCode = getCountryDialCode(countryCode)
    const cleanNumber = phoneNumber.replace(/^0+/, "")

    if (cleanNumber.startsWith(dialCode)) {
      return `+${cleanNumber}`
    }

    return `+${dialCode}${cleanNumber}`
  }

  // Get the country dial code
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
    return countryCodes[code] || "91"
  }

  // Initialize reCAPTCHA verifier
  const initializeRecaptcha = () => {
    try {
      // Clear existing verifier if any
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear()
        recaptchaVerifierRef.current = null
      }

      // Create a new RecaptchaVerifier
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        callback: () => {
          sendOtp()
        },
        "expired-callback": () => {
          setError("reCAPTCHA verification expired. Please try again.")
          setIsLoading(false)
        },
      })

      return true
    } catch (error) {
      setError(`reCAPTCHA initialization failed: ${error.message}`)
      setIsLoading(false)
      return false
    }
  }

  // Send OTP using Firebase Phone Auth
  const sendOtp = async () => {
    try {
      const formattedPhoneNumber = formatPhoneWithCountryCode()

      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, recaptchaVerifierRef.current)

      setConfirmationResult(confirmationResult)
      setShowOtpInput(true)
      setCountdown(30)
      setIsLoading(false)
    } catch (error) {
      let errorMessage = "Failed to send verification code."

      // Handle specific Firebase errors
      if (error.code) {
        switch (error.code) {
          case "auth/invalid-phone-number":
            errorMessage = "Invalid phone number format. Please check and try again."
            break
          case "auth/quota-exceeded":
            errorMessage = "Too many requests. Please try again later."
            break
          case "auth/captcha-check-failed":
            errorMessage = "Domain verification failed. Please ensure this domain is authorized in Firebase Console."
            break
          case "auth/invalid-app-credential":
            errorMessage = "The reCAPTCHA verification is invalid. This may be due to domain restrictions."
            break
          default:
            errorMessage = `Error: ${error.message || error.code}`
        }
      }

      setError(errorMessage)
      setIsLoading(false)
    }
  }

  // Handle Send OTP button click
  const handleSendOtp = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Please enter a valid phone number")
      return
    }

    // Clear previous errors
    setError("")
    setIsLoading(true)

    // Initialize reCAPTCHA and render it
    if (initializeRecaptcha()) {
      try {
        // This render function will display the invisible reCAPTCHA
        await recaptchaVerifierRef.current.render()

        // In invisible reCAPTCHA, we need to explicitly verify
        recaptchaVerifierRef.current.verify()
      } catch (error) {
        setError("Failed to initialize verification. Please refresh and try again.")
        setIsLoading(false)
      }
    }
  }

  // Handle OTP input change
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

  // Verify the OTP
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

      // Confirm the verification code
      const userCredential = await confirmationResult.confirm(otpValue)

      // Get Firebase ID token
      const idToken = await userCredential.user.getIdToken()

      setIsPhoneVerified(true)
      setShowOtpInput(false)

      // Call the callback with the verified user info
      if (onVerified) {
        onVerified({
          user: userCredential.user,
          phone: formatPhoneWithCountryCode(),
          idToken,
        })
      }
    } catch (error) {
      let errorMessage = "Invalid verification code. Please try again."

      if (error.code) {
        switch (error.code) {
          case "auth/invalid-verification-code":
            errorMessage = "The verification code you entered is invalid. Please try again."
            break
          case "auth/code-expired":
            errorMessage = "The verification code has expired. Please request a new code."
            break
          default:
            errorMessage = `Verification failed: ${error.message || error.code}`
        }
      } else if (error.message) {
        errorMessage = error.message
      }

      setError(errorMessage)
    } finally {
      setVerifyingOtp(false)
    }
  }

  // Handle resend OTP
  const handleResendOtp = async () => {
    if (countdown > 0) return

    setIsLoading(true)
    setError("")

    // Start the reCAPTCHA verification process again
    if (initializeRecaptcha()) {
      try {
        await recaptchaVerifierRef.current.render()
        recaptchaVerifierRef.current.verify()
      } catch (error) {
        setError("Failed to initialize verification. Please refresh and try again.")
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="space-y-6">
      {error && <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

      {/* Phone Number Input */}
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
              className:
                "w-full px-3 py-3 pl-[90px] rounded-lg border border-gray-300 shadow-sm focus:ring-emerald-500 focus:border-emerald-500",
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
            disabled={isLoading || !phoneNumber || phoneNumber.length < 10}
            className="mt-2 w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="inline mr-2 animate-spin" />
                Preparing verification...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        )}
      </div>

      {/* reCAPTCHA container - Invisible but always present in the DOM */}
      <div
        id="recaptcha-container"
        ref={recaptchaContainerRef}
        style={{ visibility: "hidden", position: "fixed", bottom: "0", right: "0" }}
      ></div>

      {/* OTP Input */}
      {showOtpInput && !isPhoneVerified && (
        <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
          <label className="block text-center text-sm font-medium text-gray-700 mb-4">
            Enter the 6-digit code sent to {formatPhoneWithCountryCode()}
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
              disabled={countdown > 0 || isLoading}
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
    </div>
  )
}
