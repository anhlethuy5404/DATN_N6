import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Send,
  ImagePlus,
  Tag,
  MapPin,
  Check,
  ShieldCheck,
  ShoppingBag
} from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { mockConversations, mockChatMessages, formatVND } from '../../mock/mockData'
import { ChatRoom, ChatMessage } from '../../types'

export const MessagesPage: React.FC = () => {
  const [conversations] = useState<ChatRoom[]>(mockConversations)
  const [activeConv, setActiveConv] = useState<ChatRoom>(conversations[0])
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [text, setText] = useState('')
  const [showOfferModal, setShowOfferModal] = useState(false)
  const [offerVal, setOfferVal] = useState('15.000.000')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return

    const newMsg: ChatMessage = {
      id: 'msg-' + Date.now(),
      roomId: activeConv.id,
      senderId: 'USR-1001',
      senderName: 'Minh Anh',
      messageType: 'TEXT',
      content: text.trim(),
      isRead: true,
      createdAt: 'Vừa xong'
    }
    setMessages((prev) => [...prev, newMsg])
    setText('')
  }

  const handleMakeOffer = (e: React.FormEvent) => {
    e.preventDefault()
    const val = Number(offerVal.replace(/\D/g, ''))
    const newMsg: ChatMessage = {
      id: 'msg-offer-' + Date.now(),
      roomId: activeConv.id,
      senderId: 'USR-1001',
      senderName: 'Minh Anh',
      messageType: 'OFFER',
      content: `Đề xuất bớt giá xuống ${formatVND(val)}`,
      offerPrice: val,
      offerStatus: 'PENDING',
      isRead: true,
      createdAt: 'Vừa xong'
    }
    setMessages((prev) => [...prev, newMsg])
    setShowOfferModal(false)
  }

  return (
    <MainLayout>
      <main>
        <div className="listing-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span>/</span>
          <strong>Tin nhắn & Thương lượng</strong>
        </div>

        <div className="chat-layout">
          {/* Left Sidebar: Conversations */}
          <aside className="conversation-list">
            <div className="chat-list-title">
              <h2>Tin nhắn</h2>
              <span style={{ background: 'var(--primary)', color: 'white', borderRadius: 99, padding: '2px 8px', fontSize: 11, fontWeight: 700 }}>
                {conversations.length}
              </span>
            </div>

            {conversations.map((conv) => (
              <button
                key={conv.id}
                className={conv.id === activeConv.id ? 'active' : ''}
                onClick={() => setActiveConv(conv)}
              >
                <span className="chat-avatar">
                  {conv.sellerName.slice(0, 2).toUpperCase()}
                  {conv.isOnline && <i className="online" />}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <b style={{ fontSize: 13 }}>{conv.sellerName}</b>
                    <em style={{ fontSize: 10, color: 'var(--muted-foreground)' }}>
                      {conv.lastMessageAt}
                    </em>
                  </div>
                  <small style={{ display: 'block', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: 'var(--muted-foreground)', marginTop: 3 }}>
                    {conv.lastMessageText}
                  </small>
                </div>
              </button>
            ))}
          </aside>

          {/* Right Window: Active Chat */}
          <section className="chat-window">
            <header>
              <span className="chat-avatar">
                {activeConv.sellerName.slice(0, 2).toUpperCase()}
                {activeConv.isOnline && <i className="online" />}
              </span>
              <div>
                <b style={{ fontSize: 14 }}>{activeConv.sellerName}</b>
                <small style={{ display: 'block', color: 'var(--muted-foreground)', fontSize: 11 }}>
                  {activeConv.isOnline ? 'Đang trực tuyến' : 'Hoạt động gần đây'} · Điểm uy tín 98%
                </small>
              </div>

              <div style={{ marginLeft: 'auto', display: 'flex', gap: 10 }}>
                <button
                  className="secondary-button"
                  style={{ fontSize: 12, padding: '6px 12px' }}
                  onClick={() => setShowOfferModal(true)}
                >
                  <Tag size={14} color="var(--primary)" /> Trả giá món đồ
                </button>
                <Link
                  to="/checkout"
                  className="primary-button"
                  style={{ fontSize: 12, padding: '6px 14px' }}
                >
                  <ShoppingBag size={14} /> Chốt mua qua Escrow
                </Link>
              </div>
            </header>

            {/* Chat Body */}
            <div className="chat-messages">
              {/* Product Pin Attachment */}
              <div className="product-attachment">
                <img src={activeConv.productImage} alt={activeConv.productTitle} />
                <div>
                  <small style={{ color: 'var(--muted-foreground)', fontSize: 10 }}>
                    Bạn đang hỏi về sản phẩm:
                  </small>
                  <b style={{ display: 'block', fontSize: 12 }}>{activeConv.productTitle}</b>
                  <strong style={{ color: 'var(--primary)', fontSize: 13 }}>
                    {formatVND(activeConv.productPrice)}
                  </strong>
                </div>
              </div>

              {/* Message Bubbles */}
              {messages.map((m) => {
                const isMine = m.senderId === 'USR-1001'
                return (
                  <div
                    key={m.id}
                    className={`message ${isMine ? 'mine' : ''}`}
                    style={
                      m.messageType === 'OFFER'
                        ? { background: isMine ? '#fbf2ef' : '#f0f5f1', color: '#292724', border: '1px solid var(--border)' }
                        : {}
                    }
                  >
                    {m.messageType === 'OFFER' ? (
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontWeight: 700, marginBottom: 4 }}>
                          <Tag size={14} /> ĐỀ XUẤT TRẢ GIÁ (DOMAIN 5)
                        </div>
                        <p style={{ margin: '4px 0 6px', fontWeight: 600, fontSize: 14 }}>
                          Mức giá đề xuất: {formatVND(m.offerPrice || 0)}
                        </p>
                        <span
                          className="status"
                          style={{
                            background: m.offerStatus === 'ACCEPTED' ? '#e4efe6' : '#fdf2e2',
                            color: m.offerStatus === 'ACCEPTED' ? '#2e6939' : '#9c6827'
                          }}
                        >
                          {m.offerStatus === 'ACCEPTED' ? '✓ Người bán đã chấp nhận giá này' : 'Đang chờ đồng ý'}
                        </span>
                      </div>
                    ) : (
                      m.content
                    )}
                    <small>{m.createdAt}</small>
                  </div>
                )
              })}
            </div>

            {/* Chat Input */}
            <form className="chat-input" onSubmit={handleSend}>
              <button type="button" aria-label="Đính kèm ảnh" title="Gửi ảnh">
                <ImagePlus size={18} />
              </button>
              <button
                type="button"
                aria-label="Điểm hẹn an toàn"
                title="Đề xuất điểm hẹn an toàn (Meetup spot)"
                onClick={() => setText('Chúng mình gặp nhau tại Highlands Coffee Duy Tân nhé!')}
              >
                <MapPin size={18} color="#356b41" />
              </button>
              <input
                type="text"
                placeholder="Nhập nội dung trao đổi, thương lượng..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button type="submit" className="primary-button" style={{ padding: '8px 16px' }}>
                <Send size={15} /> Gửi
              </button>
            </form>
          </section>
        </div>

        {/* Modal: Make Price Offer */}
        {showOfferModal && (
          <div className="modal-backdrop">
            <div className="image-modal">
              <span className="eyebrow">
                <Tag size={14} /> Thương lượng giá bán (Domain 5 Price Offer)
              </span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, margin: '8px 0 12px' }}>
                Đề xuất bớt giá
              </h2>
              <p style={{ color: 'var(--muted-foreground)', fontSize: 13, marginBottom: 16 }}>
                Áp dụng cho: <strong>{activeConv.productTitle}</strong>. Giá niêm yết hiện tại:{' '}
                <strong>{formatVND(activeConv.productPrice)}</strong>.
              </p>

              <form onSubmit={handleMakeOffer}>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, marginBottom: 16 }}>
                  Mức giá bạn mong muốn trả (₫)
                  <input
                    type="text"
                    value={offerVal}
                    onChange={(e) => setOfferVal(e.target.value)}
                    required
                  />
                </label>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => setShowOfferModal(false)}
                  >
                    Hủy
                  </button>
                  <button type="submit" className="primary-button">
                    Gửi đề xuất bớt giá
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </MainLayout>
  )
}
