import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check, ArrowLeft } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { useAuth } from '../../contexts/AuthContext'

export const EditProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { currentUser } = useAuth()
  const [fullName, setFullName] = useState(currentUser.fullName)
  const [phone, setPhone] = useState(currentUser.phoneNumber || '0912 345 678')
  const [address, setAddress] = useState('12 Trần Thái Tông, Cầu Giấy, Hà Nội')
  const [saved, setSaved] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => {
      navigate('/profile')
    }, 1000)
  }

  return (
    <UserLayout title="Chỉnh Sửa Thông Tin Cá Nhân">
      <div style={{ maxWidth: 640 }}>
        <Link to="/profile" className="danger-link" style={{ color: 'var(--primary)', marginBottom: 16 }}>
          <ArrowLeft size={15} /> Quay lại Hồ sơ
        </Link>

        <div className="form-card">
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Họ và tên
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Email tài khoản (không thể thay đổi)
              <input
                type="email"
                value={currentUser.email}
                disabled
                style={{ opacity: 0.6, cursor: 'not-allowed' }}
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Số điện thoại liên hệ
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Địa chỉ giao nhận mặc định
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </label>

            {saved && (
              <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} /> Đã cập nhật hồ sơ thành công!
              </div>
            )}

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
              <Link to="/profile" className="secondary-button">
                Hủy
              </Link>
              <button type="submit" className="primary-button">
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  )
}
