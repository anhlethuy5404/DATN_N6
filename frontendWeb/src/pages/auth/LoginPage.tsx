import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useAuth } from '../../contexts/AuthContext'
import { Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { switchRole } = useAuth()
  const [email, setEmail] = useState('minhanh@example.com')
  const [password, setPassword] = useState('123456')
  const [showPassword, setShowPassword] = useState(false)
  const [keepLoggedIn, setKeepLoggedIn] = useState(true)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('admin')) {
      switchRole('ADMIN')
      navigate('/admin')
    } else if (email.includes('mod')) {
      switchRole('MODERATOR')
      navigate('/moderator')
    } else {
      switchRole('USER')
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <div className="text-left mb-6">
        <h2 className="text-2xl font-bold text-[#0B1C30] tracking-tight">
          Welcome back
        </h2>
        <p className="text-sm text-[#434655] mt-1">
          Please enter your credentials to access your Nexus account.
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#0B1C30] uppercase tracking-wider mb-1.5">
            Email address
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

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-[#0B1C30] uppercase tracking-wider">
              Password
            </label>
            <Link
              to="/auth/forgot-password"
              className="text-xs font-medium text-[#004AC6] hover:text-[#003899] hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-white rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#737686] hover:text-[#0B1C30]"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center">
          <input
            id="remember"
            type="checkbox"
            checked={keepLoggedIn}
            onChange={(e) => setKeepLoggedIn(e.target.checked)}
            className="w-4 h-4 rounded text-[#004AC6] focus:ring-[#004AC6] border-[#C3C6D7]"
          />
          <label htmlFor="remember" className="ml-2 text-xs text-[#434655]">
            Keep me signed in on this device
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#004AC6] hover:bg-[#003899] active:scale-[0.99] text-white font-semibold rounded-xl text-sm shadow-md shadow-blue-600/20 transition-all flex items-center justify-center gap-2 mt-2"
        >
          <span>Sign In to Nexus</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        {/* Quick test role switcher for evaluation */}
        <div className="mt-4 p-3 bg-[#DCE9FF]/40 rounded-xl border border-[#004AC6]/15 text-xs text-[#434655]">
          <div className="font-semibold text-[#004AC6] mb-1.5 flex items-center gap-1.5">
            <span>⚡ Demo Quick Sign-in:</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className="py-1.5 px-2 bg-white hover:bg-slate-50 text-[#0B1C30] font-medium rounded-lg border border-[#C3C6D7] shadow-xs text-center transition-all"
              onClick={() => setEmail('minhanh@example.com')}
            >
              Collector
            </button>
            <button
              type="button"
              className="py-1.5 px-2 bg-white hover:bg-slate-50 text-[#0B1C30] font-medium rounded-lg border border-[#C3C6D7] shadow-xs text-center transition-all"
              onClick={() => setEmail('duc.nguyen@moc.vn')}
            >
              Moderator
            </button>
            <button
              type="button"
              className="py-1.5 px-2 bg-white hover:bg-slate-50 text-[#0B1C30] font-medium rounded-lg border border-[#C3C6D7] shadow-xs text-center transition-all"
              onClick={() => setEmail('admin@moc.vn')}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Sign up prompt */}
        <div className="text-center pt-2 text-xs text-[#434655]">
          Don't have an account?{' '}
          <Link to="/auth/register" className="font-semibold text-[#004AC6] hover:underline">
            Create account
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
