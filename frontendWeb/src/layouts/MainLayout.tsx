import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/common/Header'
import { Footer } from '../components/common/Footer'
import { AIChatWidget } from '../components/ai/AIChatWidget'

export const MainLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1 }}>
        {children || <Outlet />}
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  )
}
