"use client"

import type React from "react"

import { useState } from "react"
import { Loader2, Mail, Lock, ArrowRight, Check, Eye, EyeOff } from "lucide-react"
import { signInWithEmailPassword } from "@/services/authService"
import { auth } from "@/lib/firebase"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { useRouter } from "next/navigation"

export function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError("Please enter both email and password")
      return
    }

    setError("")
    setIsLoading(true)

    try {
      await signInWithEmailPassword(email, password)

      // Redirect to dashboard or home page
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Sign in error:", err)
      setError(err.message || "Failed to sign in. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

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

      // Here you would typically send the token to your backend
      // For now, we'll just redirect to the dashboard
      router.push("/dashboard")
    } catch (err: any) {
      console.error("Google Sign-In Error:", err)

      let errorMessage = "Failed to sign in with Google. Please try again."

      if (err.code) {
        switch (err.code) {
          case "auth/popup-closed-by-user":
            errorMessage = "Sign-in popup was closed before completing the sign-in."
            break
          case "auth/popup-blocked":
            errorMessage = "Sign-in popup was blocked by your browser. Please allow popups for this site."
            break
          default:
            errorMessage = `Google sign-in failed: ${err.message || err.code}`
        }
      }

      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignUp = () => {
    router.push("/auth/signup")
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header removed - handled by parent page */}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-400 rounded-lg">
          <p className="text-red-700 text-sm font-medium">{error}</p>
        </div>
      )}

      <form onSubmit={handleSignIn} className="space-y-5">
        {/* Email Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
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

        {/* Password Input */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
              <Lock className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded border-2 transition-all duration-200 ${
                  rememberMe ? "bg-emerald-500 border-emerald-500" : "border-gray-300 hover:border-emerald-400"
                }`}
              >
                {rememberMe && <Check className="w-2.5 h-2.5 text-white absolute top-0.5 left-0.5" />}
              </div>
            </div>
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="/auth/forgot-password" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            Forgot password?
          </a>
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
              Signing in...
            </>
          ) : (
            <>
              Sign In
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

      {/* Google Sign In */}
      <button
        onClick={handleGoogleSignIn}
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

      <div className="text-center mb-6 mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={handleSignUp}
            className="font-medium text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
          >
            Sign up
          </button>
        </p>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="font-medium text-emerald-600 hover:text-emerald-700">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
