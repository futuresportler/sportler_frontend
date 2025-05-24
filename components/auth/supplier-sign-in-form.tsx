"use client"

import { PhoneInput } from "@/components/ui/phone-input"
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, signInWithPopup } from "firebase/auth"
import { Check, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// API endpoint for supplier sign-in
const SUPPLIER_SIGNIN_API = "https://api-primary.futuresportler.com/api/suppliers/signin"

export function SupplierSignInForm() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("in")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)
  const [confirmationResult, setConfirmationResult] = useState(null)
  const recaptchaVerifierRef = useRef(null)
  const router = useRouter()

  // Clear reCAPTCHA when component unmounts
  useEffect(() => {
    return () => {
      if (recaptchaVerifierRef.current) {
        try {
          recaptchaVerifierRef.current.clear()
        } catch (error) {
          console.error("Error clearing reCAPTCHA:", error)
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
          // This callback is triggered when reCAPTCHA is solved
          console.log("reCAPTCHA verified")
        },
        "expired-callback": () => {
          setError("reCAPTCHA verification expired. Please try again.")
          setSendingOtp(false)
        },
      })

      return recaptchaVerifierRef.current
    } catch (error) {
      console.error("Failed to initialize reCAPTCHA:", error)
      setError(`reCAPTCHA initialization failed: ${error.message}`)
      setSendingOtp(false)
      return false
    }
  }

  // Send OTP using Firebase Phone Auth
  const sendOtp = async (verifier) => {
    try {
      const formattedPhoneNumber = formatPhoneWithCountryCode()
      console.log("Sending OTP to:", formattedPhoneNumber)

      // Send verification code
      const confirmationResult = await signInWithPhoneNumber(auth, formattedPhoneNumber, verifier)

      console.log("OTP sent successfully")
      setConfirmationResult(confirmationResult)
      setShowOtpInput(true)
      setCountdown(30)
    } catch (error) {
      console.error("Error sending OTP:", error)

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
            errorMessage = "reCAPTCHA verification failed. Please try again."
            break
          case "auth/invalid-app-credential":
            errorMessage = "The reCAPTCHA verification is invalid. This may be due to domain restrictions."
            break
          default:
            errorMessage = `Error: ${error.message || error.code}`
        }
      }

      setError(errorMessage)
    } finally {
      setSendingOtp(false)
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
    setSendingOtp(true)

    try {
      // Initialize reCAPTCHA
      const verifier = initializeRecaptcha()

      if (!verifier) {
        throw new Error("Failed to initialize reCAPTCHA verifier")
      }

      // Make sure the reCAPTCHA verifier is rendered before proceeding
      await verifier.render()

      // Send OTP after reCAPTCHA is ready
      await sendOtp(verifier)
    } catch (error) {
      console.error("Error in handleSendOtp:", error)
      setError("Failed to initialize verification. Please refresh and try again.")
      setSendingOtp(false)
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

  // Call the supplier sign-in API
  const callSupplierSignInApi = async (phoneNumber, idToken) => {
    const response = await fetch(SUPPLIER_SIGNIN_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: phoneNumber,
        firebaseIdToken: idToken,
      }),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return data
  }

  // Save authentication tokens
  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("accessToken", accessToken)
    localStorage.setItem("refreshToken", refreshToken)
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

      // Format phone number with country code for API
      const formattedPhoneNumber = formatPhoneWithCountryCode()

      try {
        // Call supplier sign-in API
        const response = await callSupplierSignInApi(formattedPhoneNumber, idToken)

        // Save tokens to localStorage
        saveTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken)

        setIsPhoneVerified(true)
        setShowOtpInput(false)

        // Redirect to supplier dashboard
        router.push("/supplier/dashboard")
      } catch (apiError) {
        console.error("API Error:", apiError)
        throw apiError
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)

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

    setSendingOtp(true)
    setError("")

    try {
      // Re-initialize reCAPTCHA for resending OTP
      const verifier = initializeRecaptcha()

      if (!verifier) {
        throw new Error("Failed to initialize reCAPTCHA verifier")
      }

      // Make sure the reCAPTCHA verifier is rendered before proceeding
      await verifier.render()

      // Send OTP after reCAPTCHA is ready
      await sendOtp(verifier)
    } catch (error) {
      console.error("Error in handleResendOtp:", error)
      setError("Failed to resend verification code. Please refresh and try again.")
      setSendingOtp(false)
    }
  }

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    setError("")
    setIsLoading(true)

    try {
      // Create a Google auth provider
      const provider = new GoogleAuthProvider()

      // Add scopes if needed
      provider.addScope("email")
      provider.addScope("profile")

      // Sign in with popup
      const result = await signInWithPopup(auth, provider)

      // Get the Google Access Token
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const idToken = await result.user.getIdToken()

      // Get user info
      const user = result.user
      console.log("Google sign in successful:", user.displayName)

      try {
        // Call supplier sign-in API with the Firebase ID token
        const response = await callSupplierSignInApi(user.phoneNumber || "", idToken)

        // Save tokens to localStorage
        saveTokens(response.data.tokens.accessToken, response.data.tokens.refreshToken)

        // Redirect to supplier dashboard
        router.push("/supplier/dashboard")
      } catch (apiError) {
        console.error("API Error:", apiError)
        throw apiError
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error)

      let errorMessage = "Failed to sign in with Google. Please try again."

      if (error.code) {
        switch (error.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Sign-in popup was closed before completing the sign-in."
            break
          case "auth/popup-blocked":
            errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site."
            break
          case "auth/cancelled-popup-request":
            errorMessage = "Multiple popup requests were triggered. Only the latest one will be processed."
            break
          case "auth/account-exists-with-different-credential":
            errorMessage = "An account already exists with the same email address but different sign-in credentials."
            break
          default:
            errorMessage = `Google sign-in failed: ${error.message || error.code}`
        }
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Form */}
      <div className="flex flex-1 flex-col justify-center py-12 px-8">
        <div className="mx-auto w-full max-w-md">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-gray-600 mb-8">Sign in to manage your sports business</p>

          {error && <div className="mb-6 p-4 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>}

          <div className="space-y-6">
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
            </div>

            {/* reCAPTCHA container - Invisible but always present in the DOM */}
            <div id="recaptcha-container" style={{ visibility: "hidden" }} className="recaptcha-container"></div>

            {!isPhoneVerified && !showOtpInput && (
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp || !phoneNumber || phoneNumber.length < 10}
                className="w-full py-3 px-4 bg-emerald-600 text-white font-medium rounded-lg shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {sendingOtp ? (
                  <>
                    <Loader2 size={18} className="inline mr-2 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send OTP"
                )}
              </button>
            )}

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
                      "Sign In"
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Social Login Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-4 bg-white text-sm text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="inline mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Sign in with Google
                </>
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link href="/auth/multi-role-signup" className="font-medium text-emerald-600 hover:text-emerald-700">
                  Sign up as a partner
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
