import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Star, BadgeCheck, Check, MapPin, Mail, Phone } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { useAuth } from '../../contexts/AuthContext'

export const ProfilePage: React.FC = () => {
  const { currentUser } = useAuth()

  return (
    <UserLayout title="Hồ Sơ Cá Nhân">
      {/* Profile Hero */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 28, marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <span className="profile-avatar-large">
            {currentUser.fullName.slice(0, 2).toUpperCase()}
          </span>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: 0 }}>
                {currentUser.fullName}
              </h2>
              <BadgeCheck size={22} color="#356b41" />
            </div>

            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: '4px 0' }}>
              @{currentUser.username} · Thành viên từ tháng 03/2022
            </p>

            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--muted-foreground)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Mail size={14} /> {currentUser.email}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Phone size={14} /> {currentUser.phoneNumber || '0912 345 678'}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={14} /> Cầu Giấy, Hà Nội
              </span>
            </div>
          </div>

          <Link to="/profile/edit" className="outline-button">
            Chỉnh sửa thông tin
          </Link>
        </div>
      </div>

      {/* Trust Score Card */}
      <div className="trust-score">
        <div className="score-ring">
          <strong>{currentUser.trustScore}</strong>
          <small>/100</small>
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '0 0 4px' }}>
            Điểm Tín Nhiệm (Trust Score) Rất Cao
          </h3>
          <p style={{ color: 'var(--primary)', margin: '0 0 8px', fontSize: 13, fontWeight: 600 }}>
            Tài khoản đáng tin cậy cao trên sàn Mộc
          </p>
          <div className="score-factors">
            <span><Check size={14} color="#356b41" /> 126 giao dịch thành công</span>
            <span><Check size={14} color="#356b41" /> 98% đánh giá tích cực 5 sao</span>
            <span><Check size={14} color="#356b41" /> Đã xác thực căn cước eKYC CCCD</span>
            <span><Check size={14} color="#356b41" /> 0 lần vi phạm nội quy</span>
          </div>
        </div>
      </div>

      {/* Reviews Summary */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 16 }}>
          Đánh giá từ cộng đồng (126 đánh giá)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {[
            { author: 'Thu Hà', comment: 'Bạn đóng gói máy ảnh cẩn thận 3 lớp xốp khí, máy nguyên zin đúng như mô tả!', rating: 5, date: '2 tuần trước' },
            { author: 'Quang Huy', comment: 'Giao dịch nhanh tại Highlands Duy Tân rất vui vẻ và an tâm!', rating: 5, date: '1 tháng trước' }
          ].map((rev, i) => (
            <div key={i} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <b style={{ fontSize: 13 }}>{rev.author}</b>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, color: '#c98835', fontSize: 12 }}>
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
              <p style={{ margin: '2px 0 4px', fontSize: 13, color: 'var(--muted-foreground)' }}>
                “{rev.comment}”
              </p>
              <small style={{ color: '#aaa', fontSize: 11 }}>{rev.date}</small>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
