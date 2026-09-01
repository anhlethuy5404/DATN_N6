import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Gavel,
  ShieldCheck,
  Check,
  ZoomIn,
  TrendingUp,
  UserCheck
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockProducts, mockBids, formatVND } from '../../mock/mockData'
import { ProxyModal } from '../../components/auction/ProxyModal'
import { AuctionBid } from '../../types'

export const AuctionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const product =
    mockProducts.find((p) => p.id === id && p.transactionType === 'AUCTION') ||
    mockProducts.find((p) => p.transactionType === 'AUCTION') ||
    mockProducts[2]

  const [currentPrice, setCurrentPrice] = useState(product.currentPrice || 2950000)
  const [bids, setBids] = useState<AuctionBid[]>(mockBids)
  const [bidInput, setBidInput] = useState('')
  const [msg, setMsg] = useState('')
  const [showProxy, setShowProxy] = useState(false)
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  const minNextBid = currentPrice + (product.stepPrice || 100000)
  const images = product.images.length > 0 ? product.images : [product.primaryImage]

  const handlePlaceBid = (e: React.FormEvent) => {
    e.preventDefault()
    const val = Number(bidInput.replace(/\D/g, ''))
    if (!val || val < minNextBid) {
      setMsg(`Giá đặt tối thiểu tiếp theo phải từ ${formatVND(minNextBid)}.`)
      return
    }

    setCurrentPrice(val)
    const newBid: AuctionBid = {
      id: 'bid-' + Date.now(),
      auctionId: product.auctionId || 'AUC-301',
      bidderId: 'USR-1001',
      bidderName: 'Minh Anh (Bạn)',
      bidAmount: val,
      isAutoBid: false,
      createdAt: 'Vừa xong'
    }
    setBids([newBid, ...bids])
    setMsg('Chúc mừng! Bạn đang là người dẫn đầu phiên đấu giá.')
    setBidInput('')
  }

  return (
    <MainLayout>
      <main className="detail-page auction-detail">
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/auctions">Đấu giá</Link>
          <span>/</span>
          <strong>{product.title}</strong>
        </div>

        <div className="detail-hero">
          {/* Gallery */}
          <div className="gallery-panel">
            <div className="main-gallery">
              <img src={images[activeImgIndex]} alt={product.title} />
              {images.length > 1 && (
                <>
                  <button
                    className="gallery-arrow prev"
                    onClick={() =>
                      setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length)
                    }
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <button
                    className="gallery-arrow next"
                    onClick={() => setActiveImgIndex((prev) => (prev + 1) % images.length)}
                  >
                    <ArrowRight size={18} />
                  </button>
                </>
              )}
              <span className="zoom-hint">
                <ZoomIn size={14} /> Phóng to chi tiết
              </span>
            </div>
          </div>

          {/* Auction Info Panel */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <span className="product-tag auction-tag" style={{ position: 'static' }}>
                <Gavel size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} /> ĐANG DIỄN RA
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 700, fontSize: 13 }}>
                <Clock3 size={15} /> {product.endTime || 'Còn 05:42:18'}
              </span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, margin: '6px 0 16px' }}>
              {product.title}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <span className="seller-avatar">
                {product.sellerName.slice(0, 2).toUpperCase()}
              </span>
              <div>
                <b style={{ fontSize: 14 }}>{product.sellerName}</b>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#356b41' }}>
                  <ShieldCheck size={13} /> Điểm tín nhiệm Trust: {product.sellerTrustScore}%
                </div>
              </div>
            </div>

            <div className="auction-facts">
              <span>
                Giá khởi điểm:
                <b>{formatVND(product.startPrice || 2000000)}</b>
              </span>
              <span>
                Bước giá tối thiểu:
                <b>{formatVND(product.stepPrice || 100000)}</b>
              </span>
              <span>
                Tổng lượt đấu:
                <b>{bids.length} lượt</b>
              </span>
            </div>

            {/* Bidding Box */}
            <div className="bid-panel">
              <div className="bid-top">
                <span>Giá dẫn đầu hiện tại:</span>
                <strong>{formatVND(currentPrice)}</strong>
              </div>

              <div className="next-bid">
                Mức giá tối thiểu tiếp theo: <b>{formatVND(minNextBid)}</b>
              </div>

              {msg && (
                <div className={`bid-message ${msg.includes('dẫn đầu') ? 'success' : ''}`}>
                  {msg}
                </div>
              )}

              <form onSubmit={handlePlaceBid}>
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    type="text"
                    placeholder={`Ví dụ: ${formatVND(minNextBid)}`}
                    value={bidInput}
                    onChange={(e) => setBidInput(e.target.value)}
                    style={{ flex: 1 }}
                  />
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setBidInput(minNextBid.toLocaleString('vi-VN'))}
                  >
                    + Bước giá
                  </button>
                </div>

                <button type="submit" className="primary-button full-button" style={{ padding: '12px 18px', fontSize: 15 }}>
                  <Gavel size={16} /> Đặt giá ngay
                </button>
              </form>

              <button
                type="button"
                className="proxy-button"
                onClick={() => setShowProxy(true)}
              >
                ✦ Thiết lập đặt giá tự động (Proxy Bidding)
              </button>
              <small style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: 11, textAlign: 'center' }}>
                Hệ thống tự động nâng giá thay bạn trong mức trần khi có người khác trả giá cao hơn.
              </small>
            </div>
          </div>
        </div>

        {/* Details & Bid History */}
        <div className="detail-lower">
          <div>
            <div className="detail-section">
              <span className="eyebrow">Về món đồ</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 16px' }}>
                Mô tả tình trạng & Câu chuyện
              </h2>
              <p style={{ lineHeight: 1.8, fontSize: 14, color: '#4d4841', whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
            </div>

            <div className="detail-section">
              <span className="eyebrow">Quy định đấu giá</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 16px' }}>
                Luật đấu giá Mộc Auction
              </h2>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--muted-foreground)', fontSize: 13 }}>
                <li><Check size={14} color="#356b41" style={{ verticalAlign: 'middle', marginRight: 6 }} /> Người thắng phiên có 24 giờ để thanh toán qua cổng Mộc Escrow.</li>
                <li><Check size={14} color="#356b41" style={{ verticalAlign: 'middle', marginRight: 6 }} /> Nếu người thắng không nhận hàng, món đồ sẽ tự động chuyển sang chế độ Re-Auction (Đấu giá lại).</li>
                <li><Check size={14} color="#356b41" style={{ verticalAlign: 'middle', marginRight: 6 }} /> Người mua nhận hàng kiểm tra trong 48 giờ trước khi giải ngân cho chủ món đồ.</li>
              </ul>
            </div>
          </div>

          <aside>
            <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: 0 }}>
                  Lịch sử đặt giá
                </h3>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                  {bids.length} lượt
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bids.map((b, idx) => (
                  <div
                    key={b.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 0',
                      borderBottom: '1px solid var(--border)',
                      fontSize: 12
                    }}
                  >
                    <span
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: idx === 0 ? 'var(--primary)' : 'var(--muted)',
                        color: idx === 0 ? 'white' : 'var(--foreground)',
                        display: 'grid',
                        placeItems: 'center',
                        fontSize: 10,
                        fontWeight: 700
                      }}
                    >
                      {idx + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <b>{b.bidderName}</b>
                      <small style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: 10 }}>
                        {b.createdAt} {b.isAutoBid && '· (Proxy)'}
                      </small>
                    </div>
                    <strong style={{ color: idx === 0 ? 'var(--primary)' : 'var(--foreground)' }}>
                      {formatVND(b.bidAmount)}
                    </strong>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {showProxy && (
        <ProxyModal
          close={() => setShowProxy(false)}
          productTitle={product.title}
          currentPrice={currentPrice}
        />
      )}
    </MainLayout>
  )
}
