import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  ShieldCheck,
  Camera,
  Coffee,
  Building2,
  Search,
  CheckCircle2,
  Clock,
  Wifi,
  Zap,
  Car,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockSafeSpots } from '../../mock/mockData'

interface ExtendedSpot {
  id: string
  name: string
  address: string
  city: string
  district: string
  spotType: 'COFFEE' | 'POST_OFFICE' | 'PUBLIC_CAM' | 'SUPERMARKET'
  hours: string
  image: string
  features: string[]
  phone: string
  rating: number
}

const safeSpotList: ExtendedSpot[] = [
  {
    id: 'SPOT-1',
    name: 'Highlands Coffee Duy Tân',
    address: 'Tòa nhà FPT, Duy Tân, P. Dịch Vọng Hậu, Q. Cầu Giấy, Hà Nội',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    spotType: 'COFFEE',
    hours: '07:00 - 23:00 (Hàng ngày)',
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    features: ['CCTV HD 24/7', 'Bảo vệ tòa nhà', 'Ổ cắm điện thử máy', 'Wifi tốc độ cao', 'Chỗ đỗ ô tô/xe máy'],
    phone: '024 7300 8866',
    rating: 4.9
  },
  {
    id: 'SPOT-2',
    name: 'Bưu điện Trung tâm Bờ Hồ',
    address: '75 Đinh Tiên Hoàng, P. Tràng Tiền, Q. Hoàn Kiếm, Hà Nội',
    city: 'Hà Nội',
    district: 'Hoàn Kiếm',
    spotType: 'POST_OFFICE',
    hours: '07:30 - 19:30 (T2 - T7)',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    features: ['CCTV giám sát an ninh', 'Nhân viên bưu điện hỗ trợ', 'Đồng kiểm tại quầy', 'Cân điện tử chính xác'],
    phone: '024 3825 4403',
    rating: 4.8
  },
  {
    id: 'SPOT-3',
    name: 'Phố Đi Bộ Nguyễn Huệ - Hub Camera An Ninh',
    address: 'Đường Nguyễn Huệ, P. Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    spotType: 'PUBLIC_CAM',
    hours: '24/7 (Cả ngày & đêm)',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=800&q=80',
    features: ['Camera thông minh đô thị 24/7', 'Công an khu vực tuần tra', 'Không gian mở văn minh'],
    phone: '1900 6868',
    rating: 4.9
  },
  {
    id: 'SPOT-4',
    name: 'The Coffee House Landmark 81',
    address: 'Tầng trệt Landmark 81, 720A Điện Biên Phủ, P. 22, Q. Bình Thạnh, TP. HCM',
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    spotType: 'COFFEE',
    hours: '07:00 - 22:30',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    features: ['CCTV an ninh 360°', 'Bảo vệ Vincom', 'Bàn kiểm tra đồ lớn', 'Wifi tốc độ cao', 'Hầm xe rộng'],
    phone: '028 7108 7088',
    rating: 5.0
  },
  {
    id: 'SPOT-5',
    name: 'Bưu điện Trung tâm Đà Nẵng',
    address: '155 Bạch Đằng, P. Thạch Thang, Q. Hải Châu, TP. Đà Nẵng',
    city: 'Đà Nẵng',
    district: 'Hải Châu',
    spotType: 'POST_OFFICE',
    hours: '07:30 - 18:30 (T2 - T7)',
    image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80',
    features: ['CCTV giám sát an ninh', 'Hỗ trợ đóng gói & kiểm định', 'Bảo vệ túc trực'],
    phone: '0236 382 1234',
    rating: 4.8
  },
  {
    id: 'SPOT-6',
    name: 'Trung tâm Thương mại Lotte Mall Tây Hồ',
    address: '272 Võ Chí Công, P. Phú Thượng, Q. Tây Hồ, Hà Nội',
    city: 'Hà Nội',
    district: 'Tây Hồ',
    spotType: 'SUPERMARKET',
    hours: '09:30 - 22:00',
    image: 'https://images.unsplash.com/photo-1567449303078-57ad995bd301?auto=format&fit=crop&w=800&q=80',
    features: ['Hệ thống CCTV hiện đại', 'Sảnh kiểm tra giao dịch', 'Bảo vệ 24/7', 'Bãi đỗ xe không giới hạn'],
    phone: '024 3333 6000',
    rating: 4.9
  }
]

