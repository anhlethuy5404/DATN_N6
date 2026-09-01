import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Clock3, ShieldCheck } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { AuctionCard } from '../../components/auction/AuctionCard'
import { mockProducts } from '../../mock/mockData'

export const AuctionListPage: React.FC = () => {
  const [filterLocation, setFilterLocation] = useState('Tất cả')
  const [status, setStatus] = useState('Đang diễn ra')

  const auctionList = mockProducts.filter((p) => p.transactionType === 'AUCTION')
  const filtered =
    filterLocation === 'Tất cả'
      ? auctionList
      : auctionList.filter((p) => p.provinceName.includes(filterLocation))

  return (
    <MainLayout>
      <main className="auction-page">
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <strong>Đấu giá trực tuyến</strong>
        </div>

        {/* Hero */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24, padding: '30px 0 40px' }}>
          <div>
            <span className="eyebrow">
              <Gavel size={14} /> Mộc Auction House · Minh bạch & Thời gian thực
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px, 4.5vw, 54px)', letterSpacing: '-0.04em', margin: '10px 0 14px' }}>
              Giá trị của món đồ
              <br />
              <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>nằm trong câu chuyện & sự trân trọng.</em>
            </h1>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: 520, fontSize: 15, lineHeight: 1.6 }}>
              Mỗi bước giá được cập nhật tức thì qua WebSocket. Người tham gia được bảo vệ bởi cơ chế chống kích giá ảo và ủy quyền Proxy Bidding tự động.
            </p>
          </div>

          <div
            style={{
              background: '#27231f',
              color: '#fffaf5',
              padding: '24px 28px',
              borderRadius: 8,
              textAlign: 'center'
            }}
          >
            <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 36, color: '#d8a494', display: 'block' }}>
              100%
            </strong>
            <span style={{ fontSize: 12, color: '#b7b0a7' }}>Đã xác minh danh tính người bán trước khi mở phiên</span>
          </div>
        </div>

        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBlock: '1px solid var(--border)', padding: '14px 0', marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Tất cả', 'Hà Nội', 'Đà Nẵng', 'TP. Hồ Chí Minh'].map((loc) => (
              <button
                key={loc}
                className={`secondary-button ${filterLocation === loc ? 'active' : ''}`}
                style={filterLocation === loc ? { background: '#292724', color: '#fff' } : {}}
                onClick={() => setFilterLocation(loc)}
              >
                {loc}
              </button>
            ))}
          </div>

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '8px 12px', borderRadius: 6, fontSize: 13 }}
          >
            <option>Đang diễn ra</option>
            <option>Sắp bắt đầu</option>
            <option>Đã kết thúc</option>
          </select>
        </div>

        {/* Auction Grid */}
        <section>
          <div className="section-heading">
            <div>
              <span className="eyebrow">Thời gian thực</span>
              <h2>Các Phiên Đấu Đang Sôi Nổi</h2>
            </div>
            <span className="section-count">{filtered.length} phiên đang diễn ra</span>
          </div>

          <div className="auction-grid">
            {filtered.map((p) => (
              <AuctionCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
