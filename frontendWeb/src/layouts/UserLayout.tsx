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
  Gift
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
  { label: 'Xác minh eKYC', to: '/verification', icon: ShieldCheck },
  { label: 'Đơn hàng & Escrow', to: '/orders', icon: ShoppingBag },
  { label: 'Đấu giá của tôi', to: '/auctions/my-bids', icon: Gavel },
  { label: 'Đồ nhận & Trao đổi', to: '/pass/my-applications', icon: Gift },
  { label: 'Ví điện tử', to: '/wallet', icon: Wallet },
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
          <span className="eyebrow">Không gian cá nhân · Mộc Marketplace</span>
          <h1>{title}</h1>
        </div>

        <div className="user-layout">
          <aside className="user-sidebar">
            <div className="user-mini">
              <span className="seller-avatar">
                {currentUser.fullName.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <b>{currentUser.fullName}</b>
                <small style={{ display: 'block', color: '#356b41', fontWeight: 600 }}>
                  Trust score: {currentUser.trustScore}/100
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
