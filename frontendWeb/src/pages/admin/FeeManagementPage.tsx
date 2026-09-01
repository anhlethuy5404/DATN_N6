import React, { useState } from 'react'
import { SlidersHorizontal, Check } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'

export const FeeManagementPage: React.FC = () => {
  const [platformFee, setPlatformFee] = useState('1.5')
  const [auctionFee, setAuctionFee] = useState('2.0')
  const [withdrawFee, setWithdrawFee] = useState('0')
  const [minEscrowAmount, setMinEscrowAmount] = useState('50.000')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout title="Cấu Hình Phí Nền Tảng & Hạn Mức Ký Quỹ">
      <div style={{ maxWidth: 680 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 20 }}>
          Thiết lập mức tỷ lệ phần trăm hoa hồng và phí duy trì quỹ bảo hiểm người mua Mộc Escrow.
        </p>

        <div className="form-card">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Phí dịch vụ ký quỹ người mua (Escrow Fee %)
              <input
                type="text"
                value={platformFee}
                onChange={(e) => setPlatformFee(e.target.value)}
                required
              />
              <small style={{ color: 'var(--muted-foreground)' }}>Hiện tại đang áp dụng 1.5% cho mỗi đơn hàng hoàn tất</small>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Phí thành công phiên đấu giá (Auction Success Fee %)
              <input
                type="text"
                value={auctionFee}
                onChange={(e) => setAuctionFee(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Phí rút tiền về ngân hàng (₫)
              <input
                type="text"
                value={withdrawFee}
                onChange={(e) => setWithdrawFee(e.target.value)}
                required
              />
              <small style={{ color: 'var(--muted-foreground)' }}>Đặt 0 ₫ để khuyến khích dòng tiền lưu thông</small>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Hạn mức giao dịch tối thiểu qua Escrow (₫)
              <input
                type="text"
                value={minEscrowAmount}
                onChange={(e) => setMinEscrowAmount(e.target.value)}
                required
              />
            </label>

            {saved && (
              <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} /> Đã cập nhật biểu phí sàn thành công!
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="submit" className="primary-button">
                Lưu cấu hình biểu phí
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
