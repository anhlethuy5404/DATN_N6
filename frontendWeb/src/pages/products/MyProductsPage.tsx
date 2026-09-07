import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Plus,
  Eye,
  Heart,
  Edit,
  Trash2,
  ExternalLink,
  Gavel,
  Gift,
  RefreshCw,
  CheckCircle2,
  Clock3
} from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockProducts, formatVND } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'

export const MyProductsPage: React.FC = () => {
  const { currentUser } = useAuth()
  const [filter, setFilter] = useState<'ALL' | 'SALE' | 'AUCTION' | 'PASS' | 'BARTER'>('ALL')

  // Products belonging to the current user (mocked as first 3 products)
  const myItems = mockProducts.slice(0, 4)

  const filteredItems = myItems.filter((item) => {
    if (filter === 'ALL') return true
    return item.transactionType === filter
  })

  return (
    <UserLayout title="Tin Đăng Của Tôi">
      <div className="space-y-6">
        {/* Top Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#C3C6D7] shadow-xs">
          <div>
            <h2 className="text-lg font-black text-[#0B1C30]">Quản lý tin đăng bán & cho tặng</h2>
            <p className="text-xs text-[#737686] mt-0.5">
              Bạn có {myItems.length} sản phẩm đang được niêm yết trên hệ thống Nexus Exchange
            </p>
          </div>

          <Link
            to="/products/create"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#004AC6] hover:bg-[#003899] text-white text-xs font-bold shadow-xs transition-all hover:shadow-md"
          >
            <Plus size={16} />
            <span>Đăng món đồ mới</span>
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: `Tất cả (${myItems.length})` },
            { id: 'SALE', label: 'Bán cố định' },
            { id: 'AUCTION', label: 'Đang đấu giá' },
            { id: 'PASS', label: 'Cho tặng (0₫)' },
            { id: 'BARTER', label: 'Trao đổi' }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                filter === tab.id
                  ? 'bg-[#004AC6] text-white shadow-xs'
                  : 'bg-white text-[#434655] border border-[#C3C6D7] hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards List */}
        <div className="space-y-4">
          {filteredItems.map((product) => {
            const isPass = product.transactionType === 'PASS'
            const isBarter = product.transactionType === 'BARTER'
            const isAuction = product.transactionType === 'AUCTION'

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl border border-[#C3C6D7] p-5 shadow-xs hover:border-[#004AC6]/50 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Thumb + Title */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <img
                    src={product.primaryImage}
                    alt={product.title}
                    className="w-20 h-20 rounded-xl object-cover border border-[#C3C6D7] flex-shrink-0"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          isPass
                            ? 'bg-[#E4EFE6] text-[#2E6939]'
                            : isBarter
                            ? 'bg-[#FDF4EC] text-[#8A523B]'
                            : isAuction
                            ? 'bg-[#BA1A1A]/10 text-[#BA1A1A]'
                            : 'bg-[#DCE9FF] text-[#004AC6]'
                        }`}
                      >
                        {isPass ? (
                          <>
                            <Gift size={11} /> Pass 0₫
                          </>
                        ) : isBarter ? (
                          <>
                            <RefreshCw size={11} /> Barter
                          </>
                        ) : isAuction ? (
                          <>
                            <Gavel size={11} /> Đấu giá
                          </>
                        ) : (
                          'Bán cố định'
                        )}
                      </span>

                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                        <CheckCircle2 size={10} /> Đang hiển thị
                      </span>
                    </div>

                    <h3 className="font-bold text-sm text-[#0B1C30] truncate">{product.title}</h3>

                    <div className="flex items-center gap-4 text-xs text-[#737686]">
                      <span className="font-bold text-[#004AC6]">
                        {isPass ? 'Miễn phí (0 ₫)' : formatVND(product.salePrice || product.currentPrice || 0)}
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Eye size={13} /> {product.viewsCount} lượt xem
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Heart size={13} /> {product.likesCount} yêu thích
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end border-t md:border-t-0 pt-3 md:pt-0 border-[#ECEEF6]">
                  <Link
                    to={`/products/${product.id}`}
                    className="p-2 text-[#434655] hover:text-[#004AC6] hover:bg-slate-100 rounded-xl transition-colors"
                    title="Xem chi tiết trên sàn"
                  >
                    <ExternalLink size={18} />
                  </Link>

                  <Link
                    to={`/products/${product.id}/edit`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-[#C3C6D7] hover:border-[#004AC6] hover:text-[#004AC6] text-xs font-semibold text-[#0B1C30] transition-colors"
                  >
                    <Edit size={14} />
                    <span>Sửa tin</span>
                  </Link>

                  <button
                    type="button"
                    onClick={() => alert(`Đã tạm ẩn tin "${product.title}"`)}
                    className="p-2 text-[#737686] hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    title="Tạm ẩn tin đăng"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </UserLayout>
  )
}
