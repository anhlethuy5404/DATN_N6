import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Clock3, ShieldCheck, Filter, Search, Sparkles, Flame, CheckCircle } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { AuctionCard } from '../../components/auction/AuctionCard'
import { mockProducts } from '../../mock/mockData'

export const AuctionListPage: React.FC = () => {
  const [filterLocation, setFilterLocation] = useState('Tất cả')
  const [statusFilter, setStatusFilter] = useState<'ACTIVE' | 'UPCOMING' | 'ENDED'>('ACTIVE')
  const [searchQuery, setSearchQuery] = useState('')

  const auctionList = mockProducts.filter((p) => p.transactionType === 'AUCTION')

  const filtered = auctionList.filter((p) => {
    const matchesLoc = filterLocation === 'Tất cả' || p.provinceName.includes(filterLocation)
    const matchesQuery = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesLoc && matchesQuery
  })

  return (
    <MainLayout>
      {/* Top Breadcrumb & Hero */}
      <div className="bg-gradient-to-b from-[#F8F9FF] to-[#ECEEF6] py-10 border-b border-[#C3C6D7]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#737686] mb-4">
            <Link to="/" className="hover:text-[#004AC6]">Trang chủ</Link>
            <span>/</span>
            <span className="font-semibold text-[#0B1C30]">Sảnh Đấu Giá Nexus</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#BA1A1A]/10 text-[#BA1A1A] text-xs font-bold mb-3">
                <Flame size={14} />
                <span>LIVE AUCTION LOBBY</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#0B1C30] tracking-tight">
                Sảnh Đấu Giá Minh Bạch & Thời Gian Thực
              </h1>
              <p className="text-sm text-[#434655] mt-2 max-w-2xl leading-relaxed">
                Khám phá các phiên đấu giá độc bản từ các nhà sưu tầm uy tín. Mỗi bước giá được xác thực qua công nghệ bảo mật và quỹ ký quỹ Nexus Escrow.
              </p>
            </div>

            <div className="bg-[#0B1C30] text-white p-5 rounded-2xl flex items-center gap-4 shadow-lg border border-slate-700/60 flex-shrink-0">
              <div className="w-12 h-12 rounded-xl bg-[#004AC6] flex items-center justify-center">
                <Gavel className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#6FFBBE]">100%</div>
                <div className="text-xs text-slate-400">Đã thẩm định eKYC</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Sidebar Filters & Auction Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filter (Figma Sảnh Đấu Giá) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white p-5 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#C3C6D7]">
                <div className="flex items-center gap-2 font-bold text-sm text-[#0B1C30]">
                  <Filter size={16} className="text-[#004AC6]" />
                  <span>Bộ lọc phiên</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFilterLocation('Tất cả')
                    setSearchQuery('')
                  }}
                  className="text-xs text-[#004AC6] hover:underline"
                >
                  Đặt lại
                </button>
              </div>

              {/* Status Radio */}
              <div>
                <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider mb-2">
                  Trạng thái
                </label>
                <div className="space-y-2 text-xs text-[#0B1C30]">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={statusFilter === 'ACTIVE'}
                      onChange={() => setStatusFilter('ACTIVE')}
                      className="text-[#004AC6] focus:ring-[#004AC6]"
                    />
                    <span className="font-medium">Đang diễn ra (Live)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={statusFilter === 'UPCOMING'}
                      onChange={() => setStatusFilter('UPCOMING')}
                      className="text-[#004AC6] focus:ring-[#004AC6]"
                    />
                    <span>Sắp kết thúc (&lt; 2h)</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      checked={statusFilter === 'ENDED'}
                      onChange={() => setStatusFilter('ENDED')}
                      className="text-[#004AC6] focus:ring-[#004AC6]"
                    />
                    <span>Đã kết thúc</span>
                  </label>
                </div>
              </div>

              {/* Region */}
              <div>
                <label className="block text-xs font-bold text-[#434655] uppercase tracking-wider mb-2">
                  Khu vực giao dịch
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {['Tất cả', 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => setFilterLocation(loc)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        filterLocation === loc
                          ? 'bg-[#004AC6] text-white shadow-xs'
                          : 'bg-[#F8F9FF] text-[#434655] hover:bg-slate-200'
                      }`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>

              {/* Escrow Badge Info */}
              <div className="p-3 bg-[#EAF3ED] rounded-xl text-xs text-[#007D55] space-y-1 border border-[#007D55]/20">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle size={14} />
                  <span>Nexus Escrow Guarantee</span>
                </div>
                <p className="text-[11px] leading-4 text-emerald-900/80">
                  Người thắng đấu giá có 24h kiểm tra tình trạng hàng thực tế trước khi tiền được chuyển cho người bán.
                </p>
              </div>
            </div>
          </div>

          {/* Right Main Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Search and stats bar */}
            <div className="bg-white p-3 rounded-2xl border border-[#C3C6D7] flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full sm:w-80">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686]" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên vật phẩm đấu giá..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-1.5 text-xs bg-[#F8F9FF] rounded-full border border-[#C3C6D7] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                />
              </div>

              <div className="text-xs font-semibold text-[#434655]">
                Hiển thị <span className="text-[#004AC6] font-bold">{filtered.length}</span> phiên đấu giá
              </div>
            </div>

            {/* Auction Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <AuctionCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
