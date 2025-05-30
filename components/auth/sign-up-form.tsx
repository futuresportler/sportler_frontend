"use client"

import type React from "react"

import { auth } from "@/lib/firebase"
import { getUserLocation, signUpWithEmailPassword } from "@/services/authService"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { ArrowRight, Check, Eye, EyeOff, Loader2, Lock, Mail, MapPin, User } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SignUpForm() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null)
  const [locationPermission, setLocationPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Request location permission when component mounts
  useEffect(() => {
    requestLocationPermission()
  }, [])

  const requestLocationPermission = async () => {
    try {
      const position = await getUserLocation()
      setLocation(position)
      setLocationPermission("granted")
    } catch (err) {
      console.error("Error getting location:", err)
      setLocationPermission("denied")
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    // Form validation
    if (!firstName || !lastName) {
      setError("Please enter your first and last name")
      return
    }

    if (!email) {
      setError("Please enter your email address")
      return
    }

    if (!password) {
      setError("Please enter a password")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeToTerms) {
      setError("You must agree to the terms of service")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      // Prepare user data
      const userData = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        profile_picture: "", // Default empty, could be updated later
        ...(location && { latitude: location.latitude, longitude: location.longitude }),
      }

      // Call the signup API
      await signUpWithEmailPassword(userData)

      // Redirect to dashboard or home page
      router.push("/client-app")
    } catch (err: any) {
      console.error("Sign up error:", err)
      setError(err.message || "Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignUp = async () => {
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
      console.log("Google sign up successful:", user.displayName)

      // Extract first and last name from displayName
      let first_name = "",
        last_name = ""
      if (user.displayName) {
        const nameParts = user.displayName.split(" ")
        first_name = nameParts[0] || ""
        last_name = nameParts.slice(1).join(" ") || ""
      }

      // Prepare user data
      const userData = {
        first_name,
        last_name,
        email: user.email || "",
        password: "", // Server should handle this special case for Google auth
        profile_picture: user.photoURL || "",
        ...(location && { latitude: location.latitude, longitude: location.longitude }),
      }

      // Call the signup API
      // Note: In a real implementation, you'd need to handle this special case on the server
      // For now, we'll just redirect to the dashboard
      router.push("/client-app")
    } catch (err: any) {
      console.error("Google Sign-Up Error:", err)

      let errorMessage = "Failed to sign up with Google. Please try again."

      if (err.code) {
        switch (err.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Sign-up popup was closed before completing the sign-up."
            break
          case "auth/popup-blocked":
            errorMessage = "Sign-up popup was blocked by your browser. Please allow popups for this site."
            break
          default:
            errorMessage = `Google sign-up failed: ${err.message || err.code}`
        }
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignIn = () => {
    router.push("/auth/signin")
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

            <form onSubmit={handleSignUp} className="space-y-5">
              {/* First Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className="w-full pl-10 pr-10 py-3 bg-gray-50 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-emerald-400 focus:bg-white transition-all duration-200"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Location Permission */}
              <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 text-emerald-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">Location Access</span>
                  </div>

                  {locationPermission === "pending" && (
                    <button
                      type="button"
                      onClick={requestLocationPermission}
                      className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium"
                    >
                      Allow Access
                    </button>
                  )}

                  {locationPermission === "granted" && (
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full font-medium flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      Granted
                    </span>
                  )}

                  {locationPermission === "denied" && (
                    <button
                      type="button"
                      onClick={requestLocationPermission}
                      className="text-xs bg-red-100 text-red-700 px-3 py-1 rounded-full font-medium"
                    >
                      Retry
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  We use your location to show you nearby sports facilities and events.
                  {locationPermission === "denied" && " Please enable location access in your browser settings."}
                </p>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded border-2 transition-all duration-200 cursor-pointer ${agreeToTerms ? "bg-emerald-500 border-emerald-500" : "border-gray-300 hover:border-emerald-400"
                      }`}
                    onClick={() => setAgreeToTerms(!agreeToTerms)}
                  >
                    {agreeToTerms && <Check className="w-3 h-3 text-white absolute top-0.5 left-0.5" />}
                  </div>
                </div>
                <label
                  className="text-sm text-gray-600 leading-5 cursor-pointer"
                  onClick={() => setAgreeToTerms(!agreeToTerms)}
                >
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
                type="submit"
                disabled={isLoading}
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
            </form>

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
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Continue with Google
            </button>

            {/* Sign In Option */}
            <div className="text-center mb-6 mt-4">
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
