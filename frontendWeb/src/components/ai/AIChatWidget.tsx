import React, { useState } from 'react'
import { Sparkles, X, Send, Bot, ShieldQuestion } from 'lucide-react'

interface Message {
  id: string
  text: string
  isBot: boolean
}

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là Trợ lý Mộc AI (Domain 9). Bạn cần tôi tư vấn về chính sách ký quỹ Escrow, gợi ý định giá món đồ hay tra cứu thông tin đơn hàng?',
      isBot: true
    }
  ])
  const [input, setInput] = useState('')

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userText = input.trim()
    const newMsg: Message = { id: Date.now().toString(), text: userText, isBot: false }
    setMessages((prev) => [...prev, newMsg])
    setInput('')

    // Simulate AI response based on domain keywords
    setTimeout(() => {
      let botReply = 'Mộc AI đã ghi nhận câu hỏi của bạn. Hệ thống sử dụng mô hình RAG vector search đối chiếu chính sách sàn để hỗ trợ.'
      const lower = userText.toLowerCase()
      if (lower.includes('escrow') || lower.includes('ký quỹ') || lower.includes('tiền')) {
        botReply = 'Chính sách Mộc Escrow: Tiền của người mua được khóa an toàn qua VNPAY. Chỉ khi người mua nhận hàng và xác nhận trong 48h, tiền mới được giải ngân cho người bán!'
      } else if (lower.includes('đấu giá') || lower.includes('proxy')) {
        botReply = 'Đấu giá trên Mộc có tính năng Proxy Bidding: Bạn đặt giá trần, hệ thống sẽ tự động nâng bước giá tối thiểu thay bạn khi bị người khác vượt qua.'
      } else if (lower.includes('đổi đồ') || lower.includes('pass') || lower.includes('cho tặng')) {
        botReply = 'Mục Cho tặng & Trao đổi đồ hoàn toàn miễn phí hoa hồng. Bạn có thể chọn Điểm gặp mặt an toàn (Safe Meetup Spot) có camera công cộng để giao dịch an tâm.'
      }

      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: botReply, isBot: true }
      ])
    }, 600)
  }

  return (
    <>
      <button
        className="ai-chatbot-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Trợ lý Mộc AI"
      >
        <Sparkles size={18} />
        <span>Hỏi Trợ lý Mộc AI</span>
      </button>

      {isOpen && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot size={20} color="#d8a494" />
              <div>
                <b style={{ fontSize: 13 }}>Trợ lý Thông minh Mộc</b>
                <small style={{ display: 'block', fontSize: 10, color: '#aaa' }}>
                  RAG Chatbot & Định giá AI
                </small>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="ai-chat-body">
            {messages.map((m) => (
              <div key={m.id} className={`ai-msg ${m.isBot ? 'bot' : 'user'}`}>
                {m.text}
              </div>
            ))}
          </div>

          <div style={{ padding: '6px 12px', background: 'var(--card)', borderTop: '1px solid var(--border)', display: 'flex', gap: 6, overflowX: 'auto' }}>
            <button
              onClick={() => setInput('Ký quỹ Escrow hoạt động thế nào?')}
              style={{ fontSize: 11, padding: '4px 8px', borderRadius: 99, border: '1px solid var(--border)', background: 'var(--muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              <ShieldQuestion size={11} style={{ verticalAlign: 'middle', marginRight: 4 }} /> Ký quỹ Escrow?
            </button>
            <button
              onClick={() => setInput('Đấu giá ủy quyền là gì?')}
              style={{ fontSize: 11, padding: '4px 8px', borderRadius: 99, border: '1px solid var(--border)', background: 'var(--muted)', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              Proxy Bidding?
            </button>
          </div>

          <form className="ai-chat-footer" onSubmit={handleSend}>
            <input
              type="text"
              placeholder="Hỏi Mộc AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" aria-label="Gửi">
              <Send size={14} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
