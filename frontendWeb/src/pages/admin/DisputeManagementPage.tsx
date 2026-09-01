import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldAlert } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { mockDisputes, formatVND } from '../../mock/mockData'

export const DisputeManagementPage: React.FC = () => {
  return (
    <AdminLayout title="Giám Sát Khiếu Nại & Tranh Chấp Toàn Sàn (Admin)">
      <div style={{ marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
          Cấp quản trị theo dõi quy trình xử lý của các Moderator, phê duyệt các lệnh hoàn tiền đặc biệt giá trị lớn.
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã khiếu nại</th>
              <th>Đơn hàng</th>
              <th>Người mua / Người bán</th>
              <th>Giá trị Escrow</th>
              <th>Điều phối viên phụ trách</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {mockDisputes.map((d) => (
              <tr key={d.id}>
                <td>
                  <b>#{d.id}</b>
                </td>
                <td>#{d.orderCode}</td>
                <td>
                  {d.buyerName} ↔ {d.sellerName}
                </td>
                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {formatVND(d.amount)}
                </td>
                <td>Nguyễn Đức (Moderator)</td>
                <td>
                  <span className="admin-status wait">
                    {d.status === 'UNDER_REVIEW' ? 'Đang điều phối' : 'Đã phán quyết'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
