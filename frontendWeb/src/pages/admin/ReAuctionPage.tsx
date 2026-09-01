import React, { useState } from 'react'
import { RotateCcw, Check, AlertCircle } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { formatVND } from '../../mock/mockData'

export const ReAuctionPage: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: 'AUC-280',
      product: 'Đồng hồ cơ vintage Thụy Sĩ',
      reason: 'Người thắng không thanh toán trong 24h quy định',
      reCount: 1,
      maxRe: 3,
      startPrice: 3500000
    },
    {
      id: 'AUC-275',
      product: 'Máy ảnh film Canon AE-1 Program',
      reason: 'Hủy đơn do người thắng từ chối nhận bưu kiện',
      reCount: 0,
      maxRe: 3,
      startPrice: 2800000
    }
  ])

  const handleTriggerReAuction = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
    alert(`Đã tự động khởi động lại phiên đấu giá #${id} với thông báo gửi đến người bán!`)
  }

  return (
    <AdminLayout title="Đấu Giá Lại (Re-Auction Domain 4)">
      <div style={{ marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
          Khi người thắng đấu giá không thanh toán trong 24h hoặc từ chối nhận hàng, phiên đấu giá sẽ được chuyển vào hàng đợi tái mở phiên (tối đa 3 lần theo schema DB).
        </p>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã phiên</th>
              <th>Sản phẩm</th>
              <th>Lý do đấu giá lại</th>
              <th>Số lần đã Re-auction</th>
              <th>Giá khởi điểm tái mở</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it) => (
              <tr key={it.id}>
                <td>
                  <b>#{it.id}</b>
                </td>
                <td>
                  <b>{it.product}</b>
                </td>
                <td>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a93c2c', fontSize: 12 }}>
                    <AlertCircle size={14} /> {it.reason}
                  </span>
                </td>
                <td>
                  <b>{it.reCount}</b> / {it.maxRe} lần
                </td>
                <td style={{ color: 'var(--primary)', fontWeight: 600 }}>
                  {formatVND(it.startPrice)}
                </td>
                <td>
                  <button
                    className="primary-button"
                    style={{ padding: '6px 12px', fontSize: 11 }}
                    onClick={() => handleTriggerReAuction(it.id)}
                  >
                    <RotateCcw size={13} /> Mở lại phiên ngay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
