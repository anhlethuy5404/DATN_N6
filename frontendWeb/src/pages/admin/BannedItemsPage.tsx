import React, { useState } from 'react'
import { ShieldAlert, Plus, Trash2 } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'

export const BannedItemsPage: React.FC = () => {
  const [items, setItems] = useState([
    'Vũ khí, hung khí và công cụ hỗ trợ phòng vệ',
    'Thuốc tân dược kê đơn và chất kích thích cấm',
    'Hàng giả, hàng nhái sao chép thương hiệu',
    'Động vật hoang dã và các chế phẩm từ ngà voi/da thú',
    'Các loại giấy tờ tùy thân, bằng cấp, chứng chỉ giả mạo'
  ])
  const [newItem, setNewItem] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim()) {
      setItems([...items, newItem.trim()])
      setNewItem('')
    }
  }

  const handleRemove = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  return (
    <AdminLayout title="Danh Mục Sản Phẩm Cấm Giao Dịch">
      <div style={{ maxWidth: 740 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 20 }}>
          Hệ thống AI Vector Embedding & NLP tự động quét tiêu đề và mô tả của bài đăng đối chiếu với danh mục này để chặn đăng tải trái phép.
        </p>

        <form onSubmit={handleAdd} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            type="text"
            placeholder="Nhập mặt hàng hoặc từ khóa cấm mới..."
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            style={{ flex: 1, border: '1px solid var(--border)', background: 'var(--card)', padding: '10px 14px', borderRadius: 6 }}
          />
          <button type="submit" className="primary-button">
            <Plus size={15} /> Thêm vào danh mục cấm
          </button>
        </form>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden' }}>
          {items.map((item, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 20px',
                borderBottom: idx < items.length - 1 ? '1px solid var(--border)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <ShieldAlert size={18} color="var(--danger)" />
                <span style={{ fontSize: 13, fontWeight: 500 }}>{item}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="status danger" style={{ fontSize: 10 }}>
                  Đang kích hoạt chặn AI
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  style={{ border: 0, background: 'none', color: 'var(--muted-foreground)', cursor: 'pointer' }}
                  aria-label="Xóa"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
