import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AuthLayout } from '../../layouts/AuthLayout'

export const ResetPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setDone(true)
    setTimeout(() => {
      navigate('/auth/login')
    }, 1200)
  }

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '0 0 6px' }}>
          Đặt Lại Mật Khẩu
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>
      </div>

      {done ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Check size={40} color="#356b41" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 13, color: '#356b41', fontWeight: 600 }}>
            Đặt lại mật khẩu thành công! Đang chuyển hướng đến đăng nhập...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
            Mật khẩu mới
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
            Xác nhận mật khẩu mới
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
            />
          </label>

          <button type="submit" className="primary-button full-button" style={{ padding: 12 }}>
            Xác nhận mật khẩu mới
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
