import React from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  UserCog,
  PackageCheck,
  Tag,
  BarChart3,
  Gavel,
  ShieldAlert,
  SlidersHorizontal,
  Settings,
  PanelLeft,
  ChevronRight,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const adminNav = [
  { label: 'Tổng quan hệ thống', to: '/admin', icon: LayoutDashboard },
  { label: 'Quản lý người dùng', to: '/admin/users', icon: Users },
  { label: 'Điều phối viên', to: '/admin/moderators', icon: UserCog },
  { label: 'Sản phẩm & Đăng bán', to: '/admin/products', icon: PackageCheck },
  { label: 'Cây danh mục', to: '/admin/categories', icon: Tag },
  { label: 'Dòng tiền & Giao dịch', to: '/admin/transactions', icon: BarChart3 },
  { label: 'Phiên đấu giá', to: '/admin/auctions', icon: Gavel },
  { label: 'Đấu giá lại (Re-auction)', to: '/admin/reauction', icon: RotateCcw },
  { label: 'Tranh chấp Escrow', to: '/admin/disputes', icon: ShieldAlert },
  { label: 'Phí nền tảng & Hạn mức', to: '/admin/fees', icon: SlidersHorizontal },
  { label: 'Danh mục cấm', to: '/admin/banned-items', icon: ShieldAlert },
  { label: 'Cài đặt hệ thống', to: '/admin/settings', icon: Settings }
]

export const AdminLayout: React.FC<{ children?: React.ReactNode; title?: string }> = ({
  children,
  title = 'Quản Trị Hệ Thống Nexus'
}) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar bg-[#0B1C30] text-slate-300">
        <div className="admin-brand flex items-center gap-3 p-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#004AC6] to-[#712AE2] flex items-center justify-center text-white font-bold">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">Nexus Admin</span>
            <small className="block text-[10px] text-[#6FFBBE] font-mono">ROOT PRIVILEGES</small>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#004AC6] text-white shadow-xs font-bold'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={16} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} className="ml-auto" />}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-foot p-4 border-t border-slate-800 mt-auto space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <PanelLeft size={15} />
            <span>Về giao diện người dùng</span>
          </Link>
          <div className="flex items-center gap-2.5 pt-2 border-t border-slate-800">
            <div className="w-8 h-8 rounded-full bg-[#004AC6] text-white text-xs font-bold flex items-center justify-center">
              AD
            </div>
            <div>
              <b className="text-xs text-white block">{currentUser.fullName}</b>
              <span className="text-[10px] text-[#6FFBBE]">System Administrator</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
              Trung tâm điều hành nền tảng Nexus Exchange Platform
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              Phiên bản 2.6.0 · Nexus Architecture
            </span>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-page-heading">
            <div>
              <span className="eyebrow">Platform Administration</span>
              <h1>{title}</h1>
            </div>
          </div>

          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
