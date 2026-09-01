import React, { useState } from 'react'
import { Check, X, ShieldAlert } from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'
import { mockDisputes, formatVND } from '../../mock/mockData'

export const DisputeManagementPage: React.FC = () => {
  const [disputes, setDisputes] = useState(mockDisputes)

  const handleResolve = (id: string, action: 'REFUND_BUYER' | 'RELEASE_SELLER') => {
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              status:
                action === 'REFUND_BUYER'
                  ? 'RESOLVED_REFUND_BUYER'
                  : 'RESOLVED_RELEASE_SELLER'
            }
          : d
      )
    )
  }

  return (
    <ModeratorLayout title="Quản Lý Tranh Chấp Ký Quỹ Escrow">
      <div style={{ marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
          Điều phối viên có thẩm quyền phán quyết hoàn tiền cho Người mua hoặc giải ngân cho Người bán dựa trên bằng chứng kiểm định.
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã khiếu nại</th>
              <th>Đơn hàng</th>
              <th>Người mua / Người bán</th>
              <th>Số tiền ký quỹ</th>
              <th>Lý do tranh chấp</th>
              <th>Trạng thái</th>
              <th>Phán quyết Escrow</th>
            </tr>
          </thead>
          <tbody>
            {disputes.map((d) => (
              <tr key={d.id}>
                <td>
                  <b>#{d.id}</b>
                  <small>{d.createdAt}</small>
                </td>
                <td>#{d.orderCode}</td>
                <td>
                  <b>{d.buyerName}</b> / {d.sellerName}
                </td>
                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {formatVND(d.amount)}
                </td>
                <td>{d.reason}</td>
                <td>
                  <span
                    className={`admin-status ${
                      d.status.includes('RESOLVED') ? 'good' : 'wait'
                    }`}
                  >
                    {d.status === 'UNDER_REVIEW'
                      ? 'Đang xem xét'
                      : d.status === 'RESOLVED_REFUND_BUYER'
                      ? 'Hoàn tiền người mua'
                      : 'Giải ngân người bán'}
                  </span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      className="primary-button"
                      style={{ fontSize: 11, padding: '4px 8px', background: '#356b41' }}
                      onClick={() => handleResolve(d.id, 'REFUND_BUYER')}
                      title="Hoàn tiền 100% cho người mua"
                    >
                      Hoàn tiền Buyer
                    </button>
                    <button
                      className="outline-button"
                      style={{ fontSize: 11, padding: '4px 8px' }}
                      onClick={() => handleResolve(d.id, 'RELEASE_SELLER')}
                      title="Bác khiếu nại, giải ngân cho người bán"
                    >
                      Giải ngân Seller
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModeratorLayout>
  )
}
