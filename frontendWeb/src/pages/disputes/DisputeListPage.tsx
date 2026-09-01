import React from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, ChevronRight, ShieldCheck, Plus } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockDisputes, formatVND } from '../../mock/mockData'

export const DisputeListPage: React.FC = () => {
  return (
    <UserLayout title="Khiếu Nại & Tranh Chấp Escrow (Domain 8)">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Khoản tiền ký quỹ sẽ được giữ an toàn trong lúc Moderator hòa giải tranh chấp.
        </p>
        <Link to="/disputes/new" className="primary-button" style={{ padding: '8px 16px', fontSize: 13 }}>
          <Plus size={15} /> Mở khiếu nại mới
        </Link>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {mockDisputes.map((dsp) => (
          <Link
            key={dsp.id}
            to={`/disputes/${dsp.id}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              padding: '18px 20px',
              transition: 'transform 0.15s'
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: '50%',
                background: '#fbeee8',
                color: 'var(--danger)',
                display: 'grid',
                placeItems: 'center',
                flexShrink: 0
              }}
            >
              <AlertTriangle size={20} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b>#{dsp.id}</b>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                  · Đơn hàng #{dsp.orderCode} · {dsp.createdAt}
                </span>
              </div>
              <h3 style={{ fontSize: 15, margin: '4px 0 2px' }}>{dsp.reason}</h3>
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
                Người mua: {dsp.buyerName} ↔ Người bán: {dsp.sellerName}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <strong style={{ color: 'var(--primary)', fontSize: 15 }}>
                {formatVND(dsp.amount)}
              </strong>
              <span className="status" style={{ background: '#fdf2e2', color: '#9c6827' }}>
                {dsp.status === 'UNDER_REVIEW'
                  ? 'Moderator đang xem xét'
                  : dsp.status === 'RESOLVED_REFUND_BUYER'
                  ? 'Đã hoàn tiền cho người mua'
                  : dsp.status}
              </span>
            </div>

            <ChevronRight size={18} color="var(--muted-foreground)" />
          </Link>
        ))}
      </div>
    </UserLayout>
  )
}
