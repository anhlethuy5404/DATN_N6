import React from 'react'
import { Link } from 'react-router-dom'
import {
  ShieldCheck,
  ShoppingBag,
  Gavel,
  Wallet,
  Plus,
  ArrowRight,
  Gift
} from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { useAuth } from '../../contexts/AuthContext'
import { formatVND, mockWallet } from '../../mock/mockData'

export const DashboardPage: React.FC = () => {
  const { currentUser } = useAuth()

  return (
    <UserLayout title="Bảng Điều Khiển Cá Nhân">
      {/* Welcome Banner */}
      <div className="welcome-card">
        <div>
          <span className="eyebrow" style={{ color: '#d8a494' }}>
            Không gian cá nhân
          </span>
          <h2>Xin chào, {currentUser.fullName}!</h2>
          <p>
            Bạn có 2 đơn hàng đang vận chuyển, 1 phiên đấu giá đang dẫn đầu và ví có{' '}
            {formatVND(mockWallet.balance)} khả dụng.
          </p>
        </div>

        <Link to="/products/create" className="primary-button" style={{ background: '#d8a494', color: '#27231f', fontWeight: 700 }}>
          <Plus size={16} /> Đăng món đồ mới
        </Link>
      </div>

      {/* Metrics Row */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Điểm uy tín (Trust Score)</span>
          <strong style={{ color: '#356b41' }}>{currentUser.trustScore}/100</strong>
          <small>+2 điểm trong tháng này</small>
        </div>

        <div className="stat-card">
          <span>Ví khả dụng</span>
          <strong>{formatVND(mockWallet.balance)}</strong>
          <small>Sẵn sàng cho giao dịch</small>
        </div>

        <div className="stat-card">
          <span>Đấu giá đang tham gia</span>
          <strong>3 phiên</strong>
          <small>1 phiên đang dẫn đầu</small>
        </div>

        <div className="stat-card">
          <span>Đơn hàng đang xử lý</span>
          <strong>2 đơn</strong>
          <small>Bảo lưu an toàn trong Escrow</small>
        </div>
      </div>

      {/* Trust Score Breakdown & Activities */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: 24 }}>
        {/* Recent Activities */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: 0 }}>
              Hoạt động gần đây
            </h3>
            <Link to="/orders" className="danger-link" style={{ color: 'var(--primary)', fontSize: 12 }}>
              Xem tất cả →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {[
              { text: 'Đơn hàng #MOC-2048 đang được giao bởi VNPost', time: '2 giờ trước', dot: '#356b41' },
              { text: 'Bạn vừa đặt giá dẫn đầu 2.950.000 ₫ cho Đồng hồ Seiko 5', time: 'Hôm nay 10:15', dot: '#c5573e' },
              { text: 'Giao dịch #MOC-1982 Ghế lounge đã giải ngân thành công', time: '28/08/2026', dot: '#285d88' }
            ].map((act, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: act.dot, marginTop: 6, flexShrink: 0 }} />
                <div>
                  <b style={{ fontSize: 13, display: 'block' }}>{act.text}</b>
                  <small style={{ color: 'var(--muted-foreground)' }}>{act.time}</small>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* eKYC & Security Card */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <ShieldCheck size={26} color="#356b41" />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: 0 }}>
              Xác minh danh tính eKYC
            </h3>
          </div>

          <p style={{ fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5, margin: 0 }}>
            Tài khoản của bạn đã đạt <strong>Cấp độ 3 (CCCD đã xác minh)</strong>. Hạn mức giao dịch và đấu giá không giới hạn.
          </p>

          <div style={{ background: '#e4efe6', padding: 12, borderRadius: 6, fontSize: 12, color: '#2e6939' }}>
            ✓ Đã xác thực căn cước công dân gắn chip
          </div>

          <Link to="/verification" className="outline-button full-button" style={{ marginTop: 'auto', justifyContent: 'center' }}>
            Xem chi tiết eKYC
          </Link>
        </div>
      </div>
    </UserLayout>
  )
}
