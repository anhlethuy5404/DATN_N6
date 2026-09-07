import React from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  PackageCheck,
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  History,
  BarChart3,
  PanelLeft,
  ChevronRight,
  Bell,
  Sparkles
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const moderatorNav = [
  { label: 'Tổng quan', to: '/moderator', icon: LayoutDashboard },
  { label: 'Kiểm duyệt sản phẩm', to: '/moderator/products', icon: PackageCheck },
  { label: 'Xử lý tranh chấp', to: '/moderator/disputes', icon: ShieldAlert },
  { label: 'Báo cáo vi phạm', to: '/moderator/reports', icon: AlertTriangle },
  { label: 'Xác minh eKYC CCCD', to: '/moderator/verifications', icon: FileCheck2 },
  { label: 'Lịch sử xử lý', to: '/moderator/history', icon: History },
  { label: 'Thống kê hiệu suất', to: '/moderator/statistics', icon: BarChart3 }
]

export const ModeratorLayout: React.FC<{ children?: React.ReactNode; title?: string }> = ({
  children,
  title = 'Cổng Điều Phối Viên & Kiểm Duyệt Nexus'
}) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar bg-[#0B1C30] text-slate-300">
        <div className="admin-brand flex items-center gap-3 p-4 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#712AE2] to-[#004AC6] flex items-center justify-center text-white font-bold">
            <Sparkles size={16} />
          </div>
          <div>
            <span className="font-extrabold text-white text-base tracking-tight">Nexus Moderator</span>
            <small className="block text-[10px] text-[#A78BFA] font-mono">TRUST & SAFETY HUB</small>
          </div>
        </div>

        <nav className="p-3 space-y-1">
          {moderatorNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-[#712AE2] text-white shadow-xs font-bold'
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
            <div className="w-8 h-8 rounded-full bg-[#712AE2] text-white text-xs font-bold flex items-center justify-center">
              ND
            </div>
            <div>
              <b className="text-xs text-white block">{currentUser.fullName}</b>
              <span className="text-[10px] text-[#A78BFA]">Trust & Safety Specialist</span>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
              Trung tâm kiểm duyệt an toàn sàn giao dịch Nexus Exchange
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted-foreground)' }}>
              <Bell size={16} className="text-[#BA1A1A]" />
              <span>4 mục cần duyệt gấp</span>
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              Thứ Hai, 7 tháng 9, 2026
            </span>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-page-heading">
            <div>
              <span className="eyebrow" style={{ color: '#712AE2' }}>
                Nexus Trust & Safety Hub · AI Assisted Moderation
              </span>
              <h1>{title}</h1>
            </div>
          </div>

          {children || <Outlet />}
        </main>
      </div>
    </div>
  )
}
