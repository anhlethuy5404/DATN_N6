import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownLeft, ArrowUpRight, ArrowLeft } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockWalletTransactions, formatVND } from '../../mock/mockData'

export const TransactionHistoryPage: React.FC = () => {
  return (
    <UserLayout title="Toàn Bộ Lịch Sử Giao Dịch Ví">
      <div style={{ marginBottom: 16 }}>
        <Link to="/wallet" className="danger-link" style={{ color: 'var(--primary)', marginBottom: 12 }}>
          <ArrowLeft size={15} /> Quay lại trang Ví
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
                  {tx.createdAt} {tx.vnpayTranNo && `· VNPAY Ref: ${tx.vnpayTranNo}`}
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
    </UserLayout>
  )
}
