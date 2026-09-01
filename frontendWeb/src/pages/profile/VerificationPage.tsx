import React, { useState } from 'react'
import { ShieldCheck, Check, Upload, FileText } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'

export const VerificationPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false)
  const [idNumber, setIdNumber] = useState('025096001234')
  const [realName, setRealName] = useState('LÊ MINH ANH')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <UserLayout title="Xác Minh Danh Tính eKYC (Domain 1)">
      {/* Verification Level Banner */}
      <div
        style={{
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: 24,
          marginBottom: 24,
          display: 'flex',
          alignItems: 'center',
          gap: 20
        }}
      >
        <div
          style={{
            width: 58,
            height: 58,
            borderRadius: '50%',
            background: '#e4efe6',
            color: '#356b41',
            display: 'grid',
            placeItems: 'center',
            flexShrink: 0
          }}
        >
          <ShieldCheck size={32} />
        </div>

        <div>
          <span className="eyebrow" style={{ color: '#356b41' }}>
            Cấp độ 3/3 · Đã xác thực cao cấp
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '4px 0 6px' }}>
            Tài khoản đã hoàn tất xác thực CCCD
          </h2>
          <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
            Bạn được hưởng hạn mức giao dịch không giới hạn và được gắn huy hiệu Người bán uy tín.
          </p>
        </div>
      </div>

      {/* 3 Steps of eKYC */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginBottom: 28 }}>
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#d9eadb', color: '#28703e', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>
            ✓
          </span>
          <div>
            <b style={{ fontSize: 13 }}>Cấp độ 1: Cơ bản</b>
            <small style={{ display: 'block', color: 'var(--muted-foreground)' }}>Số điện thoại & Email</small>
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#d9eadb', color: '#28703e', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>
            ✓
          </span>
          <div>
            <b style={{ fontSize: 13 }}>Cấp độ 2: Tài khoản ngân hàng</b>
            <small style={{ display: 'block', color: 'var(--muted-foreground)' }}>Liên kết Vietcombank</small>
          </div>
        </div>

        <div style={{ background: 'var(--card)', border: '2px solid #356b41', borderRadius: 8, padding: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#356b41', color: '#fff', display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 12 }}>
            ✓
          </span>
          <div>
            <b style={{ fontSize: 13, color: '#356b41' }}>Cấp độ 3: eKYC CCCD</b>
            <small style={{ display: 'block', color: 'var(--muted-foreground)' }}>Đã được Moderator phê duyệt</small>
          </div>
        </div>
      </div>

      {/* Document details */}
      <div className="form-card">
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 16 }}>
          Thông tin giấy tờ tùy thân đã lưu
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="form-grid">
            <label>
              Số Căn cước công dân (CCCD)
              <input
                type="text"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                required
              />
            </label>

            <label>
              Họ và tên trên thẻ
              <input
                type="text"
                value={realName}
                onChange={(e) => setRealName(e.target.value)}
                required
              />
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ border: '1px dashed var(--border)', borderRadius: 8, padding: 20, textAlign: 'center', background: 'var(--muted)' }}>
              <FileText size={28} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
              <b style={{ display: 'block', fontSize: 13 }}>Ảnh mặt trước CCCD</b>
              <small style={{ color: 'var(--muted-foreground)' }}>Đã tải lên và mã hóa bảo mật</small>
            </div>

            <div style={{ border: '1px dashed var(--border)', borderRadius: 8, padding: 20, textAlign: 'center', background: 'var(--muted)' }}>
              <FileText size={28} color="var(--primary)" style={{ margin: '0 auto 8px' }} />
              <b style={{ display: 'block', fontSize: 13 }}>Ảnh mặt sau CCCD</b>
              <small style={{ color: 'var(--muted-foreground)' }}>Đã tải lên và mã hóa bảo mật</small>
            </div>
          </div>

          {submitted && (
            <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Check size={16} /> Yêu cầu cập nhật eKYC đã gửi đến hàng đợi xét duyệt của Moderator!
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
            <button type="submit" className="outline-button">
              Cập nhật lại ảnh giấy tờ mới
            </button>
          </div>
        </form>
      </div>
    </UserLayout>
  )
}
