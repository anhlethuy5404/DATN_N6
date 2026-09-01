import React, { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockProducts } from '../../mock/mockData'

export const EditProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const product = mockProducts.find((p) => p.id === id) || mockProducts[0]

  const [title, setTitle] = useState(product.title)
  const [price, setPrice] = useState(product.salePrice?.toString() || '0')
  const [description, setDescription] = useState(product.description)
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      navigate(`/products/${product.id}`)
    }, 1200)
  }

  return (
    <MainLayout>
      <main style={{ maxWidth: 800 }}>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to={`/products/${product.id}`}>Chi tiết</Link>
          <span>/</span>
          <strong>Chỉnh sửa sản phẩm</strong>
        </div>

        <div className="form-card" style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 32 }}>
          <span className="eyebrow">Cập nhật thông tin · #{product.id}</span>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, margin: '8px 0 20px' }}>
            Chỉnh Sửa Bài Đăng
          </h1>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Tiêu đề món đồ
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Giá bán (₫)
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Mô tả chi tiết
              <textarea
                rows={6}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </label>

            {saved && (
              <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} /> Đã cập nhật thông tin sản phẩm thành công! Đang chuyển hướng...
              </div>
            )}

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate(-1)}
              >
                Hủy bỏ
              </button>
              <button type="submit" className="primary-button">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </main>
    </MainLayout>
  )
}
