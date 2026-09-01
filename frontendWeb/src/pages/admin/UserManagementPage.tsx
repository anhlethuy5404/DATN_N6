import React, { useState } from 'react'
import { Plus, Search, ShieldCheck } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'

interface UserItem {
  id: string
  name: string
  email: string
  verification: string
  trust: number
  status: 'ACTIVE' | 'SUSPENDED' | 'BANNED'
  role: 'USER' | 'MODERATOR' | 'ADMIN'
  joined: string
}

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([
    { id: 'USR-1001', name: 'Minh Anh', email: 'minhanh@example.com', verification: 'Đã xác minh eKYC', trust: 98, status: 'ACTIVE', role: 'USER', joined: '03/2021' },
    { id: 'USR-1002', name: 'Huy Vintage', email: 'huyvintage@example.com', verification: 'Đã xác minh eKYC', trust: 95, status: 'ACTIVE', role: 'USER', joined: '08/2022' },
    { id: 'USR-1003', name: 'Trần Mai Linh', email: 'mailinh@example.com', verification: 'Chờ xác minh', trust: 82, status: 'SUSPENDED', role: 'USER', joined: '01/2025' },
    { id: 'USR-1004', name: 'Nguyễn Đức', email: 'duc.nguyen@moc.vn', verification: 'Đã xác minh eKYC', trust: 99, status: 'ACTIVE', role: 'MODERATOR', joined: '06/2020' }
  ])
  const [search, setSearch] = useState('')

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  const handleRoleChange = (id: string, newRole: 'USER' | 'MODERATOR' | 'ADMIN') => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, role: newRole } : u)))
  }

  return (
    <AdminLayout title="Quản Lý Người Dùng & Tài Khoản (Domain 1)">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, gap: 14, flexWrap: 'wrap' }}>
        <div className="search-shell" style={{ width: 280 }}>
          <Search size={16} />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <button className="primary-button">
          <Plus size={15} /> Thêm tài khoản quản trị
        </button>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Xác minh eKYC</th>
              <th>Trust Score</th>
              <th>Trạng thái</th>
              <th>Ngày tham gia</th>
              <th>Vai trò (Role)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="mini-avatar">{u.name.slice(0, 2).toUpperCase()}</span>
                    <div>
                      <b>{u.name}</b>
                      <small>#{u.id}</small>
                    </div>
                  </div>
                </td>
                <td>{u.email}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: u.verification.includes('Đã') ? '#356b41' : '#9c6827' }}>
                    <ShieldCheck size={14} /> {u.verification}
                  </span>
                </td>
                <td>
                  <b style={{ color: u.trust >= 90 ? '#356b41' : '#c5573e' }}>{u.trust}/100</b>
                </td>
                <td>
                  <span className={`admin-status ${u.status === 'ACTIVE' ? 'good' : 'bad'}`}>
                    {u.status}
                  </span>
                </td>
                <td>{u.joined}</td>
                <td>
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u.id, e.target.value as any)}
                    style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '5px 8px', borderRadius: 4, fontSize: 12 }}
                  >
                    <option value="USER">USER</option>
                    <option value="MODERATOR">MODERATOR</option>
                    <option value="ADMIN">ADMIN</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
