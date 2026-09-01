import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ShieldCheck,
  Check,
  QrCode,
  MessageCircle,
  AlertTriangle,
  MapPin,
  Truck
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockOrders, formatVND } from '../../mock/mockData'

export const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const order = mockOrders.find((o) => o.id === id || o.orderCode === id) || mockOrders[0]
  const [isCompleted, setIsCompleted] = useState(order.status === 'COMPLETED')

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/orders">Đơn hàng</Link>
          <span>/</span>
          <strong>#{order.orderCode}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <span className="eyebrow">
              <ShieldCheck size={14} /> Mộc Escrow Protection
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, margin: '6px 0 4px' }}>
              Đơn Hàng #{order.orderCode}
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
              Ngày tạo: {order.createdAt} · Người bán: <strong>{order.sellerName}</strong>
            </p>
          </div>

          <span className={`status ${isCompleted ? 'status-COMPLETED' : 'status-SHIPPING'}`} style={{ fontSize: 13, padding: '6px 14px' }}>
            {isCompleted ? 'Đã hoàn tất & Giải ngân' : 'Đang giao hàng (Tiền trong Escrow)'}
          </span>
        </div>

        {/* Escrow banner */}
        <div
          style={{
            background: isCompleted ? '#eef7f0' : '#fdf9f2',
            border: `1px solid ${isCompleted ? '#b9dcb8' : '#ebdccb'}`,
            borderRadius: 8,
            padding: 18,
            display: 'flex',
            alignItems: 'center',
            gap: 14,
            marginBottom: 28
          }}
        >
          <ShieldCheck size={28} color={isCompleted ? '#356b41' : '#a86f2d'} />
          <div>
            <b style={{ color: isCompleted ? '#2e6939' : '#8a591e' }}>
              {isCompleted
                ? 'Đơn hàng đã hoàn tất thành công!'
                : 'Khoản tiền của bạn đang được Mộc Escrow giữ an toàn'}
            </b>
            <p style={{ margin: '2px 0 0', fontSize: 12, color: 'var(--muted-foreground)' }}>
              {isCompleted
                ? 'Tiền đã được giải ngân vào ví người bán sau khi bạn xác nhận hài lòng.'
                : 'Chỉ khi bạn nhận được sản phẩm đúng như mô tả và bấm "Xác nhận đã nhận hàng", tiền mới được chuyển cho người bán.'}
            </p>
          </div>
        </div>

        <div className="transaction-layout">
          <div>
            {/* Timeline */}
            <div className="transaction-card" style={{ marginBottom: 20 }}>
              <h2>Tiến trình giao dịch Escrow</h2>
              <div className="order-timeline">
                {[
                  { name: '1. Đặt hàng', time: '06/09 10:20', done: true },
                  { name: '2. Ký quỹ VNPAY', time: '06/09 10:24', done: true },
                  { name: '3. Đang giao hàng', time: '06/09 14:00', done: true },
                  { name: '4. Kiểm tra hàng', time: isCompleted ? '07/09' : 'Chờ nhận', done: isCompleted },
                  { name: '5. Giải ngân', time: isCompleted ? 'Hoàn tất' : 'Chờ duyệt', done: isCompleted }
                ].map((step, idx) => (
                  <div key={step.name} className={step.done ? 'done' : ''}>
                    <span>{step.done ? <Check size={14} /> : idx + 1}</span>
                    <b>{step.name}</b>
                    <small>{step.time}</small>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Card inside order */}
            <div className="transaction-card" style={{ marginBottom: 20 }}>
              <h2>Sản phẩm trong đơn hàng</h2>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <img
                  src={order.productImage}
                  alt={order.productTitle}
                  style={{ width: 84, height: 84, objectFit: 'cover', borderRadius: 6 }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 15, margin: '0 0 6px' }}>{order.productTitle}</h3>
                  <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
                    Mã vận đơn bưu điện: <strong>{order.shippingCode || 'VNPOST927361'}</strong>
                  </p>
                  <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 16, marginTop: 4 }}>
                    {formatVND(order.amount)}
                  </div>
                </div>
              </div>
            </div>

            {/* QR Verification Code (Domain 6 Fulfillment) */}
            <div className="transaction-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <QrCode size={22} color="var(--primary)" />
                <h2>Mã QR Định Danh Giao Nhận (Domain 6)</h2>
              </div>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
                Khi gặp mặt trực tiếp hoặc nhận bưu tá, người giao có thể quét mã QR này để xác thực người nhận chính chủ.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 20, background: 'var(--muted)', padding: 18, borderRadius: 8, marginTop: 12 }}>
                <div
                  style={{
                    width: 90,
                    height: 90,
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    display: 'grid',
                    placeItems: 'center'
                  }}
                >
                  <QrCode size={64} color="#292724" />
                </div>
                <div>
                  <b style={{ display: 'block', fontSize: 14 }}>{order.qrVerificationCode || 'MOC-QR-2048-VERIFIED'}</b>
                  <small style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>
                    Mã bảo mật định danh một lần cho đơn hàng #{order.orderCode}
                  </small>
                </div>
              </div>
            </div>
          </div>

          {/* Right Actions Column */}
          <aside className="summary-card">
            <h2>Hành động đơn hàng</h2>

            <div>
              <span>Tiền hàng:</span>
              <b>{formatVND(order.amount)}</b>
            </div>
            <div>
              <span>Phí vận chuyển:</span>
              <b>{formatVND(order.shippingFee)}</b>
            </div>
            <div className="summary-total">
              <span>Tổng thanh toán:</span>
              <strong>{formatVND(order.totalAmount)}</strong>
            </div>

            <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {!isCompleted && (
                <button
                  className="primary-button full-button"
                  style={{ padding: 14, fontSize: 14 }}
                  onClick={() => setIsCompleted(true)}
                >
                  <Check size={16} /> Xác nhận đã nhận hàng (Giải ngân)
                </button>
              )}

              <Link
                to="/messages"
                className="outline-button full-button"
                style={{ justifyContent: 'center' }}
              >
                <MessageCircle size={16} /> Nhắn tin cho người bán
              </Link>

              <Link
                to={`/disputes/new?orderCode=${order.orderCode}`}
                className="danger-link"
                style={{ justifyContent: 'center', marginTop: 8 }}
              >
                <AlertTriangle size={15} /> Mở khiếu nại / Tranh chấp Escrow
              </Link>
            </div>

            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--muted-foreground)' }}>
              <b>Địa chỉ giao nhận:</b>
              <p style={{ margin: '4px 0 0', color: 'var(--foreground)' }}>
                {order.shippingAddress}
              </p>
            </div>
          </aside>
        </div>
      </main>
    </MainLayout>
  )
}
