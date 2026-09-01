import React, { useState } from 'react'
import { X, Gavel, ShieldCheck, Check } from 'lucide-react'

interface ProxyModalProps {
  close: () => void
  productTitle: string
  currentPrice: number
}

export const ProxyModal: React.FC<ProxyModalProps> = ({ close, productTitle, currentPrice }) => {
  const [maxBid, setMaxBid] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (Number(maxBid.replace(/\D/g, '')) > currentPrice) {
      setConfirmed(true)
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="image-modal">
        <button className="modal-close" onClick={close} aria-label="Đóng">
          <X size={20} />
        </button>

        {confirmed ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: '#e4efe6',
                color: '#397147',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Check size={28} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24 }}>
              Đã thiết lập ủy quyền thành công!
            </h2>
            <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 20px', fontSize: 13 }}>
              Hệ thống sẽ tự động đặt bước giá thấp nhất cho đến mức trần{' '}
              <strong>{Number(maxBid.replace(/\D/g, '')).toLocaleString('vi-VN')} ₫</strong>.
            </p>
            <button className="primary-button full-button" onClick={close}>
              Đã hiểu
            </button>
          </div>
        ) : (
          <>
            <span className="eyebrow">
              <Gavel size={15} /> Proxy Bidding · Ủy quyền đấu giá
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '10px 0 6px' }}>
              Đặt giá tự động
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 18 }}>
              Áp dụng cho: <strong>{productTitle}</strong>. Nhập mức giá tối đa bạn sẵn sàng chi trả.
            </p>

            <form onSubmit={handleSubmit}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginBottom: 14 }}>
                Mức giá trần tối đa (₫)
                <input
                  type="text"
                  placeholder="Ví dụ: 3.500.000"
                  value={maxBid}
                  onChange={(e) => setMaxBid(e.target.value)}
                  style={{
                    border: '1px solid var(--border)',
                    padding: 12,
                    borderRadius: 6,
                    fontSize: 14,
                    background: 'var(--card)'
                  }}
                  required
                />
              </label>

              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'flex-start',
                  background: 'var(--muted)',
                  padding: 12,
                  borderRadius: 6,
                  fontSize: 12,
                  color: 'var(--muted-foreground)',
                  marginBottom: 18
                }}
              >
                <ShieldCheck size={20} color="var(--primary)" style={{ flexShrink: 0 }} />
                <span>
                  Hệ thống chỉ tăng giá khi có người khác trả cao hơn bạn, và luôn sử dụng bước giá tối thiểu để bảo vệ túi tiền của bạn.
                </span>
              </div>

              <button type="submit" className="primary-button full-button">
                Xác nhận đặt giá tự động
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
