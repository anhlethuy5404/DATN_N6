import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  CircleDollarSign,
  History
} from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockWallet, mockWalletTransactions, formatVND } from '../../mock/mockData'
import { WithdrawModal } from '../../components/modals/WithdrawModal'

export const WalletPage: React.FC = () => {
  const [showWithdraw, setShowWithdraw] = useState(false)

  return (
    <UserLayout title="Ví Điện Tử & Ký Quỹ Mộc (Domain 7)">
      {/* Wallet Balance Hero */}
      <div className="wallet-balance">
        <div>
          <span>Số dư khả dụng để giao dịch:</span>
          <strong>{formatVND(mockWallet.balance)}</strong>
          <small>Cập nhật lần cuối: {mockWallet.updatedAt}</small>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            className="primary-button"
            style={{ padding: '12px 20px', background: '#d8a494', color: '#27231f', fontWeight: 700 }}
            onClick={() => setShowWithdraw(true)}
          >
            <ArrowUpRight size={16} /> Rút tiền về ngân hàng
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="stats-grid">
        <div className="stat-card">
          <span>Số dư đang ký quỹ (Escrow Frozen):</span>
          <strong style={{ color: '#d8a494' }}>{formatVND(mockWallet.frozenBalance)}</strong>
          <small>Đang bảo lưu an toàn trong các đơn hàng</small>
        </div>
        <div className="stat-card">
          <span>Tổng tiền đã bán:</span>
          <strong>245.600.000 ₫</strong>
          <small>Từ 126 đơn hàng thành công</small>
        </div>
        <div className="stat-card">
          <span>Tổng tiền đã rút:</span>
          <strong>86.200.000 ₫</strong>
          <small>Về Vietcombank</small>
        </div>
      </div>

      {/* Transaction History Section */}
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, marginTop: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <div>
            <span className="eyebrow">Biến động số dư gần đây</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '4px 0 0' }}>
              Lịch Sử Giao Dịch Ví
            </h2>
          </div>
          <Link to="/wallet/history" className="danger-link" style={{ color: 'var(--primary)' }}>
            <History size={15} /> Xem toàn bộ lịch sử →
          </Link>
        </div>

        <div className="transaction-table">
          {mockWalletTransactions.map((tx) => (
            <div key={tx.id} className="transaction-line">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {tx.positive ? (
                  <ArrowDownLeft size={18} color="#356b41" />
                ) : (
                  <ArrowUpRight size={18} color="#a93c2c" />
                )}
                <div>
                  <b>{tx.description}</b>
                  <small style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: 11 }}>
                    {tx.createdAt} {tx.vnpayTranNo && `· VNPAY: ${tx.vnpayTranNo}`}
                  </small>
                </div>
              </div>

              <span>{tx.type}</span>
              <span className="status" style={{ background: '#e4efe6', color: '#2e6939', justifySelf: 'start' }}>
                Thành công
              </span>
              <strong className={tx.positive ? 'positive' : 'negative'} style={{ textAlign: 'right' }}>
                {tx.positive ? `+${formatVND(tx.amount)}` : `-${formatVND(tx.amount)}`}
              </strong>
            </div>
          ))}
        </div>
      </div>

      {showWithdraw && (
        <WithdrawModal
          close={() => setShowWithdraw(false)}
          currentBalance={mockWallet.balance}
        />
      )}
    </UserLayout>
  )
}
