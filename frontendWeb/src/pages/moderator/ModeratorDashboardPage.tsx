import React from 'react'
import { Link } from 'react-router-dom'
import {
  PackageCheck,
  ShieldAlert,
  AlertTriangle,
  FileCheck2,
  Check,
  BarChart3,
  ArrowRight
} from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { mockPerformanceData } from '../../mock/mockData'

export const ModeratorDashboardPage: React.FC = () => {
  return (
    <ModeratorLayout title="Tổng Quan Trung Tâm Kiểm Duyệt">
      {/* Metric Cards */}
      <div className="admin-stat-grid">
        <div className="admin-stat accent">
          <span className="admin-stat-icon">
            <PackageCheck size={18} />
          </span>
          <small>Sản phẩm chờ duyệt</small>
          <strong>24</strong>
          <em>+6 tin mới hôm nay</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <ShieldAlert size={18} />
          </span>
          <small>Tranh chấp cần hòa giải</small>
          <strong>8</strong>
          <em>2 đơn ưu tiên xử lý gấp</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <AlertTriangle size={18} />
          </span>
          <small>Báo cáo vi phạm mới</small>
          <strong>17</strong>
          <em>5 nghi vấn hàng giả</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <FileCheck2 size={18} />
          </span>
          <small>Xác minh eKYC CCCD</small>
          <strong>12</strong>
          <em>Chờ đối chiếu ảnh chụp</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <Check size={18} />
          </span>
          <small>Đã duyệt hôm nay</small>
          <strong>46</strong>
          <em>92% mục tiêu ca trực</em>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Urgent Moderation Queue */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="eyebrow" style={{ color: '#285d88' }}>
                Hàng đợi ưu tiên
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '4px 0 0' }}>
                Cần Xử Lý Ngay
              </h2>
            </div>
            <Link to="/moderator/products" className="danger-link" style={{ color: '#285d88', fontSize: 12 }}>
              Xem tất cả →
            </Link>
          </div>

          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Người bán</th>
                  <th>Hình thức</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <b>Máy ảnh Fujifilm X-T30 II</b>
                    <small>#MOD-1042</small>
                  </td>
                  <td>Minh Anh (98%)</td>
                  <td>Mua bán</td>
                  <td>
                    <span className="admin-status wait">Chờ duyệt</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Đồng hồ Seiko 5 automatic</b>
                    <small>#MOD-1041</small>
                  </td>
                  <td>Huy Vintage (95%)</td>
                  <td>Đấu giá</td>
                  <td>
                    <span className="admin-status wait">Chờ duyệt</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>Ghế lounge da nâu vintage</b>
                    <small>#MOD-1035</small>
                  </td>
                  <td>Nhà của Mây (100%)</td>
                  <td>Mua bán</td>
                  <td>
                    <span className="admin-status good">Đã duyệt</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Weekly Chart */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="eyebrow" style={{ color: '#285d88' }}>
                Hiệu suất tuần
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 22, margin: '4px 0 0' }}>
                Số Mục Đã Duyệt
              </h2>
            </div>
            <BarChart3 size={20} color="#285d88" />
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 12 }}>
            <strong style={{ fontFamily: 'var(--font-serif)', fontSize: 36 }}>284</strong>
            <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>mục đã hoàn tất trong tuần</span>
          </div>

          <div style={{ height: 160 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockPerformanceData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <Tooltip />
                <Bar dataKey="products" fill="#285d88" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </ModeratorLayout>
  )
}
