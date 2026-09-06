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
  RotateCcw
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
  title = 'Quản Trị Hệ Thống Cấp Cao'
}) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <span className="brand-mark">m</span>
          <span>mộc</span>
          <small>SUPER ADMIN</small>
        </div>

        <nav>
          {adminNav.map((item) => {
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
            <span className="avatar" style={{ background: 'var(--primary)', color: '#fff' }}>
              AD
            </span>
            <div>
              <b style={{ fontSize: 13 }}>{currentUser.fullName}</b>
              <small style={{ display: 'block', color: '#c7a27d' }}>Quản trị viên tối cao</small>
            </div>
          </div>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div className="admin-search">
            <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
              Trung tâm điều hành nền tảng Mộc Marketplace
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
              Thứ Hai, 7 tháng 9, 2026 · Phiên bản 2.6.0
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
