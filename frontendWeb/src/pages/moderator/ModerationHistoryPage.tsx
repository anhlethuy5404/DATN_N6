import React from 'react'
import { ModeratorLayout } from '../../layouts/ModeratorLayout'

export const ModerationHistoryPage: React.FC = () => {
  const history = [
    { action: 'Phê duyệt sản phẩm', target: 'Ghế lounge da nâu vintage (#MOD-1035)', user: 'Nhà của Mây', time: 'Hôm nay, 10:42', result: 'Đã duyệt' },
    { action: 'Yêu cầu bổ sung chứng cứ', target: 'Tranh chấp đơn hàng #MOC-1874', user: 'Minh Anh', time: 'Hôm nay, 09:28', result: 'Đang chờ phản hồi' },
    { action: 'Đóng và gỡ bỏ bài đăng', target: 'Đồng hồ nghi vấn hàng nhái (#MOD-1012)', user: 'dealhot247', time: 'Hôm qua, 16:05', result: 'Đã xử phạt' },
    { action: 'Duyệt eKYC CCCD cấp độ 3', target: 'Lê Minh Anh (#VER-309)', user: 'Minh Anh', time: '05/09/2026', result: 'Thành công' }
  ]

  return (
    <ModeratorLayout title="Lịch Sử Thao Tác Kiểm Duyệt">
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Hành động</th>
              <th>Đối tượng xử lý</th>
              <th>Người dùng liên quan</th>
              <th>Thời gian</th>
              <th>Kết quả ghi nhận</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={i}>
                <td>
                  <b>{h.action}</b>
                </td>
                <td>{h.target}</td>
                <td>{h.user}</td>
                <td style={{ color: 'var(--muted-foreground)', fontSize: 12 }}>{h.time}</td>
                <td>
                  <span className="admin-status good">{h.result}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ModeratorLayout>
  )
}
