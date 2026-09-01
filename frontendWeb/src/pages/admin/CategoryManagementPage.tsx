import React, { useState } from 'react'
import { Plus, ChevronDown, Tag, Trash2, Edit } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { mockCategories } from '../../mock/mockData'

export const CategoryManagementPage: React.FC = () => {
  const [categories, setCategories] = useState(mockCategories)

  return (
    <AdminLayout title="Quản Lý Cây Danh Mục (Domain 2 Catalog)">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Cấu trúc phân cấp danh mục cha - con phục vụ tìm kiếm và Vector Search Embedding (CLIP & PhoBERT).
        </p>
        <button className="primary-button">
          <Plus size={15} /> Thêm danh mục cha mới
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {categories.map((cat) => (
          <div
            key={cat.id}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: 20
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <ChevronDown size={18} color="var(--primary)" />
                <h3 style={{ fontSize: 16, margin: 0 }}>{cat.name}</h3>
                <span className="status" style={{ fontSize: 10, padding: '2px 8px' }}>
                  {cat.children?.length || 0} danh mục con
                </span>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button className="secondary-button" style={{ fontSize: 11, padding: '4px 8px' }}>
                  <Edit size={12} /> Sửa
                </button>
                <button className="secondary-button" style={{ fontSize: 11, padding: '4px 8px', color: 'var(--danger)' }}>
                  <Trash2 size={12} /> Xóa
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {cat.children?.map((child) => (
                <div
                  key={child}
                  style={{
                    background: 'var(--muted)',
                    border: '1px solid var(--border)',
                    borderRadius: 6,
                    padding: '6px 12px',
                    fontSize: 12,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6
                  }}
                >
                  <Tag size={12} color="var(--primary)" />
                  <span>{child}</span>
                </div>
              ))}
              <button
                className="secondary-button"
                style={{ fontSize: 11, padding: '6px 10px', borderStyle: 'dashed' }}
              >
                + Thêm mục con
              </button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
