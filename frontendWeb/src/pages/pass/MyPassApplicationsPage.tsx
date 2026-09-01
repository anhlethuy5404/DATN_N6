import React from 'react'
import { Link } from 'react-router-dom'
import { Gift, RefreshCw, Check, Clock3, MessageCircle } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'

export const MyPassApplicationsPage: React.FC = () => {
  const applications = [
    {
      id: 'APP-102',
      type: 'PASS',
      productTitle: 'Bàn làm việc gỗ thông tự nhiên 1m2 x 60cm',
      ownerName: 'Phúc Nguyễn',
      status: 'APPROVED',
      note: 'Chào bạn, mình là sinh viên năm nhất ĐH Quốc Gia Hà Nội, mình xin bàn để học tập và hứa giữ gìn cẩn thận.',
      date: '06/09/2026',
      meetupSpot: 'Highlands Coffee Duy Tân, Cầu Giấy'
    },
    {
      id: 'APP-101',
      type: 'BARTER',
      productTitle: 'Cối xay cà phê tay Comandante C40 MK4',
      ownerName: 'Bếp Cà Phê Mộc',
      status: 'PENDING',
      note: 'Đề xuất đổi lấy: Đồng hồ cơ Seiko 5 Demi còn mới 95%.',
      date: '05/09/2026',
      meetupSpot: 'Bưu điện Bờ Hồ'
    }
  ]

  return (
    <UserLayout title="Đồ Nhận & Trao Đổi (Pass / Barter)">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {applications.map((app) => (
          <div
            key={app.id}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="eyebrow" style={{ color: app.type === 'PASS' ? '#356b41' : '#8a523b' }}>
                {app.type === 'PASS' ? (
                  <>
                    <Gift size={14} /> Đơn xin nhận đồ miễn phí
                  </>
                ) : (
                  <>
                    <RefreshCw size={14} /> Đề xuất trao đổi món đồ
                  </>
                )}
              </span>

              {app.status === 'APPROVED' ? (
                <span className="status" style={{ background: '#e4efe6', color: '#2e6939' }}>
                  <Check size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Chủ đồ đã đồng ý
                </span>
              ) : (
                <span className="status warning">
                  <Clock3 size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Đang chờ phản hồi
                </span>
              )}
            </div>

            <div>
              <h3 style={{ fontSize: 16, margin: '2px 0 4px' }}>{app.productTitle}</h3>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
                Chủ món đồ: <strong>{app.ownerName}</strong> · Ngày gửi: {app.date}
              </p>
            </div>

            <div style={{ background: 'var(--muted)', padding: 12, borderRadius: 6, fontSize: 13 }}>
              <b>Lời nhắn / Đề xuất của bạn:</b>
              <p style={{ margin: '4px 0 0', color: 'var(--foreground)' }}>{app.note}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8, borderTop: '1px solid var(--border)' }}>
              <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                Điểm hẹn an toàn: <b>{app.meetupSpot}</b>
              </span>
              <Link to="/messages" className="outline-button" style={{ padding: '6px 14px', fontSize: 12 }}>
                <MessageCircle size={14} /> Nhắn tin với chủ đồ
              </Link>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  )
}
