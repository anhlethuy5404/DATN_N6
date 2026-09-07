import React from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  PackageCheck,
  BarChart3,
  Tag,
  ShieldAlert,
  SlidersHorizontal
} from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { mockAdminMetrics, mockPerformanceData } from '../../mock/mockData'

export const AdminDashboardPage: React.FC = () => {
  const pieData = [
    { name: 'Mua bán cố định (SALE)', value: 62 },
    { name: 'Đấu giá (AUCTION)', value: 24 },
    { name: 'Trao đổi & Cho tặng (BARTER/PASS)', value: 14 }
  ]
  const COLORS = ['#004AC6', '#712AE2', '#007D55']

  return (
    <AdminLayout title="Tổng Quan Hệ Thống Nền Tảng Nexus (Admin)">
      {/* Metric Cards */}
      <div className="admin-stat-grid">
        <div className="admin-stat accent">
          <span className="admin-stat-icon">
            <Users size={18} />
          </span>
          <small>Tổng người dùng</small>
          <strong>{mockAdminMetrics.users}</strong>
          <em>+8.4% tháng này</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <PackageCheck size={18} />
          </span>
          <small>Sản phẩm hoạt động</small>
          <strong>{mockAdminMetrics.products}</strong>
          <em>+12.8% tháng này</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <BarChart3 size={18} />
          </span>
          <small>Tổng giá trị GMV</small>
          <strong>{mockAdminMetrics.gmv}</strong>
          <em>+16.2% so với tháng trước</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <Tag size={18} />
          </span>
          <small>Doanh thu phí nền tảng</small>
          <strong>{mockAdminMetrics.revenue}</strong>
          <em>Phí Escrow 1%</em>
        </div>

        <div className="admin-stat">
          <span className="admin-stat-icon">
            <ShieldAlert size={18} />
          </span>
          <small>Tranh chấp mở</small>
          <strong>{mockAdminMetrics.disputes}</strong>
          <em>Đang được hòa giải</em>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 20, marginBottom: 24 }}>
        {/* Line Chart */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div>
              <span className="eyebrow">Tăng trưởng giao dịch</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: '4px 0 0' }}>
                Khối Lượng Sản Phẩm & Giao Dịch Tuần Qua
              </h2>
            </div>
          </div>

          <div style={{ height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="products" name="Sản phẩm mới" stroke="var(--primary)" strokeWidth={3} />
                <Line type="monotone" dataKey="reports" name="Báo cáo" stroke="var(--accent)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, padding: 22 }}>
          <span className="eyebrow">Phân bổ loại hình</span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, margin: '4px 0 16px' }}>
            Tỷ Trọng Giao Dịch
          </h2>

          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={45} outerRadius={70} dataKey="value">
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12, marginTop: 10 }}>
            {pieData.map((item, idx) => (
              <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <i style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[idx], display: 'inline-block' }} />
                  {item.name}
                </span>
                <b>{item.value}%</b>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
