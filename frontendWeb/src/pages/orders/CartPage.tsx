import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { formatVND } from '../../mock/mockData'

export const CartPage: React.FC = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([
    {
      id: 'c1',
      productId: '1',
      title: 'Máy ảnh Fujifilm X-T30 II kèm kit 18-55mm F2.8-4',
      price: 15500000,
      shipping: 35000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85',
      seller: 'Minh Studio'
    },
    {
      id: 'c2',
      productId: '2',
      title: 'Ghế lounge da bò nâu vintage phong cách Bắc Âu',
      price: 3200000,
      shipping: 80000,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=900&q=85',
      seller: 'Nhà của Mây'
    }
  ])

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0)
  const shipping = items.reduce((acc, i) => acc + i.shipping, 0)
  const escrowFee = 0 // Miễn phí ký quỹ trong giai đoạn khuyến mãi
  const total = subtotal + shipping + escrowFee

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <strong>Giỏ hàng của bạn</strong>
        </div>

        <div className="section-heading">
          <div>
            <span className="eyebrow">
              <ShieldCheck size={14} /> Mộc Escrow Cart
            </span>
            <h2>Giỏ Hàng Mua Sắm</h2>
          </div>
          <span className="section-count">{items.length} món đồ</span>
        </div>

        {items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', border: '1px dashed var(--border)', borderRadius: 8 }}>
            <ShoppingBag size={48} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '0 0 8px' }}>
              Giỏ hàng của bạn đang trống
            </h3>
            <p style={{ color: 'var(--muted-foreground)', marginBottom: 20 }}>
              Hãy khám phá các món đồ thú vị trên sàn Mộc và thêm vào giỏ.
            </p>
            <Link to="/products" className="primary-button">
              Khám phá sản phẩm ngay
            </Link>
          </div>
        ) : (
          <div className="transaction-layout">
            <div>
              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-item-info">
                    <h3>{item.title}</h3>
                    <p>Người bán: {item.seller}</p>
                    <strong>{formatVND(item.price)}</strong>
                    <div className="quantity">
                      <button
                        onClick={() =>
                          setItems((prev) =>
                            prev.map((x) =>
                              x.id === item.id ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x
                            )
                          )
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          setItems((prev) =>
                            prev.map((x) =>
                              x.id === item.id ? { ...x, quantity: x.quantity + 1 } : x
                            )
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div>
                    <button
                      className="secondary-button"
                      style={{ padding: 8, color: 'var(--danger)' }}
                      onClick={() => setItems((prev) => prev.filter((x) => x.id !== item.id))}
                      aria-label="Xóa"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="summary-card">
              <h2>Tóm tắt đơn hàng</h2>
              <div>
                <span>Tiền hàng:</span>
                <b>{formatVND(subtotal)}</b>
              </div>
              <div>
                <span>Phí vận chuyển dự tính:</span>
                <b>{formatVND(shipping)}</b>
              </div>
              <div>
                <span>Phí ký quỹ Escrow:</span>
                <b style={{ color: '#356b41' }}>Miễn phí (0 ₫)</b>
              </div>

              <div className="summary-total">
                <span>Tổng cộng:</span>
                <strong>{formatVND(total)}</strong>
              </div>

              <button
                className="primary-button full-button"
                style={{ marginTop: 20, padding: '14px', fontSize: 15 }}
                onClick={() => navigate('/checkout')}
              >
                Tiến hành đặt cọc Escrow <ArrowRight size={16} />
              </button>

              <div style={{ marginTop: 14, display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--muted-foreground)' }}>
                <ShieldCheck size={14} color="var(--primary)" />
                Bảo vệ hoàn tiền 100% nếu hàng không đúng mô tả
              </div>
            </aside>
          </div>
        )}
      </main>
    </MainLayout>
  )
}
