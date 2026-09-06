import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, RotateCcw } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import { mockAuctions, formatVND } from '../../mock/mockData'

export const AuctionManagementPage: React.FC = () => {
  return (
    <AdminLayout title="Quản Lý Phiên Đấu Giá Trực Tuyến (Domain 4)">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <p style={{ color: 'var(--muted-foreground)', fontSize: 13, margin: 0 }}>
          Theo dõi tiến trình đấu giá thời gian thực, người thắng cuộc và lịch sử các bước giá.
        </p>
        <Link to="/admin/reauction" className="outline-button">
          <RotateCcw size={15} /> Phiên cần đấu giá lại (Re-auction)
        </Link>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Mã phiên & Sản phẩm</th>
              <th>Người mở phiên</th>
              <th>Giá khởi điểm</th>
              <th>Giá hiện tại</th>
              <th>Lượt đấu</th>
              <th>Người dẫn đầu / Thắng</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {mockAuctions.map((auc) => (
              <tr key={auc.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <img
                      src={auc.productImage}
                      alt={auc.productTitle}
                      style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 4 }}
                    />
                    <div>
                      <b>{auc.productTitle}</b>
                      <small>#{auc.id}</small>
                    </div>
                  </div>
                </td>
                <td>{auc.sellerName}</td>
                <td>{formatVND(auc.startPrice)}</td>
                <td style={{ color: 'var(--primary)', fontWeight: 700 }}>
                  {formatVND(auc.currentPrice)}
                </td>
                <td>{auc.bidsCount} lượt</td>
                <td>
                  <b>{auc.winnerName || 'Chưa xác định'}</b>
                </td>
                <td>
                  <span className="admin-status good">
                    {auc.status === 'ONGOING' ? 'Đang diễn ra' : auc.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  )
}
