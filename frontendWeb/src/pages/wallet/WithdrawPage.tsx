import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockWallet, formatVND } from '../../mock/mockData'

export const WithdrawPage: React.FC = () => {
  const navigate = useNavigate()
  const [bank, setBank] = useState('Vietcombank - 0123 456 789')
  const [amount, setAmount] = useState('5.000.000')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
  }

  return (
    <UserLayout title="Rút Tiền Về Tài Khoản Ngân Hàng">
      <div style={{ maxWidth: 640 }}>
        <Link to="/wallet" className="danger-link" style={{ color: 'var(--primary)', marginBottom: 16 }}>
          <ArrowLeft size={15} /> Quay lại trang Ví
        </Link>

        {done ? (
          <div className="form-card" style={{ textAlign: 'center', padding: '40px 20px' }}>
            <Check size={48} color="#356b41" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26 }}>
              Yêu cầu rút tiền thành công!
            </h2>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: '8px 0 24px' }}>
              Số tiền <strong>{amount} ₫</strong> đang được xử lý và chuyển vào {bank}.
            </p>
            <button className="primary-button" onClick={() => navigate('/wallet')}>
              Trở về ví điện tử
            </button>
          </div>
        ) : (
          <div className="form-card">
            <span className="eyebrow">
              <ShieldCheck size={14} /> Số dư khả dụng: {formatVND(mockWallet.balance)}
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '8px 0 20px' }}>
              Lập lệnh rút tiền
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                Chọn ngân hàng thụ hưởng
                <select value={bank} onChange={(e) => setBank(e.target.value)}>
                  <option value="Vietcombank - 0123 456 789">Vietcombank · STK: 0123 456 789 (Lê Minh Anh)</option>
                  <option value="Techcombank - 9876 543 210">Techcombank · STK: 9876 543 210 (Lê Minh Anh)</option>
                </select>
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                Số tiền muốn rút (₫)
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </label>

              <div style={{ background: 'var(--muted)', padding: 14, borderRadius: 6, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span>Phí rút tiền nền tảng:</span>
                  <b style={{ color: '#356b41' }}>Miễn phí (0 ₫)</b>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Thời gian nhận tiền:</span>
                  <b>Trong vòng 24h làm việc</b>
                </div>
              </div>

              <button type="submit" className="primary-button full-button" style={{ padding: 12 }}>
                Xác nhận rút tiền
              </button>
            </form>
          </div>
        )}
      </div>
    </UserLayout>
  )
}
