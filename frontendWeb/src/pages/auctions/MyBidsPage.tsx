import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Clock3, Trophy, ArrowRight } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { formatVND } from '../../mock/mockData'

export const MyBidsPage: React.FC = () => {
  const myBids = [
    {
      id: 'AUC-301',
      productId: '3',
      title: 'Đồng hồ Seiko 5 Automatic cổ điển mặt số lục bảo',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
      myMaxBid: 3200000,
      currentPrice: 2950000,
      status: 'LEADING', // Bạn đang dẫn đầu
      endsIn: '05:42:18'
    },
    {
      id: 'AUC-298',
      productId: '2',
      title: 'Ghế lounge da bò nâu vintage phong cách Bắc Âu',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
      myMaxBid: 3200000,
      currentPrice: 3200000,
      status: 'WON', // Bạn đã thắng
      endsIn: 'Đã kết thúc'
    },
    {
      id: 'AUC-292',
      productId: '4',
      title: 'Xe đạp touring Nhật Bản khung thép Cr-Mo',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=900&q=85',
      myMaxBid: 3800000,
      currentPrice: 4200000,
      status: 'OUTBID', // Bị vượt giá
      endsIn: 'Còn 08:26:04'
    }
  ]

  return (
    <UserLayout title="Đấu Giá Của Tôi">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {myBids.map((item) => (
          <div
            key={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '16px 20px',
              flexWrap: 'wrap'
            }}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 6 }}
            />

            <div style={{ flex: 1, minWidth: 220 }}>
              <span className="eyebrow" style={{ fontSize: 10, marginBottom: 4 }}>
                Mã phiên: {item.id}
              </span>
              <h3 style={{ fontSize: 15, margin: '2px 0 6px' }}>{item.title}</h3>
              <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--muted-foreground)' }}>
                <span>Giá bạn đặt: <b>{formatVND(item.myMaxBid)}</b></span>
                <span>Giá hiện tại: <b style={{ color: 'var(--primary)' }}>{formatVND(item.currentPrice)}</b></span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
              {item.status === 'LEADING' && (
                <span className="status" style={{ background: '#e4efe6', color: '#2e6939' }}>
                  <Trophy size={13} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                  Đang dẫn đầu
                </span>
              )}
              {item.status === 'WON' && (
                <span className="status" style={{ background: '#d8e8f8', color: '#23598c' }}>
                  ★ Bạn đã thắng phiên
                </span>
              )}
              {item.status === 'OUTBID' && (
                <span className="status danger">
                  Bị trả giá cao hơn
                </span>
              )}

              <Link
                to={`/auctions/${item.productId}`}
                className="outline-button"
                style={{ padding: '6px 12px', fontSize: 12 }}
              >
                Vào xem phiên <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </UserLayout>
  )
}
