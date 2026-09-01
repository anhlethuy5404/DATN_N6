import React from 'react'
import { AlertTriangle } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { mockReports } from '../../mock/mockData'

export const ReportManagementPage: React.FC = () => {
  return (
    <AdminLayout title="Giám Sát Báo Cáo Vi Phạm & Lừa Đảo (Admin)">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã báo cáo</th>
              <th>Loại vi phạm</th>
              <th>Sản phẩm / Đối tượng</th>
              <th>Người gửi</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {mockReports.map((r) => (
              <tr key={r.id}>
                <td>
                  <b>#{r.id}</b>
                </td>
                <td>
                  <span className="status danger">{r.reasonType}</span>
                </td>
                <td>{r.productTitle}</td>
                <td>{r.reporterName}</td>
                <td>{r.description}</td>
                <td>
                  <span className={`admin-status ${r.status === 'RESOLVED' ? 'good' : 'wait'}`}>
                    {r.status}
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
