import React from 'react'
import { Link } from 'react-router-dom'
import { Gavel, ArrowRight, ShieldCheck, Sparkles, Plus, MapPin, Zap, RefreshCw } from 'lucide-react'
import { MainLayout } from '../../layouts/MainLayout'
import { ProductCard } from '../../components/product/ProductCard'
import { AuctionCard } from '../../components/auction/AuctionCard'
import { mockProducts, mockCategories } from '../../mock/mockData'

export const HomePage: React.FC = () => {
  const auctionProducts = mockProducts.filter((p) => p.transactionType === 'AUCTION')
  const saleProducts = mockProducts.filter((p) => p.transactionType === 'SALE')
  const barterProducts = mockProducts.filter((p) => p.transactionType === 'BARTER' || p.transactionType === 'PASS')

  return (
    <MainLayout>
      {/* Nexus Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F9FF] via-[#EDF3FF] to-[#F8F9FF] py-16 md:py-24 border-b border-[#C3C6D7]/60">
        {/* Glow effects */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#004AC6]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#712AE2]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Headline */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#DCE9FF] border border-[#004AC6]/20 text-xs font-bold text-[#004AC6]">
                <Sparkles size={14} className="text-[#712AE2]" />
                <span>Next-Gen Smart Escrow & P2P Trading</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0B1C30] tracking-tight leading-[1.1]">
                Where Authentic Collectibles &{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#004AC6] to-[#712AE2]">
                  Verified Traders
                </span>{' '}
                Meet.
              </h1>

              <p className="text-base sm:text-lg text-[#434655] leading-relaxed max-w-xl">
                Experience transparent real-time bidding, AI visual inspection, and peer-to-peer exchanges secured by Nexus Smart Escrow and 24/7 CCTV Safe Meetup Spots.
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/products"
                  className="px-6 py-3 bg-[#004AC6] hover:bg-[#003899] text-white font-semibold rounded-full shadow-lg shadow-blue-600/25 transition-all flex items-center gap-2 text-sm hover:scale-[1.02]"
                >
                  <span>Explore Market</span>
                  <ArrowRight size={16} />
                </Link>
                <Link
                  to="/auctions"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-[#0B1C30] font-semibold rounded-full border border-[#C3C6D7] shadow-xs transition-all flex items-center gap-2 text-sm hover:border-[#004AC6]"
                >
                  <Gavel size={16} className="text-[#BA1A1A]" />
                  <span>Live Auctions</span>
                </Link>
                <Link
                  to="/products/create"
                  className="px-5 py-3 bg-[#DCE9FF] hover:bg-[#c9deff] text-[#004AC6] font-semibold rounded-full transition-all flex items-center gap-2 text-sm"
                >
                  <Plus size={16} />
                  <span>Post Item</span>
                </Link>
              </div>

              {/* Trust badges row */}
              <div className="pt-6 border-t border-[#C3C6D7]/50 flex flex-wrap items-center gap-6 text-xs text-[#737686]">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#007D55]" />
                  <span>100% Escrow Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#004AC6]" />
                  <span>CCTV Safe Meetup Centers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-[#712AE2]" />
                  <span>AI Valuation & Anti-Fraud</span>
                </div>
              </div>
            </div>

            {/* Right Escrow Bento Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#0B1C30] text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden border border-slate-700/60">
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#004AC6]/30 rounded-full blur-2xl pointer-events-none" />

                <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#007D55]/20 flex items-center justify-center text-[#6FFBBE]">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">NEXUS SMART ESCROW</h4>
                      <p className="text-[11px] text-slate-400">P2P Protection Protocol</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#6FFBBE]/15 text-[#6FFBBE] border border-[#6FFBBE]/30">
                    ACTIVE
                  </span>
                </div>

                <div className="py-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#004AC6] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Buyer Deposits Funds</p>
                      <p className="text-[11px] text-slate-400">Payment locked in smart contract vault via VNPAY / NEX Wallet.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#712AE2] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Safe Spot Handover</p>
                      <p className="text-[11px] text-slate-400">Parties meet at verified physical hubs with 24/7 CCTV surveillance.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#007D55] text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      3
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-white">Instant Release Upon Inspection</p>
                      <p className="text-[11px] text-slate-400">Funds released to seller only after buyer approves item authenticity.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Average dispute rate: &lt; 0.1%</span>
                  <Link to="/orders" className="text-[#6FFBBE] font-semibold hover:underline flex items-center gap-1">
                    <span>Read Policy</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auctions Spotlight */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#BA1A1A] animate-ping" />
              <h2 className="text-2xl font-black text-[#0B1C30] tracking-tight">Live Auctions</h2>
            </div>
            <p className="text-xs text-[#737686] mt-1">Real-time bidding on certified rare items & collectibles</p>
          </div>
          <Link
            to="/auctions"
            className="text-xs font-bold text-[#004AC6] hover:text-[#003899] flex items-center gap-1 hover:underline"
          >
            <span>View All Auctions ({auctionProducts.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {auctionProducts.slice(0, 3).map((item) => (
            <AuctionCard key={item.id} product={item} />
          ))}
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-12 bg-white border-y border-[#C3C6D7]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-[#0B1C30] tracking-tight">Featured Categories</h2>
              <p className="text-xs text-[#737686] mt-0.5">Explore curated departments verified by Nexus</p>
            </div>
            <Link to="/products" className="text-xs font-semibold text-[#004AC6] hover:underline">
              All Departments
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products?category=${cat.id}`}
                className="group p-4 rounded-2xl bg-[#F8F9FF] hover:bg-[#DCE9FF]/50 border border-[#C3C6D7]/60 hover:border-[#004AC6]/40 transition-all flex flex-col items-center text-center shadow-2xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-xl shadow-xs group-hover:scale-110 transition-transform mb-3">
                  {cat.iconName || '📦'}
                </div>
                <span className="text-xs font-bold text-[#0B1C30] group-hover:text-[#004AC6] transition-colors line-clamp-1">
                  {cat.name}
                </span>
                <span className="text-[10px] text-[#737686] mt-0.5">Verified listings</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh Marketplace Listings */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-black text-[#0B1C30] tracking-tight">Fresh Marketplace Listings</h2>
            <p className="text-xs text-[#737686] mt-1">Direct buy & barter items from high-trust community members</p>
          </div>
          <Link
            to="/products"
            className="text-xs font-bold text-[#004AC6] hover:text-[#003899] flex items-center gap-1 hover:underline"
          >
            <span>Browse All ({mockProducts.length})</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Safe Spot Physical Network Callout */}
      <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-r from-[#004AC6] to-[#712AE2] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold backdrop-blur-xs">
              <MapPin size={13} className="text-[#6FFBBE]" />
              <span>PHYSICAL SAFE SPOT NETWORK</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-black tracking-tight">
              Trade Offline with 100% Peace of Mind
            </h3>
            <p className="text-sm text-blue-100/90 leading-relaxed">
              Never worry about sketchy street corners. Meet at our officially partnered TrustBid Safe Spots with 24/7 CCTV surveillance, free Wi-Fi inspection tables, and staff assistance in Hà Nội & TP. Hồ Chí Minh.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              to="/products"
              className="px-6 py-3 bg-white hover:bg-blue-50 text-[#004AC6] font-bold rounded-full text-xs shadow-md transition-all text-center"
            >
              Find Nearest Safe Spot
            </Link>
            <Link
              to="/orders"
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold rounded-full text-xs transition-all text-center"
            >
              How Handover Works
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
