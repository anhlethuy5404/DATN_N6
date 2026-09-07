import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  UserRound,
  ShieldCheck,
  ShoppingBag,
  Wallet,
  MessageCircle,
  Bell,
  AlertTriangle,
  Gavel,
  Gift,
  Package,
  Building2
} from 'lucide-react'
import { MainLayout } from './MainLayout'
import { useAuth } from '../contexts/AuthContext'

interface UserLayoutProps {
  children?: React.ReactNode
  title: string
}

const userNavItems = [
  { label: 'Tổng quan', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Hồ sơ cá nhân', to: '/profile', icon: UserRound },
  { label: 'Tin đăng của tôi', to: '/products/my-listings', icon: Package },
  { label: 'Xác minh eKYC', to: '/verification', icon: ShieldCheck },
  { label: 'Đơn hàng & Escrow', to: '/orders', icon: ShoppingBag },
  { label: 'Đấu giá của tôi', to: '/auctions/my-bids', icon: Gavel },
  { label: 'Đồ nhận & Trao đổi', to: '/pass/my-applications', icon: Gift },
  { label: 'Ví điện tử', to: '/wallet', icon: Wallet },
  { label: 'Điểm hẹn Safe Spot', to: '/safespots', icon: Building2 },
  { label: 'Tin nhắn thương lượng', to: '/messages', icon: MessageCircle },
  { label: 'Thông báo', to: '/notifications', icon: Bell },
  { label: 'Khiếu nại & Tranh chấp', to: '/disputes', icon: AlertTriangle }
]

export const UserLayout: React.FC<UserLayoutProps> = ({ children, title }) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  return (
    <MainLayout>
      <main className="user-page">
        <div className="user-heading">
          <span className="eyebrow">Không Gian Cá Nhân · Nexus Exchange</span>
          <h1>{title}</h1>
        </div>

        <div className="user-layout">
          <aside className="user-sidebar">
            <div className="user-mini">
              <span className="seller-avatar" style={{ background: '#004AC6' }}>
                {currentUser.fullName.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <b>{currentUser.fullName}</b>
                <small style={{ display: 'block', color: '#007D55', fontWeight: 600 }}>
                  Trust score: {currentUser.trustScore}/100 • eKYC Verified
                </small>
              </div>
            </div>

            {userNavItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.to
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={isActive ? 'active' : ''}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </aside>

          <section style={{ minWidth: 0 }}>
            {children}
          </section>
        </div>
      </main>
    </MainLayout>
  )
}
