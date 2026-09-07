import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
  Plus,
  Send,
  Download,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Lock,
  History
} from 'lucide-react'
import { UserLayout } from '../../layouts/UserLayout'
import { mockWallet, mockWalletTransactions, formatVND } from '../../mock/mockData'
import { WithdrawModal } from '../../components/modals/WithdrawModal'
import { DepositModal } from '../../components/modals/DepositModal'

export const WalletPage: React.FC = () => {
  const [showWithdraw, setShowWithdraw] = useState(false)
  const [showDeposit, setShowDeposit] = useState(false)
  const [showBalance, setShowBalance] = useState(true)

  const totalNEX = 42500.00
  const totalVND = mockWallet.balance + mockWallet.frozenBalance

  return (
    <UserLayout title="NEX Digital Wallet & Escrow Vault">
      <div className="space-y-6">
        {/* Main Nexus Balance Card (Gradient Blue) */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-tr from-[#004AC6] to-[#2563EB] p-8 text-white shadow-xl">
          <div className="absolute -top-16 -right-16 w-56 h-56 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <span className="text-xs font-semibold text-blue-100/80 uppercase tracking-wider block">
                Total Portfolio Balance
              </span>
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-xl font-bold text-blue-200">NEX</span>
                <span className="text-4xl sm:text-5xl font-black tracking-tight">
                  {showBalance ? totalNEX.toLocaleString('en-US', { minimumFractionDigits: 2 }) : '••••••••'}
                </span>
              </div>
              <span className="text-sm text-blue-100/90 mt-1 block font-medium">
                {showBalance ? `≈ ${formatVND(totalVND)}` : '••••••••'}
              </span>
            </div>

            <button
              type="button"
              onClick={() => setShowBalance(!showBalance)}
              className="p-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              title={showBalance ? 'Hide Balance' : 'Show Balance'}
            >
              {showBalance ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#6FFBBE]/20 text-[#6FFBBE] text-xs font-bold backdrop-blur-xs border border-[#6FFBBE]/30">
              <Sparkles size={13} />
              <span>+2.4% Today • Yield Active</span>
            </div>
            <span className="text-xs font-mono text-blue-100/70">Vault ID: NEX-8492-VN</span>
          </div>
        </div>

        {/* 4 Quick Action Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setShowDeposit(true)}
            className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-[#C3C6D7] shadow-2xs flex flex-col items-center text-center gap-2 transition-all hover:border-[#004AC6] cursor-pointer"
          >
            <div className="w-11 h-11 rounded-full bg-[#DCE9FF] text-[#004AC6] flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-xs font-bold text-[#0B1C30]">Top Up (Nạp tiền)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowWithdraw(true)}
            className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-[#C3C6D7] shadow-2xs flex flex-col items-center text-center gap-2 transition-all hover:border-[#004AC6]"
          >
            <div className="w-11 h-11 rounded-full bg-[#DCE9FF] text-[#004AC6] flex items-center justify-center">
              <ArrowUpRight size={20} />
            </div>
            <span className="text-xs font-bold text-[#0B1C30]">Withdraw (Rút tiền)</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Mã QR nhận tiền ví Nexus của bạn đã sẵn sàng')}
            className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-[#C3C6D7] shadow-2xs flex flex-col items-center text-center gap-2 transition-all hover:border-[#004AC6]"
          >
            <div className="w-11 h-11 rounded-full bg-[#DCE9FF] text-[#004AC6] flex items-center justify-center">
              <Download size={18} />
            </div>
            <span className="text-xs font-bold text-[#0B1C30]">Receive (Nhận NEX)</span>
          </button>

          <button
            type="button"
            onClick={() => alert('Tỷ giá: 1 NEX = 1,000 ₫. Phí đổi 0%')}
            className="p-4 bg-white hover:bg-slate-50 rounded-2xl border border-[#C3C6D7] shadow-2xs flex flex-col items-center text-center gap-2 transition-all hover:border-[#004AC6]"
          >
            <div className="w-11 h-11 rounded-full bg-[#DCE9FF] text-[#004AC6] flex items-center justify-center">
              <RefreshCw size={18} />
            </div>
            <span className="text-xs font-bold text-[#0B1C30]">Convert (Quy đổi)</span>
          </button>
        </div>

        {/* Escrow Breakdown Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#C3C6D7] shadow-2xs space-y-1">
            <span className="text-xs font-medium text-[#737686]">Số dư khả dụng</span>
            <div className="text-xl font-black text-[#0B1C30]">{formatVND(mockWallet.balance)}</div>
            <span className="text-[11px] text-[#007D55]">Sẵn sàng rút hoặc đấu giá</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#C3C6D7] shadow-2xs space-y-1">
            <span className="text-xs font-medium text-[#737686]">Quỹ Ký Gửi Escrow</span>
            <div className="text-xl font-black text-[#007D55]">{formatVND(mockWallet.frozenBalance)}</div>
            <span className="text-[11px] text-[#737686]">Đang tạm giữ an toàn trong 2 đơn hàng</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#C3C6D7] shadow-2xs space-y-1">
            <span className="text-xs font-medium text-[#737686]">Tổng doanh thu đã bán</span>
            <div className="text-xl font-black text-[#004AC6]">245.600.000 ₫</div>
            <span className="text-[11px] text-[#737686]">Từ 126 giao dịch thành công</span>
          </div>
        </div>

        {/* Escrow Security Explanation Note */}
        <div className="p-4 bg-[#EAF3ED] rounded-2xl border border-[#007D55]/30 flex items-start gap-3">
          <ShieldCheck size={22} className="text-[#007D55] flex-shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <h4 className="font-bold text-[#007D55]">Cơ Chế Bảo Vệ Quỹ Ký Quỹ (Smart Escrow Protocol)</h4>
            <p className="text-emerald-950/80 leading-relaxed">
              Mọi khoản tiền đặt cọc hoặc thanh toán mua hàng trên Nexus Exchange đều được khóa trong tài khoản ký quỹ trung gian. Tiền chỉ được giải phóng cho người bán khi người mua đã kiểm tra sản phẩm tại Safe Spot hoặc nhận hàng và ấn Xác nhận thành công.
            </p>
          </div>
        </div>

        {/* Transaction History Section */}
        <div className="bg-white rounded-2xl border border-[#C3C6D7] shadow-2xs overflow-hidden">
          <div className="p-5 border-b border-[#C3C6D7] flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#0B1C30]">Recent Activity (Lịch sử biến động)</h3>
              <p className="text-xs text-[#737686]">Tất cả giao dịch nạp, rút và thanh toán ký quỹ</p>
            </div>
            <span className="text-xs font-semibold text-[#004AC6] flex items-center gap-1">
              <History size={14} />
              <span>Thời gian thực</span>
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {mockWalletTransactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.positive ? 'bg-[#EAF3ED] text-[#007D55]' : 'bg-[#DCE9FF] text-[#004AC6]'
                    }`}
                  >
                    {tx.positive ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0B1C30]">{tx.description}</h4>
                    <p className="text-[11px] text-[#737686]">
                      {tx.createdAt} {tx.vnpayTranNo ? `• VNPAY #${tx.vnpayTranNo}` : `• ${tx.type}`}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div
                    className={`text-sm font-extrabold ${
                      tx.positive ? 'text-[#007D55]' : 'text-[#0B1C30]'
                    }`}
                  >
                    {tx.positive ? '+' : '-'} {formatVND(tx.amount)}
                  </div>
                  <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#EAF3ED] text-[#007D55]">
                    Thành công
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showWithdraw && (
        <WithdrawModal close={() => setShowWithdraw(false)} currentBalance={mockWallet.balance} />
      )}

      <DepositModal
        isOpen={showDeposit}
        onClose={() => setShowDeposit(false)}
      />
    </UserLayout>
  )
}
