import React from 'react'
import { Plus, UserCheck } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'

export const ModeratorManagementPage: React.FC = () => {
  const moderators = [
    { id: 'MOD-01', name: 'Nguyễn Đức', email: 'duc.nguyen@moc.vn', assignedQueue: 'Kiểm duyệt sản phẩm & Tranh chấp', activeTickets: 6, status: 'Đang hoạt động' },
    { id: 'MOD-02', name: 'Hoàng Lan', email: 'lan.hoang@moc.vn', assignedQueue: 'Xác minh eKYC CCCD', activeTickets: 3, status: 'Đang hoạt động' }
  ]

  return (
    <AdminLayout title="Quản Lý Đội Ngũ Điều Phối Viên (Moderators)">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Phân quyền và phân bổ hàng đợi kiểm duyệt an toàn sàn.
        </p>
        <button className="primary-button">
          <Plus size={15} /> Thêm Điều phối viên mới
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Điều phối viên</th>
              <th>Email công việc</th>
              <th>Phụ trách hàng đợi</th>
              <th>Hồ sơ đang xử lý</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {moderators.map((m) => (
              <tr key={m.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mini-avatar" style={{ background: '#285d88', color: '#fff' }}>
                      {m.name.slice(0, 2).toUpperCase()}
                    </span>
                    <div>
                      <b>{m.name}</b>
                      <small>#{m.id}</small>
                    </div>
                  </div>
                </td>
                <td>{m.email}</td>
                <td>{m.assignedQueue}</td>
                <td>
                  <b>{m.activeTickets} hồ sơ</b>
                </td>
                <td>
                  <span className="admin-status good">{m.status}</span>
                </td>
                <td>
                  <button className="outline-button" style={{ padding: '4px 10px', fontSize: 11 }}>
                    Phân công lại
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
