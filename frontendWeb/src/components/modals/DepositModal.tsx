import React, { useState } from 'react'
import {
  X,
  CreditCard,
  QrCode,
  CheckCircle2,
  AlertCircle,
  Building,
  Sparkles,
  ArrowRight
} from 'lucide-react'
import { formatVND, mockWallet } from '../../mock/mockData'

interface DepositModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: (amount: number) => void
}

const PRESET_AMOUNTS = [200000, 500000, 1000000, 2000000, 5000000]

export const DepositModal: React.FC<DepositModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(500000)
  const [customAmount, setCustomAmount] = useState<string>('')
  const [method, setMethod] = useState<'VNPAY' | 'VIETQR' | 'MOMO'>('VNPAY')
  const [step, setStep] = useState<'SELECT' | 'QR' | 'SUCCESS'>('SELECT')
  const [loading, setLoading] = useState<boolean>(false)

  if (!isOpen) return null

  const activeAmount = customAmount ? parseInt(customAmount.replace(/\D/g, '')) || 0 : selectedAmount

  const handleProceed = () => {
    if (activeAmount < 50000) {
      alert('Số tiền nạp tối thiểu là 50.000 ₫')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setStep('QR')
    }, 600)
  }

  const handleConfirmPaid = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      mockWallet.balance += activeAmount
      setStep('SUCCESS')
      if (onSuccess) onSuccess(activeAmount)
    }, 1000)
  }

  const handleClose = () => {
    setStep('SELECT')
    setCustomAmount('')
    setSelectedAmount(500000)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full border border-[#C3C6D7] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#ECEEF6] flex items-center justify-between bg-[#F8F9FF]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#004AC6] text-white flex items-center justify-center font-bold text-xs">
              NEX
            </div>
            <div>
              <h3 className="text-sm font-black text-[#0B1C30]">Nạp Tiền Vào Ví Nexus</h3>
              <p className="text-[11px] text-[#737686]">Bảo vệ ký quỹ & nạp cọc đấu giá tức thì</p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {step === 'SELECT' && (
            <div className="space-y-5">
              {/* Preset Amounts */}
              <div>
                <label className="text-xs font-bold text-[#434655] uppercase tracking-wider block mb-2">
                  Chọn số tiền nạp:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_AMOUNTS.map((amt) => {
                    const isSelected = selectedAmount === amt && !customAmount
                    return (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setSelectedAmount(amt)
                          setCustomAmount('')
                        }}
                        className={`py-2 px-1 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          isSelected
                            ? 'bg-[#004AC6] text-white border-[#004AC6] shadow-xs'
                            : 'bg-[#F8F9FF] text-[#0B1C30] border-[#C3C6D7] hover:bg-slate-100'
                        }`}
                      >
                        {formatVND(amt)}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Amount */}
              <div>
                <label className="text-xs font-bold text-[#434655] uppercase tracking-wider block mb-1">
                  Hoặc nhập số tiền tùy chọn (₫):
                </label>
                <input
                  type="number"
                  placeholder="VD: 3000000"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#C3C6D7] text-sm font-bold text-[#0B1C30] focus:outline-none focus:ring-2 focus:ring-[#004AC6]"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-xs font-bold text-[#434655] uppercase tracking-wider block mb-2">
                  Phương thức thanh toán:
                </label>
                <div className="space-y-2">
                  <div
                    onClick={() => setMethod('VNPAY')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      method === 'VNPAY'
                        ? 'border-[#004AC6] bg-[#DCE9FF]/30 ring-1 ring-[#004AC6]'
                        : 'border-[#C3C6D7] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode size={20} className="text-[#004AC6]" />
                      <div>
                        <span className="text-xs font-bold text-[#0B1C30] block">VNPAY QR Sandbox</span>
                        <span className="text-[11px] text-[#737686]">Quét mã qua app ngân hàng bất kỳ</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Miễn phí
                    </span>
                  </div>

                  <div
                    onClick={() => setMethod('VIETQR')}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      method === 'VIETQR'
                        ? 'border-[#004AC6] bg-[#DCE9FF]/30 ring-1 ring-[#004AC6]'
                        : 'border-[#C3C6D7] hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Building size={20} className="text-[#712AE2]" />
                      <div>
                        <span className="text-xs font-bold text-[#0B1C30] block">Chuyển khoản VietQR 24/7</span>
                        <span className="text-[11px] text-[#737686]">Khớp lệnh tự động trong 30 giây</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                      Tự động
                    </span>
                  </div>
                </div>
              </div>

              {/* Total & Action */}
              <div className="pt-2">
                <div className="flex justify-between items-center mb-3 text-xs">
                  <span className="text-[#737686]">Tổng nạp cộng vào ví:</span>
                  <b className="text-base text-[#004AC6] font-black">{formatVND(activeAmount)}</b>
                </div>
                <button
                  type="button"
                  onClick={handleProceed}
                  disabled={loading || activeAmount <= 0}
                  className="w-full py-3 rounded-xl bg-[#004AC6] hover:bg-[#003899] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer disabled:opacity-50"
                >
                  {loading ? 'Đang tạo mã thanh toán...' : 'Tiếp tục thanh toán'}
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

          {step === 'QR' && (
            <div className="text-center space-y-4">
              <div className="bg-[#F8F9FF] p-5 rounded-2xl border border-[#C3C6D7] flex flex-col items-center">
                <span className="text-xs font-bold text-[#737686] mb-1">Quét mã để nạp tiền</span>
                <b className="text-xl font-black text-[#004AC6] mb-3">{formatVND(activeAmount)}</b>

                {/* Simulated QR Code image */}
                <div className="w-48 h-48 bg-white p-2.5 rounded-2xl border-2 border-[#004AC6] shadow-sm flex items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=NEXUS-VNPAY-ESCROW-DEPOSIT"
                    alt="VNPAY QR Sandbox"
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="mt-3 text-[11px] text-[#737686] space-y-0.5">
                  <p>Cú pháp: <b>NEXUS 8492 NAPTIEN</b></p>
                  <p>Thời gian hiệu lực mã: <b className="text-red-600">14:59</b></p>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleConfirmPaid}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#007D55] hover:bg-[#006041] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <CheckCircle2 size={16} />
                  <span>{loading ? 'Đang kiểm tra giao dịch...' : 'Tôi đã chuyển tiền thành công'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep('SELECT')}
                  className="w-full py-2 rounded-xl text-xs font-semibold text-[#737686] hover:bg-slate-100"
                >
                  Quay lại chọn phương thức khác
                </button>
              </div>
            </div>
          )}

          {step === 'SUCCESS' && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#007D55] flex items-center justify-center mx-auto">
                <CheckCircle2 size={36} />
              </div>

              <div>
                <h4 className="text-lg font-black text-[#0B1C30]">Nạp Tiền Thành Công!</h4>
                <p className="text-xs text-[#737686] mt-1">
                  Đã cộng <b>{formatVND(activeAmount)}</b> vào số dư khả dụng ví NEX của bạn.
                </p>
              </div>

              <div className="bg-[#F8F9FF] p-4 rounded-xl text-xs space-y-1 text-left border border-[#ECEEF6]">
                <div className="flex justify-between">
                  <span className="text-[#737686]">Mã giao dịch:</span>
                  <b className="font-mono">NEX-DEP-{Date.now().toString().slice(-6)}</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#737686]">Số dư mới:</span>
                  <b className="text-[#004AC6]">{formatVND(mockWallet.balance)}</b>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-[#004AC6] text-white font-bold text-xs hover:bg-[#003899] transition-colors cursor-pointer"
              >
                Xong
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
