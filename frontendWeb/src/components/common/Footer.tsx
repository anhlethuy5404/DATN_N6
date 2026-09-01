import React from 'react'
import { Link } from 'react-router-dom'
import { ShieldCheck, Heart } from 'lucide-react'

export const Footer: React.FC = () => {
  return (
    <footer>
      <div className="footer-top">
        <div>
          <Link to="/" className="brand footer-brand">
            <span className="brand-mark">m</span>
            <span>mộc</span>
          </Link>
          <p>
            Đồ cũ, chuyện mới.
            <br />
            Nền tảng giao dịch, đấu giá và trao đổi đồ đã qua sử dụng
            <br />
            với cơ chế ký quỹ VNPAY Escrow bảo vệ người dùng.
          </p>
        </div>

        <div className="footer-links">
          <div>
            <strong>Khám phá</strong>
            <Link to="/products">Mới lên kệ</Link>
            <Link to="/auctions">Phiên đấu giá</Link>
            <Link to="/pass">Trao đổi & Cho tặng</Link>
            <Link to="/wallet">Ví điện tử</Link>
          </div>

          <div>
            <strong>Về Mộc</strong>
            <Link to="/orders">Quy trình ký quỹ Escrow</Link>
            <Link to="/verification">Xác minh danh tính eKYC</Link>
            <Link to="/disputes">Giải quyết tranh chấp</Link>
            <Link to="/moderator">Trung tâm kiểm duyệt</Link>
          </div>

          <div>
            <strong>Quản trị & Hệ thống</strong>
            <Link to="/dashboard">Không gian cá nhân</Link>
            <Link to="/admin">Cổng quản trị viên</Link>
            <Link to="/products/create">Đăng bán sản phẩm</Link>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © 2026 Mộc Marketplace · Đồ án tốt nghiệp hệ thống giao dịch đa phương thức.
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <ShieldCheck size={14} color="#356b41" /> Escrow Protected · Hà Nội, Việt Nam <Heart size={13} color="#c5573e" />
        </span>
      </div>
    </footer>
  )
}
