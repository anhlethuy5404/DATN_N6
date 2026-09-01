import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, ArrowRight, ShieldCheck, Sparkles, Plus, Gift } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { ProductCard } from '../../components/product/ProductCard'
import { AuctionCard } from '../../components/auction/AuctionCard'
import { mockProducts, mockCategories } from '../../mock/mockData'

export const HomePage: React.FC = () => {
  const auctionProducts = mockProducts.filter((p) => p.transactionType === 'AUCTION')
  const saleProducts = mockProducts.filter((p) => p.transactionType === 'SALE')
  const passProducts = mockProducts.filter((p) => p.transactionType === 'PASS' || p.transactionType === 'BARTER')

  return (
    <MainLayout>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #f3efe9 0%, #f8f7f3 100%)',
          padding: '60px 24px 70px',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <div style={{ maxWidth: 1240, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 36 }}>
          <div style={{ maxWidth: 640 }}>
            <span className="eyebrow" style={{ marginBottom: 12 }}>
              <Sparkles size={14} /> Sàn giao dịch đồ cũ đa phương thức
            </span>
            <h1
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(38px, 5vw, 64px)',
                lineHeight: 1.05,
                letterSpacing: '-0.05em',
                margin: '12px 0 20px'
              }}
            >
              Món đồ hay,
              <br />
              <em style={{ color: 'var(--primary)', fontStyle: 'italic' }}>người thật & câu chuyện mới.</em>
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 16, lineHeight: 1.6, marginBottom: 28 }}>
              Nơi bạn có thể mua bán đồ vintage, đấu giá thời gian thực minh bạch, trao đổi đồ giao lưu hoặc trao tặng cho người cần — tất cả đều được bảo vệ bởi quỹ ký quỹ <strong>Mộc Escrow (VNPAY)</strong>.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/products" className="primary-button" style={{ padding: '12px 22px' }}>
                Khám phá sản phẩm <ArrowRight size={16} />
              </Link>
              <Link to="/auctions" className="outline-button" style={{ padding: '12px 22px' }}>
                <Gavel size={16} /> Xem sàn đấu giá
              </Link>
              <Link to="/products/create" className="secondary-button" style={{ padding: '12px 20px' }}>
                <Plus size={16} /> Đăng món đồ
              </Link>
            </div>
          </div>

          <div
            style={{
              background: '#27231f',
              color: '#fffaf5',
              padding: '30px 32px',
              borderRadius: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
              minWidth: 280,
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#d8a494', fontSize: 12, fontWeight: 700 }}>
                <ShieldCheck size={18} /> MỘC ESCROW PROMISE
              </div>
              <p style={{ fontSize: 12, color: '#b7b0a7', marginTop: 6, lineHeight: 1.5 }}>
                Tiền người mua được phong tỏa cho đến khi người mua kiểm tra hàng và xác nhận hài lòng.
              </p>
            </div>

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: '#fff' }}>+2.4k</strong>
                <small style={{ display: 'block', color: '#888', fontSize: 11 }}>Giao dịch an tâm</small>
              </div>
              <div>
                <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 26, color: '#d8a494' }}>99.2%</strong>
                <small style={{ display: 'block', color: '#888', fontSize: 11 }}>Đánh giá tích cực</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Horizontal */}
      <section style={{ maxWidth: 1240, margin: '40px auto 20px', padding: '0 24px' }}>
        <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 10 }}>
          {mockCategories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.slug}`}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 99,
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 500,
                color: 'var(--foreground)',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s'
              }}
            >
              {c.name}
            </Link>
          ))}
        </div>
      </section>

      <main>
        {/* Hot Real-time Auctions */}
        <section style={{ marginBottom: 60 }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                <Gavel size={14} /> Thời gian thực · Minh bạch
              </span>
              <h2>Phiên Đấu Giá Nổi Bật</h2>
            </div>
            <Link to="/auctions" className="danger-link" style={{ color: 'var(--primary)' }}>
              Xem tất cả ({auctionProducts.length}) →
            </Link>
          </div>

          <div className="auction-grid">
            {auctionProducts.map((p) => (
              <AuctionCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Mua bán cố định */}
        <section style={{ marginBottom: 60 }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow">Mới lên kệ</span>
              <h2>Sản Phẩm Đã Kiểm Định</h2>
            </div>
            <Link to="/products" className="danger-link" style={{ color: 'var(--primary)' }}>
              Xem tất cả →
            </Link>
          </div>

          <div className="product-grid">
            {saleProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* Trao đổi & Cho tặng (Barter & Pass Domain) */}
        <section style={{ background: '#fdf9f4', padding: '36px 30px', borderRadius: 12, border: '1px solid #ebdcd0' }}>
          <div className="section-heading">
            <div>
              <span className="eyebrow" style={{ color: '#356b41' }}>
                <Gift size={14} /> Tinh thần sẻ chia & Giao lưu
              </span>
              <h2>Góc Trao Đổi & Cho Tặng Miễn Phí</h2>
            </div>
            <Link to="/pass" className="danger-link" style={{ color: '#356b41' }}>
              Khám phá góc Pass →
            </Link>
          </div>

          <div className="product-grid">
            {passProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>
    </MainLayout>
  )
}
