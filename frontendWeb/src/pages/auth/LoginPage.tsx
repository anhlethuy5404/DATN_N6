import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthLayout } from '../../layouts/AuthLayout'
import { useAuth } from '../../contexts/AuthContext'

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { switchRole } = useAuth()
  const [email, setEmail] = useState('minhanh@example.com')
  const [password, setPassword] = useState('123456')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.includes('admin')) {
      switchRole('ADMIN')
      navigate('/admin')
    } else if (email.includes('mod')) {
      switchRole('MODERATOR')
      navigate('/moderator')
    } else {
      switchRole('USER')
      navigate('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, margin: '0 0 6px' }}>
          Đăng Nhập
        </h1>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Chào mừng bạn trở lại với sàn Mộc
        </p>
      </div>

      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          Email hoặc Tên đăng nhập
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>Mật khẩu</span>
            <Link to="/auth/forgot-password" style={{ color: 'var(--primary)', fontSize: 12 }}>
              Quên mật khẩu?
            </Link>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ border: '1px solid var(--border)', padding: '10px 12px', borderRadius: 6 }}
          />
        </label>

        <button type="submit" className="primary-button full-button" style={{ padding: 12, marginTop: 6 }}>
          Đăng nhập ngay
        </button>

        {/* Quick test role helper */}
        <div style={{ marginTop: 14, padding: 12, background: 'var(--muted)', borderRadius: 6, fontSize: 11, color: 'var(--muted-foreground)' }}>
          <b>Tài khoản kiểm thử nhanh (Demo):</b>
          <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
            <button
              type="button"
              className="secondary-button"
              style={{ fontSize: 11, padding: '4px 8px' }}
              onClick={() => {
                setEmail('minhanh@example.com')
              }}
            >
              User
            </button>
            <button
              type="button"
              className="secondary-button"
              style={{ fontSize: 11, padding: '4px 8px' }}
              onClick={() => {
                setEmail('duc.nguyen@moc.vn')
              }}
            >
              Moderator
            </button>
            <button
              type="button"
              className="secondary-button"
              style={{ fontSize: 11, padding: '4px 8px' }}
              onClick={() => {
                setEmail('admin@moc.vn')
              }}
            >
              Admin
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 14, fontSize: 13 }}>
          <span>Chưa có tài khoản? </span>
          <Link to="/auth/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>
            Đăng ký ngay
          </Link>
        </div>
      </form>
    </AuthLayout>
  )
}
