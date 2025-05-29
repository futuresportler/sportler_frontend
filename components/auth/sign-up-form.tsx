"use client"

import { useState, useEffect } from "react"
import { Check, Loader2, Phone, Shield, ArrowRight, User, FileText, LogIn } from "lucide-react"

export function SignUpForm() {
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [countryCode, setCountryCode] = useState("+91")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [isPhoneVerified, setIsPhoneVerified] = useState(false)
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [sendingOtp, setSendingOtp] = useState(false)
  const [verifyingOtp, setVerifyingOtp] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(0)

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
      await new Promise((resolve) => setTimeout(resolve, 1500))
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
      await new Promise((resolve) => setTimeout(resolve, 1500))
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
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setCountdown(30)
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setSendingOtp(false)
    }
  }

  const handleGoogleSignUp = async () => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Google sign-up successful!")
    } catch (err) {
      setError("Google sign-in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async () => {
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

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      alert("Account created successfully!")
    } catch (err) {
      setError("An error occurred during sign up. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    alert("Redirecting to sign in page...")
    
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-full">
        <div className="bg-white w-full h-full">
          <div className="px-6 py-6 w-full">
            

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Phone className="h-4 w-4 text-gray-400" />
                  </div>
                  <select 
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    disabled={isPhoneVerified}
                    className="absolute inset-y-0 left-10 w-16 bg-transparent border-0 text-sm font-medium text-gray-700 focus:outline-none z-10 disabled:opacity-50"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value)
                      setIsPhoneVerified(false)
                    }}
                    disabled={isPhoneVerified}
                    placeholder="Enter your phone number"
                    className="w-full pl-20 pr-12 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  {isPhoneVerified && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-emerald-500 flex items-center">
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-xs font-medium">Verified</span>
                    </div>
                  )}
                </div>

                {!isPhoneVerified && !showOtpInput && (
                  <button
                    onClick={handleSendOtp}
                    disabled={sendingOtp || !phoneNumber || phoneNumber.length < 10}
                    className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 mt-2"
                  >
                    {sendingOtp ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        Send OTP
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* OTP Input */}
              {showOtpInput && !isPhoneVerified && (
                <div className="space-y-5 bg-gray-50 p-5 rounded-xl border-2 border-gray-100">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-emerald-100 rounded-full mb-3">
                      <Shield className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Verify Your Phone</h3>
                    <p className="text-gray-600 text-sm">
                      Enter the 6-digit code sent to<br />
                      <span className="font-semibold text-gray-900">{countryCode} {phoneNumber}</span>
                    </p>
                  </div>

                  {/* OTP Input */}
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
                        className="w-10 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-lg shadow-sm focus:outline-none focus:border-emerald-400 focus:shadow-lg transition-all duration-200 bg-white focus:bg-white"
                      />
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={handleVerifyOtp}
                      disabled={verifyingOtp || otp.join("").length !== 6}
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                    >
                      {verifyingOtp ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          Verify Phone
                          <Check className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    <div className="text-center">
                      <button
                        onClick={handleResendOtp}
                        disabled={countdown > 0 || sendingOtp}
                        className="text-emerald-600 hover:text-emerald-700 font-medium text-sm disabled:text-gray-400 transition-colors duration-200"
                      >
                        {countdown > 0 ? `Resend code in ${countdown}s` : "Resend verification code"}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer ${
                    agreeToTerms 
                      ? 'bg-emerald-500 border-emerald-500' 
                      : 'border-gray-300 hover:border-emerald-400'
                  }`} onClick={() => setAgreeToTerms(!agreeToTerms)}>
                    {agreeToTerms && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
                <label className="text-sm text-gray-600 leading-5 cursor-pointer" onClick={() => setAgreeToTerms(!agreeToTerms)}>
                  I agree to the{" "}
                  <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
                    Privacy Policy
                  </a>
                </label>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isLoading || !isPhoneVerified || !agreeToTerms || !fullName.trim()}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
              </div>
            </div>

            {/* Google Sign Up */}
            <button
              onClick={handleGoogleSignUp}
              disabled={isLoading}
              className="w-full bg-white border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-50 hover:border-gray-300 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continue with Google
            </button>

            {/* Sign In Option - Simple text link */}
            <div className="text-center mb-6 mt-2">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={handleSignIn}
                  className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}