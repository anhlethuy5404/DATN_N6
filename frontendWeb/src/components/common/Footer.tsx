import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Sparkles, Shield, Lock, MapPin } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1C30] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#004AC6] to-[#712AE2] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                Nexus <span className="text-[#6FFBBE]">Exchange</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Vietnam's premier decentralized marketplace and auction platform for authentic collectibles, vintage tech, and rare items with smart escrow security and physical safe spot verification.
            </p>
            <div className="flex items-center gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Lock size={14} className="text-[#6FFBBE]" />
                <span>256-bit Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Shield size={14} className="text-[#004AC6]" />
                <span>eKYC Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[#712AE2]" />
                <span>Safe Spot Network</span>
              </div>
            </div>
          </div>

          {/* Marketplace Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Marketplace</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/products" className="hover:text-white transition-colors">Catalog & Browse</Link></li>
              <li><Link to="/auctions" className="hover:text-white transition-colors">Live Auctions</Link></li>
              <li><Link to="/pass" className="hover:text-white transition-colors">Barter & Exchange</Link></li>
              <li><Link to="/wallet" className="hover:text-white transition-colors">NEX Digital Wallet</Link></li>
              <li><Link to="/products/create" className="hover:text-white transition-colors">Sell an Item</Link></li>
            </ul>
          </div>

          {/* Trust & Escrow Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Trust & Safety</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/orders" className="hover:text-white transition-colors">Smart Escrow Process</Link></li>
              <li><Link to="/verification" className="hover:text-white transition-colors">Identity Verification (eKYC)</Link></li>
              <li><Link to="/disputes" className="hover:text-white transition-colors">Dispute Resolution</Link></li>
              <li><Link to="/moderator" className="hover:text-white transition-colors">Moderator Hub</Link></li>
            </ul>
          </div>

          {/* Portals Col */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Portals</h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">User Dashboard</Link></li>
              <li><Link to="/admin" className="hover:text-white transition-colors">Admin Management</Link></li>
              <li><Link to="/auth/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/auth/register" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 Nexus Exchange Inc. All rights reserved. Graduation Thesis Project.</p>
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#6FFBBE]" />
            <span>Escrow Protected & VNPAY Sandbox Integrated</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
