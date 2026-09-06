import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockOrders, formatVND } from '../../mock/mockData'
import { OrderStatus } from '../../types'

export const OrderListPage: React.FC = () => {
  const [filter, setFilter] = useState<'ALL' | OrderStatus>('ALL')

  const filtered =
    filter === 'ALL'
      ? mockOrders
      : mockOrders.filter((o) => o.status === filter)

  return (
    <UserLayout title="Đơn Hàng & Ký Quỹ Escrow">
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: '0 0 16px' }}>
          Tất cả các giao dịch đều qua quy trình bảo vệ ký quỹ Mộc Escrow.
        </p>

        {/* Tab Filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
          {[
            { label: 'Tất cả đơn', value: 'ALL' },
            { label: 'Đang giao hàng', value: 'SHIPPING' },
            { label: 'Hoàn tất', value: 'COMPLETED' },
            { label: 'Đang tranh chấp', value: 'DISPUTING' }
          ].map((tab) => (
            <button
              key={tab.value}
              className={`secondary-button ${filter === tab.value ? 'active' : ''}`}
              style={filter === tab.value ? { background: '#292724', color: '#fff' } : {}}
              onClick={() => setFilter(tab.value as any)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {filtered.map((order) => (
          <Link
            key={order.id}
            to={`/orders/${order.id}`}
            className="order-row"
          >
            <div className="order-icon">
              <ShoppingBag size={22} />
            </div>

            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <b>#{order.orderCode}</b>
                <small style={{ color: 'var(--muted-foreground)' }}>· {order.createdAt}</small>
              </div>
              <h3 style={{ fontSize: 15, margin: '4px 0 2px' }}>{order.productTitle}</h3>
              <p style={{ fontSize: 12, color: 'var(--muted-foreground)', margin: 0 }}>
                Người bán: {order.sellerName} · Điểm uy tín: {order.sellerTrust}%
              </p>
            </div>

            <div className="order-end">
              <strong style={{ fontSize: 16, color: 'var(--primary)' }}>
                {formatVND(order.totalAmount)}
              </strong>
              <span className={`status status-${order.status}`}>
                {order.status === 'SHIPPING'
                  ? 'Đang giao hàng'
                  : order.status === 'COMPLETED'
                  ? 'Đã hoàn tất'
                  : order.status === 'DISPUTING'
                  ? 'Đang khiếu nại'
                  : order.status}
              </span>
            </div>

            <ChevronRight size={18} color="var(--muted-foreground)" />
          </Link>
        ))}
      </div>
    </UserLayout>
  )
}
