import React, { useState } from 'react'
import { X, Bell, Check } from 'lucide-react'

interface PriceAlertModalProps {
  close: () => void
  productTitle?: string
}

export const PriceAlertModal: React.FC<PriceAlertModalProps> = ({ close, productTitle = 'Sản phẩm đã chọn' }) => {
  const [saved, setSaved] = useState(false)
  const [targetPrice, setTargetPrice] = useState('3.000.000')

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
  }

  return (
    <div className="modal-backdrop">
      <div className="image-modal">
        <button className="modal-close" onClick={close}>
          <X size={20} />
        </button>

        {saved ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Check size={36} color="#356b41" style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>Đã bật cảnh báo giá!</h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: '8px 0 18px' }}>
              Khi giá món đồ giảm xuống mức <strong>{targetPrice} ₫</strong>, Mộc sẽ gửi thông báo đến bạn.
            </p>
            <button className="primary-button full-button" onClick={close}>
              Hoàn tất
            </button>
          </div>
        ) : (
          <form onSubmit={handleSave} className="form-card" style={{ border: 0, padding: 0 }}>
            <span className="eyebrow">
              <Bell size={14} /> Cảnh báo giá thông minh
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '8px 0 14px' }}>
              Nhận thông báo khi giá giảm
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 16 }}>
              {productTitle}
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 14 }}>
              Mức giá mong muốn (₫)
              <input
                type="text"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="primary-button full-button">
              Lưu cảnh báo giá
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
