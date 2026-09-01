import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { ShieldCheck } from 'lucide-react'

export const AuthLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--background)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '30px 20px'
      }}
    >
      <div style={{ marginBottom: 24, textAlign: 'center' }}>
        <Link to="/" className="brand" style={{ justifyContent: 'center' }}>
          <span className="brand-mark">m</span>
          <span>mộc</span>
        </Link>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginTop: 6 }}>
          Nền tảng giao dịch, đấu giá và trao đổi đồ cũ an tâm
        </p>
      </div>

      <div
        style={{
          width: '100%',
          maxWidth: 440,
          background: 'var(--card)',
          border: '1px solid var(--border)',
          borderRadius: 8,
          padding: '32px 28px',
          boxShadow: '0 12px 30px rgba(41, 39, 36, 0.05)'
        }}
      >
        {children || <Outlet />}
      </div>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--muted-foreground)' }}>
        <ShieldCheck size={14} color="#356b41" /> Được bảo vệ bởi Mộc Escrow và mã hóa an toàn
      </div>
    </div>
  )
}
