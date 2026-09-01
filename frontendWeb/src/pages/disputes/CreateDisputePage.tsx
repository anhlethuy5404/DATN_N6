import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertTriangle, Upload, Check } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockOrders } from '../../mock/mockData'

export const CreateDisputePage: React.FC = () => {
  const navigate = useNavigate()
  const [orderCode, setOrderCode] = useState('MOC-1874')
  const [reason, setReason] = useState('Sản phẩm không đúng mô tả')
  const [description, setDescription] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      navigate('/disputes')
    }, 1200)
  }

  return (
    <MainLayout>
      <main style={{ maxWidth: 740 }}>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/disputes">Khiếu nại</Link>
          <span>/</span>
          <strong>Mở khiếu nại mới</strong>
        </div>

        <div className="form-card" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 32 }}>
          <span className="eyebrow" style={{ color: 'var(--danger)' }}>
            <AlertTriangle size={14} /> Bảo vệ giao dịch Mộc Escrow
          </span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, margin: '8px 0 16px' }}>
            Yêu Cầu Mở Khiếu Nại Tranh Chấp
          </h1>
          <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 24 }}>
            Khi bạn mở khiếu nại, tiền của đơn hàng sẽ lập tức bị đóng băng trong quỹ ký quỹ cho đến khi Moderator phán quyết.
          </p>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Chọn đơn hàng cần khiếu nại
              <select value={orderCode} onChange={(e) => setOrderCode(e.target.value)}>
                {mockOrders.map((o) => (
                  <option key={o.id} value={o.orderCode}>
                    #{o.orderCode} - {o.productTitle}
                  </option>
                ))}
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Lý do khiếu nại
              <select value={reason} onChange={(e) => setReason(e.target.value)}>
                <option value="Sản phẩm không đúng mô tả">Sản phẩm không đúng mô tả / có hư hỏng ẩn</option>
                <option value="Không nhận được hàng">Không nhận được hàng từ bên vận chuyển</option>
                <option value="Hàng giả hàng nhái">Nghi vấn hàng giả, nhái thương hiệu</option>
                <option value="Thiếu phụ kiện">Thiếu phụ kiện quan trọng đi kèm</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Mô tả cụ thể vấn đề
              <textarea
                rows={5}
                placeholder="Mô tả sự việc, tình trạng thực tế khi mở kiện hàng..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Bằng chứng ảnh hoặc video mở hộp (Domain 8 Dispute Evidence)
              <div
                style={{
                  border: '2px dashed var(--border)',
                  borderRadius: 6,
                  padding: 24,
                  textAlign: 'center',
                  background: 'var(--muted)',
                  cursor: 'pointer',
                  color: 'var(--muted-foreground)'
                }}
              >
                <Upload size={28} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
                <span>Bấm để chọn tệp hình ảnh / video mở kiện hàng</span>
              </div>
            </label>

            {submitted && (
              <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} /> Khiếu nại đã được gửi! Đang bảo lưu số tiền và chuyển tiếp...
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 12 }}>
              <Link to="/disputes" className="secondary-button">
                Hủy bỏ
              </Link>
              <button type="submit" className="primary-button" style={{ background: 'var(--danger)' }}>
                Gửi yêu cầu hòa giải
              </button>
            </div>
          </form>
        </div>
      </main>
    </MainLayout>
  )
}
