import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Clock3 } from 'lucide-react'
import { Product } from '../../types'
import { formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { savedProductIds, toggleSaveProduct } = useAuth()
  const isSaved = savedProductIds.includes(product.id)

  const getTagClass = () => {
    switch (product.transactionType) {
      case 'PASS':
        return 'free-tag'
      case 'BARTER':
        return 'exchange-tag'
      case 'AUCTION':
        return 'auction-tag'
      default:
        return ''
    }
  }

  const getTagText = () => {
    switch (product.transactionType) {
      case 'PASS':
        return 'Cho tặng (Free)'
      case 'BARTER':
        return 'Trao đổi'
      case 'AUCTION':
        return 'Đang đấu giá'
      default:
        return 'Mua bán'
    }
  }

  const displayPrice = () => {
    if (product.transactionType === 'PASS') {
      return <span className="price free-price">Miễn phí 0 ₫</span>
    }
    if (product.transactionType === 'AUCTION') {
      return <span className="price">{formatVND(product.currentPrice || product.startPrice || 0)}</span>
    }
    return <span className="price">{formatVND(product.salePrice || 0)}</span>
  }

  return (
    <Link
      to={product.transactionType === 'AUCTION' ? `/auctions/${product.id}` : `/products/${product.id}`}
      className="product-card"
    >
      <div className="product-image-wrap">
        <img src={product.primaryImage} alt={product.title} loading="lazy" />
        <span className={`product-tag ${getTagClass()}`}>{getTagText()}</span>
        <button
          className={`heart ${isSaved ? 'saved' : ''}`}
          aria-label="Lưu sản phẩm"
          onClick={(e) => {
            e.preventDefault()
            toggleSaveProduct(product.id)
          }}
        >
          <Heart size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="product-info">
        <p className="product-title">{product.title}</p>
        {displayPrice()}

        <div className="product-meta">
          <span>{product.condition === 'LIKE_NEW' ? 'Như mới' : 'Đã qua sử dụng'}</span>
          <span>{product.districtName}, {product.provinceName}</span>
        </div>

        {product.transactionType === 'AUCTION' && (
          <div className="card-auction">
            <span>{product.bidsCount || 0} lượt đặt giá</span>
            <span>
              <Clock3 size={12} /> {product.endTime?.split('(')[1]?.replace(')', '') || 'Sắp kết thúc'}
            </span>
          </div>
        )}

        <div className="seller-row">
          <span className="mini-avatar">{product.sellerName.slice(0, 2).toUpperCase()}</span>
          <span>{product.sellerName}</span>
          <span className="rating">
            <Star size={11} fill="currentColor" /> {product.sellerRating || 5.0}
          </span>
          <span className="trust">{product.sellerTrustScore}%</span>
        </div>
      </div>
    </Link>
  )
}
