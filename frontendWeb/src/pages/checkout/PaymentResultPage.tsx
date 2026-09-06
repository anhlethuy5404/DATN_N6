import React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Check, ShieldCheck, ArrowRight, ShoppingBag } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'

export const PaymentResultPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const orderCode = searchParams.get('orderCode') || 'MOC-2048'

  return (
    <MainLayout>
      <main style={{ maxWidth: 620, textAlign: 'center', padding: '60px 20px' }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#e4efe6',
            color: '#356b41',
            display: 'grid',
            placeItems: 'center',
            margin: '0 auto 20px'
          }}
        >
          <Check size={40} />
        </div>

        <span className="eyebrow" style={{ justifyContent: 'center' }}>
          <ShieldCheck size={16} /> VNPAY Ký Quỹ Thành Công
        </span>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 34, margin: '10px 0 14px' }}>
          Đơn Hàng #{orderCode} Đã Được Tạo!
        </h1>

        <p style={{ color: 'var(--muted-foreground)', fontSize: 14, lineHeight: 1.6, marginBottom: 28 }}>
          Khoản tiền thanh toán của bạn đã được chuyển vào quỹ ký quỹ <strong>Mộc Escrow</strong>. Người bán đã nhận được thông báo chuẩn bị và giao hàng cho bạn.
        </p>

        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 8,
            padding: 20,
            textAlign: 'left',
            marginBottom: 28,
            fontSize: 13
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Mã đơn hàng:</span>
            <b>#{orderCode}</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Phương thức thanh toán:</span>
            <b>VNPAY QR Ký quỹ</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span>Trạng thái bảo vệ:</span>
            <b style={{ color: '#356b41' }}>ESCROW_HOLDING (Đang bảo lưu an toàn)</b>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Thời hạn đồng kiểm:</span>
            <b>48 giờ kể từ khi nhận hàng</b>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <Link to={`/orders/${orderCode}`} className="primary-button" style={{ padding: '12px 24px' }}>
            <ShoppingBag size={16} /> Theo dõi đơn hàng & Mã QR
          </Link>
          <Link to="/" className="outline-button" style={{ padding: '12px 20px' }}>
            Về trang chủ
          </Link>
        </div>
      </main>
    </MainLayout>
  )
}
