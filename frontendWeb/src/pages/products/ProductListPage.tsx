import React, { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search, SlidersHorizontal } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { ProductCard } from '../../components/product/ProductCard'
import { mockProducts, mockCategories } from '../../mock/mockData'
import { TransactionType } from '../../types'

export const ProductListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialQ = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQ)
  const [selectedType, setSelectedType] = useState<TransactionType | 'ALL'>('ALL')
  const [selectedCat, setSelectedCat] = useState<string>('ALL')

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((p) => {
      const matchQ =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      const matchType = selectedType === 'ALL' || p.transactionType === selectedType
      const matchCat =
        selectedCat === 'ALL' ||
        p.categoryId.toString() === selectedCat ||
        p.categoryName.toLowerCase().includes(selectedCat.toLowerCase())
      return matchQ && matchType && matchCat
    })
  }, [query, selectedType, selectedCat])

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <strong>Khám phá sản phẩm</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 28 }}>
          <div>
            <span className="eyebrow">Mộc Catalog Domain</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 38, letterSpacing: '-0.04em', margin: '6px 0' }}>
              Danh Sách Sản Phẩm
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 14 }}>
              Tìm món đồ phù hợp với câu chuyện và nhu cầu của bạn.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div className="search-shell" style={{ width: 280 }}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Lọc tên sản phẩm..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setSearchParams(e.target.value ? { q: e.target.value } : {})
                }}
              />
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 16, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
          <button
            className={`secondary-button ${selectedType === 'ALL' ? 'active' : ''}`}
            style={selectedType === 'ALL' ? { background: '#292724', color: '#fff' } : {}}
            onClick={() => setSelectedType('ALL')}
          >
            Tất cả hình thức
          </button>
          <button
            className={`secondary-button ${selectedType === 'SALE' ? 'active' : ''}`}
            style={selectedType === 'SALE' ? { background: '#292724', color: '#fff' } : {}}
            onClick={() => setSelectedType('SALE')}
          >
            Mua bán cố định
          </button>
          <button
            className={`secondary-button ${selectedType === 'AUCTION' ? 'active' : ''}`}
            style={selectedType === 'AUCTION' ? { background: '#292724', color: '#fff' } : {}}
            onClick={() => setSelectedType('AUCTION')}
          >
            Đấu giá trực tuyến
          </button>
          <button
            className={`secondary-button ${selectedType === 'BARTER' ? 'active' : ''}`}
            style={selectedType === 'BARTER' ? { background: '#292724', color: '#fff' } : {}}
            onClick={() => setSelectedType('BARTER')}
          >
            Trao đổi đồ
          </button>
          <button
            className={`secondary-button ${selectedType === 'PASS' ? 'active' : ''}`}
            style={selectedType === 'PASS' ? { background: '#292724', color: '#fff' } : {}}
            onClick={() => setSelectedType('PASS')}
          >
            Cho tặng (Pass)
          </button>

          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            style={{
              marginLeft: 'auto',
              border: '1px solid var(--border)',
              background: 'var(--card)',
              borderRadius: 6,
              padding: '6px 12px',
              fontSize: 12
            }}
          >
            <option value="ALL">Tất cả danh mục</option>
            {mockCategories.map((c) => (
              <option key={c.id} value={c.id.toString()}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Results Count */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
            Tìm thấy <strong>{filteredProducts.length}</strong> sản phẩm phù hợp
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted-foreground)' }}>
            <SlidersHorizontal size={14} /> Sắp xếp: Mới nhất
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', border: '1px dashed var(--border)', borderRadius: 8 }}>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '0 0 8px' }}>
              Không tìm thấy sản phẩm nào
            </h3>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
              Hãy thử tìm kiếm với từ khóa khác hoặc xóa bộ lọc.
            </p>
          </div>
        ) : (
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
    </MainLayout>
  )
}
