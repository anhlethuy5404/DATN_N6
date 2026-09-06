import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { AuthLayout } from '../../layouts/AuthLayout'

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, margin: '0 0 6px' }}>
          Quên Mật Khẩu
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Nhập email đăng ký để nhận liên kết đặt lại mật khẩu
        </p>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '16px 0' }}>
          <Check size={40} color="#356b41" style={{ margin: '0 auto 12px' }} />
          <p style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
            Liên kết khôi phục đã được gửi vào <strong>{email}</strong>. Vui lòng kiểm tra hộp thư của bạn.
          </p>
          <Link to="/auth/login" className="primary-button full-button" style={{ marginTop: 16 }}>
            Quay lại Đăng nhập
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
            Email đăng ký
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="name@example.com"
              style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
            />
          </label>

          <button type="submit" className="primary-button full-button" style={{ padding: 12 }}>
            Gửi email khôi phục
          </button>

          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 13 }}>
            <Link to="/auth/login" style={{ color: 'var(--primary)' }}>
              ← Quay lại Đăng nhập
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
