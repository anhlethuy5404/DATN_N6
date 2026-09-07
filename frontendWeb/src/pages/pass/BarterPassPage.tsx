import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Gift,
  RefreshCw,
  Sparkles,
  Plus,
  MapPin,
  Clock,
  Check,
  Clock3,
  MessageCircle,
  ShieldCheck,
  Heart,
  ChevronRight
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockProducts } from '../../mock/mockData'
import { useAuth } from '../../contexts/AuthContext'

export const BarterPassPage: React.FC = () => {
  const navigate = useNavigate()
  const { savedProductIds, toggleSaveProduct } = useAuth()
  const [activeTab, setActiveTab] = useState<'EXPLORE' | 'MY_APPLICATIONS'>('EXPLORE')
  const [typeFilter, setTypeFilter] = useState<'ALL' | 'PASS' | 'BARTER'>('ALL')

  const barterAndPassProducts = mockProducts.filter((p) => {
    if (typeFilter === 'PASS') return p.transactionType === 'PASS'
    if (typeFilter === 'BARTER') return p.transactionType === 'BARTER'
    return p.transactionType === 'PASS' || p.transactionType === 'BARTER'
  })

  const myApplications = [
    {
      id: 'APP-102',
      type: 'PASS',
      productTitle: 'Bàn làm việc gỗ thông tự nhiên 1m2 x 60cm',
      ownerName: 'Phúc Nguyễn',
      status: 'APPROVED',
      note: 'Chào bạn, mình là sinh viên năm nhất ĐH Quốc Gia Hà Nội, mình xin bàn để học tập và hứa giữ gìn cẩn thận.',
      date: '06/09/2026',
      meetupSpot: 'Highlands Coffee Duy Tân, Cầu Giấy'
    },
    {
      id: 'APP-101',
      type: 'BARTER',
      productTitle: 'Cối xay cà phê tay Comandante C40 MK4',
      ownerName: 'Bếp Cà Phê Mộc',
      status: 'PENDING',
      note: 'Đề xuất đổi lấy: Đồng hồ cơ Seiko 5 Demi còn mới 95%.',
      date: '05/09/2026',
      meetupSpot: 'Bưu điện Bờ Hồ'
    }
  ]

  return (
    <MainLayout>
      <div className="bg-[#F8F9FF] min-h-screen pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#007D55] via-[#004AC6] to-[#712AE2] text-white py-14 px-4">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-[#6FFBBE] text-xs font-bold border border-white/20">
                <Sparkles size={14} />
                <span>NEXUS ZERO-CASH EXCHANGE · PASS & BARTER</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
                Không Gian Cho Tặng 0₫ & <br />
                <span className="text-[#6FFBBE]">Trao Đổi Đồ Cũ Văn Minh</span>
              </h1>
              <p className="text-emerald-50 text-sm sm:text-base leading-relaxed">
                Nơi đồ cũ của người này trở thành món đồ quý giá của người khác. Cho tặng miễn phí 100% hoặc đổi ngang đồ sưu tầm với điểm hẹn Safe Spot được bảo vệ bằng công nghệ định danh eKYC.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                to="/products/create"
                className="px-6 py-3.5 rounded-full bg-[#6FFBBE] hover:bg-[#59eab1] text-[#0B1C30] font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105"
              >
                <Plus size={18} />
                <span>Đăng tin Cho Tặng / Đổi đồ</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
          <div className="bg-white rounded-2xl border border-[#C3C6D7] shadow-md p-2 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setActiveTab('EXPLORE')}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'EXPLORE'
                    ? 'bg-[#004AC6] text-white shadow-xs'
                    : 'text-[#434655] hover:bg-slate-100'
                }`}
              >
                <Gift size={16} />
                <span>Khám phá món đồ ({barterAndPassProducts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('MY_APPLICATIONS')}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'MY_APPLICATIONS'
                    ? 'bg-[#004AC6] text-white shadow-xs'
                    : 'text-[#434655] hover:bg-slate-100'
                }`}
              >
                <RefreshCw size={16} />
                <span>Đơn của tôi ({myApplications.length})</span>
              </button>
            </div>

            {activeTab === 'EXPLORE' && (
              <div className="flex gap-2 w-full sm:w-auto justify-end">
                {[
                  { id: 'ALL', label: 'Tất cả' },
                  { id: 'PASS', label: '🎁 Cho Tặng Miễn Phí (0₫)' },
                  { id: 'BARTER', label: '🔄 Đổi Đồ Ngang Giá' }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setTypeFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                      typeFilter === f.id
                        ? 'bg-[#DCE9FF] text-[#004AC6] border border-[#004AC6]/30'
                        : 'text-[#737686] hover:bg-slate-100'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {activeTab === 'EXPLORE' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {barterAndPassProducts.map((p) => {
                const isSaved = savedProductIds.includes(p.id)
                const isPass = p.transactionType === 'PASS'

                return (
                  <div
                    key={p.id}
                    className="bg-white rounded-2xl border border-[#C3C6D7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                  >
                    <div className="relative h-52 bg-slate-100 overflow-hidden">
                      <img
                        src={p.primaryImage}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white text-[11px] font-black uppercase tracking-wider ${
                          isPass ? 'bg-[#007D55]' : 'bg-[#712AE2]'
                        }`}
                      >
                        {isPass ? '🎁 CHO TẶNG 0 ₫' : '🔄 ĐỔI ĐỒ (BARTER)'}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault()
                          toggleSaveProduct(p.id)
                        }}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-700 hover:text-red-500 transition-colors shadow-xs"
                      >
                        <Heart size={16} fill={isSaved ? '#BA1A1A' : 'none'} color={isSaved ? '#BA1A1A' : 'currentColor'} />
                      </button>
                      <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px]">
                        {p.provinceName}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div>
                        <h3 className="font-bold text-base text-[#0B1C30] group-hover:text-[#004AC6] transition-colors line-clamp-2 mb-2">
                          {p.title}
                        </h3>
                        <p className="text-xs text-[#737686] line-clamp-2">{p.description}</p>
                      </div>

                      {/* Barter/Pass specific info */}
                      {isPass ? (
                        <div className="bg-[#EDF5EE] border border-[#CFE2D1] p-3 rounded-xl text-xs space-y-1">
                          <b className="text-[#007D55] block">Lời nhắn người tặng:</b>
                          <p className="text-[#0B1C30] line-clamp-2">{p.noteForPass || 'Dành tặng cho bạn nào thực sự cần sử dụng!'}</p>
                        </div>
                      ) : (
                        <div className="bg-[#FDF4EC] border border-[#EBDCD0] p-3 rounded-xl text-xs space-y-1">
                          <b className="text-[#8A523B] block">Món đồ muốn đổi lại:</b>
                          <p className="text-[#0B1C30] line-clamp-2">{p.preferredExchangeItems || 'Liên hệ thương lượng đồ tương đương giá trị'}</p>
                        </div>
                      )}

                      <div className="pt-2 border-t border-[#ECEEF6] flex items-center justify-between">
                        <div className="text-xs text-[#737686]">
                          Đăng bởi: <b className="text-[#0B1C30]">{p.sellerName}</b>
                        </div>
                        <Link
                          to={`/products/${p.id}`}
                          className={`px-4 py-2 rounded-xl text-white text-xs font-bold transition-colors ${
                            isPass ? 'bg-[#007D55] hover:bg-[#006041]' : 'bg-[#712AE2] hover:bg-[#5a1eb8]'
                          }`}
                        >
                          {isPass ? 'Xin nhận đồ' : 'Đề xuất đổi'}
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            /* My Applications Tab */
            <div className="space-y-4 max-w-4xl mx-auto">
              {myApplications.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-[#C3C6D7] p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider ${
                        app.type === 'PASS' ? 'text-[#007D55]' : 'text-[#712AE2]'
                      }`}
                    >
                      {app.type === 'PASS' ? <Gift size={15} /> : <RefreshCw size={15} />}
                      <span>{app.type === 'PASS' ? 'Đơn xin nhận đồ miễn phí' : 'Đề xuất trao đổi món đồ'}</span>
                    </span>

                    {app.status === 'APPROVED' ? (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#E4EFE6] text-[#2E6939] text-xs font-bold">
                        <Check size={14} /> Chủ món đồ đã đồng ý
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#FCF4E8] text-[#B26A1B] text-xs font-bold">
                        <Clock3 size={14} /> Đang chờ phản hồi
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[#0B1C30]">{app.productTitle}</h3>
                    <p className="text-xs text-[#737686] mt-1">
                      Chủ sở hữu: <b>{app.ownerName}</b> · Ngày gửi yêu cầu: {app.date}
                    </p>
                  </div>

                  <div className="bg-[#F8F9FF] p-3.5 rounded-xl border border-[#ECEEF6] text-xs">
                    <b className="text-[#434655]">Lời nhắn / Đề xuất của bạn:</b>
                    <p className="text-[#0B1C30] mt-1">{app.note}</p>
                  </div>

                  <div className="pt-3 border-t border-[#ECEEF6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <span className="text-[#737686] flex items-center gap-1.5">
                      <MapPin size={14} className="text-[#004AC6]" />
                      <span>Điểm hẹn đề xuất: <b>{app.meetupSpot}</b></span>
                    </span>

                    <Link
                      to="/messages"
                      className="px-4 py-2 rounded-xl bg-[#004AC6] hover:bg-[#003899] text-white font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <MessageCircle size={14} />
                      <span>Nhắn tin với chủ đồ</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  )
}
