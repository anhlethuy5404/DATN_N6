import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin,
  MessageCircle,
  ShoppingBag,
  Share2,
  AlertTriangle,
  ZoomIn,
  Heart,
  Gavel
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockProducts, formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'
import { ReportModal } from '../../components/modals/ReportModal'

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { savedProductIds, toggleSaveProduct } = useAuth()
  const [activeImgIndex, setActiveImgIndex] = useState(0)
  const [showReport, setShowReport] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]
  const isSaved = savedProductIds.includes(product.id)
  const images = product.images.length > 0 ? product.images : [product.primaryImage]

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/products">Sản phẩm</Link>
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
                <ZoomIn size={14} /> Xem ảnh kích thước lớn
              </span>
            </div>

            {images.length > 1 && (
              <div className="thumbnail-row">
                {images.map((img, i) => (
                  <button
                    key={i}
                    className={i === activeImgIndex ? 'active' : ''}
                    onClick={() => setActiveImgIndex(i)}
                  >
                    <img src={img} alt="thumb" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'var(--muted-foreground)', fontSize: 12 }}>
              <span className="product-tag" style={{ position: 'static' }}>
                {product.transactionType === 'PASS'
                  ? 'CHO TẶNG MIỄN PHÍ'
                  : product.transactionType === 'BARTER'
                  ? 'TRAO ĐỔI'
                  : product.transactionType === 'AUCTION'
                  ? 'ĐẤU GIÁ'
                  : 'MUA BÁN CỐ ĐỊNH'}
              </span>
              <span>Mã tin: #PRD-{product.id} · Đã xem: {product.viewsCount}</span>
            </div>

            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(28px, 3.5vw, 40px)', margin: '14px 0', lineHeight: 1.15 }}>
              {product.title}
            </h1>

            <div className="detail-price-row">
              <strong>
                {product.transactionType === 'PASS'
                  ? 'Miễn phí (0 ₫)'
                  : formatVND(product.salePrice || product.currentPrice || 0)}
              </strong>
              {product.allowNegotiation && (
                <span style={{ color: '#356b41', fontWeight: 600, fontSize: 12, background: '#eaf3eb', padding: '3px 8px', borderRadius: 4 }}>
                  ✓ Cho phép trả giá qua chat
                </span>
              )}
            </div>

            <div className="detail-facts">
              <span>
                Tình trạng món đồ:
                <b>{product.condition === 'LIKE_NEW' ? 'Như mới (99%)' : 'Đã qua sử dụng tốt'}</b>
              </span>
              <span>
                Khu vực món đồ:
                <b>{product.districtName}, {product.provinceName}</b>
              </span>
              <span>
                Danh mục:
                <b>{product.categoryName}</b>
              </span>
              <span>
                Hình thức giao nhận:
                <b>Ký quỹ giao hàng hoặc Gặp mặt an toàn</b>
              </span>
            </div>

            {/* If Barter / Pass specific note */}
            {product.preferredExchangeItems && (
              <div style={{ background: '#fdf4ec', border: '1px solid #ebdcd0', padding: 14, borderRadius: 6, margin: '16px 0', fontSize: 13 }}>
                <b style={{ color: '#8a523b' }}>Món đồ người đăng muốn đổi lại:</b>
                <p style={{ margin: '4px 0 0', color: 'var(--foreground)' }}>{product.preferredExchangeItems}</p>
              </div>
            )}

            {product.noteForPass && (
              <div style={{ background: '#edf5ee', border: '1px solid #cfe2d1', padding: 14, borderRadius: 6, margin: '16px 0', fontSize: 13 }}>
                <b style={{ color: '#356b41' }}>Lời nhắn cho tặng (Pass):</b>
                <p style={{ margin: '4px 0 0', color: 'var(--foreground)' }}>{product.noteForPass}</p>
              </div>
            )}

            {/* Actions */}
            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {product.transactionType === 'AUCTION' ? (
                <button
                  className="primary-button full-button"
                  style={{ padding: '14px 20px', fontSize: 15 }}
                  onClick={() => navigate(`/auctions/${product.id}`)}
                >
                  <Gavel size={18} /> Đến phòng đấu giá trực tuyến
                </button>
              ) : product.transactionType === 'PASS' ? (
                <button
                  className="primary-button full-button"
                  style={{ padding: '14px 20px', fontSize: 15, background: '#356b41' }}
                  onClick={() => navigate('/messages')}
                >
                  Xin món đồ này (Gửi tin nhắn)
                </button>
              ) : product.transactionType === 'BARTER' ? (
                <button
                  className="primary-button full-button"
                  style={{ padding: '14px 20px', fontSize: 15, background: '#8a523b' }}
                  onClick={() => navigate('/messages')}
                >
                  Đề xuất đổi đồ (Gửi tin nhắn kèm món đồ)
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }}>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      style={{ padding: '10px 14px', border: 0, background: 'none', cursor: 'pointer' }}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 8px', fontWeight: 600 }}>{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      style={{ padding: '10px 14px', border: 0, background: 'none', cursor: 'pointer' }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="primary-button"
                    style={{ flex: 1, padding: '14px 20px', fontSize: 15 }}
                    onClick={() => navigate('/checkout')}
                  >
                    <ShoppingBag size={18} /> Mua ngay qua Mộc Escrow
                  </button>
                </div>
              )}

              <div style={{ display: 'flex', gap: 12 }}>
                <button
                  className="outline-button"
                  style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => navigate('/messages')}
                >
                  <MessageCircle size={16} /> Nhắn tin thương lượng
                </button>
                <button
                  className="secondary-button"
                  onClick={() => toggleSaveProduct(product.id)}
                  aria-label="Lưu"
                >
                  <Heart size={16} fill={isSaved ? 'var(--primary)' : 'none'} color={isSaved ? 'var(--primary)' : 'currentColor'} />
                </button>
                <button
                  className="secondary-button"
                  onClick={() => setShowReport(true)}
                  title="Báo cáo vi phạm"
                >
                  <AlertTriangle size={16} color="var(--danger)" />
                </button>
              </div>
            </div>

            {/* Escrow guarantee banner */}
            <div
              style={{
                marginTop: 24,
                padding: 16,
                background: '#f8f4ec',
                border: '1px solid #ebdcd0',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 12
              }}
            >
              <ShieldCheck size={28} color="var(--primary)" style={{ flexShrink: 0 }} />
              <div>
                <b style={{ color: 'var(--foreground)' }}>Đảm bảo giao dịch an toàn 100%</b>
                <p style={{ margin: '2px 0 0', color: 'var(--muted-foreground)' }}>
                  Khoản thanh toán được ký quỹ qua VNPAY. Chỉ giải ngân cho người bán sau khi bạn kiểm tra và xác nhận nhận hàng.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Section: Description & Seller */}
        <div className="detail-lower">
          <div>
            <div className="detail-section">
              <span className="eyebrow">Câu chuyện món đồ</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 16px' }}>
                Mô tả chi tiết & Nguồn gốc
              </h2>
              <p style={{ lineHeight: 1.8, fontSize: 14, color: '#4d4841', whiteSpace: 'pre-line' }}>
                {product.description}
              </p>
            </div>

            <div className="detail-section">
              <span className="eyebrow">Quy định giao dịch</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 16px' }}>
                Chính sách bảo vệ người mua Mộc
              </h2>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10, color: 'var(--muted-foreground)', fontSize: 13 }}>
                <li>Kiểm tra hàng đồng kiểm khi nhận bưu phẩm hoặc gặp mặt trực tiếp.</li>
                <li>Có quyền mở khiếu nại tranh chấp trong vòng 48 giờ nếu sản phẩm không đúng mô tả.</li>
                <li>Hoàn tiền 100% từ tài khoản đóng băng Escrow nếu người bán có hành vi gian lận.</li>
              </ul>
            </div>
          </div>

          <aside>
            {/* Seller Card */}
            <div className="seller-card">
              <span className="eyebrow" style={{ marginBottom: 8 }}>Thông tin người bán</span>
              <div className="seller-card-head">
                <span className="seller-avatar">
                  {product.sellerName.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <strong>{product.sellerName}</strong>
                  <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                    Thành viên từ 2022
                  </span>
                </div>
              </div>

              <div className="seller-stats">
                <span>
                  <b>{product.sellerTrustScore}%</b>
                  <small>Trust Score</small>
                </span>
                <span>
                  <b>★ {product.sellerRating || 5.0}</b>
                  <small>Đánh giá</small>
                </span>
                <span>
                  <b>126</b>
                  <small>Đơn hoàn tất</small>
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#356b41', fontSize: 12, marginBottom: 14 }}>
                <ShieldCheck size={16} /> Đã hoàn tất xác minh eKYC CCCD
              </div>

              <button
                className="outline-button full-button"
                onClick={() => navigate('/messages')}
              >
                <MessageCircle size={15} /> Nhắn tin với người bán
              </button>
            </div>

            {/* Meetup Spot suggestion */}
            <div className="safety-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <MapPin size={18} color="var(--primary)" />
                <strong style={{ fontSize: 13 }}>Điểm hẹn an toàn đề xuất</strong>
              </div>
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
                {product.detailedLocation || 'Cầu Giấy, Hà Nội (Có camera an ninh và bảo vệ)'}
              </p>
            </div>
          </aside>
        </div>
      </main>

      {showReport && (
        <ReportModal close={() => setShowReport(false)} productTitle={product.title} />
      )}
    </MainLayout>
  )
}