export const SafeSpotsPage: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState<string>('ALL')
  const [selectedType, setSelectedType] = useState<string>('ALL')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedSpot, setSelectedSpot] = useState<ExtendedSpot | null>(null)

  const filteredSpots = safeSpotList.filter((spot) => {
    const matchCity = selectedCity === 'ALL' || spot.city === selectedCity
    const matchType = selectedType === 'ALL' || spot.spotType === selectedType
    const matchSearch =
      searchQuery.trim() === '' ||
      spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      spot.district.toLowerCase().includes(searchQuery.toLowerCase())
    return matchCity && matchType && matchSearch
  })

  return (
    <MainLayout>
      <div className="bg-[#F8F9FF] min-h-screen pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#0B1C30] via-[#004AC6] to-[#712AE2] text-white py-16 px-4 relative overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6FFBBE]/20 border border-[#6FFBBE]/30 text-[#6FFBBE] text-xs font-bold mb-4">
              <ShieldCheck size={16} />
              <span>NEXUS SAFE SPOT NETWORK · 100% GIAO DỊCH AN TOÀN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight mb-4 max-w-2xl">
              Điểm Hẹn Giao Nhận An Toàn <br />
              <span className="text-[#6FFBBE]">Camera 24/7 & Bảo Vệ</span>
            </h1>
            <p className="text-blue-100 text-sm sm:text-base max-w-2xl leading-relaxed mb-8">
              Mạng lưới quán cà phê, bưu điện và địa điểm công cộng đối tác được trang bị camera an ninh, bảo vệ và nguồn điện hỗ trợ người mua & người bán trực tiếp đồng kiểm món đồ trước khi quét mã QR mở khóa giải ngân tiền ký quỹ Escrow.
            </p>

            {/* Quick 3 steps */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl pt-6 border-t border-white/15">
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-white/20 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-[#6FFBBE]">Chọn Safe Spot</h4>
                  <p className="text-xs text-blue-100/80">Đặt lịch hẹn tại điểm an toàn gần bạn khi mua hàng hoặc chốt đàm phán.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-white/20 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-[#6FFBBE]">Gặp & Đồng Kiểm</h4>
                  <p className="text-xs text-blue-100/80">Kiểm tra ngoại hình, công năng máy dưới camera và wifi tốc độ cao.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-white/20 font-bold text-xs flex items-center justify-center flex-shrink-0">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wide text-[#6FFBBE]">Quét QR Giải Ngân</h4>
                  <p className="text-xs text-blue-100/80">Hài lòng thì xuất trình mã QR/PIN cho người bán để hệ thống giải phóng cọc.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
          <div className="bg-white rounded-2xl border border-[#C3C6D7] shadow-lg p-4 sm:p-6 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search input */}
              <div className="relative w-full md:w-96">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737686]" />
                <input
                  type="text"
                  placeholder="Tìm theo tên điểm hẹn, đường, quận..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] placeholder-[#737686] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                />
              </div>

              {/* City filter chips */}
              <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1">
                {['ALL', 'Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng'].map((city) => (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      selectedCity === city
                        ? 'bg-[#004AC6] text-white shadow-xs'
                        : 'bg-[#ECEEF6] text-[#434655] hover:bg-slate-200'
                    }`}
                  >
                    {city === 'ALL' ? 'Toàn quốc' : city}
                  </button>
                ))}
              </div>
            </div>

            {/* Spot Type Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#ECEEF6]">
              {[
                { id: 'ALL', label: 'Tất cả loại điểm hẹn', icon: MapPin },
                { id: 'COFFEE', label: 'Quán Cà Phê Đối Tác', icon: Coffee },
                { id: 'POST_OFFICE', label: 'Bưu Điện VNPost', icon: Building2 },
                { id: 'PUBLIC_CAM', label: 'Camera Công Cộng 24/7', icon: Camera },
                { id: 'SUPERMARKET', label: 'TTTM & Siêu Thị', icon: Building2 }
              ].map((t) => {
                const Icon = t.icon
                const isActive = selectedType === t.id
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedType(t.id)}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'bg-[#DCE9FF] text-[#004AC6] border border-[#004AC6]/30'
                        : 'text-[#434655] hover:bg-slate-100'
                    }`}
                  >
                    <Icon size={14} />
                    <span>{t.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Spot Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-[#0B1C30]">
              Danh sách điểm hẹn an toàn ({filteredSpots.length} địa điểm)
            </h2>
            <span className="text-xs text-[#737686]">Được bảo trợ bởi Nexus Smart Escrow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-2xl border border-[#C3C6D7] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
              >
                {/* Spot Image */}
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#0B1C30]/85 backdrop-blur-xs text-white text-[11px] font-bold">
                    <Camera size={12} className="text-[#6FFBBE]" />
                    <span>CCTV 24/7</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#004AC6] text-[11px] font-bold">
                    ⭐ {spot.rating}
                  </div>
                  <div className="absolute bottom-3 left-3 px-2.5 py-0.5 rounded-md bg-[#004AC6] text-white text-[10px] font-bold uppercase tracking-wider">
                    {spot.city}
                  </div>
                </div>

                {/* Spot Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-bold text-base text-[#0B1C30] group-hover:text-[#004AC6] transition-colors mb-1">
                      {spot.name}
                    </h3>
                    <p className="text-xs text-[#737686] flex items-start gap-1.5 line-clamp-2">
                      <MapPin size={14} className="text-[#004AC6] flex-shrink-0 mt-0.5" />
                      <span>{spot.address}</span>
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#ECEEF6] text-xs">
                    <div className="flex items-center gap-1.5 text-[#434655]">
                      <Clock size={13} className="text-[#737686]" />
                      <span>Giờ mở cửa: <b>{spot.hours}</b></span>
                    </div>

                    {/* Features badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {spot.features.slice(0, 3).map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#DCE9FF]/50 text-[#004AC6] text-[10px] font-medium"
                        >
                          <CheckCircle2 size={10} /> {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedSpot(spot)}
                      className="flex-1 py-2 rounded-xl bg-[#004AC6] hover:bg-[#003899] text-white text-xs font-bold text-center transition-colors cursor-pointer"
                    >
                      Xem chi tiết & Hẹn gặp
                    </button>
                    <Link
                      to={`/checkout?safeSpot=${spot.id}`}
                      className="px-3 py-2 rounded-xl border border-[#C3C6D7] hover:bg-slate-50 text-[#0B1C30] text-xs font-semibold transition-colors"
                      title="Sử dụng điểm này khi đặt mua"
                    >
                      Dùng cho đơn hàng
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spot Detail Modal */}
        {selectedSpot && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#C3C6D7] animate-in fade-in zoom-in-95 duration-200">
              <div className="relative h-48 bg-slate-100">
                <img src={selectedSpot.image} alt={selectedSpot.name} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => setSelectedSpot(null)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#6FFBBE] text-[#0B1C30] text-xs font-black">
                  CCTV CAMERA 24/7 VERIFIED
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-lg font-black text-[#0B1C30]">{selectedSpot.name}</h3>
                  <p className="text-xs text-[#737686] flex items-start gap-1.5 mt-1">
                    <MapPin size={14} className="text-[#004AC6] flex-shrink-0 mt-0.5" />
                    <span>{selectedSpot.address}</span>
                  </p>
                </div>

                <div className="bg-[#F8F9FF] p-3.5 rounded-xl border border-[#C3C6D7]/60 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[#737686]">Thời gian mở cửa:</span>
                    <b className="text-[#0B1C30]">{selectedSpot.hours}</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737686]">Hotline hỗ trợ:</span>
                    <b className="text-[#004AC6]">{selectedSpot.phone}</b>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#737686]">Đánh giá an toàn:</span>
                    <b className="text-[#007D55]">⭐⭐⭐⭐⭐ {selectedSpot.rating}/5.0</b>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#434655] mb-2">
                    Tiện ích & Quy chuẩn an toàn:
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {selectedSpot.features.map((f, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[#0B1C30]">
                        <CheckCircle2 size={14} className="text-[#007D55]" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#ECEEF6] flex gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Đã lưu ${selectedSpot.name} làm điểm hẹn ưu tiên của bạn!`)
                      setSelectedSpot(null)
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-[#004AC6] hover:bg-[#003899] text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Chọn làm điểm hẹn mặc định
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedSpot(null)}
                    className="px-4 py-2.5 rounded-xl border border-[#C3C6D7] text-xs font-semibold text-[#434655] hover:bg-slate-50"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
