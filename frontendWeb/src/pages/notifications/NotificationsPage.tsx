import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Check, Trash2, Gavel, ShoppingBag, AlertCircle } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockNotifications } from '../../mock/mockData'
import { Notification } from '../../types'

export const NotificationsPage: React.FC = () => {
  const [notifs, setNotifs] = useState<Notification[]>(mockNotifications)

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })))
  }

  const deleteNotif = (id: string) => {
    setNotifs((prev) => prev.filter((n) => n.id !== id))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'OUTBID':
      case 'AUCTION_WON':
        return <Gavel size={18} color="var(--primary)" />
      case 'ORDER_UPDATED':
        return <ShoppingBag size={18} color="#356b41" />
      default:
        return <AlertCircle size={18} color="#8a523b" />
    }
  }

  return (
    <UserLayout title="Thông Báo Hệ Thống (Domain 9)">
      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, paddingBottom: 14, borderBottom: '1px solid var(--border)' }}>
          <span style={{ fontSize: 13, color: 'var(--muted-foreground)' }}>
            Bạn có <strong>{notifs.filter((n) => !n.isRead).length}</strong> thông báo chưa đọc
          </span>
          <button
            className="secondary-button"
            style={{ fontSize: 12, padding: '6px 14px' }}
            onClick={markAllRead}
          >
            <Check size={14} /> Đánh dấu tất cả đã đọc
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {notifs.map((n) => (
            <div
              key={n.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 16,
                padding: '16px',
                borderRadius: 6,
                border: '1px solid var(--border)',
                background: n.isRead ? 'var(--card)' : '#fefaf7'
              }}
            >
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'var(--muted)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}
              >
                {getIcon(n.type)}
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <b style={{ fontSize: 14, color: n.isRead ? 'var(--foreground)' : 'var(--primary)' }}>
                    {n.title}
                  </b>
                  <span style={{ fontSize: 11, color: 'var(--muted-foreground)' }}>
                    {n.createdAt}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: 'var(--muted-foreground)' }}>
                  {n.content}
                </p>
              </div>

              <button
                style={{ border: 0, background: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', padding: 4 }}
                onClick={() => deleteNotif(n.id)}
                aria-label="Xóa"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </UserLayout>
  )
}
