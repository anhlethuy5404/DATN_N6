import React, { useState } from 'react'
import { Settings, Check, ShieldCheck } from 'lucide-react'
import { AdminLayout } from '../../layouts/AdminLayout'

export const SystemSettingsPage: React.FC = () => {
  const [siteName, setSiteName] = useState('Mộc Marketplace')
  const [supportEmail, setSupportEmail] = useState('support@moc.vn')
  const [autoApprove, setAutoApprove] = useState('OFF')
  const [maintenanceMode, setMaintenanceMode] = useState('OFF')
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <AdminLayout title="Cài Đặt Cấu Hình Hệ Thống">
      <div style={{ maxWidth: 680 }}>
        <div className="form-card">
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Tên sàn thương mại điện tử
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Email nhận thông báo tranh chấp & hỗ trợ
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                required
              />
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Tự động duyệt bài đăng (Auto Moderation AI)
              <select value={autoApprove} onChange={(e) => setAutoApprove(e.target.value)}>
                <option value="OFF">Tắt (100% bài đăng phải qua Moderator duyệt)</option>
                <option value="TRUST_ONLY">Bật cho người bán Trust Score &gt; 95%</option>
                <option value="ON">Bật toàn bộ</option>
              </select>
            </label>

            <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
              Chế độ bảo trì hệ thống
              <select value={maintenanceMode} onChange={(e) => setMaintenanceMode(e.target.value)}>
                <option value="OFF">Tắt (Hệ thống hoạt động bình thường)</option>
                <option value="ON">Bật (Chỉ Admin mới có thể truy cập)</option>
              </select>
            </label>

            {saved && (
              <div className="bid-message success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Check size={16} /> Đã lưu các thiết lập hệ thống!
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
              <button type="submit" className="primary-button">
                Lưu cấu hình hệ thống
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  )
}
