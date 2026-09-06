import React from 'react'
import { BarChart3, TrendingUp, CheckCircle, Clock } from 'lucide-react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts'
import { mockPerformanceData } from '../../mock/mockData'

export const ModeratorStatisticsPage: React.FC = () => {
  return (
    <ModeratorLayout title="Thống Kê Hiệu Suất Kiểm Duyệt">
      <div className="admin-stat-grid">
        <div className="admin-stat accent">
          <small>Thời gian phản hồi trung bình</small>
          <strong>18 phút</strong>
          <em>Nhanh hơn 35% so với tháng trước</em>
        </div>

        <div className="admin-stat">
          <small>Tỷ lệ duyệt đúng hạn</small>
          <strong>96.8%</strong>
          <em>Mục tiêu KPI sàn: 95%</em>
        </div>

        <div className="admin-stat">
          <small>Tổng mục đã duyệt tháng này</small>
          <strong>1.482</strong>
          <em>Sản phẩm, tranh chấp, eKYC</em>
        </div>

        <div className="admin-stat">
          <small>Tỷ lệ tranh chấp tái phát</small>
          <strong>1.2%</strong>
          <em>Mức an toàn tuyệt đối</em>
        </div>
      </div>

      <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 24, marginTop: 20 }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, marginBottom: 16 }}>
          Biểu Đồ Khối Lượng Kiểm Duyệt Theo Ngày
        </h3>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="products" name="Sản phẩm" stroke="#285d88" strokeWidth={3} />
              <Line type="monotone" dataKey="reports" name="Báo cáo" stroke="#c5573e" strokeWidth={2} />
              <Line type="monotone" dataKey="disputes" name="Tranh chấp" stroke="#d8a66b" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </ModeratorLayout>
  )
}
