import React, { useState } from 'react'
import { Check, X, ShieldAlert, SlidersHorizontal, Search } from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'

interface QueueItem {
  id: string
  product: string
  seller: string
  category: string
  type: string
  date: string
  status: 'Pending' | 'Approved' | 'Rejected'
}

export const ProductModerationPage: React.FC = () => {
  const [rows, setRows] = useState<QueueItem[]>([
    { id: 'MOD-1042', product: 'Máy ảnh Fujifilm X-T30 II', seller: 'Minh Anh', category: 'Điện tử', type: 'Mua bán', date: '07/09/2026', status: 'Pending' },
    { id: 'MOD-1041', product: 'Đồng hồ Seiko 5 automatic', seller: 'Huy Vintage', category: 'Thời trang', type: 'Đấu giá', date: '07/09/2026', status: 'Pending' },
    { id: 'MOD-1038', product: 'Bộ dao bếp Nhật Bản', seller: 'Bếp Nhà Mây', category: 'Gia dụng', type: 'Mua bán', date: '06/09/2026', status: 'Pending' },
    { id: 'MOD-1035', product: 'Ghế lounge da nâu vintage', seller: 'Nhà của Mây', category: 'Nội thất', type: 'Mua bán', date: '05/09/2026', status: 'Approved' }
  ])

  const handleApprove = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Approved' } : r)))
  }

  const handleReject = (id: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r)))
  }

  return (
    <ModeratorLayout title="Kiểm Duyệt Sản Phẩm Mới Đăng">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
          Còn <strong>{rows.filter((r) => r.status === 'Pending').length}</strong> sản phẩm đang chờ duyệt
        </span>

        <div style={{ display: 'flex', gap: 10 }}>
          <select style={{ border: '1px solid var(--border)', background: 'var(--card)', padding: '6px 12px', borderRadius: 6, fontSize: 12 }}>
            <option>Tất cả danh mục</option>
            <option>Điện tử</option>
            <option>Thời trang</option>
            <option>Nội thất</option>
          </select>
        </div>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã tin & Sản phẩm</th>
              <th>Người đăng</th>
              <th>Danh mục</th>
              <th>Hình thức</th>
              <th>Ngày gửi</th>
              <th>Trạng thái</th>
              <th>Thao tác duyệt</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id}>
                <td>
                  <b>{row.product}</b>
                  <small>#{row.id}</small>
                </td>
                <td>{row.seller}</td>
                <td>{row.category}</td>
                <td>{row.type}</td>
                <td>{row.date}</td>
                <td>
                  <span
                    className={`admin-status ${
                      row.status === 'Approved'
                        ? 'good'
                        : row.status === 'Rejected'
                        ? 'bad'
                        : 'wait'
                    }`}
                  >
                    {row.status === 'Approved' ? 'Đã duyệt' : row.status === 'Rejected' ? 'Từ chối' : 'Chờ duyệt'}
                  </span>
                </td>
                <td>
                  <div className="row-actions">
                    <button
                      title="Duyệt bài đăng"
                      onClick={() => handleApprove(row.id)}
                      style={{ color: '#356b41' }}
                    >
                      <Check size={16} />
                    </button>
                    <button
                      title="Từ chối bài đăng"
                      onClick={() => handleReject(row.id)}
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
