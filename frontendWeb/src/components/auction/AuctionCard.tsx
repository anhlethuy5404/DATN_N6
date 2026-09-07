import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, Clock3, ShieldCheck, Flame, ArrowUpRight } from 'lucide-react'
import { Product } from '../../types'
import { formatVND } from '../../mock/mockData'

interface AuctionCardProps {
  product: Product
}

export const AuctionCard: React.FC<AuctionCardProps> = ({ product }) => {
  return (
    <Link
      to={`/auctions/${product.id}`}
      className="group bg-white rounded-2xl border border-[#C3C6D7]/70 hover:border-[#BA1A1A]/40 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col overflow-hidden"
    >
      {/* Auction Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
        <img
          src={product.primaryImage}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
        />

        {/* Live Bidding Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#BA1A1A] text-white text-[11px] font-black shadow-md">
          <span className="w-2 h-2 rounded-full bg-white animate-ping" />
          <span>LIVE AUCTION</span>
        </div>

        {/* Bids Count Badge */}
        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold">
          {product.bidsCount || 12} Bids
        </div>

        {/* Timer overlay at bottom of image */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-6 flex items-center justify-between text-white text-xs">
          <div className="flex items-center gap-1.5 font-mono text-[#6FFBBE] font-bold">
            <Clock3 size={14} />
            <span>{product.endTime?.split('(')[1]?.replace(')', '') || '04:12:45'}</span>
          </div>
          <span className="text-[11px] text-slate-300">Countdown</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-sm font-bold text-[#0B1C30] line-clamp-2 group-hover:text-[#BA1A1A] transition-colors leading-snug">
            {product.title}
          </h3>

          <div className="mt-3 p-3 bg-[#F8F9FF] rounded-xl border border-[#C3C6D7]/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold text-[#737686] uppercase tracking-wider block">
                Highest Bid
              </span>
              <span className="text-lg font-black text-[#BA1A1A] tracking-tight">
                {formatVND(product.currentPrice || product.startPrice || 0)}
              </span>
            </div>
            <div className="w-8 h-8 rounded-full bg-[#BA1A1A]/10 text-[#BA1A1A] flex items-center justify-center group-hover:bg-[#BA1A1A] group-hover:text-white transition-colors">
              <ArrowUpRight size={16} />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-[#434655]">
          <span className="truncate max-w-[120px]">Seller: {product.sellerName}</span>
          <span className="inline-flex items-center gap-1 font-bold text-[#007D55]">
            <ShieldCheck size={13} />
            <span>Trust: {product.sellerTrustScore}%</span>
          </span>
        </div>
      </div>
    </Link>
  )
}
