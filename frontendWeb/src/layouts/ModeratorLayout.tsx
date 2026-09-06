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
  Bell
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
  title = 'Cổng Điều Phối Viên & Kiểm Duyệt'
}) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar" style={{ background: '#1c242c' }}>
        <div className="admin-brand">
          <span className="brand-mark" style={{ background: '#285d88' }}>m</span>
          <span>mộc</span>
          <small style={{ color: '#88b5dd', background: 'rgba(136, 181, 221, 0.15)' }}>
            MODERATOR
          </small>
        </div>

        <nav>
          {moderatorNav.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.to
            return (
              <Link key={item.to} to={item.to} className={isActive ? 'active' : ''}>
                <Icon size={17} />
                <span>{item.label}</span>
                {isActive && <ChevronRight size={14} style={{ marginLeft: 'auto' }} />}
              </Link>
            )
          })}
        </nav>

        <div className="admin-sidebar-foot">
          <Link to="/">
            <PanelLeft size={16} /> Về trang người dùng
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12 }}>
            <span className="avatar" style={{ background: '#285d88', color: '#fff' }}>
              ND
            </span>
            <div>
              <b style={{ fontSize: 13 }}>{currentUser.fullName}</b>
              <small style={{ display: 'block', color: '#88b5dd' }}>Kiểm duyệt viên Mộc</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
              Trung tâm kiểm duyệt an toàn sàn giao dịch
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted-foreground)' }}>
              <Bell size={16} color="var(--primary)" /> 4 mục cần duyệt gấp
            </div>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              Thứ Hai, 7 tháng 9, 2026
            </span>
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-page-heading">
            <div>
              <span className="eyebrow" style={{ color: '#285d88' }}>
                Moderation Center · An toàn & Tin cậy
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
