import React from 'react'
import { BarChart3, ArrowDownLeft, ArrowUpRight } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { mockWalletTransactions, formatVND } from '../../mock/mockData'

export const TransactionManagementPage: React.FC = () => {
  return (
    <AdminLayout title="Quản Lý Dòng Tiền & Ký Quỹ Toàn Sàn (Domain 7)">
      <div className="admin-stat-grid">
        <div className="admin-stat accent">
          <small>Tổng tiền đang ký quỹ (Escrow)</small>
          <strong style={{ color: 'var(--primary)' }}>4.820.000.000 ₫</strong>
          <em>Bảo lưu trong 312 đơn hàng</em>
        </div>
        <div className="admin-stat">
          <small>Doanh thu phí sàn thu được</small>
          <strong>384.200.000 ₫</strong>
          <em>Phí thành công 1% - 3%</em>
        </div>
        <div className="admin-stat">
          <small>Số lệnh rút tiền đang chờ duyệt</small>
          <strong>14 lệnh</strong>
          <em>Tổng trị giá 68.500.000 ₫</em>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 14 }}>
          Nhật Ký Dòng Tiền VNPAY & Escrow Hệ Thống
        </h3>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Mã giao dịch</th>
                <th>Loại biến động</th>
                <th>Nội dung thanh toán</th>
                <th>Mã tham chiếu VNPAY</th>
                <th>Số tiền</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {mockWalletTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td>
                    <b>#{tx.id}</b>
                  </td>
                  <td>
                    <span className="status" style={{ fontSize: 11 }}>
                      {tx.type}
                    </span>
                  </td>
                  <td>{tx.description}</td>
                  <td style={{ fontFamily: 'monospace', fontSize: 12 }}>
                    {tx.vnpayTranNo || 'ESCROW-INTERNAL'}
                  </td>
                  <td style={{ fontWeight: 700, color: tx.positive ? '#356b41' : '#a93c2c' }}>
                    {tx.positive ? `+${formatVND(tx.amount)}` : `-${formatVND(tx.amount)}`}
                  </td>
                  <td style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                    {tx.createdAt}
                  </td>
                  <td>
                    <span className="admin-status good">Thành công</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
