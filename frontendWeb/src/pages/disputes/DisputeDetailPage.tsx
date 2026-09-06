import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { AlertTriangle, ShieldCheck, Send, Check, Upload } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockDisputes, formatVND } from '../../mock/mockData'

export const DisputeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const dispute = mockDisputes.find((d) => d.id === id) || mockDisputes[0]
  const [reply, setReply] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'Điều phối viên Mộc (Moderator)',
      isMod: true,
      text: 'Chúng tôi đã tiếp nhận khiếu nại tranh chấp đơn hàng này. Khoản tiền 5.600.000 ₫ đang được đóng băng an toàn trong quỹ Escrow. Vui lòng cung cấp thêm ảnh mặt kính và video mở gói hàng.',
      time: 'Hôm qua 14:30'
    },
    {
      sender: 'Minh Anh (Người khiếu nại)',
      isMod: false,
      text: 'Chào ban quản trị, mình đã chụp lại vết nứt cạnh kính và gửi trong mục bằng chứng. Nhờ anh/chị xem xét giúp mình.',
      time: 'Hôm qua 16:15'
    }
  ])

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault()
    if (!reply.trim()) return
    setMessages([
      ...messages,
      { sender: 'Minh Anh (Bạn)', isMod: false, text: reply.trim(), time: 'Vừa xong' }
    ])
    setReply('')
  }

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <Link to="/disputes">Khiếu nại</Link>
          <span>/</span>
          <strong>#{dispute.id}</strong>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <span className="eyebrow" style={{ color: 'var(--danger)' }}>
              <AlertTriangle size={14} /> Hồ sơ tranh chấp Escrow · #{dispute.id}
            </span>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, margin: '6px 0 4px' }}>
              {dispute.reason}
            </h1>
            <p style={{ color: 'var(--muted-foreground)', fontSize: 13 }}>
              Đơn hàng: <strong>#{dispute.orderCode}</strong> · Số tiền tranh chấp:{' '}
              <strong style={{ color: 'var(--primary)' }}>{formatVND(dispute.amount)}</strong>
            </p>
          </div>

          <span className="status" style={{ background: '#fdf2e2', color: '#9c6827', fontSize: 13, padding: '6px 14px' }}>
            Moderator đang hòa giải
          </span>
        </div>

        <div className="transaction-layout">
          <div>
            {/* Resolution Note */}
            {dispute.resolutionNote && (
              <div style={{ background: '#fdf9f4', border: '1px solid #ebdcd0', borderRadius: 8, padding: 18, marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#8a523b', marginBottom: 6 }}>
                  <ShieldCheck size={18} />
                  <b>Ghi chú tiến độ từ Điều phối viên:</b>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--foreground)' }}>
                  {dispute.resolutionNote}
                </p>
              </div>
            )}

            {/* Discussion Thread */}
            <div className="transaction-card" style={{ marginBottom: 20 }}>
              <h2>Trao đổi với Điều phối viên</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, margin: '18px 0' }}>
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    style={{
                      background: msg.isMod ? '#f2f6fa' : 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      padding: 16
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                      <b style={{ fontSize: 13, color: msg.isMod ? '#285d88' : 'var(--foreground)' }}>
                        {msg.sender}
                      </b>
                      <small style={{ color: 'var(--muted-foreground)' }}>{msg.time}</small>
                    </div>
                    <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>{msg.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendReply}>
                <textarea
                  rows={3}
                  placeholder="Nhập phản hồi hoặc bổ sung giải trình..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  style={{ width: '100%', border: '1px solid var(--border)', padding: 12, borderRadius: 6, marginBottom: 10, background: 'var(--background)' }}
                  required
                />
                <button type="submit" className="primary-button">
                  <Send size={14} /> Gửi phản hồi
                </button>
              </form>
            </div>
          </div>

          <aside className="summary-card">
            <h2>Thông tin tranh chấp</h2>
            <div>
              <span>Người mở khiếu nại:</span>
              <b>{dispute.buyerName}</b>
            </div>
            <div>
              <span>Người bán:</span>
              <b>{dispute.sellerName}</b>
            </div>
            <div>
              <span>Số tiền phong tỏa:</span>
              <b style={{ color: 'var(--primary)' }}>{formatVND(dispute.amount)}</b>
            </div>
            <div>
              <span>Ngày mở:</span>
              <b>{dispute.createdAt}</b>
            </div>

            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--muted-foreground)' }}>
              <ShieldCheck size={16} color="#356b41" style={{ verticalAlign: 'middle', marginRight: 6 }} />
              Quỹ Escrow cam kết xử lý công bằng dựa trên hình ảnh mở hộp và tin nhắn đối chất.
            </div>
          </aside>
        </div>
      </main>
    </MainLayout>
  )
}
