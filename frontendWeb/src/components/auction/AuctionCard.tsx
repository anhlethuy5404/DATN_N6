import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Clock3, ShieldCheck } from 'lucide-react'
import { Product } from '../../types'
import { formatVND } from '../../mock/mockData'

interface AuctionCardProps {
  product: Product
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ product }) => {
  return (
    <Link to={`/auctions/${product.id}`} className="auction-card">
      <div className="auction-card-image">
        <img src={product.primaryImage} alt={product.title} />
        <span className="auction-status">
          <Gavel size={13} /> Đang diễn ra
        </span>
      </div>

      <div className="auction-card-body">
        <span className="eyebrow">{product.bidsCount || 0} lượt trả giá</span>
        <h3>{product.title}</h3>

        <div className="auction-price">
          <small>Giá dẫn đầu hiện tại</small>
          <strong>{formatVND(product.currentPrice || product.startPrice || 0)}</strong>
        </div>

        <div className="auction-card-meta">
          <span>Người bán: {product.sellerName}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock3 size={13} /> {product.endTime?.split('(')[1]?.replace(')', '') || '05:42:18'}
          </span>
        </div>

        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#356b41' }}>
          <ShieldCheck size={14} /> Điểm uy tín người bán: {product.sellerTrustScore}%
        </div>
      </div>
    </Link>
  )
}
