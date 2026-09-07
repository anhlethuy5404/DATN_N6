import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Mail, ArrowLeft, ArrowRight } from 'lucide-react'
import { AuthLayout } from '../../layouts/AuthLayout'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSent(true)
    }
  }

  return (
    <AuthLayout>
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold text-[#0B1C30] tracking-tight">
          Reset Password
        </h2>
        <p className="text-sm text-[#434655] mt-1">
          Enter your registered email address and we will send you instructions to reset your password.
        </p>
      </div>

      {sent ? (
        <div className="text-center py-6 space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-[#EAF3ED] flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#007D55]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1C30]">Instructions Sent</h3>
            <p className="text-sm text-[#434655] mt-2">
              We've dispatched a secure reset link to <strong className="text-[#0B1C30]">{email}</strong>. Please check your inbox and spam folder.
            </p>
          </div>
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center w-full py-3 px-4 bg-[#004AC6] hover:bg-[#003899] text-white font-semibold rounded-xl text-sm transition-all mt-4"
          >
            Back to Sign In
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
              Account Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="collector@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 bg-[#004AC6] hover:bg-[#003899] text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <span>Send Reset Instructions</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="text-center pt-2">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#004AC6] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
