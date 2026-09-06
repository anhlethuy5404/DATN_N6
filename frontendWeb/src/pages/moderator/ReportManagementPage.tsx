import React, { useState } from 'react'
import { Check, X, AlertTriangle } from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'
import { mockReports } from '../../mock/mockData'

export const ReportManagementPage: React.FC = () => {
  const [reports, setReports] = useState(mockReports)

  const handleResolve = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'RESOLVED' } : r))
    )
  }

  const handleDismiss = (id: string) => {
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'DISMISSED' } : r))
    )
  }

  return (
    <ModeratorLayout title="Quản Lý Báo Cáo Vi Phạm (Reports)">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã báo cáo</th>
              <th>Loại vi phạm</th>
              <th>Sản phẩm / Đối tượng</th>
              <th>Người báo cáo</th>
              <th>Mô tả chi tiết</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>
                  <b>#{r.id}</b>
                  <small>{r.createdAt}</small>
                </td>
                <td>
                  <span
                    className="status danger"
                    style={{ fontSize: 10, padding: '2px 8px' }}
                  >
                    {r.reasonType}
                  </span>
                </td>
                <td>
                  <b>{r.productTitle}</b>
                </td>
                <td>{r.reporterName}</td>
                <td>{r.description}</td>
                <td>
                  <span
                    className={`admin-status ${
                      r.status === 'RESOLVED'
                        ? 'good'
                        : r.status === 'DISMISSED'
                        ? 'bad'
                        : 'wait'
                    }`}
                  >
                    {r.status === 'RESOLVED'
                      ? 'Đã xử lý'
                      : r.status === 'DISMISSED'
                      ? 'Đã bác bỏ'
                      : 'Đang chờ xử lý'}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      title="Xử lý gỡ bỏ sản phẩm"
                      onClick={() => handleResolve(r.id)}
                      style={{ color: '#356b41' }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      title="Bác bỏ báo cáo sai"
                      onClick={() => handleDismiss(r.id)}
                      style={{ color: '#a93c2c' }}
                    >
                      <X size={16} />
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
