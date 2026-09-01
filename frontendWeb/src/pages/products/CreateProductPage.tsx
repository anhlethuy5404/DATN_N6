import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ImagePlus,
  ArrowRight,
  Check,
  X,
  Sparkles,
  Gavel,
  Tag,
  Gift,
  RefreshCw,
  ShieldCheck,
  MapPin
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { ProductCard } from '../../components/product/ProductCard'
import { TransactionType, ProductCondition, Product } from '../../types'
import { mockCategories, mockSafeSpots } from '../../mock/mockData'

export const CreateProductPage: React.FC = () => {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)

  // Form fields
  const [images, setImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85'
  ])
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('1')
  const [condition, setCondition] = useState<ProductCondition>('LIKE_NEW')
  const [description, setDescription] = useState('')
  const [type, setType] = useState<TransactionType>('SALE')
  const [price, setPrice] = useState('2.500.000')
  const [stepPrice, setStepPrice] = useState('100.000')
  const [exchangeNote, setExchangeNote] = useState('')
  const [passNote, setPassNote] = useState('')
  const [province, setProvince] = useState('Hà Nội')
  const [district, setDistrict] = useState('Cầu Giấy')
  const [meetupSpot, setMeetupSpot] = useState(mockSafeSpots[0].name)

  const handleAddSampleImage = () => {
    setImages((prev) => [
      ...prev,
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=85'
    ])
  }

  const previewProduct: Product = {
    id: 'preview-new',
    sellerId: 'USR-1001',
    sellerName: 'Minh Anh',
    sellerTrustScore: 98,
    sellerRating: 4.9,
    categoryId: Number(category),
    categoryName: mockCategories.find((c) => c.id.toString() === category)?.name || 'Đồ điện tử',
    title: title || 'Tên món đồ của bạn',
    description: description || 'Mô tả chi tiết món đồ...',
    condition,
    transactionType: type,
    status: 'PENDING_APPROVAL',
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

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <strong>Đăng món đồ mới</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <span className="eyebrow">Chia sẻ câu chuyện & Tìm chủ mới</span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 38, margin: '6px 0' }}>
              Đăng Một Món Đồ
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 14 }}>
              Hỗ trợ 4 hình thức: Mua bán cố định, Đấu giá thời gian thực, Trao đổi và Cho tặng.
            </p>
          </div>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {['1. Hình ảnh', '2. Thông tin', '3. Hình thức', '4. Giá & Điều kiện', '5. Địa điểm', '6. Xem trước', '7. Gửi duyệt'].map(
            (label, idx) => {
              const stepNum = idx + 1
              const isActive = step === stepNum
              const isDone = step > stepNum
              return (
                <button
                  key={label}
                  className={`${isActive ? 'active' : ''} ${isDone ? 'done' : ''}`}
                  onClick={() => setStep(stepNum)}
                >
                  <span>{isDone ? <Check size={14} /> : stepNum}</span>
                  {label}
                </button>
              )
            }
          )}
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8 }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#e4efe6',
                color: '#397147',
                display: 'grid',
                placeItems: 'center',
                margin: '0 auto 20px'
              }}
            >
              <Check size={36} />
            </div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32 }}>
              Món đồ đã được gửi kiểm duyệt!
            </h2>
            <p style={{ color: 'var(--muted-foreground)', maxWidth: 480, margin: '10px auto 24px', fontSize: 14 }}>
              Đội ngũ Moderator của Mộc sẽ duyệt tin đăng trong vòng 1-2 giờ để đảm bảo an toàn cho cộng đồng.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <Link to="/dashboard" className="primary-button">
                Về trang cá nhân
              </Link>
              <button
                className="outline-button"
                onClick={() => {
                  setSubmitted(false)
                  setStep(1)
                }}
              >
                Đăng thêm món đồ khác
              </button>
            </div>
          </div>
        ) : (
          <div className="create-layout">
            <div className="create-form">
              {/* Step 1: Images */}
              {step === 1 && (
                <div>
                  <h2>Thêm hình ảnh món đồ</h2>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 18 }}>
                    Chụp rõ các góc cạnh, tem mác và chi tiết vết xước (nếu có) để tăng tính minh bạch.
                  </p>

                  <div className="dropzone" onClick={handleAddSampleImage}>
                    <ImagePlus size={36} color="var(--primary)" />
                    <b>Kéo thả hoặc bấm để tải ảnh lên</b>
                    <span>Hỗ trợ JPG, PNG, WebP (Tối đa 10 ảnh, mỗi ảnh ≤ 10MB)</span>
                  </div>

                  <div className="image-previews">
                    {images.map((img, i) => (
                      <div key={i}>
                        <img src={img} alt="preview" />
                        <button
                          type="button"
                          onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Info */}
              {step === 2 && (
                <div>
                  <h2>Thông tin cơ bản</h2>
                  <div className="form-grid">
                    <label className="wide-field">
                      Tiêu đề bài đăng
                      <input
                        type="text"
                        placeholder="Ví dụ: Đồng hồ Seiko 5 Automatic vintage chính hãng Nhật Bản"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </label>

                    <label>
                      Danh mục sản phẩm
                      <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {mockCategories.map((c) => (
                          <option key={c.id} value={c.id.toString()}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label>
                      Tình trạng món đồ
                      <select value={condition} onChange={(e) => setCondition(e.target.value as ProductCondition)}>
                        <option value="NEW">Mới 100% nguyên hộp</option>
                        <option value="LIKE_NEW">Như mới (99%, ít sử dụng)</option>
                        <option value="USED_GOOD">Đã qua sử dụng tốt (Hoạt động hoàn hảo)</option>
                        <option value="USED_FAIR">Có trầy xước theo thời gian</option>
                      </select>
                    </label>

                    <label className="wide-field">
                      Mô tả chi tiết & Câu chuyện món đồ
                      <textarea
                        rows={6}
                        placeholder="Nêu rõ xuất xứ, tình trạng máy, lý do nhượng lại, phụ kiện đi kèm..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </label>
                  </div>
                </div>
              )}

              {/* Step 3: Transaction Type */}
              {step === 3 && (
                <div>
                  <h2>Chọn hình thức giao dịch</h2>
                  <div className="transaction-options">
                    <button
                      type="button"
                      className={type === 'SALE' ? 'active' : ''}
                      onClick={() => setType('SALE')}
                    >
                      <Tag size={24} color="var(--primary)" />
                      <b>Mua bán cố định (SALE)</b>
                      <small>Đặt mức giá cố định, có thể cho phép người mua trả giá qua khung chat.</small>
                    </button>

                    <button
                      type="button"
                      className={type === 'AUCTION' ? 'active' : ''}
                      onClick={() => setType('AUCTION')}
                    >
                      <Gavel size={24} color="var(--primary)" />
                      <b>Đấu giá thời gian thực (AUCTION)</b>
                      <small>Cộng đồng tự trả giá, có giá khởi điểm và bước giá minh bạch.</small>
                    </button>

                    <button
                      type="button"
                      className={type === 'BARTER' ? 'active' : ''}
                      onClick={() => setType('BARTER')}
                    >
                      <RefreshCw size={24} color="#8a523b" />
                      <b>Trao đổi đồ (BARTER)</b>
                      <small>Đổi món đồ này lấy món đồ khác tương đương bạn đang tìm kiếm.</small>
                    </button>

                    <button
                      type="button"
                      className={type === 'PASS' ? 'active' : ''}
                      onClick={() => setType('PASS')}
                    >
                      <Gift size={24} color="#356b41" />
                      <b>Cho tặng miễn phí (PASS)</b>
                      <small>Trao tặng món đồ hữu ích không dùng nữa cho người thực sự cần.</small>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Pricing */}
              {step === 4 && (
                <div>
                  <h2>Thiết lập giá & Điều kiện</h2>
                  <div className="form-grid">
                    {type !== 'PASS' && (
                      <label>
                        {type === 'AUCTION' ? 'Giá khởi điểm (₫)' : 'Giá bán mong muốn (₫)'}
                        <input
                          type="text"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </label>
                    )}

                    {type === 'AUCTION' && (
                      <label>
                        Bước giá tối thiểu (₫)
                        <input
                          type="text"
                          value={stepPrice}
                          onChange={(e) => setStepPrice(e.target.value)}
                        />
                      </label>
                    )}

                    {type === 'BARTER' && (
                      <label className="wide-field">
                        Món đồ bạn mong muốn đổi lại
                        <input
                          type="text"
                          placeholder="Ví dụ: Máy ảnh film ngàm M42 hoặc đồng hồ vintage"
                          value={exchangeNote}
                          onChange={(e) => setExchangeNote(e.target.value)}
                        />
                      </label>
                    )}

                    {type === 'PASS' && (
                      <label className="wide-field">
                        Lời nhắn gửi tới người nhận đồ
                        <textarea
                          rows={3}
                          placeholder="Ví dụ: Ưu tiên tân sinh viên hoặc học sinh cần bàn học..."
                          value={passNote}
                          onChange={(e) => setPassNote(e.target.value)}
                        />
                      </label>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Location */}
              {step === 5 && (
                <div>
                  <h2>Khu vực & Điểm hẹn an toàn</h2>
                  <div className="form-grid">
                    <label>
                      Tỉnh / Thành phố
                      <select value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value="Hà Nội">Hà Nội</option>
                        <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                        <option value="Đà Nẵng">Đà Nẵng</option>
                      </select>
                    </label>

                    <label>
                      Quận / Huyện
                      <select value={district} onChange={(e) => setDistrict(e.target.value)}>
                        <option value="Cầu Giấy">Cầu Giấy</option>
                        <option value="Ba Đình">Ba Đình</option>
                        <option value="Đống Đa">Đống Đa</option>
                        <option value="Thanh Khê">Thanh Khê</option>
                        <option value="Quận 1">Quận 1</option>
                      </select>
                    </label>

                    <label className="wide-field">
                      Điểm hẹn an toàn đề xuất (Safe Meetup Spot - Domain 6)
                      <select value={meetupSpot} onChange={(e) => setMeetupSpot(e.target.value)}>
                        {mockSafeSpots.map((spot) => (
                          <option key={spot.id} value={spot.name}>
                            {spot.name} - {spot.address}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </div>
              )}

              {/* Step 6: Preview */}
              {step === 6 && (
                <div>
                  <h2>Xem trước bài đăng</h2>
                  <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 18 }}>
                    Kiểm tra lại hình ảnh và mức giá hiển thị trên sàn trước khi gửi kiểm duyệt.
                  </p>
                  <div style={{ maxWidth: 300 }}>
                    <ProductCard product={previewProduct} />
                  </div>
                </div>
              )}

              {/* Step 7: Confirm */}
              {step === 7 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <ShieldCheck size={50} color="var(--primary)" style={{ margin: '0 auto 16px' }} />
                  <h2>Sẵn sàng gửi kiểm duyệt?</h2>
                  <p style={{ color: 'var(--muted-foreground)', maxWidth: 440, margin: '10px auto 24px', fontSize: 13 }}>
                    Mộc cam kết bảo vệ người dùng, cấm hàng giả, hàng nhái và lừa đảo. Bằng việc nhấn gửi, bạn cam kết món đồ đúng mô tả thực tế.
                  </p>
                </div>
              )}

              {/* Stepper buttons */}
              <div className="create-actions">
                {step > 1 && (
                  <button
                    type="button"
                    className="outline-button"
                    onClick={() => setStep(step - 1)}
                  >
                    Quay lại
                  </button>
                )}
                <span />
                {step < 7 ? (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setStep(step + 1)}
                  >
                    Tiếp theo <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="primary-button"
                    onClick={() => setSubmitted(true)}
                  >
                    Xác nhận gửi bài đăng <Check size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* AI Assistant Right Panel */}
            <aside className="ai-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)' }}>
                <Sparkles size={18} />
                <b>Trợ lý Mộc AI (Domain 9)</b>
              </div>
              <p>
                Công cụ hỗ trợ gợi ý viết tiêu đề thu hút, tối ưu từ khóa mô tả và tham khảo mức giá trung bình của các món đồ tương tự trên thị trường.
              </p>

              <button
                type="button"
                onClick={() => {
                  setTitle('Máy ảnh Fujifilm X-T30 II kèm kit 18-55mm F2.8-4 đẹp 99%')
                  setDescription('Máy ảnh mirrorless cảm biến X-Trans IV 26.1MP, giả lập màu phim đẹp mắt, thích hợp cho du lịch và đường phố. Đầy đủ phụ kiện chính hãng.')
                }}
              >
                <span>✦ Gợi ý tiêu đề & mô tả</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setPrice('15.500.000')
                }}
              >
                <span>✦ Định giá gợi ý thông minh</span>
                <ArrowRight size={14} />
              </button>
            </aside>
          </div>
        )}
      </main>
    </MainLayout>
  )
}
