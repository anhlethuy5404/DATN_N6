import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useAuth } from '../../contexts/AuthContext'
import { User, Mail, Lock, Phone, ArrowRight, Shield } from 'lucide-react'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { switchRole } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [agreeTerms, setAgreeTerms] = useState(true)

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    switchRole('USER')
    navigate('/verification')
  }

  return (
    <AuthLayout>
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold text-[#0B1C30] tracking-tight">
          Create Account
        </h2>
        <p className="text-sm text-[#434655] mt-1">
          Join the trusted Nexus Exchange network for collectors and verified traders.
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Alex Rivers"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
            Email Address
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
              placeholder="alex@example.com"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
            Phone Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="+84 912 345 678"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Minimum 8 characters"
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-start">
          <input
            id="terms"
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            required
            className="w-4 h-4 mt-0.5 rounded text-[#004AC6] focus:ring-[#004AC6] border-[#C3C6D7]"
          />
          <label htmlFor="terms" className="ml-2 text-xs text-[#434655] leading-4">
            I agree to the <span className="text-[#004AC6] font-medium">Nexus Escrow Agreement</span>,{' '}
            <span className="text-[#004AC6] font-medium">Terms of Service</span> and{' '}
            <span className="text-[#004AC6] font-medium">Privacy Policy</span>.
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!agreeTerms}
          className="w-full py-3 px-4 bg-[#004AC6] hover:bg-[#003899] disabled:opacity-50 text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
        >
          <Shield className="w-4 h-4" />
          <span>Register & Start eKYC</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Sign in prompt */}
        <div className="text-center pt-2 text-xs text-[#434655]">
          Already have an account?{' '}
          <Link to="/auth/login" className="font-semibold text-[#004AC6] hover:underline">
            Sign In
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
