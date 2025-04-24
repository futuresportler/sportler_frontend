import { MultiRoleSignUpForm } from "@/components/auth/multi-role-sign-up-form"

export default function MultiRoleSignUp() {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create your account</h1>
        <p className="text-gray-600 mt-2">Join DreamSports as a Coach, Academy, or Turf provider</p>
      </div>

      <MultiRoleSignUpForm />
    </div>
  )
}
