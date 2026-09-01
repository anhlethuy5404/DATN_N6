import React, { useState } from 'react'
import { Check, X, FileText, Eye } from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'
import { mockVerifications } from '../../mock/mockData'

export const VerificationManagementPage: React.FC = () => {
  const [list, setList] = useState(mockVerifications)

  const handleApprove = (id: string) => {
    setList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'VERIFIED' } : v))
    )
  }

  const handleReject = (id: string) => {
    setList((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'REJECTED' } : v))
    )
  }

  return (
    <ModeratorLayout title="Duyệt Hồ Sơ Xác Minh Danh Tính eKYC (Domain 1)">
      <div style={{ marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
          Đối chiếu số CCCD, họ tên thật và ảnh chụp giấy tờ 2 mặt để kích hoạt huy hiệu Người Bán Tin Cậy.
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã hồ sơ</th>
              <th>Họ và tên thật</th>
              <th>Số CCCD</th>
              <th>Giấy tờ tải lên</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.id}>
                <td>
                  <b>#{v.id}</b>
                </td>
                <td>
                  <strong>{v.realName}</strong>
                </td>
                <td style={{ fontFamily: 'monospace', fontSize: 13 }}>
                  {v.idCardNumber}
                </td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--primary)', cursor: 'pointer', fontSize: 12 }}>
                    <Eye size={14} /> Xem 2 mặt CCCD
                  </span>
                </td>
                <td>
                  <span
                    className={`admin-status ${
                      v.status === 'VERIFIED'
                        ? 'good'
                        : v.status === 'REJECTED'
                        ? 'bad'
                        : 'wait'
                    }`}
                  >
                    {v.status === 'VERIFIED'
                      ? 'Đã xác thực'
                      : v.status === 'REJECTED'
                      ? 'Từ chối'
                      : 'Chờ duyệt'}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      title="Phê duyệt eKYC"
                      onClick={() => handleApprove(v.id)}
                      style={{ color: '#356b41' }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      title="Từ chối (ảnh mờ/giả mạo)"
                      onClick={() => handleReject(v.id)}
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
