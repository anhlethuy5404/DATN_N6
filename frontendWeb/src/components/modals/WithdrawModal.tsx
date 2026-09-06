import React, { useState } from 'react'
import { X, Check } from 'lucide-react'

interface WithdrawModalProps {
  close: () => void
  currentBalance: number
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ close, currentBalance }) => {
  const [bank, setBank] = useState('Vietcombank - 0123 456 789')
  const [amount, setAmount] = useState('5.000.000')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-backdrop">
      <div className="image-modal">
        <button className="modal-close" onClick={close}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: 54,
                height: 54,
                borderRadius: '50%',
                background: '#e4efe6',
                color: '#397147',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Check size={30} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24 }}>
              Yêu cầu rút tiền đã được tạo!
            </h2>
            <p style={{ color: 'var(--muted-foreground)', margin: '8px 0 20px', fontSize: 13 }}>
              Hệ thống sẽ chuyển số tiền <strong>{amount} ₫</strong> vào tài khoản {bank} trong vòng 24 giờ làm việc.
            </p>
            <button className="primary-button full-button" onClick={close}>
              Đóng cửa sổ
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-card" style={{ border: 0, padding: 0 }}>
            <span className="eyebrow">Ví Mộc Escrow · Số dư khả dụng: {currentBalance.toLocaleString('vi-VN')} ₫</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '8px 0 16px' }}>
              Rút tiền về tài khoản ngân hàng
            </h2>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 14 }}>
              Chọn tài khoản nhận tiền
              <select value={bank} onChange={(e) => setBank(e.target.value)}>
                <option value="Vietcombank - 0123 456 789">Vietcombank · 0123 456 789 (Lê Minh Anh)</option>
                <option value="Techcombank - 9876 543 210">Techcombank · 9876 543 210 (Lê Minh Anh)</option>
                <option value="MBBank - 1900 888 666">MBBank · 1900 888 666 (Lê Minh Anh)</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 14 }}>
              Số tiền muốn rút (₫)
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </label>

            <div style={{ background: 'var(--muted)', padding: 14, borderRadius: 6, fontSize: 12, marginBottom: 18 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span>Phí rút tiền sàn:</span>
                <b>Miễn phí (0 ₫)</b>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Thực nhận về tài khoản:</span>
                <strong style={{ color: 'var(--primary)' }}>{amount} ₫</strong>
              </div>
            </div>

            <button type="submit" className="primary-button full-button">
              Xác nhận rút tiền
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
