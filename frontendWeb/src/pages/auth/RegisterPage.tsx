import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useAuth } from '../../contexts/AuthContext'

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate()
  const { switchRole } = useAuth()
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    switchRole('USER')
    navigate('/verification')
  }

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: '0 0 6px' }}>
          Tạo Tài Khoản
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Gia nhập cộng đồng giao dịch tử tế Mộc
        </p>
      </div>

      <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          Họ và tên của bạn
          <input
            type="text"
            placeholder="Ví dụ: Lê Minh Anh"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          Địa chỉ Email
          <input
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          Số điện thoại
          <input
            type="tel"
            placeholder="0912 345 678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          Mật khẩu
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <button type="submit" className="primary-button full-button" style={{ padding: 12, marginTop: 6 }}>
          Đăng ký & Tiến hành xác thực eKYC
        </button>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13 }}>
          <span>Đã có tài khoản? </span>
          <Link to="/auth/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Đăng nhập
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
