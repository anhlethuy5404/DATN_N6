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
  UserCheck
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

export const Header: React.FC = () => {
  const [query, setQuery] = useState('')
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
      <div className="announcement">
        <span>Giao dịch an tâm với quỹ bảo vệ người mua Mộc Escrow (Ký quỹ VNPAY)</span>
        <span
          className="announcement-link"
          onClick={() => navigate('/orders')}
        >
          <ShieldCheck size={14} /> Tìm hiểu cách hoạt động
        </span>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark">m</span>
            <span>mộc</span>
          </Link>

          <div className="search-shell">
            <Search size={18} />
            <input
              type="text"
              aria-label="Tìm kiếm sản phẩm"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="Tìm máy ảnh, ghế vintage, đồng hồ cơ..."
            />
            <kbd>Enter</kbd>
          </div>

          <div className="header-actions">
            {/* Quick role switcher demo for DATN reviewer */}
            <button
              className={`role-switcher-badge ${currentUser.role}`}
              title="Bấm để đổi vai trò kiểm thử (User -> Moderator -> Admin)"
              onClick={() => {
                switchRole(nextRole)
                if (nextRole === 'ADMIN') navigate('/admin')
                else if (nextRole === 'MODERATOR') navigate('/moderator')
                else navigate('/')
              }}
            >
              <UserCheck size={14} />
              <span>Vai trò: {currentUser.role}</span>
            </button>

            <button className="location-button">
              <MapPin size={16} /> Hà Nội <ChevronDown size={14} />
            </button>

            <Link to="/messages" className="icon-button" aria-label="Tin nhắn">
              <MessageCircle size={20} />
              {unreadMessagesCount > 0 && <span className="icon-badge">{unreadMessagesCount}</span>}
            </Link>

            <Link to="/notifications" className="icon-button" aria-label="Thông báo">
              <Bell size={20} />
              {unreadNotifsCount > 0 && <span className="icon-badge">{unreadNotifsCount}</span>}
            </Link>

            <Link to="/cart" className="icon-button" aria-label="Giỏ hàng">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="icon-badge">{cartCount}</span>}
            </Link>

            <Link to="/dashboard" className="profile-button">
              <span className="avatar">
                {currentUser.fullName.slice(0, 2).toUpperCase()}
              </span>
              <ChevronDown size={14} />
            </Link>
          </div>
        </div>

        <nav className="category-nav">
          <div className="nav-inner">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Khám phá
            </Link>
            <Link
              to="/products"
              className={location.pathname === '/products' ? 'active' : ''}
            >
              Sản phẩm
            </Link>
            <Link
              to="/auctions"
              className={location.pathname.startsWith('/auctions') ? 'active' : ''}
            >
              Đấu giá trực tuyến
            </Link>
            <Link
              to="/pass"
              className={location.pathname === '/pass' ? 'active' : ''}
            >
              Trao đổi & Cho tặng
            </Link>

            {currentUser.role === 'MODERATOR' && (
              <Link to="/moderator" style={{ color: '#285d88', fontWeight: 600 }}>
                Cổng Moderator
              </Link>
            )}
            {currentUser.role === 'ADMIN' && (
              <Link to="/admin" style={{ color: '#c5573e', fontWeight: 600 }}>
                Cổng Admin
              </Link>
            )}

            <span className="nav-spacer" />
            <Link className="sell-link" to="/products/create">
              <Plus size={16} /> Đăng món đồ
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}
