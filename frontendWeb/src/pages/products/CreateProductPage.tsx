import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ImagePlus,
  ArrowRight,
  Check,
  Sparkles,
  Gavel,
  Tag,
  Gift,
  RefreshCw,
  ShieldCheck,
  MapPin,
  Eye,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { ProductCard } from '../../components/product/ProductCard'
import { TransactionType, ProductCondition, Product } from '../../types'
import { mockCategories, mockSafeSpots } from '../../mock/mockData'

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)

  // Form fields
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
  ])
  const [title, setTitle] = useState('Đồng hồ cơ Thụy Sĩ vintage 1978 chính hãng')
  const [category, setCategory] = useState('1')
  const [condition, setCondition] = useState<ProductCondition>('LIKE_NEW')
  const [description, setDescription] = useState('Mặt kính sapphire nguyên bản, máy chạy chuẩn xác sai số +-2s/ngày. Kèm hộp và giấy chứng nhận nguyên gốc.')
  const [type, setType] = useState<TransactionType>('SALE')
  const [price, setPrice] = useState('4.850.000')
  const [stepPrice, setStepPrice] = useState('100.000')
  const [exchangeNote, setExchangeNote] = useState('')
  const [passNote, setPassNote] = useState('')
  const [province, setProvince] = useState('TP. Hồ Chí Minh')
  const [district, setDistrict] = useState('Quận 1')
  const [meetupSpot, setMeetupSpot] = useState(mockSafeSpots[0]?.name || 'TrustBid Safe Hub Q1')

  const handleAddSampleImage = () => {
    setImages((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85'
    ])
  }

  const previewProduct: Product = {
    id: 'preview-new',
    sellerId: 'USR-1001',
    sellerName: 'Alex Rivers',
    sellerTrustScore: 98,
    sellerRating: 4.9,
    categoryId: Number(category),
    categoryName: mockCategories.find((c) => c.id.toString() === category)?.name || 'Đồng hồ & Phụ kiện',
    title: title || 'Tên món đồ của bạn',
    description: description || 'Mô tả chi tiết món đồ...',
    condition,
    transactionType: type,
    status: 'ACTIVE',
    provinceName: province,
    districtName: district,
    viewsCount: 1,
    likesCount: 0,
    images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'],
    primaryImage: images[0] || 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85',
    salePrice: type === 'PASS' ? 0 : Number(price.replace(/\D/g, '')) || 0,
    currentPrice: type === 'AUCTION' ? Number(price.replace(/\D/g, '')) || 0 : undefined,
    startPrice: type === 'AUCTION' ? Number(price.replace(/\D/g, '')) || 0 : undefined,
    stepPrice: type === 'AUCTION' ? Number(stepPrice.replace(/\D/g, '')) || 100000 : undefined,
    preferredExchangeItems: exchangeNote,
    noteForPass: passNote,
    createdAt: 'Hôm nay',
    updatedAt: 'Vừa xong'
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <MainLayout>
      {/* Header */}
      <div className="bg-gradient-to-b from-[#F8F9FF] to-[#ECEEF6] py-8 border-b border-[#C3C6D7]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs text-[#737686] mb-2">
            <Link to="/" className="hover:text-[#004AC6]">Trang chủ</Link>
            <span>/</span>
            <span className="font-semibold text-[#0B1C30]">Đăng tin sản phẩm mới</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#0B1C30] tracking-tight">
                Đăng Món Đồ Lên Sàn Nexus
              </h1>
              <p className="text-xs sm:text-sm text-[#434655] mt-1">
                Hỗ trợ 4 phương thức: Mua bán, Đấu giá Live, Trao đổi và Cho tặng. Tích hợp AI kiểm định.
              </p>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EFEBFF] border border-[#712AE2]/20 text-[#712AE2] text-xs font-bold">
              <Sparkles size={14} />
              <span>AI Auto-Classification</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {submitted ? (
          <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-[#C3C6D7] shadow-lg text-center space-y-4">
            <div className="w-16 h-16 bg-[#EAF3ED] text-[#007D55] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={36} />
            </div>
            <h2 className="text-2xl font-black text-[#0B1C30]">Tin Đăng Đã Được Tiếp Nhận!</h2>
            <p className="text-sm text-[#434655] leading-relaxed">
              Món đồ của bạn đã được đưa vào hệ thống Nexus Escrow và sẵn sàng hiển thị trên sàn giao dịch. Người mua có thể liên hệ hoặc đặt giá thầu ngay.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/products')}
                className="px-6 py-2.5 bg-[#004AC6] hover:bg-[#003899] text-white font-semibold rounded-full text-xs"
              >
                Xem trên chợ
              </button>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-[#0B1C30] font-semibold rounded-full text-xs"
              >
                Đăng thêm món khác
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Form (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Photo & Video Upload with AI badge */}
              <div className="bg-white p-6 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C3C6D7]">
                  <h3 className="text-base font-bold text-[#0B1C30]">Hình ảnh &amp; Video minh họa</h3>
                  <span className="text-xs font-semibold text-[#712AE2] flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>AI Phân loại tự động</span>
                  </span>
                </div>

                <div
                  onClick={handleAddSampleImage}
                  className="border-2 border-dashed border-[#C3C6D7] hover:border-[#004AC6] rounded-2xl p-8 text-center cursor-pointer transition-colors bg-[#F8F9FF] group"
                >
                  <ImagePlus size={36} className="mx-auto text-[#737686] group-hover:text-[#004AC6] transition-colors mb-2" />
                  <p className="text-sm font-semibold text-[#0B1C30]">Kéo thả ảnh vào đây hoặc bấm để chọn ảnh</p>
                  <p className="text-xs text-[#737686] mt-1">Hỗ trợ JPG, PNG, WEBP. Tối đa 10 ảnh (Bấm để thêm ảnh mẫu)</p>
                </div>

                {/* AI Tags Banner */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DCE9FF] border border-[#004AC6]/20 text-xs font-semibold text-[#004AC6]">
                    <Sparkles size={12} className="text-[#712AE2]" />
                    <span>AI nhận diện: Đồng hồ cổ điển</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3ED] border border-[#007D55]/20 text-xs font-semibold text-[#007D55]">
                    <Check size={12} />
                    <span>Tình trạng đề xuất: Mới 95%</span>
                  </div>
                </div>

                {/* Thumbnail Preview strip */}
                <div className="flex items-center gap-3 pt-2">
                  {images.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-xl overflow-hidden border border-[#C3C6D7]">
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-0 inset-x-0 bg-[#004AC6] text-white text-[9px] font-bold text-center py-0.5">
                          Ảnh bìa
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Basic Details */}
              <div className="bg-white p-6 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0B1C30] pb-3 border-b border-[#C3C6D7]">
                  Thông tin món đồ
                </h3>

                <div>
                  <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                    Tiêu đề bài đăng *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="VD: Máy ảnh cơ Leica M3 fullbox..."
                    className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Danh mục sản phẩm
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                    >
                      {mockCategories.map((c) => (
                        <option key={c.id} value={c.id.toString()}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Độ mới (Condition)
                    </label>
                    <select
                      value={condition}
                      onChange={(e) => setCondition(e.target.value as ProductCondition)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                    >
                      <option value="NEW">Mới 100% (Chưa qua sử dụng)</option>
                      <option value="LIKE_NEW">Như mới 99%</option>
                      <option value="USED_GOOD">Đã qua sử dụng (Tốt)</option>
                      <option value="USED_FAIR">Có vết xước nhẹ (Khá)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                    Mô tả chi tiết &amp; Nguồn gốc xuất xứ
                  </label>
                  <textarea
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Mô tả năm sản xuất, tình trạng hoạt động, phụ kiện kèm theo..."
                    className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                  />
                </div>
              </div>

              {/* Transaction Mode Selector */}
              <div className="bg-white p-6 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-4">
                <h3 className="text-base font-bold text-[#0B1C30] pb-3 border-b border-[#C3C6D7]">
                  Hình thức giao dịch
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'SALE', label: 'Mua bán cố định', icon: Tag, color: '#004AC6' },
                    { id: 'AUCTION', label: 'Đấu giá Live', icon: Gavel, color: '#BA1A1A' },
                    { id: 'BARTER', label: 'Trao đổi đồ', icon: RefreshCw, color: '#712AE2' },
                    { id: 'PASS', label: 'Pass / Cho tặng', icon: Gift, color: '#007D55' },
                  ].map((m) => {
                    const Icon = m.icon
                    const isSelected = type === m.id
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setType(m.id as TransactionType)}
                        className={`p-3.5 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                          isSelected
                            ? 'border-[#004AC6] bg-[#DCE9FF]/50 shadow-xs'
                            : 'border-[#C3C6D7] bg-[#F8F9FF] hover:bg-slate-100'
                        }`}
                      >
                        <Icon size={20} style={{ color: m.color }} />
                        <span className="text-xs font-bold text-[#0B1C30]">{m.label}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Price / Auction inputs */}
                {type === 'SALE' && (
                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Giá bán niêm yết (VNĐ) *
                    </label>
                    <input
                      type="text"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-base font-bold text-[#004AC6]"
                    />
                  </div>
                )}

                {type === 'AUCTION' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                        Giá khởi điểm (VNĐ) *
                      </label>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-base font-bold text-[#BA1A1A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                        Bước giá tối thiểu (VNĐ) *
                      </label>
                      <input
                        type="text"
                        value={stepPrice}
                        onChange={(e) => setStepPrice(e.target.value)}
                        className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30]"
                      />
                    </div>
                  </div>
                )}

                {type === 'BARTER' && (
                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Món đồ mong muốn đổi lại
                    </label>
                    <input
                      type="text"
                      value={exchangeNote}
                      onChange={(e) => setExchangeNote(e.target.value)}
                      placeholder="VD: Muốn đổi lấy lens Sony 50mm f/1.8 hoặc bàn phím cơ..."
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30]"
                    />
                  </div>
                )}
              </div>

              {/* Safe Spot Physical Location */}
              <div className="bg-white p-6 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#C3C6D7]">
                  <h3 className="text-base font-bold text-[#0B1C30]">Điểm Hẹn Giao Dịch An Toàn</h3>
                  <span className="text-xs text-[#007D55] font-semibold flex items-center gap-1">
                    <ShieldCheck size={14} />
                    <span>CCTV 24/7 Verified</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Tỉnh / Thành phố
                    </label>
                    <select
                      value={province}
                      onChange={(e) => setProvince(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30]"
                    >
                      <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                      Quận / Huyện
                    </label>
                    <input
                      type="text"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0B1C30] uppercase tracking-wider mb-1.5">
                    Safe Spot Được Đề Xuất
                  </label>
                  <select
                    value={meetupSpot}
                    onChange={(e) => setMeetupSpot(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7] text-sm text-[#0B1C30]"
                  >
                    {mockSafeSpots.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.address})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Right Sticky Preview (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Live Preview Title */}
                <div className="bg-white p-5 rounded-2xl border border-[#C3C6D7] shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#C3C6D7]">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#004AC6]">
                      <Eye size={16} />
                      <span>Xem trước hiển thị (Live Preview)</span>
                    </div>
                  </div>

                  <ProductCard product={previewProduct} />

                  {/* AI Valuation callout */}
                  <div className="p-3.5 bg-[#EFEBFF] rounded-xl border border-[#712AE2]/20 text-xs text-[#712AE2] space-y-1">
                    <div className="flex items-center gap-1.5 font-bold">
                      <Sparkles size={14} />
                      <span>Nexus AI Valuation</span>
                    </div>
                    <p className="text-[11px] text-[#434655] leading-relaxed">
                      Mức giá hợp lý cho mẫu đồng hồ vintage này dao động từ <strong>4.500.000 ₫ - 5.200.000 ₫</strong>. Khả năng thanh khoản dự kiến: <strong>Cao</strong>.
                    </p>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#004AC6] hover:bg-[#003899] active:scale-[0.99] text-white font-bold rounded-xl text-sm shadow-md shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
                  >
                    <ShieldCheck size={18} />
                    <span>Đăng Tin &amp; Thẩm Định Escrow</span>
                  </button>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </MainLayout>
  )
}
