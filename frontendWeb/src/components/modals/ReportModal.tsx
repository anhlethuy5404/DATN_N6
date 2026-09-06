import React, { useState } from 'react'
import { X, AlertTriangle, Check } from 'lucide-react'

interface ReportModalProps {
  close: () => void
  productTitle?: string
}

export const ReportModal: React.FC<ReportModalProps> = ({ close, productTitle = 'Sản phẩm' }) => {
  const [sent, setSent] = useState(false)
  const [reason, setReason] = useState('Lừa đảo')
  const [desc, setDesc] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="modal-backdrop">
      <div className="image-modal">
        <button className="modal-close" onClick={close}>
          <X size={20} />
        </button>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <Check size={36} color="#356b41" style={{ margin: '0 auto 12px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22 }}>Đã gửi báo cáo vi phạm</h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: '8px 0 18px' }}>
              Ban kiểm duyệt Mộc sẽ xem xét sản phẩm này trong vòng 12 giờ. Cảm ơn bạn đã giữ sàn giao dịch an toàn!
            </p>
            <button className="primary-button full-button" onClick={close}>
              Đóng
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-card" style={{ border: 0, padding: 0 }}>
            <span className="eyebrow" style={{ color: 'var(--danger)' }}>
              <AlertTriangle size={14} /> Báo cáo nội dung vi phạm
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '8px 0 14px' }}>
              Báo cáo vi phạm
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 16 }}>
              Báo cáo cho: <strong>{productTitle}</strong>
            </p>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 14 }}>
              Lý do vi phạm
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="Lừa đảo">Nghi vấn lừa đảo / giả mạo giao dịch</option>
                <option value="Hàng giả">Hàng giả, hàng nhái thương hiệu</option>
                <option value="Sản phẩm cấm">Sản phẩm cấm kinh doanh</option>
                <option value="Sai thông tin">Thông tin mô tả sai lệch, ảnh lấy trên mạng</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 16 }}>
              Mô tả chi tiết vi phạm
              <textarea
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Vui lòng cung cấp thêm chi tiết để kiểm duyệt viên xác minh..."
                required
              />
            </label>

            <button type="submit" className="primary-button full-button" style={{ background: 'var(--danger)' }}>
              Gửi báo cáo cho Moderator
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
