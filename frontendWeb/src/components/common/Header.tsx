import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search,
  MapPin,
  MessageCircle,
  Bell,
  Plus,
  ShoppingBag,
  ChevronDown,
  ShieldCheck,
  UserCheck,
  Sparkles,
  Wallet,
  LayoutDashboard,
  UserRound,
  Package,
  Gavel,
  Gift,
  AlertTriangle,
  Building2,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export const Header: React.FC = () => {
  const [query, setQuery] = useState('')
  const [showUserMenu, setShowUserMenu] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { currentUser, switchRole, cartCount, unreadNotifsCount, unreadMessagesCount } = useAuth()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      navigate(`/products?q=${encodeURIComponent(query.trim())}`)
    }
  }

  const nextRole =
    currentUser.role === 'USER'
      ? 'MODERATOR'
      : currentUser.role === 'MODERATOR'
      ? 'ADMIN'
      : 'USER'

  return (
    <>
      {/* Top Nexus Escrow Guarantee Bar */}
      <div className="bg-[#004AC6] text-white text-xs py-2 px-4 flex items-center justify-between font-medium">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#6FFBBE] text-[#0B1C30]">
              VERIFIED ESCROW
            </span>
            <span className="hidden sm:inline">
              Safe P2P exchanges with Nexus Smart Escrow & CCTV 24/7 Meetup Spots.
            </span>
          </div>
          <div
            className="flex items-center gap-1.5 cursor-pointer hover:underline text-[#DCE9FF]"
            onClick={() => navigate('/safespots')}
          >
            <ShieldCheck size={14} className="text-[#6FFBBE]" />
            <span>Mạng Lưới Điểm Hẹn Safe Spot</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-[#F8F9FF]/90 backdrop-blur-md border-b border-[#C3C6D7]/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#004AC6] to-[#712AE2] flex items-center justify-center shadow-md shadow-blue-600/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tight text-[#0B1C30]">
                  Nexus <span className="text-[#004AC6]">Exchange</span>
                </span>
                <span className="text-[10px] font-semibold text-[#737686] uppercase tracking-widest -mt-1">
                  P2P • Auction • Escrow
                </span>
              </div>
            </Link>

            {/* Smart Search Bar */}
            <div className="flex-1 max-w-xl mx-4 hidden md:block">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#737686]">
                  <Search size={18} />
                </div>
                <input
                  type="text"
                  aria-label="Search authentic collectibles"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search authentic items, live auctions, verified sellers..."
                  className="w-full pl-10 pr-24 py-2 bg-white rounded-full border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6] focus:border-transparent transition-all shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => navigate('/products')}
                  className="absolute inset-y-1 right-1 px-3 bg-[#DCE9FF] hover:bg-[#c9deff] text-[#004AC6] text-xs font-semibold rounded-full flex items-center gap-1 transition-colors"
                >
                  <Sparkles size={12} className="text-[#712AE2]" />
                  <span>AI Search</span>
                </button>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Role switcher button */}
              <button
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  currentUser.role === 'ADMIN'
                    ? 'bg-slate-900 text-white border-slate-700'
                    : currentUser.role === 'MODERATOR'
                    ? 'bg-[#EFEBFF] text-[#712AE2] border-[#712AE2]/30'
                    : 'bg-[#DCE9FF] text-[#004AC6] border-[#004AC6]/30'
                }`}
                title="Bấm để chuyển vai trò kiểm thử hệ thống"
                onClick={() => {
                  switchRole(nextRole)
                  if (nextRole === 'ADMIN') navigate('/admin')
                  else if (nextRole === 'MODERATOR') navigate('/moderator')
                  else navigate('/')
                }}
              >
                <UserCheck size={14} />
                <span className="hidden sm:inline">Role:</span> {currentUser.role}
              </button>

              {/* Location indicator */}
              <button className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-[#434655] hover:bg-slate-100 transition-colors">
                <MapPin size={14} className="text-[#004AC6]" />
                <span>TP.HCM</span>
                <ChevronDown size={12} />
              </button>

              {/* Wallet quick link */}
              <Link
                to="/wallet"
                className="p-2 text-[#434655] hover:text-[#004AC6] hover:bg-slate-100 rounded-full transition-colors relative"
                aria-label="Wallet"
                title="Nexus Wallet"
              >
                <Wallet size={19} />
              </Link>

              {/* Messages */}
              <Link
                to="/messages"
                className="p-2 text-[#434655] hover:text-[#004AC6] hover:bg-slate-100 rounded-full transition-colors relative"
                aria-label="Messages"
              >
                <MessageCircle size={19} />
                {unreadMessagesCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#BA1A1A] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadMessagesCount}
                  </span>
                )}
              </Link>

              {/* Notifications */}
              <Link
                to="/notifications"
                className="p-2 text-[#434655] hover:text-[#004AC6] hover:bg-slate-100 rounded-full transition-colors relative"
                aria-label="Notifications"
              >
                <Bell size={19} />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#004AC6] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadNotifsCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2 text-[#434655] hover:text-[#004AC6] hover:bg-slate-100 rounded-full transition-colors relative"
                aria-label="Cart"
              >
                <ShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#007D55] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Avatar with Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-1.5 pl-2 border-l border-[#C3C6D7] hover:opacity-80 transition-opacity cursor-pointer"
                  title="Menu tài khoản"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#004AC6] to-[#712AE2] text-white text-xs font-bold flex items-center justify-center shadow-xs">
                    {currentUser.fullName.slice(0, 2).toUpperCase()}
                  </div>
                  <ChevronDown size={14} className="text-[#737686]" />
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-[#C3C6D7] shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 text-xs">
                      <div className="px-4 py-2 border-b border-[#ECEEF6]">
                        <p className="font-bold text-sm text-[#0B1C30]">{currentUser.fullName}</p>
                        <p className="text-[#737686] text-[11px] truncate">@{currentUser.username} · {currentUser.email}</p>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold mt-1.5">
                          <ShieldCheck size={11} /> Trust Score: {currentUser.trustScore}/100
                        </span>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <LayoutDashboard size={15} />
                          <span>Bảng điều khiển cá nhân</span>
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <UserRound size={15} />
                          <span>Hồ sơ cá nhân</span>
                        </Link>
                        <Link
                          to="/products/my-listings"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <Package size={15} />
                          <span>Tin đăng của tôi</span>
                        </Link>
                        <Link
                          to="/orders"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <ShoppingBag size={15} />
                          <span>Đơn hàng & Ký quỹ Escrow</span>
                        </Link>
                        <Link
                          to="/auctions/my-bids"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <Gavel size={15} />
                          <span>Đấu giá của tôi</span>
                        </Link>
                        <Link
                          to="/pass/my-applications"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <Gift size={15} />
                          <span>Đồ nhận & Trao đổi</span>
                        </Link>
                        <Link
                          to="/wallet"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <Wallet size={15} />
                          <span>Ví NEX & Ký quỹ</span>
                        </Link>
                        <Link
                          to="/safespots"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <Building2 size={15} />
                          <span>Điểm hẹn Safe Spot</span>
                        </Link>
                        <Link
                          to="/disputes"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-[#434655] hover:bg-[#F8F9FF] hover:text-[#004AC6] transition-colors"
                        >
                          <AlertTriangle size={15} />
                          <span>Khiếu nại & Tranh chấp</span>
                        </Link>
                      </div>

                      <div className="pt-1 border-t border-[#ECEEF6]">
                        <Link
                          to="/auth/login"
                          onClick={() => setShowUserMenu(false)}
                          className="flex items-center gap-2.5 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut size={15} />
                          <span>Đăng xuất</span>
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Sell / Post Button */}
              <Link
                to="/products/create"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#004AC6] hover:bg-[#003899] text-white text-xs font-semibold rounded-full shadow-xs transition-all hover:shadow-md"
              >
                <Plus size={15} />
                <span>Post Item</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Secondary Category Navigation Bar */}
        <nav className="border-t border-[#C3C6D7]/40 bg-white/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-6 h-10 text-xs font-semibold overflow-x-auto no-scrollbar">
              <Link
                to="/"
                className={`py-2 transition-colors whitespace-nowrap ${
                  location.pathname === '/' ? 'text-[#004AC6] border-b-2 border-[#004AC6]' : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                Explore
              </Link>
              <Link
                to="/products"
                className={`py-2 transition-colors whitespace-nowrap ${
                  location.pathname === '/products' ? 'text-[#004AC6] border-b-2 border-[#004AC6]' : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/auctions"
                className={`py-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  location.pathname.startsWith('/auctions')
                    ? 'text-[#004AC6] border-b-2 border-[#004AC6]'
                    : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-[#BA1A1A] animate-ping inline-block" />
                <span>Live Auctions</span>
              </Link>
              <Link
                to="/pass"
                className={`py-2 transition-colors whitespace-nowrap ${
                  location.pathname === '/pass' ? 'text-[#004AC6] border-b-2 border-[#004AC6]' : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                Barter & Pass
              </Link>
              <Link
                to="/safespots"
                className={`py-2 transition-colors whitespace-nowrap ${
                  location.pathname === '/safespots' ? 'text-[#004AC6] border-b-2 border-[#004AC6]' : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                Safe Spots
              </Link>
              <Link
                to="/wallet"
                className={`py-2 transition-colors whitespace-nowrap ${
                  location.pathname === '/wallet' ? 'text-[#004AC6] border-b-2 border-[#004AC6]' : 'text-[#434655] hover:text-[#004AC6]'
                }`}
              >
                NEX Wallet
              </Link>

              {currentUser.role === 'MODERATOR' && (
                <Link to="/moderator" className="text-[#712AE2] hover:underline font-bold whitespace-nowrap">
                  Moderator Hub
                </Link>
              )}
              {currentUser.role === 'ADMIN' && (
                <Link to="/admin" className="text-[#0B1C30] hover:underline font-bold whitespace-nowrap">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
