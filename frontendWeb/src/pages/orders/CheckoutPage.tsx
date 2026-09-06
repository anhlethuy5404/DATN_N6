import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ShieldCheck,
  CreditCard,
  Wallet,
  MapPin,
  Truck,
  Check,
  ChevronRight
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { formatVND, mockSafeSpots } from '../../mock/mockData'

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const [deliveryType, setDeliveryType] = useState<'SHIPPING' | 'MEETUP'>('SHIPPING')
  const [paymentMethod, setPaymentMethod] = useState<'VNPAY' | 'WALLET'>('VNPAY')
  const [selectedSpot, setSelectedSpot] = useState(mockSafeSpots[0].id)
  const [processing, setProcessing] = useState(false)

  const productPrice = 15500000
  const shippingFee = deliveryType === 'SHIPPING' ? 35000 : 0
  const total = productPrice + shippingFee

  const handleConfirmEscrow = () => {
    setProcessing(true)
    setTimeout(() => {
      navigate('/checkout/payment-result?orderCode=MOC-2048&status=SUCCESS')
    }, 1000)
  }

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/cart">Giỏ hàng</Link>
          <span>/</span>
          <strong>Ký quỹ thanh toán đơn hàng</strong>
        </div>

        <div className="checkout-layout">
          <div>
            {/* Step 1: Address */}
            <div className="form-card" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Bước 1</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: '6px 0 14px' }}>
                Địa chỉ nhận hàng & Thông tin liên hệ
              </h2>

              <div style={{ background: 'var(--muted)', padding: 16, borderRadius: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <b>Minh Anh (Người mua)</b>
                  <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Thay đổi</span>
                </div>
                <p style={{ margin: '4px 0', color: 'var(--muted-foreground)' }}>
                  Số điện thoại: 0912 345 678
                </p>
                <p style={{ margin: 0, color: 'var(--foreground)' }}>
                  Địa chỉ: 12 Trần Thái Tông, Dịch Vọng Hậu, Cầu Giấy, Hà Nội
                </p>
              </div>
            </div>

            {/* Step 2: Delivery & Safe Meetup */}
            <div className="form-card" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Bước 2</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: '6px 0 14px' }}>
                Phương thức giao nhận
              </h2>

              <div
                className={`radio-card ${deliveryType === 'SHIPPING' ? 'selected' : ''}`}
                onClick={() => setDeliveryType('SHIPPING')}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === 'SHIPPING'}
                  onChange={() => setDeliveryType('SHIPPING')}
                />
                <Truck size={20} color="var(--primary)" />
                <span>
                  <b>Giao hàng tiêu chuẩn qua bưu điện (VNPost)</b>
                  <small>Đồng kiểm khi nhận hàng. Dự kiến 1-2 ngày làm việc.</small>
                </span>
                <strong>35.000 ₫</strong>
              </div>

              <div
                className={`radio-card ${deliveryType === 'MEETUP' ? 'selected' : ''}`}
                onClick={() => setDeliveryType('MEETUP')}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryType === 'MEETUP'}
                  onChange={() => setDeliveryType('MEETUP')}
                />
                <MapPin size={20} color="#356b41" />
                <span>
                  <b>Gặp mặt trực tiếp tại Điểm hẹn an toàn (Safe Meetup Spot)</b>
                  <small>Địa điểm công cộng có camera an ninh và nhân viên bảo vệ.</small>
                </span>
                <strong style={{ color: '#356b41' }}>Miễn phí</strong>
              </div>

              {deliveryType === 'MEETUP' && (
                <div style={{ marginTop: 14, padding: 14, background: '#fdf9f4', border: '1px solid #ecdcd0', borderRadius: 6 }}>
                  <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                    <b>Chọn điểm hẹn giao dịch an toàn (Domain 6):</b>
                    <select
                      value={selectedSpot}
                      onChange={(e) => setSelectedSpot(e.target.value)}
                      style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: 10, borderRadius: 6 }}
                    >
                      {mockSafeSpots.map((spot) => (
                        <option key={spot.id} value={spot.id}>
                          {spot.name} - {spot.address}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
              )}
            </div>

            {/* Step 3: Payment & Escrow Protection */}
            <div className="form-card" style={{ marginBottom: 20 }}>
              <span className="eyebrow">Bước 3</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: '6px 0 14px' }}>
                Thanh toán ký quỹ (Mộc Escrow)
              </h2>

              <div
                className={`radio-card ${paymentMethod === 'VNPAY' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('VNPAY')}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'VNPAY'}
                  onChange={() => setPaymentMethod('VNPAY')}
                />
                <CreditCard size={20} color="var(--primary)" />
                <span>
                  <b>Cổng thanh toán VNPAY QR Sandbox</b>
                  <small>Quét mã QR từ mọi ứng dụng ngân hàng và ví điện tử Việt Nam.</small>
                </span>
              </div>

              <div
                className={`radio-card ${paymentMethod === 'WALLET' ? 'selected' : ''}`}
                onClick={() => setPaymentMethod('WALLET')}
              >
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'WALLET'}
                  onChange={() => setPaymentMethod('WALLET')}
                />
                <Wallet size={20} color="#356b41" />
                <span>
                  <b>Số dư Ví điện tử Mộc (Khả dụng: 8.450.000 ₫)</b>
                  <small>Khấu trừ trực tiếp và chuyển vào trạng thái phong tỏa ký quỹ.</small>
                </span>
              </div>
            </div>

            {/* Escrow Mechanism Explanation */}
            <div className="escrow-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <ShieldCheck size={22} color="#d8a494" />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, margin: 0 }}>
                  Quy trình ký quỹ Escrow 5 bước bảo vệ bạn
                </h3>
              </div>
              <div className="escrow-flow">
                {[
                  '1. Bạn đặt cọc',
                  '2. Mộc giữ tiền',
                  '3. Người bán giao hàng',
                  '4. Bạn kiểm tra & quét QR',
                  '5. Giải ngân người bán'
                ].map((step, idx) => (
                  <div key={step} className="escrow-step">
                    <span>{idx + 1}</span>
                    <b>{step.slice(3)}</b>
                    {idx < 4 && <ChevronRight size={14} style={{ opacity: 0.6 }} />}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checkout Summary */}
          <aside className="summary-card">
            <h2>Đơn hàng thanh toán</h2>

            <div style={{ display: 'flex', gap: 12, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
              <img
                src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85"
                alt="Fujifilm"
                style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 600, margin: '0 0 4px' }}>
                  Máy ảnh Fujifilm X-T30 II
                </p>
                <small style={{ color: 'var(--muted-foreground)' }}>Số lượng: 1</small>
                <div style={{ color: 'var(--primary)', fontWeight: 700, fontSize: 14 }}>
                  {formatVND(productPrice)}
                </div>
              </div>
            </div>

            <div>
              <span>Tiền hàng:</span>
              <b>{formatVND(productPrice)}</b>
            </div>
            <div>
              <span>Phí vận chuyển:</span>
              <b>{formatVND(shippingFee)}</b>
            </div>
            <div>
              <span>Bảo vệ Mộc Escrow:</span>
              <b style={{ color: '#356b41' }}>Miễn phí</b>
            </div>

            <div className="summary-total">
              <span>Tổng thanh toán ký quỹ:</span>
              <strong>{formatVND(total)}</strong>
            </div>

            <button
              className="primary-button full-button"
              style={{ marginTop: 20, padding: '14px', fontSize: 15 }}
              onClick={handleConfirmEscrow}
              disabled={processing}
            >
              {processing ? (
                'Đang kết nối VNPAY...'
              ) : (
                <>
                  <ShieldCheck size={18} /> Xác nhận ký quỹ {formatVND(total)}
                </>
              )}
            </button>

            <small style={{ display: 'block', textAlign: 'center', marginTop: 12, color: 'var(--muted-foreground)', fontSize: 11 }}>
              Bằng việc xác nhận, bạn đồng ý với Điều khoản ký quỹ Escrow của Mộc.
            </small>
          </aside>
        </div>
      </main>
    </MainLayout>
  )
}
