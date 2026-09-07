import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Star, Clock3, ShieldCheck } from 'lucide-react'
import { Product } from '../../types'
import { formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'

interface ProductCardProps {
  product: Product
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { savedProductIds, toggleSaveProduct } = useAuth()
  const isSaved = savedProductIds?.includes(product.id)

  const getBadge = () => {
    switch (product.transactionType) {
      case 'PASS':
        return { text: 'Pass / 0 ₫', bg: 'bg-[#007D55]', textColor: 'text-white' }
      case 'BARTER':
        return { text: 'Trao đổi', bg: 'bg-[#712AE2]', textColor: 'text-white' }
      case 'AUCTION':
        return { text: 'Đang đấu giá', bg: 'bg-[#BA1A1A]', textColor: 'text-white' }
      default:
        return { text: 'Mua bán', bg: 'bg-[#004AC6]', textColor: 'text-white' }
    }
  }

  const badge = getBadge()

  const displayPrice = () => {
    if (product.transactionType === 'PASS') {
      return <span className="text-base font-bold text-[#007D55]">Miễn phí 0 ₫</span>
    }
    if (product.transactionType === 'AUCTION') {
      return (
        <div className="flex items-baseline gap-1.5">
          <span className="text-xs text-[#737686]">Giá hiện tại:</span>
          <span className="text-base font-extrabold text-[#BA1A1A]">
            {formatVND(product.currentPrice || product.startPrice || 0)}
          </span>
        </div>
      )
    }
    return (
      <span className="text-base font-extrabold text-[#004AC6]">
        {formatVND(product.salePrice || 0)}
      </span>
    )
  }

  return (
    <Link
      to={product.transactionType === 'AUCTION' ? `/auctions/${product.id}` : `/products/${product.id}`}
      className="group bg-white rounded-2xl border border-[#C3C6D7]/70 hover:border-[#004AC6]/50 shadow-2xs hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
        <img
          src={product.primaryImage}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Transaction badge */}
        <span
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold shadow-sm ${badge.bg} ${badge.textColor}`}
        >
          {badge.text}
        </span>

        {/* Heart wishlist */}
        <button
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all ${
            isSaved ? 'bg-red-50 text-[#BA1A1A]' : 'bg-white/80 text-[#737686] hover:text-[#0B1C30]'
          }`}
          aria-label="Save product"
          onClick={(e) => {
            e.preventDefault()
            toggleSaveProduct(product.id)
          }}
        >
          <Heart size={15} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-sm font-bold text-[#0B1C30] line-clamp-2 group-hover:text-[#004AC6] transition-colors leading-snug">
            {product.title}
          </h3>
          <div className="mt-2">{displayPrice()}</div>
        </div>

        <div className="pt-2 border-t border-slate-100 space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[#737686]">
            <span>{product.condition === 'LIKE_NEW' ? 'Như mới 99%' : 'Đã qua sử dụng'}</span>
            <span>{product.provinceName}</span>
          </div>

          {/* Seller row */}
          <div className="flex items-center justify-between text-[11px] pt-1">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#004AC6] text-white text-[9px] font-bold flex items-center justify-center">
                {product.sellerName.slice(0, 1)}
              </div>
              <span className="font-medium text-[#434655] truncate max-w-[100px]">{product.sellerName}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="flex items-center text-amber-500 font-bold">
                <Star size={10} fill="currentColor" /> {product.sellerRating || 5.0}
              </span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-[#EAF3ED] text-[#007D55] text-[10px] font-extrabold">
                <ShieldCheck size={10} />
                {product.sellerTrustScore}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
