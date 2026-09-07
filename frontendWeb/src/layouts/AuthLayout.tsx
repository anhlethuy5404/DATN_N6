import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ShieldCheck, Sparkles } from 'lucide-react'

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004AC6] via-[#0B1C30] to-[#040D18] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background ambient glowing orbs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#712AE2]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#004AC6]/30 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="mb-8 text-center relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#004AC6] to-[#712AE2] flex items-center justify-center shadow-lg shadow-blue-500/25">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-extrabold text-white tracking-tight">
            Nexus <span className="text-blue-400">Exchange</span>
          </span>
        </Link>
        <p className="text-blue-100/80 text-sm mt-2 font-medium">
          Secure platform for premium collectors & smart escrow trading
        </p>
      </div>

      {/* Main Glass Card */}
      <div className="w-full max-w-[460px] bg-[#F8F9FF]/95 backdrop-blur-md rounded-2xl border border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-8 relative z-10">
        {children || <Outlet />}
      </div>

      {/* Trust Footer */}
      <div className="mt-8 flex items-center gap-2 text-xs text-blue-200/70 font-medium relative z-10">
        <ShieldCheck className="w-4 h-4 text-[#007D55]" />
        <span>Protected by Nexus Smart Escrow & End-to-End Verification</span>
      </div>
    </div>
  )
}
